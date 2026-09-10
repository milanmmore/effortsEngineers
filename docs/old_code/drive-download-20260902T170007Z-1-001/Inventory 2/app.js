/* Efforts Engineers — Inventory Control Dashboard */

const STORAGE_KEY = 'inventory-state-v1';
const ALERT_EMAIL = 'efforts.engineers@hotmail.com';
const LOW_STOCK_THRESHOLD = 1; // stock <= this is "critical"

let STATE = {
  stocks: {},          // partId -> current stock
  outboundNew: {},     // partId -> total outward qty entered via app (for movement calc)
  inboundNew: {},      // partId -> total inward qty entered via app
  transactions: [],    // {id, ts, partId, type, qty, remarks, date}
  partOverrides: {},   // partId -> {name, partno, category} edits made in Inventory
  deletedPartIds: [],  // partIds hidden from the list
  initialized: false
};

let entrySelectedPart = null;
let entryType = 'in';
let sortState = { key: null, dir: 1 };
let editingTxnId = null;      // id of transaction currently being edited, or null
let editingOriginal = null;   // snapshot of the transaction before edits, for stock revert
let modalTargetPartId = null; // part id currently open in edit/delete modal

/* ---------------- Storage ---------------- */

async function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      STATE = Object.assign(STATE, parsed);
      STATE.partOverrides = STATE.partOverrides || {};
      STATE.deletedPartIds = STATE.deletedPartIds || [];
      return;
    }
  } catch (e) {
    // corrupted or inaccessible storage — fall through to init
  }
  initializeState();
  await saveState();
}

function initializeState() {
  const stocks = {};
  PARTS_DATA.forEach(p => { stocks[p.id] = p.closing; });
  STATE = {
    stocks,
    outboundNew: {},
    inboundNew: {},
    transactions: [],
    partOverrides: {},
    deletedPartIds: [],
    initialized: true
  };
}

async function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
  } catch (e) {
    showToast('Storage error', 'Could not save changes. Your browser storage may be full or disabled (private/incognito mode blocks it).', 'error');
  }
}

/* ---------------- Part helpers (overrides + deletion aware) ---------------- */

function getPart(id) {
  if (STATE.deletedPartIds.includes(id)) return null;
  const raw = PARTS_DATA.find(p => p.id === id);
  if (!raw) return null;
  const ov = STATE.partOverrides[id];
  return ov ? Object.assign({}, raw, ov) : raw;
}

function activeParts() {
  return PARTS_DATA
    .filter(p => !STATE.deletedPartIds.includes(p.id))
    .map(p => {
      const ov = STATE.partOverrides[p.id];
      return ov ? Object.assign({}, p, ov) : p;
    });
}

function getStock(id) {
  return STATE.stocks[id] !== undefined ? STATE.stocks[id] : 0;
}

function getTotalIssued(part) {
  // original month's issued qty + new outward entries made in-app
  return (part.issued || 0) + (STATE.outboundNew[part.id] || 0);
}

function movementClass(part) {
  const issued = getTotalIssued(part);
  if (issued >= 5) return 'fast';
  if (issued >= 1) return 'moderate';
  return 'slow';
}

function stockClass(stock) {
  if (stock <= 0) return 'zero';
  if (stock <= LOW_STOCK_THRESHOLD) return 'critical';
  return 'ok';
}

function fmtDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function todayISO() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

function showToast(title, msg, type = 'default') {
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className = 'toast ' + (type === 'error' ? 'error' : type === 'success' ? 'success' : '');
  el.innerHTML = `<b>${escapeHtml(title)}</b>${escapeHtml(msg)}`;
  stack.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 4200);
}

/* ---------------- Navigation ---------------- */

const pageTitles = {
  overview: ['Overview', 'Live snapshot of all parts across KC/KCX, PC/AC and Local ledgers'],
  inventory: ['Inventory', 'Full parts list — search, filter, sort, edit or remove parts'],
  entry: ['Inward / Outward Entry', 'Record stock movement and update live balances'],
  movers: ['Fast / Slow Movers', 'Movement classification based on units issued this month'],
  log: ['Transaction Log', 'History of every inward/outward entry made in this tool']
};

function switchView(view) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === view));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
  const [title, sub] = pageTitles[view];
  document.getElementById('pageTitle').textContent = title;
  document.getElementById('pageStamp').textContent = sub;
  if (view === 'inventory') renderInventoryTable();
  if (view === 'movers') renderMovers();
  if (view === 'log') renderLog();
  if (view === 'entry') {
    if (!document.getElementById('entryDate').value) document.getElementById('entryDate').value = todayISO();
    renderSameDayEntries();
  }
}

/* ---------------- Overview ---------------- */

function computeStats() {
  const parts = activeParts();
  let zero = 0, critical = 0, fast = 0, slow = 0;
  parts.forEach(p => {
    const s = getStock(p.id);
    if (s <= 0) zero++;
    else if (s <= LOW_STOCK_THRESHOLD) critical++;
    const m = movementClass(p);
    if (m === 'fast') fast++;
    if (m === 'slow') slow++;
  });
  return { total: parts.length, zero, critical, fast, slow };
}

function renderOverview() {
  const stats = computeStats();
  const parts = activeParts();
  const grid = document.getElementById('statGrid');
  grid.innerHTML = `
    <div class="stat-card c-cyan">
      <div class="label">Total Parts</div>
      <div class="value">${stats.total}</div>
      <div class="sub">across 3 ledgers</div>
    </div>
    <div class="stat-card c-red">
      <div class="label">Out of Stock</div>
      <div class="value">${stats.zero}</div>
      <div class="sub">0 units on hand</div>
    </div>
    <div class="stat-card c-amber">
      <div class="label">Critical</div>
      <div class="value">${stats.critical}</div>
      <div class="sub">exactly 1 unit left</div>
    </div>
    <div class="stat-card c-green">
      <div class="label">Fast Moving</div>
      <div class="value">${stats.fast}</div>
      <div class="sub">≥5 issued this month</div>
    </div>
    <div class="stat-card" style="--accent:var(--text-faint);">
      <div class="label">Slow / Non-Moving</div>
      <div class="value" style="color:var(--text-muted);">${stats.slow}</div>
      <div class="sub">0 issued this month</div>
    </div>
  `;

  // alert banner
  const banner = document.getElementById('overviewAlertBanner');
  const totalAlert = stats.zero + stats.critical;
  if (totalAlert > 0) {
    banner.classList.add('show');
    document.getElementById('overviewAlertMsg').innerHTML =
      `<b>${totalAlert} part${totalAlert>1?'s':''}</b> <span>need restocking — ${stats.zero} out of stock, ${stats.critical} at 1 unit.</span>`;
  } else {
    banner.classList.remove('show');
  }

  // critical table
  const critical = parts.filter(p => getStock(p.id) <= LOW_STOCK_THRESHOLD)
    .sort((a,b) => getStock(a.id) - getStock(b.id));
  const tbody = document.getElementById('criticalTableBody');
  if (critical.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-faint); padding:24px;">Nothing critical — all parts above threshold.</td></tr>`;
  } else {
    tbody.innerHTML = critical.map(p => {
      const s = getStock(p.id);
      const cls = stockClass(s);
      return `<tr>
        <td class="part-name">${escapeHtml(p.name)}</td>
        <td>${p.partno ? `<span class="part-no">${escapeHtml(p.partno)}</span>` : `<span class="part-no empty">—</span>`}</td>
        <td><span class="cat-tag">${escapeHtml(p.category)}</span></td>
        <td><span class="stock-badge ${cls}">${s}</span></td>
        <td><button class="btn btn-sm" onclick="goToEntryFor(${p.id})">Restock</button></td>
      </tr>`;
    }).join('');
  }

  // mini fast movers
  const fastList = [...parts].sort((a,b) => getTotalIssued(b) - getTotalIssued(a)).slice(0,6);
  const maxIssued = Math.max(1, getTotalIssued(fastList[0] || {issued:0,id:-1}));
  document.getElementById('miniFastMovers').innerHTML = fastList.map((p,i) => moverRowHtml(p, i+1, maxIssued)).join('');

  // category split
  const cats = {};
  parts.forEach(p => { cats[p.category] = (cats[p.category]||0) + 1; });
  const catColors = { 'KC/KCX Compressor':'var(--cyan)', 'PC/AC Compressor':'var(--amber)', 'Local':'var(--green)' };
  document.getElementById('categorySplit').innerHTML = Object.entries(cats).map(([cat,count]) => {
    const pct = Math.round(count / parts.length * 100);
    return `<div style="margin-bottom:14px;">
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px;">
        <span>${escapeHtml(cat)}</span><span style="font-family:var(--font-mono); color:var(--text-muted);">${count} · ${pct}%</span>
      </div>
      <div class="mover-bar-track"><div class="mover-bar-fill" style="width:${pct}%; background:${catColors[cat]||'var(--cyan)'};"></div></div>
    </div>`;
  }).join('');
}

function moverRowHtml(p, rank, maxVal) {
  const issued = getTotalIssued(p);
  const pct = Math.max(4, Math.round(issued / maxVal * 100));
  return `<div class="mover-row">
    <div class="mover-rank">${String(rank).padStart(2,'0')}</div>
    <div class="mover-bar-wrap">
      <div class="mover-name">${escapeHtml(p.name)}</div>
      <div class="mover-bar-track"><div class="mover-bar-fill" style="width:${pct}%; background:var(--green);"></div></div>
    </div>
    <div class="mover-qty">${issued}</div>
  </div>`;
}

function goToEntryFor(partId) {
  switchView('entry');
  const p = getPart(partId);
  if (p) selectEntryPart(p);
}

/* ---------------- Email alert ---------------- */

function buildAlertMailto() {
  const critical = activeParts().filter(p => getStock(p.id) <= LOW_STOCK_THRESHOLD)
    .sort((a,b) => getStock(a.id) - getStock(b.id));
  const subject = `Stock Alert: ${critical.length} part(s) at or below ${LOW_STOCK_THRESHOLD} unit`;
  const lines = critical.map(p => `- ${p.name} (${p.partno || 'no part no.'}) [${p.category}] — ${getStock(p.id)} unit(s) left`);
  const body = `The following parts need restocking:\n\n${lines.join('\n')}\n\nGenerated from the Inventory Control dashboard.`;
  return `mailto:${ALERT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function prepareEmail() {
  const stats = computeStats();
  if (stats.zero + stats.critical === 0) {
    showToast('Nothing to send', 'No parts are currently at or below the alert threshold.', 'default');
    return;
  }
  window.location.href = buildAlertMailto();
}

/* ---------------- Inventory table ---------------- */

function populateCategoryFilter() {
  const sel = document.getElementById('invCategoryFilter');
  const current = sel.value;
  sel.querySelectorAll('option:not(:first-child)').forEach(o => o.remove());
  const cats = [...new Set(activeParts().map(p => p.category))].sort();
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    sel.appendChild(opt);
  });
  if (cats.includes(current)) sel.value = current;

  const datalist = document.getElementById('categoryOptions');
  if (datalist) datalist.innerHTML = cats.map(c => `<option value="${escapeHtml(c)}">`).join('');
}

function getFilteredParts() {
  const q = document.getElementById('invSearch').value.trim().toLowerCase();
  const cat = document.getElementById('invCategoryFilter').value;
  const stockF = document.getElementById('invStockFilter').value;
  const moveF = document.getElementById('invMoveFilter').value;

  let list = activeParts().filter(p => {
    if (q && !(p.name.toLowerCase().includes(q) || (p.partno||'').toLowerCase().includes(q))) return false;
    if (cat && p.category !== cat) return false;
    const s = getStock(p.id);
    if (stockF === 'zero' && s > 0) return false;
    if (stockF === 'critical' && !(s > 0 && s <= LOW_STOCK_THRESHOLD)) return false;
    if (stockF === 'ok' && s <= LOW_STOCK_THRESHOLD) return false;
    if (moveF && movementClass(p) !== moveF) return false;
    return true;
  });

  if (sortState.key) {
    list = [...list].sort((a,b) => {
      let av, bv;
      switch (sortState.key) {
        case 'name': av=a.name; bv=b.name; break;
        case 'partno': av=a.partno; bv=b.partno; break;
        case 'category': av=a.category; bv=b.category; break;
        case 'stock': av=getStock(a.id); bv=getStock(b.id); break;
        case 'issued': av=getTotalIssued(a); bv=getTotalIssued(b); break;
        case 'move': av=movementClass(a); bv=movementClass(b); break;
      }
      if (typeof av === 'string') return av.localeCompare(bv) * sortState.dir;
      return (av - bv) * sortState.dir;
    });
  }
  return list;
}

function renderInventoryTable() {
  const list = getFilteredParts();
  const tbody = document.getElementById('inventoryTableBody');
  document.getElementById('invEmptyState').style.display = list.length ? 'none' : 'block';
  tbody.innerHTML = list.map(p => {
    const s = getStock(p.id);
    const sc = stockClass(s);
    const mc = movementClass(p);
    const issued = getTotalIssued(p);
    const gaugePct = Math.min(100, s * 10);
    const gaugeColor = sc === 'zero' ? 'var(--red)' : sc === 'critical' ? 'var(--amber)' : 'var(--green)';
    return `<tr>
      <td class="part-name">${escapeHtml(p.name)}</td>
      <td>${p.partno ? `<span class="part-no">${escapeHtml(p.partno)}</span>` : `<span class="part-no empty">—</span>`}</td>
      <td><span class="cat-tag">${escapeHtml(p.category)}</span></td>
      <td>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="stock-badge ${sc}">${s}</span>
          <div class="gauge"><div class="gauge-fill" style="width:${gaugePct}%; background:${gaugeColor};"></div></div>
        </div>
      </td>
      <td style="font-family:var(--font-mono);">${issued}</td>
      <td><span class="move-tag ${mc}">${mc === 'fast' ? 'Fast' : mc === 'moderate' ? 'Moderate' : 'Slow'}</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <div class="icon-btn" title="Edit part" onclick="openEditPartModal(${p.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div class="icon-btn danger" title="Delete part" onclick="openDeletePartModal(${p.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </div>
        </div>
      </td>
    </tr>`;
  }).join('');
  document.getElementById('navCountParts').textContent = activeParts().length;
}

function attachSortHandlers() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (sortState.key === key) sortState.dir *= -1;
      else { sortState.key = key; sortState.dir = 1; }
      renderInventoryTable();
    });
  });
}

/* ---------------- Edit / Delete part (Inventory) ---------------- */

function openEditPartModal(id) {
  const p = getPart(id);
  if (!p) return;
  modalTargetPartId = id;
  document.getElementById('editPartName').value = p.name;
  document.getElementById('editPartNo').value = p.partno || '';
  document.getElementById('editPartCategory').value = p.category;
  document.getElementById('editPartStock').value = getStock(id);
  document.getElementById('editPartModal').classList.add('show');
}

function closeEditPartModal() {
  document.getElementById('editPartModal').classList.remove('show');
  modalTargetPartId = null;
}

async function saveEditPartHandler() {
  if (modalTargetPartId == null) return;
  const name = document.getElementById('editPartName').value.trim();
  const partno = document.getElementById('editPartNo').value.trim();
  const category = document.getElementById('editPartCategory').value.trim();
  const stock = parseInt(document.getElementById('editPartStock').value);

  if (!name) { showToast('Name required', 'Part name cannot be empty.', 'error'); return; }
  if (!category) { showToast('Category required', 'Category cannot be empty.', 'error'); return; }
  if (isNaN(stock) || stock < 0) { showToast('Invalid stock', 'Enter a stock value of 0 or more.', 'error'); return; }

  STATE.partOverrides[modalTargetPartId] = { name, partno, category };
  STATE.stocks[modalTargetPartId] = stock;
  await saveState();

  closeEditPartModal();
  populateCategoryFilter();
  renderInventoryTable();
  renderOverview();
  showToast('Part updated', `${name} has been updated.`, 'success');
}

function openDeletePartModal(id) {
  const p = getPart(id);
  if (!p) return;
  modalTargetPartId = id;
  document.getElementById('deletePartName').textContent = p.name;
  document.getElementById('deletePartModal').classList.add('show');
}

function closeDeletePartModal() {
  document.getElementById('deletePartModal').classList.remove('show');
  modalTargetPartId = null;
}

async function confirmDeletePartHandler() {
  if (modalTargetPartId == null) return;
  const p = getPart(modalTargetPartId);
  STATE.deletedPartIds.push(modalTargetPartId);
  await saveState();
  closeDeletePartModal();
  populateCategoryFilter();
  renderInventoryTable();
  renderOverview();
  showToast('Part removed', `${p ? p.name : 'Part'} has been removed from the list.`, 'default');
}

/* ---------------- Movers view ---------------- */

function renderMovers() {
  const parts = activeParts();
  const fast = parts.filter(p => movementClass(p) === 'fast').sort((a,b) => getTotalIssued(b)-getTotalIssued(a));
  const slow = parts.filter(p => movementClass(p) === 'slow').sort((a,b) => a.name.localeCompare(b.name));
  document.getElementById('fastCount').textContent = fast.length + ' parts';
  document.getElementById('slowCount').textContent = slow.length + ' parts';

  const maxIssued = Math.max(1, getTotalIssued(fast[0] || {issued:0,id:-1}));
  document.getElementById('fastMoversList').innerHTML = fast.length
    ? fast.map((p,i) => moverRowHtml(p, i+1, maxIssued)).join('')
    : `<div class="empty-state" style="padding:24px;">No fast-moving parts this month.</div>`;

  document.getElementById('slowMoversList').innerHTML = slow.length
    ? slow.map(p => `<div class="mover-row" style="padding:8px 4px;">
        <div class="mover-name" style="flex:1;">${escapeHtml(p.name)} ${p.partno ? `<span class="part-no" style="margin-left:6px;">${escapeHtml(p.partno)}</span>` : ''}</div>
        <div class="cat-tag" style="margin-right:8px;">${escapeHtml(p.category)}</div>
        <div class="stock-badge ${stockClass(getStock(p.id))}">${getStock(p.id)}</div>
      </div>`).join('')
    : `<div class="empty-state" style="padding:24px;">No slow-moving parts.</div>`;
}

/* ---------------- Entry form ---------------- */

function setEntryType(type) {
  entryType = type;
  document.getElementById('toggleIn').classList.toggle('active-in', type === 'in');
  document.getElementById('toggleOut').classList.toggle('active-out', type === 'out');
  renderEntryPreview();
}

function selectEntryPart(p) {
  entrySelectedPart = p;
  document.getElementById('entryPartSearch').value = p.name;
  document.getElementById('entryAcList').classList.remove('show');
  renderEntryPreview();
}

function renderEntryPreview() {
  const box = document.getElementById('entryPreview');
  if (!entrySelectedPart) {
    box.innerHTML = `<div style="color:var(--text-faint); text-align:center; padding:20px 0;">Search and select a part to see live stock details</div>`;
    return;
  }
  const p = entrySelectedPart;
  const s = getStock(p.id);
  const qty = parseInt(document.getElementById('entryQty').value) || 0;
  const projected = entryType === 'in' ? s + qty : s - qty;
  const sc = stockClass(s);
  box.innerHTML = `
    <div class="pp-name">${escapeHtml(p.name)}</div>
    <div class="pp-row"><span>Part No.</span><b>${escapeHtml(p.partno || '—')}</b></div>
    <div class="pp-row"><span>Category</span><b>${escapeHtml(p.category)}</b></div>
    <div class="pp-row"><span>Current Stock</span><b><span class="stock-badge ${sc}">${s}</span></b></div>
    <div class="pp-row"><span>Issued this month</span><b>${getTotalIssued(p)}</b></div>
    ${qty > 0 ? `<div class="pp-row"><span>Stock After This Entry</span><b style="color:${projected<=LOW_STOCK_THRESHOLD ? 'var(--red)' : 'var(--green)'}">${projected}</b></div>` : ''}
  `;
}

function renderAutocomplete(query) {
  const list = document.getElementById('entryAcList');
  if (!query) { list.classList.remove('show'); return; }
  const q = query.toLowerCase();
  const matches = activeParts().filter(p => p.name.toLowerCase().includes(q) || (p.partno||'').toLowerCase().includes(q)).slice(0, 30);
  if (!matches.length) { list.innerHTML = `<div class="ac-item" style="color:var(--text-faint);">No matches</div>`; list.classList.add('show'); return; }
  list.innerHTML = matches.map(p => `<div class="ac-item" data-id="${p.id}">
      <div class="ac-name">${escapeHtml(p.name)}</div>
      <div class="ac-meta">${escapeHtml(p.partno || 'no part no.')} · ${escapeHtml(p.category)} · stock ${getStock(p.id)}</div>
    </div>`).join('');
  list.classList.add('show');
  list.querySelectorAll('.ac-item[data-id]').forEach(el => {
    el.addEventListener('click', () => {
      const p = getPart(parseInt(el.dataset.id));
      if (p) selectEntryPart(p);
    });
  });
}

/* ---------------- Remarks history suggestions ---------------- */

function getRemarksFrequency() {
  const freq = {};
  STATE.transactions.forEach(t => {
    const r = (t.remarks || '').trim();
    if (!r) return;
    const key = r.toLowerCase();
    if (!freq[key]) freq[key] = { text: r, count: 0 };
    freq[key].count++;
  });
  return Object.values(freq).sort((a,b) => b.count - a.count);
}

function renderRemarksAutocomplete(query) {
  const list = document.getElementById('entryRemarksAcList');
  const all = getRemarksFrequency();
  const q = query.trim().toLowerCase();
  const matches = (q ? all.filter(r => r.text.toLowerCase().includes(q)) : all).slice(0, 8);
  if (!matches.length) { list.classList.remove('show'); return; }
  list.innerHTML = matches.map(r => `<div class="ac-item" data-remark="${escapeHtml(r.text)}">
      <div class="ac-name">${escapeHtml(r.text)}</div>
      <div class="ac-meta">used ${r.count} time${r.count>1?'s':''} before</div>
    </div>`).join('');
  list.classList.add('show');
  list.querySelectorAll('.ac-item[data-remark]').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('entryRemarks').value = el.dataset.remark;
      list.classList.remove('show');
    });
  });
}

/* ---------------- Same-day entries panel ---------------- */

function renderSameDayEntries() {
  const date = document.getElementById('entryDate').value || todayISO();
  const container = document.getElementById('sameDayEntries');
  const dayTxns = STATE.transactions.filter(t => t.date === date).sort((a,b) => b.ts - a.ts);
  document.getElementById('sameDayCount').textContent = dayTxns.length + ' entr' + (dayTxns.length===1?'y':'ies');

  if (!dayTxns.length) {
    container.innerHTML = `<div style="color:var(--text-faint); text-align:center; padding:24px 10px; font-size:12.5px;">No entries recorded for ${fmtDate(date)} yet.</div>`;
    return;
  }

  container.innerHTML = dayTxns.map(t => `
    <div class="sd-row">
      <div class="sd-main">
        <div class="sd-name">${escapeHtml(t.partName)}</div>
        <div class="sd-meta">
          <span class="${t.type==='in' ? 'sd-qty-in' : 'sd-qty-out'}">${t.type==='in' ? '↓' : '↑'} ${t.qty}</span>
          <span>·</span>
          <span>${t.partNo ? escapeHtml(t.partNo) : 'no part no.'}</span>
          ${t.remarks ? `<span>· ${escapeHtml(t.remarks)}</span>` : ''}
        </div>
      </div>
      <div class="sd-actions">
        <div class="icon-btn" title="Edit entry" onclick="startEditTxn('${t.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </div>
        <div class="icon-btn danger" title="Delete entry" onclick="deleteTxn('${t.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---------------- Transaction effect helpers ---------------- */

function applyTxnEffect(partId, type, qty) {
  const before = getStock(partId);
  const after = type === 'in' ? before + qty : before - qty;
  STATE.stocks[partId] = after;
  if (type === 'out') STATE.outboundNew[partId] = (STATE.outboundNew[partId] || 0) + qty;
  else STATE.inboundNew[partId] = (STATE.inboundNew[partId] || 0) + qty;
  return after;
}

function revertTxnEffect(txn) {
  const before = getStock(txn.partId);
  const reverted = txn.type === 'in' ? before - txn.qty : before + txn.qty;
  STATE.stocks[txn.partId] = reverted;
  if (txn.type === 'out') STATE.outboundNew[txn.partId] = Math.max(0, (STATE.outboundNew[txn.partId] || 0) - txn.qty);
  else STATE.inboundNew[txn.partId] = Math.max(0, (STATE.inboundNew[txn.partId] || 0) - txn.qty);
}

/* ---------------- Entry submit / edit / delete ---------------- */

async function submitEntry() {
  if (!entrySelectedPart) { showToast('Select a part', 'Choose a part from the list before recording.', 'error'); return; }
  const qty = parseInt(document.getElementById('entryQty').value);
  if (!qty || qty <= 0) { showToast('Invalid quantity', 'Enter a quantity greater than zero.', 'error'); return; }
  const date = document.getElementById('entryDate').value || todayISO();
  const remarks = document.getElementById('entryRemarks').value.trim();
  const p = entrySelectedPart;

  if (editingTxnId) {
    // revert the original transaction's stock effect, then apply the new one
    revertTxnEffect(editingOriginal);
    const after = applyTxnEffect(p.id, entryType, qty);

    const idx = STATE.transactions.findIndex(t => t.id === editingTxnId);
    if (idx !== -1) {
      STATE.transactions[idx] = Object.assign({}, STATE.transactions[idx], {
        partId: p.id, partName: p.name, partNo: p.partno, category: p.category,
        type: entryType, qty, remarks, date, editedAt: Date.now()
      });
    }
    await saveState();
    showToast('Entry updated', `${p.name} — now ${after} in stock.`, 'success');
    if (after <= LOW_STOCK_THRESHOLD) {
      showToast('Low stock alert', `${p.name} is now at ${after} unit${after===1?'':'s'}.`, 'error');
    }
    cancelEditTxn();
  } else {
    const before = getStock(p.id);
    const after = applyTxnEffect(p.id, entryType, qty);

    const txn = {
      id: 'txn_' + Date.now() + '_' + Math.floor(Math.random()*1000),
      ts: Date.now(),
      partId: p.id,
      partName: p.name,
      partNo: p.partno,
      category: p.category,
      type: entryType,
      qty, remarks, date
    };
    STATE.transactions.unshift(txn);
    await saveState();

    showToast(
      entryType === 'in' ? 'Stock added' : 'Stock removed',
      `${p.name}: ${before} → ${after}`,
      'success'
    );
    if (after <= LOW_STOCK_THRESHOLD) {
      showToast('Low stock alert', `${p.name} is now at ${after} unit${after===1?'':'s'}. Consider sending a restock email from Overview.`, 'error');
    }

    document.getElementById('entryQty').value = '';
    document.getElementById('entryRemarks').value = '';
    entrySelectedPart = null;
    document.getElementById('entryPartSearch').value = '';
    renderEntryPreview();
  }

  renderOverview();
  renderSameDayEntries();
}

function startEditTxn(txnId) {
  const t = STATE.transactions.find(x => x.id === txnId);
  if (!t) return;
  editingTxnId = t.id;
  editingOriginal = Object.assign({}, t);

  setEntryType(t.type);
  const p = getPart(t.partId);
  if (p) {
    selectEntryPart(p);
  } else {
    // part was deleted from inventory — keep a read-only reference via snapshot
    entrySelectedPart = { id: t.partId, name: t.partName, partno: t.partNo, category: t.category, issued: 0 };
    document.getElementById('entryPartSearch').value = t.partName + ' (removed from inventory)';
    renderEntryPreview();
  }
  document.getElementById('entryQty').value = t.qty;
  document.getElementById('entryDate').value = t.date;
  document.getElementById('entryRemarks').value = t.remarks || '';

  document.getElementById('entryFormTitle').textContent = 'Edit Transaction';
  document.getElementById('btnSubmitEntry').textContent = 'Update Transaction';
  document.getElementById('btnCancelEdit').style.display = 'inline-block';

  const entryView = document.getElementById('view-entry');
  if (entryView && typeof entryView.scrollIntoView === 'function') {
    entryView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function cancelEditTxn() {
  editingTxnId = null;
  editingOriginal = null;
  document.getElementById('entryFormTitle').textContent = 'New Transaction';
  document.getElementById('btnSubmitEntry').textContent = 'Record Transaction';
  document.getElementById('btnCancelEdit').style.display = 'none';
  document.getElementById('entryQty').value = '';
  document.getElementById('entryRemarks').value = '';
  entrySelectedPart = null;
  document.getElementById('entryPartSearch').value = '';
  renderEntryPreview();
}

async function deleteTxn(txnId) {
  const t = STATE.transactions.find(x => x.id === txnId);
  if (!t) return;
  if (!confirm(`Delete this entry?\n\n${t.partName} — ${t.type === 'in' ? 'Inward' : 'Outward'} ${t.qty} on ${fmtDate(t.date)}\n\nThis will also reverse its effect on current stock.`)) return;

  revertTxnEffect(t);
  STATE.transactions = STATE.transactions.filter(x => x.id !== txnId);
  await saveState();

  if (editingTxnId === txnId) cancelEditTxn();

  renderOverview();
  renderSameDayEntries();
  renderLog();
  showToast('Entry deleted', `${t.partName} entry removed and stock adjusted.`, 'default');
}

/* ---------------- Log ---------------- */

function renderLog() {
  const tbody = document.getElementById('logTableBody');
  document.getElementById('navCountLog').textContent = STATE.transactions.length || '';
  document.getElementById('logEmptyState').style.display = STATE.transactions.length ? 'none' : 'block';
  tbody.innerHTML = STATE.transactions.map(t => `
    <tr>
      <td>${fmtDate(t.date)}</td>
      <td><span class="move-tag ${t.type==='in'?'fast':'slow'}" style="${t.type==='in' ? '' : 'color:var(--red); background:rgba(239,84,100,0.12);'}">${t.type === 'in' ? '↓ Inward' : '↑ Outward'}</span></td>
      <td class="part-name">${escapeHtml(t.partName)}</td>
      <td>${t.partNo ? `<span class="part-no">${escapeHtml(t.partNo)}</span>` : '—'}</td>
      <td style="font-family:var(--font-mono); font-weight:600;">${t.qty}</td>
      <td style="color:var(--text-muted);">${escapeHtml(t.remarks || '—')}</td>
      <td style="color:var(--text-faint); font-size:11px;">${new Date(t.ts).toLocaleString('en-IN')}</td>
      <td>
        <div style="display:flex; gap:6px;">
          <div class="icon-btn" title="Edit entry" onclick="switchView('entry'); startEditTxn('${t.id}');">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div class="icon-btn danger" title="Delete entry" onclick="deleteTxn('${t.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </div>
        </div>
      </td>
    </tr>
  `).join('');
}

async function clearLog() {
  if (!confirm('Clear the entire transaction log? This does not change current stock levels.')) return;
  STATE.transactions = [];
  await saveState();
  renderLog();
  renderSameDayEntries();
  showToast('Log cleared', 'Transaction history has been cleared.', 'default');
}

/* ---------------- Export Report (Excel) ---------------- */

function openExportModal() {
  document.getElementById('exportModal').classList.add('show');
}
function closeExportModal() {
  document.getElementById('exportModal').classList.remove('show');
}

// Returns {from, to} as ISO date strings (YYYY-MM-DD), or {from:null, to:null} for "all"
function getPeriodRange(period) {
  const today = new Date();
  const toISO = (d) => d.toISOString().split('T')[0];
  const todayStr = toISO(today);

  if (period === 'today') {
    return { from: todayStr, to: todayStr, label: 'Today (' + fmtDate(todayStr) + ')' };
  }
  if (period === 'week') {
    const day = today.getDay(); // 0=Sun
    const diffToMon = day === 0 ? 6 : day - 1;
    const monday = new Date(today); monday.setDate(today.getDate() - diffToMon);
    return { from: toISO(monday), to: todayStr, label: 'This Week (' + fmtDate(toISO(monday)) + ' – ' + fmtDate(todayStr) + ')' };
  }
  if (period === 'month') {
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    return { from: toISO(first), to: todayStr, label: 'This Month (' + fmtDate(toISO(first)) + ' – ' + fmtDate(todayStr) + ')' };
  }
  if (period === 'quarter') {
    const qStartMonth = Math.floor(today.getMonth() / 3) * 3;
    const first = new Date(today.getFullYear(), qStartMonth, 1);
    return { from: toISO(first), to: todayStr, label: 'This Quarter (' + fmtDate(toISO(first)) + ' – ' + fmtDate(todayStr) + ')' };
  }
  if (period === 'custom') {
    const from = document.getElementById('exportFrom').value;
    const to = document.getElementById('exportTo').value;
    return { from: from || null, to: to || todayStr, label: (from ? fmtDate(from) : 'Start') + ' – ' + (to ? fmtDate(to) : todayStr) };
  }
  // 'all'
  return { from: null, to: null, label: 'All Time' };
}

function txnInRange(t, from, to) {
  if (from && t.date < from) return false;
  if (to && t.date > to) return false;
  return true;
}

function runExport() {
  if (typeof XLSX === 'undefined') {
    showToast('Export unavailable', 'The Excel export library did not load. Check your internet connection and try again.', 'error');
    return;
  }
  const periodRadio = document.querySelector('#exportModal input[name=exportPeriod]:checked');
  const period = periodRadio ? periodRadio.value : 'month';
  const range = getPeriodRange(period);

  if (period === 'custom' && !range.from) {
    showToast('Pick a start date', 'Choose a "From" date for the custom range.', 'error');
    return;
  }

  const wantSummary = document.getElementById('sheetSummary').checked;
  const wantInventory = document.getElementById('sheetInventory').checked;
  const wantTransactions = document.getElementById('sheetTransactions').checked;
  const wantMovers = document.getElementById('sheetMovers').checked;

  if (!wantSummary && !wantInventory && !wantTransactions && !wantMovers) {
    showToast('Nothing selected', 'Choose at least one sheet to include in the report.', 'error');
    return;
  }

  const wb = XLSX.utils.book_new();
  const parts = activeParts();

  if (wantSummary) {
    const stats = computeStats();
    const periodTxns = STATE.transactions.filter(t => txnInRange(t, range.from, range.to));
    const inQty = periodTxns.filter(t => t.type === 'in').reduce((s, t) => s + t.qty, 0);
    const outQty = periodTxns.filter(t => t.type === 'out').reduce((s, t) => s + t.qty, 0);
    const summaryRows = [
      { Metric: 'Report Period', Value: range.label },
      { Metric: 'Generated On', Value: new Date().toLocaleString('en-IN') },
      { Metric: 'Total Active Parts', Value: stats.total },
      { Metric: 'Out of Stock (0)', Value: stats.zero },
      { Metric: 'Critical (≤1 unit)', Value: stats.critical },
      { Metric: 'Fast Moving Parts', Value: stats.fast },
      { Metric: 'Slow / Non-Moving Parts', Value: stats.slow },
      { Metric: 'Units Received In Period (Inward)', Value: inQty },
      { Metric: 'Units Issued In Period (Outward)', Value: outQty },
      { Metric: 'Transactions In Period', Value: periodTxns.length }
    ];
    const ws = XLSX.utils.json_to_sheet(summaryRows, { skipHeader: true });
    ws['!cols'] = [{ wch: 34 }, { wch: 40 }];
    XLSX.utils.sheet_add_aoa(ws, [['EFFORTS ENGINEERS — INVENTORY REPORT'], []], { origin: 'A1' });
    XLSX.utils.sheet_add_json(ws, summaryRows, { origin: 'A3', skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
  }

  if (wantInventory) {
    const rows = parts.map(p => ({
      'Part Name': p.name,
      'Part No.': p.partno || '',
      'Category': p.category,
      'Current Stock': getStock(p.id),
      'Issued (This Month)': getTotalIssued(p),
      'Movement': movementClass(p) === 'fast' ? 'Fast' : movementClass(p) === 'moderate' ? 'Moderate' : 'Slow / Non-moving',
      'Stock Status': stockClass(getStock(p.id)) === 'zero' ? 'Out of Stock' : stockClass(getStock(p.id)) === 'critical' ? 'Critical' : 'Healthy'
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 38 }, { wch: 16 }, { wch: 18 }, { wch: 12 }, { wch: 16 }, { wch: 14 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory Snapshot');
  }

  if (wantTransactions) {
    const filtered = STATE.transactions
      .filter(t => txnInRange(t, range.from, range.to))
      .sort((a, b) => a.date.localeCompare(b.date) || a.ts - b.ts);
    const rows = filtered.map(t => ({
      'Date': fmtDate(t.date),
      'Type': t.type === 'in' ? 'Inward' : 'Outward',
      'Part Name': t.partName,
      'Part No.': t.partNo || '',
      'Qty': t.qty,
      'Remarks': t.remarks || '',
      'Logged At': new Date(t.ts).toLocaleString('en-IN')
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 13 }, { wch: 10 }, { wch: 38 }, { wch: 16 }, { wch: 8 }, { wch: 26 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Transaction Log');
  }

  if (wantMovers) {
    const fast = parts.filter(p => movementClass(p) === 'fast').sort((a,b) => getTotalIssued(b) - getTotalIssued(a));
    const slow = parts.filter(p => movementClass(p) === 'slow');
    const rows = [];
    rows.push({ 'Movement': '— FAST MOVERS —', 'Part Name': '', 'Part No.': '', 'Category': '', 'Issued (Mo.)': '', 'Current Stock': '' });
    fast.forEach(p => rows.push({ 'Movement': 'Fast', 'Part Name': p.name, 'Part No.': p.partno || '', 'Category': p.category, 'Issued (Mo.)': getTotalIssued(p), 'Current Stock': getStock(p.id) }));
    rows.push({ 'Movement': '', 'Part Name': '', 'Part No.': '', 'Category': '', 'Issued (Mo.)': '', 'Current Stock': '' });
    rows.push({ 'Movement': '— SLOW / NON-MOVING —', 'Part Name': '', 'Part No.': '', 'Category': '', 'Issued (Mo.)': '', 'Current Stock': '' });
    slow.forEach(p => rows.push({ 'Movement': 'Slow', 'Part Name': p.name, 'Part No.': p.partno || '', 'Category': p.category, 'Issued (Mo.)': getTotalIssued(p), 'Current Stock': getStock(p.id) }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 20 }, { wch: 38 }, { wch: 16 }, { wch: 18 }, { wch: 13 }, { wch: 13 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Fast-Slow Movers');
  }

  const stamp = todayISO();
  const periodTag = period === 'custom' ? (range.from + '_to_' + range.to) : period;
  const filename = `EffortsEngineers_Inventory_Report_${periodTag}_${stamp}.xlsx`;

  try {
    XLSX.writeFile(wb, filename);
    showToast('Report downloaded', filename, 'success');
    closeExportModal();
  } catch (e) {
    showToast('Export failed', 'Could not generate the Excel file. ' + (e.message || ''), 'error');
  }
}

/* ---------------- Init ---------------- */

async function init() {
  await loadState();
  populateCategoryFilter();
  attachSortHandlers();
  renderOverview();
  renderInventoryTable();

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchView(item.dataset.view));
  });

  document.getElementById('btnEmailOverview').addEventListener('click', prepareEmail);

  ['invSearch','invCategoryFilter','invStockFilter','invMoveFilter'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderInventoryTable);
    document.getElementById(id).addEventListener('change', renderInventoryTable);
  });

  document.getElementById('toggleIn').addEventListener('click', () => setEntryType('in'));
  document.getElementById('toggleOut').addEventListener('click', () => setEntryType('out'));
  document.getElementById('entryQty').addEventListener('input', renderEntryPreview);
  document.getElementById('entryDate').addEventListener('change', renderSameDayEntries);
  document.getElementById('entryPartSearch').addEventListener('input', (e) => {
    entrySelectedPart = null;
    renderAutocomplete(e.target.value);
  });
  document.getElementById('entryRemarks').addEventListener('focus', (e) => renderRemarksAutocomplete(e.target.value));
  document.getElementById('entryRemarks').addEventListener('input', (e) => renderRemarksAutocomplete(e.target.value));

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.autocomplete-wrap')) {
      document.getElementById('entryAcList').classList.remove('show');
      document.getElementById('entryRemarksAcList').classList.remove('show');
    }
  });

  document.getElementById('btnSubmitEntry').addEventListener('click', submitEntry);
  document.getElementById('btnCancelEdit').addEventListener('click', cancelEditTxn);
  document.getElementById('entryDate').value = todayISO();

  document.getElementById('btnClearLog').addEventListener('click', clearLog);

  // edit/delete part modals
  document.getElementById('closeEditPartModal').addEventListener('click', closeEditPartModal);
  document.getElementById('cancelEditPart').addEventListener('click', closeEditPartModal);
  document.getElementById('saveEditPart').addEventListener('click', saveEditPartHandler);
  document.getElementById('closeDeletePartModal').addEventListener('click', closeDeletePartModal);
  document.getElementById('cancelDeletePart').addEventListener('click', closeDeletePartModal);
  document.getElementById('confirmDeletePart').addEventListener('click', confirmDeletePartHandler);
  document.getElementById('editPartModal').addEventListener('click', (e) => { if (e.target.id === 'editPartModal') closeEditPartModal(); });
  document.getElementById('deletePartModal').addEventListener('click', (e) => { if (e.target.id === 'deletePartModal') closeDeletePartModal(); });

  // export report modal
  document.getElementById('btnOpenExport').addEventListener('click', openExportModal);
  document.getElementById('closeExportModal').addEventListener('click', closeExportModal);
  document.getElementById('cancelExport').addEventListener('click', closeExportModal);
  document.getElementById('exportModal').addEventListener('click', (e) => { if (e.target.id === 'exportModal') closeExportModal(); });
  document.querySelectorAll('#exportModal .opt-row[data-period]').forEach(row => {
    row.addEventListener('click', () => {
      row.querySelector('input[type=radio]').checked = true;
      document.querySelectorAll('#exportModal .opt-row[data-period]').forEach(r => r.classList.toggle('checked', r === row));
      document.getElementById('customRangeRow').classList.toggle('show', row.dataset.period === 'custom');
    });
  });
  document.querySelectorAll('#exportModal .opt-row[data-sheet]').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT') { row.classList.toggle('checked', e.target.checked); return; }
      const box = row.querySelector('input[type=checkbox]');
      box.checked = !box.checked;
      row.classList.toggle('checked', box.checked);
    });
  });
  document.getElementById('confirmExport').addEventListener('click', runExport);

  renderSameDayEntries();
}

init();

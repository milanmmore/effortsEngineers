#!/usr/bin/env python3
"""
Reads Efforts_Engineers_Parts_Photo_Master_Sheet.xlsx and writes 02_seed.sql.

Usage:  python generate_seed.py [path/to/workbook.xlsx] [output.sql]

Photo ID, File Name, Alt Text and Page URL are recomputed here with the same
rules as the sheet formulas (the formula cells may have no cached values).
"""
import sys
from collections import defaultdict
import openpyxl

SRC = sys.argv[1] if len(sys.argv) > 1 else "Efforts_Engineers_Parts_Photo_Master_Sheet.xlsx"
OUT = sys.argv[2] if len(sys.argv) > 2 else "02_seed.sql"

# Models marked OEM-confirmed are published by default. Everything else stays
# unpublished until the team verifies it. Change here if you prefer otherwise.
PUBLISH_CONFIDENCE = {"Confirmed (OEM page)", "Confirmed (OEM manual title)"}


def q(v):
    """SQL literal."""
    if v is None or (isinstance(v, str) and v.strip() == ""):
        return "NULL"
    if isinstance(v, bool):
        return "TRUE" if v else "FALSE"
    if isinstance(v, (int, float)):
        return str(int(v)) if float(v).is_integer() else str(v)
    return "'" + str(v).strip().replace("'", "''") + "'"


def rows(ws, min_row=2, max_col=None):
    for r in ws.iter_rows(min_row=min_row, max_col=max_col, values_only=True):
        if r and r[0] not in (None, ""):
            yield r


wb = openpyxl.load_workbook(SRC)

# ---- Lists -> brands -------------------------------------------------------
brands = [(r[0], r[1]) for r in rows(wb["Lists"], max_col=2)]
brand_code = dict(brands)

# ---- Series ----------------------------------------------------------------
series = [r[:5] for r in rows(wb["Series"], max_col=5)]  # brand,name,code,slug,type
series_by_name = {s[1]: s for s in series}

# ---- Models ----------------------------------------------------------------
models = [r[:6] for r in rows(wb["Model_List"], max_col=6)]

# ---- Part categories -------------------------------------------------------
cats = [r[:4] for r in rows(wb["Part_Categories"], max_col=4)]  # code,name,slug,tip
cat_by_name = {c[1]: c for c in cats}

# ---- Master photo sheet ----------------------------------------------------
# A..Q: SrNo Brand Series Category PhotoID FileName Compat Desc PartNo Material
#       Status Source View Stock Alt PageURL Remarks
parts = []
seq_counter = defaultdict(int)
for r in rows(wb["Master_Photo_Sheet"], max_col=17):
    brand, ser, cat = r[1], r[2], r[3]
    s = series_by_name[ser]
    c = cat_by_name[cat]
    seq_counter[(ser, cat)] += 1
    seq = seq_counter[(ser, cat)]
    photo_id = f"{brand_code[brand]}-{s[2]}-{c[0]}-{seq:02d}"
    parts.append(dict(
        photo_id=photo_id, series=ser, category=cat, seq=seq,
        file_name=photo_id + ".jpg",
        desc=r[7], pno=r[8], material=r[9],
        status=r[10] or "To Shoot", source=r[11], view=r[12], stock=r[13],
        alt=f"{ser} {cat} spare part - Efforts Engineers",
        url=f"/{brand.lower()}/{s[3]}/{c[2]}",
        remarks=r[16],
    ))

# ---- Sanity checks (fail loudly rather than write bad SQL) -----------------
assert len({p["photo_id"] for p in parts}) == len(parts), "duplicate Photo IDs"
assert len({(m[1], m[2]) for m in models}) == len(models), "duplicate model in a series"
for m in models:
    assert m[1] in series_by_name, f"model {m[2]} has unknown series {m[1]}"

# ---- Write SQL -------------------------------------------------------------
o = []
w = o.append
w("-- Seed data generated from the Parts Photo Master Sheet by generate_seed.py")
w("-- Run AFTER 01_schema.sql. Re-running is safe: existing rows are left untouched")
w("-- (ON CONFLICT DO NOTHING), so edits made in the database are never overwritten.")
w("BEGIN;\n")

w("-- Brands")
w("INSERT INTO catalog.brands (name, slug, code, display_order) VALUES")
w(",\n".join(f"  ({q(n)}, {q(n.lower())}, {q(c)}, {i})" for i, (n, c) in enumerate(brands, 1)))
w("ON CONFLICT DO NOTHING;\n")

w("-- Series")
w("INSERT INTO catalog.series (brand_id, name, series_code, slug, type_drive, display_order)")
w("SELECT b.id, v.name, v.code, v.slug, v.type_drive, v.ord FROM (VALUES")
w(",\n".join(f"  ({q(s[0])}, {q(s[1])}, {q(s[2])}, {q(s[3])}, {q(s[4])}, {i})"
             for i, s in enumerate(series, 1)))
w(") AS v(brand, name, code, slug, type_drive, ord)")
w("JOIN catalog.brands b ON b.name = v.brand")
w("ON CONFLICT DO NOTHING;\n")

w("-- Part categories")
w("INSERT INTO catalog.part_categories (code, name, slug, photo_tip, display_order) VALUES")
w(",\n".join(f"  ({q(c[0])}, {q(c[1])}, {q(c[2])}, {q(c[3])}, {i})" for i, c in enumerate(cats, 1)))
w("ON CONFLICT DO NOTHING;\n")

w("-- Models (published = OEM-confirmed only; review the rest before publishing)")
w("INSERT INTO catalog.models (series_id, name, cylinders, data_confidence, source_note, is_published)")
w("SELECT s.id, v.name, v.cyl, v.conf, v.note, v.pub FROM (VALUES")
w(",\n".join(
    f"  ({q(m[1])}, {q(m[2])}, {q(m[3]) if m[3] is not None else 'NULL'}::int, "
    f"{q(m[4])}, {q(m[5])}, {q(m[4] in PUBLISH_CONFIDENCE)})" for m in models))
w(") AS v(series, name, cyl, conf, note, pub)")
w("JOIN catalog.series s ON s.name = v.series")
w("ON CONFLICT DO NOTHING;\n")

w("-- Parts / photo slots (unpublished until description, part number and photo exist)")
w("INSERT INTO catalog.parts (photo_id, series_id, category_id, seq, file_name, part_description,")
w("    part_number, material_size, stock_status, alt_text, page_url, photo_status, photo_source,")
w("    photo_view, remarks)")
w("SELECT v.photo_id, s.id, c.id, v.seq, v.file_name, v.descr, v.pno, v.material, v.stock, v.alt,")
w("       v.url, v.status, v.source, v.view, v.remarks FROM (VALUES")
w(",\n".join(
    f"  ({q(p['photo_id'])}, {q(p['series'])}, {q(p['category'])}, {p['seq']}::smallint, "
    f"{q(p['file_name'])}, {q(p['desc'])}::text, {q(p['pno'])}::text, {q(p['material'])}::text, "
    f"{q(p['stock'])}::text, {q(p['alt'])}, {q(p['url'])}, {q(p['status'])}, "
    f"{q(p['source'])}::text, {q(p['view'])}::text, {q(p['remarks'])}::text)" for p in parts))
w(") AS v(photo_id, series, category, seq, file_name, descr, pno, material, stock, alt, url,")
w("       status, source, view, remarks)")
w("JOIN catalog.series s          ON s.name = v.series")
w("JOIN catalog.part_categories c ON c.name = v.category")
w("ON CONFLICT DO NOTHING;\n")

w("COMMIT;")

open(OUT, "w", encoding="utf-8").write("\n".join(o) + "\n")
print(f"Wrote {OUT}: {len(brands)} brands, {len(series)} series, {len(models)} models, "
      f"{len(cats)} categories, {len(parts)} parts")

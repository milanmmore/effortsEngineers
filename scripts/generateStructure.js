const fs = require('fs');
const path = require('path');

function createStructure(base, obj) {
  const force = process.argv.includes('--force');
  let created = 0;
  let skipped = 0;

  function writeStructure(currentBase, currentObject) {
    for (const key in currentObject) {
      const target = path.join(currentBase, key);
      if (typeof currentObject[key] === 'object') {
        fs.mkdirSync(target, { recursive: true });
        writeStructure(target, currentObject[key]);
      } else if (force || !fs.existsSync(target)) {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, currentObject[key]);
        created += 1;
      } else {
        skipped += 1;
      }
    }
  }

  writeStructure(base, obj);
  return { created, skipped };
}

// Backend structure
const backendStructure = {
  'server.js': '',
  'config': { 'db.js': '' },
  'routes': {
    'catalog.js': '',
    'quotation.js': '',
    'clients.js': '',
    'orders.js': '',
    'inventory.js': '',
    'dashboard.js': '',
    'auth.js': ''
  },
  'controllers': {},
  'models': {},
  'utils': { 'pdfGenerator.js': '' }
};

// Frontend structure (Next.js)
const frontendStructure = {
  'app': {
    'client': {
      'catalog': { 'page.js': '' },
      'quotation': { 'page.js': '' },
      'dashboard': { 'page.js': '' }
    },
    'admin': {
      'dashboard': { 'page.js': '' },
      'orders': { 'page.js': '' },
      'inventory': { 'page.js': '' },
      'forecasting': { 'page.js': '' }
    },
    'auth': {
      'login': { 'page.js': '' },
      'register': { 'page.js': '' }
    },
    'page.js': '' // root landing page
  },
  'components': {
    'Navbar.js': '',
    'Footer.js': '',
    'ChartCard.js': ''
  },
  'lib': {
    'auth.js': '',
    'axiosClient.js': ''
  },
  'context': { 'AuthContext.js': '' },
  'styles': {},
  'public': {},
  'next.config.js': '',
  'package.json': ''
};

// Create backend and frontend
const backendResult = createStructure(path.join(__dirname, '..', 'effortsengineers-backend'), backendStructure);
const frontendResult = createStructure(path.join(__dirname, '..', 'effortsengineers-frontend'), frontendStructure);

console.log(`Scaffold complete. Created ${backendResult.created + frontendResult.created} files; skipped ${backendResult.skipped + frontendResult.skipped} existing files.`);
if (process.argv.includes('--force')) {
  console.warn('Force mode was enabled and existing files may have been replaced.');
}

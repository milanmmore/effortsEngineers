require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./db');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.query(sql);
    console.log('Schema applied successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to apply schema:', err);
    process.exit(1);
  }
})();

const fs = require('fs');
const path = require('path');
const { dialog } = require('electron').remote;
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'erp.db');
const db = new sqlite3.Database(dbPath);

// Export any table to CSV
function exportToCSV(tableName) {
  db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
    if (err) return alert('Error exporting');

    const headers = Object.keys(rows[0] || {}).join(',');
    const csv = rows.map(row => Object.values(row).join(',')).join('\n');
    const fullCsv = `${headers}\n${csv}`;

    const savePath = dialog.showSaveDialogSync({ defaultPath: `${tableName}.csv` });
    if (savePath) fs.writeFileSync(savePath, fullCsv);
    alert('Exported successfully!');
  });
}

// Import from CSV into any table (simple schema matching only)
function importFromCSV(tableName) {
  const openPath = dialog.showOpenDialogSync({ filters: [{ name: 'CSV Files', extensions: ['csv'] }] });
  if (!openPath) return;

  const fileContent = fs.readFileSync(openPath[0], 'utf-8');
  const lines = fileContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');

  db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO ${tableName} (${headers.join(',')}) VALUES (${headers.map(() => '?').join(',')})`);
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      stmt.run(values);
    }
    stmt.finalize(() => alert('Import complete!'));
  });
}

window.exportToCSV = exportToCSV;
window.importFromCSV = importFromCSV;

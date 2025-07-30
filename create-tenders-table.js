const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('erp.db');

// Create tenders table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tenders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tender_id TEXT NOT NULL,
    tender_amount REAL NOT NULL,
    last_date TEXT NOT NULL,
    type TEXT NOT NULL, -- Above/Below/At
    work_amount REAL NOT NULL
  )`);

  console.log("Tenders table created successfully.");
});

db.close();

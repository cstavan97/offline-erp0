const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('erp.db');

// Create expenses table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    workorder_id INTEGER,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(workorder_id) REFERENCES workorders(id)
  )`);

  console.log("Expenses table created successfully.");
});

db.close();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/erp.db');

// Create attendance table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    workorder_id INTEGER,
    date TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Present', 'Absent')),
    remarks TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(workorder_id) REFERENCES workorders(id)
  )`);

  console.log("Attendance table created successfully.");
});

db.close();

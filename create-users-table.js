const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('erp.db');

// Create Users Table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);

  // Insert default users
  const stmt = db.prepare("INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)");

  stmt.run("admin", "admin123", "Admin");
  stmt.run("supervisor", "sup123", "Site Supervisor");
  stmt.run("accountant", "acc123", "Accountant");

  stmt.finalize();
});

db.close(() => {
  console.log("✅ Users table created and default users inserted.");
});

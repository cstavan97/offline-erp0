const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../db/erp.db');
const db = new sqlite3.Database(dbPath);

function submitAttendance() {
  const date = document.getElementById('date').value;
  const labour = document.getElementById('labour').value.trim();
  const hours = document.getElementById('hours').value;

  if (!date || !labour || !hours) {
    document.getElementById('msg').textContent = 'All fields are required.';
    return;
  }

  db.run(
    `INSERT INTO attendance (date, labour_name, hours) VALUES (?, ?, ?)`,
    [date, labour, hours],
    function (err) {
      if (err) {
        console.error(err);
        document.getElementById('msg').textContent = 'Failed to save.';
      } else {
        document.getElementById('msg').textContent = 'Attendance saved!';
      }
    }
  );
}

window.submitAttendance = submitAttendance;

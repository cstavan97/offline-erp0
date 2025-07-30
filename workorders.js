const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../db/erp.db');
const db = new sqlite3.Database(dbPath);

function saveWorkOrder() {
  const work_id = document.getElementById("work_id").value;
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;
  const status = document.getElementById("status").value;

  db.run(
    `INSERT INTO work_orders (work_id, description, amount, start_date, end_date, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [work_id, description, amount, start_date, end_date, status, "admin"],
    (err) => {
      if (err) {
        document.getElementById("msg").innerText = "Error saving: " + err;
      } else {
        document.getElementById("msg").innerText = "Work Order Saved!";
        showAllWorkOrders();
      }
    }
  );
}

function showAllWorkOrders() {
  db.all("SELECT * FROM work_orders", [], (err, rows) => {
    if (err) return;
    const list = rows.map(w => `
      <div style="border:1px solid #ccc; padding:5px; margin:5px;">
        <strong>${w.work_id}</strong> (${w.status})<br />
        ${w.description}<br />
        ₹${w.amount} | ${w.start_date} to ${w.end_date}
      </div>
    `).join("");
    document.getElementById("workorders-list").innerHTML = list;
  });
}

// Auto-load on open
showAllWorkOrders();

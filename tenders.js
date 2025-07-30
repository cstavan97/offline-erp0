const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('erp.db');

const tenderForm = document.getElementById('tender-form');
const tenderTableBody = document.getElementById('tender-table-body');

function loadTenders() {
  tenderTableBody.innerHTML = ''; // Clear previous rows

  db.all('SELECT * FROM tenders', [], (err, rows) => {
    if (err) {
      console.error('Error loading tenders:', err);
      return;
    }

    rows.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.tender_id}</td>
        <td>${row.tender_amount}</td>
        <td>${row.last_date}</td>
        <td>${row.ab_type}</td>
        <td>${row.work_amount}</td>
      `;
      tenderTableBody.appendChild(tr);
    });
  });
}

tenderForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const tenderId = document.getElementById('tenderId').value;
  const tenderAmount = parseFloat(document.getElementById('tenderAmount').value);
  const lastDate = document.getElementById('lastDate').value;
  const abType = document.getElementById('abType').value;
  const workAmount = parseFloat(document.getElementById('workAmount').value);

  db.run(
    `INSERT INTO tenders (tender_id, tender_amount, last_date, ab_type, work_amount)
     VALUES (?, ?, ?, ?, ?)`,
    [tenderId, tenderAmount, lastDate, abType, workAmount],
    function (err) {
      if (err) {
        console.error('Error inserting tender:', err);
      } else {
        alert('Tender added successfully!');
        tenderForm.reset();
        loadTenders();
      }
    }
  );
});

// Initial load
loadTenders();

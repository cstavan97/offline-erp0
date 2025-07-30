const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'erp.db');
const db = new sqlite3.Database(dbPath);

function loadExpenses() {
  const table = document.getElementById('expense-table').querySelector('tbody');
  table.innerHTML = '';

  let query = 'SELECT * FROM expenses';
  let params = [];

  if (currentRole === 'site-supervisor') {
    query += ' WHERE added_by = ?';
    params.push(currentUser);
  }

  db.all(query, params, (err, rows) => {
    if (err) return console.error(err);

    rows.forEach(row => {
      const tr = document.createElement('tr');
      const canEdit = currentRole === 'admin' || currentRole === 'accountant' || row.added_by === currentUser;
      tr.innerHTML = `
        <td><input type="date" value="${row.date}" onchange="editExpense(${row.id}, 'date', this.value)" ${!canEdit ? 'disabled' : ''}></td>
        <td><input type="text" value="${row.description}" onchange="editExpense(${row.id}, 'description', this.value)" ${!canEdit ? 'disabled' : ''}></td>
        <td><input type="number" value="${row.amount}" onchange="editExpense(${row.id}, 'amount', this.value)" ${!canEdit ? 'disabled' : ''}></td>
        <td>${row.added_by}</td>
        <td>
          ${currentRole === 'admin' ? `<button onclick="deleteExpense(${row.id})">Delete</button>` : ''}
        </td>
      `;
      table.appendChild(tr);
    });
  });
}

function saveExpense() {
  const date = document.getElementById('expense-date').value;
  const desc = document.getElementById('expense-desc').value.trim();
  const amt = document.getElementById('expense-amount').value;

  if (!date || !desc || !amt) return alert('All fields required');

  db.run(
    'INSERT INTO expenses (date, description, amount, added_by) VALUES (?, ?, ?, ?)',
    [date, desc, amt, currentUser],
    err => {
      const msg = document.getElementById('exp-msg');
      if (err) {
        msg.style.color = 'red';
        msg.textContent = 'Failed to save expense.';
        return;
      }
      msg.style.color = 'green';
      msg.textContent = 'Expense saved successfully!';
      loadExpenses();
    }
  );
}

function editExpense(id, field, value) {
  db.run(`UPDATE expenses SET ${field} = ? WHERE id = ?`, [value, id], err => {
    if (err) console.error(err);
  });
}

function deleteExpense(id) {
  if (!confirm('Delete this expense?')) return;
  db.run('DELETE FROM expenses WHERE id = ?', [id], err => {
    if (err) console.error(err);
    loadExpenses();
  });
}

window.onload = () => {
  if (currentRole === 'accountant') {
    document.getElementById('add-expense-section').style.display = 'none';
  }
  loadExpenses();
};

window.saveExpense = saveExpense;
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;

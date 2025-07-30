const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../db/erp.db');
const db = new sqlite3.Database(dbPath);

function loadUsers() {
  const tableBody = document.querySelector('#users-table tbody');
  tableBody.innerHTML = '';

  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return console.error(err);

    rows.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.username}</td>
        <td>${row.role}</td>
        <td>
          <button onclick="editUser('${row.username}', '${row.role}')">Edit</button>
          <button onclick="deleteUser('${row.username}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  });
}

function saveUser() {
  const uname = document.getElementById('new-username').value.trim();
  const pass = document.getElementById('new-password').value.trim();
  const role = document.getElementById('new-role').value;

  if (!uname || !pass) return alert('Please enter username and password');

  db.run(
    'INSERT OR REPLACE INTO users (username, password, role) VALUES (?, ?, ?)',
    [uname, pass, role],
    err => {
      const msg = document.getElementById('status-msg');
      if (err) {
        msg.style.color = 'red';
        msg.textContent = 'Error saving user';
        return console.error(err);
      }
      msg.style.color = 'green';
      msg.textContent = 'User saved successfully';
      loadUsers();
    }
  );
}

function deleteUser(username) {
  if (!confirm(`Delete user ${username}?`)) return;
  db.run('DELETE FROM users WHERE username = ?', [username], err => {
    if (err) return console.error(err);
    loadUsers();
  });
}

function editUser(username, role) {
  document.getElementById('new-username').value = username;
  document.getElementById('new-role').value = role;
  document.getElementById('new-password').value = '';
}

window.onload = loadUsers;
window.saveUser = saveUser;
window.deleteUser = deleteUser;
window.editUser = editUser;

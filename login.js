const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db', 'erp.sqlite3');
const db = new sqlite3.Database(dbPath);

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginMessage = document.getElementById('loginMessage');

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error(err.message);
      loginMessage.textContent = 'An error occurred.';
    } else if (!row) {
      loginMessage.textContent = 'Invalid username or password';
    } else {
      // Save user info to localStorage for role-based access later
      localStorage.setItem('currentUser', JSON.stringify({
        id: row.id,
        username: row.username,
        role: row.role
      }));

      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    }
  });
});

// renderer/login.js

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginMessage = document.getElementById('loginMessage');

  try {
    const user = await window.electronAPI.loginUser(username, password);

    if (!user) {
      loginMessage.textContent = 'Invalid username or password.';
    } else {
      // Save user data for use in dashboard (role-based access)
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    }
  } catch (err) {
    console.error('Login error:', err);
    loginMessage.textContent = 'Login failed due to an internal error.';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');

  if (!form || !message) {
    console.error('Login form or message element not found in the HTML.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const user = await window.electronAPI.loginUser(username, password);

      if (!user) {
        message.textContent = 'Invalid username or password.';
        return;
      }

      // Store the logged-in user
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } catch (err) {
      console.error('Login Error:', err);
      message.textContent = 'Login failed due to an internal error.';
    }
  });
});

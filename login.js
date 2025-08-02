function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Hardcoded credentials for testing
  if (username === "admin" && password === "admin123") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error-msg").innerText = "Invalid username or password.";
  }
}

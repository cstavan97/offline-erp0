// renderer/auth.js

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("You are not logged in!");
    window.location.href = "login.html";
  }

  const currentPage = window.location.pathname;

  const role = user.role;

  // Role-based page restrictions
  const roleAccess = {
    admin: ["users.html", "attendance.html", "expenses.html", "workorders.html", "tenders.html"],
    manager: ["attendance.html", "workorders.html", "tenders.html"],
    user: ["attendance.html", "workorders.html"],
  };

  const allowedPages = roleAccess[role];
  const pageName = currentPage.substring(currentPage.lastIndexOf("/") + 1);

  if (!allowedPages.includes(pageName)) {
    alert("You do not have permission to access this page!");
    window.location.href = "dashboard.html";
  }
});

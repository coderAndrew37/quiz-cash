// Toggle sidebar open/close on menu icon click with authentication check
document.getElementById("menu-toggle").addEventListener("click", function () {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to login if user is not authenticated
    window.location.href = "/login.html";
    return;
  }

  // Open sidebar if authenticated
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("open");
});

// Close sidebar when close button is clicked
document.getElementById("menu-close").addEventListener("click", function () {
  document.getElementById("side-menu").classList.remove("open");
});

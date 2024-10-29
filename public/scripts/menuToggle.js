// Toggle sidebar open/close on menu icon click
document.getElementById("menu-toggle").addEventListener("click", function () {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("open");
});

// Close sidebar when close button is clicked
document.getElementById("menu-close").addEventListener("click", function () {
  document.getElementById("side-menu").classList.remove("open");
});

document.getElementById("menu-toggle").addEventListener("click", function () {
  const sideMenu = document.getElementById("side-menu");
  if (sideMenu.classList.contains("open")) {
    sideMenu.classList.remove("open");
  } else {
    sideMenu.classList.add("open");
  }
});

document.getElementById("menu-close").addEventListener("click", function () {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.remove("open");
});

import { loadQuizzes, startQuiz } from "./quiz.js";

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

// Make startQuiz globally accessible
window.startQuiz = startQuiz;

// Load quizzes when the page loads
document.addEventListener("DOMContentLoaded", loadQuizzes);

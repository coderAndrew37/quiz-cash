import { loadQuizzes, startQuiz } from "./quiz.js";

document.getElementById("menu-toggle").addEventListener("click", function () {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("open");
});

document.getElementById("menu-close").addEventListener("click", function () {
  document.getElementById("side-menu").classList.remove("open");
});

// Make startQuiz globally accessible
window.startQuiz = startQuiz;

// Load quizzes when the page loads
document.addEventListener("DOMContentLoaded", loadQuizzes);

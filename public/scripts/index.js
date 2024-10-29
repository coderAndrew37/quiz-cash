// index.js

import { loadQuizzes, startQuiz as importedStartQuiz } from "./quiz.js"; // Rename the imported function

document.getElementById("menu-toggle").addEventListener("click", function () {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("open");
});

document.getElementById("menu-close").addEventListener("click", function () {
  document.getElementById("side-menu").classList.remove("open");
});

// Make startQuiz globally accessible
window.startQuiz = importedStartQuiz; // Use the renamed import

// Load quizzes when the page loads
document.addEventListener("DOMContentLoaded", loadQuizzes);

// Function to start quiz with authentication check
export function startQuiz(quizId, quizTopic) {
  const token = localStorage.getItem("token");

  // Check if user is logged in
  if (!token) {
    alert("You must be logged in to start the quiz.");
    window.location.href = "/login.html"; // Redirect to login page after alert
    return;
  }

  // Proceed to the quiz if the user is authenticated
  window.location.href = `/quiz.html?id=${quizId}&topic=${encodeURIComponent(
    quizTopic
  )}`;
}

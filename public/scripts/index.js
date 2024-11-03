// index.js

import { loadQuizzes, startQuiz as importedStartQuiz } from "./quiz.js"; // Rename the imported function

// Sidebar toggle functionality
document.getElementById("menu-toggle").addEventListener("click", function () {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("open");
});

document.getElementById("menu-close").addEventListener("click", function () {
  document.getElementById("side-menu").classList.remove("open");
});

// Make startQuiz globally accessible
window.startQuiz = importedStartQuiz; // Use the renamed import

// Load quizzes and update coin balance when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadQuizzes();
  updateCoinBalance(); // Dynamically update the coin balance on the homepage
});

// Function to dynamically update the coin balance
function updateCoinBalance() {
  const coinsBalanceElement = document.querySelector(".balance span"); // Select the element where coins are displayed
  const totalCoins = parseInt(localStorage.getItem("totalCoinsEarned")) || 0; // Retrieve total coins from localStorage

  if (coinsBalanceElement) {
    coinsBalanceElement.textContent = totalCoins; // Update the text content with the total coins
  }
}

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

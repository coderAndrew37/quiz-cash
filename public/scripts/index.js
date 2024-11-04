// Import the authentication utility functions
import { checkAuthAndNavigate, assignAuthChecksToLinks } from "./auth.js";
import "./inactivityLogout.js";
import "./logout.js";
import { loadQuizzes, startQuiz as importedStartQuiz } from "./quiz.js";

// Sidebar toggle functionality
document.getElementById("menu-toggle").addEventListener("click", function () {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("open");
});

document.getElementById("menu-close").addEventListener("click", function () {
  document.getElementById("side-menu").classList.remove("open");
});

// Assign authentication checks to sidebar links on page load
document.addEventListener("DOMContentLoaded", () => {
  assignAuthChecksToLinks();
  loadQuizzes();
  updateCoinBalance(); // Update coin balance on the homepage
});

// Function to dynamically update the coin balance
function updateCoinBalance() {
  const coinsBalanceElement = document.querySelector(".balance span");
  const totalCoins = parseInt(localStorage.getItem("totalCoinsEarned")) || 0;
  if (coinsBalanceElement) {
    coinsBalanceElement.textContent = totalCoins;
  }
}

window.startQuiz = importedStartQuiz; // Use the renamed import

// Function to start quiz with authentication check
export function startQuiz(quizId, quizTopic) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to start the quiz.");
    window.location.href = "/login.html";
    return;
  }

  window.location.href = `/quiz.html?id=${quizId}&topic=${encodeURIComponent(
    quizTopic
  )}`;
}

// Load username on page load
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  if (username) {
    document.querySelector(".username-display").textContent = username;
  }
});

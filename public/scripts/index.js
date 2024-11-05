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
// index.js
async function updateCoinBalance() {
  let token = localStorage.getItem("token");
  try {
    let response = await fetch("/api/users/coins", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 403) {
      console.warn("Access token expired, attempting to refresh...");

      // Attempt to refresh the token
      const refreshResponse = await fetch("/api/users/refresh", {
        method: "POST",
        credentials: "include", // Include cookies in request
      });

      if (refreshResponse.ok) {
        const { token: newToken } = await refreshResponse.json();
        localStorage.setItem("token", newToken); // Update the token in localStorage
        token = newToken; // Update token variable with the new token

        // Re-attempt fetching coin balance with the refreshed token
        response = await fetch("/api/users/coins", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        throw new Error("Unable to refresh token");
      }
    }

    const data = await response.json();
    if (response.ok) {
      document.querySelector(".balance span").textContent = data.coins;
    } else {
      console.error("Failed to load coin balance:", data.message);
    }
  } catch (error) {
    console.error("Error loading coin balance:", error);
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

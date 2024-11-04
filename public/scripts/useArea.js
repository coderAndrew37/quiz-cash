import "./inactivityLogout.js";
import "./logout.js";

// Redirection functions
function redirectToHome() {
  window.location.href = "/";
}

function redirectToWithdraw() {
  window.location.href = "/withdraw.html";
}

function redirectToQuiz() {
  window.location.href = "https://your-site.com/quiz";
}

// Withdrawal request alert
function withdraw() {
  alert("You have requested to withdraw your funds.");
}

//load username and email from the backend
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (username) {
    document.querySelector(".username-display").textContent = username;
  }
  if (email) {
    document.querySelector(".email-display").textContent = email;
  }
});

// Form submission function for additional info
function submitForm() {
  const areaCode = document.getElementById("area-code").value;
  const mobileNumber = document.getElementById("mobile-number").value;

  if (!areaCode || !mobileNumber) {
    alert("Please fill in both fields.");
    return;
  }

  alert(`Submitted! Area Code: ${areaCode}, Mobile Number: ${mobileNumber}`);
}

// Function to load and display user's coin balance from local storage and currency equivalents

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve accumulated coins from localStorage
  const coinsEarned = parseInt(localStorage.getItem("totalCoinsEarned")) || 0;
  console.log(coinsEarned);

  // Conversion rates
  const USD_RATE = 0.001; // Example: 1 coin = 0.001 USD
  const KES_RATE = 0.11; // Example: 1 coin = 0.11 KES

  // Calculate and format USD and KES equivalents
  const usdEquivalent = (coinsEarned * USD_RATE).toFixed(2);
  const kesEquivalent = (coinsEarned * KES_RATE).toFixed(2);

  // Update the DOM elements with the accumulated coins and currency equivalents
  const totalCoinsElement = document.getElementById("total-coins");
  if (totalCoinsElement) {
    totalCoinsElement.textContent = coinsEarned;
  }

  const withdrawableElement = document.getElementById("withdrawable-usd");
  if (withdrawableElement) {
    withdrawableElement.textContent = `$${usdEquivalent} (KES ${kesEquivalent})`;
  }
});

import { baseUrl } from "./constants.js";
import "./inactivityLogout.js";
import "./logout.js";
import {
  assignAuthChecksToLinks,
  loadUserData,
  redirectToLoginIfUnauthenticated,
} from "./auth.js";

// Redirect to login if the user is not authenticated
redirectToLoginIfUnauthenticated();

// Load user data (e.g., username and email) when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  loadCoinBalanceAndCurrency();
  assignAuthChecksToLinks(); // Protect sidebar links
});

// Fetch and display the coin balance from the backend
async function loadCoinBalanceAndCurrency() {
  const token = localStorage.getItem("token");
  const USD_RATE = 0.001; // Example rate: 1 coin = 0.001 USD
  const KES_RATE = 0.11; // Example rate: 1 coin = 0.11 KES

  try {
    const response = await fetch(`${baseUrl}/api/users/coins`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (response.ok) {
      const coinsEarned = data.coins;
      const usdEquivalent = (coinsEarned * USD_RATE).toFixed(2);
      const kesEquivalent = (coinsEarned * KES_RATE).toFixed(2);

      const totalCoinsElement = document.getElementById("total-coins");
      if (totalCoinsElement) totalCoinsElement.textContent = coinsEarned;

      const withdrawableElement = document.getElementById("withdrawable-usd");
      if (withdrawableElement) {
        withdrawableElement.textContent = `$${usdEquivalent} (KES ${kesEquivalent})`;
      }
    } else {
      console.error("Failed to load coins:", data.message);
    }
  } catch (error) {
    console.error("Error loading coins:", error);
  }
}

// Redirection functions for navigation
function redirectToHome() {
  window.location.href = "/";
}

function redirectToWithdraw() {
  window.location.href = "/withdraw.html";
}

// Simulated withdrawal request function
function withdraw() {
  alert("You have requested to withdraw your funds.");
}

// Form submission function for additional user info
function submitForm() {
  const areaCode = document.getElementById("area-code").value;
  const mobileNumber = document.getElementById("mobile-number").value;

  if (!areaCode || !mobileNumber) {
    alert("Please fill in both fields.");
    return;
  }

  alert(`Submitted! Area Code: ${areaCode}, Mobile Number: ${mobileNumber}`);
}

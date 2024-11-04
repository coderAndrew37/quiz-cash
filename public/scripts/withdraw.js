import "./inactivityLogout.js";
import "./logout.js";
import {
  assignAuthChecksToLinks,
  loadUserData,
  redirectToLoginIfUnauthenticated,
} from "./auth.js";

// Redirect to login if the user is not authenticated
redirectToLoginIfUnauthenticated();

// Load user data (e.g., username and balance) when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  assignAuthChecksToLinks(); // Protect sidebar links
});

const MIN_WITHDRAWAL_AMOUNT = 1; // Minimum withdrawal threshold in USD

// Helper function to check minimum balance requirement
function checkMinimumBalance() {
  const userBalance = parseFloat(localStorage.getItem("userBalance")) || 0;
  return userBalance >= MIN_WITHDRAWAL_AMOUNT;
}

// Withdrawal options - redirect based on balance
function initiateWithdrawal(type) {
  if (checkMinimumBalance()) {
    // Proceed to the withdrawal form with the chosen option
    window.location.href = `paynext.html?type=${type}`;
  } else {
    // Redirect to a page explaining minimum withdrawal requirement
    window.location.href = "minRequirement.html";
  }
}

// Event handlers for each withdrawal option
document
  .querySelector(".grid-item a[href*='card']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    initiateWithdrawal("card");
  });

document
  .querySelector(".grid-item a[href*='bitcoin']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    initiateWithdrawal("bitcoin");
  });

document
  .querySelector(".grid-item a[href*='phone']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    initiateWithdrawal("phone");
  });

document
  .querySelector(".grid-item a[href*='paypal']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    initiateWithdrawal("paypal");
  });

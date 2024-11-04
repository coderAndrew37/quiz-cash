// payNext.js

import "./inactivityLogout.js";
import "./logout.js";
import {
  redirectToLoginIfUnauthenticated,
  loadUserData,
  assignAuthChecksToLinks,
} from "./auth.js";

// Redirect to login if the user is not authenticated
redirectToLoginIfUnauthenticated();

// Load user data (e.g., username) when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  assignAuthChecksToLinks(); // Protect sidebar links
});

// Retrieve payment method from URL query
const urlParams = new URLSearchParams(window.location.search);
const paymentType = urlParams.get("type");

// Update input fields based on payment type
document.addEventListener("DOMContentLoaded", function () {
  const dynamicLabel = document.getElementById("dynamic-label");
  const dynamicInput = document.getElementById("dynamic-input");

  if (paymentType === "mpesa") {
    dynamicLabel.textContent = "Phone Number (M-Pesa):";
    dynamicInput.placeholder = "e.g., +254700000000";
  } else if (paymentType === "bank") {
    dynamicLabel.textContent = "Bank Account Number:";
    dynamicInput.placeholder = "Enter your bank account number";
  }
});

// Form submission handler with package requirement
document
  .getElementById("withdrawal-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const contactInfo = document.getElementById("dynamic-input").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!contactInfo || isNaN(amount) || amount <= 0) {
      alert("Please enter valid details.");
      return;
    }

    // Determine required package cost in KES based on the amount
    let packageCost;
    if (amount > 0 && amount <= 5000) {
      packageCost = 1000; // 1 - 5000 KES withdrawal requires 1000 KES package
    } else if (amount > 5000 && amount <= 10000) {
      packageCost = 2000; // 5000 - 10000 KES withdrawal requires 2000 KES package
    } else if (amount > 10000 && amount <= 50000) {
      packageCost = 5000; // 10000 - 50000 KES withdrawal requires 5000 KES package
    } else if (amount > 50000) {
      packageCost = 10000; // 50000+ KES withdrawal requires 10000 KES package
    }

    const confirmPackage = confirm(
      `To proceed with this withdrawal, you need to purchase a package worth KES ${packageCost}. Click OK to continue.`
    );
    if (confirmPackage) {
      localStorage.setItem("requiredPackageCost", packageCost);
      localStorage.setItem("withdrawalMethod", paymentType); // Store the payment method for the next page
      window.location.href = "/buypackageKES.html";
    } else {
      alert("Withdrawal cannot proceed without a package purchase.");
    }
  });

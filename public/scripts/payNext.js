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

  if (paymentType === "phone") {
    dynamicLabel.textContent = "Phone Number (M-Pesa):";
    dynamicInput.placeholder = "e.g., +254700000000";
  } else if (paymentType === "card") {
    dynamicLabel.textContent = "Card Number:";
    dynamicInput.placeholder = "Enter your card number";
  } else if (paymentType === "bitcoin") {
    dynamicLabel.textContent = "Bitcoin Address:";
    dynamicInput.placeholder = "Enter your Bitcoin address";
  } else if (paymentType === "paypal") {
    dynamicLabel.textContent = "PayPal Account Email:";
    dynamicInput.placeholder = "Enter your PayPal email";
  } else {
    dynamicLabel.textContent = "Account Number:";
    dynamicInput.placeholder = "Enter your account number";
  }

  // Form submission handler
  const withdrawalForm = document.getElementById("withdrawal-form");
  withdrawalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const accountDetail = dynamicInput.value;

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    if (!accountDetail) {
      alert("Please enter your account details.");
      return;
    }

    // Simulated API call for processing payment
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${baseUrl}/api/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount,
          method: paymentType,
          detail: accountDetail,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Withdrawal processed successfully!");
        // Redirect to confirmation page
        window.location.href = `/confirmation.html?method=${paymentType}`;
      } else {
        alert(`Withdrawal failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      alert(
        "An error occurred while processing your withdrawal. Please try again later."
      );
    }
  });
});

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
    if (amount > 0 && amount <= 50) {
      packageCost = 1000; // 1 - 5000 KES withdrawal requires 1000 KES package
    } else if (amount > 50 && amount <= 100) {
      packageCost = 2000; // 5000 - 10000 KES withdrawal requires 2000 KES package
    } else if (amount > 100 && amount <= 500) {
      packageCost = 5000; // 10000 - 50000 KES withdrawal requires 5000 KES package
    } else if (amount > 500) {
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

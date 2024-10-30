function redirectToHome() {
  window.location.href = "/";
}

function redirectToWithdraw() {
  window.location.href = "/withdraw.html";
}

function withdraw() {
  alert("You have requested to withdraw your funds.");
}

function submitForm() {
  const areaCode = document.getElementById("area-code").value;
  const mobileNumber = document.getElementById("mobile-number").value;

  if (!areaCode || !mobileNumber) {
    alert("Please fill in both fields.");
    return;
  }

  alert(`Submitted! Area Code: ${areaCode}, Mobile Number: ${mobileNumber}`);
}

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the coins earned from the quiz
  const coinsEarned = parseInt(localStorage.getItem("quizCoinsEarned")) || 0;

  // Display the coins in the 'Total gold coins' section
  const totalCoinsElement = document.getElementById("total-coins");
  if (totalCoinsElement) {
    totalCoinsElement.textContent = coinsEarned;
  }

  // Calculate and display the equivalent USD value (1000 coins = 1 USD)
  const usdEquivalent = (coinsEarned / 1000).toFixed(2);
  const withdrawableElement = document.getElementById("withdrawable-usd");
  if (withdrawableElement) {
    withdrawableElement.textContent = `$${usdEquivalent}`;
  }
});

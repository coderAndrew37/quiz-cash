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

// Function to load and display user's coin balance and currency equivalents
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve coins earned from localStorage
  const coinsEarned = parseInt(localStorage.getItem("quizCoinsEarned")) || 0;

  // Currency conversion rates
  const USD_RATE = 0.001; // 1 coin = 0.001 USD
  const KES_RATE = 0.11; // 1 coin = 0.11 KES (example rate)

  // Calculate USD and KES equivalents
  const usdEquivalent = (coinsEarned * USD_RATE).toFixed(2);
  const kesEquivalent = (coinsEarned * KES_RATE).toFixed(2);

  // Display total coins and equivalent in USD and KES
  const totalCoinsElement = document.getElementById("total-coins");
  if (totalCoinsElement) {
    totalCoinsElement.textContent = coinsEarned;
  }

  const withdrawableElement = document.getElementById("withdrawable-usd");
  if (withdrawableElement) {
    withdrawableElement.textContent = `$${usdEquivalent} (KES ${kesEquivalent})`;
  }
});

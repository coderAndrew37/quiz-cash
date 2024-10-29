function redirectToHome() {
  window.location.href = "/";
}

function redirectToWithdraw() {
  window.location.href = "/withdraw.html";
}

function redirectToQuiz() {
  window.location.href = "https://your-site.com/quiz";
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

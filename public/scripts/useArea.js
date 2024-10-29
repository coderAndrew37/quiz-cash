function redirectToQuiz() {
  // Redirect to quiz page or URL
  window.location.href = "https://your-site.com/quiz";
}

function withdraw() {
  // Handle withdraw action (e.g., show alert or redirect)
  alert("You have requested to withdraw your funds.");
  // Redirect to withdraw page if required
  // window.location.href = "https://your-site.com/withdraw";
}

function submitForm() {
  const areaCode = document.getElementById("area-code").value;
  const mobileNumber = document.getElementById("mobile-number").value;

  if (!areaCode || !mobileNumber) {
    alert("Please fill in both fields.");
    return;
  }

  // Perform form submission action
  alert(`Submitted! Area Code: ${areaCode}, Mobile Number: ${mobileNumber}`);
  // Optionally, send data to server via AJAX or redirect after submission
}

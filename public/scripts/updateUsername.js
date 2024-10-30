document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (username) {
    // Update elements with username data
    const usernameElements = document.querySelectorAll(".username-display");
    usernameElements.forEach((element) => {
      element.textContent = username;
    });
  }

  if (email) {
    // Update elements with email data
    const emailElements = document.querySelectorAll(".email-display");
    emailElements.forEach((element) => {
      element.textContent = email;
    });
  }
});

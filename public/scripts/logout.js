document.getElementById("logout-btn").addEventListener("click", async () => {
  // Show a confirmation dialog
  const confirmLogout = confirm("Are you sure you want to log out?");

  // If the user confirms, proceed with the logout
  if (confirmLogout) {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (response.ok) {
        // Clear client-side data and redirect to the login page
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        window.location.href = "/login.html"; // Redirect to login page
      } else {
        console.error("Logout failed:", await response.text());
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  }
});

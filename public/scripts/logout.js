document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      const confirmLogout = confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        try {
          const response = await fetch("/api/users/logout", {
            method: "POST",
            credentials: "include", // Ensure cookies are sent with the request
          });

          if (response.ok) {
            // Clear client-side data
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("email");

            // Redirect to login page
            window.location.href = "/login.html";

            // Disable back button functionality
            window.history.pushState(null, null, "/login.html");
            window.addEventListener("popstate", function () {
              window.location.href = "/login.html";
            });
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
  } else {
    console.error("Logout button not found in the DOM.");
  }
});

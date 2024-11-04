document
  .getElementById("forgot-password-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const isProduction = window.location.hostname !== "localhost";
    const baseUrl = isProduction
      ? "https://quiz-cash.onrender.com" // Production URL
      : "http://localhost:5000"; // Development URL

    try {
      const response = await fetch(
        `${baseUrl}/api/password-reset/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Password reset link sent to your email.");
        window.location.href = "/login.html"; // Redirect to login page
      } else {
        alert(data.message || "Error sending password reset link.");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      alert("An error occurred. Please try again.");
    }
  });

document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Retrieve form input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Set base URL dynamically based on environment
    const isProduction = window.location.hostname !== "localhost";
    const baseUrl = isProduction
      ? "https://quiz-cash.onrender.com" // Production URL
      : "http://localhost:5000"; // Development URL

    try {
      // Send registration request to backend
      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      // Parse response JSON
      const data = await response.json();

      if (response.ok) {
        // Store token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", name); // Store username
        localStorage.setItem("email", email); // Store email

        // Redirect to homepage on successful registration
        window.location.href = "/";
      } else {
        // Display error message if registration fails
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  });

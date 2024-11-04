document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Retrieve email and password from form fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Dynamically set the base URL based on the environment
  const isProduction = window.location.hostname !== "localhost";
  const baseUrl = isProduction
    ? "https://quiz-cash.onrender.com" // Production URL
    : "http://localhost:5000"; // Development URL

  try {
    // Send login request to the backend
    const response = await fetch(`${baseUrl}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Store the token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username); // Assuming `username` is returned in the response
      localStorage.setItem("email", email);

      // Redirect to homepage on successful login
      window.location.href = "/";
    } else {
      // Handle non-OK responses
      alert(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("An error occurred. Please try again.");
  }
});

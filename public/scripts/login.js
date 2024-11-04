import { baseUrl } from "./constants.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Retrieve email and password from form fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
      localStorage.setItem("username", data.username); // Store username
      localStorage.setItem("email", data.email); // Store email

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

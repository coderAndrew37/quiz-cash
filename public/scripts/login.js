document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username); // Assuming username is returned in response
      localStorage.setItem("email", email); // Store email
      window.location.href = "/"; // Redirect to homepage on successful login
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("An error occurred. Please try again.");
  }
});

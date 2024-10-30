document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", name); // Store username
        localStorage.setItem("email", email); // Store email
        window.location.href = "/"; // Redirect to homepage after registration
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  });

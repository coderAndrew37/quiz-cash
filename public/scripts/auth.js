// Check authentication before navigating to a new page
export function checkAuthAndNavigate(event, targetUrl) {
  const token = localStorage.getItem("token");
  if (!token) {
    event.preventDefault();
    window.location.href = "/login.html"; // Redirect if unauthenticated
  } else {
    window.location.href = targetUrl;
  }
}

// Function to assign authentication checks to specified sidebar links
export function assignAuthChecksToLinks() {
  const links = [
    { selector: 'a[href="/userarea.html"]', url: "/userarea.html" },
    { selector: 'a[href="/support.html"]', url: "/support.html" },
    { selector: 'a[href="/faq.html"]', url: "/faq.html" },
    { selector: 'a[href="/rules.html"]', url: "/rules.html" },
  ];

  links.forEach((link) => {
    const element = document.querySelector(link.selector);
    if (element) {
      element.onclick = (event) => checkAuthAndNavigate(event, link.url);
    }
  });
}

// Load and display user data (username and email) in the UI
export function loadUserData() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const usernameDisplay = document.querySelector(".username-display");
  const emailDisplay = document.querySelector(".email-display");

  if (username && usernameDisplay) {
    usernameDisplay.textContent = username;
  }

  if (email && emailDisplay) {
    emailDisplay.textContent = email;
  }
}

// Redirect to login page if the user is not authenticated
export function redirectToLoginIfUnauthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
  }
}

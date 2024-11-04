import { baseUrl } from "./constants.js";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIMEOUT = INACTIVITY_TIMEOUT - 2 * 60 * 1000; // Warning 2 minutes before logout

let inactivityTimer, warningTimer;

// Function to reset the inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  clearTimeout(warningTimer);

  // Set a warning timer and an inactivity timer
  warningTimer = setTimeout(showLogoutWarning, WARNING_TIMEOUT);
  inactivityTimer = setTimeout(autoLogout, INACTIVITY_TIMEOUT);
}

// Function to display a warning before auto-logout
function showLogoutWarning() {
  const warningPopup = document.createElement("div");
  warningPopup.id = "logout-warning";
  warningPopup.innerHTML = `
    <div class="popup-content">
      <p>You will be logged out due to inactivity in 2 minutes.</p>
      <button id="stay-logged-in">Stay Logged In</button>
    </div>
  `;
  document.body.appendChild(warningPopup);

  document.getElementById("stay-logged-in").addEventListener("click", () => {
    // Reset inactivity timer if the user chooses to stay logged in
    resetInactivityTimer();
    document.body.removeChild(warningPopup);
  });
}

// Function to automatically log out the user
async function autoLogout() {
  try {
    const response = await fetch(`${baseUrl}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      window.location.href = "/login.html";
    } else {
      console.error("Failed to log out:", await response.text());
    }
  } catch (error) {
    console.error("Error during auto logout:", error);
  }
}

// Event listeners to detect user activity
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keypress", resetInactivityTimer);
document.addEventListener("click", resetInactivityTimer);
document.addEventListener("scroll", resetInactivityTimer);

// Start inactivity timers on page load
resetInactivityTimer();

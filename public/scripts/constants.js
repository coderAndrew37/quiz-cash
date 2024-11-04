// Dynamically set the base URL based on the environment
const isProduction = window.location.hostname !== "localhost";
export const baseUrl = isProduction
  ? "https://quiz-cash.onrender.com" // Production URL
  : "http://localhost:5000"; // Development URL

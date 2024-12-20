import "./inactivityLogout.js";
import "./logout.js";
import {
  assignAuthChecksToLinks,
  loadUserData,
  redirectToLoginIfUnauthenticated,
} from "./auth.js";
import { baseUrl } from "./constants.js";

// Redirect to login if the user is not authenticated
redirectToLoginIfUnauthenticated();

// Load user data and quiz data on document load
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  loadQuiz();
  assignAuthChecksToLinks();

  // Initialize coins display with score = 0
  updateCoinsDisplay(0);
});

let currentIndex = 0;
let questions = [];
let score = 0;
let timerInterval;
let timeLeft = 60;
let timerStarted = false;

// Helper function to get query parameters from URL
function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}

const quizTopic = getQueryVariable("topic") || "";

// Load quiz data from the server based on topic
async function loadQuiz() {
  const baseUrl = "/api/quizzes/public";
  const url = quizTopic ? `${baseUrl}?topic=${quizTopic}` : baseUrl;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load quiz data");

    questions = await response.json();
    if (questions.length > 0) showQuestion(currentIndex);
  } catch (error) {
    console.error("Error loading quiz:", error);
  }
}

// Display a specific question by index
function showQuestion(index) {
  if (!questions[index]) return console.error("No question data found.");

  const questionData = questions[index];
  document.getElementById("quiz-question").textContent = questionData.question;

  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  const options = [
    questionData.correct_answer,
    ...questionData.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.style.cursor = "pointer";

    optionButton.onclick = () => {
      optionButton.style.backgroundColor = "#4a42d0";
      optionButton.style.color = "white";

      checkAnswer(option, questionData.correct_answer);
      if (!timerStarted) {
        startCountdown();
        timerStarted = true;
      }
    };

    optionsContainer.appendChild(optionButton);
  });

  document.querySelector(".question-number").textContent = `${index + 1}/10.`;
}

// Start countdown timer
function startCountdown() {
  const timerElement = document.getElementById("time-left");
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    } else {
      timeLeft -= 1;
      timerElement.textContent = timeLeft;
    }
  }, 1000);
}

// Check if selected answer is correct and update score
function checkAnswer(selectedAnswer, correctAnswer) {
  const notificationElement = document.getElementById("notification");

  if (notificationElement) {
    if (selectedAnswer === correctAnswer) {
      score += 200;
      notificationElement.textContent = "Correct! You earned 200 coins!";
      updateCoinsDisplay(score); // Update the displayed coin count
    } else {
      notificationElement.textContent = "Wrong answer!";
    }

    notificationElement.style.display = "block";
    setTimeout(() => {
      notificationElement.style.display = "none";
      loadNextQuiz();
    }, 1500);
  }
}

// Update the coins display element
function updateCoinsDisplay(coins) {
  const coinsCountElement = document.querySelector(".coins-count");
  if (coinsCountElement) {
    coinsCountElement.textContent = coins;
  }
}

// Load the next quiz question or submit if finished
function loadNextQuiz() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion(currentIndex);
  } else {
    submitQuiz();
  }
}

// Submit quiz and update coins
async function submitQuiz() {
  clearInterval(timerInterval);
  const token = localStorage.getItem("token");

  // Check if token is missing
  if (!token) {
    console.error("No token found in localStorage.");
    alert("Session expired. Please log in again.");
    window.location.href = "/login.html";
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/quizzes/complete-quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ coinsEarned: score }),
      }
    );

    if (response.ok) {
      alert(`Quiz complete! You earned a total of ${score} coins!`);
      window.location.href = "/userarea.html";
    } else if (response.status === 403) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token"); // Clear expired token
      window.location.href = "/login.html";
    } else {
      const errorData = await response.json();
      console.error("Failed to submit quiz:", errorData);
      alert("Failed to submit quiz. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting quiz:", error);
  }
}

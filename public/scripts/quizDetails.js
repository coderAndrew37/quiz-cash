let currentIndex = localStorage.getItem("currentIndex")
  ? parseInt(localStorage.getItem("currentIndex"))
  : 0;
let questions = [];
let score = localStorage.getItem("score")
  ? parseInt(localStorage.getItem("score"))
  : 0;
let timerInterval;
let timeLeft = 60;
let timerStarted = false;

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
console.log("Quiz Topic:", quizTopic);

function loadQuiz() {
  const url = quizTopic ? `/api/quizzes?topic=${quizTopic}` : "/api/quizzes";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Quiz data loaded:", data);
      questions = data;

      if (!Array.isArray(questions) || questions.length === 0) {
        console.warn("No questions available.");
      }

      showQuestion(currentIndex);
    })
    .catch((error) => {
      console.error("Error loading quiz:", error);
    });
}

function showQuestion(index) {
  if (questions.length === 0 || !questions[index]) {
    console.error("No question data found.");
    return;
  }

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
    optionButton.style.border = "2px solid white";

    console.log("Creating option button:", option);

    optionButton.onclick = () => {
      console.log("Option clicked:", option);
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

function startCountdown() {
  const timerElement = document.getElementById("time-left");
  const circleLoader = document.getElementById("circle-loader");

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    } else {
      timeLeft -= 1;
      timerElement.textContent = timeLeft;
      circleLoader.style.clipPath = `inset(${
        100 - (timeLeft / 60) * 100
      }% 0 0 0)`;
    }
  }, 1000);
}

function checkAnswer(selectedAnswer, correctAnswer) {
  const notificationElement = document.getElementById("notification");
  const coinsCountElement = document.querySelector(".coins-count");

  if (notificationElement) {
    if (selectedAnswer === correctAnswer) {
      score += 50;
      notificationElement.textContent = "Correct! You earned Ksh 50!";
      if (coinsCountElement) coinsCountElement.textContent = score;
    } else {
      notificationElement.textContent = "Wrong answer!";
    }

    notificationElement.style.display = "block";
    setTimeout(() => {
      notificationElement.style.display = "none";
      loadNextQuiz();
    }, 1500);
  } else {
    console.error("Notification element not found.");
  }
}

function loadNextQuiz() {
  currentIndex++;
  if (currentIndex < questions.length) {
    localStorage.setItem("currentIndex", currentIndex);
    showQuestion(currentIndex);
  } else {
    submitQuiz();
  }
}

function submitQuiz() {
  clearInterval(timerInterval);
  alert(`Quiz complete! You earned a total of Ksh ${score}`);

  // Redirect to the user area page with the score as a query parameter
  localStorage.clear();
  window.location.href = `userarea.html?score=${score}`;
}

document.addEventListener("DOMContentLoaded", loadQuiz);

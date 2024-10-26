// quizDetails.js
let currentIndex = 0;
let questions = [];
let score = 0;

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

const quizTopic = getQueryVariable("topic");
console.log("Quiz Topic:", quizTopic);

function loadQuiz() {
  const url = quizTopic ? `/api/quizzes?topic=${quizTopic}` : "/api/quizzes";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      if (questions.length === 0) {
        alert("No questions available for this topic.");
      } else {
        showQuestion(currentIndex);
      }
    })
    .catch((error) => console.error("Error loading quiz:", error));
}

function showQuestion(index) {
  const questionData = questions[index];
  document.getElementById("quiz-question").textContent = questionData.question;

  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = ""; // Clear previous options

  const options = [
    questionData.correct_answer,
    ...questionData.incorrect_answers,
  ].sort(() => Math.random() - 0.5);
  options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.onclick = () =>
      checkAnswer(option, questionData.correct_answer);
    optionsContainer.appendChild(optionButton);
  });
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score += 50; // Increment by Ksh 50
    alert("Correct! You earned Ksh 50!");
  } else {
    alert("Wrong answer!");
  }

  loadNextQuiz();
}

function loadNextQuiz() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion(currentIndex);
  } else {
    alert(`Quiz complete! You earned a total of Ksh ${score}`);
  }
}

document.addEventListener("DOMContentLoaded", loadQuiz);

function loadQuizzes() {
  fetch("/api/quizzes") // Fetch quizzes from the server
    .then((response) => response.json())
    .then((quizzes) => {
      const quizContainer = document.querySelector(".quiz-container");
      quizContainer.innerHTML = ""; // Clear any existing content

      quizzes.forEach((quiz) => {
        const quizCard = `
          <div class="quiz-card">
            <img src="/images/quiz-image.jpg" alt="Quiz Image" />
            <div class="quiz-info">
              <p class="quiz-question">${quiz.question}</p>
              <div class="quiz-details">
                <span class="quiz-id">#${quiz.id}</span>
                <span class="quiz-coins">2000 coins</span>
              </div>
              <button class="quiz-btn">Start Quiz</button>
            </div>
          </div>
        `;
        quizContainer.innerHTML += quizCard;

        console.log(quizCard);
      });
    })
    .catch((err) => console.error("Error fetching quizzes:", err));
}

// Initialize the quiz loading function on DOM content loaded
document.addEventListener("DOMContentLoaded", loadQuizzes);

// Initialize the quiz loading function on DOM content loaded
document.addEventListener("DOMContentLoaded", loadQuizzes);

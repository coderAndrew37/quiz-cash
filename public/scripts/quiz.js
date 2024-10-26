export function loadQuizzes() {
  fetch("/api/quizzes") // No topic specified, fetch general quizzes
    .then((response) => response.json())
    .then((quizzes) => {
      if (!Array.isArray(quizzes)) {
        throw new TypeError("Expected quizzes to be an array"); // Ensure response is an array
      }

      const quizContainer = document.querySelector(".quiz-container");
      quizContainer.innerHTML = "";

      quizzes.forEach((quiz) => {
        const quizCard = `
          <div class="quiz-card">
            <img src="/images/quiz-image.jpg" alt="Quiz Image" />
            <div class="quiz-info">
              <p class="quiz-question">${quiz.question}</p>
              <div class="quiz-details">
                <span class="quiz-id">#${quiz._id}</span>
                <span class="quiz-coins">2000 coins</span>
              </div>
              <button class="quiz-btn" onclick="startQuiz('${quiz._id}', '${quiz.topic}')">Start Quiz</button>
            </div>
          </div>
        `;
        quizContainer.innerHTML += quizCard;
      });
    })
    .catch((err) => console.error("Error fetching quizzes:", err));
}

// Function to navigate to quiz details page with topic
export function startQuiz(quizId, quizTopic) {
  window.location.href = `/quiz.html?id=${quizId}&topic=${encodeURIComponent(
    quizTopic
  )}`;
}

document.addEventListener("DOMContentLoaded", loadQuizzes);

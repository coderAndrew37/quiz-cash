export async function loadQuizzes() {
  try {
    const response = await fetch("/api/quizzes");
    if (!response.ok) throw new Error("Error fetching quizzes");

    const quizzes = await response.json();
    if (!Array.isArray(quizzes)) throw new TypeError("Expected an array");

    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = quizzes
      .map(
        (quiz) => `
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
      `
      )
      .join("");
  } catch (err) {
    console.error("Error loading quizzes:", err);
  }
}

// Function to navigate to quiz details page with topic
export function startQuiz(quizId, quizTopic) {
  window.location.href = `/quiz.html?id=${quizId}&topic=${encodeURIComponent(
    quizTopic
  )}`;
}

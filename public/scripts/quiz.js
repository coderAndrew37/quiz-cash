export async function loadQuizzes() {
  const baseUrl = "http://localhost:5000";

  try {
    const response = await fetch(`${baseUrl}/api/quizzes/public`);
    if (!response.ok) throw new Error("Error fetching quizzes");

    const quizzes = await response.json();
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
  const token = localStorage.getItem("token");
  console.log("Token found:", token); // Debug log to check token presence

  if (!token) {
    alert("You must be logged in to start the quiz.");
    window.location.href = "/login.html";
    return;
  }

  // If token is valid, continue to quiz
  console.log(`Starting quiz with ID: ${quizId} and Topic: ${quizTopic}`);
  window.location.href = `/quiz.html?id=${quizId}&topic=${encodeURIComponent(
    quizTopic
  )}`;
}

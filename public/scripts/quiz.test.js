// c:\Users\ADMIN\Desktop\Web Development\quiz-cash\public\scripts\quiz.test.startQuiz.js

// Import necessary modules
const { startQuiz } = require("../quiz.js");
const window = require("global/window");

// Test case for startQuiz function
test("Should redirect to quiz.html with correct id and topic when both parameters are provided", () => {
  // Mock window.location.href
  const originalHref = window.location.href;
  window.location.href = jest.fn();

  // Call the startQuiz function with parameters
  startQuiz(1, "Test Topic");

  // Assert that window.location.href was called with the correct URL
  expect(window.location.href).toHaveBeenCalledWith(
    "/quiz.html?id=1&topic=Test+Topic"
  );

  // Reset the window.location.href to its original value
  window.location.href = originalHref;
});

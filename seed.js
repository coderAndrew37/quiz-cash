// seedQuestions.js
const mongoose = require("mongoose");
const Question = require("./models/question.js");

async function seedQuestions() {
  const questions = [
    // Topic 1: Science
    {
      topic: "Science",
      question: "What planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"],
    },
    {
      topic: "Science",
      question: "What is the chemical symbol for water?",
      correct_answer: "H2O",
      incorrect_answers: ["O2", "CO2", "H2"],
    },
    {
      topic: "Science",
      question: "What is the powerhouse of the cell?",
      correct_answer: "Mitochondria",
      incorrect_answers: ["Nucleus", "Ribosome", "Endoplasmic Reticulum"],
    },
    {
      topic: "Science",
      question: "What gas do plants absorb from the atmosphere?",
      correct_answer: "Carbon Dioxide",
      incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"],
    },
    {
      topic: "Science",
      question: "What is the boiling point of water?",
      correct_answer: "100 degrees Celsius",
      incorrect_answers: [
        "0 degrees Celsius",
        "50 degrees Celsius",
        "150 degrees Celsius",
      ],
    },
    {
      topic: "Science",
      question: "What is the largest organ in the human body?",
      correct_answer: "Skin",
      incorrect_answers: ["Heart", "Liver", "Lungs"],
    },
    {
      topic: "Science",
      question: "What type of animal is a frog?",
      correct_answer: "Amphibian",
      incorrect_answers: ["Reptile", "Mammal", "Fish"],
    },
    {
      topic: "Science",
      question: "What part of the atom has a positive charge?",
      correct_answer: "Proton",
      incorrect_answers: ["Electron", "Neutron", "Nucleus"],
    },
    {
      topic: "Science",
      question: "Which planet is closest to the sun?",
      correct_answer: "Mercury",
      incorrect_answers: ["Venus", "Earth", "Mars"],
    },
    {
      topic: "Science",
      question: "What is the most abundant gas in the Earth's atmosphere?",
      correct_answer: "Nitrogen",
      incorrect_answers: ["Oxygen", "Carbon Dioxide", "Argon"],
    },

    // Topic 2: Geography
    {
      topic: "Geography",
      question: "Which is the largest continent?",
      correct_answer: "Asia",
      incorrect_answers: ["Africa", "Europe", "Australia"],
    },
    {
      topic: "Geography",
      question: "What is the capital of Kenya?",
      correct_answer: "Nairobi",
      incorrect_answers: ["Mombasa", "Kisumu", "Eldoret"],
    },
    {
      topic: "Geography",
      question: "Which country has the longest coastline?",
      correct_answer: "Canada",
      incorrect_answers: ["Australia", "Russia", "United States"],
    },
    {
      topic: "Geography",
      question: "What is the smallest country in the world?",
      correct_answer: "Vatican City",
      incorrect_answers: ["Monaco", "Nauru", "San Marino"],
    },
    {
      topic: "Geography",
      question: "Which river is the longest in the world?",
      correct_answer: "Nile",
      incorrect_answers: ["Amazon", "Yangtze", "Mississippi"],
    },
    {
      topic: "Geography",
      question: "Which desert is the largest in the world?",
      correct_answer: "Antarctic Desert",
      incorrect_answers: ["Sahara Desert", "Arabian Desert", "Gobi Desert"],
    },
    {
      topic: "Geography",
      question: "What is the capital city of Japan?",
      correct_answer: "Tokyo",
      incorrect_answers: ["Osaka", "Kyoto", "Hiroshima"],
    },
    {
      topic: "Geography",
      question: "Which mountain is the highest in the world?",
      correct_answer: "Mount Everest",
      incorrect_answers: ["K2", "Kangchenjunga", "Lhotse"],
    },
    {
      topic: "Geography",
      question: "What is the currency of the United Kingdom?",
      correct_answer: "Pound Sterling",
      incorrect_answers: ["Dollar", "Euro", "Yen"],
    },
    {
      topic: "Geography",
      question: "Which ocean is the largest?",
      correct_answer: "Pacific Ocean",
      incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    },

    // Topic 3: History
    {
      topic: "History",
      question: "Who was the first President of the United States?",
      correct_answer: "George Washington",
      incorrect_answers: ["Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    },
    {
      topic: "History",
      question: "What year did the Titanic sink?",
      correct_answer: "1912",
      incorrect_answers: ["1905", "1918", "1923"],
    },
    {
      topic: "History",
      question: "Which ancient civilization built the pyramids?",
      correct_answer: "Egyptians",
      incorrect_answers: ["Greeks", "Romans", "Aztecs"],
    },
    {
      topic: "History",
      question: "Who wrote the Declaration of Independence?",
      correct_answer: "Thomas Jefferson",
      incorrect_answers: [
        "George Washington",
        "Benjamin Franklin",
        "John Hancock",
      ],
    },
    {
      topic: "History",
      question: "In what year did World War II begin?",
      correct_answer: "1939",
      incorrect_answers: ["1941", "1945", "1936"],
    },
    {
      topic: "History",
      question:
        "Who was the first woman to fly solo across the Atlantic Ocean?",
      correct_answer: "Amelia Earhart",
      incorrect_answers: [
        "Harriet Quimby",
        "Bessie Coleman",
        "Jacqueline Cochran",
      ],
    },
    {
      topic: "History",
      question:
        "What was the name of the ship that brought the Pilgrims to America?",
      correct_answer: "Mayflower",
      incorrect_answers: ["Santa Maria", "Pinta", "Nina"],
    },
    {
      topic: "History",
      question: "Which empire was ruled by Genghis Khan?",
      correct_answer: "Mongol Empire",
      incorrect_answers: ["Ottoman Empire", "Roman Empire", "Byzantine Empire"],
    },
    {
      topic: "History",
      question: "What event began on July 28, 1914?",
      correct_answer: "World War I",
      incorrect_answers: [
        "The Great Depression",
        "The Cold War",
        "The Vietnam War",
      ],
    },
    {
      topic: "History",
      question:
        "Which U.S. state was an independent republic before joining the United States?",
      correct_answer: "Texas",
      incorrect_answers: ["California", "Hawaii", "Florida"],
    },

    // Topic 4: Sports
    {
      topic: "Sports",
      question: "Which sport is known as the 'king of sports'?",
      correct_answer: "Soccer",
      incorrect_answers: ["Basketball", "Cricket", "Rugby"],
    },
    {
      topic: "Sports",
      question: "How many players are on a basketball team?",
      correct_answer: "5",
      incorrect_answers: ["6", "7", "4"],
    },
    {
      topic: "Sports",
      question:
        "What is the highest score possible in a game of ten-pin bowling?",
      correct_answer: "300",
      incorrect_answers: ["200", "250", "350"],
    },
    {
      topic: "Sports",
      question: "Which country hosted the 2016 Summer Olympics?",
      correct_answer: "Brazil",
      incorrect_answers: ["China", "United States", "Russia"],
    },
    {
      topic: "Sports",
      question: "What is the length of a marathon race?",
      correct_answer: "26.2 miles",
      incorrect_answers: ["25 miles", "30 miles", "24 miles"],
    },
    {
      topic: "Sports",
      question: "Which sport involves a racket and shuttlecock?",
      correct_answer: "Badminton",
      incorrect_answers: ["Tennis", "Squash", "Ping Pong"],
    },
    {
      topic: "Sports",
      question: "What sport is known as 'the sport of kings'?",
      correct_answer: "Horse Racing",
      incorrect_answers: ["Football", "Golf", "Tennis"],
    },
    {
      topic: "Sports",
      question: "In which sport can you win the Stanley Cup?",
      correct_answer: "Ice Hockey",
      incorrect_answers: ["Basketball", "Football", "Baseball"],
    },
    {
      topic: "Sports",
      question: "Which country is known for the sport of cricket?",
      correct_answer: "India",
      incorrect_answers: ["USA", "Brazil", "Canada"],
    },
    {
      topic: "Sports",
      question: "What sport does Michael Phelps compete in?",
      correct_answer: "Swimming",
      incorrect_answers: ["Diving", "Sailing", "Surfing"],
    },

    // Topic 5: Literature
    {
      topic: "Literature",
      question: "Who wrote 'Romeo and Juliet'?",
      correct_answer: "William Shakespeare",
      incorrect_answers: ["Charles Dickens", "Mark Twain", "Jane Austen"],
    },
    {
      topic: "Literature",
      question: "What is the first book in the Harry Potter series?",
      correct_answer: "Harry Potter and the Sorcerer's Stone",
      incorrect_answers: [
        "Harry Potter and the Chamber of Secrets",
        "Harry Potter and the Prisoner of Azkaban",
        "Harry Potter and the Goblet of Fire",
      ],
    },
    {
      topic: "Literature",
      question: "Who is the author of '1984'?",
      correct_answer: "George Orwell",
      incorrect_answers: [
        "Aldous Huxley",
        "Ray Bradbury",
        "F. Scott Fitzgerald",
      ],
    },
    {
      topic: "Literature",
      question: "Which novel features the character Elizabeth Bennet?",
      correct_answer: "Pride and Prejudice",
      incorrect_answers: ["Jane Eyre", "Wuthering Heights", "Emma"],
    },
    {
      topic: "Literature",
      question: "Who wrote 'The Great Gatsby'?",
      correct_answer: "F. Scott Fitzgerald",
      incorrect_answers: ["Ernest Hemingway", "Mark Twain", "John Steinbeck"],
    },
    {
      topic: "Literature",
      question: "What is the main theme of 'Moby-Dick'?",
      correct_answer: "The obsession with revenge",
      incorrect_answers: ["Love", "Survival", "Friendship"],
    },
    {
      topic: "Literature",
      question: "Which author created the character Sherlock Holmes?",
      correct_answer: "Arthur Conan Doyle",
      incorrect_answers: [
        "Agatha Christie",
        "Edgar Allan Poe",
        "Raymond Chandler",
      ],
    },
    {
      topic: "Literature",
      question: "Who wrote 'The Catcher in the Rye'?",
      correct_answer: "J.D. Salinger",
      incorrect_answers: ["Harper Lee", "Mark Twain", "F. Scott Fitzgerald"],
    },
    {
      topic: "Literature",
      question: "What is the genre of 'The Hobbit'?",
      correct_answer: "Fantasy",
      incorrect_answers: ["Science Fiction", "Mystery", "Horror"],
    },
    {
      topic: "Literature",
      question: "Who is the main character in 'To Kill a Mockingbird'?",
      correct_answer: "Scout Finch",
      incorrect_answers: ["Atticus Finch", "Jem Finch", "Boo Radley"],
    },

    // Topic 6: Technology
    {
      topic: "Technology",
      question: "What does HTML stand for?",
      correct_answer: "HyperText Markup Language",
      incorrect_answers: [
        "HyperText Multiple Language",
        "HighText Markup Language",
        "HyperText Markup Level",
      ],
    },
    {
      topic: "Technology",
      question: "Which company developed the iPhone?",
      correct_answer: "Apple",
      incorrect_answers: ["Samsung", "Nokia", "Microsoft"],
    },
    {
      topic: "Technology",
      question: "What is the main function of the CPU?",
      correct_answer: "Processing data",
      incorrect_answers: ["Storing data", "Displaying data", "Cooling data"],
    },
    {
      topic: "Technology",
      question: "What does 'VPN' stand for?",
      correct_answer: "Virtual Private Network",
      incorrect_answers: [
        "Virtual Public Network",
        "Variable Private Network",
        "Virtual Protected Network",
      ],
    },
    {
      topic: "Technology",
      question:
        "Which programming language is primarily used for web development?",
      correct_answer: "JavaScript",
      incorrect_answers: ["Python", "Java", "C#"],
    },
    {
      topic: "Technology",
      question:
        "What is the name of the first electronic general-purpose computer?",
      correct_answer: "ENIAC",
      incorrect_answers: ["UNIVAC", "Z3", "Colossus"],
    },
    {
      topic: "Technology",
      question: "What does the 'www' stand for in a website URL?",
      correct_answer: "World Wide Web",
      incorrect_answers: ["Web Wide World", "Web World Wide", "Worldwide Web"],
    },
    {
      topic: "Technology",
      question: "What is the primary use of a firewall?",
      correct_answer: "To protect networks",
      incorrect_answers: [
        "To create networks",
        "To manage databases",
        "To design websites",
      ],
    },
    {
      topic: "Technology",
      question: "Which company is known for its search engine?",
      correct_answer: "Google",
      incorrect_answers: ["Yahoo", "Bing", "DuckDuckGo"],
    },
    {
      topic: "Technology",
      question: "What is the purpose of an operating system?",
      correct_answer: "To manage computer hardware and software",
      incorrect_answers: [
        "To run applications",
        "To create software",
        "To access the internet",
      ],
    },
  ];

  try {
    await Question.insertMany(questions);
    console.log("Database seeded with questions.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Ensure the connection is closed after seeding
    mongoose.connection.close();
  }
}

// Connect to MongoDB and run the seed function
mongoose
  .connect("mongodb://localhost:27017/quiz_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => seedQuestions())
  .catch((error) => {
    console.error("Database connection error:", error);
    mongoose.connection.close(); // Ensure connection is closed in case of error
  });

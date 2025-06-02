// Sample questions array (replace with your actual data)
const questions = [
  {
    question: "What is the capital of France?",
    choices: { a: "Paris", b: "London", c: "Berlin", d: "Madrid" },
    answer: "a",
    explanation: "Paris is the capital of France.",
    topic: "geography",
    type: "M"
  },
  // Add more questions as needed
];

// Sample topics object (replace with your actual data)
const cse_topics = {
  geography: "Geography",
  history: "History",
  science: "Science"
};

// DOM Elements
const selectTopic = document.getElementById("select-topic-quiz");
const startQuizButton = document.getElementById("start-quiz-button");
const errorMessage = document.getElementById("error-message");
const numQuestionsLabel = document.getElementById("num-questions-label");
const numQuestionsInput = document.getElementById("num-questions");
const quizContainer = document.getElementById("quiz-container");
const startContainer = document.getElementById("start-container");
const summaryDiv = document.getElementById("summary");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const choicesDiv = document.getElementById("choices");

// State Variables
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];
let filteredQuestions = questions;
let currentPage = 1;
const questionsPerPage = 10;

// Populate the <select> options
Object.entries(cse_topics).forEach(([key, value]) => {
  const option = document.createElement("option");
  option.value = key;
  option.innerText = value;
  selectTopic.appendChild(option);
});

// Listen for selection change
selectTopic.addEventListener("change", function () {
  const selectedKey = this.value;
  selectedTopic(selectedKey);
});

function selectedTopic(key) {
  filteredQuestions = questions.filter(q => !key || q.topic === key);
  const qlen = filteredQuestions.length;
  numQuestionsLabel.innerText = `How many questions do you want to answer? (Max: ${qlen})`;
  startQuizButton.onclick = () => startQuiz(qlen, key);
}

function startQuiz(questionLength, key) {
  const num = parseInt(numQuestionsInput.value);

  if (isNaN(num) || num < 1 || num > questionLength) {
    errorMessage.innerText = `Please enter a valid number between 1 and ${questionLength}.`;
    errorMessage.style.display = "block";

    // Hide after 5 seconds
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);

    return;
  }

  const filterQuestion = questions.filter(q => !key || q.topic === key);
  selectedQuestions = [...filterQuestion]
    .sort(() => Math.random() - 0.5)
    .slice(0, num);

  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = selectedQuestions[currentIndex];
  questionText.innerHTML = `<b>Question ${currentIndex + 1}:</b> ${q.question}`;

  const totalQuestion = selectedQuestions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestion) * 100;
  progressBar.style.background = `linear-gradient(to right, #4caf50 ${progressPercent}%, #ccc ${progressPercent}%)`;

  choicesDiv.innerHTML = ""; // Clear previous choices

  // Randomize and render choices
  const choicesArray = Object.entries(q.choices).sort(() => Math.random() - 0.5);

  choicesArray.forEach(([key, value]) => {
    const label = document.createElement("label");
    label.className = "choice";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "choice";
    input.value = key;

    // Highlight on click
    input.addEventListener("change", () => {
      // Remove "selected" class from all choices
      document.querySelectorAll(".choice").forEach(choice => {
        choice.classList.remove("selected");
      });
      // Add "selected" to the clicked one
      label.classList.add("selected");
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${value}`));
    choicesDiv.appendChild(label);
  });
}

function submitAnswer() {
  const selected = document.querySelector('input[name="choice"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }
  const q = selectedQuestions[currentIndex];
  const userChoice = selected.value;
  userAnswers.push({
    question: q.question,
    userAnswer: userChoice,
    correctAnswer: q.answer,
    explanation: q.explanation
  });

  if (userChoice === q.answer) {
    score++;
  }

  currentIndex++;
  if (currentIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    showSummary();
  }
}

function getBackgroundColor(percentage) {
  if (percentage <= 50) {
    return interpolateColor("#8B0000", "#FFA500", percentage / 50);
  } else {
    return interpolateColor("#FFA500", "#006400", (percentage - 50) / 50);
  }
}

function interpolateColor(color1, color2, factor) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const result = {
    r: Math.round(c1.r + (c2.r - c1.r) * factor),
    g: Math.round(c1.g + (c2.g - c1.g) * factor),
    b: Math.round(c1.b + (c2.b - c1.b) * factor)
  };
  return `rgb(${result.r}, ${result.g}, ${result.b})`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function showSummary() {
  quizContainer.classList.add("hidden");
  summaryDiv.classList.remove("hidden");
  const percentage = Math.floor((score / selectedQuestions.length) * 100);

  let resultHTML = `<h2 class="ct-txt">Quiz Summary</h2>`;
  resultHTML += `<div class='percentage ct-txt'>${percentage}%</div>`;
  const bgColor = getBackgroundColor(percentage);

  resultHTML += `<div class='score-graph' style='background: linear-gradient(to right, ${bgColor} ${percentage}%, #ccc ${percentage}%);'></div>`;
  resultHTML += `<p>You answered ${score} out of ${selectedQuestions.length} correctly.</p>`;
  resultHTML += "<ul>";

  userAnswers.forEach((item, index) => {
    resultHTML += `<li><b>Q${index + 1}:</b> ${item.question}<br>
      Your Answer: ${item.userAnswer.toUpperCase()} ${item.userAnswer === item.correctAnswer ? "✅" : "❌"}<br>
      Correct Answer: ${item.correctAnswer.toUpperCase()}<br>
      ${item.explanation ? `Explanation: ${item.explanation}` : ""}
      <br><br></li>`;
  });

  resultHTML += "</ul>";
  summaryDiv.innerHTML = resultHTML;
}

// Pagination Controls
function createPaginationControls() {
  const paginationBottom = document.createElement("div");
  paginationBottom.className = "pagination";

  if (currentPage > 1) {
    const prevButtonBottom = document.createElement("button");
    prevButtonBottom.textContent = "Previous";
    prevButtonBottom.className = "previous";
    prevButtonBottom.addEventListener("click", () => navigatePage(currentPage - 1));
    paginationBottom.appendChild(prevButtonBottom);
  }

  const pageInfo = document.createElement("span");
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationBottom.appendChild(pageInfo);

  if (currentPage < totalPages) {
    const nextButtonBottom = document.createElement("button");
    nextButtonBottom.textContent = "Next";
    nextButtonBottom.className = "next";
    nextButtonBottom.addEventListener("click", () => navigatePage(currentPage + 1));
    paginationBottom.appendChild(nextButtonBottom);
  }

  quizContainer.parentElement.appendChild(paginationBottom);
}

function navigatePage(page) {
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    displayQuestions();
  }
}

function renderQuestion(q, index) {
  index = (currentPage - 1) * questionsPerPage + index;
  const wrapper = document.createElement("div");
  wrapper.classList.add("question-wrapper");

  const header = document.createElement("div");
  header.classList.add("question-header");

  const questionNo = document.createElement("div");
  questionNo.classList.add("questionNo");
  questionNo.textContent = `Question ${index + 1}`;
  header.appendChild(questionNo);

  wrapper.appendChild(header);

  const questionTextDiv = document.createElement("div");
  questionTextDiv.classList.add("question-text");
  questionTextDiv.innerHTML = q.question;
  wrapper.appendChild(questionTextDiv);

  const choicesBox = document.createElement("div");
  choicesBox.classList.add("choices");

  Object.entries(q.choices).forEach(([key, val]) => {
    const choice = document.createElement("div");
    choice.className = "choice";
    choice.textContent = `${key.toUpperCase()}. ${val}`;
    choicesBox.appendChild(choice);
  });

  wrapper.appendChild(choicesBox);
  quizContainer.appendChild(wrapper);
}

function displayQuestions() {
  quizContainer.innerHTML = "";
  if (filteredQuestions.length === 0) {
    quizContainer.innerHTML = '<div class="no-questions">No questions found.</div>';
    return;
  }
  const start = (currentPage - 1) * questionsPerPage
::contentReference[oaicite:0]{index=0}
 

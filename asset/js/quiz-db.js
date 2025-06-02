document.getElementById('subject-title').innerText = 'CIVIL SERVICE PRACTICE EXAM';

let db;
const request = indexedDB.open("CSEQuizDB", 1);

request.onupgradeneeded = function (e) {
  db = e.target.result;
  const store = db.createObjectStore("questions", { keyPath: "no" });
};

request.onsuccess = function (e) {
  db = e.target.result;
  loadQuestions(); // Auto-load on page load
};

request.onerror = function () {
  console.error("Database failed to open");
};

// Add question
document.getElementById("questionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newQuestion = {
    no: parseInt(document.getElementById("no").value),
    topic: parseInt(document.getElementById("topic").value),
    type: 'M',
    question: document.getElementById("question").value,
    choices: {
      a: document.getElementById("a").value,
      b: document.getElementById("b").value,
      c: document.getElementById("c").value,
      d: document.getElementById("d").value,
    },
    answer: document.getElementById("answer").value.trim().toLowerCase(),
    explanation: document.getElementById("explanation").value
  };

  const tx = db.transaction(["questions"], "readwrite");
  const store = tx.objectStore("questions");
  const addReq = store.put(newQuestion);

  addReq.onsuccess = () => {
    alert("Question saved!");
    document.getElementById("questionForm").reset();
    loadQuestions();
  };
  addReq.onerror = () => alert("Failed to save.");
});

// Display questions
function loadQuestions() {
  const output = document.getElementById("questionList");
  output.innerHTML = "<p>Loading questions...</p>";

  const transaction = db.transaction(["questions"], "readonly");
  const store = transaction.objectStore("questions");
  const request = store.getAll();

  request.onsuccess = function (e) {
    const questions = e.target.result;
    if (questions.length === 0) {
      output.innerHTML = "<p>No questions found.</p>";
      return;
    }

    output.innerHTML = questions.map(q => `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
        <strong>No. ${q.no}</strong> - Topic: ${q.topic}<br>
        <b>Q:</b> ${q.question}<br>
        <ul>
          <li>A: ${q.choices.a}</li>
          <li>B: ${q.choices.b}</li>
          <li>C: ${q.choices.c}</li>
          <li>D: ${q.choices.d}</li>
        </ul>
        <b>Answer:</b> ${q.answer.toUpperCase()}<br>
        <b>Explanation:</b> ${q.explanation || "N/A"}
      </div>
    `).join("");
  };
}

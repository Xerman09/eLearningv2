/*const listOfType = {
  M: 'Multiple Choice',
  MWI: "Multiple Choice With Image",
  DAD: 'Drag and Drop'
};*/

const container = document.getElementById('quiz-container');

// Get URL parameters
let currentPage = parseInt(params.get('page')) || 1;
const subjectCode = params.get('exam');
const topicCode = params.get('topic');

console.log(topicCode);
let filteredQuestions;
let topicId = '';
if (topicCode == '' || topicCode == 0) {
  filteredQuestions = questions;
  topicId = 'topic-0';
} else {
  // Filter questions by topic
  filteredQuestions = questions.filter(q => !topicCode || q.topic == topicCode);
  topicId = `topic-${topicCode}`;
}
console.log(topicId);


// Pagination settings
const questionsPerPage = 10;
const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

// Create pagination controls
function createPaginationControls() {
  // Remove old pagination if exists
  const oldPag = container.parentElement.querySelector('.pagination');
  if (oldPag) oldPag.remove();

  const pagination = document.createElement('div');
  pagination.className = 'pagination flex flex-col items-center gap-2 my-6';

  // Centered page info
  const pageInfo = document.createElement('div');
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.className = 'font-semibold mb-2';
  pagination.appendChild(pageInfo);

  // Page numbers and arrows
  const nav = document.createElement('div');
  nav.className = 'flex items-center gap-1';

  // Prev arrow
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '<';
  prevBtn.className = 'px-3 py-1 rounded border bg-white hover:bg-gray-100';
  if (currentPage === 1) {
    prevBtn.disabled = true;
    prevBtn.className += ' opacity-50 cursor-not-allowed';
  }
  prevBtn.onclick = () => navigatePage(currentPage - 1);
  nav.appendChild(prevBtn);

  // Page numbers (show up to 5 pages, with current in the middle if possible)
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    pageBtn.className = 'px-3 py-1 rounded border bg-white';
    if (i === currentPage) {
      pageBtn.className += ' bg-primary text-white font-bold border-primary opacity-50 cursor-not-allowed';
      pageBtn.disabled = true;
    } else {
      pageBtn.className += ' hover:bg-gray-100';
      pageBtn.onclick = () => navigatePage(i);
    }
    nav.appendChild(pageBtn);
  }

  // Next arrow
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '>';
  nextBtn.className = 'px-3 py-1 rounded border bg-white hover:bg-gray-100';
  if (currentPage === totalPages) {
    nextBtn.disabled = true;
    nextBtn.className += ' opacity-50 cursor-not-allowed';
  }
  nextBtn.onclick = () => navigatePage(currentPage + 1);
  nav.appendChild(nextBtn);

  pagination.appendChild(nav);

  container.parentElement.appendChild(pagination);
}

// Navigate to another page
function navigatePage(page) {
  if (page >= 1 && page <= totalPages) {
    window.location.search = `?page=${page}&exam=${subjectCode}&topic=${topicCode}`;
  }
}

// Render single question
/*
function renderQuestion(q, index) {

  index = (currentPage*10)-10 + index;
  const wrapper = document.createElement('div');
  wrapper.classList.add('question-wrapper');

  // Header
  const header = document.createElement('div');
  header.classList.add('question-header');

  const questionNo = document.createElement('div');
  questionNo.classList.add('questionNo');
  questionNo.textContent = `Question ${index + 1}`; // ← Use index for numbering
  header.appendChild(questionNo);

  const topic = document.createElement('div');
  topic.classList.add('topic');
  topic.textContent = topics[q.topic];
  header.appendChild(topic);

  wrapper.appendChild(header);

  const questionText = document.createElement('div');
  questionText.classList.add('question-text');
  questionText.innerHTML = q.question;
  wrapper.appendChild(questionText);

  const answerBox = document.createElement('div');
  answerBox.className = 'answer-box';


  let checkBtn;

  if (q.type === 'M' || q.type === 'MWI') {
    const choicesBox = document.createElement('div');
    choicesBox.classList.add('choices');
    let selectedKey = null;
    const choiceElements = {};

    Object.entries(q.choices).forEach(([key, val]) => {
      const choice = document.createElement('div');
      choice.className = 'choice';
      choice.textContent = `${key.toUpperCase()}. ${val}`;
      choice.addEventListener('click', () => {
        selectedKey = key;
        Object.values(choiceElements).forEach(el => el.classList.remove('selected'));
        choice.classList.add('selected');
      });
      choiceElements[key] = choice;
      choicesBox.appendChild(choice);
    });

    wrapper.appendChild(choicesBox);

    checkBtn = document.createElement('button');
    checkBtn.className = 'check-answer-btn';
    checkBtn.textContent = 'Check Answer';
    checkBtn.addEventListener('click', () => {
      if (checkBtn.textContent === 'Check Answer') {
        Object.keys(choiceElements).forEach(k => {
          choiceElements[k].style.pointerEvents = 'none';
        });
        if (!selectedKey || selectedKey !== q.answer) {
          if (selectedKey) choiceElements[selectedKey].classList.add('incorrect');
          choiceElements[q.answer].classList.add('correct');
        } else {
          choiceElements[selectedKey].classList.add('correct');
        }
        answerBox.innerHTML = `<div>Explanation: ${q.explanation || 'No explanation available.'}</div>`;
        answerBox.style.display = 'block';
        checkBtn.textContent = 'Hide Answer';
      } else {
        Object.keys(choiceElements).forEach(k => {
          choiceElements[k].style.pointerEvents = 'auto';
          choiceElements[k].classList.remove('correct', 'incorrect', 'selected');
        });
        selectedKey = null;
        answerBox.style.display = 'none';
        checkBtn.textContent = 'Check Answer';
      }
    });

    wrapper.appendChild(checkBtn);
    answerBox.style.display = 'none';
    wrapper.appendChild(answerBox);
  }

  container.appendChild(wrapper);
}*/

function renderQuestion(q, index) {
  index = (currentPage * 10) - 10 + index;

  const wrapper = document.createElement('div');
  wrapper.className = "question-wrapper bg-white shadow-lg border border-gray-300 p-8 mb-8";

  // Header: Question number left, topic right
  const header = document.createElement('div');
  header.className = "question-header flex items-center justify-between mb-6";

  const questionNo = document.createElement('div');
  questionNo.className = "questionNo font-bold";
  questionNo.textContent = `Question ${index + 1}`;
  header.appendChild(questionNo);

  const topic = document.createElement('div');
  topic.className = "topic font-semibold";
  topic.textContent = topics[q.topic] || '';
  header.appendChild(topic);

  wrapper.appendChild(header);

  // Question text
  const questionText = document.createElement('div');
  questionText.className = "question-text text-lg mb-6";
  questionText.innerHTML = q.question;
  wrapper.appendChild(questionText);

  // Choices (multi-select, blue highlight)
  const choicesBox = document.createElement('div');
  choicesBox.className = "choices flex flex-col gap-3 mb-6";
  let selectedKeys = [];
  const choiceElements = {};

  Object.entries(q.choices).forEach(([key, val]) => {
    const choice = document.createElement('div');
    choice.className = "choice px-6 py-4 bg-gray-100 text-lg cursor-pointer transition border border-transparent";
    choice.textContent = `${key.toUpperCase()}. ${val}`;
    choice.addEventListener('click', () => {
      if (selectedKeys.includes(key)) {
        // Deselect
        selectedKeys = selectedKeys.filter(k => k !== key);
        choice.classList.remove('bg-blue-100', 'border-blue-500', 'text-blue-800');
      } else {
        // Select
        selectedKeys.push(key);
        choice.classList.add('bg-blue-100', 'border-blue-500', 'text-blue-800');
      }
    });
    choiceElements[key] = choice;
    choicesBox.appendChild(choice);
  });

  wrapper.appendChild(choicesBox);

  // Check Answer Button
  const checkBtn = document.createElement('button');
  checkBtn.className = "check-answer-btn mt-2 px-6 py-2  bg-gray-800 text-white font-semibold shadow hover:bg-gray-900 transition";
  checkBtn.textContent = 'Check Answer';

  // Answer Box
  const answerBox = document.createElement('div');
  answerBox.className = "answer-box mt-4 p-4  bg-green-50 text-green-700 font-medium";
  answerBox.style.display = 'none';

  checkBtn.addEventListener('click', () => {
    if (checkBtn.textContent === 'Check Answer') {
      Object.values(choiceElements).forEach(el => el.style.pointerEvents = 'none');
      // Mark correct/incorrect
      Object.entries(choiceElements).forEach(([key, el]) => {
        el.classList.remove('bg-green-100', 'border-green-500', 'text-green-700', 'bg-red-100', 'border-red-500', 'text-red-700');
        if (Array.isArray(q.answer) ? q.answer.includes(key) : key === q.answer) {
          el.classList.add('bg-green-100', 'border-green-500', 'text-green-700');
        } else if (selectedKeys.includes(key)) {
          el.classList.add('bg-red-100', 'border-red-500', 'text-red-700');
        }
      });
      answerBox.innerHTML = `Explanation: ${q.explanation || 'No explanation available.'}`;
      answerBox.style.display = 'block';
      checkBtn.textContent = 'Hide Answer';
    } else {
      Object.values(choiceElements).forEach(el => {
        el.style.pointerEvents = 'auto';
        el.classList.remove(
          'bg-green-100', 'border-green-500', 'text-green-700',
          'bg-red-100', 'border-red-500', 'text-red-700',
          'bg-blue-100', 'border-blue-500', 'text-blue-800'
        );
      });
      selectedKeys = [];
      answerBox.style.display = 'none';
      checkBtn.textContent = 'Check Answer';
    }
  });

  wrapper.appendChild(checkBtn);
  wrapper.appendChild(answerBox);

  container.appendChild(wrapper);
}



// Display the correct questions for the page
function displayQuestions() {
  container.innerHTML = ''; // Clear current questions
  if (filteredQuestions.length === 0) {
    container.innerHTML = '<div class="no-questions">No questions found for this topic.</div>';
    return;
  }
  const start = (currentPage - 1) * questionsPerPage;
  const end = start + questionsPerPage;
  const questionsToShow = filteredQuestions.slice(start, end);
  questionsToShow.forEach((q, i) => renderQuestion(q, i)); // Pass index!
}

// Init
createPaginationControls();
displayQuestions();
//document.getElementById('warning-message').style.display = "none";

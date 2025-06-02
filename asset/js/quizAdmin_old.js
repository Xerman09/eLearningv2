const quizContainer = document.getElementById('quiz-container');

let currentPage = parseInt(params.get('page')) || 1;
const subjectCode = params.get('subject');
const topicCode = params.get('topic');

const filteredQuestions = questions.filter(q => !topicCode || q.topic == topicCode);
const questionsPerPage = 10;
const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

function createPaginationControls() {
  const paginationBottom = document.createElement('div');
  paginationBottom.className = 'pagination';

  if (currentPage > 1) {
    const prevButtonBottom = document.createElement('button');
    prevButtonBottom.textContent = 'Previous';
    prevButtonBottom.className = 'previous';
    prevButtonBottom.addEventListener('click', () => navigatePage(currentPage - 1));
    paginationBottom.appendChild(prevButtonBottom);
  }

  const pageInfo = document.createElement('span');
  pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
  paginationBottom.appendChild(pageInfo);

  if (currentPage < totalPages) {
    const nextButtonBottom = document.createElement('button');
    nextButtonBottom.textContent = 'Next';
    nextButtonBottom.className = 'next';
    nextButtonBottom.addEventListener('click', () => navigatePage(currentPage + 1));
    paginationBottom.appendChild(nextButtonBottom);
  }

  quizContainer.parentElement.appendChild(paginationBottom);
}

function navigatePage(page) {
  if (page >= 1 && page <= totalPages) {
    window.location.search = `?page=${page}&subject=${subjectCode}&topic=${topicCode}`;
  }
}

function renderQuestion(q, index) {
  const topicName = 'CIVIL SERVICE EXAM REVIEWER 2025';
  index = (currentPage * 10) - 10 + index;
  const wrapper = document.createElement('div');
  wrapper.classList.add('question-wrapper');
  wrapper.style.position = 'relative';

  const header = document.createElement('div');
  header.classList.add('question-header');

  const topicTitle = document.createElement('div');
  topicTitle.className = 'topic-title';
  topicTitle.innerText = topicName;
  wrapper.appendChild(topicTitle);

  const questionNo = document.createElement('div');
  questionNo.classList.add('questionNo');
  questionNo.textContent = `Question ${index + 1}`;
  header.appendChild(questionNo);

  const topic = document.createElement('div');
  topic.classList.add('topic');
  topic.textContent = topics[q.topic];
  header.appendChild(topic);

  wrapper.appendChild(header);

  const questionText = document.createElement('div');
  questionText.classList.add('question-text');
  if (typeof q.question === 'object' && q.question.image) {
    const img = document.createElement('img');
    img.src = q.question.image;
    img.alt = 'Question image';
    img.classList.add('question-image');
    questionText.appendChild(img);
    const text = document.createElement('div');
    text.innerHTML = q.question.question;
    questionText.appendChild(text);
  } else {
    questionText.innerHTML = q.question;
  }
  wrapper.appendChild(questionText);

  const answerBox = document.createElement('div');
  answerBox.className = 'answer-box';

  let checkBtn;

  if (q.type === 'M' || q.type === 'MWI') {
    const isMultiAnswer = Array.isArray(q.answer);
    const choicesBox = document.createElement('div');
    choicesBox.classList.add('choices');
    const selectedKeys = new Set();
    const choiceElements = {};

    Object.entries(q.choices).forEach(([key, val]) => {
      const choice = document.createElement('div');
      choice.className = 'choice';
      choice.textContent = `${key.toUpperCase()}. ${val}`;
      choice.addEventListener('click', () => {
        if (isMultiAnswer) {
          if (selectedKeys.has(key)) {
            selectedKeys.delete(key);
            choice.classList.remove('selected');
          } else {
            selectedKeys.add(key);
            choice.classList.add('selected');
          }
        } else {
          selectedKeys.clear();
          Object.values(choiceElements).forEach(el => el.classList.remove('selected'));
          selectedKeys.add(key);
          choice.classList.add('selected');
        }
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
        const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
        Object.keys(choiceElements).forEach(key => {
          if (selectedKeys.has(key) && correctAnswers.includes(key)) {
            choiceElements[key].classList.add('correct');
          } else if (selectedKeys.has(key)) {
            choiceElements[key].classList.add('incorrect');
          } else if (correctAnswers.includes(key)) {
            choiceElements[key].classList.add('correct');
          }
        });
        answerBox.innerHTML = `<div>Explanation: ${q.explanation || 'No explanation available.'}</div>`;
        answerBox.style.display = 'block';
        checkBtn.textContent = 'Hide Answer';
      } else {
        Object.keys(choiceElements).forEach(k => {
          choiceElements[k].style.pointerEvents = 'auto';
          choiceElements[k].classList.remove('correct', 'incorrect', 'selected');
        });
        selectedKeys.clear();
        answerBox.style.display = 'none';
        checkBtn.textContent = 'Check Answer';
      }
    });

    wrapper.appendChild(checkBtn);
    answerBox.style.display = 'none';
    wrapper.appendChild(answerBox);
  }

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'download-btn';
  downloadBtn.textContent = 'Download as Image';

  downloadBtn.addEventListener('click', () => {
    downloadBtn.style.display = 'none';
    html2canvas(wrapper, {
      backgroundColor: null,
      scale: 2
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `question-${index + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      downloadBtn.style.display = 'inline-block';
    }).catch(err => {
      console.error('Image download failed:', err);
      downloadBtn.style.display = 'inline-block';
    });
  });

  wrapper.appendChild(downloadBtn);
  quizContainer.appendChild(wrapper);
}

function displayQuestions() {
  quizContainer.innerHTML = '';
  if (filteredQuestions.length === 0) {
    quizContainer.innerHTML = '<div class="no-questions">No questions found for this topic.</div>';
    return;
  }
  const start = (currentPage - 1) * questionsPerPage;
  const end = start + questionsPerPage;
  const questionsToShow = filteredQuestions.slice(start, end);
  questionsToShow.forEach((q, i) => renderQuestion(q, i));
}

createPaginationControls();
displayQuestions();

const warningMessage = document.getElementById('warning-message');
if (warningMessage) {
  warningMessage.style.display = "none";
}
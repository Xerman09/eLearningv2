
  const container = document.getElementById('quiz-container');
  
  // Get URL parameters
  const params = new URLSearchParams(window.location.search);
  let currentPage = parseInt(params.get('page')) || 1;
  
  let filteredQuestions = questions; // Remove topic filtering
  
  // Pagination settings
  const questionsPerPage = 10;
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  
  // Create pagination controls
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
  
    container.parentElement.appendChild(paginationBottom);
  }
  
  // Navigate to another page
  function navigatePage(page) {
    if (page >= 1 && page <= totalPages) {
      window.location.search = `?page=${page}`;
    }
  }
  
  // Render single question
  function renderQuestion(q, index) {
    index = (currentPage * 10) - 10 + index;
    const wrapper = document.createElement('div');
    wrapper.classList.add('question-wrapper');
  
    const header = document.createElement('div');
    header.classList.add('question-header');
  
    const questionNo = document.createElement('div');
    questionNo.classList.add('questionNo');
    questionNo.textContent = `Question ${index + 1}`;
    header.appendChild(questionNo);
  
    wrapper.appendChild(header);
  
    const questionText = document.createElement('div');
    questionText.classList.add('question-text');
  
    const answerBox = document.createElement('div');
    answerBox.className = 'answer-box';
  
    let checkBtn;
  
    if (q.type === 'M' || q.type === 'MWI') {
      if (typeof q.question === 'object' && q.question.image) {
        const img = document.createElement('img');
        img.src = q.question.image;
        img.alt = 'Question Image';
        img.className = 'question-image';
        wrapper.appendChild(img);
        questionText.innerHTML = q.question.question;
      } else {
        questionText.innerHTML = q.question;
      }
      wrapper.appendChild(questionText);
  
      const choicesBox = document.createElement('div');
      choicesBox.classList.add('choices');
      let selectedKeys = [];
      const choiceElements = {};
      const isMultipleAnswer = Array.isArray(q.answer);
  
      Object.entries(q.choices).forEach(([key, val]) => {
        const choice = document.createElement('div');
        choice.className = 'choice';
        choice.textContent = `${key.toUpperCase()}. ${val}`;
        choice.addEventListener('click', () => {
          if (!isMultipleAnswer) {
            selectedKeys = [key];
            Object.values(choiceElements).forEach(el => el.classList.remove('selected'));
            choice.classList.add('selected');
          } else {
            if (selectedKeys.includes(key)) {
              selectedKeys = selectedKeys.filter(k => k !== key);
              choice.classList.remove('selected');
            } else {
              selectedKeys.push(key);
              choice.classList.add('selected');
            }
          }
        });
        choiceElements[key] = choice;
        choicesBox.appendChild(choice);
      });
  
      wrapper.appendChild(choicesBox);
  
      checkBtn = document.createElement('button');
      checkBtn.className = 'check-answer-btn';
      checkBtn.textContent = 'Check Answer';
      checkBtn.style.width = 'auto';
      checkBtn.style.maxWidth = 'fit-content';
      checkBtn.addEventListener('click', () => {
        if (checkBtn.textContent === 'Check Answer') {
          Object.keys(choiceElements).forEach(k => {
            choiceElements[k].style.pointerEvents = 'none';
          });
  
          if (!isMultipleAnswer) {
            const correct = q.answer;
            if (!selectedKeys[0] || selectedKeys[0] !== correct) {
              if (selectedKeys[0]) choiceElements[selectedKeys[0]].classList.add('incorrect');
              choiceElements[correct].classList.add('correct');
            } else {
              choiceElements[correct].classList.add('correct');
            }
          } else {
            q.answer.forEach(k => {
              choiceElements[k].classList.add('correct');
            });
            selectedKeys.forEach(k => {
              if (!q.answer.includes(k)) {
                choiceElements[k].classList.add('incorrect');
              }
            });
          }
  
          answerBox.innerHTML = `<div>Explanation: ${q.explanation || 'No explanation available.'}</div>`;
          answerBox.style.display = 'block';
          checkBtn.textContent = 'Hide Answer';
        } else {
          Object.keys(choiceElements).forEach(k => {
            choiceElements[k].style.pointerEvents = 'auto';
            choiceElements[k].classList.remove('correct', 'incorrect', 'selected');
          });
          selectedKeys = [];
          answerBox.style.display = 'none';
          checkBtn.textContent = 'Check Answer';
        }
      });
  
      wrapper.appendChild(checkBtn);
      answerBox.style.display = 'none';
      wrapper.appendChild(answerBox);
    } else if (q.type === 'DAD') {
      if (typeof q.question === 'object') {
        const img = document.createElement('img');
        img.src = q.question.image;
        img.alt = 'Drag and Drop Question';
        img.className = 'question-image';
        wrapper.appendChild(img);
        questionText.innerHTML = q.question.question;
        wrapper.appendChild(questionText);
      }
  
      const checkBtn = document.createElement('button');
      checkBtn.textContent = 'Show Answer';
      checkBtn.className = 'check-answer-btn';
      checkBtn.style.width = 'auto';
      checkBtn.style.maxWidth = 'fit-content';
      checkBtn.addEventListener('click', () => {
        if (checkBtn.textContent === 'Show Answer') {
          const ansImg = document.createElement('img');
          ansImg.src = q.answer;
          ansImg.alt = 'Correct Answer';
          ansImg.className = 'answer-image';
          answerBox.innerHTML = '';
          answerBox.appendChild(ansImg);
          answerBox.innerHTML += `<div>Explanation: ${q.explanation || 'No explanation available.'}</div>`;
          answerBox.style.display = 'block';
          checkBtn.textContent = 'Hide Answer';
        } else {
          answerBox.style.display = 'none';
          checkBtn.textContent = 'Show Answer';
        }
      });
  
      wrapper.appendChild(checkBtn);
      answerBox.style.display = 'none';
      wrapper.appendChild(answerBox);
    }
  
    container.appendChild(wrapper);
  }
  
  function displayQuestions() {
    container.innerHTML = '';
    if (filteredQuestions.length === 0) {
      container.innerHTML = '<div class="no-questions">No questions found.</div>';
      return;
    }
    const start = (currentPage - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    const questionsToShow = filteredQuestions.slice(start, end);
    questionsToShow.forEach((q, i) => renderQuestion(q, i));
  }
  
  createPaginationControls();
  displayQuestions();
  
  document.getElementById('warning-message').style.display = 'none';
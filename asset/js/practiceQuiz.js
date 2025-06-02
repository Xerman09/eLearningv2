// --- Phase 1: Setup ---
const topicSelect = document.getElementById('topic-select');
const numQuestionsInput = document.getElementById('num-questions');
const setupDiv = document.getElementById('quiz-setup');
const flashcardDiv = document.getElementById('quiz-flashcard');
const summaryDiv = document.getElementById('quiz-summary');
let quizQuestions = [];
let userAnswers = [];
let currentIdx = 0;

// 1. Only show topics that have at least one question
const topicQuestionCount = {};
questions.forEach(q => {
    const key = String(q.topic);
    topicQuestionCount[key] = (topicQuestionCount[key] || 0) + 1;
});

// Populate topics
topicSelect.innerHTML = '<option value="all">All</option>';
Object.entries(topics).forEach(([key, label]) => {
    if (key !== "0" && topicQuestionCount[key]) { // Exclude "0" and only show topics with questions
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = label;
        topicSelect.appendChild(opt);
    }
});

// Add "Maximum Question: __" display below the input
let maxQuestionInfo = document.getElementById('max-question-info');
if (!maxQuestionInfo) {
    maxQuestionInfo = document.createElement('div');
    maxQuestionInfo.id = 'max-question-info';
    maxQuestionInfo.className = 'text-sm text-gray-600 mt-1';
    numQuestionsInput.parentNode.appendChild(maxQuestionInfo);
}

// 2. Set max number of questions based on topic selection
function updateNumQuestionsMax() {
    const selectedTopic = topicSelect.value;
    let count;
    if (selectedTopic === 'all') {
        count = questions.length;
    } else {
        count = questions.filter(q => String(q.topic) === String(selectedTopic)).length;
    }
    numQuestionsInput.max = count;
    if (parseInt(numQuestionsInput.value) > count) {
        numQuestionsInput.value = count > 0 ? count : 1;
    }
    maxQuestionInfo.textContent = `Maximum Question: ${count}`;
}
topicSelect.addEventListener('change', updateNumQuestionsMax);
updateNumQuestionsMax();

document.getElementById('start-quiz-btn').onclick = () => {
    // Get selected topic
    const selectedTopic = topicSelect.value;
    let filtered = selectedTopic === 'all'
        ? [...questions]
        : questions.filter(q => String(q.topic) === String(selectedTopic));

    // Shuffle questions
    filtered = filtered.sort(() => Math.random() - 0.5);

    // Get number of questions
    let num = parseInt(numQuestionsInput.value) || 1;
    if (num > filtered.length) num = filtered.length;
    quizQuestions = filtered.slice(0, num);

    // Shuffle choices for each question
    quizQuestions = quizQuestions.map(q => {
        const choices = Array.isArray(q.choices)
            ? q.choices.map((c, idx) => ({ c, idx }))
            : Object.entries(q.choices).map(([key, c], idx) => ({ c, idx, key }));
        const shuffled = choices.sort(() => Math.random() - 0.5);
        return {
            ...q,
            choices: shuffled.map(obj => obj.c),
            // If q.answer is keys (like "a"), convert to indices
            answer: Array.isArray(q.answer)
                ? q.answer.map(ans =>
                    typeof ans === "number"
                        ? shuffled.findIndex(obj => obj.idx === ans)
                        : shuffled.findIndex(obj => obj.key === ans)
                )
                : [shuffled.findIndex(obj => obj.key === q.answer)]
        };
    });

    userAnswers = new Array(quizQuestions.length).fill(null);
    currentIdx = 0;
    setupDiv.style.display = 'none';
    summaryDiv.style.display = 'none';
    flashcardDiv.style.display = 'block';
    renderFlashcard();
};

// --- Phase 2: Flashcard Quiz ---
function renderFlashcard() {
    if (!quizQuestions[currentIdx]) {
        flashcardDiv.innerHTML = '<div class="text-red-600 font-bold">No question to display.</div>';
        return;
    }
    const q = quizQuestions[currentIdx];

    // Calculate progress
    const progressPercent = Math.round(((currentIdx + 1) / quizQuestions.length) * 100);

    // Build the flashcard container
    const wrapper = document.createElement('div');
    wrapper.className = "flashcard";
    wrapper.id = "flashcard";

    // Progress bar HTML
    const progressBar = `
        <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div class="bg-primary h-3 rounded-full transition-all duration-300"
                 style="width: ${progressPercent}%;"></div>
        </div>
    `;

    // Question number and text
    wrapper.innerHTML = `
        ${progressBar}
        <div class="mb-2 text-xs text-gray-500">Question ${currentIdx + 1} of ${quizQuestions.length}</div>
        <div class="text-lg font-bold mb-4">${q.question}</div>
    `;

    // Choices styled as cards
    const choicesBox = document.createElement('div');
    choicesBox.className = "choices flex flex-col gap-4 mb-4";
    let selectedKeys = userAnswers[currentIdx] ? [...userAnswers[currentIdx]] : [];
    const choiceElements = {};

    q.choices.forEach((choice, i) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = "choice px-6 py-4 bg-gray-100 text-lg cursor-pointer rounded transition";
        choiceDiv.textContent = `${String.fromCharCode(65 + i)}. ${choice}`;
        if (selectedKeys.includes(i)) {
            choiceDiv.classList.add('bg-blue-100', 'text-blue-800');
        }
        choiceDiv.onclick = () => {
            if (selectedKeys.includes(i)) {
                selectedKeys = selectedKeys.filter(k => k !== i);
                choiceDiv.classList.remove('bg-blue-100', 'text-blue-800');
            } else {
                selectedKeys.push(i);
                choiceDiv.classList.add('bg-blue-100', 'text-blue-800');
            }
            userAnswers[currentIdx] = [...selectedKeys];
        };
        choiceElements[i] = choiceDiv;
        choicesBox.appendChild(choiceDiv);
    });
    wrapper.appendChild(choicesBox);

    // Navigation buttons
    const navDiv = document.createElement('div');
    navDiv.className = "flex justify-between mt-4";
    const prevBtn = document.createElement('button');
    prevBtn.className = "px-4 py-2 rounded bg-gray-200 font-semibold";
    prevBtn.textContent = '« Prev';
    if (currentIdx === 0) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = 0.5;
        prevBtn.style.cursor = 'not-allowed';
    }
    prevBtn.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            renderFlashcard();
        }
    };

    const nextBtn = document.createElement('button');
    nextBtn.className = "px-4 py-2 rounded bg-primary text-white font-semibold";
    nextBtn.textContent = currentIdx === quizQuestions.length - 1 ? 'Finish' : 'Next »';
    nextBtn.onclick = () => {
        userAnswers[currentIdx] = [...selectedKeys];
        if (currentIdx < quizQuestions.length - 1) {
            currentIdx++;
            renderFlashcard();
        } else {
            flashcardDiv.style.display = 'none';
            renderSummary();
        }
    };

    navDiv.appendChild(prevBtn);
    navDiv.appendChild(nextBtn);
    wrapper.appendChild(navDiv);

    // Render the flashcard
    flashcardDiv.innerHTML = '';
    flashcardDiv.appendChild(wrapper);
}

// --- Phase 3: Summary ---
function renderSummary() {
    summaryDiv.style.display = 'block';
    let correctCount = 0;
    // Prepare summary data
    const summaryData = quizQuestions.map((q, idx) => {
        const userAns = userAnswers[idx] || [];
        const isCorrect = userAns.length === q.answer.length && userAns.every(a => q.answer.includes(a)) && q.answer.every(a => userAns.includes(a));
        if (isCorrect) correctCount++;
        return {
            ...q,
            userAns,
            isCorrect
        };
    });

    // Sort: incorrect first
    summaryData.sort((a, b) => (a.isCorrect === b.isCorrect) ? 0 : a.isCorrect ? 1 : -1);

    // Calculate score percent
    const percent = quizQuestions.length ? correctCount / quizQuestions.length : 0;
    const percentDisplay = Math.round(percent * 100);

    // Calculate arc for SVG
    const radius = 120;
    const circumference = Math.PI * radius;
    const arcLength = circumference * percent;

    // SVG semicircle with solid color arc (no gradient dot)
    let arcColor;
    if (percent <= 0.4) {
        arcColor = "#e53935"; // red
    } else if (percent <= 0.7) {
        arcColor = "#ffb300"; // orange
    } else {
        arcColor = "#43a047"; // green
    }

    const scoreSVG = `
    <div class="flex justify-center mb-4">
    <svg width="350" height="200" viewBox="0 0 350 200">
        <!-- Background arc -->
        <path d="M 30 170 A 140 140 0 0 1 320 170" fill="none" stroke="#e0e0e0" stroke-width="18"/>
        <!-- Foreground arc -->
        <path d="M 30 170 A 140 140 0 0 1 320 170"
            fill="none"
            stroke="${arcColor}"
            stroke-width="18"
            stroke-dasharray="${arcLength},${circumference}"
            stroke-linecap="round"
            style="transition: stroke-dasharray 1s, stroke 1s;"
        />
        <!-- Percentage text -->
        <text x="175" y="110" text-anchor="middle" font-size="64" font-family="Arial" font-weight="bold" fill="${arcColor}" dominant-baseline="middle">${percentDisplay}%</text>
        <!-- Score text with extra space below -->
        <text x="175" y="155" text-anchor="middle" font-size="28" font-family="Arial" fill="#222" dominant-baseline="middle">Your Score: ${correctCount}/${quizQuestions.length}</text>
    </svg>
    </div>
    `;

    summaryDiv.innerHTML = `
        <div class="max-w-2xl mx-auto bg-white shadow rounded-xl p-8 mb-8 text-center">
            <h2 class="text-2xl font-bold mb-2">Quiz Summary</h2>
            ${scoreSVG}
            <button id="retake-btn" class="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-secondary">Retake Quiz</button>
        </div>
        <div>
            ${summaryData.map((q, idx) => {
                // Show choices with correct answer bold and green
                const choicesHtml = q.choices.map((choice, i) => {
                    const isCorrect = q.answer.includes(i);
                    return `<div style="margin-left:1.5em;" class="mb-1">
                        <span class="font-mono">${String.fromCharCode(97 + i)}.</span>
                        <span class="${isCorrect ? 'font-bold text-green-700 underline' : ''}">${choice}</span>
                    </div>`;
                }).join('');
                // User answer letters
                const userAnsLetters = q.userAns.length
                    ? q.userAns.map(i => String.fromCharCode(97 + i)).join(', ')
                    : '<span class="text-red-700">No answer</span>';
                return `
                    <div class="flashcard ${q.isCorrect ? 'correct' : 'incorrect'} mb-6 p-4 rounded bg-gray-50 text-left">
                        <div class="mb-2 text-xs text-gray-500">Question ${idx + 1}</div>
                        <div class="font-bold mb-2">${q.question}</div>
                        <div class="mb-2">${choicesHtml}</div>
                        <div class="mb-1">
                            <span class="font-semibold">Your Answer:</span>
                            <span>${userAnsLetters}</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    document.getElementById('retake-btn').onclick = () => {
        setupDiv.style.display = 'block';
        summaryDiv.style.display = 'none';
    };
}
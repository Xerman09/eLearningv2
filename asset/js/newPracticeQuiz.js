
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];
let qlen = questions.length;
const selectTopic = document.getElementById("select-topic-quiz");
const startQuizButton = document.getElementById('start-quiz-button');
const errorMessage = document.getElementById('error-message');
const questionNumberInput = document.getElementById('num-questions');

questionNumberInput.max = qlen;

document.getElementById('num-questions-label').innerText = `How many questions do you want to answer? (Max: ${qlen})`;
startQuizButton.onclick = () => startQuiz(qlen, 0);

// Populate the <select> options
Object.entries(topics).forEach(([key, value]) => {
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

    let qFilter = questions.filter(q => !key || q.topic == key)
    let qlen = qFilter.length;
    document.getElementById('num-questions-label').innerText =
        `How many questions do you want to answer? (Max: ${qlen})`;
    startQuizButton.onclick = () => startQuiz(qlen, key);
}

function startQuiz(questionLength, key) {
    let num = parseInt(document.getElementById('num-questions').value);

    if (isNaN(num) || num < 1 || num > questionLength) {
        errorMessage.innerText = `Please enter a valid number between 1 and ${questionLength}.`;
        errorMessage.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);

        return;
    }

    const filterQuestion = questions.filter(q => !key || q.topic == key);
    selectedQuestions = [...filterQuestion]
        .sort(() => Math.random() - 0.5)
        .slice(0, num);

    document.getElementById('start-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    showQuestion();
}


function showQuestion() {
    const q = selectedQuestions[currentIndex];

    
    const questionContainer = document.getElementById('question-text');
    const choicesDiv = document.getElementById('choices');
    const submitBtn = document.getElementById('submit-button');

    document.getElementById('question-text').innerHTML = `<b>Question ${currentIndex + 1}:</b> ${q.question}`;

    const totalQuestion = selectedQuestions.length;
    const progressPercent = ((currentIndex + 1)/totalQuestion)*100;
    document.getElementById('progress-bar').style.background = `linear-gradient(to right, #4caf50 ${progressPercent}%, #ccc ${progressPercent}%)`;

    choicesDiv.innerHTML = '';

    const isMultiAnswer = Array.isArray(q.answer);
    const questionType = q.type || 'M';

    let questionHTML = `<div class="question-title"><b>Question ${currentIndex + 1}:</b></div> <br>`;

    if (questionType === 'DAD') {
        const content = q.question;
        if (typeof content === 'object' && content.image && content.question) {
            if (content.image.startsWith('..') || content.image.startsWith('./') || content.image.startsWith('/')) {
                if (content.question.trim().length > 0) {
                    questionHTML += `${content.question}<br><img src="${content.image}" class="q-image">`;
                } else {
                    questionHTML += `<img src="${content.image}" class="q-image"><br>`;
                }
            }
        }
    } else if (questionType === 'MWI'){
        const contentArray = q.question;
        contentArray.forEach(item => {
            if (item.question) {
                questionHTML += `<p>${item.question}</p>`;
            } else if (item.image) {
                questionHTML += `<img src="${item.image}" class="q-image"><br>`;
            }
        });
    }else {
        questionHTML += q.question;
    }

    questionContainer.innerHTML = questionHTML;

    if (questionType === 'DAD') {
        submitBtn.style.display = 'none';


        const showAnswerBtn = document.createElement('button');
        showAnswerBtn.innerText = 'Show Answer';
        showAnswerBtn.onclick = () => {
            const ansImg = document.createElement('img');
            ansImg.src = q.answer;
            ansImg.className = 'answer-image';
            choicesDiv.appendChild(ansImg);

            const confirm = document.createElement('div');
            confirm.innerHTML = `
                <p>Did you get it right?</p>
            `;
            choicesDiv.appendChild(confirm);

            DADChoices = {
                a : 'YES',
                b : 'NO'
            }
            const choicesArray = Object.entries(DADChoices);

            choicesArray.forEach(([key, value]) => {
                const label = document.createElement('label');
                label.className = 'choice';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'choice';
                input.value = key;

                input.addEventListener('change', () => {
                    if (!isMultiAnswer) {
                        document.querySelectorAll('.choice').forEach(choice => {
                            choice.classList.remove('selected');
                        });
                    }
                    label.classList.toggle('selected', input.checked);
                });

                label.appendChild(input);
                label.appendChild(document.createTextNode(` ${value}`));
                choicesDiv.appendChild(label);
            });

            submitBtn.style.display = 'inline-block';

        };
        choicesDiv.appendChild(showAnswerBtn);
        return;
    }

    // Render choices for M and MWI
    //random Choices
    // const choicesArray = Object.entries(q.choices).sort(() => Math.random() - 0.5);
    // not random
    const choicesArray = Object.entries(q.choices);

    choicesArray.forEach(([key, value]) => {
        const label = document.createElement('label');
        label.className = 'choice';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'choice';
        input.value = key;

        input.addEventListener('change', () => {
            if (!isMultiAnswer) {
                document.querySelectorAll('.choice').forEach(choice => {
                    choice.classList.remove('selected');
                });
            }
            label.classList.toggle('selected', input.checked);
        });

        label.appendChild(input);
        const span = document.createElement('span');
        span.innerHTML = ` ${key}. ${value}`;
        label.appendChild(span);
        choicesDiv.appendChild(label);
    });

}


function submitDAD() {
    const selected = document.querySelector('input[name="gotIt"]:checked');
    if (!selected) {
        alert('Please select an answer.');
        return;
    }

    const gotItRight = selected.value === 'yes';
    if (gotItRight) score++;

    const q = selectedQuestions[currentIndex];
    userAnswers.push({
        question: q.question.question || q.question,
        userAnswer: gotItRight ? 'YES' : 'NO',
        correctAnswer: 'Refer to image',
        explanation: q.explanation || ''
    });

    currentIndex++;
    if (currentIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showSummary();
    }
}



function submitAnswer() {
    const inputs = Array.from(document.querySelectorAll('input[name="choice"]:checked'));
    if (inputs.length === 0) {
        alert('Please select an answer.');
        return;
    }
    const q = selectedQuestions[currentIndex];

    if (q.type === 'DAD') {
        const userSelected = inputs.map(input => input.value);
        const correctAnswer = ['a'];

        const isCorrect = Array.isArray(q.answer)
            ? arraysEqual(userSelected.sort(), correctAnswer)
            : userSelected.length === 1 && userSelected[0] === q.answer;

        if (userSelected == 'a') score++;

        userAnswers.push({
            question: q.question.question || q.question,  // handles MWI/DAD objects
            userAnswer: userSelected.join(', '),
            correctAnswer: correctAnswer.join(', '),
            explanation: q.explanation || ''
        });

        currentIndex++;
        if (currentIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showSummary();
        }
    } else {
        const userSelected = inputs.map(input => input.value);
        const correctAnswer = Array.isArray(q.answer) ? q.answer.sort() : [q.answer];

        const isCorrect = Array.isArray(q.answer)
            ? arraysEqual(userSelected.sort(), correctAnswer)
            : userSelected.length === 1 && userSelected[0] === q.answer;

        if (isCorrect) score++;

        userAnswers.push({
            question: q.question.question || q.question,  // handles MWI/DAD objects
            choices: q.choices,
            userAnswer: userSelected.join(', '),
            correctAnswer: correctAnswer.join(', '),
            explanation: q.explanation || ''
        });

        currentIndex++;
        if (currentIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showSummary();
        }
    }

}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}


function getBackgroundColor(percentage) {
    if (percentage <= 50) {
        return interpolateColor("#8B0000", "#FFA500", percentage / 50);
    } else {
        return interpolateColor("#FFA500", "#006400", (percentage - 50) / 50);
    }
}

function interpolateColor(color1, color2, factor) {
    let c1 = hexToRgb(color1);
    let c2 = hexToRgb(color2);
    let result = {
        r: Math.round(c1.r + (c2.r - c1.r) * factor),
        g: Math.round(c1.g + (c2.g - c1.g) * factor),
        b: Math.round(c1.b + (c2.b - c1.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
}

function hexToRgb(hex) {
    let bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function showSummary() {
    document.getElementById('quiz-container').classList.add('hidden');
    const summaryDiv = document.getElementById('summary');
    summaryDiv.classList.remove('hidden');

    const percentage = Math.floor((score / selectedQuestions.length) * 100);
    let bgColor = getBackgroundColor(percentage);

    // Score Summary
    let resultHTML = `<h2 class="ct-txt">Quiz Summary</h2>`;
    resultHTML += `<div class='percentage ct-txt'>${percentage}%</div>`;
    resultHTML += `<div class='score-graph' style='background: linear-gradient(to right, ${bgColor} ${percentage}%, #ccc ${percentage}%);'></div>`;
    resultHTML += `<p>You answered ${score} out of ${selectedQuestions.length} correctly.</p>`;

    // Separate incorrect and correct answers
    let incorrectHTML = '';
    let correctHTML = '';

    userAnswers.forEach((item, index) => {
        let questionHTML = "";

        // Handle question: either a string or array
        if (Array.isArray(item.question)) {
            item.question.forEach(qPart => {
                if (qPart.question) {
                    questionHTML += `${qPart.question}<br>`;
                } else if (qPart.image) {
                    questionHTML += `<img src="${qPart.image}" alt="Question Image" style="max-width: 100%;"><br>`;
                }
            });
        } else {
            questionHTML = item.question;
        }

        // Normalize answers
        const toSet = str => new Set(
            str.split(',')
                .map(a => a.trim().toLowerCase())
                .filter(Boolean)
        );
        const userSet = toSet(item.userAnswer || '');
        const correctSet = toSet(item.correctAnswer || '');
        const isCorrect = userSet.size === correctSet.size && [...userSet].every(a => correctSet.has(a));

        // Prepare choices
        let choicesHTML = "";
        Object.keys(item.choices).forEach(key => {
            const keyLower = key.toLowerCase();
            const isCorrectChoice = correctSet.has(keyLower);
            choicesHTML += `${key}. ${item.choices[key]}${isCorrectChoice ? ' ✅' : ''}<br>`;
        });

        // Question block
        const questionBlock = `
            <li>
                <b>Question ${index + 1}:</b><br>
                ${questionHTML}<br>
                ${choicesHTML}<br>
                <b>Your Answer:</b> ${item.userAnswer.toUpperCase()} ${isCorrect ? '✅' : '❌'}<br>
                ${item.explanation ? `<b>Explanation:</b><br> ${item.explanation}` : ''}
                <br><br>
            </li>
        `;

        if (isCorrect) {
            correctHTML += questionBlock;
        } else {
            incorrectHTML += questionBlock;
        }
    });

    // Combine all
    resultHTML += '<ul>';
    resultHTML += incorrectHTML;
    resultHTML += correctHTML;
    resultHTML += '</ul>';

    summaryDiv.innerHTML = resultHTML;
}



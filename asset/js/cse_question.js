document.getElementById('subject-title').innerText = 'CIVIL SERVICE PRACTICE EXAM';
document.getElementById('sidebar-subject-title').innerText = 'CIVIL SERVICE PRACTICE EXAM';

const topics = {
    0: 'ALL',
    1: 'MATHEMATICS',
    1.1: 'MATH - Word Problems', //and Operations',
    2 : 'VERBAL ABILITY',
    //2.1 : 'Word Meaning',
    2.2: 'Sentence Completion',
    2.3: 'Antonyms',
    2.4: 'Error Recognition',
    2.5: 'Synonyms',
    2.6: 'Single Word Analogy',
    //3 : 'FILIPINO',
    4: 'GENERAL INFORMATION',
    4.1: 'PHILIPPINE CONSTITUTION',
    4.2: 'R.A. 6713',
    4.3: 'Peace and Human Rights Issues and Concepts',
    4.4: 'Environment Management and Protection'
    //5 : 'INDUCTIVE REASONING',
    //6 : 'ABSTRACT REASONING',
    //7 : 'LOGICAL REASONING'
}
const sideBarContainer = document.getElementById("topicLinks"); // The container where links will be inserted

if (sideBarContainer) {
    sideBarContainer.innerHTML = ""; // Clear previous content

    // Group topics: whole numbers as main, decimals as children
    const mainTopics = {};
    Object.entries(topics).forEach(([key, value]) => {
        const numKey = Number(key);
        if (Number.isInteger(numKey)) {
            mainTopics[key] = { label: value, children: [] };
        }
    });
    Object.entries(topics).forEach(([key, value]) => {
        const numKey = Number(key);
        if (!Number.isInteger(numKey)) {
            const parentKey = Math.floor(numKey);
            if (mainTopics[parentKey]) {
                mainTopics[parentKey].children.push({ key, label: value });
            }
        }
    });

    // Make sidebar scrollable
    sideBarContainer.style.maxHeight = "calc(100vh - 2rem)";
    sideBarContainer.style.overflowY = "auto";

    // Create the main <ul> for topics
    const ulMain = document.createElement('ul');
    ulMain.style.listStyle = "none";
    ulMain.style.padding = "0";
    ulMain.style.margin = "0";

    // Get selected topic from URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTopic = urlParams.get('topic');

    // Render topics
    Object.entries(mainTopics).forEach(([mainKey, mainObj]) => {
        // Main topic <li>
        const li = document.createElement('li');
        li.className = "mb-1";
        li.id = 'topic-' + mainKey; // Set ID for the main topic
        li.style.cursor = "pointer"; // Make it clickable

        // Main topic <a>
        const a = document.createElement('a');
        a.href = `../practiceExam/exam.html?exam=cse_question&page=1&topic=${mainKey}`;
        a.className = "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 justify-between";
        a.innerHTML = `
            <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-folder-3-line"></i>
            </div>
            <span class="ml-3 sidebar-text flex-1 text-justify">${mainObj.label}</span>
            ${mainObj.children.length > 0 ? '<i class="ri-arrow-down-s-line ml-auto"></i>' : ''}
        `;

        // If has children, add dropdown <ul>
        let ul = null;
        if (mainObj.children.length > 0) {
            ul = document.createElement('ul');
            ul.className = "ml-8 mt-1";
            ul.style.listStyle = "none";
            ul.style.padding = "0";
            ul.style.margin = "0";

            // Insert "All {Main topic}" as the first child
            const allLi = document.createElement('li');
            allLi.className = "mb-1";
            const allA = document.createElement('a');
            allA.href = `../practiceExam/exam.html?exam=cse_question&page=1&topic=${mainKey}`;
            allA.className = "flex items-center px-4 py-2 text-gray-700 hover:bg-primary/10 font-semibold";
            allA.innerHTML = `
                <div class="w-6 h-6 flex items-center justify-center">
                    <i class="ri-list-unordered"></i>
                </div>
                <span class="ml-3 sidebar-text">All ${mainObj.label}</span>
            `;
            allLi.appendChild(allA);
            ul.appendChild(allLi);

            mainObj.children.forEach(child => {
                const childLi = document.createElement('li');
                childLi.className = "mb-1";
                const childA = document.createElement('a');
                childA.href = `../practiceExam/exam.html?page=1&exam=cse_question&topic=${child.key}`;
                childA.className = "flex items-center px-4 py-2 text-gray-700 hover:bg-primary/10";
                childA.innerHTML = `
                    <div class="w-6 h-6 flex items-center justify-center">
                        <i class="ri-arrow-right-s-line"></i>
                    </div>
                    <span class="ml-3 sidebar-text">${child.label}</span>
                `;

                childLi.appendChild(childA);
                ul.appendChild(childLi);
            });

            // Toggle dropdown on main topic click
            a.style.cursor = "pointer";
            a.onclick = (e) => {
                e.preventDefault();
                ul.classList.toggle("hidden");
                const arrow = a.querySelector('.ri-arrow-down-s-line');
                if (arrow) arrow.classList.toggle('rotate-180');
            };

            ul.classList.add('hidden');
            li.appendChild(ul);
        }

        // After all links are created, do the highlight logic:
        // Remove all highlight classes first
        a.classList.remove('bg-primary', 'text-white', 'bg-indigo-50', 'text-primary', 'rounded-r-lg');
        if (ul) {
            ul.querySelectorAll('a').forEach(link => {
                link.classList.remove('bg-primary', 'text-white', 'bg-indigo-50', 'text-primary', 'rounded-r-lg');
            });
        }

        // Highlight logic
        if (selectedTopic === String(mainKey)) {
            // "All {Main topic}" selected: highlight main topic and "All {Main topic}" only
            a.classList.add('bg-indigo-50', 'text-primary', 'rounded-r-lg');
            if (ul) {
                ul.classList.remove('hidden');
                ul.querySelectorAll('a').forEach(link => {
                    const url = new URL(link.href, window.location.origin);
                    const topicParam = url.searchParams.get('topic');
                    if (topicParam === selectedTopic) {
                        link.classList.add('bg-indigo-50', 'text-primary', 'rounded-r-lg');
                        console.log('Highlighting main topic:', topicParam, selectedTopic);
                    } else {
                        link.classList.remove('bg-indigo-50', 'text-primary', 'rounded-r-lg');
                        console.log('Removing highlight from:', topicParam, selectedTopic);
                    }
                });
            }
        } else if (mainObj.children.some(child => child.key === selectedTopic)) {
            // Subtopic selected: highlight main topic and subtopic only
            a.classList.add('bg-indigo-50', 'text-primary', 'rounded-r-lg');
            if (ul) {
                ul.classList.remove('hidden');
                ul.querySelectorAll('a').forEach(link => {
                    const url = new URL(link.href, window.location.origin);
                    const topicParam = url.searchParams.get('topic');
                    if (topicParam === selectedTopic) {
                        link.classList.add('bg-indigo-50', 'text-primary', 'rounded-r-lg');
                    } else {
                        link.classList.remove('bg-indigo-50', 'text-primary', 'rounded-r-lg');
                    }
                });
            }
        }

        // Insert the main topic into the sidebar
        li.appendChild(a);
        if (ul) li.appendChild(ul);
        ulMain.appendChild(li);
    });

    // Practice Quiz Button
    const quizLi = document.createElement('li');
    quizLi.className = "mt-4";
    const quizA = document.createElement('a');
    quizA.href = "../practiceExam/practiceQuiz.html?page=1&subject=cse_question&topic=";
    quizA.className = "flex items-center px-4 py-2 text-white font-semibold bg-primary hover:bg-secondary shadow transition";
    quizA.innerHTML = `
        <div class="w-6 h-6 flex items-center justify-center">
            <i class="ri-flashlight-line"></i>
        </div>
        <span class="ml-3 sidebar-text">PRACTICE QUIZ (FLASHCARD)</span>
    `;
    quizLi.appendChild(quizA);
    ulMain.appendChild(quizLi);

    // Insert the custom <ul> into the sidebar container
    sideBarContainer.appendChild(ulMain);
}


const questions = [
    {
        no: 1,
        topic: 1.1,
        type: 'M',
        question: 'Find the sum: 299 + 943 + 398 + 101.',
        choices: {
            a: '1 531',
            b: '1 641',
            c: '1 741',
            d: '122 222',
        },
        answer: 'c',
        explanation: 'The sum of 299 + 943 + 398 + 101 is <b>1 741</b>',
    },
    {
        no: 2,
        topic: 1.1,
        type: 'M',
        question: 'If 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55, then 11 + 12 + 13 + 14 + 15 + 16 + 17 + 18 + 19 + 20 = ?',
        choices: {
            a: '65',
            b: '155',
            c: '125',
            d: '550',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 3,
        topic: 1.1,
        type: 'M',
        question: 'If 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55, then 101 + 102 + 103 + 104 + 105 + 106 + 107 + 108 + 109 + 110 = ?',
        choices: {
            a: '1 055',
            b: '1 065',
            c: '1 075',
            d: '5 500',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 4,
        topic: 1.1,
        type: 'M',
        question: 'Evaluate: {16 - (24 - 8) + 22 x 8 - 8}.',
        choices: {
            a: '40',
            b: '48',
            c: '64',
            d: '168',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: 5,
        topic: 1.1,
        type: 'M',
        question: 'If 23 + 28 + 37 + x + 53 = 168 and 23 + 28 + 40 + y + 50 = 120. Find the value of x - y?',
        choices: {
            a: '36',
            b: '48',
            c: '56',
            d: '64',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 6,
        topic: 1.1,
        type: 'M',
        question: 'Find the product: 800 x 125',
        choices: {
            a: '925',
            b: '1 000',
            c: '10 000',
            d: '100 000',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: 7,
        topic: 1.1,
        type: 'M',
        question: 'Find the quotient: 8000 / 125',
        choices: {
            a: '48',
            b: '64',
            c: '80',
            d: '88',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 8,
        topic: 1.1,
        type: 'M',
        question: 'What is the remainder when 192 888 is divided by 8?',
        choices: {
            a: '0',
            b: '4',
            c: '8',
            d: '24 111',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 9,
        topic: 1.1,
        type: 'M',
        question: 'Rounding 299 943 to the nearest thousands the result is',
        choices: {
            a: '299 940',
            b: '299 000',
            c: '299 900',
            d: '300 000',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: 10,
        topic: 1.1,
        type: 'M',
        question: '398.101 is read as',
        choices: {
            a: 'three hundred ninety eight, one hundred one.',
            b: 'three hundred ninety eight and one hundred one.',
            c: 'three hundred ninety eight and one hundred',
            d: 'three hundred ninety eight and one hundred one thousandths',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: 11,
        topic: 1.1,
        type: 'M',
        question: 'A number is divisible by 8 if its last three digit is divisible by 8. Which of the following numbers is divisible by 8?',
        choices: {
            a: '9 208',
            b: '6 236',
            c: '88 254',
            d: '8 886',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 12,
        topic: 1.1,
        type: 'M',
        question: 'A number is divisible by 8 if its last three digit is divisible by 8. Which of the following numbers is divisible by 8?',
        choices: {
            a: '9 208',
            b: '6 236',
            c: '88 254',
            d: '8 886',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 18,
        topic: 1.1,
        type: 'M',
        question: 'What is 25% of 228',
        choices: {
            a: '52',
            b: '57',
            c: '54',
            d: '912',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 21,
        topic: 1.1,
        type: 'M',
        question: 'Evaluate: 123 x 0.1 + 123 x 0.01 + 123 x 0.001',
        choices: {
            a: '13.653',
            b: '135.53',
            c: '1356.3',
            d: '13563',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 24,
        topic: 1.1,
        type: 'M',
        question: 'Find the value of x in the equation 3x + 7 = 28',
        choices: {
            a: '7',
            b: '-7',
            c: '+-7',
            d: '4',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 26,
        topic: 1.1,
        type: 'M',
        question: 'Which of the following <b><i>cannot</b><i> yield an odd integer when divided by 10?',
        choices: {
            a: 'The sum of two odd integers',
            b: 'The product of a prime number and an odd integer',
            c: 'The product of two odd integers',
            d: 'The sum of three consecutive integers',
        },
        answer: 'c',
        explanation: '',
    },
    {
        no: 27,
        topic: 1.1,
        type: 'M',
        question: 'If 8x + 12 = 24, what is the value of 24x + 36?',
        choices: {
            a: '4',
            b: '6',
            c: '8',
            d: '72',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: 28,
        topic: 1.1,
        type: 'M',
        question: 'If a positive integer <b><i>m</b></i> is divisible by both 3 and 8, then <b><i>m</b></i> must also be divisible by?',
        choices: {
            a: '10',
            b: '18',
            c: '24',
            d: '60',
        },
        answer: 'c',
        explanation: '',
    },
    {
        no: 29,
        topic: 1.1,
        type: 'M',
        question: 'If positive integers <b><i>m</b></i> and <b><i>n</b></i> are not both odd, which of the following is always true?',
        choices: {
            a: 'm + n is even',
            b: 'mn is even',
            c: 'm - n cannot be odd',
            d: 'm + n - 1 is odd',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 30,
        topic: 1.1,
        type: 'M',
        question: 'Find the average temperature change for the 12-day period. Temperature change in degree celsius: 2.6, 3.8, 7.0, 4.5, 4.6, 7.9, 5.0, 8.1, 4.4, 5.3, 6.4, 5.2.',
        choices: {
            a: '4.8',
            b: '4.9',
            c: '5.2',
            d: '5.4',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no : "OTH-1", 
        topic: 4,
        type : 'M',
        question : 'An adjective used to designate a retired professor, pastor, bishop, or other personages but allowed to retain their title as an honor',
        choices : {
            a : 'Senior Citizen',
            b : 'Emeritus',
            c : 'Retiree',
            d : 'Charter',
        },
        answer : 'b',
        explanation: '',
    },    
    {
        no: 4.1,
        topic: 4.1,
        type: 'M',
        question: 'What is the highest law of the land in the Philippines',
        choices: {
            a: 'Civil Code',
            b: 'Philippine Constitution',
            c: 'Penal Code',
            d: 'Local Government Code',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 4.2,
        topic: 4.1,
        type: 'M',
        question: 'How many articles are there in the 1987 Philippine Constitution?',
        choices: {
            a: '18',
            b: '12',
            c: '21',
            d: '22',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 4.3,
        topic: 4.1,
        type: 'M',
        question: 'Which branch of the government is responsible for making laws?',
        choices: {
            a: 'Executive',
            b: 'Legislative',
            c: 'Judicial',
            d: 'Electoral',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 4.4,
        topic: 4.1,
        type: 'M',
        question: 'The power to declare martial law is vested in which official?',
        choices: {
            a: 'Senate President',
            b: 'Chief Justice',
            c: 'President of the Philippines',
            d: 'Speaker of the House',
        },
        answer: 'c',
        explanation: '',
    },
    {
        no: 4.5,
        topic: 4.1,
        type: 'M',
        question: 'Which article of the Constitution focuses on the Bill of Rights',
        choices: {
            a: 'Article II',
            b: 'Article III',
            c: 'Article IV',
            d: 'Article V',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 4.6,
        topic: 4.1,
        type: 'M',
        question: 'Who is responsible for determining the existence of probable cause for the issuance of a warrant of arrest or search warrant?',
        choices: {
            a: 'Lawyer',
            b: 'Judge',
            c: 'Fiscal',
            d: 'Prosecutor',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 4.7,
        topic: 4.1,
        type: 'M',
        question: 'The Senate shall be composed of how many senators elected at large by voters of the Philippines?',
        choices: {
            a: '21',
            b: '22',
            c: '23',
            d: '24',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: 4.8,
        topic: 4.1,
        type: 'M',
        question: 'The term of office of the President and Vice-President of the Philippines shall be up to how many years?',
        choices: {
            a: '3 Years',
            b: '4 Years',
            c: '5 Years',
            d: '6 Years',
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: 4.9,
        topic: 4.1,
        type: 'M',
        question: 'It states that "no person shall be deprived of life, liberty, or property without due process of law, nor any person be denied the equal protection of the laws.',
        choices: {
            a: 'Article VI',
            b: 'Bill of Rights',
            c: 'Republic Act',
            d: 'Court Order',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: 4.10,
        topic: 4.1,
        type: 'M',
        question: 'What are the 3 branches of the Government of the Philippines?',
        choices: {
            a: 'Senate, Supreme Court, Congress',
            b: 'Presidential, Unicameral - Parliamentary, Bicameral -Parliamentary',
            c: 'Legislative, Executive, Judicial',
            d: 'The Legislative, The Senate, The Supreme Court',
        },
        answer: 'c',
        explanation: '',
    },
    {
        no: 4.11,
        topic: 4.1,
        type: 'M',
        question: 'The following shall be exempted from taxation except:',
        choices: {
            a: 'Lands and buildings',
            b: 'Churches and convents',
            c: 'Charitable institutions',
            d: 'Non-profit cemeteries',
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: 4.12,
        topic: 4.1,
        type: 'M',
        question: 'It is a law in the Philippines that aims to address legal issues concerning online interactions and harmful internet behavior in the Philippines. It aims to present and punish cybercrime in the country.',
        choices: {
            a: 'Cybersquatting',
            b: 'Cybercrime Act',
            c: 'Cybercrime Prevention Act',
            d: 'Cyber Identity Theft Act',
        },
        answer: 'c',
        explanation: '',
    },
    {
        no: 4.13,
        topic: 4.1,
        type: 'M',
        question: 'It is a project of DOST for more accurate integrated and responsive disaster prevention and mitigation system expecially in high-risk calamity areas of the Philippines',
        choices: {
            a: 'PAGASA',
            b: 'I am ready',
            c: 'DOST - Advance Disaster Program',
            d: 'Project NOAH',
        },
        answer: 'd',
        explanation: 'D. Project NOAH - Nationwide Operational Assessment of Hazards',
    },
    {
        no: 4.14,
        topic: 4.1,
        type: 'M',
        question: 'The member of the House of Representatives shall be elected for a term of _____.',
        choices: {
            a: '3 Years',
            b: '4 Years',
            c: '5 Years',
            d: '6 Years',
        },
        answer: 'a',
        explanation: 'A. 3 Years is the term of the Elecetd Represenative and also the Senator',
    },
    {
        no: 4.15,
        topic: 4.1,
        type: 'M',
        question: 'It is the power of the State to promote public welfare by restraining the use of both liberty and property of all people',
        choices: {
            a: 'Police Power',
            b: 'Power of Eminent Domain',
            c: 'Power of Taxation',
            d: 'Power to Impeach',
        },
        answer: 'a',
        explanation: 'A. Police Power',
    },
    {
        no: "4.2025edCSC-2",
        topic: 4.1,
        type: 'M',
        question: 'The legislative power shall be vested in the ______ which shall consist of a Senate and a House of Representative',
        choices: {
            a: 'Congress of the Philippines',
            b: 'House of Ombudsman',
            c: 'The Supreme Court',
            d: 'Bureau of Internal Revenue',
        },
        answer: 'a',
        explanation: 'Legislative power is vested in the Congress of the Philippines, composed of the Senate and the House of Representatives, as stated in Article VI, Section 1 of the 1987 Philippine Constitution.',
    },
    {
        no: "4.2025edCSC-3",
        topic: 4.1,
        type: 'M',
        question: 'Who is the current Senate President of the Philippines?',
        choices: {
            a: 'Vicente Castelo Sotto III',
            b: 'Juan Miguel "Migz" Fernandex Zubiri',
            c: 'Francis Joseph "Chiz" Guevara Escudero',
            d: 'Frankin Magtanao Drilon',
        },
        answer: 'c',
        explanation: 'As of 2025, the current Senate President of the Philippines is Francis "Chiz" Escudero, elected to the position in 2024.',
    },
    {
        no: "4.2025edCSC-4",
        topic: 4.1,
        type: 'M',
        question: 'Who is the current Speaker of the House of Representative in the Philippines?',
        choices: {
            a: 'Elizaldy S. Co',
            b: 'Ferdinand Martin G. Romualdez',
            c: 'Stella Luz A. Quimbo',
            d: 'Gloria Macapagal-Arroyo',
        },
        answer: 'b',
        explanation: 'Ferdinand Martin G. Romualdez continues to serve as the Speaker of the House of Representatives as of 2025, a position he held since 2022.',
    },
    {
        no: "4.2025edCSC-5",
        topic: 4.1,
        type: 'M',
        question: 'Who is the current Chairperson of the House Committee on Appropriations?',
        choices: {
            a: 'Elizaldy "Zaldy" S. Co',
            b: 'Manuel Jose "Mannix" Dalipe',
            c: 'Stella Luiz A. Quimbo',
            d: 'Ferdinand Martin G. Romualdez',
        },
        answer: 'c',
        explanation: 'Stella Luiz A. Quimbo is the current Chairperson of the House Committee on Appropriations, responsible for handling budget-related legislation in the House.',
    },
    {
        no: "4.2025edCSC-6",
        topic: 4.1,
        type: 'M',
        question: 'The executive power shall be vested in the ____.',
        choices: {
            a: 'President of the Philippines',
            b: 'House of Representatives',
            c: 'The Supreme Court',
            d: 'The Congress',
        },
        answer: 'a',
        explanation: 'According to Article VII, Section 1 of the 1987 Philippine Constitution, the executive power is vested in the President of the Philippines, who acts as the head of state and government.',
    },
    
    {
        no: "2.R",
        topic: 2.2,
        type: 'M',
        question: 'The researcher’s groundbreaking work was met with initial resistance, but over time, it gained widespread _______ as further studies confirmed its validity.',
        choices: {
            a: 'Disapproval',
            b: 'Recognition',
            c: 'Indifference',
            d: 'Opposition',
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: "2.R",
        topic: 2.2,
        type: 'M',
        question: 'The engineers said the bridge was now ______, however, no one wanted to risk crossing it.',
        choices: {
            a: 'protected',
            b: 'prudent',
            c: 'fixed',
            d: 'safe',
        },
        answer: 'c',
        explanation: 'The structure of the sentence gives us a clue. It has two contrasting parts, connected by "however," which signals a contradiction. This means that although the engineers claimed something positive, people still did not trust the bridge enough to cross it. So, "fixed" makes the most sense because it acknowledges that the bridge was repaired, but people were still unsure or scared to cross—which matches the contrast introduced by “however.”',
    },
    {
        no: "2.CSC-1",
        topic: 2.2,
        type: 'M',
        question: 'The commoners played a show about the Lannisters, a _____ of the ineffective rulling of the leaders of King\'s Landing.',
        choices: {
            a: 'Play',
            b: 'Travesty',
            c: 'Pretention',
            d: 'Role-Playing',
            e: 'Showcase'
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: "2.CSC-2",
        topic: 2.2,
        type: 'M',
        question: 'The dentist ridiculed his patient\' ____ tooth enamel.',
        choices: {
            a: 'hard',
            b: 'favorable',
            c: 'healthy',
            d: 'mottled',
            e: 'lovely'
        },
        answer: 'd',
        explanation: '',
    },
    {
        no: "2.R",
        topic: 2.2,
        type: 'M',
        question: 'To ensure that Nathalie wouldn\'t know where we were going for her birthday, I took the most _____ route i could think of.',
        choices: {
            a: 'circuitous',
            b: 'craven',
            c: 'enigmatic',
            d: 'mercurial',
        },
        answer: 'a',
        explanation: 'The best word to complete the sentence is a. circuitous.',
    },
    {
        no: "2.CSC-3",
        topic: 2.2,
        type: 'M',
        question: 'Arya _____ upon witnessing his father\'s decapitation. Her face because ashen upon seeing such horabble scene, and she was not able to say anuthing for a while.',
        choices: {
            a: 'Gasped',
            b: 'Looked',
            c: 'Flummoxed',
            d: 'Breathed',
            e: 'Flunked'
        },
        answer: 'c',
        explanation: '',
    },
    {
        no: "2.CSC-4",
        topic: 2.2,
        type: 'M',
        question: 'Emma Watson was chosen to become a/an _____ for the remake of Beauty and the Beast in 2017. She will be playing as Belle.',
        choices: {
            a: 'Antagonist',
            b: 'Protagonist',
            c: 'Wicked',
            d: 'Opponent',
            e: 'Narrator'
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: "2.CSC-5",
        topic: 2.2,
        type: 'M',
        question: 'The beast promised to _____ havoc if ever somebody trespasses his kingdom.',
        choices: {
            a: 'Endow',
            b: 'Warrant',
            c: 'Ensue',
            d: 'Placate',
            e: 'Wreak'
        },
        answer: 'e',
        explanation: '',
    },
    {
        no: "2.CSC-6",
        topic: 2.2,
        type: 'M',
        question: 'Mae\'s talent in singing _____ under the tutelage of Prof. Dela Cruz, her music teacher. She is now a well-known singer from across the world.',
        choices: {
            a: 'Improved',
            b: 'Flourished',
            c: 'Embellished',
            d: 'Colluded',
            e: 'touted'
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: "2.CSC-7",
        topic: 2.2,
        type: 'M',
        question: 'Ana reached the _____ of her career upon the release of her second novel, which gained positive remarks from world-renowned authors from different countries.',
        choices: {
            a: 'Apogee',
            b: 'Plateau',
            c: 'Bottom',
            d: 'Trough',
            e: 'Downfall'
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: "2.CSC-8",
        topic: 2.2,
        type: 'M',
        question: 'Smoking cigarettes is mostly _____ in some part of the world. In the Philippines, however, there are still a lot of people who smoke cigarettes.',
        choices: {
            a: 'Taboo',
            b: 'Legal',
            c: 'Favorable',
            d: 'Common',
            e: 'Collective'
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: "2.CSC-9",
        topic: 2.2,
        type: 'M',
        question: 'Unlike dogs which are known to be loyal, cats are _____ in nature.',
        choices: {
            a: 'Treacheous',
            b: 'Dependable',
            c: 'Steadfast',
            d: 'Sweet',
            e: 'Clingy'
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: "2.CSC-10",
        topic: 2.2,
        type: 'M',
        question: 'The _____ told him to be careul in his way home, for the might encounter a tragedy he will never forget his entire life.',
        choices: {
            a: 'Stranger',
            b: 'Harbinger',
            c: 'Apogee',
            d: 'Dictum',
            e: 'Scintilla'
        },
        answer: 'b',
        explanation: '',
    },
    {
        no: "2.Scrib-24",
        topic: 2.2,
        type: 'M',
        question: 'The air was bitter cold, the temperature well below the freezing point, yet they found themselves _____ freely as they clambered up the steep northen slope.',
        choices: {
            a: 'Laughing',
            b: 'Perspiring',
            c: 'Disporting',
            d: 'Shivering',
            e: 'Confiding'
        },
        answer: 'b',
        explanation: '',
    },    
    {
        no: "2.Scrib-19",
        topic: 2.2,
        type: 'M',
        question: 'We are taking aback when we learned of his defection, never having suspected that he was anything but loyal, so credible has been his ____ of fidelity and devotion to the cause.',
        choices: {
            a: 'Vociferation',
            b: 'Intimidation',
            c: 'Dissimulation',
            d: 'Presumption',
            e: 'Presentiment'
        },
        answer: 'a',
        explanation: '',
    },
    {
        no: "7.CSC-101",
        topic: 7,
        type: 'M',
        question: 'The table in the dining room is round. The tbale in the living room is round. The table in the master\'s bedroom is round. So,',
        choices: {
            a: 'The house has so many tables',
            b: 'All the tables are round.',
            c: 'The table in the recreation area is also round.',
            d: 'The chairs are also round.',
        },
        answer: '',
        explanation: '',
    },
    {
        no: "7.CSC-102",
        topic: 7,
        type: 'M',
        question: 'All players in the Houston Hockey Team weigh more than 200 pounds. John is one of the team\s players. Hence,',
        choices: {
            a: 'John weighs more than 200 pounds',
            b: 'John is the best player',
            c: 'John is a hockey player',
            d: 'John is a good athlete',
        },
        answer: '',
        explanation: '',
    },
    {
        no: "7.CSC-103",
        topic: 7,
        type: 'M',
        question: 'Every typhoon that falls in the Philippines and nearby countries was created in the Pacific Ocean. Typhoon Senyang destructed the Philippines. Therefore,',
        choices: {
            a: 'Typhoon Senyang also destructed nearby countries',
            b: '',
            c: '',
            d: '',
        },
        answer: '',
        explanation: '',
    },
    // 2.3 Antonyms
    {
        no: "2.3.1",
        topic: 2.3,
        type: 'M',
        question: 'Czarmaine <b><i>accompanied</b></i> her sister to the drugstore.',
        choices: {
            a: 'followed',
            b: 'let go on one\'s own',
            c: 'left behind',
            d: 'stopped',
        },
        answer: 'b',
        explanation: 'To accompany someone means to go with them. "Let go on one\'s own" is the opposite, which does not match the context, thus "b" is incorrect. The correct answer should be a: followed.',
    },
    {
        no: "2.3.2",
        topic: 2.3,
        type: 'M',
        question: 'Beside the <b><i>boulevard</b></i> are gigantic buildings.',
        choices: {
            a: 'alley',
            b: 'street',
            c: 'avenue',
            d: 'road',
        },
        answer: 'a',
        explanation: 'A boulevard is a wide street, often lined with trees and buildings. The closest synonym from the choices is "avenue," not "alley." Correct answer should be c: avenue.',
    },
    {
        no: "2.3.3",
        topic: 2.3,
        type: 'M',
        question: 'He often got into trouble because he was <b><i>brusque</b></i>.',
        choices: {
            a: 'blunt',
            b: 'rude',
            c: 'refined',
            d: 'curt',
        },
        answer: 'c',
        explanation: 'Brusque means abrupt or curt in manner, often perceived as rude. Correct answer should be d: curt.',
    },
    {
        no: "2.3.4",
        topic: 2.3,
        type: 'M',
        question: 'The reporter\'s <b><i>candid</b></i> remarks caught the mayoralty candidate off-guard.',
        choices: {
            a: 'secret',
            b: 'frank',
            c: 'well-thought',
            d: 'reserved',
        },
        answer: 'c',
        explanation: 'Candid means frank or honest. "Well-thought" does not fit this meaning. Correct answer should be b: frank.',
    },
    {
        no: "2.3.5",
        topic: 2.3,
        type: 'M',
        question: 'The mean boys <b><i>derided</b></i> the sickly boy.',
        choices: {
            a: 'made fun of',
            b: 'ridiculed',
            c: 'praised',
            d: 'abandoned',
        },
        answer: 'c',
        explanation: 'To deride means to ridicule or mock. Correct answer should be b: ridiculed.',
    },
    {
        no: "2.3.6",
        topic: 2.3,
        type: 'M',
        question: 'Charm was <b><i>ecstatic</b></i> when she won first prize in the short story writing contest.',
        choices: {
            a: 'melancholic',
            b: 'overjoyed',
            c: 'worried',
            d: 'energetic',
        },
        answer: 'a',
        explanation: 'Ecstatic means extremely happy. Its antonym is melancholic, which means very sad.',
    },
    {
        no: "2.3.7",
        topic: 2.3,
        type: 'M',
        question: 'Migraine headaches are <b><i>excruciating</b></i>.',
        choices: {
            a: 'extremely painful',
            b: 'mild pain',
            c: 'painless',
            d: 'healing',
        },
        answer: 'c',
        explanation: 'Excruciating means intensely painful. Its antonym is painless.',
    },
    {
        no: "2.3.8",
        topic: 2.3,
        type: 'M',
        question: 'The quiz proved to be <b><i>facile</b></i> so the students got high scores.',
        choices: {
            a: 'difficult',
            b: 'easy',
            c: 'average',
            d: 'answerable',
        },
        answer: 'a',
        explanation: 'Facile means easy or simple. Its antonym is difficult.',
    },
    {
        no: "2.3.9",
        topic: 2.3,
        type: 'M',
        question: 'The <b><i>garrulous</b></i> girls were distanced from each other.',
        choices: {
            a: 'mute',
            b: 'talkative',
            c: 'behaved',
            d: 'quiet',
        },
        answer: 'd',
        explanation: 'Garrulous means excessively talkative. Its antonym is quiet.',
    },
    {
        no: "2.3.10",
        topic: 2.3,
        type: 'M',
        question: 'The <b><i>heathens</b></i> used to practice cannibalism.',
        choices: {
            a: 'uncivilized people',
            b: 'barbaric people',
            c: 'old people',
            d: 'cultured people',
        },
        answer: 'd',
        explanation: 'Heathens refer to uncultured or irreligious people. The antonym is cultured people.',
    },
    {
        no: "2.3.25",
        topic: 2.3,
        type: 'M',
        question: 'I admire people who are modest despite their <b><i>opulence</i></b>.',
        choices: {
            a: 'Great wealth',
            b: 'Poverty',
            c: 'Affluence',
            d: 'Lavishes',
        },
        answer: 'b',
        explanation: '"Opulence" means great wealth or luxuriousness. The antonym is "poverty."',
    },
    {
        no: "2.3.12",
        topic: 2.3,
        type: 'M',
        question: 'Never operate a machine once you are <b><i>inebriated</i></b>.',
        choices: {
            a: 'Sober',
            b: 'Drunk',
            c: 'Sleepy',
            d: 'Active',
        },
        answer: 'a',
        explanation: '"Inebriated" means drunk or intoxicated. The antonym is "sober," which means not affected by alcohol.',
    },
    {
        no: "2.3.36",
        topic: 2.3,
        type: 'M',
        question: 'If words were swords, then her <b><i>vitriolic</i></b> remarks could really kill.',
        choices: {
            a: 'Scathing',
            b: 'Sarcastic',
            c: 'Satirical',
            d: 'Kind',
        },
        answer: 'd',
        explanation: '"Vitriolic" means filled with bitter criticism. The antonym is "kind."',
    },
    {
        no: "2.3.22",
        topic: 2.3,
        type: 'M',
        question: 'The CSE Practice Exam Books are <b><i>noteworthy</i></b> materials.',
        choices: {
            a: 'Remarkable',
            b: 'Substantial',
            c: 'Trivial',
            d: 'Significant',
        },
        answer: 'c',
        explanation: '"Noteworthy" means deserving attention; significant. The antonym is "trivial."',
    },
    {
        no: "2.3.19",
        topic: 2.3,
        type: 'M',
        question: 'We listened attentively to the <b><i>mellifluous</i></b> sound produced by the Philippine Philharmonic Orchestra.',
        choices: {
            a: 'Harsh',
            b: 'Resonant',
            c: 'Melodious',
            d: 'Mellow',
        },
        answer: 'a',
        explanation: '"Mellifluous" means sweet or musical; pleasant to hear. The antonym is "harsh."',
    },
    {
        no: "2.3.32",
        topic: 2.3,
        type: 'M',
        question: 'CJ de Silva’s painting abilities are <b><i>uncanny</i></b>.',
        choices: {
            a: 'Remarkable',
            b: 'Ordinary',
            c: 'Astonishing',
            d: 'Unbelievable',
        },
        answer: 'b',
        explanation: '"Uncanny" means strange or remarkable. The antonym is "ordinary."',
    },
    {
        no: "2.3.23",
        topic: 2.3,
        type: 'M',
        question: 'You will never get sufficient nourishment if you are <b><i>obdurate</i></b> in refusing to eat vegetables.',
        choices: {
            a: 'Stubborn',
            b: 'Obedient',
            c: 'Firm',
            d: 'Willful',
        },
        answer: 'b',
        explanation: '"Obdurate" means stubborn or unyielding. The antonym is "obedient."',
    },
    {
        no: "2.3.13",
        topic: 2.3,
        type: 'M',
        question: 'The people <b><i>inveighed</i></b> against the sharp increase in oil prices.',
        choices: {
            a: 'Admitted',
            b: 'Amended',
            c: 'Accepted',
            d: 'Deliberated',
        },
        answer: 'c',
        explanation: '"Inveighed" means to protest strongly or speak out against something. The antonym is "accepted," which means to receive or agree to something willingly.',
    },
    {
        no: "2.3.28",
        topic: 2.3,
        type: 'M',
        question: 'Chin is such a <b><i>precocious</i></b> girl who can already read at age three.',
        choices: {
            a: 'Slow learner',
            b: 'Bright',
            c: 'Inquisitive',
            d: 'Advanced',
        },
        answer: 'a',
        explanation: '"Precocious" means advanced for one\'s age. The antonym is "slow learner."',
    },
    {
        no: "2.3.26",
        topic: 2.3,
        type: 'M',
        question: 'Do you always try to be a <b><i>paragon</i></b> of virtue?',
        choices: {
            a: 'Model',
            b: 'Example',
            c: 'Yardstick',
            d: 'Anomaly',
        },
        answer: 'd',
        explanation: '"Paragon" means a model of excellence. The antonym is "anomaly," which means something that deviates from the norm.',
    },
    {
        no: "2.3.21",
        topic: 2.3,
        type: 'M',
        question: 'Justice calls for penalizing <b><i>nefarious</i></b> acts.',
        choices: {
            a: 'Honorable',
            b: 'Detestable',
            c: 'Infamous',
            d: 'Vile',
        },
        answer: 'a',
        explanation: '"Nefarious" means wicked or criminal. The antonym is "honorable."',
    },
    {
        no: "2.3.11",
        topic: 2.3,
        type: 'M',
        question: 'Keep on believing that physical disability is not a <b><i>hindrance</i></b> to success.',
        choices: {
            a: 'Block',
            b: 'Stepping stone',
            c: 'Opportunity',
            d: 'Difficulty',
        },
        answer: 'b',
        explanation: 'A "hindrance" is something that impedes or blocks progress, while a "stepping stone" is something that helps you move forward. Thus, "stepping stone" is the antonym.',
    },
    {
        no: "2.3.14",
        topic: 2.3,
        type: 'M',
        question: 'Some people believe that breaking a mirror is a <b><i>jinx</i></b>.',
        choices: {
            a: 'Bad luck',
            b: 'Evil',
            c: 'Expensive',
            d: 'Good luck',
        },
        answer: 'd',
        explanation: 'A "jinx" is something that brings bad luck. The antonym is "good luck."',
    },
    {
        no: "2.3.16",
        topic: 2.3,
        type: 'M',
        question: 'The <b><i>lanky</i></b> lad stood out among the average-sized students.',
        choices: {
            a: 'Fierce-looking',
            b: 'Gigantic',
            c: 'Short and stout',
            d: 'Tall and thin',
        },
        answer: 'c',
        explanation: '"Lanky" means tall and thin. The antonym is "short and stout."',
    },
    {
        no: "2.3.18",
        topic: 2.3,
        type: 'M',
        question: '<b><i>Heinous</i></b> criminals are truly loathsome.',
        choices: {
            a: 'Repugnant',
            b: 'Foul',
            c: 'Adorable',
            d: 'Nasty',
        },
        answer: 'c',
        explanation: '"Heinous" means extremely wicked or evil. The antonym is "adorable," which means lovable or delightful.',
    },
    {
        no: "2.3.20",
        topic: 2.3,
        type: 'M',
        question: 'The free medical and dental checkup conducted by the AFP Group is just a proof of their <b><i>munificence</i></b>.',
        choices: {
            a: 'Commitment',
            b: 'Generosity',
            c: 'Extravagance',
            d: 'Stinginess',
        },
        answer: 'd',
        explanation: '"Munificence" means great generosity. The antonym is "stinginess."',
    },
    {
        no: "2.3.31",
        topic: 2.3,
        type: 'M',
        question: 'An A-rating represents the <b><i>ultimate</i></b> honor a film will ever have.',
        choices: {
            a: 'Greatest',
            b: 'Pinnacle',
            c: 'Least',
            d: 'Supreme',
        },
        answer: 'c',
        explanation: '"Ultimate" means the best or most extreme. The antonym is "least."',
    },
    {
        no: "2.3.34",
        topic: 2.3,
        type: 'M',
        question: 'The strong current of the floodwaters caused the wooden bridge to <b><i>vacillate</i></b>.',
        choices: {
            a: 'Collapse',
            b: 'Sway',
            c: 'Vibrate',
            d: 'Be firm',
        },
        answer: 'd',
        explanation: '"Vacillate" means to waver or be indecisive. The antonym is "be firm."',
    },
    {
        no: "2.3.27",
        topic: 2.3,
        type: 'M',
        question: 'Tragic stories had so much <b><i>pathos</i></b> that it left me feeling down.',
        choices: {
            a: 'Anguish',
            b: 'Woe',
            c: 'Intrigue',
            d: 'Humor',
        },
        answer: 'd',
        explanation: '"Pathos" means a quality that evokes pity or sadness. The antonym is "humor."',
    },
    {
        no: "2.3.29",
        topic: 2.3,
        type: 'M',
        question: 'She had the <b><i>quixotic</i></b> idea that she was a reincarnation of a British princess.',
        choices: {
            a: 'Wild',
            b: 'Fantastic',
            c: 'Realistic',
            d: 'Dreamy',
        },
        answer: 'c',
        explanation: '"Quixotic" means exceedingly idealistic or unrealistic. The antonym is "realistic."',
    },
    {
        no: "2.3.24",
        topic: 2.3,
        type: 'M',
        question: 'Don’t be so <b><i>obtrusive</i></b> but instead, mind your own business.',
        choices: {
            a: 'Reserved',
            b: 'Snoopy',
            c: 'Nosey',
            d: 'Interfering',
        },
        answer: 'a',
        explanation: '"Obtrusive" means noticeable or prominent in an unwelcome way. The antonym is "reserved."',
    },
    {
        no: "2.3.33",
        topic: 2.3,
        type: 'M',
        question: 'Lea Salonga’s performance was <b><i>utterly</i></b> delightful.',
        choices: {
            a: 'Somewhat',
            b: 'Entirely',
            c: 'Thoroughly',
            d: 'Absolutely',
        },
        answer: 'a',
        explanation: '"Utterly" means completely or absolutely. The antonym is "somewhat."',
    },
    {
        no: "2.3.39",
        topic: 2.3,
        type: 'M',
        question: 'The tutors are all <b><i>zealous</i></b> tutors who nourish eager minds.',
        choices: {
            a: 'Vigorous',
            b: 'Earnest',
            c: 'Indifferent',
            d: 'Enthusiastic',
        },
        answer: 'c',
        explanation: '"Zealous" means showing great energy or enthusiasm. The antonym is "indifferent."',
    },
    {
        no: "2.3.30",
        topic: 2.3,
        type: 'M',
        question: 'The <b><i>ramshackle</i></b> building collapsed easily.',
        choices: {
            a: 'New',
            b: 'Old',
            c: 'Outdated',
            d: 'Shabby',
        },
        answer: 'a',
        explanation: '"Ramshackle" means in a state of severe disrepair. The antonym is "new."',
    },
    {
        no: "2.3.35",
        topic: 2.3,
        type: 'M',
        question: 'The <b><i>vindictive</i></b> politician spread rumors about his opponent.',
        choices: {
            a: 'Revengeful',
            b: 'Forgiving',
            c: 'Spiteful',
            d: 'Malicious',
        },
        answer: 'b',
        explanation: '"Vindictive" means having a strong desire for revenge. The antonym is "forgiving."',
    },
    {
        no: "2.3.40",
        topic: 2.3,
        type: 'M',
        question: 'Don’t let <b><i>trivial</i></b> things upset you.',
        choices: {
            a: 'Important',
            b: 'Trifling',
            c: 'Ordinary',
            d: 'Inconsequential',
        },
        answer: 'a',
        explanation: '"Trivial" means of little value or importance. The antonym is "important."',
    },
    {
        no: "2.3.37",
        topic: 2.3,
        type: 'M',
        question: 'Many students <b><i>vouch</i></b> for the effectiveness of the review classes.',
        choices: {
            a: 'Guarantee',
            b: 'Endorse',
            c: 'Affirm',
            d: 'Refute',
        },
        answer: 'd',
        explanation: '"Vouch" means to confirm or support as true. The antonym is "refute."',
    },
    {
        no: "2.3.38",
        topic: 2.3,
        type: 'M',
        question: 'The <b><i>yonder</i></b> youth is more studious than the nearer one.',
        choices: {
            a: 'Lonesome',
            b: 'Farther',
            c: 'Closer',
            d: 'Thither',
        },
        answer: 'c',
        explanation: '"Yonder" means at some distance in the direction indicated. The antonym is "closer."',
    },
    {
        no: "2.3.17",
        topic: 2.3,
        type: 'M',
        question: 'The sickly dog was given a <b><i>lethal</i></b> dose of morphine tablets.',
        choices: {
            a: 'Fatal',
            b: 'Safe',
            c: 'Deadly',
            d: 'Nasty',
        },
        answer: 'b',
        explanation: '"Lethal" means deadly or fatal. The antonym is "safe."',
    },
    {
        no: "2.3.15",
        topic: 2.3,
        type: 'M',
        question: 'The players were confused when the <b><i>kibitzers</i></b> suddenly butted-in during the team’s huddle.',
        choices: {
            a: 'Advisers',
            b: 'Spectators',
            c: 'Onlookers',
            d: 'Crowd',
        },
        answer: 'a',
        explanation: '"Kibitzers" are people who offer unwanted advice or commentary. The antonym is "advisers," who are expected to give advice and are usually welcomed.',
    },
        {
        no : "CSR-", 
        topic: 2.4,
        type : 'M',
        question : `
                <div class="error-reg">
                    <div class="sentence">
                        <div class="phrase">
                            No one
                        </div>
                        <div class="choices">
                            a
                        </div>
                    </div>
                    <div class="sentence">
                        <div class="phrase">
                            were happy
                        </div>
                        <div class="choices">
                            b
                        </div>
                    </div>
                    the Mindanao
                    <div class="sentence">
                        <div class="phrase">
                            crisis
                        </div>
                        <div class="choices">
                            d
                        </div>
                    </div>.
                    <div class="sentence">
                        <div class="phrase">
                            No error
                        </div>
                        <div class="choices">
                            e
                        </div>
                    </div>                   
                </div>
            `,
        choices : {
            a : '',
            b : '',
            c : '',
            d : '',
        },
        answer : '',
        explanation: '',
    },
];

const synonyms = [
    {
        no: 2,
        topic: '2.5',
        type: 'M',
        question: 'It’s hard to see atoms without naked eyes because it is <b><i>infinitesimal</i></b>.',
        choices: {
            a: 'Invisible',
            b: 'Interesting',
            c: 'Microscopic',
            d: 'Large',
        },
        answer: 'c',
        explanation: 'The correct answer is (c) Microscopic. Atoms are extremely small and cannot be seen with the naked eye, hence they are described as microscopic.'
    },
    {
        no: 4,
        topic: '2.5',
        type: 'M',
        question: 'Political leaders must be careful not to make <b><i>disparaging</i></b> remarks that might offend the nation.',
        choices: {
            a: 'Scornful',
            b: 'Praising',
            c: 'Sycophantic',
            d: 'Flattering',
        },
        answer: 'a',
        explanation: 'The correct answer is (a) Scornful. Disparaging remarks are critical or disrespectful comments, hence scornful fits.'
    },
    {
        no: 1,
        topic: '2.5',
        type: 'M',
        question: 'Ana considers her crush an <b><i>epitome</i></b> of perfection.',
        choices: {
            a: 'Embodiment',
            b: 'Reverse',
            c: 'Opposite',
            d: 'Contrast',
        },
        answer: 'a',
        explanation: 'The correct answer is (a) Embodiment. An epitome means a perfect example of something, which is synonymous with embodiment.'
    },
    {
        no: 10,
        topic: '2.5',
        type: 'M',
        question: 'Novah’s grandmother gave her a collection of expensive vintage <b><i>tchotchkes</i></b>.',
        choices: {
            a: 'Books',
            b: 'Trinkets',
            c: 'Flowers',
            d: 'Plants',
        },
        answer: 'b',
        explanation: 'The correct answer is (b) Trinkets. Tchotchkes are small decorative objects, often collectible items like trinkets.'
    },
    {
        no: 6,
        topic: '2.5',
        type: 'M',
        question: 'Lily and Marshall are going to the <b><i>suburbs</i></b>, a 45-minute ride away from the city.',
        choices: {
            a: 'Outskirts',
            b: 'Centers',
            c: 'City',
            d: 'Downtown',
        },
        answer: 'a',
        explanation: 'The correct answer is (a) Outskirts. Suburbs are usually located on the outskirts of a city, away from the center.'
    },
    {
        no: 3,
        topic: '2.5',
        type: 'M',
        question: 'Queen Regina’s <b><i>wrath</i></b> towards Snow White led her to cursing Emma and the rest of Storybrooke.',
        choices: {
            a: 'Love',
            b: 'Anger',
            c: 'Rage',
            d: 'Care',
        },
        answer: 'c',
        explanation: 'The correct answer is (c) Rage. Wrath is intense anger, which is synonymous with rage.'
    },
    {
        no: 8,
        topic: '2.5',
        type: 'M',
        question: 'We should be spending our time on earth wisely, for life can be <b><i>ephemeral</i></b>.',
        choices: {
            a: 'Shrivel',
            b: 'Long-lasting',
            c: 'Beautiful',
            d: 'Short-lived',
        },
        answer: 'd',
        explanation: 'The correct answer is (d) Short-lived. Ephemeral means lasting for a short time, hence short-lived is the appropriate choice.'
    },
    {
        no: 5,
        topic: '2.5',
        type: 'M',
        question: 'I am still <b><i>ambivalent</i></b> on whether I should be going to the camp or not.',
        choices: {
            a: 'Decisive',
            b: 'Uncertain',
            c: 'Sure',
            d: 'Definite',
        },
        answer: 'b',
        explanation: 'The correct answer is (b) Uncertain. Ambivalent means having mixed feelings or being uncertain about something.'
    },
    {
        no: 9,
        topic: '2.5',
        type: 'M',
        question: 'We prayed for our lives as our car stopped at the <b><i>brink</i></b> of a cliff.',
        choices: {
            a: 'Edge',
            b: 'Center',
            c: 'Middle',
            d: 'Inside',
        },
        answer: 'a',
        explanation: 'The correct answer is (a) Edge. The brink of a cliff refers to the edge, where the car was stopped.'
    },
    {
    no: 11,
    topic: '2.5',
    type: 'M',
    question: 'I don’t like your <b><i>apathy</i></b> towards the present political condition of the country.',
    choices: {
        a: 'Interest',
        b: 'Indifference',
        c: 'Curiosity',
        d: 'Awareness',
    },
    answer: 'b',
    explanation: 'The correct answer is (b) Indifference. Apathy means a lack of interest, enthusiasm, or concern—similar to indifference.'
}
];

const singleWordAnalogyQuestions = [
    {
        no: 13,
        topic: 2.6,
        type: 'M',
        question: 'Stalagmite : Floor :: Stalactite : ______.',
        choices: {
            a: 'Wall',
            b: 'Ceiling',
            c: 'Mouth',
            d: 'Window'
        },
        answer: 'b',
        explanation: 'Stalagmites grow from the floor, stalactites hang from the ceiling.'
    },
    {
        no: 7,
        topic: 2.6,
        type: 'M',
        question: 'Tagbanua : Palawan :: Kankanaey : ______',
        choices: {
            a: 'Ilocos',
            b: 'Cavite',
            c: 'Benguet',
            d: 'Cebu'
        },
        answer: 'c',
        explanation: 'Tagbanua is an ethnic group in Palawan, Kankanaey is an ethnic group in Benguet.'
    },
    {
        no: 17,
        topic: 2.6,
        type: 'M',
        question: 'Parachute : Andre Jacques Garnerin :: Television : _____',
        choices: {
            a: 'John Logie Baird',
            b: 'William Sony',
            c: 'John Vincent Crowe',
            d: 'Howard Aiken'
        },
        answer: 'a',
        explanation: 'Andre Jacques Garnerin invented the parachute, John Logie Baird invented the television.'
    },
    {
        no: 3,
        topic: 2.6,
        type: 'M',
        question: 'BIR : Taxes :: DPWH : _____',
        choices: {
            a: 'Public Roads',
            b: 'Houses',
            c: 'Traffic',
            d: 'Churches'
        },
        answer: 'a',
        explanation: 'BIR is responsible for taxes, DPWH is responsible for public roads.'
    },
    {
        no: 21,
        topic: 2.6,
        type: 'M',
        question: 'Allied Powers : Russia :: Central Powers: _____',
        choices: {
            a: 'France',
            b: 'Britain',
            c: 'Italy',
            d: 'Austria'
        },
        answer: 'd',
        explanation: 'Russia was part of the Allied Powers, Austria was part of the Central Powers during World War I.'
    },
    {
        no: 24,
        topic: 2.6,
        type: 'M',
        question: 'Conspicuous : Obvious :: Hideous : _____',
        choices: {
            a: 'Hidden',
            b: 'Ugly',
            c: 'Expert in hiding',
            d: 'Very bad.'
        },
        answer: 'b',
        explanation: 'Conspicuous means obvious, hideous means ugly.'
    },
    {
        no: 1,
        topic: 2.6,
        type: 'M',
        question: 'Moby Dick : Herman Melville :: The Old Man and the Sea: ________',
        choices: {
            a: 'Charles Dickens',
            b: 'Ernest Hemingway',
            c: 'Charles Perrault',
            d: 'Robert Frost'
        },
        answer: 'b',
        explanation: 'Herman Melville wrote "Moby Dick" and Ernest Hemingway wrote "The Old Man and the Sea".'
    },
    {
        no: 19,
        topic: 2.6,
        type: 'M',
        question: 'Pythagorean Theorem : Pythagoras :: Cubic Equation : _____',
        choices: {
            a: 'Alfried Nobel',
            b: 'Isaac Newton',
            c: 'Tartaglia',
            d: 'Rene Descartes'
        },
        answer: 'c',
        explanation: 'Pythagoras is known for the Pythagorean Theorem, Tartaglia is known for the solution to the cubic equation.'
    },
    {
        no: 10,
        topic: 2.6,
        type: 'M',
        question: 'Mahabharata : India :: Gilgamesh : _____.',
        choices: {
            a: 'Assyria',
            b: 'Sumeria',
            c: 'Chaldea',
            d: 'Babylon'
        },
        answer: 'd',
        explanation: 'Mahabharata is an epic from India, Gilgamesh is an epic from Babylon.'
    },
    {
        no: 5,
        topic: 2.6,
        type: 'M',
        question: 'USA : Washington D.C. :: Philippines : ______',
        choices: {
            a: 'Quezon City',
            b: 'San Juan',
            c: 'Manila',
            d: 'Cebu'
        },
        answer: 'c',
        explanation: 'Washington D.C. is the capital of the USA, Manila is the capital of the Philippines.'
    },
    {
        no: 25,
        topic: 2.6,
        type: 'M',
        question: 'Nose : Nasal :: Abdomen : ______',
        choices: {
            a: 'Abnormal',
            b: 'Abdominal',
            c: 'Abominate',
            d: 'Adenoma'
        },
        answer: 'b',
        explanation: 'Nose relates to nasal, abdomen relates to abdominal.'
    },
    {
        no: 12,
        topic: 2.6,
        type: 'M',
        question: 'Sistine Madonna : Raphael :: Last Supper : _____',
        choices: {
            a: 'Michaelangelo',
            b: 'Leonardo da Vinci',
            c: 'Rembrandt',
            d: 'Van Gogh'
        },
        answer: 'b',
        explanation: 'Sistine Madonna was painted by Raphael, Last Supper was painted by Leonardo da Vinci.'
    },
    {
        no: 14,
        topic: 2.6,
        type: 'M',
        question: 'Catholic : Prist :: Moslem : _____',
        choices: {
            a: 'Rajah',
            b: 'Hajji',
            c: 'Koran',
            d: 'Imam'
        },
        answer: 'd',
        explanation: 'A Catholic religious leader is a Priest, a Moslem religious leader is an Imam.'
    },
    {
        no: 6,
        topic: 2.6,
        type: 'M',
        question: 'Presidential : President :: Parliamentary : _____',
        choices: {
            a: 'Prime Minister',
            b: 'King',
            c: 'House Speaker',
            d: 'Cardinal'
        },
        answer: 'a',
        explanation: 'A presidential government is led by a President, a parliamentary government is led by a Prime Minister.'
    },
    {
        no: 2,
        topic: 2.6,
        type: 'M',
        question: 'Confucius : China ::: Mahatma Gandhi : _____',
        choices: {
            a: 'India',
            b: 'Japan',
            c: 'Africa',
            d: 'Philippines'
        },
        answer: 'a',
        explanation: 'Confucius is from China, Mahatma Gandhi is from India.'
    },
    {
        no: 16,
        topic: 2.6,
        type: 'M',
        question: 'Samuel Morse : Telegraph :: Alexander Graham Bell : _____',
        choices: {
            a: 'Telescope',
            b: 'Telephone',
            c: 'Teleportation',
            d: 'Door Bell'
        },
        answer: 'b',
        explanation: 'Samuel Morse invented the telegraph, Alexander Graham Bell invented the telephone.'
    },
    {
        no: 8,
        topic: 2.6,
        type: 'M',
        question: 'Pyramid : Egypt :: Taj Majal : _____.',
        choices: {
            a: 'China',
            b: 'Japan',
            c: 'India',
            d: 'Malaysia'
        },
        answer: 'c',
        explanation: 'The Pyramid is in Egypt, the Taj Mahal is in India.'
    },
    {
        no: 22,
        topic: 2.6,
        type: 'M',
        question: 'Entourage : Attendants :: Cortege : _____',
        choices: {
            a: 'Procession for a saint',
            b: 'Procession in court',
            c: 'Funeral Procession',
            d: 'Floral Procession'
        },
        answer: 'c',
        explanation: 'An entourage is a group of attendants, a cortege is a funeral procession.'
    },
    {
        no: 23,
        topic: 2.6,
        type: 'M',
        question: 'Islet : Small Island : Rivulet : _____',
        choices: {
            a: 'Small River',
            b: 'Small Land',
            c: 'Small Review',
            d: 'Small rebel'
        },
        answer: 'a',
        explanation: 'An islet is a small island, a rivulet is a small river.'
    },
    {
        no: 9,
        topic: 2.6,
        type: 'M',
        question: 'Tigris-Euphrates : Mesopotamia :: Nile River : _____.',
        choices: {
            a: 'Egypt',
            b: 'Greece',
            c: 'Italy',
            d: 'Spain'
        },
        answer: 'a',
        explanation: 'Tigris-Euphrates rivers are in Mesopotamia, Nile River is in Egypt.'
    },
    {
        no: 4,
        topic: 2.6,
        type: 'M',
        question: 'Barangay : Captain :: Provincial Government : _____',
        choices: {
            a: 'Congressman',
            b: 'Mayor',
            c: 'Senator',
            d: 'Governor'
        },
        answer: 'd',
        explanation: 'A Barangay is led by a Captain, a Provincial Government is led by a Governor.'
    },
    {
        no: 11,
        topic: 2.6,
        type: 'M',
        question: 'Italy : Latin :: Greece : ____.',
        choices: {
            a: 'Gracian',
            b: 'French',
            c: 'Greek',
            d: 'Greece'
        },
        answer: 'c',
        explanation: 'Latin is the language of Italy, Greek is the language of Greece.'
    },
    {
        no: 18,
        topic: 2.6,
        type: 'M',
        question: 'Earth is the center : Ptolemy :: Sun is the center : ____.',
        choices: {
            a: 'Albert Einstein',
            b: 'Aristotle',
            c: 'Galileo',
            d: 'Copernicus'
        },
        answer: 'd',
        explanation: 'Ptolemy proposed the geocentric model (Earth-centered), Copernicus proposed the heliocentric model (Sun-centered).'
    },
    {
        no: 15,
        topic: 2.6,
        type: 'M',
        question: 'Gionnani Boccacio : Decameron :: Niccolo Machiavelli : _____.',
        choices: {
            a: 'The Little Prince',
            b: 'Utopia',
            c: 'The Prince',
            d: 'Wealth of Nations'
        },
        answer: 'c',
        explanation: 'Giovanni Boccaccio wrote Decameron, Niccolo Machiavelli wrote The Prince.'
    },
    {
        no: 20,
        topic: 2.6,
        type: 'M',
        question: 'Henry Cavendish : Hydrogen :: Henry Priestly : _______.',
        choices: {
            a: 'Carbonic Acid.',
            b: 'Oxygen.',
            c: 'Radium.',
            d: 'Potassium.'
        },
        answer: 'b',
        explanation: 'Henry Cavendish discovered hydrogen, Joseph Priestley discovered oxygen.'
    }
];

// PHILIPPINE CONSTITUTION (4.1)
const philippine_constitution = [
    {
        no : "OTH-2", 
        topic: 4.1,
        type : 'M',
        question : 'The following are members of the Constitutional Commission Except:',
        choices : {
            a : 'Commission on Elections',
            b : 'Commission on Civil Rights',
            c : 'Commission on Audit',
            d : 'Civil Service Commission',
        },
        answer : 'b',
        explanation: 'The Constitutional Commissions are the Commission on Elections, Commission on Audit, and Civil Service Commission. There is no Commission on Civil Rights in the Philippine Constitution.',
    },  
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'It is the power of the State to take properties for the purpose of public use upon payment of just compensation.',
        choices : {
            a : 'Power to Impeach',
            b : 'Power of Taxation',
            c : 'Power of Eminent Domain',
            d : 'Police Power',
        },
        answer : 'c',
        explanation: 'The Power of Eminent Domain allows the government to take private property for public use, provided that just compensation is given to the owner.',
    },  
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The "Rule of the Majority" is an unwritten law of a democratic government. For the Congress to declare the existence of a state of war or to call a constitutional convention ______ vote of all its respected members is required',
        choices : {
            a : 'Two-thirds minority',
            b : 'Concurring',
            c : 'Simple Majority',
            d : 'Two-thirds majority',
        },
        answer : 'd',
        explanation: 'A two-thirds majority vote of all members of Congress is required to declare the existence of a state of war or to call a constitutional convention, as provided in the Philippine Constitution.',
    },    
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The Supreme Court is composed of a Chief Justice and how many Associate Justices?',
        choices : {
            a : '12',
            b : '13',
            c : '14',
            d : '15',
        },
        answer : 'c',
        explanation: 'The Supreme Court of the Philippines is composed of a Chief Justice and 14 Associate Justices, making a total of 15 justices.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The Commander-in-Chief of all armed forces of the Philippines is the:',
        choices : {
            a : 'Air Force Commander',
            b : 'The President of the Philippines', 
            c : 'Chief Justice',
            d : 'AFP Chief Lieutenant General',
        },
        answer : 'b',
        explanation: 'The Commander-in-Chief of all armed forces of the Philippines is the President of the Philippines, as stated in the Constitution.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The Senate shall be composed of how many Senators?',
        choices : {
            a : '21',
            b : '22',
            c : '23',
            d : '24',
        },
        answer : 'd',
        explanation: 'The Senate of the Philippines is composed of 24 Senators, as provided in the Constitution.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'How long shall the term of office of the senators be commended?',
        choices : {
            a : '3 years',
            b : '4 years',
            c : '5 years',
            d : '6 years',
        },
        answer : 'd',
        explanation: 'The term of office for senators in the Philippines is six years, as stated in the Constitution.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The term of office of the President and Vice President of the Phillines shall be up to how many years?',
        choices : {
            a : '4 years',
            b : '5 years',
            c : '6 years',
            d : '7 years',
        },
        answer : 'c',
        explanation: 'The term of office for both the President and Vice President of the Philippines is six years, as provided in the Constitution.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The members of the House of Representatives are elected for a term of how many years?',
        choices : {
            a : '3 years',
            b : '4 years',
            c : '5 years',
            d : '6 years',
        },
        answer : 'a',
        explanation: 'Members of the House of Representatives in the Philippines are elected for a term of three years, as stated in the Constitution.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The Congress, by a vote of ____ of both Houses in joint session assembled, voting separately, shall have the sole power to declare the existence of a state of war.',
        choices : {
            a : 'Two-thirds',
            b : 'Three-fourths',
            c : 'Simple Majority',
            d : 'Unanimous',
        },
        answer : 'a',
        explanation: 'The Congress of the Philippines, by a vote of two-thirds of both Houses in joint session assembled, voting separately, has the sole power to declare the existence of a state of war.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'It is the right and obligation of all citizens, who are at least 18 years of age and qualified by law, to vote in the election of the President, Vice President, Senators, Members of the House of Representatives, and other local officials.',
        choices : {
            a : 'Right to Suffrage',
            b : 'Right to Vote',
            c : 'Right to Elect',
            d : 'Right to Choose',
        },
        answer : 'a',
        explanation: 'The right and obligation of all citizens who are at least 18 years of age and qualified by law to vote in elections is known as the Right to Suffrage, as provided in the Philippine Constitution.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'The three inherent powers of the state are the following except:',
        choices : {
            a : 'Police Power',
            b : 'Power of Eminent Domain',
            c : 'Power of Taxation',
            d : 'Power to Impeach',
        },
        answer : 'd',
        explanation: 'The three inherent powers of the state are Police Power, Power of Eminent Domain, and Power of Taxation. The Power to Impeach is not considered one of the inherent powers of the state.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'It is the power of the State to promote the public welfare by restraining and regulating the use of liberty and property.',
        choices : {
            a : 'Power of Taxation',
            b : 'Police Power',
            c : 'Power of Eminent Domain',
            d : 'Power to Impeach',
        },
        answer : 'b',
        explanation: 'Police Power is the power of the State to promote public welfare by restraining and regulating the use of liberty and property. It is an inherent power of the state.',
    }, 
    {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'It is the power of the State to take private property for public use upon payment of just compensation.',
        choices : {
            a : 'Power of Taxation',
            b : 'Police Power',
            c : 'Power of Eminent Domain',
            d : 'Power to Impeach',
        },
        answer : 'c',
        explanation: 'The Power of Eminent Domain allows the State to take private property for public use, provided that just compensation is paid to the owner. This is one of the inherent powers of the state.',
    }, 
        {
        no : "OTH-", 
        topic: 4.1,
        type : 'M',
        question : 'It is the power of the State to impose charges or burdens on persons and properties, and property rights for the purpose of raising revenues to protect the people and extend public projects and services.',
        choices : {
            a : 'Power of Taxation',
            b : 'Police Power',
            c : 'Power of Eminent Domain',
            d : 'Power to Impeach',
        },
        answer : 'a',
        explanation: 'Power of Taxation is the power of the State to impose charges or burdens on persons and properties for the purpose of raising revenues to protect the people and extend public projects and services. It is one of the inherent powers of the state.',
    }, 
];

// R.A. 6713 (4.2)
const ra6713 = [
    {
        no : "OTH-3", 
        topic: 4.2,
        type : 'M',
        question : 'According to R.A. 6713, what is the primary principle behind public office?',
        choices : {
            a : 'Public office is a privilege',
            b : 'Public office is a source of additional income',
            c : 'Public office is a right',
            d : 'Public office is a public trust',
        },
        answer : 'd',
        explanation: 'R.A. 6713, also known as the Code of Conduct and Ethical Standards for Public Officials and Employees, states that public office is a public trust.',
    }, 
];

// PEACE AND HUMAN RIGHTS ISSUES AND CONCEPTS (4.3)
const peace_and_human_rights = [
    {
        no : "OTH-", 
        topic: 4.3,
        type : 'M',
        question : 'The practice of labeling individuals or groups (including human rights defenders) as communists or terrorists without substantial evidence is known as:',
        choices : {
            a : 'Green-tagging',
            b : 'Red-tagging',
            c : 'Blue-tagging',
            d : 'Yellow-tagging',
        },
        answer : 'b',
        explanation: 'Red-tagging is the act of labeling individuals or organizations as communists or terrorists without substantial evidence, often endangering their safety and violating their rights.',
    },
];

// ENVIRONMENT MANAGEMENT AND PROTECTION (4.4)
const environemnt_management = [
    {
        no : "OTH-4", 
        topic: 4.4,
        type : 'M',
        question : 'Which of the following is a renewable source of energy?',
        choices : {
            a : 'Geothermal Energy',
            b : 'Solar Energy',
            c : 'Wind Energy',
            d : 'All of the Above',
        },
        answer : 'd',
        explanation: 'Geothermal, solar, and wind energy are all renewable sources of energy, making option D the correct answer.',
    },  
    {
        no : "OTH-", 
        topic: 4.4,
        type : 'M',
        question : 'PAGASA is the official government agency for weather forecasting, flood control, astronomical observations, and time service. PAGASA stands for _______?',
        choices : {
            a : 'Philippine Atmospheric Geophysical and Astronomical Service Association',
            b : 'Philippine Atmospheric Geophysical and Astronomical Services Administration',
            c : 'Philippine Atmospheric Geographical and Astronomical Services Administration',
            d : 'Philippine Atmospheric Geological and Astronomical Service Association.',
        },
        answer : 'b',
        explanation: 'PAGASA stands for Philippine Atmospheric Geophysical and Astronomical Services Administration, the official government agency for weather and related services.',
    },  
];

// GENERAL (Not directly related to the four subtopics)
const general = [
    {
        no : "OTH-", 
        topic: 4,
        type : 'M',
        question : 'In literature, after the climax comes denouement which is what?',
        choices : {
            a : 'The rising emotions',
            b : 'An intermission',
            c : 'The final part of the play',
            d : 'The opening scene',
        },
        answer : 'c',
        explanation: 'The denouement is the final part of a play, movie, or narrative in which the strands of the plot are drawn together and matters are explained or resolved.',
    },  
    
];

questions.push(
    ...synonyms,
    ...singleWordAnalogyQuestions,
    ...philippine_constitution, 
    ...ra6713, 
    ...peace_and_human_rights, 
    ...environemnt_management, 
    ...general);

  const topicName = 'CIVIL SERVICE EXAM REVIEWER 2025';

const fileName = window.location.pathname.split("/").pop();
if (fileName === 'quiz.html') {
    const script = document.createElement('script');
    script.src = '../asset/js/newPracticeQuiz.js';
    document.head.appendChild(script);
} else if (fileName == 'exam.html') {
    const script = document.createElement('script');
    script.src = '../asset/js/quiz.js';
    document.head.appendChild(script);
} else {
    const script = document.createElement('script');
    script.src = '../asset/js/practiceQuiz.js';
    document.head.appendChild(script);
}


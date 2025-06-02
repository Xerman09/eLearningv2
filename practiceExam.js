import {containerContent} from './asset/js/functions.js';

const practiceExamArray = [
  {
    link: "./practiceExam/exam.html?exam=cse_question&topic=0",
    subjectTitle: "Civil Service Exam",
  },
  {
    link: ".practiceExam/exam.html?exam=ccna_200_301&topic=0",
    subjectTitle: "CCNA 200 - 301",
  },
];

function renderPracticeExams(arr, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = arr.map(item => `
    <a href="${item.link}" class="flex items-center gap-4 p-4 rounded-lg bg-white/80 shadow transition hover:scale-105 hover:bg-amber-100/40 cursor-pointer border border-amber-200">
      <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shadow">
        <i class="ri-file-text-line text-amber-600 text-xl"></i>
      </div>
      <div class="flex-1">
        <h3 class="text-base font-semibold text-gray-800">${item.subjectTitle}</h3>
      </div>
      <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100/40 text-amber-700">
        <i class="ri-arrow-right-line"></i>
      </span>
    </a>
  `).join('');
}

renderPracticeExams(practiceExamArray, 'render-practice-exam');


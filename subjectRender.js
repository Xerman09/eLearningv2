import { subjectList } from './asset/js/subjectHomeInfo.js';

const contentArray = [
  {
    link: "./subject/index.html?subject=differentialEquation",
    subjectTitle: "Differential Equation",
    // lectures will be set dynamically
    // color and iconColor will use default if not set
  },
  {
    link: "./subject/index.html?subject=csereviewer",
    subjectTitle: "Civil Service Exam Reviewer 2025",
    // lectures will be set dynamically
    // color and iconColor will use default if not set
  },
];

// Helper to get subject code from link
function getSubjectCodeFromLink(link) {
  const match = link.match(/subject=([^&]+)/);
  return match ? match[1] : null;
}

// Get number of lectures from subjectList
function getLectureCountByCode(code) {
  const subject = subjectList.find(s => s.code === code);
  return subject && Array.isArray(subject.listOfLecture) ? subject.listOfLecture.length : 0;
}

function renderSubjects(arr, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = arr.map(subject => {
    const color = subject.color || "blue-100";
    const iconColor = subject.iconColor || "blue-600";
    const code = getSubjectCodeFromLink(subject.link);
    const lectures = getLectureCountByCode(code);
    return `
      <a href="${subject.link}" class="flex items-center gap-4 p-4 rounded-lg bg-white/80 shadow transition hover:scale-105 hover:bg-primary/10 cursor-pointer border border-primary/10">
        <div class="w-12 h-12 rounded-full bg-${color} flex items-center justify-center shadow">
          <i class="ri-book-2-line text-${iconColor} text-xl"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800">${subject.subjectTitle}</h3>
          <span class="text-xs text-gray-500 mt-1 block">Lectures: ${lectures}</span>
        </div>
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
          <i class="ri-arrow-right-line"></i>
        </span>
      </a>
    `;
  }).join('');
}

renderSubjects(contentArray, 'render-subjects');



import {containerContent} from './asset/js/functions.js';
import { subjectList } from './asset/js/subjectHomeInfo.js';

const solutionManualArray = [
    {
      link: "./solutionManual/index.html?subject=de_rain_ville",
      subject: "de_rain_ville",
      subjectTitle: "Differential Equation by Rainville",
      author: "Earl D. Rainville"
    },
    {
      link: "./solutionManual/index.html?subject=iot",
      subject: "iot",
      subjectTitle: "Introduction to IoT",
      author: "Baharudin Bin Wan Satar"
    },
    ];

// Helper to get subject code from link
function getSubjectCodeFromLink(link) {
  const match = link.match(/subject=([^&]+)/);
  return match ? match[1] : null;
}

// Get number of chapters/lectures from subjectList
function getLectureCountByCode(code) {
  const subject = subjectList.find(s => s.code === code);
  return subject && Array.isArray(subject.listOfLecture) ? subject.listOfLecture.length : 0;
}

function renderSolutionManuals(arr, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = arr.map(item => {
    return `
      <a href="${item.link}" class="flex items-center gap-4 p-4 rounded-lg bg-white/80 shadow transition hover:scale-105 hover:bg-green-100/40 cursor-pointer border border-green-200">
        <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shadow">
          <i class="ri-file-list-3-line text-green-600 text-xl"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800">${item.subjectTitle}</h3>
          <span class="text-xs text-green-700 mt-1 block">Author: ${item.author || 'Unknown'}</span>
        </div>
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100/40 text-green-700">
          <i class="ri-arrow-right-line"></i>
        </span>
      </a>
    `;
  }).join('');
}

renderSolutionManuals(solutionManualArray, 'render-sol-manual');


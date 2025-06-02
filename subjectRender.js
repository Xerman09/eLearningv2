import { containerContent } from './asset/js/functions.js';

const contentArray = [
  {
    link: "./library/index.html?subject=differentialEquation",
    subjectTitle: "Differential Equation",
  },
  {
    link: "./library/index.html?subject=csereviewer",
    subjectTitle: "Civil Service Exam Reviewer 2025",
  },
];

containerContent(contentArray, 'render-subjects');



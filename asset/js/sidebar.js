export function renderSidebar() {
  const pathname = window.location.pathname.toLowerCase();
  const pathParts = window.location.pathname.split('/');
  const currentFile = pathParts[pathParts.length - 1].split('?')[0].toLowerCase();
  const isInSubfolder = pathname.split('/').length > 2;
  const linkPrefix = isInSubfolder ? '../' : '';

  function isActive(fileNames) {
    return fileNames.includes(currentFile) ? 'text-primary bg-indigo-50' : 'text-gray-700 hover:bg-gray-100';
  }

  const sidebar = `
    <aside id="sidebar"
      class="sidebar sidebar-expanded bg-white shadow-sm h-[calc(100vh-4rem)] fixed top-16 left-0 overflow-y-auto z-20">
      <div class="py-4">
        <ul>
          <li class="mb-1">
            <a href="${linkPrefix}index.html" class="flex items-center px-4 py-3 rounded-r-lg ${isActive(['index.html', 'index.html', ''])}">
              <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-dashboard-line"></i>
              </div>
              <span class="ml-3 sidebar-text">Dashboard</span>
            </a>
          </li>
          <li class="mb-1">
            <a href="${linkPrefix}subject.html" class="flex items-center px-4 py-3 rounded-r-lg ${isActive(['subject.html'])}">
              <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-book-open-line"></i>
              </div>
              <span class="ml-3 sidebar-text">Subjects</span>
            </a>
          </li>
          <li class="mb-1">
            <a href="${linkPrefix}solutionManual.html" class="flex items-center px-4 py-3 rounded-r-lg ${isActive(['solutionmanual.html'])}">
              <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-file-list-3-line"></i>
              </div>
              <span class="ml-3 sidebar-text">Solution Manual</span>
            </a>
          </li>
          <li class="mb-1">
            <a href="${linkPrefix}practiceExam.html" class="flex items-center px-4 py-3 rounded-r-lg ${isActive(['practiceexam.html'])}">
              <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-file-text-line"></i>
              </div>
              <span class="ml-3 sidebar-text">Practice Exam</span>
            </a>
          </li>
        </ul>
        <div class="border-t border-gray-200 my-4"></div>
        <ul>
          <li>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-r-lg">
              <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-question-line"></i>
              </div>
              <span class="ml-3 sidebar-text">Help & Support</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `;
  document.body.insertAdjacentHTML('beforeend', sidebar);
}
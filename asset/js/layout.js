export function renderLayout() {
  const pathname = window.location.pathname.toLowerCase();
  const logoPath = pathname.split('/').length > 2 ? '../images/logo.jpeg' : './images/logo.jpeg';

  const pathParts = window.location.pathname.split('/');
  const currentFile = pathParts[pathParts.length - 1].split('?')[0].toLowerCase();

  // Helper to check if a sidebar link should be active
  function isActive(fileNames) {
    return fileNames.includes(currentFile) ? 'text-primary bg-indigo-50' : 'text-gray-700 hover:bg-gray-100';
  }

  // Determine prefix for links if in a subfolder (any subdirectory)
  const isInSubfolder = pathname.split('/').length > 2;
  const linkPrefix = isInSubfolder ? '../' : '';

  // Top Navigation Bar
  const nav = `
    <nav class="bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
      <div class="flex items-center justify-between px-4 h-16">
        <div class="flex items-center">
          <button id="sidebar-toggle"
            class="p-2 mr-2 rounded-button hover:bg-gray-100 flex items-center justify-center">
            <i class="ri-menu-line text-gray-700 ri-lg"></i>
          </button>
          <a href="#" class="font-['Pacifico'] text-primary text-2xl logo">
            <img src="${logoPath}" alt="Logo" class="w-10 h-10 rounded-full object-cover shadow" /> eLearning
          </a>
        </div>
        <div class="flex items-center">
          <a href="${linkPrefix}index.html" class="text-gray-700 text-sm mr-4">Home</a>
          <span class="text-gray-500 text-sm">v1.0.0</span>
        </div>
      </div>
    </nav>
  `;

  // Sidebar
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

  // Insert into DOM
  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', sidebar);
}
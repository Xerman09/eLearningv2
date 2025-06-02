export function renderNav() {
  const pathname = window.location.pathname.toLowerCase();
  const logoPath = pathname.split('/').length > 2 ? '../images/logo.jpeg' : './images/logo.jpeg';
  const isInSubfolder = pathname.split('/').length > 2;
  const linkPrefix = isInSubfolder ? '../' : '';

  const nav = `
    <nav class="bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
      <div class="flex items-center justify-between px-4 h-16">
        <div class="flex items-center">
          <!-- Sidebar toggle only visible on mobile -->
          <button id="sidebar-toggle"
            class="p-2 mr-2 rounded-button hover:bg-gray-100 flex items-center justify-center md:hidden"
            aria-label="Show sidebar">
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
  document.body.insertAdjacentHTML('afterbegin', nav);
}
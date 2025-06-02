const sidebarContainer = document.getElementById('sidebar-container');
const currentPage = location.pathname.split("/").pop(); // Get current page like 'index.html'

// Sidebar links as an array of objects for easy comparison
const sidebarLinks = [
  { href: "./index.html", label: "Home", icon: '<img src="" class="notepadIcon">' },
  { href: "./subject.html", label: "Subjects", icon: '<img src="" class="notepadIcon">' },
  { href: "./solution_manual.html", label: "Solution Manual", icon: '<img src="" class="notepadIcon">' },
  { href: "./practice_exam.html", label: "Practice Exam", icon: '<img src="" class="notepadIcon">' },
  { href: "./updates.html", label: "Updates", icon: '<i class="fa fa-bell fa-fw"></i>' }
];

// Start with the close button
let sidebarHTML = `
  <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu">
    <i class="fa fa-remove fa-fw"></i>  Close Menu
  </a>
`;

// Loop to generate each link with conditional `w3-blue` class
sidebarLinks.forEach(link => {
  const pageName = link.href.split("/").pop();
  const isActive = pageName === currentPage ? "w3-blue" : "";
  sidebarHTML += `
    <a href="${link.href}" class="w3-bar-item w3-button w3-padding ${isActive}">
      ${link.icon}  ${link.label}
    </a>
  `;
});

sidebarHTML += `<link href='https://unpkg.com/boxicons@2.1.4/dist/boxicons.js' rel='stylesheet'>`;

sidebarContainer.innerHTML = sidebarHTML;

// Function to create navigation links dynamically
function buildNavigation() {
    const sections = document.querySelectorAll('section');
    const navList = document.getElementById('nav-list');
    sections.forEach((section, index) => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.href = `#section-${index + 1}`;
        navLink.textContent = `Story ${index + 1}`;
        navLink.setAttribute('data-id', `section-${index + 1}`);
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    });
}

// Function to highlight active section in the viewport
function makeActive() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;  // Middle of the viewport

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // If the section is in the viewport (middle of the viewport)
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            section.classList.add('active');  // Add 'active' class to the section
        } else {
            section.classList.remove('active');  // Remove 'active' class from the section
        }
    });

    // Highlight the corresponding navigation link when the section is in the viewport
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        const targetSection = document.getElementById(link.getAttribute('href').slice(1));
        if (targetSection.classList.contains('active')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Scroll to section (smooth scroll behavior)
function smoothScroll(event) {
    event.preventDefault(); // Prevent the default behavior (jumping to the anchor)
    const targetId = event.target.getAttribute('href').slice(1); // Get section ID from href attribute
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Show/Hide Scroll to Top Button
function toggleScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Toggle the navbar menu on mobile
function toggleNavbarMenu() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    // Add event listener to toggle button
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('mobile');  // Toggle 'mobile' class to show/hide menu
    });
}

// Event Listeners (Combining everything in one DOMContentLoaded listener)
document.addEventListener('DOMContentLoaded', () => {
    buildNavigation();  // Dynamically build navigation

    // Smooth scrolling for navbar links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', smoothScroll);  // Smooth scrolling
    });

    // Scroll-related functions
    window.addEventListener('scroll', () => {
        makeActive();  // Make active section in viewport
        toggleScrollToTopButton();  // Toggle scroll-to-top button visibility
    });

    // Scroll to top button functionality
    document.getElementById('scroll-to-top-btn').addEventListener('click', scrollToTop);

    // Toggle navbar on mobile
    toggleNavbarMenu();  // Call navbar toggle function
});

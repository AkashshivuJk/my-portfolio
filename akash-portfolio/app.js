// Get data from embedded JSON
let portfolioData = {};

const skillColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444',
    '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1',
    '#14B8A6', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981',
    '#3B82F6', '#F97316', '#84CC16', '#EC4899', '#6366F1'
];
// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    // Load data from JSON script tag
    const dataScript = document.getElementById('data-json');
    if (dataScript) {
        portfolioData = JSON.parse(dataScript.textContent);
    }

    // Initialize all functionality
    initializeNavigation();
    populateAboutSection();
    populateProjects();
    populateDiary();
    setupContactForm();
    setupExpandableSections();
});

// Navigation functionality
function initializeNavigation() {
    const heroCards = document.querySelectorAll('.hero-card');

    heroCards.forEach(card => {
        card.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            scrollToSection(target);
        });

        // Add keyboard support
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                scrollToSection(target);
            }
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Populate About Section
function populateAboutSection() {
    // Set summary
    const summaryElement = document.getElementById('about-summary');
    if (summaryElement && portfolioData.summary) {
        summaryElement.textContent = portfolioData.summary;
    }

    // Populate skills
    populateSkills();

    // Populate education
    populateEducation();

    // Populate work experience
    populateWorkExperience();

    // Populate certifications
    populateCertifications();

    // Populate achievements
    populateAchievements();
}

// Populate skills section
function populateSkills() {
    const skillsContainer = document.getElementById('skills');
    if (!skillsContainer || !portfolioData.skills) return;

    let skillsHTML = '';
    let colorIndex = 0;

    Object.entries(portfolioData.skills).forEach(([category, skills]) => {
        skillsHTML += `
            <div class="skill-category">
                <h4>${category}</h4>
                <div class="skill-list">
                    ${skills.map(skill => {
                        const color = skillColors[colorIndex % skillColors.length];
                        colorIndex++;
                        return `<span class="skill-tag" style="background-color: ${color}">${skill}</span>`;
                    }).join('')}
                </div>
            </div>
        `;
    });

    skillsContainer.innerHTML = skillsHTML;
}

// Populate education section
function populateEducation() {
    const educationContainer = document.getElementById('education');
    if (!educationContainer || !portfolioData.education) return;

    let educationHTML = '';

    portfolioData.education.forEach(edu => {
        educationHTML += `
            <div class="education-item">
                <h4>${edu.degree}</h4>
                <div class="institution">${edu.institution}</div>
                <div class="duration">${edu.duration}</div>
                ${edu.cgpa ? `<div class="cgpa">CGPA: ${edu.cgpa}</div>` : ''}
            </div>
        `;
    });

    educationContainer.innerHTML = educationHTML;
}

// Populate work experience section
function populateWorkExperience() {
    const workContainer = document.getElementById('work-experience');
    if (!workContainer || !portfolioData.work_experience) return;

    let workHTML = '';

    portfolioData.work_experience.forEach(work => {
        workHTML += `
            <div class="work-item">
                <h4>${work.role}</h4>
                <div class="company">${work.company}</div>
                <div class="duration">${work.duration}</div>
                ${work.location ? `<div class="location">${work.location}</div>` : ''}
                ${work.points ? `
                    <ul class="work-points">
                        ${work.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    });

    workContainer.innerHTML = workHTML;
}

// Populate certifications section
function populateCertifications() {
    const certificationsContainer = document.getElementById('certifications');
    if (!certificationsContainer || !portfolioData.certifications) return;

    let certificationsHTML = '<ul class="cert-list">';

    portfolioData.certifications.forEach(cert => {
        certificationsHTML += `<li>${cert}</li>`;
    });

    certificationsHTML += '</ul>';
    certificationsContainer.innerHTML = certificationsHTML;
}

// Populate achievements section
function populateAchievements() {
    const achievementsContainer = document.getElementById('achievements');
    if (!achievementsContainer || !portfolioData.achievements) return;

    let achievementsHTML = '<ul class="achievement-list">';

    portfolioData.achievements.forEach(achievement => {
        achievementsHTML += `<li>${achievement}</li>`;
    });

    achievementsHTML += '</ul>';
    achievementsContainer.innerHTML = achievementsHTML;
}

// Setup expandable sections
function setupExpandableSections() {
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            const content = document.getElementById(target);
            const icon = this.querySelector('.expand-icon');

            if (content) {
                // Toggle active class
                this.classList.toggle('active');
                content.classList.toggle('active');

                // Update icon
                if (content.classList.contains('active')) {
                    icon.textContent = '▲';
                } else {
                    icon.textContent = '▼';
                }
            }
        });
    });
}

// Populate projects section
function populateProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid || !portfolioData.projects) return;

    let projectsHTML = '';

    portfolioData.projects.forEach(project => {
        const techBadges = project.tech.map(tech =>
            `<span class="tech-badge">${tech}</span>`
        ).join('');

        projectsHTML += `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techBadges}
                </div>
                <div class="project-links">
                    ${project.github && project.github !== '#' ?
                `<a href="${project.github}" target="_blank" class="project-link primary">
                            <span>GitHub</span>
                        </a>` :
                `<span class="project-link primary disabled">GitHub</span>`
            }
                    ${project.demo && project.demo !== '#' ?
                `<a href="${project.demo}" target="_blank" class="project-link secondary">
                            <span>Demo</span>
                        </a>` :
                `<span class="project-link secondary disabled">Demo</span>`
            }
                </div>
            </div>
        `;
    });

    projectsGrid.innerHTML = projectsHTML;
}

// Populate diary section
function populateDiary() {
    const diaryList = document.getElementById('diary-list');
    if (!diaryList || !portfolioData.diary) return;

    let diaryHTML = '';

    portfolioData.diary.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        diaryHTML += `
            <div class="diary-item">
                <h3>${entry.title}</h3>
                <div class="diary-date">${date}</div>
                <p class="diary-excerpt">${entry.excerpt}</p>
                <a href="${entry.url}" target="_blank" class="diary-link">Read More →</a>
            </div>
        `;
    });

    diaryList.innerHTML = diaryHTML;
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Log the form data (as per requirements)
        console.log('Contact form submission:', {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        });

        // Show success message
        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);

        // Reset form
        this.reset();
    });
}

// Add smooth scrolling for any anchor links
document.addEventListener('click', function (e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    // Wait a bit for content to be populated
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('.hero-card, .project-card, .diary-item, .expandable-section');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }, 100);
});

// Handle keyboard navigation
document.addEventListener('keydown', function (e) {
    // ESC key to close any open expandable sections
    if (e.key === 'Escape') {
        const activeButtons = document.querySelectorAll('.expand-btn.active');
        activeButtons.forEach(button => {
            button.click();
        });
    }
});

// Handle window resize
window.addEventListener('resize', function () {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function () {
        // Any resize-specific logic can go here
        console.log('Window resized');
    }, 250);
});

// Add loading state management
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Trigger initial animations
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        }, 100);
    });
});

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based navbar behavior if needed
const handleScroll = debounce(() => {
    const scrollTop = window.pageYOffset;
    // Add any scroll-based functionality here
}, 10);

window.addEventListener('scroll', handleScroll);

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function (e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
        // Swipe functionality can be added here if needed
        console.log(diff > 0 ? 'Swiped up' : 'Swiped down');
    }
}

// Error handling for missing data
function handleMissingData(section, data) {
    if (!data) {
        console.warn(`Missing data for section: ${section}`);
        return false;
    }
    return true;
}

// Initialize theme support (using design system)
function initializeTheme() {
    // The design system handles theme switching automatically
    // This function is here for any additional theme-related logic
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    prefersDark.addEventListener('change', (e) => {
        console.log('Theme preference changed to:', e.matches ? 'dark' : 'light');
    });
}

// Call theme initialization
initializeTheme();

// Export functions for potential external use
window.portfolioApp = {
    scrollToSection,
    populateAboutSection,
    populateProjects,
    populateDiary,
    formatDate,
    debounce
};
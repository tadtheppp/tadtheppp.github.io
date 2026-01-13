// ============================================
// Resume Website - Minimal JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    initSmoothScroll();

    // Add active state to navigation on scroll
    initActiveNavHighlight();

    // Add subtle entrance animations
    initEntranceAnimations();
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight active navigation item based on scroll position
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle the scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                highlightNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Add entrance animations for elements
 */
function initEntranceAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .education-item');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

/**
 * Add CSS for active nav state
 */
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--color-accent);
    }

    .nav-links a.active::after {
        width: 100%;
    }

    .skill-category,
    .project-card,
    .education-item {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease-out forwards;
    }

    .skill-category:nth-child(1) { animation-delay: 0.1s; }
    .skill-category:nth-child(2) { animation-delay: 0.2s; }
    .skill-category:nth-child(3) { animation-delay: 0.3s; }

    .project-card:nth-child(1) { animation-delay: 0.1s; }
    .project-card:nth-child(2) { animation-delay: 0.2s; }
    .project-card:nth-child(3) { animation-delay: 0.3s; }
    .project-card:nth-child(4) { animation-delay: 0.4s; }

    .education-item:nth-child(1) { animation-delay: 0.1s; }
    .education-item:nth-child(2) { animation-delay: 0.2s; }

    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c✓ Resume website loaded successfully', 'color: #2563eb; font-size: 14px; font-weight: bold;');
console.log('%cCreated for: Tadthep Ruangphon (Mix)', 'color: #4b5563; font-size: 12px;');

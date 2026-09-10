/**
 * Idiris Abdikadir - Personal Portfolio Interactivity
 * Features: Mobile Menu, Smooth Scroll, Scrollspy, Animated Progress Bars, 
 * Contact Form Toast, Back to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year in Footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // 3. Navbar background style on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(9, 10, 16, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(14, 18, 30, 0.75)';
        }
    });

    // 4. Active Nav Link on Scroll (Scrollspy)
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // 5. Animate Skill Progress Bars with Intersection Observer
    const skillCards = document.querySelectorAll('.skill-card');
    if ('IntersectionObserver' in window) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        skillCards.forEach(card => skillsObserver.observe(card));
    } else {
        // Fallback if IntersectionObserver is not supported
        skillCards.forEach(card => card.classList.add('animated'));
    }

    // 6. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Contact Form Handling with Toast Feedback
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    function showToast(title, message) {
        if (!toast) return;

        const titleEl = toast.querySelector('.toast-title');
        const descEl = toast.querySelector('.toast-desc');
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = message;

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Provide visual feedback
            showToast('Message Sent!', `Thank you ${name}! Idiris will respond to ${email} soon.`);
            contactForm.reset();
        });
    }
});

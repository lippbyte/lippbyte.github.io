/*==================== UTILITY: THROTTLE ====================*/
/* Prevents scroll handlers from firing too often — smooth 60fps */
function throttle(fn, delay) {
    let lastCall = 0;
    let rafId = null;
    return function (...args) {
        const now = performance.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => fn.apply(this, args));
    };
}

/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navOverlay = document.getElementById('nav-overlay');

function openMenu() {
    if (navMenu) navMenu.classList.add('show-menu');
    if (navOverlay) navOverlay.classList.add('show-overlay');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeMenu() {
    if (navMenu) navMenu.classList.remove('show-menu');
    if (navOverlay) navOverlay.classList.remove('show-overlay');
    document.body.style.overflow = '';
}

if (navToggle) {
    navToggle.addEventListener('click', openMenu);
}

if (navClose) {
    navClose.addEventListener('click', closeMenu);
}

// Close menu when clicking overlay
if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    closeMenu();
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = throttle(function () {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}, 100);

window.addEventListener('scroll', scrollActive, { passive: true });

/*==================== CHANGE BACKGROUND HEADER ====================*/
const scrollHeader = throttle(function () {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY >= 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
}, 100);

window.addEventListener('scroll', scrollHeader, { passive: true });

/*==================== SHOW SCROLL UP ====================*/
const scrollUpAction = throttle(function () {
    const scrollUp = document.getElementById('scroll-up');
    if (scrollUp) {
        if (window.scrollY >= 460) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
}, 100);

window.addEventListener('scroll', scrollUpAction, { passive: true });

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'light-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-sun' : 'bx-moon';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
    
    // Update theme-color meta tag
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.content = getCurrentTheme() === 'dark' ? '#1a1435' : '#fafafa';
    }
});

/*==================== FADE IN ANIMATION (Intersection Observer) ====================*/
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

/*==================== AUTO UPDATE FOOTER YEAR ====================*/
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/*==================== SKILLS FILTER ====================*/
const filterBtns = document.querySelectorAll('.skills-filter-btn');
const skillCards = document.querySelectorAll('.skill-card');
const skillsGrid = document.querySelector('.skills-grid');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Smooth staggered animation
        let visibleIndex = 0;

        skillCards.forEach((card) => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hide');
                card.style.position = '';
                card.style.visibility = '';

                // Staggered entrance
                card.style.animationDelay = `${visibleIndex * 0.06}s`;
                card.classList.remove('show');
                // Force reflow to restart animation
                void card.offsetWidth;
                card.classList.add('show');
                visibleIndex++;
            } else {
                card.classList.remove('show');
                card.classList.add('hide');
            }
        });
    });
});

/*==================== TYPEWRITER EFFECT ====================*/
const texts = ["Software Development Learner", "Problem Solver", "AI Enthusiast", "Building Real Solutions"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
let isDeleting = false;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    const typewriterEl = document.querySelector('.typewriter-text');
    if (typewriterEl) {
        typewriterEl.textContent = letter;
    }

    let typeSpeed = 70;

    if (isDeleting) {
        typeSpeed = 35;
    }

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 1500; // Longer pause at end for readability
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.typewriter-text')) {
        setTimeout(type, 600);
    }
});

/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-form-message');
const submitBtn = document.getElementById('contact-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading state
        const btnSpan = submitBtn.querySelector('span');
        const btnIcon = submitBtn.querySelector('i');
        const originalText = btnSpan.textContent;
        btnSpan.textContent = 'Mengirim...';
        btnIcon.className = 'bx bx-loader-alt bx-spin';
        submitBtn.disabled = true;

        // Send form data via Fetch API
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactMessage.textContent = '✅ Pesan berhasil dikirim! Terima kasih.';
                contactMessage.classList.add('success');
                contactMessage.classList.remove('error');
                contactForm.reset();
            } else {
                throw new Error('Gagal mengirim pesan');
            }
        })
        .catch(error => {
            contactMessage.textContent = '❌ Gagal mengirim pesan. Silakan coba lagi.';
            contactMessage.classList.add('error');
            contactMessage.classList.remove('success');
        })
        .finally(() => {
            btnSpan.textContent = originalText;
            btnIcon.className = 'bx bx-send';
            submitBtn.disabled = false;

            setTimeout(() => {
                contactMessage.textContent = '';
                contactMessage.classList.remove('success', 'error');
            }, 5000);
        });
    });
}

/*==================== CLOSE MOBILE NAV ON RESIZE ====================*/
/* Auto-close mobile menu if user resizes to desktop */
window.addEventListener('resize', throttle(function () {
    if (window.innerWidth >= 768) {
        closeMenu();
    }
}, 200));

/*==================== SMOOTH SCROLL TO TOP ====================*/
const scrollUpBtn = document.getElementById('scroll-up');
if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

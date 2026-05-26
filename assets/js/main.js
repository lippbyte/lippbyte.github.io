/* ========================================================================
   MAIN LOGIC FOR PORTFOLIO 2.0 (MUHAMMAD KHALIFA)
   Vanilla JS with premium interactive elements and high-performance logic
   ======================================================================== */

// --- UTILITY: THROTTLE ---
// Prevents scroll events from firing too often, maintaining 60fps smooth scrolling
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

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPOTLIGHT CARD EFFECT (60fps) ---
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 2. MOBILE MENU DRAWER TOGGLE ---
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navOverlay = document.getElementById('nav-overlay');

    function toggleMenu() {
        if (navMenu) {
            navMenu.classList.toggle('translate-x-0');
            navMenu.classList.toggle('translate-x-full');
        }
        if (navOverlay) {
            navOverlay.classList.toggle('opacity-0');
            navOverlay.classList.toggle('pointer-events-none');
        }
        const isOpen = navMenu && navMenu.classList.contains('translate-x-0');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (navMenu) {
            navMenu.classList.add('translate-x-full');
            navMenu.classList.remove('translate-x-0');
        }
        if (navOverlay) {
            navOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
        document.body.style.overflow = '';
    }

    if (navToggle) navToggle.addEventListener('click', toggleMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close mobile drawer on desktop resize
    window.addEventListener('resize', throttle(() => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    }, 200));

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // --- 3. ACTIVE NAVIGATION LINK TRACKING ---
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = throttle(() => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('text-teal-400', 'font-semibold');
                    navLink.classList.remove('text-slate-400');
                } else {
                    navLink.classList.remove('text-teal-400', 'font-semibold');
                    navLink.classList.add('text-slate-400');
                }
            }
        });
    }, 100);

    window.addEventListener('scroll', scrollActive, { passive: true });

    // --- 4. HEADER BACKGROUND BLUR & SCROLL UP BUTTON ---
    const header = document.querySelector('header');
    const scrollUp = document.getElementById('scroll-up');
    
    const scrollHeader = throttle(() => {
        if (header) {
            if (window.scrollY >= 50) {
                header.classList.add('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-900', 'py-4');
                header.classList.remove('bg-transparent', 'py-6');
            } else {
                header.classList.remove('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-900', 'py-4');
                header.classList.add('bg-transparent', 'py-6');
            }
        }
        
        if (scrollUp) {
            if (window.scrollY >= 460) {
                scrollUp.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                scrollUp.classList.add('opacity-100', 'translate-y-0');
            } else {
                scrollUp.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                scrollUp.classList.remove('opacity-100', 'translate-y-0');
            }
        }
    }, 100);

    window.addEventListener('scroll', scrollHeader, { passive: true });

    if (scrollUp) {
        scrollUp.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 5. TYPEWRITER EFFECT ---
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText) {
        const texts = [
            "Software Development Learner",
            "Creative Problem Solver",
            "Gen Z AI Tech Enthusiast",
            "Building Real Solutions"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            if (textIndex === texts.length) {
                textIndex = 0;
            }
            const currentText = texts[textIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typewriterText.textContent = currentText.slice(0, charIndex);

            let typeSpeed = 80;
            if (isDeleting) {
                typeSpeed = 40;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end of phrase
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex++;
                typeSpeed = 400; // Pause before new phrase
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 800);
    }

    // --- 6. PROJECT MODAL POPUP ---
    const projectModal = document.getElementById('project-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');

    function openModal() {
        if (projectModal) {
            projectModal.classList.remove('hidden');
            projectModal.classList.add('flex');
            // Force browser reflow to trigger CSS transitions
            void projectModal.offsetWidth;
            projectModal.classList.add('opacity-100');
            const contentBox = projectModal.querySelector('.modal-content-box');
            if (contentBox) {
                contentBox.classList.remove('scale-95');
                contentBox.classList.add('scale-100');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('opacity-100');
            const contentBox = projectModal.querySelector('.modal-content-box');
            if (contentBox) {
                contentBox.classList.remove('scale-100');
                contentBox.classList.add('scale-95');
            }
            setTimeout(() => {
                projectModal.classList.add('hidden');
                projectModal.classList.remove('flex');
                document.body.style.overflow = '';
            }, 300);
        }
    }

    openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));

    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // --- 7. AJAX CONTACT FORM SUBMISSION (FormSubmit.co) ---
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-form-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btnSpan = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            const originalText = btnSpan ? btnSpan.textContent : 'Kirim Pesan';
            
            if (btnSpan) btnSpan.textContent = 'Mengirim...';
            if (btnIcon) {
                btnIcon.className = 'fas fa-spinner fa-spin mr-2';
            }
            submitBtn.disabled = true;

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
                    if (contactMessage) {
                        contactMessage.innerHTML = '<span class="text-teal-400 text-sm font-semibold flex items-center gap-2"><i class="fas fa-check-circle"></i> Pesan berhasil terkirim! Terima kasih.</span>';
                    }
                    contactForm.reset();
                } else {
                    throw new Error('Gagal mengirim pesan');
                }
            })
            .catch(error => {
                if (contactMessage) {
                    contactMessage.innerHTML = '<span class="text-rose-400 text-sm font-semibold flex items-center gap-2"><i class="fas fa-times-circle"></i> Gagal mengirim pesan. Silakan coba lagi.</span>';
                }
            })
            .finally(() => {
                if (btnSpan) btnSpan.textContent = originalText;
                if (btnIcon) btnIcon.className = 'fas fa-paper-plane mr-2';
                submitBtn.disabled = false;

                setTimeout(() => {
                    if (contactMessage) contactMessage.innerHTML = '';
                }, 6000);
            });
        });
    }

    // --- 8. FADE-IN SCROLL OBSERVER ---
    const fadeSections = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeSections.forEach(section => {
        appearOnScroll.observe(section);
    });

    // --- 9. AUTO UPDATE FOOTER YEAR ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

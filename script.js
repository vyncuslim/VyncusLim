document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navToggleIcon = navToggle ? navToggle.querySelector('i') : null;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            
            if (navToggleIcon && typeof lucide !== 'undefined') {
                if (isOpen) {
                    navToggleIcon.setAttribute('data-lucide', 'x');
                } else {
                    navToggleIcon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('open');
            }
            if (navToggleIcon && typeof lucide !== 'undefined') {
                navToggleIcon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    /* ==========================================================================
       NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveLink();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run

    /* ==========================================================================
       ACTIVE LINK HIGHLIGHTING ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    function highlightActiveLink() {
        let currentSectionId = 'home';
        const scrollPosition = window.scrollY + 120; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    /* ==========================================================================
       INTERSECTION OBSERVER FOR SCROLL REVEALS
       ========================================================================== */
    // Add reveal class to various sections
    const revealTargets = [
        '.hero-text', '.hero-graphic-container',
        '.about-info-panel', '.about-stats-panel',
        '.filter-controls', '.project-card',
        '.timeline-item', '.contact-info', '.contact-form-container',
        '.cert-filter-controls', '.cert-card'
    ];

    revealTargets.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       MOUSE GLOW BORDER EFFECT FOR CARDS (PROJECT & CERTIFICATE CARDS)
       ========================================================================== */
    const glowCards = document.querySelectorAll('.project-card, .cert-card');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ==========================================================================
       PROJECT DYNAMIC FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state of buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card styling animation trigger
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Trigger redraw to activate transitions
                        card.offsetHeight; 
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // Initialize display styles for smooth filter transition
    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, background 0.4s ease';
    });

    /* ==========================================================================
       CERTIFICATION DYNAMIC FILTERING
       ========================================================================== */
    const certFilterButtons = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');
    
    certFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state of buttons
            certFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            certCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card styling animation trigger
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Trigger redraw to activate transitions
                        card.offsetHeight; 
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // Initialize display styles for smooth filter transition
    certCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, background 0.4s ease';
    });

    /* ==========================================================================
       CONTACT FORM VALIDATION & FEEDBACK
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    /* ==========================================================================
       VITASHIELD KINETICS / SDK INTEGRATION
       ========================================================================== */
    const vsWidget = document.getElementById('vitashield-widget');
    const vsTokenInput = document.getElementById('vmsShieldToken');
    let isVsVerified = false;

    // Check if the live VitaShield SDK has loaded successfully from the CDN
    if (typeof window.VitaShield !== 'undefined' && vsWidget) {
        // Initialize the live SDK from the vitashield repository behavior
        window.VitaShield.init({
            siteKey: 'vms_pub_live_38bf8c6e2d9a10bc',
            theme: {
                primary: '#00f2fe',
                background: 'rgba(13, 20, 35, 0.55)',
                text: '#94a3b8'
            }
        });

        // Listen for the live validation success custom event dispatched by the SDK widget
        vsWidget.addEventListener('vms-verified', (e) => {
            isVsVerified = true;
            const token = e.detail.token;
            if (vsTokenInput) vsTokenInput.value = token;
            
            // Trigger AJAX submission animation upon successful SDK verification
            handleFormSubmission();
        });
    } else if (vsWidget) {
        // Fallback: Local simulation of VitaShield kinetics (offline/development mode)
        const vsProgress = document.getElementById('vsProgress');
        const vsStatus = document.getElementById('vsStatus');
        
        if (vsProgress && vsStatus && vsTokenInput) {
            let entropy = 0;
            
            const updateVerification = (addedEntropy) => {
                if (isVsVerified) return;
                
                entropy = Math.min(100, entropy + addedEntropy);
                vsProgress.style.width = `${entropy}%`;
                
                if (entropy >= 100) {
                    isVsVerified = true;
                    vsWidget.querySelector('.vitashield-card')?.classList.add('verified');
                    vsStatus.innerHTML = '<span class="vs-status-dot"></span> Human Verified';
                    vsTokenInput.value = 'vms_fallback_token_' + Math.random().toString(36).substring(2, 15);
                    
                    if (formFeedback && formFeedback.textContent.includes('verify')) {
                        formFeedback.classList.add('hidden');
                    }
                }
            };
            
            const trackingArea = document.querySelector('.contact-form-container');
            let lastX = null, lastY = null, lastTime = null;
            
            if (trackingArea) {
                trackingArea.addEventListener('mousemove', (e) => {
                    const currentTime = Date.now();
                    if (lastX !== null && lastY !== null && lastTime !== null) {
                        const deltaX = Math.abs(e.clientX - lastX);
                        const deltaY = Math.abs(e.clientY - lastY);
                        const deltaTime = currentTime - lastTime;
                        
                        if (deltaTime > 10) {
                            const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;
                            if (speed > 0.05 && speed < 5) {
                                updateVerification(0.5);
                            }
                        }
                    }
                    lastX = e.clientX;
                    lastY = e.clientY;
                    lastTime = currentTime;
                });
            }
            
            if (contactForm) {
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', () => {
                        updateVerification(3);
                    });
                });
            }
        }
    }

    // Submit handler
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // If using the live SDK, the SDK intercepts submit and handles validation.
            // Only trigger manual submission check if the SDK hasn't completed or isn't loaded.
            if (typeof window.VitaShield !== 'undefined') {
                if (!isVsVerified) {
                    showFeedback('Please solve the VitaShield challenge or interact with the form to verify.', 'error');
                }
                return;
            }
            
            // Fallback validation check
            if (!isVsVerified || !vsTokenInput.value) {
                showFeedback('Please verify humanity using VitaShield before sending (interact with the form naturally).', 'error');
                return;
            }
            
            handleFormSubmission();
        });
    }

    function handleFormSubmission() {
        if (!contactForm) return;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitBtnText = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('i');
        
        if (!name || !email || !subject || !message) {
            showFeedback('Please fill out all fields.', 'error');
            return;
        }
        
        submitBtn.disabled = true;
        if (submitBtnText) submitBtnText.textContent = 'Sending Message...';
        if (submitBtnIcon && typeof lucide !== 'undefined') {
            submitBtnIcon.setAttribute('data-lucide', 'loader');
            lucide.createIcons();
        }

        setTimeout(() => {
            showFeedback(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
            
            // Reset state
            isVsVerified = false;
            if (vsTokenInput) vsTokenInput.value = '';
            
            // Reset fallback visual elements if visible
            const vsProgress = document.getElementById('vsProgress');
            const vsStatus = document.getElementById('vsStatus');
            if (vsProgress) vsProgress.style.width = '0%';
            if (vsStatus) vsStatus.innerHTML = '<span class="vs-status-dot pulse"></span> Analyzing behavior...';
            vsWidget.querySelector('.vitashield-card')?.classList.remove('verified');
            
            // Reset button
            submitBtn.disabled = false;
            if (submitBtnText) submitBtnText.textContent = 'Send Message';
            if (submitBtnIcon && typeof lucide !== 'undefined') {
                submitBtnIcon.setAttribute('data-lucide', 'send');
                lucide.createIcons();
            }
        }, 1800);
    }

    function showFeedback(text, type) {
        if (!formFeedback) return;
        
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`; // resets to default and adds type
        formFeedback.classList.remove('hidden');
        
        // Auto scroll feedback into view if needed
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.classList.add('hidden');
            }, 6000);
        }
    }

    /* ==========================================================================
       DYNAMIC COPYRIGHT YEAR
       ========================================================================== */
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       SCROLL TO TOP BUTTON BEHAVIOR
       ========================================================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       BIOGRAPHY TAB SWITCHING BEHAVIOR
       ========================================================================== */
    const bioTabButtons = document.querySelectorAll('.bio-tab-btn');
    const bioContentPanes = document.querySelectorAll('.bio-content-pane');
    
    if (bioTabButtons.length > 0 && bioContentPanes.length > 0) {
        bioTabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                bioTabButtons.forEach(b => b.classList.remove('active'));
                bioContentPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding pane
                const tabId = btn.getAttribute('data-tab');
                const targetPane = document.getElementById(`pane-${tabId}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
});

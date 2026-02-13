// ========== MOBILE MENU TOGGLE ==========
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.getElementById('navMenu');
            
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
                    
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('#navMenu a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        document.body.style.overflow = '';
                    }
                }
            });

            // ========== HEADER SCROLL EFFECT ==========
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                const header = document.querySelector('header');
                
                if (currentScroll > 100) {
                    if (currentScroll > lastScroll && !navMenu.classList.contains('active')) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                    }
                } else {
                    header.style.transform = 'translateY(0)';
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
                
                lastScroll = currentScroll;
            });

            // ========== RESIZE LISTENER ==========
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });

            // ========== SCROLL-TO-TOP BUTTON ==========
            function initScrollToTop() {
                const scrollBtn = document.getElementById('scrollToTopBtn');
                const progressRing = document.querySelector('.progress-ring-circle');
                
                if (!scrollBtn) return;
                
                function updateProgressRing() {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (window.scrollY / windowHeight) * 100;
                    const progress = 100 - scrolled;
                    if (progressRing) {
                        progressRing.style.strokeDashoffset = progress;
                    }
                }
                
                function toggleScrollButton() {
                    if (window.scrollY > 300) {
                        scrollBtn.classList.add('visible');
                    } else {
                        scrollBtn.classList.remove('visible');
                    }
                    updateProgressRing();
                }
                
                function scrollToTop() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                
                window.addEventListener('scroll', toggleScrollButton);
                scrollBtn.addEventListener('click', scrollToTop);
                toggleScrollButton();
            }

            // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
            function setActiveNav() {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const navLinks = document.querySelectorAll('#navMenu a');
                
                navLinks.forEach(link => {
                    const linkPath = link.getAttribute('href').split('/').pop();
                    if (linkPath === currentPage) {
                        link.classList.add('active');
                    }
                });
            }

            // ========== URL PARAMETERS ==========
            function handleUrlParams() {
                const urlParams = new URLSearchParams(window.location.search);
                const serviceParam = urlParams.get('service');
                if (serviceParam) {
                    const serviceSelect = document.getElementById('service');
                    if (serviceSelect) {
                        serviceSelect.value = serviceParam;
                    }
                }
            }

            // ========== FORM VALIDATION & SUBMISSION ==========
            function initForm() {
                const contactForm = document.getElementById('contactForm');
                const formMessage = document.getElementById('formMessage');
                const submitBtn = document.querySelector('.form-submit');
                
                if (!contactForm) return;
                
                // Clear errors helper
                function clearErrors() {
                    const errorElements = document.querySelectorAll('.form-error');
                    errorElements.forEach(element => {
                        element.textContent = '';
                        element.style.display = 'none';
                    });
                    
                    const inputs = document.querySelectorAll('.form-control');
                    inputs.forEach(input => {
                        input.classList.remove('error', 'success');
                    });
                }
                
                // Show form message helper
                function showFormMessage(text, type) {
                    if (formMessage) {
                        formMessage.textContent = text;
                        formMessage.className = `form-message ${type}`;
                        formMessage.style.display = 'block';
                        
                        const hideTime = type === 'success' ? 8000 : 10000;
                        setTimeout(() => {
                            formMessage.style.display = 'none';
                        }, hideTime);
                    }
                }
                
                // Validate form
                function validateForm() {
                    let isValid = true;
                    const errors = {};
                    
                    const name = document.getElementById('name')?.value.trim() || '';
                    if (!name) {
                        errors.name = 'Full name is required';
                        isValid = false;
                    } else if (name.length < 2) {
                        errors.name = 'Name must be at least 2 characters';
                        isValid = false;
                    }
                    
                    const email = document.getElementById('email')?.value.trim() || '';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!email) {
                        errors.email = 'Email address is required';
                        isValid = false;
                    } else if (!emailRegex.test(email)) {
                        errors.email = 'Please enter a valid email address';
                        isValid = false;
                    }
                    
                    const phone = document.getElementById('phone')?.value.trim() || '';
                    if (phone) {
                        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                        const cleanPhone = phone.replace(/[^\d+]/g, '');
                        if (!phoneRegex.test(cleanPhone)) {
                            errors.phone = 'Please enter a valid phone number';
                            isValid = false;
                        }
                    }
                    
                    const subject = document.getElementById('subject')?.value.trim() || '';
                    if (!subject) {
                        errors.subject = 'Subject is required';
                        isValid = false;
                    } else if (subject.length < 5) {
                        errors.subject = 'Subject must be at least 5 characters';
                        isValid = false;
                    }
                    
                    const message = document.getElementById('message')?.value.trim() || '';
                    if (!message) {
                        errors.message = 'Message is required';
                        isValid = false;
                    } else if (message.length < 10) {
                        errors.message = 'Message must be at least 10 characters';
                        isValid = false;
                    }
                    
                    const privacy = document.getElementById('privacy')?.checked || false;
                    if (!privacy) {
                        errors.privacy = 'You must agree to the privacy policy';
                        isValid = false;
                    }
                    
                    // Display errors
                    Object.keys(errors).forEach(field => {
                        const errorElement = document.getElementById(`${field}Error`);
                        const inputElement = document.getElementById(field);
                        
                        if (errorElement && inputElement) {
                            errorElement.textContent = errors[field];
                            errorElement.style.color = '#e53935';
                            errorElement.style.fontSize = '0.9rem';
                            errorElement.style.marginTop = '5px';
                            errorElement.style.display = 'block';
                            
                            inputElement.classList.add('error');
                            inputElement.classList.remove('success');
                        }
                    });
                    
                    // Mark valid fields
                    ['name', 'email', 'subject', 'message'].forEach(field => {
                        const inputElement = document.getElementById(field);
                        if (inputElement && inputElement.value.trim() && !errors[field]) {
                            inputElement.classList.remove('error');
                            inputElement.classList.add('success');
                        }
                    });
                    
                    return isValid;
                }
                
                // Submit handler
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    clearErrors();
                    
                    if (!validateForm()) {
                        return;
                    }
                    
                    const formData = new FormData(contactForm);
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone') || '',
                        business: formData.get('business') || '',
                        service: formData.get('service') || '',
                        subject: formData.get('subject'),
                        message: formData.get('message'),
                        newsletter: formData.get('newsletter') === 'on',
                        timestamp: new Date().toISOString(),
                        source: 'Website Contact Form'
                    };
                    
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                    
                    try {
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        
                        showFormMessage(
                            `Thank you, ${data.name}! Your message has been sent successfully. We'll contact you within 24 hours at ${data.email}.`, 
                            'success'
                        );
                        
                        contactForm.reset();
                        console.log('Form submitted:', data);
                        
                    } catch (error) {
                        console.error('Form submission error:', error);
                        showFormMessage('There was an error sending your message. Please try again or contact us directly.', 'error');
                        
                    } finally {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    }
                });
                
                // Input validation on blur
                const formInputs = document.querySelectorAll('.form-control[required]');
                formInputs.forEach(input => {
                    input.addEventListener('blur', function() {
                        const value = this.value.trim();
                        if (value) {
                            this.classList.remove('error');
                            this.classList.add('success');
                        } else {
                            this.classList.remove('success');
                        }
                    });
                });
            }

            // ========== FAQ TOGGLE ==========
            function initFaq() {
                const faqQuestions = document.querySelectorAll('.faq-question');
                faqQuestions.forEach(question => {
                    question.addEventListener('click', () => {
                        const answer = question.nextElementSibling;
                        const isActive = question.classList.contains('active');
                        
                        faqQuestions.forEach(q => {
                            q.classList.remove('active');
                            q.nextElementSibling.classList.remove('active');
                        });
                        
                        if (!isActive) {
                            question.classList.add('active');
                            answer.classList.add('active');
                        }
                    });
                });
            }

            // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
            function initSmoothScroll() {
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function(e) {
                        const href = this.getAttribute('href');
                        if (href !== '#' && href.startsWith('#')) {
                            e.preventDefault();
                            const target = document.querySelector(href);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    });
                });
            }

            // ========== HOTLINK PROTECTION ==========
            function hotlinkProtection() {
                if (document.referrer && 
                    !document.referrer.includes('localreach.in') && 
                    !document.referrer.includes('localhost') &&
                    document.referrer !== '') {
                    console.log('Hotlinking detected from:', document.referrer);
                }
            }

            // ========== INITIALIZE ALL ==========
            document.addEventListener('DOMContentLoaded', function() {
                initScrollToTop();
                setActiveNav();
                handleUrlParams();
                initForm();
                initFaq();
                initSmoothScroll();
                hotlinkProtection();
                
                window.addEventListener('load', initScrollToTop);
            });
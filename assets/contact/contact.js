// Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.getElementById('navMenu');
            
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
                    
                // Toggle body scroll when menu is open
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

            // Set current page as active in navigation
            document.addEventListener('DOMContentLoaded', function() {
                const currentPage = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('#navMenu a');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });
                
                // Check for URL parameters to pre-fill service field
                const urlParams = new URLSearchParams(window.location.search);
                const serviceParam = urlParams.get('service');
                if (serviceParam) {
                    const serviceSelect = document.getElementById('service');
                    if (serviceSelect) {
                        serviceSelect.value = serviceParam;
                    }
                }
            });

            // Form Validation and Submission
            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('formMessage');
            const submitBtn = document.querySelector('.form-submit');
            
            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    // Reset previous errors
                    clearErrors();
                    
                    // Validate form
                    if (!validateForm()) {
                        return;
                    }
                    
                    // Get form data
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
                    
                    // Show loading state
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                    
                    try {
                        // Simulate form submission (replace with actual API endpoint)
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        
                        // Show success message
                        showFormMessage(
                            `Thank you, ${data.name}! Your message has been sent successfully. ` +
                            `We'll contact you within 24 hours at ${data.email}.`, 
                            'success'
                        );
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Log to console for debugging
                        console.log('Form submitted:', data);
                        
                    } catch (error) {
                        console.error('Form submission error:', error);
                        showFormMessage('There was an error sending your message. Please try again or contact us directly.', 'error');
                        
                    } finally {
                        // Reset button state
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    }
                });
            }
            
            function validateForm() {
                let isValid = true;
                const errors = {};
                
                // Name validation
                const name = document.getElementById('name').value.trim();
                if (!name) {
                    errors.name = 'Full name is required';
                    isValid = false;
                } else if (name.length < 2) {
                    errors.name = 'Name must be at least 2 characters';
                    isValid = false;
                }
                
                // Email validation
                const email = document.getElementById('email').value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email) {
                    errors.email = 'Email address is required';
                    isValid = false;
                } else if (!emailRegex.test(email)) {
                    errors.email = 'Please enter a valid email address';
                    isValid = false;
                }
                
                // Phone validation (optional)
                const phone = document.getElementById('phone').value.trim();
                if (phone) {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    const cleanPhone = phone.replace(/[^\d+]/g, '');
                    if (!phoneRegex.test(cleanPhone)) {
                        errors.phone = 'Please enter a valid phone number';
                        isValid = false;
                    }
                }
                
                // Subject validation
                const subject = document.getElementById('subject').value.trim();
                if (!subject) {
                    errors.subject = 'Subject is required';
                    isValid = false;
                } else if (subject.length < 5) {
                    errors.subject = 'Subject must be at least 5 characters';
                    isValid = false;
                }
                
                // Message validation
                const message = document.getElementById('message').value.trim();
                if (!message) {
                    errors.message = 'Message is required';
                    isValid = false;
                } else if (message.length < 10) {
                    errors.message = 'Message must be at least 10 characters';
                    isValid = false;
                }
                
                // Privacy policy validation
                const privacy = document.getElementById('privacy').checked;
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
            
            function showFormMessage(text, type) {
                if (formMessage) {
                    formMessage.textContent = text;
                    formMessage.className = `form-message ${type}`;
                    formMessage.style.display = 'block';
                    
                    // Auto-hide after 8 seconds for success, 10 seconds for error
                    const hideTime = type === 'success' ? 8000 : 10000;
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, hideTime);
                }
            }
            
            // FAQ Toggle Functionality
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const isActive = question.classList.contains('active');
                    
                    // Toggle current FAQ item
                    if (isActive) {
                        question.classList.remove('active');
                        answer.classList.remove('active');
                    } else {
                        // Close all other FAQ items
                        faqQuestions.forEach(q => {
                            q.classList.remove('active');
                            q.nextElementSibling.classList.remove('active');
                        });
                        
                        // Open current FAQ item
                        question.classList.add('active');
                        answer.classList.add('active');
                    }
                });
            });
            
            // Input validation on blur
            const formInputs = document.querySelectorAll('.form-control[required]');
            formInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    const value = this.value.trim();
                    const field = this.id;
                    
                    if (value) {
                        this.classList.remove('error');
                        this.classList.add('success');
                    } else {
                        this.classList.remove('success');
                    }
                });
            });
            
            // Smooth scroll for CTA button
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });

            // Add header scroll effect
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                const header = document.querySelector('header');
                
                if (currentScroll > 100) {
                    if (currentScroll > lastScroll && !navMenu.classList.contains('active')) {
                        // Scrolling down
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up
                        header.style.transform = 'translateY(0)';
                        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                    }
                } else {
                    header.style.transform = 'translateY(0)';
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
                
                lastScroll = currentScroll;
            });

            // Resize listener to handle menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });

            // Premium Scroll-to-Top Button
            function initScrollToTop() {
                const scrollBtn = document.getElementById('scrollToTopBtn');
                const progressRing = document.querySelector('.progress-ring-circle');
                
                if (!scrollBtn) return;
                
                // Update progress ring based on scroll
                function updateProgressRing() {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (window.scrollY / windowHeight) * 100;
                    const progress = 100 - scrolled;
                    if (progressRing) {
                        progressRing.style.strokeDashoffset = progress;
                    }
                }
                
                // Toggle button visibility
                function toggleScrollButton() {
                    if (window.scrollY > 300) {
                        scrollBtn.classList.add('visible');
                    } else {
                        scrollBtn.classList.remove('visible');
                    }
                    updateProgressRing();
                }
                
                // Scroll to top function
                function scrollToTop() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                
                // Event Listeners
                window.addEventListener('scroll', toggleScrollButton);
                scrollBtn.addEventListener('click', scrollToTop);
                
                // Initialize on load
                toggleScrollButton();
            }

            // Initialize when DOM is loaded
            document.addEventListener('DOMContentLoaded', function() {
                initScrollToTop();
                
                // Also add it to window load for good measure
                window.addEventListener('load', initScrollToTop);
            });
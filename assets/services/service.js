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

            // Initialize service navigation - FIXED VERSION
            function initializeServiceNavigation() {
                const serviceCards = document.querySelectorAll('.quick-service-card');
                const serviceDetails = document.querySelectorAll('.service-detail-card');
                
                // Service Navigation Click Handler
                serviceCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const service = card.getAttribute('data-service');
                        showService(service);
                    });
                });

                // Function to show a specific service
                function showService(service) {
                    // Update active state on navigation cards
                    serviceCards.forEach(c => c.classList.remove('active'));
                    const activeCard = document.querySelector(`.quick-service-card[data-service="${service}"]`);
                    if (activeCard) {
                        activeCard.classList.add('active');
                    }
                    
                    // Hide all service details
                    serviceDetails.forEach(detail => {
                        detail.classList.remove('active');
                    });
                    
                    // Show selected service detail
                    const selectedDetail = document.getElementById(`${service}-detail`);
                    if (selectedDetail) {
                        selectedDetail.classList.add('active');
                        
                        // Scroll to service section
                        setTimeout(() => {
                            selectedDetail.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start' 
                            });
                        }, 100);
                    }
                }

                // Check for URL hash on page load
                function checkHashOnLoad() {
                    const hash = window.location.hash.substring(1);
                    const validServices = ['sales', 'seo', 'social', 'content', 'ads', 'whatsapp', 'web', 'website-seo', 'app'];
                    
                    if (hash && validServices.includes(hash)) {
                        // Small delay to ensure DOM is fully ready
                        setTimeout(() => {
                            showService(hash);
                        }, 300);
                    }
                }

                // Also handle hash changes (when clicking links on the same page)
                window.addEventListener('hashchange', function() {
                    const hash = window.location.hash.substring(1);
                    const validServices = ['sales', 'seo', 'social', 'content', 'ads', 'whatsapp', 'web', 'website-seo', 'app'];
                    
                    if (hash && validServices.includes(hash)) {
                        showService(hash);
                    }
                });

                // Initialize on page load
                checkHashOnLoad();
            }

            // Set active navigation based on current page
            document.addEventListener('DOMContentLoaded', function() {
                const currentPage = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('#navMenu a');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });

                // Initialize service navigation
                initializeServiceNavigation();

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

                // Add smooth scrolling for anchor links
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
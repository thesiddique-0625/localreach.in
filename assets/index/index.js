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

            // Set active navigation based on current page
            document.addEventListener('DOMContentLoaded', function() {
                const currentPage = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('#navMenu a');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });

                // Animate stats on scroll
                function animateStats() {
                    const statNumbers = document.querySelectorAll('.stat-number, .about-stat h3');
                    statNumbers.forEach(stat => {
                        const finalValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                        if (!isNaN(finalValue)) {
                            let currentValue = 0;
                            const increment = finalValue / 50;
                            const timer = setInterval(() => {
                                currentValue += increment;
                                if (currentValue >= finalValue) {
                                    stat.textContent = finalValue + (stat.textContent.includes('%') ? '%' : '+');
                                    clearInterval(timer);
                                } else {
                                    stat.textContent = Math.floor(currentValue);
                                }
                            }, 30);
                        }
                    });
                }

                // Trigger animation when stats come into view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                const statsSection = document.querySelector('.results-showcase');
                if (statsSection) {
                    observer.observe(statsSection);
                }

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
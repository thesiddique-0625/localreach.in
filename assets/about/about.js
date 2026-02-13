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

            // Close menu when clicking a link
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

            // ========== STATS ANIMATION ==========
            function animateStats() {
                const stats = document.querySelectorAll('.story-stat h4');
                stats.forEach(stat => {
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

            // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
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

            // ========== INTERSECTION OBSERVER FOR STATS ==========
            function initStatsObserver() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                const statsSection = document.querySelector('.story-stats');
                if (statsSection) {
                    observer.observe(statsSection);
                }
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
                initStatsObserver();
                initSmoothScroll();
                hotlinkProtection();
                
                window.addEventListener('load', initScrollToTop);
            });
// protect-content.js - Combined JavaScript and CSS Protection
(function() {
    'use strict';

    // Block right-click silently
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Block keyboard shortcuts silently
    document.addEventListener('keydown', function(e) {
        // Block F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+Shift+I
        if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) || 
            (e.metaKey && e.altKey && e.keyCode === 73)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+U
        if (e.ctrlKey && (e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+S
        if (e.ctrlKey && (e.key === 's' || e.keyCode === 83)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+Shift+S
        if (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Shift+S
        if (e.shiftKey && (e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Shift+U
        if (e.shiftKey && (e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+C
        if (e.ctrlKey && (e.key === 'c' || e.keyCode === 67)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+X
        if (e.ctrlKey && (e.key === 'x' || e.keyCode === 88)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Ctrl+A
        if (e.ctrlKey && (e.key === 'a' || e.keyCode === 65)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Print Screen
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Block Alt+F4
        if (e.altKey && (e.key === 'F4' || e.keyCode === 115)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);

    // Block drag and drop for images only
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Prevent text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Prevent copy
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    // Prevent cut
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    // Make images non-draggable on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Only apply to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.setAttribute('draggable', 'false');
        });
        
        // Add CSS protection styles
        const style = document.createElement('style');
        style.textContent = `
            /* CSS Protection Styles */
            body, div, p, h1, h2, h3, h4, h5, h6, span, a, li, td, th {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            
            input, textarea {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
            
            img {
                -webkit-user-drag: none !important;
                -moz-user-drag: none !important;
                -ms-user-drag: none !important;
                user-drag: none !important;
                pointer-events: none !important;
            }
            
            *:hover {
                cursor: default !important;
            }
            
            /* Allow button and link hover states */
            .btn:hover, a:hover, button:hover {
                cursor: pointer !important;
                transform: none !important;
            }
            
            /* Specifically for your buttons */
            .btn-primary:hover {
                background-color: var(--primary-dark) !important;
                transform: translateY(-3px) !important;
                box-shadow: var(--shadow) !important;
                cursor: pointer !important;
            }
            
            .btn-outline:hover {
                background-color: var(--primary) !important;
                color: var(--light) !important;
                cursor: pointer !important;
            }
            
            /* For team member cards */
            .team-member:hover {
                transform: translateY(-10px) !important;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
                cursor: pointer !important;
            }
            
            /* For value cards */
            .value-card:hover {
                transform: translateY(-10px) !important;
                border-top-color: var(--primary) !important;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
                cursor: pointer !important;
            }
            
            /* For approach items */
            .approach-item:hover {
                transform: translateY(-10px) !important;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
                cursor: pointer !important;
            }
            
            /* For mission/vision boxes */
            .mission-box:hover, .vision-box:hover {
                transform: translateY(-10px) !important;
                cursor: pointer !important;
            }
            
            /* For navigation links */
            nav ul li a:hover {
                color: var(--primary) !important;
                cursor: pointer !important;
            }
            
            /* For social links */
            .social-links a:hover {
                background-color: var(--primary) !important;
                transform: translateY(-5px) !important;
                cursor: pointer !important;
            }
            
            .member-social a:hover {
                background-color: var(--primary) !important;
                color: var(--light) !important;
                cursor: pointer !important;
            }
            
            /* For footer links */
            .footer-links ul li a:hover {
                opacity: 1 !important;
                color: var(--primary) !important;
                padding-left: 5px !important;
                cursor: pointer !important;
            }
            
            /* Hide content when printing */
            @media print {
                body * {
                    visibility: hidden !important;
                    display: none !important;
                }
                
                body::after {
                    content: "Printing disabled";
                    display: block;
                    visibility: visible !important;
                }
            }
            
            /* Prevent text highlighting */
            ::selection {
                background: transparent !important;
                color: inherit !important;
            }
            
            ::-moz-selection {
                background: transparent !important;
                color: inherit !important;
            }
        `;
        document.head.appendChild(style);
    });

    // Detect and block iframe embedding silently
    if (window.top !== window.self) {
        document.body.innerHTML = '';
        document.title = '';
    }

    // Disable console functions
    (function() {
        var noop = function(){};
        var methods = [
            'log', 'debug', 'info', 'warn', 'error', 'assert', 
            'clear', 'dir', 'dirxml', 'trace', 'group', 'groupCollapsed', 
            'groupEnd', 'time', 'timeEnd', 'timeStamp', 'profile', 
            'profileEnd', 'count', 'exception', 'table'
        ];
        
        methods.forEach(function(method) {
            window.console[method] = noop;
        });
    })();

    // Block view source
    document.onkeydown = function(e) {
        if (e.ctrlKey && e.keyCode === 85) {
            return false;
        }
    };

    // Disable print
    window.addEventListener('beforeprint', function(e) {
        e.preventDefault();
        return false;
    });

    // Block back button
    history.pushState(null, null, location.href);
    window.onpopstate = function() {
        history.go(1);
    };
})();
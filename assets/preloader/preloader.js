// Preloader Controller
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    if (!preloader) return;
    
    // Prevent scrolling while preloader is active
    body.style.overflow = 'hidden';
    
    // Function to hide preloader
    function hidePreloader() {
        preloader.classList.add('loaded');
        
        setTimeout(() => {
            preloader.style.display = 'none';
            body.style.overflow = '';
            
            // Dispatch event for any post-preloader actions
            document.dispatchEvent(new CustomEvent('preloaderComplete'));
        }, 500);
    }
    
    // Hide preloader after 3 seconds of animation
    setTimeout(() => {
        hidePreloader();
    }, 3000);
    
    // Optional: Click to skip preloader
    preloader.addEventListener('click', function() {
        if (!preloader.classList.contains('loaded')) {
            hidePreloader();
        }
    });
    
    // Fallback: hide preloader after 5 seconds max
    setTimeout(() => {
        if (preloader.style.display !== 'none') {
            hidePreloader();
        }
    }, 5000);
});

// Force preloader to show on page refresh/load
window.addEventListener('beforeunload', function() {
    // Store that we're navigating away
    sessionStorage.setItem('preloaderShown', 'false');
});

window.addEventListener('load', function() {
    // Always show preloader on page load
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'flex';
    }
});
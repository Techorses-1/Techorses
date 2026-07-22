document.addEventListener('copy', function (e) {
    e.preventDefault(); // Prevent default copy behavior

    const customMessage = 'TECHORSES';

    if (e.clipboardData) {
        e.clipboardData.setData('text/plain', customMessage);
    } else if (window.clipboardData) {
        // For older versions of IE
        window.clipboardData.setData('Text', customMessage);
    }
});

// Get current page path
const currentPath = window.location.pathname;

// Find all footer links
const footerLinks = document.querySelectorAll('.footer-link');

// Check each link and add active class if it matches current page
footerLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath)) {
        link.classList.add('active-footer-link');
    }
});

// ========== FOOTER INTERACTIONS ==========
document.addEventListener('DOMContentLoaded', function () {


    // "Become a Client" button
    const becomeClientBtn = document.querySelector('.footer-social-wrapper button');
    if (becomeClientBtn) {
        becomeClientBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const letsTalkModal = document.querySelector('.lets-talk-modal');
            if (letsTalkModal) {
                letsTalkModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                const blurOverlay = document.querySelector('.blur-overlay');

                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    blurOverlay.classList.remove('active');
                }
            }
        });
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
    const goToTopBtn = document.getElementById('goToTopBtn');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            goToTopBtn.style.display = 'flex';
        } else {
            goToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    goToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});



// Initialize when DOM is loaded (NAVBAR)
document.addEventListener('DOMContentLoaded', function () {
    // ========== NAVBAR ELEMENTS ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // SERVICES dropdown elements – use specific selector to avoid conflict
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = document.querySelector('.services-dropdown .nav-link');
    const servicesContainer = document.querySelector('.services-dropdown .dropdown-container'); // FIXED

    // PRODUCTS dropdown elements
    const productsDropdown = document.querySelector('.products-dropdown');
    const productsLink = document.querySelector('.products-toggle');
    const productsContainer = document.querySelector('.products-dropdown-container');

    const heroSection = document.querySelector('.hero');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Create blur overlay for mobile menu
    const blurOverlay = document.createElement('div');
    blurOverlay.className = 'blur-overlay';
    document.body.appendChild(blurOverlay);

    // ========== MODAL ELEMENTS ==========
    const letsTalkBtn = document.querySelector('.btn-lets-talk');
    const letsTalkModal = document.querySelector('.lets-talk-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const contactForm = document.querySelector('.contact-form');

    // ========== STATE VARIABLES ==========
    let isServicesOpen = false;
    let isProductsOpen = false;
    let isMobileMenuOpen = false;

    // ========== HELPER TO CLOSE ALL DROPDOWNS ==========
    function closeAllDropdowns() {
        // Close SERVICES
        if (window.innerWidth > 992) {
            if (servicesContainer) {
                servicesContainer.style.opacity = '0';
                servicesContainer.style.visibility = 'hidden';
                servicesContainer.style.pointerEvents = 'none';
            }
        } else {
            servicesDropdown?.classList.remove('active');
            if (servicesContainer) {
                servicesContainer.style.display = 'none';
                servicesContainer.style.opacity = '0';
                servicesContainer.style.visibility = 'hidden';
            }
        }
        isServicesOpen = false;

        // Close PRODUCTS
        if (window.innerWidth > 992) {
            if (productsContainer) {
                productsContainer.style.opacity = '0';
                productsContainer.style.visibility = 'hidden';
                productsContainer.style.pointerEvents = 'none';
            }
        } else {
            productsDropdown?.classList.remove('active');
            if (productsContainer) {
                productsContainer.style.display = 'none';
                productsContainer.style.opacity = '0';
                productsContainer.style.visibility = 'hidden';
            }
        }
        isProductsOpen = false;
    }

    // ========== TOGGLE SERVICES DROPDOWN ==========
    function toggleServices(open) {
        if (window.innerWidth > 992) {
            if (open === undefined) {
                isServicesOpen = !isServicesOpen;
            } else {
                isServicesOpen = open;
            }
            if (isServicesOpen) {
                servicesContainer.style.opacity = '1';
                servicesContainer.style.visibility = 'visible';
                servicesContainer.style.pointerEvents = 'auto';
            } else {
                servicesContainer.style.opacity = '0';
                servicesContainer.style.visibility = 'hidden';
                servicesContainer.style.pointerEvents = 'none';
            }
        } else {
            servicesDropdown.classList.toggle('active');
            if (servicesDropdown.classList.contains('active')) {
                servicesContainer.style.display = 'flex';
                servicesContainer.style.opacity = '1';
                servicesContainer.style.visibility = 'visible';
            } else {
                servicesContainer.style.display = 'none';
                servicesContainer.style.opacity = '0';
                servicesContainer.style.visibility = 'hidden';
            }
        }
    }

    // ========== TOGGLE PRODUCTS DROPDOWN ==========
    function toggleProducts(open) {
        if (window.innerWidth > 992) {
            if (open === undefined) {
                isProductsOpen = !isProductsOpen;
            } else {
                isProductsOpen = open;
            }
            if (isProductsOpen) {
                productsContainer.style.opacity = '1';
                productsContainer.style.visibility = 'visible';
                productsContainer.style.pointerEvents = 'auto';
            } else {
                productsContainer.style.opacity = '0';
                productsContainer.style.visibility = 'hidden';
                productsContainer.style.pointerEvents = 'none';
            }
        } else {
            productsDropdown.classList.toggle('active');
            if (productsDropdown.classList.contains('active')) {
                productsContainer.style.display = 'flex';
                productsContainer.style.opacity = '1';
                productsContainer.style.visibility = 'visible';
            } else {
                productsContainer.style.display = 'none';
                productsContainer.style.opacity = '0';
                productsContainer.style.visibility = 'hidden';
            }
        }
    }

    // ========== MOBILE MENU TOGGLE ==========
    hamburger.addEventListener('click', function () {
        isMobileMenuOpen = !isMobileMenuOpen;
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        blurOverlay.classList.toggle('active');

        // Close any open dropdowns when closing mobile menu
        if (!isMobileMenuOpen) {
            closeAllDropdowns();
        }
    });

    // ========== OVERLAY CLICK ==========
    blurOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        this.classList.remove('active');
        isMobileMenuOpen = false;
        closeAllDropdowns();
    });

    // ========== SERVICES CLICK ==========
    servicesLink.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Close PRODUCTS first
        if (isProductsOpen) toggleProducts(false);

        // Then toggle SERVICES
        toggleServices();
    });

    // ========== PRODUCTS CLICK ==========
    if (productsLink && productsDropdown) {
        productsLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Close SERVICES first
            if (isServicesOpen) toggleServices(false);

            // Then toggle PRODUCTS
            toggleProducts();
        });
    }

    // ========== CLICK OUTSIDE HANDLER ==========
    document.addEventListener('click', function (e) {
        // Don't close if clicking inside either dropdown or on their toggles
        const isClickInsideServices = servicesDropdown?.contains(e.target);
        const isClickInsideProducts = productsDropdown?.contains(e.target);
        const isClickOnToggle = e.target.classList.contains('nav-link') || e.target.closest('.nav-link');

        if (!isClickInsideServices && !isClickInsideProducts && !isClickOnToggle) {
            closeAllDropdowns();
        }
    });

    // ========== SCROLL HANDLER FOR DESKTOP ==========
    function updateDropdownStyle() {
        if (!heroSection || window.innerWidth <= 992) return;

        const heroHeight = heroSection.offsetHeight;
        const heroTop = heroSection.getBoundingClientRect().top;
        const heroVisibleRatio = Math.abs(heroTop) / heroHeight;
        const isPastThreshold = heroVisibleRatio >= 0.6;

        const serviceColors = [
            '#e7fff2', '#e7fff2', '#e7fff2',
            '#e7fff2', '#e7fff2', '#e7fff2'
        ];

        dropdownItems.forEach((item, index) => {
            if (isPastThreshold) {
                item.style.backgroundColor = serviceColors[index % serviceColors.length];
                item.style.color = '#333';
                if (item.querySelector('span')) {
                    item.querySelector('span').style.color = '#333';
                    const secondLine = item.querySelector('.second-line');
                    if (secondLine) secondLine.style.color = '#666';
                }
            } else {
                item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                item.style.color = 'white';
                if (item.querySelector('span')) {
                    item.querySelector('span').style.color = 'white';
                    const secondLine = item.querySelector('.second-line');
                    if (secondLine) secondLine.style.color = 'rgba(255, 255, 255, 0.8)';
                }
            }
        });
    }

    // Initialize and set up scroll listener for desktop
    if (heroSection && window.innerWidth > 992) {
        updateDropdownStyle();
        window.addEventListener('scroll', updateDropdownStyle);
    }

    // ========== MODAL FUNCTIONALITY (unchanged) ==========
    if (letsTalkBtn && letsTalkModal) {
        letsTalkBtn.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                this.href = "tel:+917778048992";
                return;
            }
            e.preventDefault();
            letsTalkModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeModal() {
            letsTalkModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && letsTalkModal.classList.contains('active')) {
                closeModal();
            }
        });

        if (contactForm) {
            contactForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                // ... (keep your existing form submission code exactly as it was)
                // I'm omitting it here for brevity, but you must keep your original code.
            });
        }
    }

    // ========== WINDOW RESIZE HANDLER ==========
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            blurOverlay.classList.remove('active');
            isMobileMenuOpen = false;
            // Reset dropdowns to closed state
            closeAllDropdowns();
        }
        if (heroSection && window.innerWidth > 992) {
            updateDropdownStyle();
        }
    });

    // Initialize counters if they exist
    if (typeof animateCounters === 'function') {
        animateCounters();
    }

      // ========== SET ACTIVE DROPDOWN ITEM BASED ON CURRENT PAGE ==========
  function setActiveDropdownItem() {
    const currentPage = window.location.pathname;
    const serviceItems = document.querySelectorAll('.services-dropdown .dropdown-item');
    
    serviceItems.forEach(item => {
      const itemHref = item.getAttribute('href');
      if (itemHref && currentPage.includes(itemHref)) {
        item.classList.add('active');
      }
    });
  }
  
  setActiveDropdownItem();
  // ========== END OF NEW CODE ==========
});;

// Show Toast Function (top-center)
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar-container');
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});




// Initialize button as hidden
document.getElementById('goToTopBtn').style.display = 'none';

//   -------------------------------------------------points
document.addEventListener('DOMContentLoaded', function () {
    const pointItems = document.querySelectorAll('.point-item');

    // Sort items by their data-index attribute
    const sortedItems = Array.from(pointItems).sort((a, b) => {
        return parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index'));
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll events
    function handleScroll() {
        sortedItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('animate-left') && !item.classList.contains('animate-right')) {
                // Alternate between left and right animations
                if (index % 2 === 0) {
                    setTimeout(() => {
                        item.classList.add('animate-left');
                    }, index * 50);
                } else {
                    setTimeout(() => {
                        item.classList.add('animate-right');
                    }, index * 50);
                }
            }
        });
    }

    // Initial check in case some elements are already in viewport
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});
//---------------------------------------------------------------------------------------------------------------------COUNT
document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');

    // Intersection Observer configuration
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px' // Trigger animation when 100px from bottom of viewport
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all stat items
    statItems.forEach(item => {
        // Initialize count to 0
        item.querySelector('.count').textContent = '0';
        observer.observe(item);
    });

    function animateCounter(item) {
        const target = parseInt(item.getAttribute('data-target'));
        const countElement = item.querySelector('.count');
        const lineElement = item.querySelector('.animated-line');
        const duration = 1500; // Animation duration in ms
        const startTime = performance.now();

        // Easing function for smooth animation
        const easeOutQuad = (t) => t * (2 - t);

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutQuad(progress);

            // Update counter
            const currentValue = Math.floor(easedProgress * target);
            countElement.textContent = currentValue;

            // Update progress bar
            if (lineElement) {
                lineElement.style.width = `${easedProgress * 100}%`;
            }

            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final values are exact
                countElement.textContent = target;
                if (lineElement) {
                    lineElement.style.width = '100%';
                }
            }
        }

        // Start the animation
        requestAnimationFrame(updateCounter);
    }
});

// ------------------------------------------------------------------------------------------------------------------------------TIMELINEFATURES
document.addEventListener('DOMContentLoaded', function () {
    const timelineProgress = document.querySelector('.timeline-progress');
    const featureRows = document.querySelectorAll('.feature-row');
    const lastFeatureRow = featureRows[featureRows.length - 1];
    const isMobile = window.innerWidth <= 768;

    // Initialize positions and transitions
    featureRows.forEach((row, index) => {
        const isOdd = (index + 1) % 2 !== 0;
        const content = row.querySelector('.feature-content');
        const image = row.querySelector('.feature-image');

        // Add transition
        content.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        image.style.transition = 'transform 0.6s ease, opacity 0.6s ease';

        // Set initial positions and opacity
        content.style.opacity = '0.3';
        image.style.opacity = '0.3';

        if (isMobile) {
            // On mobile, stack vertically but still maintain left/right animation
            if (isOdd) {
                content.style.transform = 'translateX(-50px)';
                image.style.transform = 'translateX(50px)';
            } else {
                content.style.transform = 'translateX(50px)';
                image.style.transform = 'translateX(-50px)';
            }
        } else {
            // On desktop - original animation
            if (isOdd) {
                content.style.transform = 'translateX(-100px)';
                image.style.transform = 'translateX(100px)';
            } else {
                content.style.transform = 'translateX(100px)';
                image.style.transform = 'translateX(-100px)';
            }
        }
    });

    const animateOnScroll = () => {
        featureRows.forEach((row, index) => {
            const rowTop = row.getBoundingClientRect().top;
            const isOdd = (index + 1) % 2 !== 0;
            const content = row.querySelector('.feature-content');
            const image = row.querySelector('.feature-image');

            if (rowTop < window.innerHeight * 0.75) {
                row.classList.add('active');
                content.style.opacity = '1';
                image.style.opacity = '1';

                if (isMobile) {
                    // Mobile animation
                    if (isOdd) {
                        content.style.transform = 'translateX(0)';
                        image.style.transform = 'translateX(0)';
                    } else {
                        content.style.transform = 'translateX(0)';
                        image.style.transform = 'translateX(0)';
                    }
                } else {
                    // Desktop animation
                    if (isOdd) {
                        content.style.transform = 'translateX(0)';
                        image.style.transform = 'translateX(0)';
                    } else {
                        content.style.transform = 'translateX(0)';
                        image.style.transform = 'translateX(0)';
                    }
                }
            } else {
                row.classList.remove('active');
                content.style.opacity = '0.3';
                image.style.opacity = '0.3';

                if (isMobile) {
                    if (isOdd) {
                        content.style.transform = 'translateX(-50px)';
                        image.style.transform = 'translateX(50px)';
                    } else {
                        content.style.transform = 'translateX(50px)';
                        image.style.transform = 'translateX(-50px)';
                    }
                } else {
                    if (isOdd) {
                        content.style.transform = 'translateX(-100px)';
                        image.style.transform = 'translateX(100px)';
                    } else {
                        content.style.transform = 'translateX(100px)';
                        image.style.transform = 'translateX(-100px)';
                    }
                }
            }
        });

        // Calculate progress
        const activeRows = document.querySelectorAll('.feature-row.active');
        const progressPercentage = (activeRows.length / featureRows.length) * 100;

        if (activeRows.length < featureRows.length) {
            timelineProgress.style.height = `${progressPercentage}%`;
        }
        else if (lastFeatureRow.classList.contains('active')) {
            timelineProgress.style.height = '100%';
        }
    };

    // Event listeners
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('resize', function () {
        // Re-run animations on resize
        animateOnScroll();
    });
    animateOnScroll(); // Initial call
});



// ------------------------------------------------------------------herro
document.addEventListener('DOMContentLoaded', function () {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#38b6ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.7,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#38b6ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 4,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.error("particlesJS library is not loaded");
    }
});

// --------------------------------------------------------------------newworkprocess
document.addEventListener('DOMContentLoaded', function () {
    const workProcessSection = document.querySelector('.work-process-section');

    // Set up observer for the entire section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // First make the section visible
                workProcessSection.classList.add('visible');

                // Then trigger individual animations
                animateElements();

                // Stop observing
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sectionObserver.observe(workProcessSection);

    function animateElements() {
        // Animate title and subtitle
        document.querySelector('.section-title').classList.add('animated');
        document.querySelector('.section-subtitle').classList.add('animated');

        // Animate process steps
        document.querySelectorAll('.process-step').forEach(step => {
            step.classList.add('animated');
        });

        // Animate center circle
        const centerCircle = document.querySelector('.process-center-circle');
        if (centerCircle) {
            centerCircle.classList.add('animated');
        }
    }
});

// -----------------------------------------------------------------------------------value
// Values 

document.addEventListener('DOMContentLoaded', function () {
    const sparkleContainer = document.querySelector('.sparkle-container');
    // Green color palette with different shades and transparencies
    const greenColors = [
        'rgba(102, 187, 106, 0.8)',  // Light green
        'rgba(76, 175, 80, 0.7)',     // Medium light green
        'rgba(67, 160, 71, 0.6)',     // Base green
        'rgba(56, 142, 60, 0.5)',     // Medium dark green
        'rgba(46, 125, 50, 0.4)',     // Dark green
        'rgba(27, 94, 32, 0.3)',      // Very dark green
        'rgba(129, 199, 132, 0.7)',   // Pale green
        'rgba(165, 214, 167, 0.6)',   // Very pale green
        'rgba(0, 100, 0, 0.5)',       // Forest green
        'rgba(144, 238, 144, 0.4)',   // Light green alternative
        'rgba(34, 139, 34, 0.5)',     // Forest green alternative
        'rgba(152, 251, 152, 0.3)'    // Mint green
    ];

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        // Random properties
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        const color = greenColors[Math.floor(Math.random() * greenColors.length)];

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${posX}%`;
        sparkle.style.top = `${posY}%`;
        sparkle.style.background = color;
        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.animationDelay = `${delay}s`;

        sparkleContainer.appendChild(sparkle);
    }
}); gsap.registerPlugin(ScrollTrigger);

// ------------------------------------ VISION ANIMATION
gsap.utils.toArray(".vision").forEach(section => {
    gsap.from(section.querySelector(".block-image"), {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true // This ensures it only animates once
        }
    });

    gsap.from(section.querySelector(".block-text"), {
        opacity: 0,
        x: 80,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
        }
    });
});

// ------------------------------------ MISSION ANIMATION
gsap.utils.toArray(".mission").forEach(section => {
    gsap.from(section.querySelector(".block-image"), {
        opacity: 0,
        x: 80,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
        }
    });

    gsap.from(section.querySelector(".block-text"), {
        opacity: 0,
        x: -80,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
        }
    });
});


// cta  

const callOrWhatsApp = document.getElementById('callOrWhatsApp');
callOrWhatsApp.addEventListener('click', function (e) {
    e.preventDefault();
    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = "tel:+917778048992"; // Mobile: Call
    } else {
        window.open("https://wa.me/917778048992", "_blank"); // Desktop: WhatsApp
    }
});
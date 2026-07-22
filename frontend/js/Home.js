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
///--------------------------------------------------------------------------------------

// Counter Animation - Improved Version
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000;
    let animationStarted = false; // Flag to prevent multiple triggers

    // Reset all counters to 0 initially
    counters.forEach(counter => {
        counter.innerText = '0';
    });

    function startCounting() {
        if (animationStarted) return;

        const aboutSection = document.querySelector('.about-section');
        const sectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            animationStarted = true;

            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                const updateCount = () => {
                    const currentCount = +counter.innerText;
                    if (currentCount < target) {
                        counter.innerText = Math.ceil(currentCount + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
        }
    }

    // Check on initial load
    startCounting();

    // Also check on scroll
    window.addEventListener('scroll', startCounting);
}

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
});




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



// OUR SERVICES 

// Service Cards Animation
document.addEventListener('DOMContentLoaded', function () {
    // Mobile accordion functionality
    const mobileHeaders = document.querySelectorAll('.mobile-service-header');

    mobileHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Toggle current item
            this.classList.toggle('active');
            const details = this.nextElementSibling;
            details.classList.toggle('active');

            // Close other open items
            document.querySelectorAll('.mobile-service-header').forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });
        });
    });

    // Desktop service switching
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            serviceItems.forEach(i => i.classList.remove('active'));

            // Add active to clicked item
            this.classList.add('active');

            // Show corresponding content
            const serviceId = this.getAttribute('data-service');
            document.querySelectorAll('.service-details').forEach(detail => {
                detail.classList.remove('active');
            });
            document.getElementById(serviceId).classList.add('active');
        });
    });

    // Initialize first service as active
    if (serviceItems.length > 0) {
        serviceItems[0].click();
    }
});




// our Clients 

document.addEventListener('DOMContentLoaded', function () {
    const clientSection = document.querySelector('.client-section');
    const clientRows = document.querySelectorAll('.client-row');

    // Initially hide the section for fade-in effect
    if (clientSection) {
        clientSection.style.opacity = '0';
        clientSection.style.visibility = 'hidden';
        clientSection.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    }

    // Duplicate logos for seamless looping (already done in HTML)

    // Intersection Observer to trigger animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Show the section
                if (clientSection) {
                    clientSection.style.opacity = '1';
                    clientSection.style.visibility = 'visible';
                }

                // Start all animations
                clientRows.forEach(row => {
                    row.style.animationPlayState = 'running';
                });
            } else {
                // Pause all animations when not visible
                clientRows.forEach(row => {
                    row.style.animationPlayState = 'paused';
                });
            }
        });
    }, {
        threshold: 0.1
    });

    if (clientSection) {
        observer.observe(clientSection);
    }
});


// WHY TECHORSES 
document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.reason-slide');
    const dots = document.querySelectorAll('.reason-dots .dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentIndex = 0;
    const visibleSlides = 3;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isTransitioning = false;

    // Clone slides for infinite loop
    const firstSlide = slides[0].cloneNode(true);
    const secondSlide = slides[1].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);
    const secondLastSlide = slides[slides.length - 2].cloneNode(true);

    sliderContainer.prepend(secondLastSlide);
    sliderContainer.prepend(lastSlide);
    sliderContainer.appendChild(firstSlide);
    sliderContainer.appendChild(secondSlide);

    // Update slides after cloning
    const allSlides = document.querySelectorAll('.reason-slide');
    currentIndex = 2; // Start at the first original slide

    // Update slider position
    function updateSlider() {
        const slideWidth = allSlides[0].offsetWidth;
        const offset = -currentIndex * slideWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        const activeDotIndex = (currentIndex - 2 + totalSlides) % totalSlides;
        dots[activeDotIndex].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex++;
        sliderContainer.style.transition = 'transform 0.5s ease';
        updateSlider();

        // Check if we've reached the end of cloned slides
        if (currentIndex >= allSlides.length - visibleSlides) {
            setTimeout(() => {
                sliderContainer.style.transition = 'none';
                currentIndex = 2;
                updateSlider();
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Previous slide
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex--;
        sliderContainer.style.transition = 'transform 0.5s ease';
        updateSlider();

        // Check if we've reached the beginning of cloned slides
        if (currentIndex <= 1) {
            setTimeout(() => {
                sliderContainer.style.transition = 'none';
                currentIndex = totalSlides + 1;
                updateSlider();
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Go to specific slide
    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = index + 2; // +2 because of cloned slides
        sliderContainer.style.transition = 'transform 0.5s ease';
        updateSlider();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Initialize slider
    function initSlider() {
        // Set initial position
        updateSlider();

        // Event listeners
        nextArrow.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        prevArrow.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide();
            });
        });

        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);

        // Infinite loop detection
        sliderContainer.addEventListener('transitionend', () => {
            if (currentIndex >= allSlides.length - visibleSlides || currentIndex <= 1) {
                sliderContainer.style.transition = 'none';
                if (currentIndex >= allSlides.length - visibleSlides) {
                    currentIndex = 2;
                } else {
                    currentIndex = totalSlides + 1;
                }
                updateSlider();
            }
        });

        // Start autoplay
        startAutoSlide();
    }

    initSlider();
});

// REVIEWS

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.testimonials-carousel');
    const testimonials = document.querySelectorAll('.testimonial-box');
    const container = document.querySelector('.testimonials-right');
    let currentIndex = 0;
    let autoPlayInterval;
    let isAnimating = false;
    const transitionDuration = 800; // Match CSS transition duration

    // Get container height to determine visibility bounds
    const containerHeight = container.offsetHeight;
    const visibilityThreshold = 100; // Additional pixels beyond container bounds

    // Calculate positions for all testimonials (stacked vertically)
    function positionTestimonials() {
        const isMobile = window.innerWidth <= 600;
        const isTablet = window.innerWidth <= 900;

        const centerPos = isMobile ? 230 : isTablet ? 240 : 250;
        const spacing = isMobile ? 200 : isTablet ? 220 : 240;
        
        const totalTestimonials = testimonials.length;

        // Position all testimonials in a vertical stack
        testimonials.forEach((testimonial, index) => {
            // Calculate position based on currentIndex
            let position;
            let scale;
            let opacity;
            let zIndex;
            let visibility = 'visible';

            // Calculate relative position to currentIndex
            let relativePos = (index - currentIndex + totalTestimonials) % totalTestimonials;

            if (relativePos === 0) {
                // Current center card
                position = centerPos;
                scale = 1;
                opacity = 1;
                zIndex = 10;
                testimonial.classList.add('center');
            } else if (relativePos === 1 || relativePos === totalTestimonials - 1) {
                // Adjacent cards (one above and one below)
                position = relativePos === 1 ? centerPos + spacing : centerPos - spacing;
                scale = 0.9;
                opacity = 0.7;
                zIndex = 5;
                testimonial.classList.remove('center');
            } else if (relativePos === 2 || relativePos === totalTestimonials - 2) {
                // Further cards (two above or below)
                position = relativePos === 2 ? centerPos + spacing * 2 : centerPos - spacing * 2;
                scale = 0.8;
                opacity = 0.5;
                zIndex = 1;
                testimonial.classList.remove('center');
            } else {
                // Very far cards (hidden)
                position = relativePos > 2 ? centerPos + spacing * 3 : centerPos - spacing * 3;
                scale = 0.7;
                opacity = 0;
                zIndex = 0;
                testimonial.classList.remove('center');
            }

            // Check if card is outside visible bounds
            const cardTop = position - (testimonial.offsetHeight * scale / 2);
            const cardBottom = position + (testimonial.offsetHeight * scale / 2);

            if (cardBottom < -visibilityThreshold || cardTop > containerHeight + visibilityThreshold) {
                visibility = 'hidden';
            }

            // Apply styles
            testimonial.style.top = `${position}px`;
            testimonial.style.transform = `scale(${scale})`;
            testimonial.style.opacity = opacity;
            testimonial.style.zIndex = zIndex;
            testimonial.style.visibility = visibility;
            testimonial.style.display = 'flex';
            testimonial.style.flexDirection = 'column';
            testimonial.style.overflow = 'hidden';
        });
    }

    // Initialize carousel
    positionTestimonials();

    // Auto-play the carousel (bottom to top)
    function startAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(() => {
            if (isAnimating) return;
            isAnimating = true;

            // Move to next testimonial (bottom to top)
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateCarousel();

            // Reset animation flag after transition completes
            setTimeout(() => {
                isAnimating = false;
            }, transitionDuration);
        }, 3000); // Change every 2 seconds
    }

    // Pause autoplay
    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Update carousel position
    function updateCarousel() {
        positionTestimonials();
    }

    // Start autoplay
    startAutoPlay();

    // Add hover event to center testimonial
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', function () {
            if (this.classList.contains('center')) {
                pauseAutoPlay();
            }
        });

        testimonial.addEventListener('mouseleave', function () {
            if (this.classList.contains('center')) {
                startAutoPlay();
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        positionTestimonials();
    });
});


// FAQS

function toggleFaq(element) {
    // Get the clicked FAQ box
    const faqBox = element.classList.contains('faq-box') ? element : element.closest('.faq-box');

    // Check if the clicked FAQ is already active
    const isActive = faqBox.classList.contains('active');

    // Close all FAQ boxes first
    document.querySelectorAll('.faq-box').forEach(box => {
        box.classList.remove('active');
    });

    // If the clicked FAQ wasn't active, open it
    if (!isActive) {
        faqBox.classList.add('active');
    }
}

// FOOTER

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

// Add this code inside your existing DOMContentLoaded event listener
// or merge it with your existing footer-related code

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

// TOOLS AND TECHNOLOGIES

// document.addEventListener('DOMContentLoaded', function () {
//     const filterButtons = document.querySelectorAll('.filter-btn');
//     const techItems = document.querySelectorAll('.tech-item');
//     const toggleBtn = document.querySelector('.filter-toggle');
//     const categoryFilter = document.querySelector('.category-filter');
//     const techGrid = document.querySelector('.tech-grid');
//     const sliderContainer = document.querySelector('.mobile-tech-slider-container');

//     if (sliderContainer && window.innerWidth <= 768) {
//         initMobileSlider();
//     }

//     function filterItems(category) {
//         let visibleCount = 0;

//         techItems.forEach(item => {
//             item.style.opacity = '0';
//             item.style.transform = 'scale(0.8)';
//             item.style.pointerEvents = 'none';

//             setTimeout(() => {
//                 if (category === 'all' || item.dataset.category === category) {
//                     item.style.display = 'flex';
//                     visibleCount++;
//                     setTimeout(() => {
//                         item.style.opacity = '1';
//                         item.style.transform = 'scale(1)';
//                         item.style.pointerEvents = 'auto';
//                     }, 50);
//                 } else {
//                     item.style.display = 'none';
//                 }

//                 techGrid.setAttribute('data-category-count', visibleCount);
//                 adjustGridLayout(visibleCount);
//             }, 200);
//         });
//     }

//     function adjustGridLayout(count) {
//         techGrid.style.gridTemplateColumns = '';
//         techGrid.style.maxWidth = '';
//         techGrid.style.margin = '';
//         techGrid.style.justifyContent = '';

//         if (window.innerWidth > 768) {
//             if (count <= 7) {
//                 techGrid.style.gridTemplateColumns = 'repeat(auto-fit, 120px)';
//                 techGrid.style.maxWidth = '900px';
//                 techGrid.style.margin = '0 auto';
//             } else {
//                 techGrid.style.gridTemplateColumns = 'repeat(auto-fit, 120px)';
//                 techGrid.style.justifyContent = 'center';
//             }
//         } else {
//             techGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
//             techGrid.style.justifyContent = 'center';
//         }
//     }

//     function initMobileSlider() {
//         const track = document.querySelector('.slider-track');
//         const dotsContainer = document.querySelector('.slider-dots');

//         track.innerHTML = '';
//         dotsContainer.innerHTML = '';

//         filterButtons.forEach((btn, index) => {
//             const slide = document.createElement('div');
//             slide.className = 'slider-slide';
//             slide.dataset.category = btn.dataset.category;

//             const categoryName = document.createElement('div');
//             categoryName.className = 'category-name';

//             let displayName = btn.textContent.trim();
//             if (btn.querySelector('.mobile-text')) {
//                 displayName = btn.querySelector('.mobile-text').textContent.trim();
//             }
//             if (btn.dataset.category === 'mobile') displayName = 'Mobile App';
//             if (btn.dataset.category === 'cloud') displayName = 'Cloud';

//             categoryName.textContent = displayName;
//             slide.appendChild(categoryName);

//             const dot = document.createElement('div');
//             dot.className = 'slider-dot';
//             dot.dataset.index = index;
//             dotsContainer.appendChild(dot);

//             track.appendChild(slide);
//         });

//         let currentSlide = 1;

//         function updateSlider() {
//             const slides = track.querySelectorAll('.slider-slide');
//             const slideWidth = slides[0].offsetWidth;
//             const containerWidth = sliderContainer.offsetWidth;
//             const newTransform = containerWidth / 2 - slideWidth / 2 - currentSlide * (slideWidth + 16);

//             track.style.transition = 'transform 0.3s ease';
//             track.style.transform = `translateX(${newTransform}px)`;

//             document.querySelectorAll('.slider-dot').forEach((dot, i) => {
//                 dot.classList.toggle('active', i === currentSlide);
//             });

//             slides.forEach((slide, i) => {
//                 slide.classList.remove('active', 'prev', 'next');
//                 if (i === currentSlide) {
//                     slide.classList.add('active');
//                 } else if (i === currentSlide - 1) {
//                     slide.classList.add('prev');
//                 } else if (i === currentSlide + 1) {
//                     slide.classList.add('next');
//                 }
//             });
//         }

//         dotsContainer.addEventListener('click', function (e) {
//             const dot = e.target.closest('.slider-dot');
//             if (!dot) return;
//             currentSlide = parseInt(dot.dataset.index);
//             updateSlider();
//             filterItems(filterButtons[currentSlide].dataset.category);
//         });

//         track.addEventListener('click', function (e) {
//             const slide = e.target.closest('.slider-slide');
//             if (!slide) return;
//             const clickedIndex = Array.from(track.children).indexOf(slide);
//             if (clickedIndex !== currentSlide) {
//                 currentSlide = clickedIndex;
//                 updateSlider();
//                 filterItems(filterButtons[currentSlide].dataset.category);
//             }
//         });

//         updateSlider();
//         filterItems(filterButtons[currentSlide].dataset.category);

//         window.addEventListener('resize', updateSlider);
//     }

//     function handleResize() {
//         if (window.innerWidth <= 768) {
//             if (!document.querySelector('.mobile-tech-slider')) {
//                 initMobileSlider();
//             }
//             if (toggleBtn) toggleBtn.style.display = 'none';
//             if (categoryFilter) categoryFilter.style.display = 'none';
//         } else {
//             const slider = document.querySelector('.mobile-tech-slider');
//             if (slider) slider.remove();
//             if (toggleBtn) toggleBtn.style.display = 'block';
//             if (categoryFilter) categoryFilter.style.display = 'flex';
//         }

//         const activeButton = document.querySelector('.filter-btn.active');
//         if (activeButton) {
//             const activeCategory = activeButton.dataset.category;
//             let visibleCount = 0;
//             techItems.forEach(item => {
//                 if (activeCategory === 'all' || item.dataset.category === activeCategory) {
//                     visibleCount++;
//                 }
//             });
//             adjustGridLayout(visibleCount);
//         }
//     }

//     filterButtons.forEach(button => {
//         button.addEventListener('click', function (e) {
//             e.preventDefault();
//             e.stopPropagation();

//             filterButtons.forEach(btn => btn.classList.remove('active'));
//             this.classList.add('active');

//             const category = this.dataset.category;
//             filterItems(category);

//             if (window.innerWidth <= 768) {
//                 const slider = document.querySelector('.mobile-tech-slider');
//                 if (slider) {
//                     const index = Array.from(filterButtons).indexOf(this);
//                     if (index >= 0) {
//                         const track = slider.querySelector('.slider-track');
//                         const dots = slider.querySelectorAll('.slider-dot');

//                         currentSlide = index;
//                         const slideWidth = track.children[0].offsetWidth;
//                         const newTransform = sliderContainer.offsetWidth / 2 - slideWidth / 2 - currentSlide * (slideWidth + 16);
//                         track.style.transform = `translateX(${newTransform}px)`;

//                         dots.forEach((dot, i) => {
//                             dot.classList.toggle('active', i === currentSlide);
//                         });
//                     }
//                 }
//             }
//         });
//     });

//     function initialize() {
//         const defaultButton = document.querySelector('.filter-btn[data-category="designing"]');
//         if (defaultButton) {
//             defaultButton.classList.add('active');
//             filterItems('designing');
//         }

//         handleResize();

//         setTimeout(() => {
//             techItems.forEach((item, index) => {
//                 setTimeout(() => {
//                     item.style.opacity = '1';
//                     item.style.transform = 'scale(1)';
//                 }, index * 50);
//             });
//         }, 300);
//     }

//     if (window.innerWidth <= 768 && sliderContainer) {
//         initMobileSlider();
//     }

//     window.addEventListener('resize', function () {
//         if (window.innerWidth <= 768 && !document.querySelector('.slider-track')) {
//             initMobileSlider();
//         }
//     });

//     window.addEventListener('resize', handleResize);
//     initialize();
// });


document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techItems = document.querySelectorAll('.tech-item');
    const sliderContainer = document.querySelector('.mobile-tech-slider-container');

    if (window.innerWidth <= 768 && sliderContainer) {
        initMobileSlider();
    } else {
        initDesktopFilters();
    }

    function initDesktopFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                filterItems(this.dataset.category);
            });
        });
        document.querySelector('.filter-btn[data-category="designing"]').classList.add('active');
        filterItems('designing');
    }

    function initMobileSlider() {
        const track = document.querySelector('.slider-track');
        const dotsContainer = document.querySelector('.slider-dots');

        track.innerHTML = '';
        dotsContainer.innerHTML = '';

        // Create 5 static dots (middle one always active)
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            if (i === 2) dot.classList.add('active'); // Only middle dot is active
            dotsContainer.appendChild(dot);
        }

        // Add empty slide at beginning for peeking effect
        const emptySlideStart = document.createElement('div');
        emptySlideStart.className = 'slider-slide empty';
        emptySlideStart.style.visibility = 'hidden';
        track.appendChild(emptySlideStart);

        // Create actual category slides
        filterButtons.forEach((btn, index) => {
            const slide = document.createElement('div');
            slide.className = 'slider-slide';
            slide.dataset.index = index;
            slide.dataset.category = btn.dataset.category;

            let displayName = btn.textContent.trim();
            if (btn.querySelector('.mobile-text')) {
                displayName = btn.querySelector('.mobile-text').textContent.trim();
            }
            if (btn.dataset.category === 'mobile') displayName = 'Mobile App';
            if (btn.dataset.category === 'cloud') displayName = 'Cloud';

            slide.innerHTML = `<div class="category-name">${displayName}</div>`;
            track.appendChild(slide);
        });

        // Add empty slide at end for peeking effect
        const emptySlideEnd = document.createElement('div');
        emptySlideEnd.className = 'slider-slide empty';
        emptySlideEnd.style.visibility = 'hidden';
        track.appendChild(emptySlideEnd);

        const slides = document.querySelectorAll('.slider-slide:not(.empty)');

        // Find designing index first
        let currentIndex = Array.from(filterButtons).findIndex(btn => btn.dataset.category === 'backend');
        if (currentIndex === -1) currentIndex = 0;

        // Position slides first
        positionSlides();

        // Use setTimeout to ensure DOM is fully updated before centering
        setTimeout(() => {
            goToSlide(currentIndex);
        }, 50);

        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => goToSlide(index));
        });

        let touchStartX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            isDragging = true;
            track.style.transition = 'none';
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touchX = e.touches[0].clientX;
            const diff = touchX - touchStartX;
            track.style.transform = `translateX(calc(-${currentIndex * 33.333}% + ${diff}px))`;
        });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchEndX - touchStartX;

            if (diff < -50 && currentIndex < slides.length - 1) {
                goToSlide(currentIndex + 1);
            } else if (diff > 50 && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex);
            }
        });

        function positionSlides() {
            const containerWidth = sliderContainer.offsetWidth;
            const slideWidth = containerWidth / 3;

            document.querySelectorAll('.slider-slide').forEach(slide => {
                slide.style.width = `${slideWidth}px`;
            });
        }

        function goToSlide(index) {
            currentIndex = index;

            // Get the active slide element
            const activeSlide = document.querySelector(`.slider-slide[data-index="${index}"]`);

            if (activeSlide) {
                // Calculate position to center the active slide
                const containerWidth = sliderContainer.offsetWidth;
                const slideWidth = activeSlide.offsetWidth;
                const slideLeft = activeSlide.offsetLeft;
                const centerPosition = (containerWidth / 2) - (slideWidth / 2);
                const transformValue = centerPosition - slideLeft;

                track.style.transition = 'transform 0.3s ease-out';
                track.style.transform = `translateX(${transformValue}px)`;
            }

            updateSlider();
            filterItems(filterButtons[index].dataset.category);
        }

        function updateSlider() {
            const slides = document.querySelectorAll('.slider-slide:not(.empty)');
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
            // No need to update dots since they're static
        }

        window.addEventListener('resize', positionSlides);
    }

    function filterItems(category) {
        techItems.forEach(item => {
            item.style.display = (category === 'all' || item.dataset.category === category)
                ? 'flex'
                : 'none';
        });
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.slider-track').children.length) {
                initMobileSlider();
            }
        } else {
            initDesktopFilters();
        }
    });
});






// Inquiry Animation 

document.addEventListener('DOMContentLoaded', function () {
    const inquirySection = document.querySelector('.inquiry-section');
    const icons = document.querySelectorAll('.icon-bg');

    // Only enable cursor interaction on desktop
    if (window.innerWidth > 768) {
        inquirySection.addEventListener('mousemove', function (e) {
            // Get mouse position
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Get section dimensions
            const rect = inquirySection.getBoundingClientRect();
            const sectionX = rect.left;
            const sectionY = rect.top;
            const sectionWidth = rect.width;
            const sectionHeight = rect.height;

            // Calculate relative position (0-1)
            const relX = (mouseX - sectionX) / sectionWidth;
            const relY = (mouseY - sectionY) / sectionHeight;

            // Move icons based on mouse position
            icons.forEach((icon, index) => {
                // Each icon responds with different speed
                const speed = 0.05 + (index * 0.02);
                const maxMovement = 30;

                // Calculate movement with easing
                const offsetX = (relX - 0.5) * maxMovement * speed;
                const offsetY = (relY - 0.5) * maxMovement * speed;

                // Apply transform with smooth transition
                icon.style.transition = 'transform 0.3s ease-out';
                icon.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });

        // Reset position when mouse leaves
        inquirySection.addEventListener('mouseleave', function () {
            icons.forEach(icon => {
                icon.style.transition = 'transform 0.5s ease-out';
                icon.style.transform = 'translate(0, 0)';
            });
        });
    }
});


// INQUIRY FORM CODE 

document.addEventListener('DOMContentLoaded', function () {
    const inquiryForm = document.getElementById('general-inquiry-form');
    const toastContainer = document.querySelector('.toast-container');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('inquiry-name').value.trim();
            const email = document.getElementById('inquiry-email').value.trim();
            const phone = document.getElementById('inquiry-phone').value.trim();
            const subject = document.getElementById('inquiry-subject').value.trim();
            const message = document.getElementById('inquiry-message').value.trim();

            const submitBtn = document.getElementById('inquiry-submit-btn');
            const loader = submitBtn.querySelector('.btn-loader');
            const btnText = submitBtn.querySelector('.btn-text');

            // 🔍 Phone validation: must be exactly 10 digits
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                showToast('Phone number must be exactly 10 digits.', 'error');
                return;
            }

            // 🔍 Email validation: must be a valid format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            const formData = { name, email, phone, subject, message };

            // Show loader
            btnText.style.display = 'none';
            loader.style.display = 'inline-block';
            submitBtn.disabled = true;

            try {
                const res = await fetch('https://api.techorses.com/api/general-inquiry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();

                if (data.success) {
                    document.getElementById("successSound").play();
                    showToast('Thanks! We will get in touch shortly.', 'success');
                    inquiryForm.reset();
                } else {
                    showToast('Something went wrong. Please try again.', 'error');
                }
            } catch (err) {
                console.error('Submission error:', err);
                showToast('Server error. Please try again later.', 'error');
            } finally {
                btnText.style.display = 'inline';
                loader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }


    // Toast function
    //   function showToast(message, type = 'success') {
    //     const toast = document.createElement('div');
    //     toast.className = `toast ${type}`;
    //     toast.textContent = message;

    //     toastContainer.appendChild(toast);

    //     setTimeout(() => {
    //       toast.classList.add('show');
    //     }, 100);

    //     setTimeout(() => {
    //       toast.classList.remove('show');
    //       setTimeout(() => toast.remove(), 300);
    //     }, 3000);
    //   }
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
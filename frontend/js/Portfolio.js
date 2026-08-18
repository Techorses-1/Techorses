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

// Initialize when DOM is loaded (NAVBAR)
document.addEventListener('DOMContentLoaded', function () {
    // ========== NAVBAR ELEMENTS ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = document.querySelector('.services-dropdown .nav-link');
    const dropdownContainer = document.querySelector('.dropdown-container');
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
    let isDropdownOpen = false;
    let isMobileMenuOpen = false;

    // ========== DROPDOWN TOGGLE FUNCTION ==========
    function toggleDropdown(open) {
        if (window.innerWidth > 992) {
            // Desktop behavior
            if (open === undefined) {
                isDropdownOpen = !isDropdownOpen;
            } else {
                isDropdownOpen = open;
            }

            if (isDropdownOpen) {
                dropdownContainer.style.opacity = '1';
                dropdownContainer.style.visibility = 'visible';
                dropdownContainer.style.pointerEvents = 'auto';
            } else {
                dropdownContainer.style.opacity = '0';
                dropdownContainer.style.visibility = 'hidden';
                dropdownContainer.style.pointerEvents = 'none';
            }
        } else {
            // Mobile behavior
            servicesDropdown.classList.toggle('active');
            const container = servicesDropdown.querySelector('.dropdown-container');
            if (servicesDropdown.classList.contains('active')) {
                container.style.display = 'flex';
                container.style.opacity = '1';
                container.style.visibility = 'visible';
            } else {
                container.style.display = 'none';
                container.style.opacity = '0';
                container.style.visibility = 'hidden';
            }
        }
    }

    // ========== MOBILE MENU TOGGLE ==========
    hamburger.addEventListener('click', function () {
        isMobileMenuOpen = !isMobileMenuOpen;
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        blurOverlay.classList.toggle('active');

        // Close dropdown when closing mobile menu
        if (!isMobileMenuOpen) {
            servicesDropdown.classList.remove('active');
            const container = servicesDropdown.querySelector('.dropdown-container');
            container.style.display = 'none';
            container.style.opacity = '0';
            container.style.visibility = 'hidden';
        }
    });

    // ========== OVERLAY CLICK ==========
    blurOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        this.classList.remove('active');
        isMobileMenuOpen = false;

        // Also close any open dropdowns
        servicesDropdown.classList.remove('active');
        const container = servicesDropdown.querySelector('.dropdown-container');
        container.style.display = 'none';
        container.style.opacity = '0';
        container.style.visibility = 'hidden';
    });

    // ========== DROPDOWN CLICK HANDLER ==========
    servicesLink.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown();
    });

    // ========== CLICK OUTSIDE HANDLER ==========
    document.addEventListener('click', function (e) {
        if (window.innerWidth > 992) {
            // Desktop - close dropdown when clicking outside
            if (!servicesDropdown.contains(e.target)) {
                toggleDropdown(false);
            }
        } else {
            // Mobile - close dropdown when clicking outside
            if (!servicesDropdown.contains(e.target) &&
                !e.target.classList.contains('nav-link')) {
                servicesDropdown.classList.remove('active');
                const container = servicesDropdown.querySelector('.dropdown-container');
                container.style.display = 'none';
                container.style.opacity = '0';
                container.style.visibility = 'hidden';
            }
        }
    });

    // ========== SCROLL HANDLER FOR DESKTOP ==========
    function setDefaultDropdownStyles() {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        const serviceColors = [
            '#e7fff2', '#e7fff2', '#e7fff2',
            '#e7fff2', '#e7fff2', '#e7fff2'
        ];

        dropdownItems.forEach((item, index) => {
            item.style.backgroundColor = serviceColors[index % serviceColors.length];
            item.style.color = '#333';
            if (item.querySelector('span')) {
                item.querySelector('span').style.color = '#333';
                if (item.querySelector('.second-line')) {
                    item.querySelector('.second-line').style.color = '#666';
                }
            }
        });
    }

    // Initialize dropdown styles
    if (window.innerWidth > 992) {
        setDefaultDropdownStyles();
    }

    // ========== MODAL FUNCTIONALITY ==========
    // const letsTalkBtn = document.querySelector('.btn-lets-talk');
    if (letsTalkBtn && letsTalkModal) {
        letsTalkBtn.addEventListener('click', function (e) {
            // For mobile, let the default href="tel:" behavior work
            if (window.innerWidth <= 992) {
                // Change the href to your phone number when in mobile view
                this.href = "tel:+917778048992";
                return; // Let the default link behavior work
            }

            // For desktop, prevent default and show modal
            e.preventDefault();
            letsTalkModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Rest of your modal code...
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

                const submitBtn = contactForm.querySelector('.submit-btn');
                const loader = submitBtn.querySelector('.btn-loader');
                const btnText = submitBtn.querySelector('.btn-text');

                const name = document.getElementById('name').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value;


                const recaptchaResponse = grecaptcha.getResponse();
                if (!recaptchaResponse) {
                    showToast('Please complete the reCAPTCHA verification.', 'error');
                    return;
                }

                // 🔍 Phone validation: must be exactly 10 digits
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(phone)) {
                    showToast('Phone number must be exactly 10 digits.', 'error');
                    return;
                }

                // 🔍 Email validation: must have @ and . after it
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showToast('Please enter a valid email address.', 'error');
                    return;
                }

                const formData = { name, phone, email, message, 'g-recaptcha-response': recaptchaResponse };

                // Show loader
                loader.style.display = 'inline-block';
                btnText.textContent = 'Sending...';

                try {
                    const res = await fetch('https://techorses.com/api/lets-talk', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });

                    const data = await res.json();

                    if (data.success) {
                        document.getElementById("successSound").play();
                        showToast("Thanks for reaching out! We'll contact you soon.", 'success');
                        grecaptcha.reset();
                        contactForm.reset();
                        letsTalkModal.classList.remove('active');
                        document.body.style.overflow = '';
                    } else {
                        showToast("Something went wrong. Please try again.", 'error');
                        grecaptcha.reset();
                    }
                } catch (error) {
                    console.error('Submission Error:', error);
                    grecaptcha.reset();

                    showToast("Server error. Try again later.", 'error');
                } finally {
                    loader.style.display = 'none';
                    btnText.textContent = 'Send Message';
                }
            });
        }
    }

    // ========== WINDOW RESIZE HANDLER ==========
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            // Reset mobile menu when resizing to desktop
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            blurOverlay.classList.remove('active');
            isMobileMenuOpen = false;
        }

        // Reinitialize scroll handler if hero section exists
        if (window.innerWidth > 992) {
            setDefaultDropdownStyles();
        }
    });


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



// Load Lottie animation
lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/asstes/Animation/portfolio animation.json' // Make sure this path is correct
});

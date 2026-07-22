// ============================================
// DATA DELETION POLICY PAGE - TECHORSES THEME
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ========== ACTIVE FOOTER LINK (SAME AS HOME PAGE) ==========
    // Get current page path
    const currentPath = window.location.pathname;

    // Find all footer links
    const footerLinks = document.querySelectorAll('.footer-link');

    // Check each link and add active class if it matches current page
    footerLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes(linkPath)) {
            link.classList.add('active-footer-link');
        }
    });

    // ========== NAVBAR ELEMENTS ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = document.querySelector('.services-toggle');
    const servicesContainer = document.querySelector('.services-dropdown .dropdown-container');
    const productsDropdown = document.querySelector('.products-dropdown');
    const productsLink = document.querySelector('.products-toggle');
    const productsContainer = document.querySelector('.products-dropdown-container');

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
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            isMobileMenuOpen = !isMobileMenuOpen;
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            blurOverlay.classList.toggle('active');

            if (!isMobileMenuOpen) {
                closeAllDropdowns();
            }
        });
    }

    // ========== OVERLAY CLICK ==========
    blurOverlay.addEventListener('click', function () {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        this.classList.remove('active');
        isMobileMenuOpen = false;
        closeAllDropdowns();
    });

    // ========== SERVICES CLICK ==========
    if (servicesLink) {
        servicesLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (isProductsOpen) toggleProducts(false);
            toggleServices();
        });
    }

    // ========== PRODUCTS CLICK ==========
    if (productsLink && productsDropdown) {
        productsLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (isServicesOpen) toggleServices(false);
            toggleProducts();
        });
    }

    // ========== CLICK OUTSIDE HANDLER ==========
    document.addEventListener('click', function (e) {
        const isClickInsideServices = servicesDropdown?.contains(e.target);
        const isClickInsideProducts = productsDropdown?.contains(e.target);
        const isClickOnToggle = e.target.classList?.contains('nav-link') || e.target.closest?.('.nav-link');

        if (!isClickInsideServices && !isClickInsideProducts && !isClickOnToggle) {
            closeAllDropdowns();
        }
    });

    // ========== MODAL FUNCTIONALITY ==========
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
                const name = document.getElementById('name')?.value.trim();
                const phone = document.getElementById('phone')?.value.trim();
                const email = document.getElementById('email')?.value.trim();
                const message = document.getElementById('message')?.value.trim();
                const submitBtn = document.querySelector('.submit-btn');
                const loader = submitBtn?.querySelector('.btn-loader');
                const btnText = submitBtn?.querySelector('.btn-text');

                if (!name || !phone || !email) {
                    showToast('Please fill all required fields', 'error');
                    return;
                }

                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(phone)) {
                    showToast('Phone number must be exactly 10 digits.', 'error');
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showToast('Please enter a valid email address.', 'error');
                    return;
                }

                if (btnText && loader) {
                    btnText.style.display = 'none';
                    loader.style.display = 'inline-block';
                }
                if (submitBtn) submitBtn.disabled = true;

                try {
                    const res = await fetch('https://api.techorses.com/api/general-inquiry', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, phone, email, message, subject: "Let's Talk Inquiry" })
                    });
                    const data = await res.json();
                    if (data.success) {
                        showToast('Thanks! We will get in touch shortly.', 'success');
                        contactForm.reset();
                        closeModal();
                    } else {
                        showToast('Something went wrong. Please try again.', 'error');
                    }
                } catch (err) {
                    console.error('Submission error:', err);
                    showToast('Server error. Please try again later.', 'error');
                } finally {
                    if (btnText && loader) {
                        btnText.style.display = 'inline';
                        loader.style.display = 'none';
                    }
                    if (submitBtn) submitBtn.disabled = false;
                }
            });
        }
    }

    // Toast notification function
    function showToast(message, type = 'success') {
        const toastContainer = document.querySelector('.toast-container') || (() => {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
            return container;
        })();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            margin-top: 10px;
            font-size: 14px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            text-align: center;
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ========== GO TO TOP BUTTON ==========
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (goToTopBtn) {
        window.addEventListener('scroll', function () {
            goToTopBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
        });
        goToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== WINDOW RESIZE HANDLER ==========
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            blurOverlay.classList.remove('active');
            isMobileMenuOpen = false;
            closeAllDropdowns();
        }
    });

    // ========== BECOME A CLIENT BUTTON ==========
    const becomeClientBtn = document.querySelector('.footer-social-wrapper button');
    if (becomeClientBtn && letsTalkModal) {
        becomeClientBtn.addEventListener('click', function (e) {
            e.preventDefault();
            letsTalkModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                blurOverlay.classList.remove('active');
                isMobileMenuOpen = false;
            }
        });
    }
});
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




// INFO SECTION ANIMATION 

function hideShapesBehindText() {
  const textBox = document.querySelector('.web-dev-info-container').getBoundingClientRect();
  const shapes = document.querySelectorAll('.floating-shape');

  shapes.forEach(shape => {
    const shapeBox = shape.getBoundingClientRect();

    const isOverlapping =
      !(shapeBox.right < textBox.left ||
        shapeBox.left > textBox.right ||
        shapeBox.bottom < textBox.top ||
        shapeBox.top > textBox.bottom);

    shape.style.opacity = isOverlapping ? '0' : '0.6';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const shapesContainer = document.querySelector('.floating-shapes-container');
  const greenColors = [
    'rgba(102, 187, 106, 0.6)',
    'rgba(76, 175, 80, 0.5)',
    'rgba(67, 160, 71, 0.4)',
    'rgba(56, 142, 60, 0.3)',
    'rgba(46, 125, 50, 0.3)',
    'rgba(27, 94, 32, 0.2)',
    'rgba(129, 199, 132, 0.5)',
    'rgba(165, 214, 167, 0.4)',
    'rgba(0, 100, 0, 0.3)',
    'rgba(144, 238, 144, 0.3)',
    'rgba(34, 139, 34, 0.3)',
    'rgba(152, 251, 152, 0.2)'
  ];

  const shapeCount = window.innerWidth < 768 ? 15 : 40; // More shapes!

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement('div');
    shape.className = 'floating-shape';

    // Random properties
    const size = Math.random() * 10 + 5; // 15–35px
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const color = greenColors[Math.floor(Math.random() * greenColors.length)];
    const blur = Math.random() * 2;

    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${posX}%`;
    shape.style.top = `${posY}%`;
    shape.style.background = color;
    shape.style.animationDuration = `${duration}s`;
    shape.style.animationDelay = `${delay}s`;
    shape.style.filter = `blur(${blur}px)`;

    shapesContainer.appendChild(shape);
  }

  // Initial call
  hideShapesBehindText();

  // Optional: recheck after slight delay to ensure layout is stable
  setTimeout(hideShapesBehindText, 500);

  // Optional: also on resize
  window.addEventListener('resize', hideShapesBehindText);
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

  const heroSection = document.querySelector('.hero-section');
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



// Services Section

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Set proper viewport to prevent zooming
  const viewportMeta = document.createElement('meta');
  viewportMeta.name = 'viewport';
  viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  document.head.appendChild(viewportMeta);

  // Prevent touch zooming
  // document.addEventListener('touchmove', function(e) {
  //   if (e.scale !== 1) e.preventDefault();
  // }, { passive: false });

  // Animation setup
  gsap.utils.toArray(".service-box").forEach((box, index) => {
    const isMobile = window.innerWidth <= 992;
    const fromX = index % 2 === 0 ? (isMobile ? -50 : -100) : (isMobile ? 50 : 100);

    // Create the animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        toggleActions: "play none none reverse",
        markers: false // Remove for production
      }
    });

    // Set initial state with mobile consideration
    gsap.set(box, {
      opacity: 0,
      x: fromX,
      // Force GPU acceleration
      willChange: "transform, opacity"
    });

    // Animation sequence
    tl.to(box, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Handle resize
    ScrollTrigger.addEventListener("refreshInit", () => {
      const newFromX = window.innerWidth <= 992 ?
        (index % 2 === 0 ? -50 : 50) :
        (index % 2 === 0 ? -100 : 100);
      gsap.set(box, { x: newFromX });
    });
  });

  // Refresh ScrollTrigger on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});


//******************************** */ Service Inquiry Modal Functionality - WORKING SOLUTION
document.addEventListener('DOMContentLoaded', function () {
  const letsStartButtons = document.querySelectorAll('.service-btn');
  const serviceModal = document.querySelector('.service-inquiry-modal');
  const serviceModalCloseBtn = document.querySelector('.service-modal-close-btn');
  const serviceModalOverlay = document.querySelector('.service-modal-overlay');
  const serviceForm = document.querySelector('.service-contact-form');
  const subjectSelect = document.getElementById('service-subject');

  let serviceRecaptchaWidgetId = null;
  let serviceRecaptchaResponse = null;

  // SIMPLE SOLUTION: Use auto-rendering with callbacks
  function initializeServiceRecaptcha() {
    const recaptchaContainer = serviceModal.querySelector('.g-recaptcha');
    if (!recaptchaContainer) return;

    // Clear container
    recaptchaContainer.innerHTML = '';

    // Create new reCAPTCHA with explicit parameters
    const recaptchaElement = document.createElement('div');
    recaptchaElement.className = 'g-recaptcha';
    recaptchaElement.setAttribute('data-sitekey', '6LdlcuwrAAAAAASzygwkisSbTa_4Fo2dmt1wMCWO');
    recaptchaElement.setAttribute('data-callback', 'handleServiceRecaptchaSuccess');
    recaptchaElement.setAttribute('data-expired-callback', 'handleServiceRecaptchaExpired');

    recaptchaContainer.appendChild(recaptchaElement);

    // Wait for grecaptcha to be available
    const checkGrecaptcha = setInterval(() => {
      if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
        clearInterval(checkGrecaptcha);
        try {
          serviceRecaptchaWidgetId = grecaptcha.render(recaptchaElement, {
            sitekey: '6LdlcuwrAAAAAASzygwkisSbTa_4Fo2dmt1wMCWO',
            callback: handleServiceRecaptchaSuccess,
            'expired-callback': handleServiceRecaptchaExpired
          });
          console.log('Service reCAPTCHA initialized successfully');
        } catch (error) {
          console.error('Error initializing reCAPTCHA:', error);
        }
      }
    }, 100);
  }

  // Global callback functions
  window.handleServiceRecaptchaSuccess = function (response) {
    console.log('reCAPTCHA success, token:', response.substring(0, 20) + '...');
    serviceRecaptchaResponse = response;
  };

  window.handleServiceRecaptchaExpired = function () {
    console.log('reCAPTCHA expired');
    serviceRecaptchaResponse = null;
  };

  // Open modal function
  function openServiceModal() {
    // Reset form
    if (subjectSelect) subjectSelect.selectedIndex = 0;
    if (serviceForm) serviceForm.reset();

    // Show modal
    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset reCAPTCHA state
    serviceRecaptchaResponse = null;

    // Initialize reCAPTCHA after a short delay to ensure modal is visible
    setTimeout(() => {
      initializeServiceRecaptcha();
    }, 300);
  }

  // Close modal function
  function closeServiceModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
    serviceRecaptchaResponse = null;
  }

  // Event listeners for opening modal
  letsStartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      openServiceModal();
    });
  });

  document.getElementById('heroServiceBtn')?.addEventListener('click', function (e) {
    e.preventDefault();
    openServiceModal();
  });

  // Event listeners for closing modal
  if (serviceModalCloseBtn) serviceModalCloseBtn.addEventListener('click', closeServiceModal);
  if (serviceModalOverlay) serviceModalOverlay.addEventListener('click', closeServiceModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
      closeServiceModal();
    }
  });

  // Form submission
  if (serviceForm) {
    serviceForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = serviceForm.querySelector('.service-submit-btn');
      const loader = submitBtn.querySelector('.btn-loader');
      const btnText = submitBtn.querySelector('.btn-text');

      const name = document.getElementById('service-name').value.trim();
      const phone = document.getElementById('service-phone').value.trim();
      const email = document.getElementById('service-email').value.trim();
      const subject = document.getElementById('service-subject').value;
      const message = document.getElementById('service-message').value.trim();

      // Validate reCAPTCHA
      if (!serviceRecaptchaResponse) {
        showToast('Please complete the reCAPTCHA verification.', 'error');
        return;
      }

      // Validate phone
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        showToast('Phone number must be exactly 10 digits.', 'error');
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      const formData = {
        name,
        phone,
        email,
        subject,
        message,
        'g-recaptcha-response': serviceRecaptchaResponse
      };

      // Show loader
      loader.style.display = 'inline-block';
      btnText.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const res = await fetch('https://techorses.com/api/service-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
          document.getElementById("successSound").play();
          showToast("Thank you! We'll contact you shortly.", 'success');
          serviceForm.reset();
          closeServiceModal();
        } else {
          showToast(data.message || "Something went wrong. Please try again.", 'error');
        }
      } catch (err) {
        console.error('Error:', err);
        showToast("Server error. Try again later.", 'error');
      } finally {
        loader.style.display = 'none';
        btnText.textContent = 'Send Message';
        submitBtn.disabled = false;

        // Reset reCAPTCHA for next use
        serviceRecaptchaResponse = null;
        if (serviceRecaptchaWidgetId !== null && typeof grecaptcha !== 'undefined') {
          grecaptcha.reset(serviceRecaptchaWidgetId);
        }
      }
    });
  }
});


function showToast(message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}


// Hero Section Button - Open Service Modal
document.getElementById('heroServiceBtn')?.addEventListener('click', function (e) {
  e.preventDefault();

  // Reset the select to default option
  const subjectSelect = document.getElementById('service-subject');
  if (subjectSelect) {
    subjectSelect.selectedIndex = 0;
  }

  // Show the modal
  const serviceModal = document.querySelector('.service-inquiry-modal');
  if (serviceModal) {
    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});


// Our Process Section
const steps = document.querySelectorAll(".step");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      steps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add("animate");
        }, index * 300); // 300ms delay between steps
      });
    }
  });
}, {
  threshold: 0.3
});

observer.observe(document.querySelector(".process-section"));


// FAQS Section

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



document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.software-dev-section .filter-btn');
  const techItems = document.querySelectorAll('.software-dev-section .tech-item');
  const sliderContainer = document.querySelector('.software-dev-section .mobile-tech-slider-container');

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
    document.querySelector('.software-dev-section .filter-btn[data-category="backend"]').classList.add('active');
    filterItems('backend');
  }

  function initMobileSlider() {
    const track = document.querySelector('.software-dev-section .slider-track');
    const dotsContainer = document.querySelector('.software-dev-section .slider-dots');

    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Create 3 static dots (middle one always active)
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
      slide.innerHTML = `<div class="category-name">${getShortName(btn.dataset.category)}</div>`;
      track.appendChild(slide);
    });

    // Add empty slide at end for peeking effect
    const emptySlideEnd = document.createElement('div');
    emptySlideEnd.className = 'slider-slide empty';
    emptySlideEnd.style.visibility = 'hidden';
    track.appendChild(emptySlideEnd);

    const slides = document.querySelectorAll('.software-dev-section .slider-slide:not(.empty)');

    // Start with backend as default
    let currentIndex = Array.from(filterButtons).findIndex(btn => btn.dataset.category === 'database');
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

      document.querySelectorAll('.software-dev-section .slider-slide').forEach(slide => {
        slide.style.width = `${slideWidth}px`;
      });
    }

    function goToSlide(index) {
      currentIndex = index;

      // Get the active slide element
      const activeSlide = document.querySelector(`.software-dev-section .slider-slide[data-index="${index}"]`);

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
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
      // No need to update dots since they're static
    }

    function getShortName(category) {
      const names = {
        'frontend': 'Frontend',
        'backend': 'Backend',
        'database': 'Database',
        'cloud': 'Cloud & DevOps',
        'apis': 'APIs',
        'designing': 'Design',
        'all': 'All'
      };
      return names[category] || category;
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
      if (!document.querySelector('.software-dev-section .slider-track').children.length) {
        initMobileSlider();
      }
    } else {
      initDesktopFilters();
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
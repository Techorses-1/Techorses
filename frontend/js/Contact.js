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



function initRecaptchas() {
  console.log("✅ Google reCAPTCHA script loaded");

  // Render contact page captcha
  const contactRecaptcha = document.getElementById('contact-recaptcha');
  if (contactRecaptcha) {
    window.contactRecaptchaWidgetId = grecaptcha.render('contact-recaptcha', {
      sitekey: '6LdlcuwrAAAAAASzygwkisSbTa_4Fo2dmt1wMCWO',
      theme: 'light',
      size: 'normal'
    });
    console.log("✅ Contact reCAPTCHA rendered!");
  }

  // Render Let's Talk modal captcha
  const modalRecaptcha = document.querySelector('.lets-talk-modal .g-recaptcha');
  if (modalRecaptcha) {
    window.modalRecaptchaWidgetId = grecaptcha.render(modalRecaptcha, {
      sitekey: '6LdlcuwrAAAAAASzygwkisSbTa_4Fo2dmt1wMCWO',
      theme: 'light',
      size: 'normal'
    });
    console.log("✅ Modal reCAPTCHA rendered!");
  }
}


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


// ========== PHONE NUMBER CLICK HANDLER ==========
const phoneLink = document.querySelector('.phone-link');
if (phoneLink) {
  phoneLink.addEventListener('click', function (e) {
    e.preventDefault();
    const phoneNumber = '917778048992'; // Without + for WhatsApp

    if (window.innerWidth > 992) {
      // Desktop - open WhatsApp
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    } else {
      // Mobile - make phone call
      window.location.href = `tel:+${phoneNumber}`;
    }
  });
}



// ========== CONTACT CARD PHONE CLICK HANDLER ==========
const phoneContactCard = document.querySelector('.phone-contact-card');
const phoneLinks = document.querySelectorAll('.phone-link');

function handlePhoneClick(e) {
  e.preventDefault();
  e.stopPropagation();
  const phoneNumber = '917778048992'; // Without + for WhatsApp

  if (window.innerWidth > 992) {
    // Desktop - open WhatsApp
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  } else {
    // Mobile - make phone call
    window.location.href = `tel:+${phoneNumber}`;
  }
}

if (phoneContactCard) {
  phoneContactCard.addEventListener('click', function (e) {
    // Only handle if clicked directly on the card (not on a child element)
    if (e.target === this) {
      handlePhoneClick(e);
    }
  });
}

phoneLinks.forEach(link => {
  link.addEventListener('click', handlePhoneClick);
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





// Contact Section Form - FIXED VERSION
document.addEventListener('DOMContentLoaded', function () {
  const contactFormSection = document.getElementById('contact-page-form');

  if (contactFormSection) {
    console.log('Contact form found - FIXED VERSION');

    let contactRecaptchaWidgetId;

    // Render reCAPTCHA explicitly for contact form
    // function renderContactRecaptcha() {
    //     const recaptchaContainer = document.getElementById('contact-recaptcha');
    //     if (recaptchaContainer && typeof grecaptcha !== 'undefined' && grecaptcha.render) {
    //         // Clear any existing reCAPTCHA
    //         recaptchaContainer.innerHTML = '';

    //         // Render new reCAPTCHA with explicit parameters
    //         contactRecaptchaWidgetId = grecaptcha.render('contact-recaptcha', {
    //             'sitekey': '6LdlcuwrAAAAAASzygwkisSbTa_4Fo2dmt1wMCWO',
    //             'theme': 'light',
    //             'size': 'normal'
    //         });
    //         console.log('Contact reCAPTCHA rendered with ID:', contactRecaptchaWidgetId);
    //     } else {
    //         setTimeout(renderContactRecaptcha, 100);
    //     }
    // }

    // Initialize reCAPTCHA after it's loaded
    // function waitForRecaptchaAndRender() {
    //     if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
    //         console.log('reCAPTCHA is ready, rendering contact form reCAPTCHA');
    //         renderContactRecaptcha();
    //     } else {
    //         setTimeout(waitForRecaptchaAndRender, 100);
    //     }
    // }

    // Start the process
    // setTimeout(waitForRecaptchaAndRender, 1000);

    contactFormSection.addEventListener('submit', async function (e) {
      e.preventDefault();
      console.log('Contact form submission started');

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const submitBtn = document.getElementById('contact-submit-btn');
      const loader = submitBtn.querySelector('.btn-loader');
      const btnText = submitBtn.querySelector('.btn-text');

      // Check if reCAPTCHA is available
      if (typeof grecaptcha === 'undefined') {
        showToast('Security check is loading. Please refresh the page.', 'error');
        return;
      }

      // Get reCAPTCHA response using the specific widget ID
      let recaptchaResponse;
      if (contactRecaptchaWidgetId !== undefined) {
        recaptchaResponse = grecaptcha.getResponse(contactRecaptchaWidgetId);
        console.log('Using specific widget ID:', contactRecaptchaWidgetId);
      } else {
        // Fallback: try to get any response
        recaptchaResponse = grecaptcha.getResponse();
        console.log('Using fallback getResponse()');
      }

      console.log('Contact reCAPTCHA Response length:', recaptchaResponse ? recaptchaResponse.length : 0);
      console.log('Contact reCAPTCHA Widget ID:', contactRecaptchaWidgetId);

      if (!recaptchaResponse) {
        showToast('Please complete the reCAPTCHA verification.', 'error');

        // Visual feedback
        const recaptchaElement = document.getElementById('contact-recaptcha');
        if (recaptchaElement) {
          recaptchaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          recaptchaElement.style.outline = '3px solid red';
          recaptchaElement.style.borderRadius = '4px';
          setTimeout(() => {
            recaptchaElement.style.outline = 'none';
          }, 3000);
        }
        return;
      }

      // Phone validation - must be exactly 10 digits
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        showToast('Phone number must be exactly 10 digits.', 'error');
        return;
      }

      // Email validation - must contain @ and . after @
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      const formData = {
        name,
        email,
        phone,
        subject,
        message,
        'g-recaptcha-response': recaptchaResponse
      };

      console.log('Submitting contact form with valid reCAPTCHA');

      // Show loader
      btnText.style.display = 'none';
      loader.style.display = 'inline-block';
      submitBtn.disabled = true;

      try {
        const res = await fetch('https://techorses.com/api/general-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log('Contact form server response:', data);

        if (data.success) {
          document.getElementById("successSound").play();
          showToast('Thanks! We will get in touch shortly.', 'success');
          // Reset the specific reCAPTCHA widget
          if (contactRecaptchaWidgetId !== undefined) {
            grecaptcha.reset(contactRecaptchaWidgetId);
          } else {
            grecaptcha.reset();
          }
          contactFormSection.reset();
        } else {
          showToast(data.message || 'Something went wrong. Please try again.', 'error');
          if (contactRecaptchaWidgetId !== undefined) {
            grecaptcha.reset(contactRecaptchaWidgetId);
          } else {
            grecaptcha.reset();
          }
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        showToast('Server error. Please try again later.', 'error');
        if (contactRecaptchaWidgetId !== undefined) {
          grecaptcha.reset(contactRecaptchaWidgetId);
        } else {
          grecaptcha.reset();
        }
      } finally {
        btnText.style.display = 'inline';
        loader.style.display = 'none';
        submitBtn.disabled = false;
      }
    });

    // Debug function to check reCAPTCHA status
    window.debugContactRecaptcha = function () {
      console.log('=== CONTACT reCAPTCHA DEBUG INFO ===');
      console.log('grecaptcha defined:', typeof grecaptcha !== 'undefined');
      console.log('Contact reCAPTCHA Widget ID:', contactRecaptchaWidgetId);

      if (typeof grecaptcha !== 'undefined') {
        let response;
        if (contactRecaptchaWidgetId !== undefined) {
          response = grecaptcha.getResponse(contactRecaptchaWidgetId);
          console.log('Specific widget response length:', response.length);
        } else {
          response = grecaptcha.getResponse();
          console.log('Fallback response length:', response.length);
        }
        console.log('reCAPTCHA container:', document.getElementById('contact-recaptcha'));
      }
      console.log('Contact form found:', !!contactFormSection);
      console.log('========================');
    };


    // ========== REACH OUT BUTTON ==========
    const reachOutBtn = document.getElementById('reachOutBtn');
    if (reachOutBtn) {
      reachOutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // Open the Let's Talk modal the same way the header button does
        const letsTalkModal = document.querySelector('.lets-talk-modal');
        if (letsTalkModal) {
          letsTalkModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  }
});
















// Toast functions
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  const container = document.querySelector('.toast-container') || createToastContainer();
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}



// Toast functions
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  const container = document.querySelector('.toast-container') || createToastContainer();
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}












// Show Toast Function
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

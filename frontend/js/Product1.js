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

    // ========== SET ACTIVE PRODUCTS DROPDOWN ITEM BASED ON CURRENT PAGE ==========
  function setActiveProductsDropdownItem() {
    const currentPage = window.location.pathname;
    const productsItems = document.querySelectorAll('.products-dropdown .dropdown-item');
    
    productsItems.forEach(item => {
      const itemHref = item.getAttribute('href');
      if (itemHref && currentPage.includes(itemHref)) {
        item.classList.add('active');
      }
    });
  }
  
  setActiveProductsDropdownItem();
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


// Initialize button as hidden
document.getElementById('goToTopBtn').style.display = 'none';





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



observer.observe(document.querySelector(".process-section"));







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








// Video Controls - FIXED VERSION
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('productVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = playPauseBtn.querySelector('i');
  const videoContainer = document.querySelector('.video-container');

  // Function to toggle play/pause
  function togglePlayPause() {
    if (video.paused) {
      video.play().catch(error => {
        console.log('Play failed:', error);
      });
      playIcon.className = 'fas fa-pause';
    } else {
      video.pause();
      playIcon.className = 'fas fa-play';
    }
  }

  // Toggle play/pause when clicking the button
  playPauseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    togglePlayPause();
  });

  // Toggle play/pause when clicking on video container
  videoContainer.addEventListener('click', function (e) {
    // Only trigger if the click is not on the button itself
    if (!playPauseBtn.contains(e.target)) {
      togglePlayPause();
    }
  });

  // Update button icon based on video state
  video.addEventListener('play', function () {
    playIcon.className = 'fas fa-pause';
  });

  video.addEventListener('pause', function () {
    playIcon.className = 'fas fa-play';
  });

  // Handle video loading and autoplay
  video.addEventListener('loadeddata', function () {
    // Try to play the video (muted for autoplay)
    video.muted = true;
    video.play().then(() => {
      console.log('Video autoplay started');
      playIcon.className = 'fas fa-pause';
    }).catch(error => {
      console.log('Autoplay failed:', error);
      // Show play button if autoplay fails
      playIcon.className = 'fas fa-play';
    });
  });

  // Fallback: if video fails to load, ensure we have proper state
  video.addEventListener('error', function () {
    console.log('Video loading error');
    playIcon.className = 'fas fa-play';
  });
});





// Industries Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');

  let currentIndex = 0;
  let autoSlideInterval;
  const totalCards = 4; // Actual unique cards
  let cardsToShow = getCardsToShow();

  // Get number of cards to show based on screen width
  function getCardsToShow() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 575) return 1;
    if (window.innerWidth <= 767) return 2;
    if (window.innerWidth <= 992) return 3;
    return 4;
  }

  // Calculate and update slider position
  function updateSlider() {
    cardsToShow = getCardsToShow();
    const cardElement = document.querySelector('.industry-card');
    if (!cardElement) return;

    const cardWidth = cardElement.offsetWidth;
    const gap = 32; // 2rem in pixels
    const translateValue = -(currentIndex * (cardWidth + gap));

    sliderTrack.style.transform = `translateX(${translateValue}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Enable/disable arrows (remove disabled for infinite loop)
    if (prevBtn && nextBtn) {
      // We don't disable for infinite loop
    }
  }

  // Next slide
  function nextSlide() {
    cardsToShow = getCardsToShow();
    if (currentIndex < totalCards - 1) {
      currentIndex++;
    } else {
      // Loop back to start
      currentIndex = 0;
    }
    updateSlider();
  }

  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // Loop to end
      currentIndex = totalCards - 1;
    }
    updateSlider();
  }

  // Auto slide function
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // Pause auto-slide on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newCardsToShow = getCardsToShow();
      if (currentIndex > totalCards - newCardsToShow) {
        currentIndex = Math.max(0, totalCards - newCardsToShow);
      }
      updateSlider();
    }, 250);
  });

  // Initialize
  updateSlider();
  startAutoSlide();

  // Get Demo button
  const demoBtn = document.getElementById('productDemoBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      alert('Demo request sent! We\'ll contact you soon.');
    });
  }
});
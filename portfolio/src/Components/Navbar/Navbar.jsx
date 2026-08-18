import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight, faCode, faPencilRuler, faMobileAlt, faTimes,
  faLaptopCode, faBullhorn, faPaintBrush, faCube, faShoppingCart,
  faGlobe,

  faPenRuler,

  faChevronDown,
  faUserTie,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo1 from '../../assets/logo/Logo.png';
import logo2 from '../../assets/logo/Main_logo.png';
import logo3 from '../../assets/logo/Techorses_Logo.png';
import { Link } from 'react-router-dom';
import defaultImage from "../../assets/Images/navbar/snowman.png";
import hoverImage from "../../assets/Images/navbar/hoversnowman.png";

const Navbar = () => {
  // State variables
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortfolioMobileMenuOpen, setIsPortfolioMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);
  const location = useLocation();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const [errors, setErrors] = useState({});
  const [showHoverImage, setShowHoverImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPortfolioNav, setShowPortfolioNav] = useState(false);
  const [activePortfolioDropdown, setActivePortfolioDropdown] = useState(null);
  const [activeDropdownItem, setActiveDropdownItem] = useState(null);

  // Handle scroll for navbar transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isDesktop = window.innerWidth > 992;
      setIsScrolled(scrollY > 10);
      if (isDesktop) {
        const scrolledPast70vh = scrollY > 0.7 * window.innerHeight;
        setShowPortfolioNav(scrolledPast70vh);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ========== DROPDOWN TOGGLES ==========
  const toggleDropdown = (open) => {
    if (window.innerWidth <= 992) {
      setIsDropdownOpen(prev => !prev);
      setIsProductsOpen(false);
      return;
    }
    if (open === undefined) {
      setIsDropdownOpen(prev => !prev);
    } else {
      setIsDropdownOpen(open);
    }
    if (open !== false) {
      setIsProductsOpen(false);
    }
  };

  const toggleProducts = (open) => {
    if (window.innerWidth <= 992) {
      setIsProductsOpen(prev => !prev);
      setIsDropdownOpen(false);
      return;
    }
    if (open === undefined) {
      setIsProductsOpen(prev => !prev);
    } else {
      setIsProductsOpen(open);
    }
    if (open !== false) {
      setIsDropdownOpen(false);
    }
  };

  // ========== MOBILE MENU TOGGLE ==========
  const toggleMobileMenu = () => {
    const willOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(willOpen);
    if (!willOpen) {
      setIsDropdownOpen(false);
      setIsProductsOpen(false);
    }
    document.body.style.overflow = willOpen ? 'hidden' : '';
  };

  // ========== OUTSIDE CLICK HANDLER ==========
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (window.innerWidth > 992) {
        const services = document.querySelector('.services-dropdown');
        const products = document.querySelector('.products-dropdown');
        if (services && !services.contains(e.target) && products && !products.contains(e.target)) {
          setIsDropdownOpen(false);
          setIsProductsOpen(false);
        }
      } else {
        // Mobile – close when clicking outside both dropdowns (handled by blur overlay)
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Close dropdowns when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
        // Optionally close dropdowns on resize
        setIsDropdownOpen(false);
        setIsProductsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Snowflakes generation (unchanged)
  useEffect(() => {
    const generateSnowflakes = () => {
      const newSnowflakes = [];
      for (let i = 0; i < 40; i++) {
        newSnowflakes.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 15 + 20}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.7 + 0.3,
          size: Math.random() * 4 + 2
        });
      }
      setSnowflakes(newSnowflakes);
    };
    generateSnowflakes();
  }, []);

  // Modal functions (unchanged)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // Don't lock body scroll when modal is open - this allows background scrolling
    // document.body.style.overflow = isModalOpen ? '' : 'hidden';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowBubbles(false);
    setErrors({});

    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://techorses.com/api/lets-talk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Thanks for reaching out! We'll contact you soon.", { position: "top-center", autoClose: 3000 });
        setFormData({ name: '', phone: '', email: '', message: '' });
        setShowBubbles(false);
        toggleModal();
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.", { position: "top-center", autoClose: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = (e) => {
    if (!isSubmitting) {
      setIsButtonClicked(true);
      setShowBubbles(true);
      setTimeout(() => {
        setIsButtonClicked(false);
        setShowBubbles(false);
      }, 1000);
    }
  };

  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  // Portfolio services data (unchanged)
  const portfolioServices = [
    { name: 'WEBSITE', link: '/website', activePath: '/website' },
    { name: 'SOFTWARE', link: '/custom-software', activePath: '/custom-software' },
    { name: 'MARKETING', link: '/marketing', activePath: '/marketing' },
    { name: 'GRAPHIC', link: '/graphicdesign', activePath: '/graphicdesign' },
    { name: 'UI/UX', link: '/uiux', activePath: '/uiux' },
    // { name: 'MOBILE APP', link: '/mobile', activePath: '/mobile' },
  ];

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} style={{ zIndex: 9999 }} />

      {/* MAIN HEADER */}
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${showPortfolioNav ? 'hidden' : ''}`}>
        <div className="navbar-container">
          <div className="logo-section">
            <div className="logo">
              <a href="/">
                <img src={logo1} alt="Desktop Logo" className="logo-desktop logo-default" draggable="false" />
                <img src={logo2} alt="Mobile Logo" className="logo-mobile" draggable="false" />
              </a>
            </div>
          </div>

          <div className="wave-divider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="750"
              height="900"
              viewBox="0 0 506.25 675.000002"
              preserveAspectRatio="xMidYMid meet"
              zoomAndPan="magnify"
              version="1.2"
            >
              <defs>
                <clipPath id="clip1">
                  <path d="M 0 0 L 505.5 0 L 505.5 674 L 0 674 Z M 0 0" />
                </clipPath>
                <clipPath id="clip2">
                  <path d="M 0 1 L 497 1 L 497 674 L 0 674 Z M 0 1" />
                </clipPath>
                <clipPath id="clip3">
                  <path d="M -101.097656 31.535156 L 264.707031 -80.855469 L 496.75 674.378906 L 130.941406 786.773438 Z M -101.097656 31.535156" />
                </clipPath>
                <clipPath id="clip4">
                  <path d="M -101.097656 31.535156 L 264.707031 -80.855469 L 496.75 674.378906 L 130.941406 786.773438 Z M -101.097656 31.535156" />
                </clipPath>
                <clipPath id="clip5">
                  <path d="M 0 313.679688 L 103.054688 313.679688 L 103.054688 674 L 0 674 Z M 0 313.679688" />
                </clipPath>
              </defs>

              <g id="layer1">
                <g clipRule="nonzero" clipPath="url(#clip1)">
                  <path
                    d="M 0 0 L 505.5 0 L 505.5 674 L 0 674 Z M 0 0"
                    style={{ stroke: "none", fillRule: "nonzero", fill: "#ffffff", fillOpacity: 1 }}
                  />
                  <path
                    d="M 0 0 L 505.5 0 L 505.5 674 L 0 674 Z M 0 0"
                    style={{ stroke: "none", fillRule: "nonzero", fill: "#081427", fillOpacity: 1 }}
                  />
                </g>

                <g clipRule="nonzero" clipPath="url(#clip2)">
                  <g clipRule="nonzero" clipPath="url(#clip3)">
                    <g clipRule="nonzero" clipPath="url(#clip4)">
                      <path
                        d="M 496.726562 674.121094 L 130.867188 786.527344 L -101.023438 31.78125 L -1.421875 1.175781 C 32.308594 24.113281 73.171875 58.878906 105.445312 110.097656 C 174.917969 220.3125 146.628906 314.585938 175.085938 407.648438 C 200.128906 489.558594 275.328125 590.765625 496.726562 674.121094"
                        style={{ stroke: "none", fillRule: "nonzero", fill: "#ffffff", fillOpacity: 1 }}
                      />
                    </g>
                  </g>
                </g>

                <g clipRule="nonzero" clipPath="url(#clip5)">
                  <path
                    d="M -101.101562 313.679688 L 103.054688 313.679688 L 103.054688 736.34375 L -101.101562 736.34375 Z M -101.101562 313.679688"
                    style={{ stroke: "none", fillRule: "nonzero", fill: "#ffffff", fillOpacity: 1 }}
                  />
                </g>
              </g>
            </svg>
          </div>

          <div className="nav-section">
            <nav className="navbar">
              <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <li className="nav-item"><a href="/index.html" className="nav-link">HOME</a></li>
                <li className="nav-item"><a href="/company.html" className="nav-link">COMPANY</a></li>
                {/* NEW PRODUCTS DROPDOWN */}
                <li className="nav-item products-dropdown">
                  <a
                    href="#"
                    className="nav-link products-toggle"
                    onClick={(e) => { e.preventDefault(); toggleProducts(); e.stopPropagation(); }}
                  >
                    PRODUCTS <FontAwesomeIcon icon={faChevronRight} className="dropdown-icon" />
                  </a>
                  <div
                    className={` products-dropdown-container dropdown-container ${isProductsOpen ? 'active' : ''}`}
                    style={window.innerWidth > 992 ? { opacity: isProductsOpen ? 1 : 0, visibility: isProductsOpen ? 'visible' : 'hidden' } : {}}
                  >
                    <div className="dropdown-content">
                      <a href="/products/core.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faCube} />
                        <div className="dropdown-item-content">
                          <span>Th <span className="second-line">Core</span></span>
                        </div>
                      </a>
                      <a href="/products/vend.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <div className="dropdown-item-content">
                          <span>Th <span className="second-line">Vend</span></span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                {/* SERVICES DROPDOWN */}
                <li className="nav-item services-dropdown">
                  <a
                    href="#"
                    className="nav-link services-toggle"
                    onClick={(e) => { e.preventDefault(); toggleDropdown(); e.stopPropagation(); }}
                  >
                    SERVICES <FontAwesomeIcon icon={faChevronRight} className="dropdown-icon" />
                  </a>
                  <div
                    className={`dropdown-container services-dropdown-container ${isDropdownOpen ? 'active' : ''}`}
                    style={window.innerWidth > 992 ? { opacity: isDropdownOpen ? 1 : 0, visibility: isDropdownOpen ? 'visible' : 'hidden' } : {}}
                  >
                    <div className="dropdown-content">
                      <a href="/webdevelopment.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faCode} />
                        <div className="dropdown-item-content">
                          <span>Web<br /><span className="second-line">Development</span></span>
                        </div>
                      </a>
                      <a href="/customsoftware.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faLaptopCode} />
                        <div className="dropdown-item-content">
                          <span>Custom<br /><span className="second-line">Software</span></span>
                        </div>
                      </a>
                      <a href="/marketingsolution.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faBullhorn} />
                        <div className="dropdown-item-content">
                          <span>Marketing<br /><span className="second-line">Solution</span></span>
                        </div>
                      </a>
                      <a href="/graphicdesign.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faPaintBrush} />
                        <div className="dropdown-item-content">
                          <span>Graphic<br /><span className="second-line">Design</span></span>
                        </div>
                      </a>
                      <a href="/uiux.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faPencilRuler} />
                        <div className="dropdown-item-content">
                          <span>UI/UX<br /><span className="second-line">Design</span></span>
                        </div>
                      </a>
                      <a href="/mobileapp.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faMobileAlt} />
                        <div className="dropdown-item-content">
                          <span>Mobile<br /><span className="second-line">App</span></span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>



                <li className="nav-item"><a href="/portfolio/" className="nav-link active">PORTFOLIO</a></li>
                <li className="nav-item"><a href="/contact.html" className="nav-link">CONTACT</a></li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link btn-lets-talk"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        window.location.href = "tel:+917778048992";
                      } else {
                        e.preventDefault();
                        toggleModal();
                      }
                    }}
                  >
                    Let's Talk
                  </a>
                </li>
              </ul>

              <div
                className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
              >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* PORTFOLIO HEADER - FIXED ACTIVE STATES */}
      <header className={`header portfolio-header ${isScrolled ? 'scrolled' : ''} ${!showPortfolioNav ? 'hidden' : ''}`}>
        <div className="navbar-container">
          <div className="logo-section">
            <div className="logo">
              <a href="/portfolio">
                <img src={logo1} alt="Desktop Logo" className="logo-desktop logo-default" draggable="false" />
                <img src={logo3} alt="Mobile Logo" className="logo-mobile" draggable="false" />
              </a>
            </div>
          </div>

          <div className="wave-divider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="750"
              height="900"
              viewBox="0 0 506.25 675.000002"
              preserveAspectRatio="xMidYMid meet"
              zoomAndPan="magnify"
              version="1.2"
            >
              <defs>
                <clipPath id="clip7">
                  <path d="M 0 0 L 505.5 0 L 505.5 674 L 0 674 Z M 0 0" />
                </clipPath>
                <clipPath id="clip8">
                  <path d="M 0 1 L 497 1 L 497 674 L 0 674 Z M 0 1" />
                </clipPath>
                <clipPath id="clip9">
                  <path d="M -101.097656 31.535156 L 264.707031 -80.855469 L 496.75 674.378906 L 130.941406 786.773438 Z M -101.097656 31.535156" />
                </clipPath>
                <clipPath id="clip10">
                  <path d="M -101.097656 31.535156 L 264.707031 -80.855469 L 496.75 674.378906 L 130.941406 786.773438 Z M -101.097656 31.535156" />
                </clipPath>
                <clipPath id="clip11">
                  <path d="M 0 313.679688 L 103.054688 313.679688 L 103.054688 674 L 0 674 Z M 0 313.679688" />
                </clipPath>
              </defs>
              <g id="layer1">
                <g clipRule="nonzero" clipPath="url(#clip7)">
                  <path
                    d="M 0 0 L 505.5 0 L 505.5 674 L 0 674 Z M 0 0"
                    style={{ stroke: "none", fillRule: "nonzero", fill: "#ffffff", fillOpacity: 1 }}
                  />
                  <path
                    d="M 0 0 L 505.5 0 L 505.5 674 L 0 674 Z M 0 0"
                    style={{ stroke: "none", fillRule: "nonzero", fill: "#081427", fillOpacity: 1 }}
                  />
                </g>
                <g clipRule="nonzero" clipPath="url(#clip8)">
                  <g clipRule="nonzero" clipPath="url(#clip9)">
                    <g clipRule="nonzero" clipPath="url(#clip10)">
                      <path
                        d="M 496.726562 674.121094 L 130.867188 786.527344 L -101.023438 31.78125 L -1.421875 1.175781 C 32.308594 24.113281 73.171875 58.878906 105.445312 110.097656 C 174.917969 220.3125 146.628906 314.585938 175.085938 407.648438 C 200.128906 489.558594 275.328125 590.765625 496.726562 674.121094"
                        style={{ stroke: "none", fillRule: "nonzero", fill: "#ffffff", fillOpacity: 1 }}
                      />
                    </g>
                  </g>
                </g>
                <g clipRule="nonzero" clipPath="url(#clip11)">
                  <path
                    d="M -101.101562 313.679688 L 103.054688 313.679688 L 103.054688 736.34375 L -101.101562 736.34375 Z M -101.101562 313.679688"
                    style={{ stroke: "none", fillRule: "nonzero", fill: "#ffffff", fillOpacity: 1 }}
                  />
                </g>
              </g>
            </svg>
          </div>

          <div className="nav-section">
            <nav className="navbar">
              <ul className={`nav-menu ${isPortfolioMobileMenuOpen ? 'active' : ''}`}>
                {/* WEBSITE - WITH DROPDOWN */}
                <li
                  className={`nav-item portfolio-service-item has-dropdown ${location.pathname === '/website' ? 'active' : ''} ${activePortfolioDropdown === 'website' ? 'dropdown-active' : ''}`}
                  onMouseEnter={() => window.innerWidth > 992 && setActivePortfolioDropdown('website')}
                  onMouseLeave={() => window.innerWidth > 992 && setActivePortfolioDropdown(null)}
                >
                  <a
                    href="#"
                    className="nav-link dropdown-trigger"
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePortfolioDropdown(activePortfolioDropdown === 'website' ? null : 'website');
                    }}
                  >
                    <span>WEBSITE</span>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                  </a>
                  <div className={`portfolio-dropdown-container ${activePortfolioDropdown === 'website' ? 'show' : ''}`}>
                    <div className="portfolio-dropdown-content">
                      <Link
                        to="/website"
                        state={{ type: 'direct' }}
                        className={`portfolio-dropdown-item ${location.pathname === '/website' && location.state?.type === 'direct' ? 'active' : ''}`}
                        onClick={() => {
                          setActivePortfolioDropdown(null);
                          setIsPortfolioMobileMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faUserTie} className="dropdown-item-icon" />
                        <span>Direct Clients</span>
                      </Link>
                      <Link
                        to="/website"
                        state={{ type: 'whitelabel' }}
                        className={`portfolio-dropdown-item ${location.pathname === '/website' && location.state?.type === 'whitelabel' ? 'active' : ''}`}
                        onClick={() => {
                          setActivePortfolioDropdown(null);
                          setIsPortfolioMobileMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faCertificate} className="dropdown-item-icon" />
                        <span>White Labels</span>
                      </Link>
                    </div>
                  </div>
                </li>

                {/* SOFTWARE - WITH DROPDOWN */}
                <li
                  className={`nav-item portfolio-service-item has-dropdown ${location.pathname === '/custom-software' ? 'active' : ''} ${activePortfolioDropdown === 'software' ? 'dropdown-active' : ''}`}
                  onMouseEnter={() => window.innerWidth > 992 && setActivePortfolioDropdown('software')}
                  onMouseLeave={() => window.innerWidth > 992 && setActivePortfolioDropdown(null)}
                >
                  <a
                    href="#"
                    className="nav-link dropdown-trigger"
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePortfolioDropdown(activePortfolioDropdown === 'software' ? null : 'software');
                    }}
                  >
                    <span>SOFTWARE</span>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                  </a>
                  <div className={`portfolio-dropdown-container ${activePortfolioDropdown === 'software' ? 'show' : ''}`}>
                    <div className="portfolio-dropdown-content">
                      <Link
                        to="/custom-software"
                        state={{ type: 'direct' }}
                        className={`portfolio-dropdown-item ${location.pathname === '/custom-software' && location.state?.type === 'direct' ? 'active' : ''}`}
                        onClick={() => {
                          setActivePortfolioDropdown(null);
                          setIsPortfolioMobileMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faUserTie} className="dropdown-item-icon" />
                        <span>Direct Clients</span>
                      </Link>
                      <Link
                        to="/custom-software"
                        state={{ type: 'whitelabel' }}
                        className={`portfolio-dropdown-item ${location.pathname === '/custom-software' && location.state?.type === 'whitelabel' ? 'active' : ''}`}
                        onClick={() => {
                          setActivePortfolioDropdown(null);
                          setIsPortfolioMobileMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faCertificate} className="dropdown-item-icon" />
                        <span>White Labels</span>
                      </Link>
                    </div>
                  </div>
                </li>

                {/* MARKETING - NO DROPDOWN */}
                <li className={`nav-item portfolio-service-item ${location.pathname === '/marketing' ? 'active' : ''}`}>
                  <Link to="/marketing" className="nav-link" onClick={() => setIsPortfolioMobileMenuOpen(false)}>
                    <span>MARKETING</span>
                  </Link>
                </li>

                {/* GRAPHIC - NO DROPDOWN */}
                <li className={`nav-item portfolio-service-item ${location.pathname === '/graphicdesign' ? 'active' : ''}`}>
                  <Link to="/graphicdesign" className="nav-link" onClick={() => setIsPortfolioMobileMenuOpen(false)}>
                    <span>GRAPHIC</span>
                  </Link>
                </li>

                {/* UI/UX - NO DROPDOWN */}
                <li className={`nav-item portfolio-service-item ${location.pathname === '/uiux' ? 'active' : ''}`}>
                  <Link to="/uiux" className="nav-link" onClick={() => setIsPortfolioMobileMenuOpen(false)}>
                    <span>UI/UX</span>
                  </Link>
                </li>

                {/* LET'S TALK BUTTON */}
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link btn-lets-talk"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        window.location.href = "tel:+917778048992";
                      } else {
                        e.preventDefault();
                        toggleModal();
                      }
                    }}
                  >
                    Let's Talk
                  </a>
                </li>
              </ul>

              <div
                className={`hamburger ${isPortfolioMobileMenuOpen ? 'active' : ''}`}
                onClick={() => {
                  setIsPortfolioMobileMenuOpen(!isPortfolioMobileMenuOpen);
                  document.body.style.overflow = isPortfolioMobileMenuOpen ? '' : 'hidden';
                }}
              >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </nav>
          </div>
        </div>

        {/* Blur overlay for portfolio navbar only */}
        {isPortfolioMobileMenuOpen && (
          <div
            className="blur-overlay active"
            onClick={() => {
              setIsPortfolioMobileMenuOpen(false);
              document.body.style.overflow = '';
            }}
          ></div>
        )}
      </header>



      {/* LET'S TALK MODAL - FIXED FOR SCROLLING */}
      {isModalOpen && (
        <div className="lets-talk-modal active">
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal-container scrollable-modal">
            <div className="snow-effect">
              {snowflakes.map(flake => (
                <div
                  key={flake.id}
                  className="snowflake"
                  style={{
                    left: flake.left,
                    animationDuration: flake.animationDuration,
                    animationDelay: flake.animationDelay,
                    opacity: flake.opacity,
                    width: `${flake.size}px`,
                    height: `${flake.size}px`
                  }}
                ></div>
              ))}
            </div>

            <button className="modal-close-btn" onClick={toggleModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="modal-content">
              <h2>Let's Talk</h2>
              <p>Have a project in mind or want to discuss opportunities? <br /> We'd love to hear from you!</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="name">Full Name</label>
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={errors.phone ? 'error' : ''}
                  />
                  <label htmlFor="phone">Phone Number</label>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={errors.email ? 'error' : ''}
                  />
                  <label htmlFor="email">Email Address</label>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    rows="2"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  <label htmlFor="message">Your Message</label>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${isButtonClicked ? 'button-click-animate' : ''}`}
                  disabled={isSubmitting}
                  onClick={handleButtonClick}
                  onMouseEnter={() => setShowHoverImage(true)}
                  onMouseLeave={() => setShowHoverImage(false)}
                >
                  <span className="btn-text">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  {isSubmitting && <span className="btn-loader"></span>}

                  <img
                    src={showHoverImage ? hoverImage : defaultImage}
                    alt="Button decoration"
                    className="button-decoration-image"
                  />

                  {showBubbles && (
                    <div className="bubble-container">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={`top-${i}`}
                          className="bubble top"
                          style={{
                            '--random-x': `${getRandomValue(-15, 15)}px`,
                            left: `${getRandomValue(10, 90)}%`,
                            width: `${getRandomValue(3, 6)}px`,
                            height: `${getRandomValue(3, 6)}px`,
                            animationDelay: `${i * 0.08}s`
                          }}
                        ></div>
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={`bottom-${i}`}
                          className="bubble bottom"
                          style={{
                            '--random-x': `${getRandomValue(-15, 15)}px`,
                            left: `${getRandomValue(10, 90)}%`,
                            width: `${getRandomValue(3, 6)}px`,
                            height: `${getRandomValue(3, 6)}px`,
                            animationDelay: `${i * 0.08 + 0.15}s`
                          }}
                        ></div>
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`left-${i}`}
                          className="bubble left"
                          style={{
                            '--random-y': `${getRandomValue(-15, 15)}px`,
                            top: `${getRandomValue(10, 90)}%`,
                            width: `${getRandomValue(3, 6)}px`,
                            height: `${getRandomValue(3, 6)}px`,
                            animationDelay: `${i * 0.08 + 0.3}s`
                          }}
                        ></div>
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`right-${i}`}
                          className="bubble right"
                          style={{
                            '--random-y': `${getRandomValue(-15, 15)}px`,
                            top: `${getRandomValue(10, 90)}%`,
                            width: `${getRandomValue(3, 6)}px`,
                            height: `${getRandomValue(3, 6)}px`,
                            animationDelay: `${i * 0.08 + 0.45}s`
                          }}
                        ></div>
                      ))}
                      <div
                        className="bubble top-left"
                        style={{
                          '--random-x': `${getRandomValue(0, 15)}px`,
                          width: `${getRandomValue(4, 7)}px`,
                          height: `${getRandomValue(4, 7)}px`,
                          animationDelay: '0.6s'
                        }}
                      ></div>
                      <div
                        className="bubble top-right"
                        style={{
                          '--random-x': `${getRandomValue(-15, 0)}px`,
                          width: `${getRandomValue(4, 7)}px`,
                          height: `${getRandomValue(4, 7)}px`,
                          animationDelay: '0.65s'
                        }}
                      ></div>
                      <div
                        className="bubble bottom-left"
                        style={{
                          '--random-x': `${getRandomValue(0, 15)}px`,
                          width: `${getRandomValue(4, 7)}px`,
                          height: `${getRandomValue(4, 7)}px`,
                          animationDelay: '0.7s'
                        }}
                      ></div>
                      <div
                        className="bubble bottom-right"
                        style={{
                          '--random-x': `${getRandomValue(-15, 0)}px`,
                          width: `${getRandomValue(4, 7)}px`,
                          height: `${getRandomValue(4, 7)}px`,
                          animationDelay: '0.75s'
                        }}
                      ></div>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
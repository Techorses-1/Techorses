import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faLaptopCode,
  faPaintBrush,
  faMobileScreen,
  faPenRuler,
  faBullhorn,
  faChevronDown,
  faUserTie,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PortfolioNavbar = () => {
  const [activeService, setActiveService] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const justClickedRef = useRef(false); // 👈 flag to block re-open after click
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.portfolio-service.has-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setHoveredService(null);
  }, [location.pathname, location.state]);

  const services = [
    {
      name: 'Website',
      icon: faGlobe,
      id: 'website',
      link: '/website',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Direct Clients', icon: faUserTie, link: '/website', state: { type: 'direct' } },
        { name: 'White Labels', icon: faCertificate, link: '/website', state: { type: 'whitelabel' } }
      ]
    },
    {
      name: 'Software',
      icon: faLaptopCode,
      id: 'software',
      link: '/custom-software',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Direct Clients', icon: faUserTie, link: '/custom-software', state: { type: 'direct' } },
        { name: 'White Labels', icon: faCertificate, link: '/custom-software', state: { type: 'whitelabel' } }
      ]
    },
    { name: 'Marketing', icon: faBullhorn, id: 'marketing', link: '/marketing' },
    { name: 'Graphic', icon: faPaintBrush, id: 'graphic', link: '/graphicdesign' },
    { name: 'UI/UX', icon: faPenRuler, id: 'uiux', link: '/uiux' },
  ];

  const isServiceActive = (link) => {
    return location.pathname === link;
  };

  const handleDropdownToggle = (e, service) => {
    if (service.hasDropdown) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === service.id ? null : service.id);
    }
  };

  const handleDropdownItemClick = () => {
    justClickedRef.current = true; // 👈 set flag BEFORE state updates
    setActiveDropdown(null);
    setHoveredService(null);
    // Reset flag after a short delay so normal hover works again
    setTimeout(() => {
      justClickedRef.current = false;
    }, 300);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
  };

  return (
    <div className={`portfolio-navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <nav className="portfolio-navbar">
        <ul className="portfolio-services">
          {services.map((service) => (
            <li
              key={service.id}
              className={`portfolio-service ${service.id} ${isServiceActive(service.link) ? 'active' : ''
                } ${hoveredService === service.id ? 'hover' : ''
                } ${service.hasDropdown ? 'has-dropdown' : ''
                } ${activeDropdown === service.id ? 'dropdown-active' : ''
                }`}
              onMouseEnter={() => {
                if (justClickedRef.current) return; // 👈 block re-open after click
                setHoveredService(service.id);
                if (service.hasDropdown) {
                  setActiveDropdown(service.id);
                }
              }}
              onMouseLeave={() => {
                setHoveredService(null);
                setActiveDropdown(null);
              }}
            >
              {service.hasDropdown ? (
                <>
                  <a
                    href={service.link}
                    onClick={(e) => handleDropdownToggle(e, service)}
                    className="dropdown-trigger"
                  >
                    <FontAwesomeIcon icon={service.icon} className="service-icon" />
                    <span>{service.name}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                  </a>

                  {/* Dropdown Menu */}
                  <ul className={`dropdown-menu ${activeDropdown === service.id ? 'show' : ''}`}>
                    {service.dropdownItems.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <Link
                          to={item.link}
                          state={item.state}
                          className={location.pathname === item.link && location.state?.type === item.state?.type ? 'active' : ''}
                          onClick={handleDropdownItemClick}
                        >
                          <FontAwesomeIcon icon={item.icon} className="dropdown-item-icon" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={service.link}
                  onClick={handleLinkClick}
                >
                  <FontAwesomeIcon icon={service.icon} className="service-icon" />
                  <span>{service.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PortfolioNavbar;
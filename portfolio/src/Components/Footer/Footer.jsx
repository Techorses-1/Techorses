import { forwardRef } from "react";
import "./Footer.scss";
import logo from "../../assets/logo/Footer-Logo.png";
import { Link, useLocation } from 'react-router-dom'; // Add Link import

import {
  FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt
} from "react-icons/fa";


const Footer = forwardRef((props, ref) => {

  const location = useLocation();

  const validPaths = [
    '/', '/mobile', '/website', '/uiux',
    '/graphicdesign', '/marketing', '/custom-software'
  ];

  if (!validPaths.includes(location.pathname)) {
    return null;
  }


  const services = [
    { name: 'Web Development', path: '/website' },
    { name: 'Custom Software', path: '/custom-software' },
    { name: 'Marketing Solution', path: '/marketing' },
    { name: 'Graphic Design', path: '/graphicdesign' },
    { name: 'UI/UX Design', path: '/uiux' },
    { name: 'Mobile Application', path: '/mobile' }
  ];


  return (
    <footer className="sticky-footer" ref={ref}>
      {/* Animated Background Overlay */}
      <div className="footer-bg" />

      <div className="footer-container">
        <div className="footer-main-row">
          {/* Logo Column - Wider than others */}
          <div className="footer-column footer-logo-column">
            <img src={logo} alt="Company Logo" className="footer-logo" />
            <p className="company-description">
              Stay connected and join the digital conversation! Follow us on social media for the latest
              updates, tech insights, and creative inspirations. Let's build a vibrant digital community
              together.
            </p>
          </div>

          {/* Services Column - Medium width */}
          <div className="footer-column mobile-none">
            <h3>Services</h3>
            <ul className="services-list">
              {services.map((service) => (
                <li key={service.path}>
                  {/* CHANGE FROM: */}
                  {/* <a href={service.path} className={location.pathname === service.path ? 'active' : ''}> */}

                  {/* CHANGE TO: */}
                  <Link
                    to={service.path}
                    className={location.pathname === service.path ? 'active' : ''}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column - Wider than Services but narrower than Logo */}
          <div className="footer-column contact-column">
            <h3>Contact Us</h3>

            <div className="contact-line">
              <FaMapMarkerAlt className="contact-icon" />
              <a
                href="https://maps.google.com/?q=B-224,Samanvay Silicon,Opp Kalyan Hotel,Dairy Den Circle,Sayajigunj,Vadodara,390020"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-text"
              >
                B-224, Samanvay Silicon, Opp Kalyan Hotel, Dairy Den Circle,
                Sayajigunj, Vadodara, 390020 (Gujarat, India)
              </a>
            </div>

            {/* DESKTOP View (Dual Layout) */}
            <div className="desktop-contact">
              <div className="contact-line dual">
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+917778048992">+91 7778048992</a>
                <span className="sep">|</span>
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+919328338281">+91 9328338281</a>
              </div>

              <div className="contact-line dual">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:hey@techorses.com">hey@techorses.com</a>
                <span className="sep">|</span>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:sales@techorses.com">sales@techorses.com</a>
              </div>
            </div>

            {/* MOBILE View (Stacked Layout) */}
            <div className="mobile-contact">
              <div className="contact-line">
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+917778048992">+91 7778048992</a>
              </div>
              <div className="contact-line">
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+919328338281">+91 9328338281</a>
              </div>
              <div className="contact-line">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:hey@techorses.com">hey@techorses.com</a>
              </div>
              <div className="contact-line">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:sales@techorses.com">sales@techorses.com</a>
              </div>
            </div>


            {/* Mobile Social Icons */}
            <div className="mobile-social">
              <div className="footer-socials">
                <a
                  href="https://www.facebook.com/people/Techorses/100089081915251/?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <div className="holo-ring"></div>
                  <div className="holo-particles"></div>
                  <FaFacebookF />
                  <div className="holo-pulse"></div>
                </a>

                <a
                  href="https://www.instagram.com/techorses_?igsh=Zzh1ZDE0NHlvd3ht"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <div className="holo-ring"></div>
                  <div className="holo-particles"></div>
                  <FaInstagram />
                  <div className="holo-pulse"></div>
                </a>

                <a
                  href="https://www.linkedin.com/company/techorses-ride-the-technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <div className="holo-ring"></div>
                  <div className="holo-particles"></div>
                  <FaLinkedinIn />
                  <div className="holo-pulse"></div>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom desktop-copy">
          <p>© 2025 Techorses. All rights reserved. Designed by Techorses.</p>
        </div>
        <div className="footer-bottom mobile-copy">
          <p>© 2025 Techorses. All rights reserved.<br />Designed by Techorses.</p>
        </div>
      </div>

      {/* Vertical Stroke Text */}
      <span className="footer-side-text">TECHORSES</span>

    </footer>
  );
});

export default Footer;
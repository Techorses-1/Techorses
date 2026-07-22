import React, { useState } from "react";
import "./Services.scss";
import image1 from "../../../assets/Animations/image.png";
import image2 from "../../../assets/Animations/portfolio.jpg";
import image3 from "../../../assets/Animations/portfolio.jpg";

import website from "../../../assets/Images/home_images/services/website.png";
import marketing from "../../../assets/Images/home_images/services/marketing.png";
import custom from "../../../assets/Images/home_images/services/website_old.png";
import mobile from "../../../assets/Images/home_images/services/mobile.png";
import graphic from "../../../assets/Images/home_images/services/graphic.png";
import uiux from "../../../assets/Images/home_images/services/uiux.png";

import web_service from "../../../assets/Images/home_images/services/web_service.png";
import custom_service from "../../../assets/Images/home_images/services/custom_service.png";
import marketing_service from "../../../assets/Images/home_images/services/marketing_service.png";
import mobile_service from "../../../assets/Images/home_images/services/mobile_service.png";
import graphic_service from "../../../assets/Images/home_images/services/graphic_service.png";
import uiux_service from "../../../assets/Images/home_images/services/uiux_service.png";

const cards = [
  {
    title: "Website Development",
    subtitle: "Modern Web Solutions",
    description: "See our collection of responsive, high-performance websites built with cutting-edge technologies.",
    defaultImage: website,
    hoverImage: web_service,
    color: "gradient-website",
    path: "/portfolio/website"
  },
  {
    title: "Custom Software",
    subtitle: "Tailored Business Solutions",
    description: "Explore our custom-built software applications designed for specific business needs.",
    defaultImage: custom,
    hoverImage: custom_service,
    color: "gradient-software",
    path: "/portfolio/custom-software",
  },
  {
    title: "Marketing Solutions",
    subtitle: "Successful Campaigns",
    description: "Check out our digital marketing strategies that boosted client engagement and conversions.",
    defaultImage: marketing,
    hoverImage: marketing_service,
    color: "gradient-marketing",
    path: "/portfolio/marketing"
  },

  {
    title: "Graphic Design",
    subtitle: "Sell Smart",
    description: "We develop custom e-commerce platforms that are fast, secure, and scalable.",
    defaultImage: graphic,
    hoverImage: graphic_service,
    color: "gradient-graphic",
    path: "/portfolio/graphic"
  },
  {
    title: "UI/UX Design",
    subtitle: "Creative User Interfaces",
    description: "We design sleek, intuitive UI/UX experiences for web and mobile platforms.",
    defaultImage: uiux,
    hoverImage: uiux_service,
    color: "gradient-uiux",
    path: "/portfolio/uiux"
  },
  {
    title: "Mobile Development",
    subtitle: "Modern Mobile Solutions",
    description: "See our collection of responsive, high-performance mobile apps built with cutting-edge technologies.",
    defaultImage: mobile,
    hoverImage: mobile_service,
    color: "gradient-mobile",
    path: "/portfolio/mobile"
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [viewMode, setViewMode] = useState("first"); // "first" or "last"
  const visibleCards = viewMode === "first" ? cards.slice(0, 4) : cards.slice(2, 6);
  const isMobile = window.innerWidth <= 768;
  const [mobileIndex, setMobileIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleMobileLeft = () => {
    if (mobileIndex > 0) setMobileIndex(mobileIndex - 1);
  };

  const handleMobileRight = () => {
    if (mobileIndex < cards.length - 1) setMobileIndex(mobileIndex + 1);
  };

  const handleLeft = () => {
    setFade(true);
    setTimeout(() => {
      setViewMode("first");
      setFade(false);
    }, 300);
  };

  const handleRight = () => {
    setFade(true);
    setTimeout(() => {
      setViewMode("last");
      setFade(false);
    }, 300);
  };

  return (
    <section className="services-section">
      <h2 className="section-heading">SERVICES</h2>

      {isMobile ? (
        <div className="mobile-card-container">
          <div
            className="mobile-card"
            style={{ backgroundImage: `url(${cards[mobileIndex].defaultImage})` }}
          >
            <div className="mobile-content">
              <h2>{cards[mobileIndex].title}</h2>
              <h3>{cards[mobileIndex].subtitle}</h3>
              <p>{cards[mobileIndex].description}</p>
              <a href={cards[mobileIndex].path} className="know-more">Know More</a>
            </div>
          </div>

          <div className="mobile-controls">
            <button onClick={handleMobileLeft} disabled={mobileIndex === 0}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button onClick={handleMobileRight} disabled={mobileIndex === cards.length - 1}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="slider-container">
          <div className={`card-wrapper ${fade ? "fade-out" : "fade-in"}`}>
            {visibleCards.map((card, index) => {
              const realIndex = viewMode === "first" ? index : index + 2;
              const isActive = activeIndex === realIndex;
              return (
                <div className={`service-card ${card.color} ${isActive ? "expanded" : ""}`}
                  key={realIndex}
                  onMouseEnter={() => setActiveIndex(realIndex)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {isActive && (
                    <div className="card-bg-image">
                      <img src={card.hoverImage} alt="background" />
                    </div>
                  )}

                  {isActive ? (
                    <div className="expanded-content">
                      <div className="text-block">
                        <h2>{card.title}</h2>
                        <h3>{card.subtitle}</h3>
                        <p>{card.description}</p>
                        <a href={card.path} className="sign-up-btn">Explore</a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="card-left">
                        <h2>{card.title}</h2>
                      </div>
                      <div className="card-right">
                        <div className="default-mockup">
                          <img src={card.defaultImage} alt="default" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="slider-controls">
        <button className="slider-btn" onClick={handleLeft} disabled={viewMode === "first"}>
          <span>&#8592;</span>
        </button>
        <button className="slider-btn" onClick={handleRight} disabled={viewMode === "last"}>
          <span>&#8594;</span>
        </button>
      </div>
    </section>
  );
};

export default Services;
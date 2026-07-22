import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./HeroSection.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import image from "../../../assets/Animations/portfolio.jpg";
import side1 from "../../../assets/Images/home_images/newhero1.jpg";
import side2 from "../../../assets/Images/home_images/newhero5.png";
import side3 from "../../../assets/Images/home_images/newhero4.jpg";
import side4 from "../../../assets/Images/home_images/newhero2.jpg";
// import video from "../../../assets/Images/home_images/Video/NEW_HERO.mp4";
import video from "../../../assets/Images/home_images/Video/hero_video.mp4";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Only run scroll animations for desktop/tablet
    if (!isMobile) {
      gsap.fromTo(
        ".side-images.left .side-img-border",
        { opacity: 0, x: -200 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 2.5,
          ease: "power3.out",
        }
      );


      gsap.fromTo(
        ".side-images.right .side-img-border",
        { opacity: 0, x: 200 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 2.5,
          ease: "power3.out",
        }
      );

      gsap.to(".scaler", {
        scrollTrigger: {
          trigger: ".hero-media-wrapper",
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
        scale: 2,
        ease: "power2.out",
      });

      gsap.to(".hero-overlay-text", {
        scrollTrigger: {
          trigger: ".scaler",
          start: "top 60%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });

      gsap.fromTo(
        ".side-images.left",
        { xPercent: 40 },
        {
          xPercent: -70,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero-media-wrapper",
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".side-images.right",
        { xPercent: -40 },
        {
          xPercent: 80,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero-media-wrapper",
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    } else {
      // Always show overlay text on mobile
      gsap.set(".hero-overlay-text", { opacity: 1, y: 0 });
    }
  }, []);



  return (
    <div className="hero-container">
      <div className="hero-content">
        <motion.h1
          className="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {"You dream it simple,".split("").map((char, i) => (
            <span key={i} className="fade-letter">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <br />
          {"We make it powerful.".split("").map((char, i) => (
            <span key={i + 100} className="fade-letter">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}


        </motion.h1>


        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Ideas move fast. Your tech should, too.
        </motion.p>

        <motion.div
          className="hero-button-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <a href="mailto:hey@techorses.com">
            <button className="slider-btn">
              <span> Let’s Collaborate</span>
            </button>
          </a>
        </motion.div>
      </div>

      <div className="hero-media-wrapper">
        <div className="side-images left">
          <div className="side-img-border">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img src={side1} className="side-img img1 " alt="side1" />
          </div>
          <div className="side-img-border">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img src={side2} className="side-img img2" alt="side2" />
          </div>
        </div>

        <div className="hero-media">
          <div className="scaler">
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="hero-overlay-text">
              <h2>We Build Premium <span className="break-mobile"></span> Digital Experiences</h2>
            </div>
          </div>
        </div>

        <div className="side-images right">
          <div className="side-img-border">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img src={side3} className="side-img img3" alt="side3" />
          </div>
          <div className="side-img-border">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img src={side4} className="side-img img4" alt="side4" />
          </div>
        </div>
      </div>

      <div className="bg-word-container">
        <h1 className="bg-word design">DESIGN</h1>
        <h1 className="bg-word develop">DEVELOP</h1>
        <h1 className="bg-word deliver">DELIVER</h1>
      </div>
    </div >
  );
};

export default HeroSection;

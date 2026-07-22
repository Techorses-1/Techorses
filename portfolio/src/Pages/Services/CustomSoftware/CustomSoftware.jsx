import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';        // 👈 ADDED
// import './CustomSoftware.scss';
import '../Website/Webdevlopment.scss';
import CardSwap, { Card } from '../../../Components/Animations/CardSwap';
import Particles from '../../../Components/Animations/Particles';
import video1 from '../../../assets/Services/custom/customsoftware1.mp4';
import video2 from '../../../assets/Services/custom/customsoftware2.mp4';
import video3 from '../../../assets/Services/custom/customsoftware3.mp4';
import LegendSlider from '../../../Components/Service/LegendSlider';
import CTASection from '../../../Components/Service/CTASection';

// Import your images
import mtm_soft1 from "../../../assets/Services/custom/mtm_soft/img1.png";
import mtm_soft2 from "../../../assets/Services/custom/mtm_soft/img2.png";
import mtm_soft3 from "../../../assets/Services/custom/mtm_soft/img3.png";

import ferrotube1 from "../../../assets/Services/custom/ferrotube/img1.png";
import ferrotube2 from "../../../assets/Services/custom/ferrotube/img2.png";
import ferrotube3 from "../../../assets/Services/custom/ferrotube/img3.png";

import crksons1 from "../../../assets/Services/custom/crk_soft/img1.png";
import crksons2 from "../../../assets/Services/custom/crk_soft/img2.png";
import crksons3 from "../../../assets/Services/custom/crk_soft/img3.png";

import jass1 from "../../../assets/Services/custom/jass/img1.png";
import jass2 from "../../../assets/Services/custom/jass/img2.png";
import jass3 from "../../../assets/Services/custom/jass/img3.png";
import jass4 from "../../../assets/Services/custom/jass/img4.png";

import marcost_soft1 from "../../../assets/Services/custom/marcost_soft/img1.png";
import marcost_soft2 from "../../../assets/Services/custom/marcost_soft/img2.png";
import marcost_soft3 from "../../../assets/Services/custom/marcost_soft/img3.png";

import smart_class1 from "../../../assets/Services/custom/smart_class/img1.png";
import smart_class2 from "../../../assets/Services/custom/smart_class/img2.png";
import smart_class3 from "../../../assets/Services/custom/smart_class/img3.png";
import smart_class4 from "../../../assets/Services/custom/smart_class/img4.png";


import jlad1 from "../../../assets/Services/custom/jlad/jlad1.png";
import jlad2 from "../../../assets/Services/custom/jlad/jlad2.png";
import jlad3 from "../../../assets/Services/custom/jlad/jlad3.png";
import jlad4 from "../../../assets/Services/custom/jlad/jlad4.png";
import jlad5 from "../../../assets/Services/custom/jlad/jlad5.png";


import satvsar1 from "../../../assets/Services/custom/satvsar/img1.png";
import satvsar2 from "../../../assets/Services/custom/satvsar/img2.png";
import satvsar3 from "../../../assets/Services/custom/satvsar/img4.png";
import satvsar4 from "../../../assets/Services/custom/satvsar/img3.png";

// 👇 SPLIT PROJECTS INTO DIRECT (first 3) AND WHITE LABEL (last 3)
const directProjects = [

  {
    id: "project-four",
    title: "Jass Perfumes",
    subtitle: "FinTech Solution",
    images: [jass1, jass3, jass4, jass2],
    layout: "image-right",
    color: "#f5deb3",
    buttonColor1: "#d4af37ff",
    buttonColor2: "#8b6f1fff"
  },

  {
    id: "project-three",
    title: "FerroTube",
    subtitle: "CRM Solutions",
    description: "A cross-platform mobile application with smooth performance and intuitive design.",
    images: [ferrotube1, ferrotube2, ferrotube3],
    layout: "image-left",
    color: "#7FFFD4",
    buttonColor1: "#4aca9fff",
    buttonColor2: "#237d5fff"
  },


  {
    id: "project-fourteen",
    title: "Marcost",
    subtitle: "Digital Marketing",
    description: "Comprehensive analytics dashboard with real-time data visualization and reporting.",
    images: [marcost_soft1, marcost_soft2, marcost_soft3],
    layout: "image-right",
    color: "#5e9bff",
    buttonColor1: "#6894dbff",
    buttonColor2: "#223e6bff"
  },


  {
    id: "project-three",
    title: "CRK Cheritable Trust",
    subtitle: "FinTech Solution",
    description: "A cross-platform mobile application with smooth performance and intuitive design.",
    images: [crksons1, crksons2, crksons3],
    layout: "image-left",
    color: "#ff7f9c",
    buttonColor1: "#f54768ff",
    buttonColor2: "#a91b35ff"
  },


  {
    id: "project-four",
    title: "SC Smart Class",
    subtitle: "EdTech Solutions",
    description: "Comprehensive analytics dashboard with real-time data visualization and reporting.",
    images: [smart_class1, smart_class2, smart_class3, smart_class4],
    layout: "image-right",
    color: "#ff8fdb",
    buttonColor1: "#d852c2ff",
    buttonColor2: "#911b87ff"
  },

  {
    id: "project-five",
    title: "Satvsar",
    subtitle: "E-Commerce Management System",
    description: "A custom-built admin panel for managing products, orders, inventory, customers, and business operations with an intuitive dashboard experience.",
    images: [satvsar1, satvsar2, satvsar3, satvsar4],
    layout: "image-left",
    color: "#D9F99D",
    buttonColor1: "#65A30D",
    buttonColor2: "#365314"
  }




];

const whiteLabelProjects = [
  {
    id: "project-two",
    title: "MTM Store",
    subtitle: "Custom Commerce",
    description: "An innovative web solution with cutting-edge technology and user-friendly interface.",
    images: [mtm_soft1, mtm_soft2, mtm_soft3],
    layout: "image-right",
    color: "#8f9aff",
    buttonColor1: "#ad6dfbff",
    buttonColor2: "#5f2be2ff"
  },

  {
    id: "project-three",
    title: "Jlad Group",
    subtitle: "Accounting Software",
    description: "An innovative web solution with cutting-edge technology and user-friendly interface.",
    images: [jlad1, jlad2, jlad3, jlad4, jlad5],
    layout: "image-left",
    color: "#6fd8c2",           // teal-mint (was purple)
    buttonColor1: "#2db89e",    // medium teal (was light purple)
    buttonColor2: "#0e7c65",    // deep teal (was deep purple)
  },


];

const CustomSoftware = () => {
  const location = useLocation();                      // 👈 ADDED
  const cardSwapRef = useRef();

  // Get the type from location state, default to 'direct'
  const viewType = location.state?.type || 'direct';
  const isWhiteLabel = viewType === 'whitelabel';

  // Choose which projects to display
  const displayProjects = isWhiteLabel ? whiteLabelProjects : directProjects;

  // Dynamic hero content
  const heroContent = {
    heading: isWhiteLabel
      ? "Developed by TH <span class='hero-heading-sub'>(White label projects for agency partners)</span>"
      : "Solutions that Work.<br />Technology that Fits You.",
    subhead: isWhiteLabel
      ? "Built for Your Team."
      : "Built to simplify tasks & power<br className='mobile-break' /> business growth.",
    workTitle: isWhiteLabel ? "White label Work" : "Direct Clients Work",
    highlight: isWhiteLabel ? "White label" : "Direct Clients"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* CardSwap Section */}
      <div className="website-hero-bg">
        <Particles
          className="particles-overlay"
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div
          ref={cardSwapRef}
          className="website-hero-container"
          style={{
            height: '87vh',
            width: '100%',
            margin: '0 auto',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            position: 'relative',
            backgroundColor: '#0a021a',
            scrollSnapAlign: 'start'
          }}
        >
          <Particles
            className="particles-overlay"
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />

          <div
            className="hero-left-text"
            style={{
              flex: 1,
              zIndex: 2,
              '@media (max-width: 768px)': {
                textAlign: 'center',
                marginBottom: '20px'
              }
            }}
          >
            <h1
              className="hero-heading"
              dangerouslySetInnerHTML={{ __html: heroContent.heading }}
            />
            <p
              className="hero-subheading"
              dangerouslySetInnerHTML={{ __html: heroContent.subhead }}
            />
          </div>

          <div
            className="card-swap-wrapper"
            style={{
              flex: 1,
              position: 'relative',
              height: '100%',
              zIndex: 2,
              '@media (max-width: 768px)': {
                width: '100%',
                height: '50%',
                marginTop: '20px'
              }
            }}
          >
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
              style={{
                '@media (max-width: 768px)': {
                  transform: 'scale(1.1)',
                  width: '90%',
                  margin: '0 auto'
                },
                '@media (max-width: 480px)': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Card data-title="Tailored">
                <video
                  src={video1}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    '@media (max-width: 768px)': {
                      objectPosition: 'center top'
                    }
                  }}
                />
              </Card>

              <Card data-title="Scalable">
                <video
                  src={video2}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    '@media (max-width: 768px)': {
                      objectPosition: 'center top'
                    }
                  }}
                />
              </Card>

              <Card data-title="Secure">
                <video
                  src={video3}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    '@media (max-width: 768px)': {
                      objectPosition: 'center top'
                    }
                  }}
                />
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>

      <div className="custom-software-projects">
        <LegendSlider
          projects={displayProjects}                     // 👈 UPDATED
          title={heroContent.workTitle}                   // 👈 UPDATED
          highlight={heroContent.highlight}               // 👈 UPDATED
          subtitle="Custom-built solutions designed for success."
        />
      </div>

      <div>
        <CTASection
          headline="Your Workflow. Fully Engineered."
          subline="Built for Your Team."
          primaryColor="linear-gradient(135deg, #6547c5, #2d1b69)"
          primaryShadow="0 0 20px rgba(101, 71, 197, 0.6)"
          primaryHoverShadow="0 0 35px rgba(101, 71, 197, 0.9)"
          secondaryColor="#6547c5"
          secondaryHoverShadow="0 0 25px rgba(101, 71, 197, 0.8)"
        />
      </div>
    </div>
  );
};

export default CustomSoftware;
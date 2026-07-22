import React, { useEffect, useState, useRef } from 'react';
import './UIUX.scss';
import { motion } from "framer-motion";
import '../Website/Webdevlopment.scss';
import CardSwap, { Card } from '../../../Components/Animations/CardSwap';
import Particles from '../../../Components/Animations/Particles';
import video1 from '../../../assets/Services/uiux/uiux1.mp4';
import video2 from '../../../assets/Services/uiux/uiux2.mp4';
import video3 from '../../../assets/Services/uiux/uiux3.mp4';
import LegendSlider from '../../../Components/Service/LegendSlider';
import CTASection from '../../../Components/Service/CTASection';



// Import your images
import img1 from "../../../assets/Services/uiux/mockup/1.png"
import img2 from "../../../assets/Services/uiux/mockup/2.png"
import img3 from "../../../assets/Services/uiux/mockup/3.png"
import img4 from "../../../assets/Services/uiux/mockup/4.png"
import img5 from "../../../assets/Services/uiux/mockup/5.png"
import img6 from "../../../assets/Services/uiux/mockup/6.png"
import img7 from "../../../assets/Services/uiux/mockup/7.png"
import img8 from "../../../assets/Services/uiux/mockup/8.png"
import UIUXShowcase from './UIUXShowcase';


const images = [img1, img2, img3, img4, img5, img6, img7, img8];



// const uiuxprojects = [
//   {
//     id: "project-two",
//     title: "Project Two",
//     subtitle: "Web Application",
//     description: "An innovative web solution with cutting-edge technology and user-friendly interface.",
//     images: [mtm1, mtm2, mtm3, mtm4],
//     layout: "image-left",
//     color: "#8f9aff",
//     buttonColor1: "#ad6dfbff",
//     buttonColor2: "#5f2be2ff"
//   },
//   {
//     id: "project-three",
//     title: "Project Three",
//     subtitle: "Mobile App",
//     description: "A cross-platform mobile application with smooth performance and intuitive design.",
//     images: [mtm5, mtm4, mtm1, mtm3],
//     layout: "image-right",
//     color: "#ffb1ee",
//     buttonColor1: "#d35fbaff",
//     buttonColor2: "#9f3287ff"
//   },
//   {
//     id: "project-three",
//     title: "Project Three",
//     subtitle: "Mobile App",
//     description: "A cross-platform mobile application with smooth performance and intuitive design.",
//     images: [mtm5, mtm4, mtm1, mtm3],
//     layout: "image-left",
//     color: "#5e9bff",
//     buttonColor1: "#6894dbff",
//     buttonColor2: "#223e6bff"

//   },

//   {
//     id: "project-four",
//     title: "Project Four",
//     subtitle: "Dashboard System",
//     description: "Comprehensive analytics dashboard with real-time data visualization and reporting.",
//     images: [mtm5, mtm3, mtm2, mtm1],
//     layout: "image-right",
//     color: "#7FFFD4",
//     buttonColor1: "#4aca9fff",
//     buttonColor2: "#237d5fff"

//   }
// ];

const UIUX = () => {


  useEffect(() => {
    window.scrollTo(0, 0);

    // Force a re-render after a short delay to ensure particles are visible
    const timer = setTimeout(() => {
      setParticlesLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  const cardSwapRef = useRef();
  return (
    <div>

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
            <h1 className="hero-heading">
              Clarity in Every Click.<br />Comfort in Every Step.
            </h1>
            <p className="hero-subheading">
              Designed to make every click<br className="mobile-break" /> smooth & enjoyable.
            </p>
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
              <Card data-title="Attractive">
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

              <Card data-title="Interactive">
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

              <Card data-title="Effective">
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



      <div>
        <LegendSlider
          title="UI/UX Work"
          highlight="UI/UX"
          subtitle="Beautiful, functional layouts that drive impact."
        />
      </div>

      <UIUXShowcase />






      <div>
        <CTASection
          headline="Your Product, Beautifully Usable"
          subline="Design With Intention."
          primaryColor="linear-gradient(135deg, #6547c5, #2d1b69)"
          primaryShadow="0 0 20px rgba(101, 71, 197, 0.6)"
          primaryHoverShadow="0 0 35px rgba(101, 71, 197, 0.9)"
          secondaryColor="#6547c5" 
          // secondaryColor="#fff"
          secondaryHoverShadow="0 0 25px rgba(101, 71, 197, 0.8)"


        />
      </div>


    </div>
  )
}

export default UIUX

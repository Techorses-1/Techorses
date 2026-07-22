import React, { useEffect, useState, useRef } from 'react';
// import './MobileApp.scss'; 
import '../Website/Webdevlopment.scss';

import CardSwap, { Card } from '../../../Components/Animations/CardSwap';
import Particles from '../../../Components/Animations/Particles';
import video1 from '../../../assets/Services/Mobileapp/mobileapp1.mp4';
import video2 from '../../../assets/Services/Mobileapp/mobileapp2.mp4';
import video3 from '../../../assets/Services/Mobileapp/mobileapp3.mp4';
import LegendSlider from '../../../Components/Service/LegendSlider';
import CTASection from '../../../Components/Service/CTASection';





import MobileAppComingSoon from './MobileAppComingSoon';




const MobileApp = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const cardSwapRef = useRef();
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
            <h1 className="hero-heading">
              Apps that Connect.<br />Performance that Excels.
            </h1>
            <p className="hero-subheading">
              Keeping brands right in their<br className="mobile-break" /> customers' hands.
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
              <Card data-title="Smooth">
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

              <Card data-title="Adaptive">
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

              <Card data-title="Seamless">
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
          // projects={mobileprojects} 
          title="Mobile Application"
          highlight="Mobile Application"
          subtitle="Modern, reliable apps that empower business."
        />
      </div>
      <MobileAppComingSoon/>


      <div>
        <CTASection
          headline="Build Apps That Win"
          subline="Smart. Sleek. Seamless."
           primaryColor="linear-gradient(135deg, #6547c5, #2d1b69)"
          primaryShadow="0 0 20px rgba(101, 71, 197, 0.6)"
          primaryHoverShadow="0 0 35px rgba(101, 71, 197, 0.9)"
          secondaryColor="#6547c5" 
          // secondaryColor="#fff"
          secondaryHoverShadow="0 0 25px rgba(101, 71, 197, 0.8)"
        // onPrimaryClick={handleBuildClick}
        // onSecondaryClick={handlePhoneClick}
        />
      </div>


    </div>
  )
}

export default MobileApp

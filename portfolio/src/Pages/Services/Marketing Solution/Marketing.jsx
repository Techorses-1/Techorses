import React, { useEffect, useState, useRef } from 'react';
// import './Marketing.scss'; 
import '../Website/Webdevlopment.scss';

import CardSwap, { Card } from '../../../Components/Animations/CardSwap';
import Particles from '../../../Components/Animations/Particles';
import video1 from '../../../assets/Services/Marketing/marketing1.mp4';
import video2 from '../../../assets/Services/Marketing/marketing2.mp4';
import video3 from '../../../assets/Services/Marketing/marketing3.mp4';
import LegendSlider from '../../../Components/Service/LegendSlider';
import CTASection from '../../../Components/Service/CTASection';
import CardGallery from '../../../Components/LogoService/CardGallery';

import meta1 from '../../../assets/Services/Marketing/meta/img1.png';
import meta2 from '../../../assets/Services/Marketing/meta/img2.png';
import meta3 from '../../../assets/Services/Marketing/meta/img3.png';
import meta4 from '../../../assets/Services/Marketing/meta/img4.png';


// import marketing1 from '../../../assets/Services/Marketing/smm/img1.png';
// import marketing2 from '../../../assets/Services/Marketing/smm/img2.png';
// import marketing3 from '../../../assets/Services/Marketing/smm/img3.png';
// import marketing4 from '../../../assets/Services/Marketing/smm/img4.png';
// import marketing5 from '../../../assets/Services/Marketing/smm/img5.png';
// import marketing6 from '../../../assets/Services/Marketing/smm/img6.png';
// import marketing7 from '../../../assets/Services/Marketing/smm/img7.png';
// import marketing8 from '../../../assets/Services/Marketing/smm/img8.png';
// import marketing9 from '../../../assets/Services/Marketing/smm/img9.png';
// import marketing10 from '../../../assets/Services/Marketing/smm/img10.png';
// import marketing11 from '../../../assets/Services/Marketing/smm/img11.png';
// import marketing12 from '../../../assets/Services/Marketing/smm/img12.png';
// import marketing13 from '../../../assets/Services/Marketing/smm/img13.png';
// import marketing14 from '../../../assets/Services/Marketing/smm/img14.png';


import iamge1 from '../../../assets/Services/Marketing/smm/image1.png';


import youtube1 from '../../../assets/Services/Marketing/youtube/img1.png';
import youtube2 from '../../../assets/Services/Marketing/youtube/img2.png';
import youtube3 from '../../../assets/Services/Marketing/youtube/img3.png';
import youtube4 from '../../../assets/Services/Marketing/youtube/img4.png';

import seo1 from '../../../assets/Services/Marketing/seo/img1.png';
import seo2 from '../../../assets/Services/Marketing/seo/img2.png';
import seo3 from '../../../assets/Services/Marketing/seo/img3.png';
import seo4 from '../../../assets/Services/Marketing/seo/img4.png';






const marketingCards = [
  {
    title: "Meta Ads",
    images: [ meta3 ,meta4, meta1, meta2, ]
  },
  {
    title: "YouTube",
    images: [youtube1, youtube2, youtube3, youtube4] // Use different images for each card
  },


  {
    title: "SEO",
    images: [seo1, seo2, seo3, seo4] // NOT nested arrays
  },
  // {
  //   title: "Marketing",
  //   images: [
  //     iamge1,
  //     [marketing1, marketing2],
  //     [marketing3, marketing4],
  //     // [marketing5 , ],            
  //     [marketing6, marketing7, marketing8],
  //     [marketing9, marketing10, marketing11],
  //     [marketing12, marketing13, marketing14],
  //   ],
  // }
];


const Marketing = () => {


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
          className="website-hero-container" // Add this class
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
              Strategies that Reach.<br />Results that Last.
            </h1>
            <p className="hero-subheading">
              Driving brands closer to the<br className="mobile-break" /> right audience.
            </p>
          </div>

          <div
            className="card-swap-wrapper" // Add this class
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
              <Card data-title="Targeted">
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

              <Card data-title="Strategic">
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

              <Card data-title="Engaging">
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
          // projects={Marketingprojects} 
          title="Marketing Work"
          highlight="Marketing"
          subtitle="Smart, impactful marketing that drives results."
        />
      </div>
      <CardGallery cards={marketingCards} />


      <div>
        <CTASection
          headline="Own Attention. Drive Results."
          subline="Marketing That Performs."
          primaryBtnText="Let's Build"
          secondaryBtnText="+91 7778048992"
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

export default Marketing

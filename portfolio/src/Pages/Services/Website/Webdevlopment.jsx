import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Webdevlopment.scss';
import CardSwap, { Card } from '../../../Components/Animations/CardSwap';
import Particles from '../../../Components/Animations/Particles';
import web2 from '../../../assets/Services/Website/website2.mp4';
import web3 from '../../../assets/Services/Website/website3.mp4';
import web4 from '../../../assets/Services/Website/website1.mp4';
import LegendSlider from '../../../Components/Service/LegendSlider';

// Direct Clients Projects (First 6)
import devkrupa1 from "../../../assets/Services/Website/devkrupa/img1.png";
import devkrupa2 from "../../../assets/Services/Website/devkrupa/img2.png";
import devkrupa3 from "../../../assets/Services/Website/devkrupa/img3.png";

import agroniv1 from "../../../assets/Services/Website/agroniv/img1.png";
import agroniv2 from "../../../assets/Services/Website/agroniv/img2.png";
import agroniv3 from "../../../assets/Services/Website/agroniv/img3.png";

import mtm1 from "../../../assets/Services/custom/mtm/img1.png";
import mtm2 from "../../../assets/Services/custom/mtm/img2.png";
import mtm3 from "../../../assets/Services/custom/mtm/img3.png";
import mtm4 from "../../../assets/Services/custom/mtm/img4.png";

import crksons1 from "../../../assets/Services/Website/crksons/img1.png";
import crksons2 from "../../../assets/Services/Website/crksons/img2.png";
import crksons3 from "../../../assets/Services/Website/crksons/img3.png";

import bulkagro1 from "../../../assets/Services/Website/bulkagro/img1.png";
import bulkagro2 from "../../../assets/Services/Website/bulkagro/img2.png";
import bulkagro3 from "../../../assets/Services/Website/bulkagro/img3.png";

import vrajtech1 from "../../../assets/Services/Website/vrajtech/img1.png";
import vrajtech2 from "../../../assets/Services/Website/vrajtech/img2.png";
import vrajtech3 from "../../../assets/Services/Website/vrajtech/img3.png";

// White Label Projects (Last 7)
import tocean1 from "../../../assets/Services/Website/tocean/img1.png";
import tocean2 from "../../../assets/Services/Website/tocean/img2.png";
import tocean3 from "../../../assets/Services/Website/tocean/img3.png";

import unicrop1 from "../../../assets/Services/Website/unicrop/img1.png";
import unicrop2 from "../../../assets/Services/Website/unicrop/img2.png";
import unicrop3 from "../../../assets/Services/Website/unicrop/img3.png";

import viseorganic1 from "../../../assets/Services/Website/viseorganic/img1.png";
import viseorganic2 from "../../../assets/Services/Website/viseorganic/img2.png";
import viseorganic3 from "../../../assets/Services/Website/viseorganic/img3.png";

import biowave1 from "../../../assets/Services/Website/biowave/img1.png";
import biowave2 from "../../../assets/Services/Website/biowave/img2.png";
import biowave3 from "../../../assets/Services/Website/biowave/img3.png";

import nikunj1 from "../../../assets/Services/Website/nikunj/img1.png";

import marcost1 from "../../../assets/Services/Website/marcost/img1.png";
import marcost2 from "../../../assets/Services/Website/marcost/img2.png";
import marcost3 from "../../../assets/Services/Website/marcost/img3.png";

import faithline1 from "../../../assets/Services/Website/faithline/img1.png";
import faithline2 from "../../../assets/Services/Website/faithline/img2.png";
import faithline3 from "../../../assets/Services/Website/faithline/img3.png";

import bymythology1 from "../../../assets/Services/Website/bymythology/img1.png";
import bymythology2 from "../../../assets/Services/Website/bymythology/img2.png";
import bymythology3 from "../../../assets/Services/Website/bymythology/img3.png";

import glamour1 from "../../../assets/Services/Website/glamour/img1.png";
import glamour2 from "../../../assets/Services/Website/glamour/img2.png";
import glamour3 from "../../../assets/Services/Website/glamour/img3.png";

import shiv1 from "../../../assets/Services/Website/shiv/img1.png";
import shiv2 from "../../../assets/Services/Website/shiv/img2.png";
import shiv3 from "../../../assets/Services/Website/shiv/img3.png";

import lemon1 from "../../../assets/Services/Website/lemon_tree/img1.png";
import lemon2 from "../../../assets/Services/Website/lemon_tree/img2.png";
import lemon3 from "../../../assets/Services/Website/lemon_tree/img3.png";

import ferrotube1 from "../../../assets/Services/Website/ferrotube/img1.png";
import ferrotube2 from "../../../assets/Services/Website/ferrotube/img2.png";
import ferrotube3 from "../../../assets/Services/Website/ferrotube/img3.png";

import hks1 from "../../../assets/Services/Website/hks/img1.png";
import hks2 from "../../../assets/Services/Website/hks/img2.png";
import hks3 from "../../../assets/Services/Website/hks/img3.png";

import pmpartner1 from "../../../assets/Services/Website/pmpartner/img1.png";
import pmpartner2 from "../../../assets/Services/Website/pmpartner/img2.png";
import pmpartner3 from "../../../assets/Services/Website/pmpartner/img3.png";

import jlad1 from "../../../assets/Services/Website/jlad/img1.png";
import jlad2 from "../../../assets/Services/Website/jlad/img2.png";
import jlad3 from "../../../assets/Services/Website/jlad/img3.png";

import gemsparx1 from "../../../assets/Services/Website/gemsparx/img1.png";
import gemsparx2 from "../../../assets/Services/Website/gemsparx/img2.png";
import gemsparx3 from "../../../assets/Services/Website/gemsparx/img3.png";


import kahal1 from "../../../assets/Services/Website/kahal/img1.png";
import kahal2 from "../../../assets/Services/Website/kahal/img2.png";
import kahal3 from "../../../assets/Services/Website/kahal/img3.png";

import sfp1 from "../../../assets/Services/Website/sfp/img1.png";
import sfp2 from "../../../assets/Services/Website/sfp/img2.png";
import sfp3 from "../../../assets/Services/Website/sfp/img3.png";


import tara1 from "../../../assets/Services/Website/tara/img1.png";
import tara2 from "../../../assets/Services/Website/tara/img2.png";
import tara3 from "../../../assets/Services/Website/tara/img3.png";

import satvsar1 from "../../../assets/Services/Website/satvsar/img1.png";
import satvsar2 from "../../../assets/Services/Website/satvsar/img2.png";
import satvsar3 from "../../../assets/Services/Website/satvsar/img3.png";

import CTASection from '../../../Components/Service/CTASection';

const Webdevlopment = () => {
  const location = useLocation();
  const cardSwapRef = useRef();

  const viewType = location.state?.type || 'direct';
  const isWhiteLabel = viewType === 'whitelabel';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ============================================
  // DIRECT CLIENTS — in exact order given
  // ============================================
  const directProjects = [
    {
      id: "direct-01",
      title: "By Mythology",
      subtitle: "Sacred Candles",
      description: "A visually immersive brand website crafted with modern design for a fashion-forward audience.",
      images: [bymythology1, bymythology2, bymythology3],
      layout: "image-left",
      color: "#ffb1c8",
      buttonColor1: "#d9507aff",
      buttonColor2: "#8c1a3eff"
    },
    {
      id: "direct-02",
      title: "Glamour Decor",
      subtitle: "Glass Decoration",
      description: "An elegant showcase website highlighting premium decor services with a refined aesthetic.",
      images: [glamour1, glamour2, glamour3],
      layout: "image-right",
      color: "#ffe0a3",
      buttonColor1: "#f5a623ff",
      buttonColor2: "#a0620aff"
    },
    {
      id: "direct-03",
      title: "Unicrop Biochem",
      subtitle: "Agriculture",
      description: "An innovative web solution for a biochemical agriculture company with product-first design.",
      images: [unicrop1, unicrop2, unicrop3],
      layout: "image-left",
      color: "#98ff7f",
      buttonColor1: "#57d94aff",
      buttonColor2: "#1b7a0aff"
    },
    {
      id: "direct-04",
      title: "Shiv Builder",
      subtitle: "Construction",
      description: "A professional builder website with strong visual identity and project portfolio showcase.",
      images: [shiv1, shiv2, shiv3],
      layout: "image-right",
      color: "#ffd27f",
      buttonColor1: "#fbbd4bff",
      buttonColor2: "#c97a11ff"
    },
    {
      id: "direct-05",
      title: "Lemon Tree",
      subtitle: "Food & Hospitality",
      description: "A fresh, vibrant website for a food brand with appetizing visuals and seamless UX.",
      images: [lemon1, lemon2, lemon3],
      layout: "image-left",
      color: "#f0ff7f",
      buttonColor1: "#c9e010ff",
      buttonColor2: "#7a8a05ff"
    },
    {
      id: "direct-06",
      title: "Vise Organic",
      subtitle: "Agriculture",
      description: "A clean, nature-inspired website for an organic products brand with earthy tones.",
      images: [viseorganic1, viseorganic2, viseorganic3],
      layout: "image-right",
      color: "#7ffff0",
      buttonColor1: "#3bd9d0ff",
      buttonColor2: "#0b7a72ff"
    },
    {
      id: "direct-07",
      title: "Marcost",
      subtitle: "Marketing Solutions",
      description: "A bold marketing agency website with dynamic layouts and conversion-focused design.",
      images: [marcost1, marcost2, marcost3],
      layout: "image-left",
      color: "#e6ff7f",
      buttonColor1: "#c3f93fff",
      buttonColor2: "#6b990dff"
    },
    {
      id: "direct-08",
      title: "Faith Line",
      subtitle: "Logistics Services",
      description: "A professional logistics company website with clear service structure and strong branding.",
      images: [faithline1, faithline2, faithline3],
      layout: "image-right",
      color: "#7fc8ff",
      buttonColor1: "#3fa6f9ff",
      buttonColor2: "#0d5d99ff"
    },
    {
      id: "direct-09",
      title: "Bulkagrochem",
      subtitle: "Agriculture",
      description: "An innovative web solution with cutting-edge technology and user-friendly interface.",
      images: [bulkagro1, bulkagro2, bulkagro3],
      layout: "image-left",
      color: "#ffd27f",
      buttonColor1: "#fbbd4bff",
      buttonColor2: "#c97a11ff"
    },
    {
      id: "direct-10",
      title: "Ferro Tube",
      subtitle: "Industrial Manufacturing",
      description: "A strong industrial brand website built for a steel tube manufacturer with product-first UX.",
      images: [ferrotube1, ferrotube2, ferrotube3],
      layout: "image-right",
      color: "#c0c0c0",
      buttonColor1: "#8a8a8aff",
      buttonColor2: "#3a3a3aff"
    },
    {
      id: "direct-11",
      title: "Bio Wave",
      subtitle: "Agriculture",
      description: "A science-led agriculture website with clean layouts and trust-building content.",
      images: [biowave1, biowave2, biowave3],
      layout: "image-left",
      color: "#7fc8ff",
      buttonColor1: "#3fa6f9ff",
      buttonColor2: "#0d5d99ff"
    },
    {
      id: "direct-12",
      title: "HKS Investment",
      subtitle: "Finance & Investment",
      description: "A professional financial services website with credibility-first design and clear CTAs.",
      images: [hks1, hks2, hks3],
      layout: "image-right",
      color: "#d4af37",
      buttonColor1: "#b8962eff",
      buttonColor2: "#705c10ff"
    },
    {
      id: "direct-13",
      title: "Agroniv.com",
      subtitle: "Agriculture",
      description: "A cross-platform mobile application with smooth performance and intuitive design.",
      images: [agroniv1, agroniv2, agroniv3],
      layout: "image-left",
      color: "#7FFFD4",
      buttonColor1: "#4aca9fff",
      buttonColor2: "#237d5fff"
    },
    {
      id: "direct-14",
      title: "Nikunj Koladiya",
      subtitle: "Personal Branding",
      description: "A sleek personal portfolio website built to establish a strong digital presence.",
      images: [nikunj1],
      layout: "image-right",
      color: "#ffa77f",
      buttonColor1: "#ff703fff",
      buttonColor2: "#b2390aff"
    },
    {
      id: "direct-15",
      title: "C.R. Kothari & Sons",
      subtitle: "Business Solutions",
      description: "A professional corporate website for a legacy business with structured content and brand identity.",
      images: [crksons1, crksons2, crksons3],
      layout: "image-left",
      color: "#ff7f9c",
      buttonColor1: "#f54768ff",
      buttonColor2: "#a91b35ff"
    },
    {
      id: "direct-16",
      title: "Devkrupa Corporation",
      subtitle: "Industrial Solutions",
      description: "A cross-platform mobile application with smooth performance and intuitive design.",
      images: [devkrupa1, devkrupa2, devkrupa3],
      layout: "image-right",
      color: "#ffb1ee",
      buttonColor1: "#d35fbaff",
      buttonColor2: "#9f3287ff"
    },
    {
      id: "direct-17",
      title: "TransOceanic.Tech",
      subtitle: "IT Services",
      description: "Comprehensive analytics dashboard with real-time data visualization and reporting.",
      images: [tocean1, tocean2, tocean3],
      layout: "image-left",
      color: "#ff8fdb",
      buttonColor1: "#d852c2ff",
      buttonColor2: "#911b87ff"
    },
    {
      id: "direct-18",
      title: "PM Partner",
      subtitle: "Business Consulting",
      description: "A clean consulting firm website with professional tone and structured service pages.",
      images: [pmpartner1, pmpartner2, pmpartner3],
      layout: "image-right",
      color: "#a3c4ff",
      buttonColor1: "#5080d9ff",
      buttonColor2: "#1a3a8cff"
    },

    {
      id: "direct-19",
      title: "Kahal Life Coaching",
      subtitle: "Women's Transformation & Coaching",
      description: "A soulful coaching platform designed to empower women through self-discovery, confidence building, and personal transformation using the Kahal Method.",
      images: [kahal1, kahal2, kahal3],
      layout: "image-left",
      color: "#D6C2FF",
      buttonColor1: "#8B5CF6",
      buttonColor2: "#4C1D95"
    },
    {
      id: "direct-20",
      title: "SFP Perfumes",
      subtitle: "Luxury Fragrances & E-Commerce",
      description: "A premium e-commerce platform showcasing luxury perfumes and fragrances with elegant product displays, seamless shopping experiences, and modern brand aesthetics.",
      images: [sfp1, sfp2, sfp3],
      layout: "image-right",
      color: "#8EE3F5",
      buttonColor1: "#22B8CF",
      buttonColor2: "#0C6170"
    },
    {
      id: "direct-21",
      title: "Tara Assurance",
      subtitle: "Perfumes & Lifestyle Products",
      description: "A modern e-commerce website crafted to showcase premium fragrances and lifestyle products through intuitive navigation, engaging visuals, and a refined shopping experience.",
      images: [tara1, tara2, tara3],
      layout: "image-left",
      color: "#FFC6A8",
      buttonColor1: "#FF8C42",
      buttonColor2: "#C75B12"
    },
    {
      id: "direct-22",
      title: "Satvsar Oil",
      subtitle: "Healthy Cooking Oils & E-Commerce",
      description: "A health-focused e-commerce platform promoting pure and natural cooking oils, designed to highlight product quality, wellness benefits, and a trusted shopping experience.",
      images: [satvsar1, satvsar2, satvsar3],
      layout: "image-right",
      color: "#A7F3D0",
      buttonColor1: "#10B981",
      buttonColor2: "#065F46"
    }
  ];

  // ============================================
  // WHITE LABEL PROJECTS — in exact order given
  // ============================================
  const whiteLabelProjects = [
    {
      id: "wl-01",
      title: "Gemsparx",
      subtitle: "Gems & Jewellery",
      description: "A luxurious jewellery brand website with elegant visuals and product-first presentation.",
      images: [gemsparx1, gemsparx2, gemsparx3],
      layout: "image-left",
      color: "#e8c4ff",
      buttonColor1: "#a855f7ff",
      buttonColor2: "#6b21a8ff"
    },
    {
      id: "wl-02",
      title: "Jlad Group",
      subtitle: "Business Services",
      description: "A professional group company website with a multi-service structure and strong branding.",
      images: [jlad1, jlad2, jlad3],
      layout: "image-right",
      color: "#7cd64b",
      buttonColor1: "#5aab2eff",
      buttonColor2: "#2d6010ff"
    },
    {
      id: "wl-03",
      title: "MTM Store",
      subtitle: "E-Commerce",
      description: "Comprehensive analytics dashboard with real-time data visualization and reporting.",
      images: [mtm1, mtm2, mtm3, mtm4],
      layout: "image-left",
      color: "#5e9bff",
      buttonColor1: "#6894dbff",
      buttonColor2: "#223e6bff"
    },
    {
      id: "wl-04",
      title: "Vraj Technologies",
      subtitle: "Electric Mobility",
      description: "A cross-platform mobile application with smooth performance and intuitive design.",
      images: [vrajtech1, vrajtech2, vrajtech3],
      layout: "image-right",
      color: "#c07fff",
      buttonColor1: "#9446eaff",
      buttonColor2: "#4a0c99ff"
    }
  ];

  const displayProjects = isWhiteLabel ? whiteLabelProjects : directProjects;

  const heroContent = {
    heading: isWhiteLabel
      ? "Developed by TH (White label projects for agency partners)"
      : "Projects Delivers to Our Clients.",
    subhead: "Websites that Perform. Designs that Impress.",
    workTitle: isWhiteLabel ? "White label Work" : "Direct Clients Work"
  };

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
              {isWhiteLabel ? (
                <>
                  Developed by TH{' '}
                  <span className="hero-heading-sub">
                    (White label projects for agency partners)
                  </span>
                </>
              ) : (
                "Projects Delivers to Our Clients."
              )}
            </h1>
            <p
              className="hero-subheading"
              style={{
                fontSize: '1.2rem',
                maxWidth: '500px',
                '@media (max-width: 768px)': {
                  fontSize: '1rem',
                  maxWidth: '100%',
                  margin: '0 auto'
                }
              }}
            >
              {heroContent.subhead}
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
              <Card data-title="Fast">
                <video
                  src={web4}
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
                    },
                    '@media (max-width: 1024px)': {
                      height: '90%',
                    }
                  }}
                />
              </Card>

              <Card data-title="Optimized">
                <video
                  src={web2}
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
                    },
                    '@media (max-width: 1024px)': {
                      height: '95%',
                    }
                  }}
                />
              </Card>

              <Card data-title="Reliable">
                <video
                  src={web3}
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
                    },
                    '@media (max-width: 1024px)': {
                      height: '95%',
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
          projects={displayProjects}
          title={heroContent.workTitle}
          highlight={isWhiteLabel ? "White label" : "Work"}
          subtitle="Beautiful, functional websites that drive results."
        />
      </div>

      <div>
        <CTASection
          headline="Your Website, Zero Limits"
          subline="Design. Speed. Results."
          primaryColor="linear-gradient(135deg, #6547c5, #2d1b69)"
          primaryShadow="0 0 20px rgba(101, 71, 197, 0.6)"
          primaryHoverShadow="0 0 35px rgba(101, 71, 197, 0.9)"
          secondaryColor="#6547c5"
          secondaryShadow="none"
          secondaryHoverShadow="0 0 25px rgba(101, 71, 197, 0.8)"
        />
      </div>
    </div>
  );
};

export default Webdevlopment;
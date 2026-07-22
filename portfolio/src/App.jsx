import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import PortfolioNavbar from './Components/Navbar/PortfolioNavbar';
import BottomServiceBar from './Components/Navbar/Bottomnav/BottomServiceBar';

import './App.css';
import './Components/Scss/GoToTop.scss';  // <-- Add this new SCSS file

import Home from './Pages/Home/Home';
import MobileApp from './Pages/Services/Mobile/MobileApp';
import Webdevlopment from './Pages/Services/Website/Webdevlopment';
import CustomSoftware from './Pages/Services/CustomSoftware/CustomSoftware';
import UIUX from './Pages/Services/UiUx/UIUX';
import GraphicDesign from './Pages/Services/GraphicDesign/GraphicDesign';
import Marketing from './Pages/Services/Marketing Solution/Marketing';


import SmoothFollower from './Components/Animations/CursorAnimation/SmoothFollower';
import Error from './Pages/404/Error';
// import FullWidthImage from './Pages/404/FullWidthImage'; 


function App() {
  const [hidePortfolioNav, setHidePortfolioNav] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false); // <-- new state

  const footerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set footer height
  useEffect(() => {
    const setFooterH = () => {
      if (footerRef.current) {
        document.documentElement.style.setProperty(
          '--footer-h',
          `${footerRef.current.offsetHeight}px`
        );
      }
    };
    setFooterH();
    window.addEventListener('resize', setFooterH);
    return () => window.removeEventListener('resize', setFooterH);
  }, []);

  // Scroll & resize behavior
  useEffect(() => {
    const handleScrollOrResize = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const pageH = document.body.scrollHeight;
      const scrollPercent = (scrollY / (pageH - winH)) * 100;
      const isMobile = window.innerWidth <= 768;

      const footerH = footerRef.current?.offsetHeight || 0;
      const distanceToBot = pageH - (scrollY + winH);
      const inFooterView = distanceToBot <= footerH;

      // PortfolioNavbar visibility
      if (isMobile) {
        setHidePortfolioNav(true);
      } else {
        const scrolledPast70vh = scrollY > 0.7 * window.innerHeight;
        setHidePortfolioNav(scrolledPast70vh);
      }

      // Bottom fixed service bar
      setShowBottomBar(scrollPercent >= 10 && !inFooterView);

      // Scroll under navbar version
      setShowScrollBar(
        scrollPercent >= 10 && scrollPercent <= 50 && isMobile && !inFooterView
      );

      // Go to top button (50vh)
      setShowGoToTop(scrollY > 0.5 * window.innerHeight);
    };

    handleScrollOrResize();
    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter basename="/portfolio">
    {!isMobile && <SmoothFollower />}
      <Navbar />

      {!hidePortfolioNav && <PortfolioNavbar />}

      <div id="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mobile" element={<MobileApp />} />
          <Route path="/website" element={<Webdevlopment />} />
          <Route path="/uiux" element={<UIUX />} />
          <Route path="/graphicdesign" element={<GraphicDesign />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/custom-software" element={<CustomSoftware />} />
          {/* <Route path="/img" element={<FullWidthImage />} / > */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>

      {showBottomBar && <BottomServiceBar />}
      <Footer ref={footerRef} />

      {/* Go To Top Button */}
      {showGoToTop && (
        <button className="go-to-top" onClick={scrollToTop}>
          <span className="arrow arrow-default">↑</span>
          <span className="arrow arrow-hover">↑</span>
        </button>
      )}
    </BrowserRouter>
  );
}

export default App;

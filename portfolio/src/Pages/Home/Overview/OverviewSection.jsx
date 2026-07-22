import React, { useRef } from "react";
import VariableProximity from "./VariableProximity";

import "./OverviewSection.scss";

const OverviewSection = () => {
  const containerRef = useRef(null);

  return (
    <section className="overview-section">

      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      <div className="overview-content" ref={containerRef}>

        <h2 className="overview-heading">OVERVIEW</h2>

        <div className="overview-text">
          {/* Paragraph 1 */}
          <VariableProximity
            label={`At TECHORSES, we believe in building ideas that work - not just on screens, but in real world. We're a team of passionate designers, developers, and marketers dedicated to turning your vision into digital reality. From websites to full - scale branding, every detail is crafted with purpose. This page offers a glimpse into our journey, showcasing work across Web Development, Custom Software, Digital Marketing, UI/UX, App Design, and Graphic Design - all driven by creativity and a commitment to quality.`}
            className="overview-paragraph text-block"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={120}
            falloff="linear"
          />
          
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;

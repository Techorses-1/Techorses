import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Link as ScrollLink } from "react-scroll"; 
import "./LegendSlider.scss";

const ProjectItem = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const getUnderlineGradient = (baseColor) => {
    const color = baseColor || '#a560f7';

    // Function to lighten color
    const lightenColor = (hex, percent) => {
      const num = parseInt(hex.slice(1), 16);
      const r = Math.min(255, (num >> 16) + percent);
      const g = Math.min(255, ((num >> 8) & 0x00FF) + percent);
      const b = Math.min(255, (num & 0x0000FF) + percent);
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    // Create gradient from base color to lighter version
    return `linear-gradient(90deg, ${color}, ${lightenColor(color, 40)})`;
  };


  const getGradientStyle = (baseColor, layout) => {
    // Fallback to purple if no color provided
    const color = baseColor || '#a560f7';

    // Convert HEX to RGBA with opacity
    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Darken color (for gradient stops)
    const darkenColor = (hex, percent) => {
      const num = parseInt(hex.slice(1), 16);
      const r = Math.max(0, (num >> 16) - percent);
      const g = Math.max(0, ((num >> 8) & 0x00FF) - percent);
      const b = Math.max(0, (num & 0x0000FF) - percent);
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    // Generate gradient stops
    const colorLight = hexToRgba(color, 0.15);      // Light + transparent
    const colorMedium = hexToRgba(color, 0.3);      // Medium opacity
    const colorDark = hexToRgba(darkenColor(color, 20), 0.3);  // Darker + more opaque
    const colorDarker = hexToRgba(darkenColor(color, 30), 0.15); // Deepest


    const borderColor1 = color; // Inner edge
    const borderColor2 = darkenColor(color, 40); // Outer edge


    const gradientDirection = layout === 'image-left'
      ? 'to left'   // Text on right → gradient flows right-to-left
      : 'to right'; // Text on left → gradient flows left-to-right

    return {
      '--project-bg': `linear-gradient(
      ${gradientDirection},
      ${colorLight} 0%,
      ${colorMedium} 40%,
      ${colorDark} 80%,
      ${colorDarker} 100%
    )`,
      '--project-shadow': `0 0 20px ${hexToRgba(color, 0.3)}`,
      '--border-color1': borderColor1,
      '--border-color2': borderColor2,
    };
  };


  // const getGradientStyle = (baseColor, layout) => {
  //   // Fallback to purple if no color provided
  //   const color = baseColor || '#a560f7';

  //   // Convert HEX to RGBA with opacity
  //   const hexToRgba = (hex, alpha) => {
  //     const r = parseInt(hex.slice(1, 3), 16);
  //     const g = parseInt(hex.slice(3, 5), 16);
  //     const b = parseInt(hex.slice(5, 7), 16);
  //     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  //   };

  //   // Darken color (for gradient stops)
  //   const darkenColor = (hex, percent) => {
  //     const num = parseInt(hex.slice(1), 16);
  //     const r = Math.max(0, (num >> 16) - percent);
  //     const g = Math.max(0, ((num >> 8) & 0x00FF) - percent);
  //     const b = Math.max(0, (num & 0x0000FF) - percent);
  //     return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  //   };

  //   // Generate gradient stops
  //   const colorLight = hexToRgba(color, 0.15);      // Light + transparent
  //   const colorMedium = hexToRgba(color, 0.3);      // Medium opacity
  //   const colorDark = hexToRgba(darkenColor(color, 20), 0.6);  // Darker + more opaque
  //   const colorDarker = hexToRgba(darkenColor(color, 30), 0.75); // Deepest


  //   const borderColor1 = color; // Inner edge
  //   const borderColor2 = darkenColor(color, 40); // Outer edge


  //   const gradientDirection = layout === 'image-left'
  //     ? 'to left'   // Text on right → gradient flows right-to-left
  //     : 'to right'; // Text on left → gradient flows left-to-right

  //   return {
  //     '--project-bg': `linear-gradient(
  //     ${gradientDirection},
  //     ${colorLight} 0%,
  //     ${colorMedium} 40%,
  //     ${colorDark} 80%,
  //     ${colorDarker} 100%
  //   )`,
  //     '--project-shadow': `0 0 20px ${hexToRgba(color, 0.3)}`,
  //     '--border-color1': borderColor1,
  //     '--border-color2': borderColor2,
  //   };
  // };





const getButtonGradient = (color1, color2) => ({
  background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
  '--btn-shadow1': `${color1}70`, // 70% opacity
  '--btn-shadow2': `${color2}50`, // 50% opacity
  '--btn-color1': color1,
  '--btn-color2': color2,
  boxShadow: `0 0 10px var(--btn-shadow1), 0 0 20px var(--btn-shadow2)`
});




  return (
    <motion.section
      id={project.id}
      className={`project-item ${project.layout}`}
      // style={getGradientStyle(project.color)}
      // style={getGradientStyle(project.color, project.layout)} 
      style={getGradientStyle(project.color, project.layout)}

      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <div className="project-image">
        <AnimatePresence mode="wait">
          <motion.img
            key={`image-${currentImageIndex}-${index}`}
            src={project.images[currentImageIndex]}
            alt="Project slide"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
      </div>

      <div className="project-text">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {project.subtitle}
          <span
            className="title-line"
            style={{ background: getUnderlineGradient(project.color) }}
          ></span>
        </motion.h3>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {project.title}
        </motion.h1>
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {project.description}
        </motion.p> */}

        <motion.div
          className="slider-buttons"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button
            onClick={prevSlide}
            style={{
              '--btn-color1': project.buttonColor1,
              '--btn-color2': project.buttonColor2,
              ...getButtonGradient(project.buttonColor1, project.buttonColor2)
            }}
          >
            &lt;
          </button>

          <button
            onClick={nextSlide}
            style={{
              '--btn-color1': project.buttonColor1,
              '--btn-color2': project.buttonColor2,
              ...getButtonGradient(project.buttonColor1, project.buttonColor2)
            }}
          >
            &gt;
          </button>

        </motion.div>
      </div>
    </motion.section>
  );
};

const LegendSlider = ({
  projects = [],
  title = "Our Premium Work",
  highlight = "Premium",
  subtitle = "Crafting digital excellence through innovative solutions"
}) => {
  const navRef = useRef(null);

  return (
    <div className="projects-showcase-container">
      <section className="projects-showcase">
        <div className="gradient-bg"></div>
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {title.split(highlight)[0]}
            <span className="highlight">{highlight}</span>
            {title.split(highlight)[1]}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="subtitle"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectItem key={`project-${index}`} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LegendSlider;
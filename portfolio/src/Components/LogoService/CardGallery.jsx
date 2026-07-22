import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CardGallery.scss";

const CardGallery = ({ cards = [] }) => {
  const [currentImages, setCurrentImages] = useState(
    cards.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );

  if (!cards.length) return null;

  const prevImage = (cardIndex) => {
    setCurrentImages(prev => ({
      ...prev,
      [cardIndex]: prev[cardIndex] === 0
        ? cards[cardIndex].images.length - 1
        : prev[cardIndex] - 1
    }));
  };

  const nextImage = (cardIndex) => {
    setCurrentImages(prev => ({
      ...prev,
      [cardIndex]: prev[cardIndex] === cards[cardIndex].images.length - 1
        ? 0
        : prev[cardIndex] + 1
    }));
  };

  // Function to generate gradient style similar to LegendSlider
  const getGradientStyle = (baseColor) => {
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
    const colorLight = hexToRgba(color, 0.15);
    const colorMedium = hexToRgba(color, 0.3);
    const colorDark = hexToRgba(darkenColor(color, 20), 0.3);
    const colorDarker = hexToRgba(darkenColor(color, 30), 0.15);

    const borderColor1 = color;
    const borderColor2 = darkenColor(color, 40);

    return {
      '--project-bg': `linear-gradient(
        to right,
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

  // Array of different colors for each card (matching your gradient backgrounds)
  const cardColors = [
    '#6a5acd', // Purple
    '#ff6b6b', // Red
    '#48dbfb', // Blue
    '#fdcb6e', // Orange
    '#00b894', // Green
    '#a29bfe', // Light Purple
    '#fd79a8'  // Pink
  ];

  return (
    <div className="main-gallery-bg">
      <div className="gallery-wrapper">
        <div className="cards-column-container">
          {cards.map((card, cardIndex) => {
            // Get a different color for each card
            const colorIndex = cardIndex % cardColors.length;
            const cardColor = card.color || cardColors[colorIndex];
            const gradientStyle = getGradientStyle(cardColor);

            return (
              <motion.div
                key={cardIndex}
                className="gallery-card-item"
                style={gradientStyle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              >
                {/* Header - Moved outside gallery-card-content */}
                <div className="card-heading">
                  <h2>{card.title}</h2>
                </div>

                <div className={`gallery-card-content ${card.title === "Marketing" ? "marketing-card" : ""}`}>
                  {/* Image Counter */}
                  <div className="image-counter">
                    {currentImages[cardIndex] + 1} / {card.images.length}
                  </div>

                  {/* Slider */}
                  <div className="slider-container">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImages[cardIndex]}
                        className="image-container"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        {card.title === "Marketing" && Array.isArray(card.images[currentImages[cardIndex]]) ? (
                          // Render image pair (ONLY for Marketing card)
                          <div className="image-pair">
                            {card.images[currentImages[cardIndex]].map((img, idx) => (
                              <div key={idx} className="pair-image-wrapper">
                                <img
                                  src={img}
                                  alt={`${card.title} - Image ${currentImages[cardIndex] + 1}-${idx + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Render single image (for all other cards)
                          <img
                            src={card.images[currentImages[cardIndex]]}
                            alt={`${card.title} - Image ${currentImages[cardIndex] + 1}`}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons - Moved to gallery-card-content */}
                  <div className="nav-buttons-container">
                    <button className="nav prev" onClick={() => prevImage(cardIndex)}>
                      <FaChevronLeft />
                    </button>
                    <button className="nav next" onClick={() => nextImage(cardIndex)}>
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardGallery;
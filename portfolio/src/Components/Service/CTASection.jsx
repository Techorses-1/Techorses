import React from "react";
import "./CTASection.scss";

const GRID_SIZE = 60;
const SQUARE_POSITIONS = [
  [1, 1], [2, 2], [3, 1], [4, 4], [4, 6], [5, 5],
  [6, 8], [7, 8], [3, 16], [2, 17], [3, 18],
  [8, 1], [9, 1], [7, 12], [8, 18], [7, 21], [6, 20],
];

const STAR_POSITIONS = [
  [2, 7], [3, 3], [5, 10], [6, 6], [7, 3], [8, 9], [9, 5], [4, 13],
  [2, 14], [5, 2], [6, 17], [7, 14], [3, 19], [1, 12], [8, 16],
];

const CTASection = ({
  headline = "Your Product, Beautifully Usable",
  subline = "Design With Intention.",
  buttonText = "Let's Build",
  // New props for button colors
  primaryColor = "default",
  secondaryColor = "default",
  primaryShadow = "default",
  secondaryShadow = "default",
  primaryHoverShadow = "default", // Changed from primaryHoverColor
  secondaryHoverShadow = "default" // Changed from secondaryHoverColor
}) => {

  // Add custom CSS variables based on props
  const buttonStyles = {
    '--primary-color': primaryColor !== "default" ? primaryColor : null,
    '--secondary-color': secondaryColor !== "default" ? secondaryColor : null,
    '--primary-shadow': primaryShadow !== "default" ? primaryShadow : null,
    '--secondary-shadow': secondaryShadow !== "default" ? secondaryShadow : null,
    '--primary-hover-shadow': primaryHoverShadow !== "default" ? primaryHoverShadow : null,
    '--secondary-hover-shadow': secondaryHoverShadow !== "default" ? secondaryHoverShadow : null,
  };

  return (
    <section className="main-cta">
      <section className="cta-section">
        <div className="grid-overlay">
          {SQUARE_POSITIONS.map(([row, col], idx) => (
            <div
              key={`sq-${idx}`}
              className={`square ${idx % 4 === 0 ? "diagonal" : ""}`}
              style={{
                top: `${row * GRID_SIZE}px`,
                left: `${col * GRID_SIZE}px`,
              }}
            />
          ))}

          {STAR_POSITIONS.map(([row, col], idx) => (
            <div
              key={`star-${idx}`}
              className="star-dot"
              style={{
                top: `${row * GRID_SIZE + 28}px`,
                left: `${col * GRID_SIZE + 28}px`,
              }}
            />
          ))}
        </div>

        <div className="cta-content">
          <h1>{headline}</h1>
          <p>{subline}</p>
          <div className="cta-buttons" style={buttonStyles}>
            <button
              className="primary-btn"
              onClick={() => window.open("https://wa.me/917778048992", "_blank")}
            >
              {buttonText}
            </button>

            <button
              className="secondary-btn"
              onClick={() => (window.location.href = "tel:+917778048992")}
            >
              +91 7778048992
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CTASection;
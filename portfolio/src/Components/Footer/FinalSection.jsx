import React from "react";
import "./FinalSection.scss";
import { motion } from "framer-motion";
import { FaHubspot, FaFigma, FaSlack, FaIntercom, FaChartLine } from "react-icons/fa";
import { FaTrello } from "react-icons/fa";


const logos = [
  { icon: <FaHubspot />, color: "#ff7a59" },
  { icon: <FaFigma />, color: "#a259ff" },
  { icon: <FaSlack />, color: "#DA70D6" },
  { icon: <FaTrello />, color: "#48D1CC" },
  { icon: <FaIntercom />, color: "#CD853F" },
  { icon: <FaChartLine />, color: "#7CFC00" },
];


const FinalSection = () => {
  return (
    <motion.section
      className="final-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="content-container">
        {/* Floating logos now inside container but behind content */}
        <div className="floating-logos">
          {logos.map((logo, index) => (
            <motion.div
              className="floating-icon"
              key={index}
              animate={{
                rotate: 360,
                y: [0, -10, 0, 10, 0] // Added subtle floating motion
              }}
              transition={{
                repeat: Infinity,
                duration: 15 + index * 2,
                ease: "easeInOut"
              }}
              style={{ color: logo.color }}
            >
              {logo.icon}
            </motion.div>
          ))}
        </div>

        <p className="live-tag">Less noise. More meaning.</p>

        <h2 className="heading">
          Crafting digital experiences<br />that drive real impact
        </h2>
        <p className="subtext">
          Proven results. Creative precision.
          <span className="mobile-break"> <br /></span>
          Trusted by industry leaders.
        </p>
        <div className="buttons">
          {/* WhatsApp button */}
          <button
            className="fancy-button purple"
            onClick={() =>
              window.open("https://wa.me/917778048992", "_blank")
            }
          >
            Let's Connect
          </button>

          {/* Call button */}
          <button
            className="fancy-button red"
            onClick={() => (window.location.href = "tel:+917778048992")}
          >
            +91 7778048992
          </button>
        </div>

      </div>
    </motion.section>
  );
};

export default FinalSection;
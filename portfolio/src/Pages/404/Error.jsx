import React from "react";
import { motion } from "framer-motion";
import "./Error.scss";

const Error = () => {
  return (
   <div className="main-error-page">


    <div className="error-page">
      <div className="stars-left">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 80}%`, // keep inside container
              transform: `rotate(45deg) scale(${0.6 + Math.random() * 1.2})`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></span>
        ))}
      </div>

      <div className="stars-right">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 80}%`,
              transform: `rotate(45deg) scale(${0.6 + Math.random() * 1.2})`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></span>
        ))}
      </div>


      <div className="error-content">
        <motion.p
          className="error-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          The page you’re looking for might be lost in space 🚀.
          <br />
          Let’s get you back home.
        </motion.p>

        <motion.a
          href="/"
          className="error-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back Home
        </motion.a>
      </div>
    </div>
    </div>
  );
};

export default Error;

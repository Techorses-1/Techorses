import React, { useEffect, useState } from "react";
import "./MobileAppComingSoon.scss";
// import mobile from "../../../assets/Services/Mobileapp/mobile.jpg" 
import mobileanimation from "../../../assets/Services/Mobileapp/mobilecomingsoon.mp4"

const messages = [
  "Coming Soon...",
  "Get Ready 🚀",
  "Launching Soon 📱"
];

const MobileAppComingSoon = () => {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentMessage = messages[messageIndex];

    let typingSpeed = deleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < currentMessage.length) {
        setText(prev => prev + currentMessage.charAt(charIndex));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setText(currentMessage.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === currentMessage.length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setMessageIndex((messageIndex + 1) % messages.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, messageIndex]);

  return (
    <div className="mobile-comingsoon">
      {/* Mockup with Unsplash images */}
      <div className="mockup-container">
        <div className="phone">
          <video 
            src={mobileanimation}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Typing Effect */}
      <div className="typing-text">
        <span>{text}</span>
        <span className="cursor">|</span>
      </div>
    </div>
  );
};

export default MobileAppComingSoon;

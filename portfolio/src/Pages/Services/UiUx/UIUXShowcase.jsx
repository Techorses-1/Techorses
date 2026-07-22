import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./UIUXShowcase.scss";

// ... your image imports ...
import img1 from "../../../assets/Services/uiux/mockup/1.png";
import img2 from "../../../assets/Services/uiux/mockup/2.png";
import img3 from "../../../assets/Services/uiux/mockup/3.png";
import img4 from "../../../assets/Services/uiux/mockup/4.png";
import img5 from "../../../assets/Services/uiux/mockup/5.png";
import img6 from "../../../assets/Services/uiux/mockup/6.png";
import img7 from "../../../assets/Services/uiux/mockup/7.png";
import img8 from "../../../assets/Services/uiux/mockup/8.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const UIUXShowcase = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate container height after images are loaded
  useEffect(() => {
    const calculateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        setContainerHeight(height);
        setIsLoaded(true);
      }
    };

    // Wait for images to load before calculating height
    const imageLoadPromises = images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imageLoadPromises)
      .then(() => {
        calculateHeight();
      })
      .catch(() => {
        // If images fail to load, still calculate height
        calculateHeight();
      });
    
    // Also calculate on window resize
    window.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || containerHeight === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size to match container with proper pixel ratio
    const resizeCanvas = () => {
      const container = containerRef.current;
      const dpr = window.devicePixelRatio || 1;

      const width = container.offsetWidth;
      const height = containerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circle class
    class Circle {
      constructor() {
        const sizeOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
        this.radius = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];

        // Use the full container height for positioning
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        const speedFactor = 1.8 + (this.radius / 8);
        this.dx = (Math.random() - 0.5) * speedFactor;
        this.dy = (Math.random() - 0.5) * speedFactor;

        this.opacity = Math.random() * 0.4 + 0.1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }

        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    // Create circles
    const circles = [];
    const circleCount = 160;

    for (let i = 0; i < circleCount; i++) {
      circles.push(new Circle());
    }

    // Animation loop
    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      circles.forEach(circle => {
        circle.update();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [containerHeight, isLoaded]);

  return (
    <div className="uiux-main-container" ref={containerRef}>
      {/* Canvas for floating circles - positioned to cover entire container */}
      {isLoaded && (
        <canvas
          ref={canvasRef}
          className="floating-circles-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${containerHeight}px`,
            zIndex: 0
          }}
        />
      )}

      <div className="uiux-zigzag-container" style={{ position: 'relative', zIndex: 1 }}>
        {images.map((img, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              className={`uiux-zigzag-item ${isLeft ? "left" : "right"}`}
              initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={img} alt={`Mockup ${index + 1}`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UIUXShowcase;
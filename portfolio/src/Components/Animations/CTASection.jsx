import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTASection.scss'; // We'll create this SCSS file

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const ctaRef = useRef();
    const headingRef = useRef();
    const textRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        // Animation for the CTA section
        gsap.from([headingRef.current, textRef.current, buttonRef.current], {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });

        // Button hover animation
        const button = buttonRef.current;
        const hoverTL = gsap.timeline({ paused: true });
        
        hoverTL.to(button, {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            duration: 0.3
        });

        button.addEventListener('mouseenter', () => hoverTL.play());
        button.addEventListener('mouseleave', () => hoverTL.reverse());

        return () => {
            button.removeEventListener('mouseenter', () => hoverTL.play());
            button.removeEventListener('mouseleave', () => hoverTL.reverse());
        };
    }, []);

    return (
        <section className="cta-section" ref={ctaRef}>
            <div className="cta-container">
                <h2 ref={headingRef}>Ready to Elevate Your Digital Presence?</h2>
                <p ref={textRef}>
                    Let's create something amazing together. Our team is ready to bring your vision to life with 
                    cutting-edge design and development solutions tailored to your needs.
                </p>
                <button ref={buttonRef} className="cta-button">
                    Let's Build
                </button>
            </div>
        </section>
    );
};

export default CTASection;
'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function SmoothFollower() {
    const mousePosition = useRef({ x: 0, y: 0 });
    const dotPosition = useRef({ x: 0, y: 0 });
    const borderDotPosition = useRef({ x: 0, y: 0 });

    const [renderPos, setRenderPos] = useState({
        dot: { x: 0, y: 0 },
        border: { x: 0, y: 0 },
    });
    const [isHovering, setIsHovering] = useState(false);

    const DOT_SMOOTHNESS = 0.2;
    const BORDER_DOT_SMOOTHNESS = 0.1;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (element && element.closest('a, button, img, input, textarea, select')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };


        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', handleMouseMove);

        const interactiveElements = document.querySelectorAll(
            'a, button, img, input, textarea, select , p , span'
        );

        interactiveElements.forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        const animate = () => {
            const lerp = (start, end, factor) => start + (end - start) * factor;

            dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS);
            dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS);

            borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS);
            borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS);

            setRenderPos({
                dot: { x: dotPosition.current.x, y: dotPosition.current.y },
                border: { x: borderDotPosition.current.x, y: borderDotPosition.current.y },
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach((element) => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
            cancelAnimationFrame(animationId);
        };
    }, []);

    if (typeof window === 'undefined') return null;

    return createPortal(
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            {/* Small dot */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    background: "transperent",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "1px solid white",
                    transform: "translate(-50%, -50%)",
                    left: `${renderPos.dot.x}px`,
                    top: `${renderPos.dot.y}px`,
                    position: "fixed",
                    pointerEvents: "none",
                    zIndex: 999999,
                    opacity: 0.5
                }}
            />

            {/* Border circle */}
            {/* <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    border: "2px solid blue",
                    width: isHovering ? "44px" : "28px",
                    height: isHovering ? "44px" : "28px",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    left: `${renderPos.border.x}px`,
                    top: `${renderPos.border.y}px`,
                    position: "fixed",   // ✅ Add this
                    transition: "width 0.3s, height 0.3s"
                }}
            /> */}
        </div>
        ,
        document.body
    );
}

import React, { useEffect } from "react";
import ScrollVelocity from "../../../Components/Animations/ScrollText/ScrollText";
import "./TextScrollAnimation.scss";
import logo from "../../../assets/Images/Techorses-Logo_01.png";

const TextScrollAnimation = () => {
  // useEffect(() => {
  //   const numBalls = 50;
  //   const balls = [];

  //   for (let i = 0; i < numBalls; i++) {
  //     let ball = document.createElement("div");
  //     ball.classList.add("ball");
  //     ball.style.background = "#ffffff"; // 👈 white color only
  //     ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  //     ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  //     ball.style.transform = `scale(${Math.random()})`;
  //     const size = `${Math.random() + 0.3}em`;
  //     ball.style.width = size;
  //     ball.style.height = size;

  //     balls.push(ball);
  //     document.querySelector(".scroll-velocity-section").appendChild(ball);
  //   }

  //   balls.forEach((el, i) => {
  //     const to = {
  //       x: Math.random() * (i % 2 === 0 ? -11 : 11),
  //       y: Math.random() * 12
  //     };

  //     el.animate(
  //       [
  //         { transform: "translate(0, 0)" },
  //         { transform: `translate(${to.x}rem, ${to.y}rem)` }
  //       ],
  //       {
  //         duration: (Math.random() + 1) * 2000,
  //         direction: "alternate",
  //         fill: "both",
  //         iterations: Infinity,
  //         easing: "ease-in-out"
  //       }
  //     );
  //   });

  //   return () => {
  //     balls.forEach(ball => ball.remove());
  //   };
  // }, []);


  return (
    <section className="scroll-velocity-section">
      {/* Scroll Row 1 */}
      <ScrollVelocity
        texts={[
          <>
            Techorses.com <span className="logo-wrapper">
              <img src={logo} alt="logo" className="inline-icon" />
            </span>
          </>
        ]}
        velocity={-80}
        numCopies={15}
        className="primary"
        scrollerClassName="scroller primary"
      />

      {/* Scroll Row 2 */}
      <ScrollVelocity
        texts={["Ride the technology.\u00A0\u00A0\u00A0\u00A0"]}
        velocity={100}
        numCopies={20}
        className="secondary"
        scrollerClassName="scroller secondary"
      />
    </section>
  );
};

export default TextScrollAnimation;

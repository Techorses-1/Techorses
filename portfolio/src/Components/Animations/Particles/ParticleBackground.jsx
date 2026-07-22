// import { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// const ParticleBackground = () => {
//   const particlesInit = useCallback(async (engine) => {
//     // This adds the full feature set
//     await loadFull(engine);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         fullScreen: {
//           enable: false, // Disable full page, let you position manually
//         },
//         background: {
//           color: "transparent", // Transparent to overlay in sections
//         },
//         particles: {
//           number: {
//             value: 60,
//           },
//           color: {
//             value: "#d3cfc7",
//           },
//           opacity: {
//             value: 0.2,
//           },
//           size: {
//             value: 1.5,
//           },
//           move: {
//             enable: true,
//             speed: 0.2,
//             direction: "none",
//             outModes: {
//               default: "bounce",
//             },
//           },
//         },
//       }}
//     />
//   );
// };

// export default ParticleBackground;

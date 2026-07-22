import React, { useEffect } from 'react';
import FinalSection from '../../Components/Footer/FinalSection'
import './Home.scss';
import TextScrollAnimation from '../Home/TextAnimation/TextScrollAnimation';
import HeroSection from './NewHero/HeroSection';
// import ScrollTriggered from './Services/ScrollTriggered'; 
import Services from './Services/Services';
import OverviewSection from './Overview/OverviewSection';

const Home = () => {

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>


     <HeroSection/>

      <OverviewSection/>
      <Services/>
      {/* <ScrollTriggered/>  */}
      <TextScrollAnimation />
      <FinalSection />
      






    </div>
  )
}

export default Home

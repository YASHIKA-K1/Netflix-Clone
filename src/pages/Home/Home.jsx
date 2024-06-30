import React from 'react';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import hero_banner from '../../assets/banner.jpg'
import hero_title from '../../assets/banner-text.png'
import play_icon from '../../assets/play.png'
import info_icon from '../../assets/info.png'
import { TitleCards } from '../../Components/TitleCards/TitleCards';
import { Footer } from '../../Components/Footer/Footer';


export const Home = () => {
  return (
    <div className='home'>
      <Navbar />
    <div className="hero">
      <img src={hero_banner} alt='' className='banner-img'/>
      <div className='hero-caption'>
        <img src={hero_title} alt='' className='caption-img'/>
        <p>When a 17-year-old reports a sexual assault at her high school, an investigation upends her life and tests her relationships.</p>
        <div className="hero-btns">
          <button className='btn'><img src={play_icon} alt=''/>Play</button>
          <button className='btn dark-btn'><img src={info_icon} alt=''/>More Info</button>          
        </div>
        <TitleCards/>
      </div>
    </div>
    <div className="more-cards">
    <TitleCards title = {"Blockbuster Movies"} category={"top_rated"} />
    <TitleCards title = {"Only on Netflix"} category={"upcoming"}/>
    <TitleCards title = {"Upcoming"} category={"top_rated"}/>
    <TitleCards title = {"Top Pics for you"} category={"popular"} />
    </div>
    <Footer/>
    </div>
  );
};

export default Home;

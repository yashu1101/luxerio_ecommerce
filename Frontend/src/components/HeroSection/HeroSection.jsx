import image1 from "../../assets/Hero/heroImage.webp";

import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-container">
        <div className="hero-section-text-container">
          <span className="hero-section-text h-s-text-1">Explore, shop,</span>

          <span className="hero-section-text h-s-text-2">repeat again.</span>

          <button className="hero-section-shop-now-btn">Shop Now</button>
          
        </div>
        <div className="hero-section-image-container">
          <img className="hero-section-image" src={image1} />
        </div>
      </div>
    </div>
  );
};

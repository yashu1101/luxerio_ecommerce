import "./Banner.css";
export const Banner = ({ src }) => {
  return (
    <div className="banner">
      <div className="banner-image-container">
        <img className="banner-image" src={src} alt="img" />
        
      </div>
    </div>
  );
};

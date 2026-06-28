import NotFoundImg  from "../../assets/404/404.webp";
import './NotFound.css'
export const NotFound = () => {
  return (
    <div className="notfound-section">
      <div className="notfound-container">
        <div className="notfound-image-container">
          <img src={NotFoundImg} alt="" className="notfound-image" />
        </div>
        <span className="notfound-title">Oops, Page not found</span>
        <div className="notfound-button-container">
          <button className="notfound-button notfound-back-button">Go Back</button>
          <button className="notfound-button notfound-home-button">Home</button>
        </div>
      </div>
    </div>
  );
};

import "./Carousel.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Carousel = ({ images, control, auto }) => {
  const [count, setCount] = useState(0);

  console.log(images.length)

  useEffect(() => {

    if (auto === true) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev >= images.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  const carouselNext = () => {
    setCount((prev) => {
      if (prev >= images.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  }
  const carouselPrev = () => {
    setCount((prev) => {
      if (prev === 0) {
        return images.length - 1;
      }
      return prev - 1;
    });
  };

  // console.log(count);

  const carouselImages = {
    transform: `translateX(-${count * 100}%)`,
    transition: count === 0 ? "none" : "transform 0.5s ease-in-out",
  };

  return (
    <div className="carousel-section">
      <button className="carousel-buttons carousel-prev" onClick={carouselPrev} ><FontAwesomeIcon className="carousel-button-icon" icon={faChevronLeft} /></button>
      <div className="carousel-container">
        <div style={carouselImages} className="carousel-images">
          {images.map((image, i) => {
            return <img key={i} className="carousel-image" src={image} alt="img" />;
          })}
        </div>
      </div>
      <button className="carousel-buttons carousel-next" onClick={carouselNext} ><FontAwesomeIcon className="carousel-button-icon" icon={faChevronRight} /></button>
    </div>
  );
};

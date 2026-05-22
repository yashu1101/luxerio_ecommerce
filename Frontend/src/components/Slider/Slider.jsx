import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Slider.css";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import { ProductContext } from "../../Context/ProductsContext";

export const Slider = ({ title, sortBy, category, align, to }) => {
  const { products, getAllProduct } = useContext(ProductContext);
  const [sliderProducts, setSliderProducts] = useState([]);

  const [sliderItem, setSliderItem] = useState([]);
  const [error, setError] = useState("");

  const getSliderProducts = async () => {
    try {
      const res = await api.get(`products?category=${category || ""}&sortBy=${sortBy || ""}`);
      setSliderProducts(res?.data?.products);
    } catch (error) {
      setError("Failed to fetch slider products");
    }
  };

  // api for set slider product

  useEffect(() => {
    // getAllProduct({ sortBy: sortBy, category: category });
    getSliderProducts();
  }, []);

  const rowRef = useRef(null);
  const itemRef = useRef(null);

  const sliderTitleBar = {
    textAlign: align,
  };

  const slideLeft = () => {
    if (!rowRef.current || !itemRef.current) return;
    const itemWidth = itemRef.current.offsetWidth;
    rowRef.current.scrollLeft -= itemWidth;
  };

  const slideRight = () => {
    if (!rowRef.current || !itemRef.current) return;
    const itemWidth = itemRef.current.offsetWidth;
    rowRef.current.scrollLeft += itemWidth;
  };

  return (
    <div className="slider-container">
      <div className="slider-titlebar" style={sliderTitleBar}>
        <span className="slider-title">{title}</span>
        <Link className="slider-link-button" to={to}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className="sliders">
        <div onClick={slideLeft} className="slider-buttons slider-button-left">
          <FontAwesomeIcon icon={faChevronLeft} className="slider-button" />
        </div>

        <div className="slider-row" ref={rowRef}>
          {sliderProducts?.map((item, key) => {
            return (
              <div
                className="slider-images"
                key={item._id}
                ref={key === 0 ? itemRef : null} // only first item ref
              >
                <img className="slider-image" src={item.thumbnail} alt="img" />
              </div>
            );
          })}
        </div>

        <div
          onClick={slideRight}
          className="slider-buttons slider-button-right"
        >
          <FontAwesomeIcon icon={faChevronRight} className="slider-button" />
        </div>
      </div>
    </div>
  );
};

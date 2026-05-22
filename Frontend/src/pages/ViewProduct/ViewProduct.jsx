import { useParams, Link, useNavigate, Outlet } from "react-router-dom";
// import { useAPI } from "../../hooks/useAPI";
import { Navbar } from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { PopupBox } from "../../components/PopupBox/PopupBox";
import { Reviews } from "../../components/Reviews/Reviews";
import "./ViewProduct.css";
import { api } from "../../api/axios";
import { useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

export const ViewProduct = () => {
  const { productId } = useParams();
  // console.log(productId);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  // api for get single product data

  const viewProduct = async () => {
    try {
      const res = await api.get(`products/${productId}`);
      setProduct(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    viewProduct();
  }, []);

  const navigate = useNavigate();
  // show all reviews

  // console.log(product);
  const { AddToWishlist } = useContext(WishlistContext);
  const { popup } = useContext(WishlistContext);
  const { cartPopup, AddToCart } = useContext(CartContext);

  return (
    <>
      <div className="product-info">
        {/* product thumbnail section */}
        <div className="product-images-container">
          <div className="product-images">
            {user?.role !== "admin" && (
              <button
                onClick={() => {
                  AddToWishlist(product._id);
                }}
                className="add-to-wishlist-btn">
                <FontAwesomeIcon
                  className="wishlist-icon"
                  icon={faHeart}></FontAwesomeIcon>
              </button>
            )}

            <img className="product-image" src={product?.thumbnail} alt="img" />
          </div>
          {user?.role !== "admin" && (
            <div className="product-action-buttons">
              <Link
                className="product-action-button card-buy-btn"
                to={`/checkout/${product?._id}`}>
                Buy Now
              </Link>
              <button
                onClick={() => {
                  AddToCart(product._id);
                }}
                className="product-action-button add-to-cart-btn">
                Add To Cart
              </button>
            </div>
          )}
        </div>

        {/* product detail section */}
        <div className="product-details-container">
          <h3>{product?.title}</h3>
          <p>{product?.description}</p>

          <span className="rating">
            {" "}
            <FontAwesomeIcon
              className="viewProduct-rating-icon"
              icon={faStar}></FontAwesomeIcon>{" "}
            {product?.rating}
          </span>

          <div className="pricing">
            <span className="price">₹{product?.price}</span>
          </div>

          <div className="product-specs">
            <div className="product-specs-title-bar">
              <span className="product-specs-title">Specification</span>
            </div>
            <div className="product-specs-tab">
              {product?.specifications?.map((specs) => {
                return (
                  <div className="specs">
                    <span className="specs-label">{specs?.key}</span>
                    <span className="specs-value">{specs?.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {user?.role !== "admin" && (
        <div className="reviews-section">
          <div className="reviews-container">
            <div className="product-reviews">
              <div>
                <Reviews
                  reviews={product?.reviews}
                  productId={productId}></Reviews>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

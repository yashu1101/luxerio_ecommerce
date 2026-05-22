import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import "./Wishlist.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { PopupBox } from "../../components/PopupBox/PopupBox";
import { api } from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";

export const Wishlist = () => {
  const { wishlistItem, removeWishlistItem, message } =
    useContext(WishlistContext);
  const { user,loading } = useContext(AuthContext);
  const { popup } = useContext(WishlistContext);
  const { AddToCart, cartPopup } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // api for get data from wishlist
  const getWishlist = async () => {
    try {
      const res = await api.get("wishlist");
      setItems(res.data.products);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // Redirect to login page if user not logged In.

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <>
      <div className="wishlist-section">
        <div className="wishlist-container">
          <div className="cart-heading-container">
            {items.length > 0 ? (
              <h3 className="cart-heading">Wishlist Items</h3>
            ) : (
              <div className="cart-empty-text-container">
                <span className="cart-empty-text">Your wishlist is empty.</span>
                <Link to={"/"} className="shopnow-text">
                  Shop Now
                </Link>
              </div>
            )}
          </div>
          {items.map((item) => (
            <div className="wishlist-item" key={item._id}>
              <div className="wishlist-card-image-container">
                <Link to={`/view/${item._id}`}>
                  <img src={item.thumbnail} className="wishlist-card-image" />
                </Link>
              </div>

              <div className="wishlist-card-details">
                <span className="wishlist-card-title">{item.title}</span>
                <span className="wishlist-card-brand">
                  {item.brand.toUpperCase()}
                </span>

                <span className="wishlist-card-price">
                  Price: ₹{item.price}
                </span>

                <div className="wishlist-buttons">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    onClick={() => {
                      AddToCart(item._id);
                    }}
                    className="wishlist-cart-btn"></FontAwesomeIcon>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                className="wishlist-remove-btn"
                onClick={() => removeWishlistItem(item._id)}>
                {" "}
              </FontAwesomeIcon>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

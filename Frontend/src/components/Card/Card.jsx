import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useState } from "react";

import "./Card.css";
import {
  faCartShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Placeholder } from "../Placeholder/Placeholder";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useAddWishlist } from "../../hooks/useWishlistAction";
import { useAddCart } from "../../hooks/useCartAction";
export const Card = ({
  productId,
  src,
  title,
  rating,
  price,
  brand,
  wishlist,
  cart,
}) => {
  const { data: cartItem } = useCart();
  const { data: wishlistItem } = useWishlist();

  // GET CART ITEM ID
  const cartItemId = cartItem?.map((item) => item?.product?._id);
  const isCartItemAdded = cartItemId?.includes(cart);

  // GET WISHLIST ITEM ID
  const wishlistItemId = wishlistItem?.map((item) => item?._id);
  const isWishlistItemAdded = wishlistItemId?.includes(wishlist);

  // ADD TO WISHLIST MUTATE

  const {
    mutate: AddToWishlistMutate,
    isPending: isAddWishlistPending,
    error: wishlistError,
  } = useAddWishlist();

  // ADD TO CART MUTATE
  const {
    mutate: AddCartMutate,
    isPending: isAddCartPending,
    error: cartError,
  } = useAddCart();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
      {" "}
      <div className="card">
        <FontAwesomeIcon
          onClick={() => AddToWishlistMutate(wishlist)}
          className={`card-wishlist-btn-icon-mobile ${isWishlistItemAdded && "card-wishlist-btn-icon-active"}`}
          icon={faHeart}></FontAwesomeIcon>

        <Link to={`/view/${productId}`} className="card-image-container">
          {!isImageLoaded && (
            <div className="card-placeholder">
              <Placeholder />
            </div>
          )}

          <img
            className="card-image"
            loading="lazy"
            src={src}
            alt="img"
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </Link>
        <div className="card-details">
          <div className="card-sub-details">
            <span className="product-brand">{brand}</span>
            <span className="product-rating">
              {rating}
              <FontAwesomeIcon className="rating-icon" icon={faStar}>
                {" "}
              </FontAwesomeIcon>{" "}
            </span>
          </div>
          <span className="product-title">{title}</span>

          <span className="product-price">{`₹${price}`}</span>
        </div>

        <div className="card-overlay">
          <button className="card-wishlist-btn">
            <FontAwesomeIcon
              className={`card-wishlist-btn-icon  ${isWishlistItemAdded && "card-wishlist-btn-icon-active"} `}
              onClick={() => AddToWishlistMutate(wishlist)}
              icon={faHeart}></FontAwesomeIcon>
          </button>

          <button className="card-cart-btn">
            <FontAwesomeIcon
              onClick={() => AddCartMutate(cart)}
              className={`card-cart-btn-icon  ${isCartItemAdded && "card-cart-btn-icon-active"} `}
              icon={faCartShopping}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </>
  );
};

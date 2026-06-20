import { useEffect } from "react";
import "./Wishlist.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../components/Loader/Loader";
import { useWishlist } from "../../hooks/useWishlist";
import { useDeleteWishlist } from "../../hooks/useWishlistAction";
import { useUser } from "../../hooks/useUser";
import { useAddCart } from "../../hooks/useCartAction";

export const Wishlist = () => {


  const { data: userData, isLoading: userLoading } = useUser();
  const { data, isLoading, error } = useWishlist();
  const { mutate: deleteWishlistMutate, isPending } = useDeleteWishlist();
  const {mutate: addToCartMutate} = useAddCart()

  const navigate = useNavigate();

  // Redirect to login page if user not logged In.

  useEffect(() => {
    if (!userLoading && !userData) {
      navigate("/auth/login", { replace: true });
    }
  }, [userData, userLoading, navigate]);

  // Loading

  if (isLoading) return <Loader height="100dvh" />;

  return (
    <>
      <div className="wishlist-section">
        <div className="wishlist-container">
          <div className="cart-heading-container">
            {data?.length > 0 ? (
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
          {data?.map((item) => (
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
                     addToCartMutate(item._id);
                    }}
                    className="wishlist-cart-btn"></FontAwesomeIcon>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                className="wishlist-remove-btn"
                onClick={() => deleteWishlistMutate(item._id)}>
                {" "}
              </FontAwesomeIcon>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

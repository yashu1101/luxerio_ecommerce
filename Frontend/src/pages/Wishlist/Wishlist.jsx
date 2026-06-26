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
import { Empty } from "../../components/Empty/Empty";
import { AnimatePresence, motion } from "framer-motion";

export const Wishlist = () => {
  const { data: userData, isLoading: userLoading } = useUser();
  const { data, isLoading, error } = useWishlist();
  const { mutate: deleteWishlistMutate, isPending } = useDeleteWishlist();
  const { mutate: addToCartMutate } = useAddCart();

  const navigate = useNavigate();

  // Redirect to login page if user not logged In.

  useEffect(() => {
    if (!userLoading && !userData) {
      navigate("/auth/login", { replace: true });
    }
  }, [userData, userLoading, navigate]);

  // Loading

  if (isLoading) return <Loader height="100dvh" />;

  // if wishlist is empty
  if (!data || data.length === 0)
    return (
      <Empty height={"100dvh"} title={"No item in wishlist"} to={"/"}></Empty>
    );

  return (
    <>
      <div className="wishlist-section">
        <div className="wishlist-container">
          <div className="cart-heading-container">
            <h3 className="cart-heading">Wishlist Items</h3>
          </div>
          <AnimatePresence>
            {data?.map((item) => (
              <motion.div
                className="wishlist-item"
                key={item._id}
                layout
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: 50 }}
                transition={{ duration: 0.3, ease: "easeIn" }}>
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

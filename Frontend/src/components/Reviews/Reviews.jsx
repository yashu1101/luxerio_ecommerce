import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Reviews.css";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useReviewAdd } from "../../hooks/useReviewAdd";
import { useUser } from "../../hooks/useUser";
export const Reviews = ({ reviews, productId }) => {
  const { data: user } = useUser();
  const [reviewForm, setReviewForm] = useState(false);
  const { mutate: addReviewMutate, isPending } = useReviewAdd();
  const [formData, setFormData] = useState({
    comment: "",
    rating: "",
  });

  // add review

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    addReviewMutate(
      {
        productId: productId,
        comment: formData.comment,
        rating: formData.rating,
      },
      {
        onSuccess: (data) => {
          setReviewForm(false);
          console.log(data);
        },
      },
    );
  };

  console.log(user);
  return (
    <div className="review-section">
      <div className="review-heading-container">
        <h3 className="review-heading">Customer review</h3>
      </div>
      <div className="review-container">
        {reviews?.map((review) => {
          return (
            <div className="review-box" key={review?._id}>
              <span className="review-user">{review?.username}</span>
              <span className="review-rating">
                {review?.rating}
                <FontAwesomeIcon
                  className="review-rating-star"
                  icon={faStar}></FontAwesomeIcon>{" "}
              </span>
              <p className="review-comment">{review?.comment}</p>
              <span className="review-date">{review?.createdAt}</span>
            </div>
          );
        })}
        {user !== null && (
          <div className="add-review-button-conatiner">
            <button
              className="add-review"
              onClick={() => {
                setReviewForm(!reviewForm);
              }}>
              Add Review
            </button>
          </div>
        )}
      </div>

      {/* add review form */}
      <div
        className={`review-form-section ${reviewForm && "review-form-section-show"} `}>
        <div className="review-form-container">
          <h3>Add review</h3>
          <form className="review-form" onSubmit={handleOnSubmit}>
            <div className="review-field-wrapper">
              <textarea
                className="comment-field comment-area"
                type="text"
                name="comment"
                placeholder="comment"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="review-field-wrapper">
              <input
                className="rating-field"
                type="number"
                min="1"
                max="5"
                step="0.1"
                name="rating"
                placeholder="rating"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    rating: e.target.value,
                  }));
                }}
              />
            </div>

            <input
              className="review-submit-button"
              type="submit"
              value={"Submit"}
            />
          </form>
          <FontAwesomeIcon
            className="review-form-close"
            icon={faXmark}
            onClick={() => {
              setReviewForm(!reviewForm);
            }}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

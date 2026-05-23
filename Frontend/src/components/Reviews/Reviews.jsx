import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Reviews.css";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
export const Reviews = ({ reviews, productId }) => {
  const { user } = useContext(AuthContext);
  const [reviewForm, setReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    comment: "",
    rating: "",
  });



  // add review



  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("comment:" + formData.comment + "Rating:" + formData.rating);
    try {
      const res = await api.post(`products/review/${productId}`, {
        comment: formData.comment,
        rating: formData.rating,
      });
      console.log(res.data.isDisabled);
      setIsDisabled(res.data.isDisabled);

      setReviewForm(false);
    } catch (error) {
      console.log(error.response.data.message || "Somthing went wrong!");
    }
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

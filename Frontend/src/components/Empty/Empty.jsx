import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Empty.css";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export const Empty = ({ title, height, to }) => {
  const emptySectionHeight = {
    height: height,
  };

  return (
    <div style={emptySectionHeight} className="empty-section">
      <div className="empty-container">
        <FontAwesomeIcon
          className="empty-icon"
          icon={faFaceFrown}></FontAwesomeIcon>
        <span className="empty-title">{title}</span>

        <Link className="empty-link" to={to}>
          Shop Now
        </Link>
      </div>
    </div>
  );
};

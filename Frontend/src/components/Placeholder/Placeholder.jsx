import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Placeholder.css";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
export const Placeholder = () => {


  return (
    <div className="placeholder-container">
      <FontAwesomeIcon className="placeholder-icon" icon={faCircleNotch} ></FontAwesomeIcon>
    </div>
  );
};

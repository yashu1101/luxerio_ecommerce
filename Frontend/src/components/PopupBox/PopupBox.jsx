import { useEffect, useState } from "react";
import "./PopupBox.css";

export const PopupBox = ({ poppupMessage, popupType }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (poppupMessage) {
      setVisible(true);

      const timer = setTimeout(() => {
        poppupMessage = "";
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [poppupMessage]);

  return (
    <div
      className="popup-box"
      style={{
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? "1" : "0",
        transition: "all 0.3s ease-in",
      }}
    >
      {popupType === "success" && (
        <div className="popup popup-success">
          <span>{poppupMessage} ✅</span>
        </div>
      )}

      {popupType === "warning" && (
        <div className="popup popup-warning">
          <span>{poppupMessage} ⚠️</span>
        </div>
      )}

      {popupType === "error" && (
        <div className="popup popup-error">
          <span>{poppupMessage} ❌</span>
        </div>
      )}
    </div>
  );
};
import "./VerifyOTP.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
export const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const { user } = useContext(AuthContext);

  const { emailId } = useParams();
  const navigate = useNavigate();
  //Change handler
  const handleOnChange = (e) => {
    setOtp(e.target.value);
  };

  //Form handler

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setSendButtonDisabled(true);
      const res = await api.post("auth/verify-otp", {
        email: emailId,
        userOtp: otp,
      });

      if (res) {
        navigate(`/auth/reset-password/${emailId}`);
      }
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
      console.log(error.response.data.message || "Somthing went wrong!");
    } finally {
      setSendButtonDisabled(false);
    }
    setOtp("");
  };

  // resend otp

  const ResendOtp = async () => {
    try {
      const res = await api.post("auth/send-otp", {
        email: emailId,
      });
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
      console.log(error.response.data.message || "Somthing went wrong!");
    }
  };

  return (
    <div className="vo-section">
      <div className="vo-container">
        <span className="vo-text">Enter OTP sent to {emailId}.</span>
        <form className="vo-form">
          <span>{error}</span>
          <input
            type="text"
            className="vo-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOnChange}
          />
          <button className={`vo-verify-btn ${sendButtonDisabled ? "vo-verify-btn-disabled" : ""}`} onClick={handleOnSubmit} disabled={sendButtonDisabled}>
            Verify
          </button>
          <span className="vo-resend-btn" onClick={ResendOtp}>
            Resend ?
          </span>
        </form>
      </div>
    </div>
  );
};

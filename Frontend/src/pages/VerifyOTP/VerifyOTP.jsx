import "./VerifyOTP.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
import { useOtpVerifier } from "../../hooks/usePasswordResetor";
export const VerifyOTP = () => {
  const navigate = useNavigate();
  const { mutate: verifyOtpMutate, isPending } = useOtpVerifier();

  const { emailId } = useParams();
  const [otp, setOtp] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  //Change handler
  const handleOnChange = (e) => {
    setOtp(e.target.value);
  };

  //Form handler

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    verifyOtpMutate(
      { emailId, otp },
      {
        onSuccess: () => {
          navigate(`/auth/reset-password/${emailId}`);
          setFailedMessage("");
        },
        onError: () => setFailedMessage("Verification failed!"),
      },
    );
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
          <span>{failedMessage}</span>
          <input
            type="text"
            className="vo-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOnChange}
          />
          <button
            className={`vo-verify-btn ${isPending ? "vo-verify-btn-disabled" : ""}`}
            onClick={handleOnSubmit}
            disabled={isPending}>
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

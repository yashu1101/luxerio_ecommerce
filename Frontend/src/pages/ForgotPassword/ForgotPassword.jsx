import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOtpSender } from "../../hooks/usePasswordResetor";
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: otpSendMutate, isPending } = useOtpSender();

  const [email, setEmail] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);


  //Change handler
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  //Form handler

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    otpSendMutate(email, {
      onSuccess: () => {
        console.log("OTP Sent.");
        navigate(`/auth/verify-otp/${email}`);
        setEmail("");
        setFailedMessage("");
      },

      onError: () => {
        setFailedMessage("OTP not send!");
      },
    });
  };

  return (
    <div className="fp-section">
      <div className="fp-container">
        <span className="fp-text">Forgot Password ?</span>
        <form className="fp-form">
          <span>{failedMessage}</span>
          <input
            type="text"
            className="fp-input"
            placeholder="Enter your email"
            value={email}
            onChange={handleOnChange}
          />
          <button
            className={`fp-send-btn ${isPending ? "fp-send-btn-disabled" : ""}`}
            onClick={handleOnSubmit}
            disabled={isPending}>
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

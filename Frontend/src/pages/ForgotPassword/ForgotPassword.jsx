import "./ForgotPassword.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
   const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //Change handler
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  //Form handler

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setSendButtonDisabled(true)
      const res = await api.post("auth/send-otp", {
        email: email,
      });
      if (res) {
        navigate(`/auth/verify-otp/${email}`);
      }
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
      console.log(error.response.data.message || "Somthing went wrong!");
    }
    finally{
      setSendButtonDisabled(false)
    }
    setEmail("");
  };

  return (
    <div className="fp-section">
      <div className="fp-container">
        <span className="fp-text">Forgot Password ?</span>
        <form className="fp-form">
          <span>{error}</span>
          <input
            type="text"
            className="fp-input"
            placeholder="Enter your email"
            value={email}
            onChange={handleOnChange}
          />
          <button className={`fp-send-btn ${sendButtonDisabled ? "fp-send-btn-disabled" : ""}`} onClick={handleOnSubmit} disabled={sendButtonDisabled}>
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

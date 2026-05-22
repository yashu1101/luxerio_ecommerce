import "./ResetPassword.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);
  const { emailId } = useParams();
  const navigate = useNavigate();

  //Change handler
  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  //Form handler

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch("auth/reset-password", {
        email: emailId,
        password: password,
      });

      if (res) {
        navigate("/auth/login");
      }
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
      console.log(error.response.data.message || "Somthing went wrong!");
    }
    setPassword("");
  };

  return (
    <div className="rp-section">
      <div className="rp-container">
        <span className="rp-text">Reset your password</span>
        <form className="rp-form">
          <span>{error}</span>
          <input
            type="text"
            className="rp-input"
            placeholder="Enter New Password"
            value={password}
            onChange={handleOnChange}
          />
          <button className="rp-button" onClick={handleOnSubmit}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

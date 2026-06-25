import "./ResetPassword.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetPassword } from "../../hooks/usePasswordResetor";
export const ResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: resetPasswordMutate, isPending } = useSetPassword();
  const [password, setPassword] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  const { emailId } = useParams();

  //Change handler
  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  //Form handler

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    resetPasswordMutate(
      { emailId, password },
      {
        onSuccess: () => {
          navigate("/auth/login");
          setPassword("");
          setFailedMessage("");
        },
        onError: () => setFailedMessage("Passward is not reset!"),
      },
    );
  };

  return (
    <div className="rp-section">
      <div className="rp-container">
        <span className="rp-text">Reset your password</span>
        <form className="rp-form">
          <span>{failedMessage}</span>
          <input
            type="text"
            className="rp-input"
            placeholder="Enter New Password"
            value={password}
            onChange={handleOnChange}
          />
          <button
            disabled={isPending}
            className="rp-button"
            onClick={handleOnSubmit}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

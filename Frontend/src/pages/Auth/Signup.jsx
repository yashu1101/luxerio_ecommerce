import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export const Signup = () => {
  const [AuthName, setAuthName] = useState("");
  const [AuthEmail, setAuthEmail] = useState("");
  const [AuthPassword, setAuthPassword] = useState("");

  const { UserSignup, updateMessage, setUpdateMessage } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const SignupFormHandler = async (e) => {
    e.preventDefault();
    const result = await UserSignup(AuthName, AuthEmail, AuthPassword);
    if (result.success) {
      setTimeout(() => {
        setUpdateMessage("");
        navigate("/auth/login");
      }, 1500);
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth-form-pannel">
          <span className="login-title">Create new account</span>

          <form onSubmit={SignupFormHandler} className="auth-form">
            {updateMessage.type === "signup" && (
              <span style={{ color: updateMessage.color }}>
                {updateMessage.message}
              </span>
            )}
            <input
              onChange={(e) => setAuthName(e.target.value)}
              className="auth-form-field name-field"
              type="text"
              required
              placeholder="Enter name"
              value={AuthName}
            />

            <input
              onChange={(e) => setAuthEmail(e.target.value)}
              className="auth-form-field email-field"
              type="email"
              required
              placeholder="Enter email"
              value={AuthEmail}
            />

            <input
              onChange={(e) => setAuthPassword(e.target.value)}
              className="auth-form-field password-field"
              type="text"
              required
              placeholder="Enter password"
              value={AuthPassword}
            />

            <button className="auth-form-button">SIGNUP</button>

            <Link className="signup-text" to={"/auth/login"}>
              Already registered? login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

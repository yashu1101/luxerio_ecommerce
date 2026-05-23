import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

export const Login = () => {
  const [AuthEmail, setAuthEmail] = useState("");
  const [AuthPassword, setAuthPassword] = useState("");

  const { UserLogin, user, updateMessage, loginButtonDisabled, loading } =
    useContext(AuthContext);

  const LoginFormHandler = async (e) => {
    e.preventDefault();
    await UserLogin(AuthEmail, AuthPassword);
  };

  // redirect if already loggedIn

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // navigate to forget password page

  const ForgetPassword = () => {
    navigate('/auth/forgot-password')
  };
  return (
    <>
      <div className="auth">
        <div className="auth-form-pannel">
          <span className="login-title">Login</span>

          <form onSubmit={LoginFormHandler} className="auth-form">
            {updateMessage.type === "login" && (
              <span style={{ color: updateMessage.color }}>
                {updateMessage.message}
              </span>
            )}

            <input
              className="auth-form-field email-field"
              type="email"
              required
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="Enter email"
            />

            <input
              className="auth-form-field password-field"
              type="text"
              required
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="Enter password"
            />

            <button
              className={`auth-form-login-button ${
                loginButtonDisabled && "auth-form-login-button-disabled"
              }`}>
              LOGIN
            </button>

            <span className="forget-pass" onClick={ForgetPassword} >Forget paasword ?</span>

            <Link className="login-text" to={"/auth/signup"}>
              New customer? signup
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

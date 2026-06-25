import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useState } from "react";
import { useSignup } from "../../hooks/useAuth";
import { AuthAnimation } from "../../components/Animations/AuthAnimation";

export const Signup = () => {
  const [AuthName, setAuthName] = useState("");
  const [AuthEmail, setAuthEmail] = useState("");
  const [AuthPassword, setAuthPassword] = useState("");

  const { mutate: signupMutate, isPending, error } = useSignup();

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const SignupFormHandler = async (e) => {
    e.preventDefault();

    signupMutate(
      {
        username: AuthName,
        email: AuthEmail,
        password: AuthPassword,
      },
      {
        onSuccess: () => {
          navigate("/auth/login");
        },
        onError: (error) => {
          setMessage(error?.response?.data?.message || "Signup failed!");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        },
      },
    );
  };

  return (
    <>
      <AuthAnimation>
        <div className="auth">
          <div className="auth-form-pannel">
            <motion.span
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, ease: "ease", delay: 0.1 }}
              className="login-title">
              Create new account
            </motion.span>

            <form onSubmit={SignupFormHandler} className="auth-form">
              <span style={{ color: "red" }}>{message}</span>

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

              <button
                className={`auth-form-signup-button ${isPending ? "auth-form-signup-button-disabled" : ""}`}>
                SIGNUP
              </button>

              <Link className="signup-text" to={"/auth/login"}>
                Already registered? login
              </Link>
            </form>
          </div>
        </div>
      </AuthAnimation>
    </>
  );
};

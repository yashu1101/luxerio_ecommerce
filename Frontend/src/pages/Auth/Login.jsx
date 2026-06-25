import "./Auth.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useLogin } from "../../hooks/useAuth";
import { Loader } from "../../components/Loader/Loader";
import { AuthAnimation } from "../../components/Animations/AuthAnimation";

export const Login = () => {
  const [AuthEmail, setAuthEmail] = useState("");
  const [AuthPassword, setAuthPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: loginMutate, isPending, error } = useLogin();
  const { data, isLoading, error: getUserError } = useUser();
  const [message, setMessage] = useState("");

  const LoginFormHandler = async (e) => {
    e.preventDefault();
    loginMutate(
      { email: AuthEmail, password: AuthPassword },
      {
        onSuccess: (data) => {
          //  redirect user

          if (data?.role) {
            if (data?.role === "admin") {
              navigate("/admin", { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          }
        },
        onError: (error) => {
          console.log("Login failed!");
          setMessage(error?.response?.data?.message);

          setTimeout(() => {
            setMessage("");
          }, 3000);
        },
      },
    );
  };
  // redirect if already loggedIn

  useEffect(() => {
    if (!isLoading && data) {
      if (data.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [data, navigate]);

  // navigate to forget password page

  const ForgetPassword = () => {
    navigate("/auth/forgot-password");
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
              Login
            </motion.span>

            <form onSubmit={LoginFormHandler} className="auth-form">
              <span style={{ color: "red" }}>{message}</span>

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
                  isPending && "auth-form-login-button-disabled"
                }`}>
                LOGIN
              </button>

              <span className="forget-pass" onClick={ForgetPassword}>
                Forget paasword ?
              </span>

              <Link className="login-text" to={"/auth/signup"}>
                New customer? signup
              </Link>
            </form>
          </div>
        </div>
      </AuthAnimation>
    </>
  );
};

import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../hooks/useUser";

export const Login = () => {
  const [AuthEmail, setAuthEmail] = useState("");
  const [AuthPassword, setAuthPassword] = useState("");
  
  const navigate = useNavigate();
  const { UserLogin, user, updateMessage, loginButtonDisabled, loading } =
  useContext(AuthContext);
  const {data, isLoading,error: getUserError} = useUser()

    
    
    
    // TSQ
    const {
      mutate: loginMutate,
      isPending,
      isError,
      error,
    } = useMutation({
      mutationFn: () => UserLogin(AuthEmail, AuthPassword),
      onSuccess: (data) => {
        console.log(data);
        
        // redirect user
        
        if (data?.role) {
          if (data?.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
          navigate("/", { replace: true });
        }
      }
    },
    onError: (error) => console.log(error),
  });

  const LoginFormHandler = async (e) => {
    e.preventDefault();
    
    loginMutate();
  };
  // redirect if already loggedIn
  
  console.log(data)

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
    </>
  );
};

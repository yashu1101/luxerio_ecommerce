import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { PopupBox } from "../components/PopupBox/PopupBox";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(false);
  // auth update message
  const [updateMessage, setUpdateMessage] = useState({
    message: "",
    color: "",
    type: null,
  });
  // logout

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // **********SignUp Form Handler**********
  const UserSignup = async (username, email, password) => {
    try {
      const formdata = { username: username, email: email, password: password };
      setSignupButtonDisabled(true);
      const res = await api.post("auth/register", formdata);
      setUpdateMessage({
        message: res?.data?.message,
        color: "green",
        type: "signup",
      });

      return { success: true };
    } catch (error) {
      setUpdateMessage({
        message: error.response.data.message || "Somthing went wrong!",
        color: "red",
        type: "signup",
      });

      console.log(error.response.data.message || "Somthing went wrong!");
    } finally {
      setSignupButtonDisabled(false);
    }
  };
  // **********Login Form Handler**********
  const UserLogin = async (email, password) => {
    try {
      setLoginButtonDisabled(true);
      const formData = { email, password };
      const res = await api.post("auth/login", formData);

      setUpdateMessage({
        message: res?.data?.message,
        color: "green",
        type: "login",
      });

      setTimeout(() => {
        setUpdateMessage({
          message: "",
          color: "",
          type: null,
        });
      }, 3000);

      GetMe();
    } catch (error) {
      setUpdateMessage({
        message: error.response.data.message || "Somthing went wrong!",
        color: "red",
        type: "login",
      });

      setTimeout(() => {
        setUpdateMessage({
          message: "",
          color: "",
          type: null,
        });
      }, 3000);

      console.log(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoginButtonDisabled(false);
    }
  };
  // ***********Get loggedIn user**************
  const GetMe = async () => {
    try {
      setLoading(true);
      const res = await api.get("auth/me");
      setUser({
        user_id: res?.data?.user?._id,
        username: res?.data?.user?.username,
        email: res?.data?.user?.email,
        role: res?.data?.user?.role,
        createdAt: res?.data?.user?.createdAt,
      });
    } catch (error) {
      console.log(error.response.data.message || "Somthing went wrong!");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetMe();
  }, []);

  // ***********User Logout**************
  const UserLogout = async () => {
    try {
      const res = await api.post("auth/logout");
      console.log(res.data.message);

      setIsLoggedOut(true);

      setUser(null);
      return {
        status: true,
      };
    } catch (error) {
      console.log(error?.response?.data?.message || "Somthing went wrong!");
      return {
        status: false,
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        UserSignup,
        UserLogin,
        UserLogout,

        isLoggedOut,

        setUpdateMessage,
        user,
        loginButtonDisabled,
        signupButtonDisabled  ,
        updateMessage,
        loading,
      }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

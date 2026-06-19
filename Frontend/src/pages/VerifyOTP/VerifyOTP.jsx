import "./VerifyOTP.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
export const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  // const [error, setError] = useState("");
  // const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const { user } = useContext(AuthContext);

  const { emailId } = useParams();
  const navigate = useNavigate();
  //Change handler
  const handleOnChange = (e) => {
    setOtp(e.target.value);
  };

  const {
    mutate: otpMutate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await api.post("auth/verify-otp", {
        email: emailId,
        userOtp: otp,
      });
    },
    onSuccess: () => {
      navigate(`/auth/reset-password/${emailId}`);
    },

    onError: (error) => {
      console.log(error);
      console.log(error?.response?.data?.message);
    },
  });

  //Form handler

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    otpMutate();
    setOtp("");
  };

  // const handleOnSubmit = async (e) => {
  //   try {
  //     setSendButtonDisabled(true);
  //     const res = await api.post("auth/verify-otp", {
  //       email: emailId,
  //       userOtp: otp,
  //     });

  //     if (res) {
  //       navigate(`/auth/reset-password/${emailId}`);
  //     }
  //   } catch (error) {
  //     setError(error.response.data.message || "Somthing went wrong!");
  //     console.log(error.response.data.message || "Somthing went wrong!");
  //   } finally {
  //     setSendButtonDisabled(false);
  //   }
  // };

  // resend otp

  const ResendOtp = async () => {
    try {
      const res = await api.post("auth/send-otp", {
        email: emailId,
      });
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
      console.log(error.response.data.message || "Somthing went wrong!");
    }
  };

  return (
    <div className="vo-section">
      <div className="vo-container">
        <span className="vo-text">Enter OTP sent to {emailId}.</span>
        <form className="vo-form">
          <span>{error}</span>
          <input
            type="text"
            className="vo-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOnChange}
          />
          <button
            className={`vo-verify-btn ${isPending ? "vo-verify-btn-disabled" : ""}`}
            onClick={handleOnSubmit}
            disabled={isPending}>
            Verify
          </button>
          <span className="vo-resend-btn" onClick={ResendOtp}>
            Resend ?
          </span>
        </form>
      </div>
    </div>
  );
};

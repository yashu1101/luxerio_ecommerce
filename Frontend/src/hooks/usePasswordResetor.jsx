import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";

// OTP SEND HOOK

export const useOtpSender = () => {
  return useMutation({
    mutationFn: async (email) => {
      const res = await api.post("auth/send-otp", {
        email: email,
      });

      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "OTP Send.");
    },

    onError: (error) => {
      console.log(error?.response?.data?.message || "Something went wrong!");
    },
  });
};



// OTP VERIFY HOOK

export const useOtpVerifier = () => {
  return useMutation({
    mutationFn: async ({ emailId, otp }) => {
      const res = await api.post("auth/verify-otp", {
        email: emailId,
        userOtp: otp,
      });

      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "OTP Verified.");
    },

    onError: (error) => {
      console.log(error?.response?.data?.message || "Something went wrong!");
    },
  });
};



// RESET PASSWORD HOOK

export const useSetPassword = () => {
  return useMutation({
    mutationFn: async ({ emailId, password }) => {
      const res = await api.patch("auth/reset-password", {
        email: emailId,
        password: password,
      });

      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "Password reseted.");
    },

    onError: (error) => {
      console.log(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

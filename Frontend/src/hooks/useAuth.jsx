import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

// SIGNUP HOOK
export const useSignup = () => {
  return useMutation({
    mutationFn: async ({ username, email, password }) => {
      const res = await api.post("auth/register", {
        username: username,
        email: email,
        password: password,
      });

      return res?.data;
    },
    onSuccess: (data) =>
      console.log(data?.message || "You have been signed up."),
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

// LOGIN HOOK
export const useLogin = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await api.post("auth/login", { email, password });
      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "You have been logged in.");
      queryClient.invalidateQueries(['user'])
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

// LOGOUT HOOK
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("auth/logout");
      return res.data;
    },

    onSuccess: (data) => {
      console.log(data?.message || "You have been logged out.");
      queryClient.setQueryData(["user"], null);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

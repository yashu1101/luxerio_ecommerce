import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useAiChat = () => {
  return useMutation({
    mutationFn: async (question) => {
      const res = await api.post("chat", {
        AiQuestion: question,
      });

      return res?.data?.AiAnswer;
    },

    onSuccess: (data) => console.log("AI Response: Done"),
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

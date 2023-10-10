import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../constants";
import { setLoginToken } from "../storage";

export const useCreateUser = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/auth/sign-up`, data);
      return res.data;
    },
    onSuccess(data, variables, context) {},
  });

  return { mutateAsync, isLoading };
};

export const useLogin = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/auth/login`, data);
      return res.data;
    },
    onSuccess(data, variables, context) {
      setLoginToken(data?.token);
    },
  });

  return { mutateAsync, isLoading };
};

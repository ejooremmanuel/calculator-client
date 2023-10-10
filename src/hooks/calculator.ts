import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../constants";
import { getLoginToken } from "../storage";

export const useCalculate = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/calculate`, data, {
        headers: {
          Authorization: `Bearer ${getLoginToken()}`,
        },
      });
      return res.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["calculate"]);
    },
  });

  return { mutate };
};
export const useDelete = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/calculate/${id}`, {
        headers: {
          Authorization: `Bearer ${getLoginToken()}`,
        },
      });
      return res.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["calculate"]);
    },
  });

  return { delete: mutate };
};
export const useDeleteAll = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/calculate`, {
        headers: {
          Authorization: `Bearer ${getLoginToken()}`,
        },
      });
      return res.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["calculate"]);
    },
  });

  return { deleteAll: mutate };
};
export const useGetHistory = () => {
  const { data, refetch } = useQuery({
    queryFn: async (data: any) => {
      const res = await axiosInstance.get(`/calculate`, {
        headers: {
          Authorization: `Bearer ${getLoginToken()}`,
        },
      });
      return res.data;
    },
    queryKey: ["calculate"],
  });

  return { data, refetch };
};

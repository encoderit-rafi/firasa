import { api } from "@/axios";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetUserReports = () => {
  return useQuery({
    queryKey: ["user-reports"],
    queryFn: async () => {
      const { data } = await api.post("/get-user-own-reports");
      return data.data.data;
    },
  });
};

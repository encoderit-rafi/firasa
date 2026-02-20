import { api } from "@/axios";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetSharedReport = (shareToken: string | null) => {
  return useQuery({
    queryKey: ["shared-report", shareToken],
    queryFn: async () => {
      const { data } = await api.get(`/public/reports/${shareToken}`);
      return data.data;
    },
    enabled: !!shareToken,
  });
};

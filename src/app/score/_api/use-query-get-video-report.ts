import { api } from "@/axios";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetVideoReport = (analysisId: string | null) => {
  return useQuery({
    queryKey: ["video-report", analysisId],
    queryFn: async () => {
      const { data } = await api.get(`/videos/analyze/reports/${analysisId}`);
      return data;
    },
    enabled: !!analysisId,
  });
};

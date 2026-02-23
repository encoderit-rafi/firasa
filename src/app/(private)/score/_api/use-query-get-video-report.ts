import { api } from "@/axios";
import { TReportData } from "@/global-types";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetVideoReport = (analysisId: string | null) => {
  return useQuery({
    queryKey: ["video-report", analysisId],
    queryFn: async (): Promise<TReportData> => {
      const { data } = await api.get(`/videos/analyze/reports/${analysisId}`);
      return data.data;
    },
    enabled: !!analysisId,
  });
};

// _api (add this mutation)
import { api } from "@/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ... existing hooks stay unchanged ...

export const useMutationRenameReport = (analysisId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      analysisId,
      name,
    }: {
      analysisId: string;
      name: string;
    }) => {
      const { data } = await api.post(
        `/videos/reports/rename/${analysisId}`,
        { name }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-report", analysisId] });
    },
  });
};
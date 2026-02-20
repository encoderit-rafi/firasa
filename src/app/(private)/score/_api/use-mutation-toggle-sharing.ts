import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationToggleSharing = (analysisId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post(
        `/videos/reports/${analysisId}/toggle-sharing`,
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-report", analysisId] });
      //   toast.success("Sharing preference updated");
    },
    onError: () => {
      toast.error("Failed to update sharing preference");
    },
  });
};

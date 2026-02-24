import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMutationToggleSharing } from "../_api";

export const useScoreShare = (shareToken: string | null) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareData, setShareData] = useState("");
  const [fullPath, setFullPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullPath(window.location.href);
    }
  }, []);

  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");
  const { mutateAsync: toggleSharing } = useMutationToggleSharing(analysisId);

  const handleShare = async (data: string) => {
    if (!shareToken) {
      try {
        await toggleSharing();
      } catch (error) {
        console.error("Failed to toggle sharing:", error);
      }
    }
    setShareData(data);
    setIsOpen(true);
  };

  const sharePath = shareToken
    ? `${window.location.origin}/share?share_token=${shareToken}`
    : fullPath;

  return {
    isOpen,
    setIsOpen,
    shareData,
    handleShare,
    sharePath,
  };
};

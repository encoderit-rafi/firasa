import { PersonalityScores, PersonalityType } from "@/global-types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handlePercentage(value: number) {
  return Number((((value + 1) / 2) * 100).toFixed(1));
}
export function handleFormatPredictions(
  predictions: Record<string, number>,
): PersonalityScores {
  return Object.entries(predictions).map(([key, value]) => {
    const score = handlePercentage(Number(value));
    let type: PersonalityType["type"];
    if (score < 35) {
      type = "low";
    } else if (score < 66) {
      type = "moderate";
    } else {
      type = "high";
    }
    return {
      name: key,
      value: score,
      type: type,
    };
  });
}
export const handleCopyLink = (
  data: string,
  succesMessage: string = "Copied to clipboard",
) => {
  navigator.clipboard.writeText(data).then(() => {
    toast.success(succesMessage);
  });
};

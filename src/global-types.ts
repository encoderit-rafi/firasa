export type PersonalityType = {
  name: string;
  value: number | string;
  type: "moderate" | "high" | "low";
};

export type PersonalityScores = PersonalityType[];

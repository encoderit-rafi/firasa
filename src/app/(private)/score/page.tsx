import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utlis/authOptions";
import { API_BASE_URL } from "@/consts";
import ScorePageClient from "./_components/score-page-client";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const analysisId = params.analysis_id as string;
  const session = await getServerSession(authOptions);

  if (!analysisId || !session?.token?.access_token) {
    return {
      title: "Your Personality Score - FIRASA",
    };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/videos/analyze/reports/${analysisId}`,
      {
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
        },
      },
    );

    if (response.ok) {
      const { data: report } = await response.json();
      return {
        title: `${report.name || "Personality Report"} - FIRASA`,
        description: `Deep dive into the personality analysis for ${report.name}. Built on real psychology, powered by AI.`,
      };
    }
  } catch (error) {
    console.error("Error fetching metadata for score page:", error);
  }

  return {
    title: "Your Personality Score - FIRASA",
  };
}

export default function ScorePage() {
  return (
    <Suspense>
      <ScorePageClient />
    </Suspense>
  );
}

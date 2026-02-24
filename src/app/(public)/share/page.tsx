import { Metadata } from "next";
import { API_BASE_URL } from "@/consts";
import SharePageClient from "./_components/share-page-client";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const shareToken = params.share_token as string;

  if (!shareToken) {
    return {
      title: "Shared Personality Report - FIRASA",
    };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/public/reports/${shareToken}`,
    );

    if (response.ok) {
      const { data: report } = await response.json();
      const insights = report.full_result?.insights;
      const displayTitle = insights?.title
        ? `${insights.title} - FIRASA`
        : `${report.name || "Personality Report"} - FIRASA`;
      const displayDescription =
        insights?.description ||
        `Check out the personality analysis for ${report.name}. Built on real psychology, powered by AI.`;

      return {
        title: displayTitle,
        description: displayDescription,
        openGraph: {
          title: displayTitle,
          description: displayDescription,
          type: "website",
          siteName: "FIRASA",
          images: [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: displayTitle,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: displayTitle,
          description: displayDescription,
          images: ["/og-image.png"],
        },
      };
    }
  } catch (error) {
    console.error("Error fetching metadata for share page:", error);
  }

  return {
    title: "Shared Personality Report - FIRASA",
  };
}

export default function SharePage() {
  return (
    <Suspense>
      <SharePageClient />
    </Suspense>
  );
}

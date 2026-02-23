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
      return {
        title: `${report.name || "Personality Report"} - FIRASA`,
        description: `Check out the personality analysis for ${report.name}. Built on real psychology, powered by AI.`,
        openGraph: {
          title: `${report.name || "Personality Report"} - FIRASA`,
          description: `Check out the personality analysis for ${report.name}. Built on real psychology, powered by AI.`,
          images: ["/og-image.png"], // Suggesting to use a dynamic image if backend provides one
        },
        twitter: {
          card: "summary_large_image",
          title: `${report.name || "Personality Report"} - FIRASA`,
          description: `Check out the personality analysis for ${report.name}. Built on real psychology, powered by AI.`,
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

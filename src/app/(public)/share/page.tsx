"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useQueryGetSharedReport } from "./_api/use-query-get-shared-report";
import ScoreReportView from "../../(private)/score/_components/score-report-view";
import { Loader2 } from "lucide-react";

function SharePageContent() {
  const searchParams = useSearchParams();
  const shareToken = searchParams.get("share_token");
  const {
    data: reportData,
    isLoading,
    error,
  } = useQueryGetSharedReport(shareToken);

  if (!shareToken) {
    return (
      <div className="flex-center h-screen w-full">
        <p className="text-xl">Invalid or missing share token.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-center h-screen w-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="flex-center h-screen w-full">
        <p className="text-error text-xl">
          Failed to load shared report. It may have been set to private.
        </p>
      </div>
    );
  }

  return <ScoreReportView reportData={reportData} />;
}

export default function SharePage() {
  return (
    <Suspense>
      <SharePageContent />
    </Suspense>
  );
}

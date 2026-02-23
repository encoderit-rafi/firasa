
"use client";

import React, { useState } from "react";
import { ScorePageCard } from "./score-page-card";
import { Button } from "@/components/ui/button";
import { DOCX, JSON, PDF } from "@/assets/icons";
import { generatePdfFromDom } from "./pdf/generate-pdf-from-dom";

interface SummaryAndExportsProps {
  reportData?: any;
}

export default function SummaryAndExports({
  reportData,
}: SummaryAndExportsProps) {
  const [pdfLoading, setPdfLoading] = useState(false);

  const handlePdfExport = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;
    setPdfLoading(true);
    try {
      await generatePdfFromDom({
        element,
        filename: "firasa-personality-report.pdf",
        mode: "window",
      });
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <ScorePageCard className="flex flex-col items-center justify-between gap-6 divide-none bg-transparent lg:flex-row">
      {/* PDF */}
      <div className="bg-error-container/16 divide-error-container flex size-full flex-col divide-y rounded-xl p-8">
        <div className="flex-center flex-1 py-6">
          <PDF />
        </div>
        <div className="flex-center flex-1 py-6">
          <Button
            variant="outline"
            disabled={pdfLoading}
            onClick={handlePdfExport}
          >
            {pdfLoading ? "Generating PDF…" : "Download full PDF report"}
          </Button>
        </div>
      </div>

      {/* JSON */}
      <div className="bg-error-container/16 divide-error-container flex size-full flex-col divide-y rounded-xl p-8">
        <div className="flex-center flex-1 py-6">
          <JSON />
        </div>
        <div className="flex-center flex-1 py-6">
          <Button variant={"outline"}>Export JSON Data</Button>
        </div>
      </div>

      {/* DOCX */}
      <div className="bg-error-container/16 divide-error-container flex size-full flex-col divide-y rounded-xl p-8">
        <div className="flex-center flex-1 py-6">
          <DOCX />
        </div>
        <div className="flex-center flex-1 py-6">
          <Button variant={"outline"}>Export to Docx</Button>
        </div>
      </div>
    </ScorePageCard>
  );
}
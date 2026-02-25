"use client"
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { generatePdfFromDom } from "./generate-pdf-from-dom";
import { LoadingIcon } from "@/assets/icons";

export default function PdfDownloadBtn() {
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
       <Button disabled={pdfLoading}
            onClick={handlePdfExport} variant="outline" size={"icon"} className="size-10">
                {pdfLoading ? <LoadingIcon/> : <Download />}
              </Button>
    )
}
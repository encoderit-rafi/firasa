// generate-pdf-from-dom.ts
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface Options {
  element: HTMLElement;
  filename?: string;
  padding?: number;
  scale?: number;
  mode?: "download" | "window";
}

export async function generatePdfFromDom({
  element,
  filename = "firasa-personality-report.pdf",
  padding = 10,
  scale = 2,
  mode = "window",
}: Options) {
  const A4_W = 210;
  const A4_H = 297;
  const contentWidth = A4_W - padding * 2;
  const contentHeight = A4_H - padding * 2;
  const footerSpace = 10; // reserve space for footer
  const usableHeight = contentHeight - footerSpace;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // ─── COVER PAGE ───
  const centerX = A4_W / 2;

  pdf.setFillColor(255, 185, 0);
  pdf.rect(0, 0, A4_W, 6, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(255, 185, 0);
  pdf.text("FIRASA", centerX, 100, { align: "center" });

  pdf.setFontSize(32);
  pdf.setTextColor(15, 23, 42);
  pdf.text("Personality Report", centerX, 120, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(71, 85, 105);
  pdf.text(
    "A comprehensive analysis of your Big Five personality traits,",
    centerX,
    138,
    { align: "center" }
  );
  pdf.text(
    "behavioral patterns, and growth opportunities.",
    centerX,
    145,
    { align: "center" }
  );

  pdf.setDrawColor(226, 232, 240);
  pdf.setLineWidth(0.5);
  pdf.line(centerX - 30, 158, centerX + 30, 158);

  pdf.setFontSize(10);
  pdf.setTextColor(148, 163, 184);
  pdf.text(
    `Generated on ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    centerX,
    170,
    { align: "center" }
  );

  addFooter(pdf, 1, padding, A4_W, A4_H);

  // ─── SECTION-AWARE CONTENT PAGES ───

  // Find all direct section children inside #pdf-content
  const sections = Array.from(element.children) as HTMLElement[];

  // Capture each section individually
  const sectionCanvases: HTMLCanvasElement[] = [];
  for (const section of sections) {
    const canvas = await html2canvas(section, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      windowWidth: 1280,
      logging: false,
    });
    sectionCanvases.push(canvas);
  }

  let pageNum = 1; // cover is page 1
  let cursorY = 0; // mm from top of content area, on current page
  let needsNewPage = true; // first content page hasn't been added yet

  for (const canvas of sectionCanvases) {
    // Convert canvas pixel height to mm
    const sectionHeightMm =
      (canvas.height * contentWidth) / canvas.width;

    // If section is taller than a full page, we need to slice it
    if (sectionHeightMm > usableHeight) {
      // Start on a fresh page for oversized sections
      if (!needsNewPage) {
        // We're already on a page with content; start new
      }
      pdf.addPage();
      pageNum++;
      needsNewPage = false;
      cursorY = 0;

      // Slice the oversized section across multiple pages
      const pxPerMm = canvas.width / contentWidth;
      const usableHeightPx = usableHeight * pxPerMm;
      let slicePos = 0;

      while (slicePos < canvas.height) {
        if (slicePos > 0) {
          pdf.addPage();
          pageNum++;
          cursorY = 0;
        }

        const sliceHeight = Math.min(
          usableHeightPx,
          canvas.height - slicePos
        );

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext("2d");
        if (!ctx) break;

        ctx.drawImage(
          canvas,
          0,
          slicePos,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );

        const imgData = pageCanvas.toDataURL("image/jpeg", 0.95);
        const imgHeightMm = sliceHeight / pxPerMm;

        pdf.addImage(
          imgData,
          "JPEG",
          padding,
          padding + cursorY,
          contentWidth,
          imgHeightMm
        );

        cursorY = imgHeightMm;
        slicePos += usableHeightPx;

        addFooter(pdf, pageNum, padding, A4_W, A4_H);
      }

      // After an oversized section, force next section to a new page
      needsNewPage = true;
      continue;
    }

    // Normal-sized section: check if it fits on current page
    if (needsNewPage) {
      pdf.addPage();
      pageNum++;
      cursorY = 0;
      needsNewPage = false;
    } else if (cursorY + sectionHeightMm > usableHeight) {
      // Doesn't fit — start a new page
      addFooter(pdf, pageNum, padding, A4_W, A4_H);
      pdf.addPage();
      pageNum++;
      cursorY = 0;
    }

    // Draw section
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    pdf.addImage(
      imgData,
      "JPEG",
      padding,
      padding + cursorY,
      contentWidth,
      sectionHeightMm
    );

    cursorY += sectionHeightMm;

    // Add small gap between sections (4mm)
    cursorY += 4;
  }

  // Add footer to the last page
  if (!needsNewPage) {
    addFooter(pdf, pageNum, padding, A4_W, A4_H);
  }

  if (mode === "window") {
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } else {
    pdf.save(filename);
  }
}

function addFooter(
  pdf: jsPDF,
  pageNum: number,
  padding: number,
  A4_W: number,
  A4_H: number
) {
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.text("Firasa Personality Report", padding, A4_H - 5);
  pdf.text(
    `Page ${pageNum}  ·  ${new Date().toLocaleDateString()}`,
    A4_W - padding,
    A4_H - 5,
    { align: "right" }
  );
}
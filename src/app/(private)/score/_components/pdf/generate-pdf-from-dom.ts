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

// ─── Accordion helpers ───

interface SavedAccordionState {
  el: HTMLElement;
  dataState: string;
  styleCssText: string;
  ariaExpanded: string | null;
}

function collapseAccordions(root: HTMLElement): SavedAccordionState[] {
  const saved: SavedAccordionState[] = [];

  const openElements = root.querySelectorAll('[data-state="open"]');

  openElements.forEach((element) => {
    const el = element as HTMLElement;
    saved.push({
      el,
      dataState: el.getAttribute("data-state") || "",
      styleCssText: el.style.cssText,
      ariaExpanded: el.getAttribute("aria-expanded"),
    });

    el.setAttribute("data-state", "closed");

    if (el.getAttribute("aria-expanded") === "true") {
      el.setAttribute("aria-expanded", "false");
    }

    if (el.getAttribute("role") === "region") {
      el.style.display = "none";
      el.style.height = "0px";
      el.style.overflow = "hidden";
    }
  });

  return saved;
}

function restoreAccordions(saved: SavedAccordionState[]) {
  for (const { el, dataState, styleCssText, ariaExpanded } of saved) {
    el.setAttribute("data-state", dataState);
    el.style.cssText = styleCssText;
    if (ariaExpanded !== null) {
      el.setAttribute("aria-expanded", ariaExpanded);
    }
  }
}

// ─── Gradient text helpers ───

interface SavedGradientText {
  el: HTMLElement;
  originalCssText: string;
}

function fixGradientText(root: HTMLElement): SavedGradientText[] {
  const saved: SavedGradientText[] = [];

  const allElements = [
    root,
    ...Array.from(root.querySelectorAll("*")),
  ] as HTMLElement[];

  for (const el of allElements) {
    const computed = getComputedStyle(el);

    // Detect background-clip: text with transparent/invisible color
    const bgClip =
      computed.getPropertyValue("-webkit-background-clip") ||
      computed.getPropertyValue("background-clip");
    const color = computed.color;

    if (bgClip === "text") {
      saved.push({
        el,
        originalCssText: el.style.cssText,
      });

      // Remove gradient background and clip, make text visible
      el.style.setProperty("-webkit-background-clip", "border-box", "important");
      el.style.setProperty("background-clip", "border-box", "important");
      el.style.setProperty("color", "#0f172a", "important");
      el.style.setProperty("-webkit-text-fill-color", "#0f172a", "important");
      el.style.setProperty("background", "transparent", "important");
    }
  }

  return saved;
}

function restoreGradientText(saved: SavedGradientText[]) {
  for (const { el, originalCssText } of saved) {
    el.style.cssText = originalCssText;
  }
}

// ─── Footer helper ───

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

// ─── Main export ───

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
  const footerSpace = 10;
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

  // ─── PREPARE DOM FOR CAPTURE ───
  const savedAccordionState = collapseAccordions(element);
  const savedGradientText = fixGradientText(element);

  // ─── SECTION-AWARE CONTENT PAGES ───
  const sections = Array.from(element.children) as HTMLElement[];

  const sectionCanvases: HTMLCanvasElement[] = [];
  try {
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
  } finally {
    // ─── RESTORE DOM IMMEDIATELY AFTER CAPTURE ───
    restoreAccordions(savedAccordionState);
    restoreGradientText(savedGradientText);
  }

  let pageNum = 1;
  let cursorY = 0;
  let needsNewPage = true;

  for (const canvas of sectionCanvases) {
    const sectionHeightMm =
      (canvas.height * contentWidth) / canvas.width;

    if (sectionHeightMm > usableHeight) {
      if (!needsNewPage) {
        addFooter(pdf, pageNum, padding, A4_W, A4_H);
      }
      pdf.addPage();
      pageNum++;
      needsNewPage = false;
      cursorY = 0;

      const pxPerMm = canvas.width / contentWidth;
      const usableHeightPx = usableHeight * pxPerMm;
      let slicePos = 0;

      while (slicePos < canvas.height) {
        if (slicePos > 0) {
          addFooter(pdf, pageNum, padding, A4_W, A4_H);
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
      }

      addFooter(pdf, pageNum, padding, A4_W, A4_H);
      needsNewPage = true;
      continue;
    }

    if (needsNewPage) {
      pdf.addPage();
      pageNum++;
      cursorY = 0;
      needsNewPage = false;
    } else if (cursorY + sectionHeightMm > usableHeight) {
      addFooter(pdf, pageNum, padding, A4_W, A4_H);
      pdf.addPage();
      pageNum++;
      cursorY = 0;
    }

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
    cursorY += 4;
  }

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
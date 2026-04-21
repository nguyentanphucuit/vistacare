"use client";

import { useEffect, useState } from "react";

type Props = { filename: string };

export function AutoExport({ filename }: Props) {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setStatus("loading");
    setError(null);
    try {
      const target = document.getElementById("pdf-target");
      if (!target) throw new Error("Print container not found");
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(target as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgW = pageW - 20;
      let imgH = imgW / ratio;
      if (imgH > pageH - 20) imgH = pageH - 20;
      const x = (pageW - imgW) / 2;
      const y = 10;
      // If the image is taller than one page, paginate
      if (imgW / ratio > pageH - 20) {
        const fullH = imgW / ratio;
        let remaining = fullH;
        let position = 0;
        const slice = pageH - 20;
        while (remaining > 0) {
          pdf.addImage(imgData, "JPEG", x, y - position, imgW, fullH);
          remaining -= slice;
          position += slice;
          if (remaining > 0) pdf.addPage();
        }
      } else {
        pdf.addImage(imgData, "JPEG", x, y, imgW, imgH);
      }
      pdf.save(filename);
      setStatus("done");
    } catch (err) {
      console.error("[export-pdf] failed", err);
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  };

  useEffect(() => {
    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-end gap-3 print:hidden">
      {status === "loading" && (
        <span className="text-sm text-neutral-500">Generating PDF…</span>
      )}
      {status === "done" && (
        <span className="text-sm text-green-700">PDF saved.</span>
      )}
      {status === "error" && (
        <span className="text-sm text-red-700">Failed: {error}</span>
      )}
      <button
        type="button"
        onClick={() => window.close()}
        className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
      >
        Close
      </button>
      <button
        type="button"
        onClick={run}
        className="rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy-dark"
      >
        Download PDF again
      </button>
    </div>
  );
}

import { useRef } from "react";
import BiodataPreview from "./BiodataPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BiodataDownload({ sections, template }) {
  const previewRef = useRef();

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    const pages = previewRef.current.querySelectorAll(".bd-page");

    const pdf = new jsPDF("p", "pt", "a4"); // 'pt' for points, A4 size

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // A4 width & height in pt
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("biodata.pdf");
  };

  return (
    <div>
      <div ref={previewRef}>
        <BiodataPreview sections={sections} template={template} />
      </div>
      <button onClick={downloadPDF} style={{ marginTop: 20 }}>
        Download Biodata
      </button>
    </div>
  );
}

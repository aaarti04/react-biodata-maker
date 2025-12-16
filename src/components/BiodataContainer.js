import { useState, useRef } from "react";
import BiodataPreview from "./BiodataPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BiodataContainer({ sections, template }) {
  const previewRef = useRef();
  const [imgLoaded, setImgLoaded] = useState(false);

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    if (!imgLoaded) {
      alert("Please wait until the template image is fully loaded");
      return;
    }

    const pages = previewRef.current.querySelectorAll(".bd-page");
    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        useCORS: false,     // ✅ base64 image → no CORS needed
        allowTaint: false,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
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
        <BiodataPreview
          sections={sections}
          template={template}
          onImgLoad={() => setImgLoaded(true)}
        />
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Download Biodata
      </button>
    </div>
  );
}

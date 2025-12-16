import { useRef, useState, useEffect } from "react";
import BiodataForm from "./components/BiodataForm";
import TemplateSelector from "./components/TemplateSelector";
import BiodataContainer from "./components/BiodataContainer";
import { defaultSections } from "./data";

const STORAGE_KEY = "biodata_sections";
const TEMPLATE_STORAGE_KEY = "biodata_template";

const toBase64 = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () =>
      reject("Template image cannot be loaded due to CORS");
  });


function App() {
  const idRef = useRef(1000);
  const getId = () => ++idRef.current;

  // ===============================
  // SECTIONS STATE (unchanged)
  // ===============================
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }

    return defaultSections.map((s) => ({
      ...s,
      id: getId(),
      fields: s.fields.map((f) => ({ ...f, id: getId() })),
    }));
  });

  // ===============================
  // TEMPLATE STATE (IMPORTANT)
  // ===============================
  const [template, setTemplate] = useState(() => {
    const saved = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return null;
  });

  // ===============================
  // AUTO SAVE SECTIONS
  // ===============================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  }, [sections]);

  // ===============================
  // TEMPLATE SELECT HANDLER (CORS FIX)
  // ===============================
 const handleSelectTemplate = async (t) => {
  try {
    // 🔥 ALWAYS convert
    const base64 = t.img.startsWith("data:")
      ? t.img
      : await toBase64(t.img);

    const finalTemplate = { ...t, img: base64 };

    setTemplate(finalTemplate);
    localStorage.setItem(
      "biodata_template",
      JSON.stringify(finalTemplate)
    );
  } catch (err) {
    alert(
      "This template cannot be downloaded due to image restrictions."
    );
    console.error(err);
  }
};


  return (
    <div
      className="app-row"
      style={{
        display: "flex",
        gap: 40,
        padding: 20,
        alignItems: "flex-start",
      }}
    >
      {/* LEFT COLUMN */}
      <div style={{ width: "45%", minWidth: 360 }}>
        <h2>Form</h2>

        <BiodataForm sections={sections} setSections={setSections} />

        <TemplateSelector
          selected={template}
          onSelect={handleSelectTemplate}
        />
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ width: "45%", overflowX: "auto" }}>
        <h2>Preview</h2>

        {template ? (
          <BiodataContainer sections={sections} template={template} />
        ) : (
          <div>Please select a template</div>
        )}
      </div>
    </div>
  );
}

export default App;

import "../App.css";

export default function BiodataPreview({
  sections = [],
  template,
  forPDF = false,
  onImgLoad = () => {}, // ✅ SAFE DEFAULT
}) {
  const PAGE_HEIGHT = 705;
  const PAGE_WIDTH = 500;
  const PADDING = 0;

  const SECTION_H = 45;
  const FIELD_H = 37;
  const maxHeight = PAGE_HEIGHT - PADDING;

  const pages = [];
  let current = [];
  let usedHeight = 0;

  sections.forEach((section) => {
    if (usedHeight + SECTION_H > maxHeight) {
      pages.push(current);
      current = [];
      usedHeight = 0;
    }

    current.push({ type: "section", ...section });
    usedHeight += SECTION_H;

    section.fields.forEach((field) => {
      if (usedHeight + FIELD_H > maxHeight) {
        pages.push(current);
        current = [];
        usedHeight = 0;
      }

      current.push({ type: "field", ...field });
      usedHeight += FIELD_H;
    });
  });

  if (current.length) pages.push(current);

  return (
    <>
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className={`bd-page template-${template?.id}`}
          style={{
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            position: "relative",
            marginBottom: 20,
            boxSizing: "border-box",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {/* ✅ BACKGROUND IMAGE (Base64 only) */}
          {template?.img && (
            <img
              src={template.img}
              alt="template"
              draggable={false}
              onLoad={onImgLoad}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          )}

          {/* ✅ CONTENT */}
          <div
            className="bd-content"
            style={{
              position: "relative",
              zIndex: 1,
              height: PAGE_HEIGHT - PADDING * 2,
              padding: PADDING,
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {page.map((item) =>
              item.type === "section" ? (
                <div
                  key={item.id}
                  className="bd-section-title-preview"
                  style={{ fontSize: 16, marginBottom: 10 }}
                >
                  {item.title}
                </div>
              ) : (
                <div
                  key={item.id}
                  className="bd-field"
                  style={{ display: "flex", marginBottom: 8, fontSize: 14 }}
                >
                  <div className="bd-label" style={{ flex: 1 }}>
                    {item.label}:
                  </div>
                  <div className="bd-value" style={{ flex: 1 }}>
                    {item.value || "-"}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </>
  );
}

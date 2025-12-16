import { useEffect, useState } from "react";

export default function TemplateSelector({ selected, onSelect }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // 🔥 LOCAL TEMPLATES
    const localTemplates = [
      {
        id: 1,
        img: "/templates/temp-1.svg",
        imgpre: "/templates/temp-1.svg",
      },
       {
        id: 2,
        img: "/templates/temp-2.svg",
        imgpre: "/templates/temp-2.svg",
      },
      {
        id: 3,
        img: "/templates/temp-3.svg",
        imgpre: "/templates/temp-3.svg",
      },
      {
        id: 4,
        img: "/templates/temp-4.svg",
        imgpre: "/templates/temp-4.svg",
      },
       {
        id: 5,
        img: "/templates/temp-5.svg",
        imgpre: "/templates/temp-5.svg",
      },
       {
        id: 6,
        img: "/templates/temp-6.svg",
        imgpre: "/templates/temp-6.svg",
      },
       {
        id: 7,
        img: "/templates/temp-7.svg",
        imgpre: "/templates/temp-7.svg",
      },
       {
        id: 8,
        img: "/templates/temp-8.svg",
        imgpre: "/templates/temp-8.svg",
      },
       {
        id: 9,
        img: "/templates/temp-9.svg",
        imgpre: "/templates/temp-9.svg",
      },
       {
        id: 10,
        img: "/templates/temp-10.svg",
        imgpre: "/templates/temp-10.svg",
      },
    ];

    setTemplates(localTemplates);

    // ✅ AUTO SELECT FIRST TEMPLATE
    if (!selected && localTemplates.length > 0) {
      onSelect(localTemplates[0]);
    }
  }, [selected, onSelect]);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Select Template</h3>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => onSelect(tpl)}
            style={{
              width: 100,
              height: 140,
              cursor: "pointer",
              border:
                selected?.id === tpl.id
                  ? "3px solid #2563eb"
                  : "1px solid #ccc",
              padding: 4,
              boxSizing: "border-box",
            }}
          >
            <img
              src={tpl.imgpre}
              alt={`Template ${tpl.id}`}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

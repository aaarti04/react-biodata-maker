import { defaultSections } from "../data"; // make sure this exists

export default function BiodataForm({ sections, setSections }) {
  const sync = (data) => {
    setSections(data);
  };

  /* -------- RESET FORM -------- */
  const resetForm = () => {
    setSections(defaultSections); // reset to initial default
  };

  /* -------- SECTION MOVE -------- */
  const moveSection = (i, dir) => {
    const updated = [...sections];
    const t = dir === "up" ? i - 1 : i + 1;
    if (t < 0 || t >= updated.length) return;
    [updated[i], updated[t]] = [updated[t], updated[i]];
    sync(updated);
  };

  /* -------- FIELD MOVE -------- */
  const moveField = (si, fi, dir) => {
    const updated = [...sections];
    const fields = [...updated[si].fields];
    const t = dir === "up" ? fi - 1 : fi + 1;
    if (t < 0 || t >= fields.length) return;
    [fields[fi], fields[t]] = [fields[t], fields[fi]];
    updated[si].fields = fields;
    sync(updated);
  };

  const updateTitle = (i, val) => {
    const updated = [...sections];
    updated[i].title = val;
    sync(updated);
  };

  const updateField = (si, fi, key, val) => {
    const updated = [...sections];
    updated[si].fields[fi][key] = val;
    sync(updated);
  };

  /* -------- ADD -------- */
  const addSection = () => {
    sync([
      ...sections,
      {
        id: Date.now(),
        title: "New Section",
        fields: [{ id: Date.now() + 1, label: "New Field", value: "" }],
      },
    ]);
  };

  const addField = (si) => {
    const updated = [...sections];
    updated[si].fields.push({
      id: Date.now(),
      label: "New Field",
      value: "",
    });
    sync(updated);
  };

  /* -------- REMOVE -------- */
  const removeSection = (si) => {
    const updated = sections.filter((_, index) => index !== si);
    sync(updated);
  };

  const removeField = (si, fi) => {
    const updated = [...sections];
    updated[si].fields = updated[si].fields.filter(
      (_, index) => index !== fi
    );
    sync(updated);
  };

  return (
    <div>
      {sections.map((section, si) => (
        <div
          key={section.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 15,
          }}
        >
          {/* Section controls */}
          <div style={{ display: "flex", gap: 8 }}>
            {si > 0 && (
              <button onClick={() => moveSection(si, "up")}>↑</button>
            )}
            {si < sections.length - 1 && (
              <button onClick={() => moveSection(si, "down")}>↓</button>
            )}
            <button onClick={() => removeSection(si)}>❌</button>
          </div>

          <input
            value={section.title}
            onChange={(e) => updateTitle(si, e.target.value)}
            style={{ width: "100%", fontWeight: "bold", margin: "8px 0" }}
          />

          {section.fields.map((field, fi) => (
            <div key={field.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", gap: 6 }}>
                {fi > 0 && (
                  <button onClick={() => moveField(si, fi, "up")}>↑</button>
                )}
                {fi < section.fields.length - 1 && (
                  <button onClick={() => moveField(si, fi, "down")}>↓</button>
                )}

                <input
                  value={field.label}
                  placeholder="Label"
                  onChange={(e) =>
                    updateField(si, fi, "label", e.target.value)
                  }
                  style={{ flex: 1 }}
                />
                <input
                  value={field.value}
                  placeholder="Value"
                  onChange={(e) =>
                    updateField(si, fi, "value", e.target.value)
                  }
                  style={{ flex: 1 }}
                />

                <button onClick={() => removeField(si, fi)}>❌</button>
              </div>
            </div>
          ))}

          <button onClick={() => addField(si)}>Add Field</button>
        </div>
      ))}

      <button onClick={addSection}>Add Section</button>
      <button onClick={resetForm} style={{ marginLeft: 10, background: "#f00", color: "#fff" }}>
        Reset Form
      </button>
    </div>
  );
}

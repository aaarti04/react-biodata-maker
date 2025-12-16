// src/data.js

export const defaultSections = [
  {
    id: 1,
    title: "व्यक्तिगत विवरण",
    fields: [
      { id: 1, label: "नाम", value: "" },
      { id: 2, label: "जन्म तिथि", value: "" },
      { id: 3, label: "रंग", value: "" },
      { id: 4, label: "कद", value: "" },
      { id: 5, label: "व्यवसाय", value: "" },
      { id: 6, label: "आय", value: "" },
      { id: 7, label: "शिक्षा", value: "" }
    ]
  },
  {
    id: 2,
    title: "परिवार के सदस्य",
    fields: [
      { id: 8, label: "पिताजी का नाम", value: "" },
      { id: 9, label: "पिताजी का व्यवसाय", value: "" },
      { id: 10, label: "माताजी का नाम", value: "" },
      { id: 11, label: "माताजी का व्यवसाय", value: "" }
    ]
  },
  {
    id: 3,
    title: "संपर्क सूत्र ",
    fields: [
      { id: 12, label: "नाम", value: "" },
      { id: 13, label: "फ़ोन नंबर", value: "" },
      { id: 14, label: "पता", value: "" }
    ]
  }
];

export const templates = [
  { id: 1, name: "Classic", background: "/templates/classic.png" },
  { id: 2, name: "Modern", background: "/templates/modern.png" },
];

// export const defaultSections = [
//   {
//     id: 1,
//     title: "Personal Information",
//     fields: [
//       { id: 1, label: "Full Name", value: "" }
//     ]
//   },
//   {
//     id: 2,
//     title: "Education Information",
//     fields: [
//       { id: 2, label: "Degree", value: "" }
//     ]
//   },
//   {
//     id: 3,
//     title: "Family Background",
//     fields: [
//       { id: 3, label: "Father's Name", value: "" }
//     ]
//   }
// ];

// export const templates = [
//   { id: 1, name: "Classic", background: "/templates/classic.png" },
//   { id: 2, name: "Modern", background: "/templates/modern.png" },
// ];

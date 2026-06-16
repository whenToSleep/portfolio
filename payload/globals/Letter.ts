import type { GlobalConfig } from "payload";

export const Letter: GlobalConfig = {
  slug: "letter",
  label: "Лист від художниці",
  admin: {
    group: "Сторінки",
    description: "Сторінка «Лист» — редакційна колонка.",
    preview: (_doc, { locale }) => `/${locale || "en"}/letter`,
  },
  versions: { drafts: true },
  access: {
    read: () => true,
  },
  fields: [
    { name: "dek", type: "textarea", localized: true, label: "Підзаголовок" },
    {
      name: "paragraphs",
      type: "textarea",
      localized: true,
      label: "Текст листа",
      admin: { description: "Абзаци розділяйте порожнім рядком." },
    },
    { name: "signature", type: "text", localized: true, label: "Підпис" },
  ],
};

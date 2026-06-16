import type { GlobalConfig } from "payload";

export const Letter: GlobalConfig = {
  slug: "letter",
  label: "Лист від художниці",
  admin: {
    group: "Сторінки",
    description: "Сторінка «Лист» — редакційна колонка.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "dek", type: "textarea", localized: true, label: "Підзаголовок" },
    { name: "paragraphs", type: "richText", localized: true, label: "Текст листа" },
    { name: "signature", type: "text", localized: true, label: "Підпис" },
  ],
};

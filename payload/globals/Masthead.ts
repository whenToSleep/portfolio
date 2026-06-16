import type { GlobalConfig } from "payload";

// Localized content for the Masthead (Imprint) screen.
export const Masthead: GlobalConfig = {
  slug: "masthead",
  label: "Імпринт (masthead)",
  admin: {
    group: "Сторінки",
    description: "Люди, адреси, шрифти.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "dek", type: "text", localized: true, label: "Підзаголовок" },
    {
      name: "studioLabel",
      type: "text",
      localized: true,
      label: "Підпис блоку «Майстерня»",
    },
    {
      name: "roles",
      type: "array",
      label: "Майстерня (ролі)",
      fields: [
        { name: "role", type: "text", localized: true, label: "Роль" },
        { name: "name", type: "text", localized: true, label: "Ім'я / опис" },
        { name: "contact", type: "text", label: "Контакт" },
      ],
    },
    {
      name: "distLabel",
      type: "text",
      localized: true,
      label: "Підпис блоку «Поширення»",
    },
    {
      name: "distribution",
      type: "array",
      label: "Поширення",
      fields: [
        { name: "label", type: "text", localized: true, label: "Назва" },
        { name: "handle", type: "text", localized: true, label: "Підпис" },
        { name: "url", type: "text", label: "Посилання" },
      ],
    },
    { name: "typeLabel", type: "text", localized: true, label: "Підпис «Про шрифт»" },
    { name: "typeBody", type: "richText", localized: true, label: "Про шрифт" },
    {
      type: "row",
      fields: [
        { name: "colophonLeft", type: "text", localized: true, label: "Колофон зліва", admin: { width: "50%" } },
        { name: "colophonRight", type: "text", localized: true, label: "Колофон справа", admin: { width: "50%" } },
      ],
    },
  ],
};

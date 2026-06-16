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
      localized: true,
      label: "Майстерня (ролі)",
      fields: [
        { name: "role", type: "text", label: "Роль" },
        { name: "name", type: "text", label: "Ім'я / опис" },
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
      localized: true,
      label: "Поширення",
      fields: [
        { name: "label", type: "text", label: "Назва" },
        { name: "handle", type: "text", label: "Підпис" },
        { name: "url", type: "text", label: "Посилання" },
      ],
    },
    { name: "typeLabel", type: "text", localized: true, label: "Підпис «Про шрифт»" },
    {
      name: "typeBody",
      type: "textarea",
      localized: true,
      label: "Про шрифт",
      admin: { description: "Можна використати <em>…</em> для курсиву." },
    },
    {
      type: "row",
      fields: [
        { name: "colophonLeft", type: "text", localized: true, label: "Колофон зліва", admin: { width: "50%" } },
        { name: "colophonRight", type: "text", localized: true, label: "Колофон справа", admin: { width: "50%" } },
      ],
    },
  ],
};

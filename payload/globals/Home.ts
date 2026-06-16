import type { GlobalConfig } from "payload";

// Localized UI strings for the Cover (Home) screen. The exhaustive mapping of
// the remaining nav/index labels is finalized in Phase 4 during seeding.
export const Home: GlobalConfig = {
  slug: "home",
  label: "Головна (обкладинка)",
  admin: {
    group: "Сторінки",
    description: "Тексти головної сторінки.",
    preview: (_doc, { locale }) => `/${locale || "en"}`,
  },
  versions: { drafts: true },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "metaLeft", type: "text", localized: true, label: "Рядок зверху зліва", admin: { width: "50%" } },
        { name: "metaRight", type: "text", localized: true, label: "Рядок зверху справа", admin: { width: "50%" } },
      ],
    },
    { name: "statementLabel", type: "text", localized: true, label: "Підпис заяви" },
    {
      name: "statement",
      type: "textarea",
      localized: true,
      label: "Художня заява",
      admin: { description: "Можна використати <em>…</em> для курсиву." },
    },
    { name: "figCaption", type: "text", localized: true, label: "Підпис обкладинки" },
    { name: "coverNote", type: "text", localized: true, label: "Примітка обкладинки" },
    { name: "readProject", type: "text", localized: true, label: "Кнопка «Читати про роботу»" },
    {
      type: "row",
      fields: [
        { name: "availLabel", type: "text", localized: true, label: "Підпис «Зараз»", admin: { width: "50%" } },
        { name: "avail", type: "textarea", localized: true, label: "Статус доступності", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "copyright", type: "text", localized: true, label: "Копірайт", admin: { width: "50%" } },
        { name: "place", type: "text", localized: true, label: "Місце друку", admin: { width: "50%" } },
      ],
    },
  ],
};

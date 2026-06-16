import type { GlobalConfig } from "payload";
import { CACHE_TAGS, safeRevalidateTag } from "../../lib/revalidate";

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
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.global("letter"))],
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

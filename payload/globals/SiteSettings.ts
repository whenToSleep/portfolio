import type { GlobalConfig } from "payload";
import { CACHE_TAGS, safeRevalidateTag } from "../../lib/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Контакти та автор",
  admin: {
    group: "Налаштування",
    description: "Ім'я, місто, адреси, соцмережі.",
    preview: (_doc, { locale }) => `/${locale || "en"}`,
  },
  versions: { drafts: true },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.global("siteSettings"))],
  },
  fields: [
    { name: "name", type: "text", localized: true, label: "Ім'я" },
    { name: "city", type: "text", localized: true, label: "Місто" },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", label: "Пошта (студія)", admin: { width: "33%" } },
        { name: "commissions", type: "email", label: "Замовлення", admin: { width: "34%" } },
        { name: "press", type: "email", label: "Преса", admin: { width: "33%" } },
      ],
    },
    {
      name: "socials",
      type: "array",
      label: "Соцмережі",
      fields: [
        { name: "label", type: "text", label: "Назва" },
        { name: "handle", type: "text", label: "Нік / підпис" },
        { name: "url", type: "text", label: "Посилання" },
      ],
    },
  ],
};

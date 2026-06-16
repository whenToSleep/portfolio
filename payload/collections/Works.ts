import type { CollectionConfig } from "payload";

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const Works: CollectionConfig = {
  slug: "works",
  labels: { singular: "Робота", plural: "Роботи" },
  admin: {
    useAsTitle: "title",
    group: "Контент",
    defaultColumns: ["title", "client", "year", "num"],
    description: "Портфоліо — список робіт у «Змісті» та сторінки проєктів.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: "Назва",
    },
    {
      type: "row",
      fields: [
        { name: "num", type: "text", label: "№", admin: { width: "33%", description: "01–12" } },
        { name: "client", type: "text", label: "Замовник", admin: { width: "34%" } },
        { name: "year", type: "number", label: "Рік", admin: { width: "33%" } },
      ],
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      label: "Теги",
    },
    {
      name: "plate",
      type: "number",
      defaultValue: 1,
      min: 1,
      max: 4,
      admin: {
        position: "sidebar",
        description: "Візерунок плейсхолдера (1–4), поки немає зображення.",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Обкладинка",
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Галерея",
    },
    {
      name: "subtitle",
      type: "textarea",
      localized: true,
      label: "Підзаголовок",
    },
    {
      name: "pull",
      type: "textarea",
      localized: true,
      label: "Цитата-виноска",
    },
    {
      name: "body",
      type: "textarea",
      localized: true,
      label: "Текст проєкту",
      admin: { description: "Абзаци розділяйте порожнім рядком." },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL-адреса (генерується з назви, можна змінити).",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            const title = data?.title;
            const base = typeof title === "string" ? title : title?.en;
            return base ? slugify(base) : value;
          },
        ],
      },
    },
  ],
};

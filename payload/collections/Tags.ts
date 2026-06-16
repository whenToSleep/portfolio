import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  labels: { singular: "Тег", plural: "Теги (техніка / формат)" },
  admin: {
    useAsTitle: "label",
    group: "Контент",
    defaultColumns: ["label", "value", "order"],
    description: "Словник технік і форматів для фільтра в «Змісті».",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      localized: true,
      label: "Назва",
    },
    {
      name: "value",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "Системний ключ (Traditional, Digital, Editorial, Poster, Book).",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Порядок у фільтрі." },
    },
  ],
};

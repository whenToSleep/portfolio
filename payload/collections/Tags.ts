import type { CollectionConfig } from "payload";
import { CACHE_TAGS, safeRevalidateTag } from "../../lib/revalidate";

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
  hooks: {
    // Tag labels appear in the works filter/cards, so invalidate both tags here.
    afterChange: [
      () => {
        safeRevalidateTag(CACHE_TAGS.tags);
        safeRevalidateTag(CACHE_TAGS.works);
      },
    ],
    afterDelete: [
      () => {
        safeRevalidateTag(CACHE_TAGS.tags);
        safeRevalidateTag(CACHE_TAGS.works);
      },
    ],
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

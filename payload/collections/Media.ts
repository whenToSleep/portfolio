import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Зображення", plural: "Медіа" },
  admin: {
    group: "Контент",
    description: "Бібліотека зображень. Підтягуються в роботи та на головну.",
  },
  access: {
    read: () => true,
  },
  upload: {
    // Local disk in dev. On Vercel, the Blob adapter (payload.config.ts) takes
    // over when BLOB_READ_WRITE_TOKEN is present.
    staticDir: "media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 900 },
      { name: "feature", width: 1600 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      label: "Опис (alt)",
      admin: { description: "Текстовий опис зображення для доступності та SEO." },
    },
  ],
};

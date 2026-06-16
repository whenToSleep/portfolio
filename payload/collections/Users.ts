import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Користувач", plural: "Користувачі" },
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Система",
    description: "Адміністратори, які можуть редагувати сайт.",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Ім'я",
    },
  ],
};

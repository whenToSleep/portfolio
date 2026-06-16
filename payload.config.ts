import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Tags } from "./payload/collections/Tags";
import { Works } from "./payload/collections/Works";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { Home } from "./payload/globals/Home";
import { Letter } from "./payload/globals/Letter";
import { Masthead } from "./payload/globals/Masthead";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: "— Anya Volkov" },
  },
  editor: lexicalEditor(),
  collections: [Works, Tags, Media, Users],
  globals: [SiteSettings, Home, Letter, Masthead],
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "uk", label: "Українська" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      // Neon direct (non-pooled) connection — safe for DDL/migrations.
      // Revisit pooling for production traffic in Phase 8.
      connectionString:
        process.env.DATABASE_URL_UNPOOLED ||
        process.env.POSTGRES_URL_NON_POOLING ||
        process.env.DATABASE_URL ||
        "",
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  sharp,
  plugins: [
    // Use Vercel Blob for media when its token is available (deploy); local
    // disk otherwise (dev). See Media.ts staticDir.
    ...(blobToken
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: blobToken,
          }),
        ]
      : []),
  ],
});

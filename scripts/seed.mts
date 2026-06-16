/**
 * Seed Payload from the prototype data in lib/content.ts (idempotent).
 *
 * Runs over the REST API against a running dev server (avoids the tsx/ESM
 * issues of importing Payload directly). Start `pnpm dev` first, then:
 *   SEED_EMAIL=... SEED_PASSWORD=... pnpm seed
 *
 * Seeds Tags (5) and Works (12) in EN + UK. Images are left empty on purpose —
 * the real illustrations come later; the site degrades to placeholders.
 */
import { WORKS, TAGS, TAG_ORDER, slugify } from "../lib/content";

const BASE = process.env.SEED_URL || "http://localhost:3000";
const EMAIL = process.env.SEED_EMAIL || "admin@anyavolkov.work";
const PASSWORD = process.env.SEED_PASSWORD || "Av-6c05e49c75fd!";

let token = "";
const headers = () => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `JWT ${token}` } : {}),
});

async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, { ...init, headers: { ...headers(), ...(init?.headers || {}) } });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${init?.method || "GET"} ${path} -> ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  }
  return json;
}

async function login() {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const json = await res.json();
  if (!json.token) throw new Error(`login failed: ${JSON.stringify(json).slice(0, 200)}`);
  token = json.token;
  console.log("✓ logged in as", EMAIL);
}

/** Find one doc by an equals filter, returns it or null. */
async function findOne(collection: string, field: string, value: string) {
  const q = `/api/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1&depth=0`;
  const json = await api(q);
  return json.docs?.[0] ?? null;
}

async function seedTags() {
  const map: Record<string, number | string> = {};
  for (let i = 0; i < TAG_ORDER.length; i++) {
    const key = TAG_ORDER[i];
    const existing = await findOne("tags", "value", key);
    const en = { value: key, label: TAGS[key].en, order: i };
    let id: number | string;
    if (existing) {
      id = existing.id;
      await api(`/api/tags/${id}?locale=en`, { method: "PATCH", body: JSON.stringify(en) });
    } else {
      const created = await api(`/api/tags?locale=en`, { method: "POST", body: JSON.stringify(en) });
      id = created.doc.id;
    }
    await api(`/api/tags/${id}?locale=uk`, { method: "PATCH", body: JSON.stringify({ label: TAGS[key].uk }) });
    map[key] = id;
  }
  console.log(`✓ tags: ${TAG_ORDER.length}`);
  return map;
}

async function seedWorks(tagMap: Record<string, number | string>) {
  let created = 0;
  let updated = 0;
  for (const w of WORKS) {
    const slug = slugify(w.title.en);
    const tagIds = w.tags.map((k) => tagMap[k]).filter(Boolean);
    const en = {
      title: w.title.en,
      num: w.num,
      client: w.client,
      year: w.year,
      plate: w.plate,
      tags: tagIds,
      slug,
    };
    const existing = await findOne("works", "slug", slug);
    let id: number | string;
    if (existing) {
      id = existing.id;
      await api(`/api/works/${id}?locale=en`, { method: "PATCH", body: JSON.stringify(en) });
      updated++;
    } else {
      const res = await api(`/api/works?locale=en`, { method: "POST", body: JSON.stringify(en) });
      id = res.doc.id;
      created++;
    }
    await api(`/api/works/${id}?locale=uk`, { method: "PATCH", body: JSON.stringify({ title: w.title.uk }) });
  }
  console.log(`✓ works: ${created} created, ${updated} updated (of ${WORKS.length})`);
}

async function main() {
  console.log(`Seeding ${BASE} …`);
  await login();
  const tagMap = await seedTags();
  await seedWorks(tagMap);
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error("SEED FAILED:", e.message);
  process.exit(1);
});

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
import { WORKS, TAGS, TAG_ORDER, ARTIST, LETTER, PROJECT, STR, slugify } from "../lib/content";

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
      subtitle: PROJECT.subtitle.en,
      pull: PROJECT.pull.en,
      body: PROJECT.body.en.join("\n\n"),
      _status: "published",
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
    await api(`/api/works/${id}?locale=uk`, {
      method: "PATCH",
      body: JSON.stringify({
        title: w.title.uk,
        subtitle: PROJECT.subtitle.uk,
        pull: PROJECT.pull.uk,
        body: PROJECT.body.uk.join("\n\n"),
        _status: "published",
      }),
    });
  }
  console.log(`✓ works: ${created} created, ${updated} updated (of ${WORKS.length})`);
}

async function updateGlobal(slug: string, locale: string, data: Record<string, unknown>) {
  // _status:published so the public site shows the content (drafts are enabled).
  await api(`/api/globals/${slug}?locale=${locale}`, {
    method: "POST",
    body: JSON.stringify({ ...data, _status: "published" }),
  });
}

async function seedGlobals() {
  for (const lang of ["en", "uk"] as const) {
    const s = STR[lang];

    const site: Record<string, unknown> = { name: ARTIST.name[lang], city: ARTIST.city[lang] };
    if (lang === "en") {
      site.email = ARTIST.email;
      site.commissions = ARTIST.commissions;
      site.press = ARTIST.press;
      site.socials = s.home_social.map(([label, handle, url]) => ({ label, handle, url }));
    }
    await updateGlobal("siteSettings", lang, site);

    await updateGlobal("home", lang, {
      metaLeft: s.home_meta_l,
      metaRight: s.home_meta_r,
      statementLabel: s.home_statement_label,
      statement: s.home_statement,
      figCaption: s.home_fig,
      coverNote: s.home_cover_note,
      readProject: s.read_project,
      availLabel: s.home_avail_label,
      avail: s.home_avail,
      copyright: s.home_copyright,
      place: s.home_place,
    });

    await updateGlobal("letter", lang, {
      dek: LETTER.dek[lang],
      paragraphs: LETTER.paragraphs[lang].join("\n\n"),
      signature: s.letter_sign,
    });

    await updateGlobal("masthead", lang, {
      dek: s.mast_dek,
      studioLabel: s.studio_label,
      roles: s.roles.map(([role, name, contact]) => ({ role, name, contact })),
      distLabel: s.dist_label,
      distribution: s.dist.map(([label, handle, url]) => ({ label, handle, url })),
      typeLabel: s.type_label,
      typeBody: s.type_body,
      colophonLeft: s.colophon_l,
      colophonRight: s.colophon_r,
    });
  }
  console.log("✓ globals: siteSettings, home, letter, masthead (en/uk)");
}

async function main() {
  console.log(`Seeding ${BASE} …`);
  await login();
  const tagMap = await seedTags();
  await seedWorks(tagMap);
  await seedGlobals();
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error("SEED FAILED:", e.message);
  process.exit(1);
});

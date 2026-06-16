// ============================================================
// Data + bilingual (EN / UK) content for the journal.
// Ported 1:1 from the prototype (portfolio.html). Temporary home for
// content — replaced by Payload CMS queries in Phase 4.
// L(field, lang) returns the right string; plain strings pass through.
// ============================================================

export type Lang = "en" | "uk";
export type PageKey = "home" | "issue" | "project" | "letter" | "masthead";

/** A value localised per language (EN required, others optional). */
export type Localized<T = string> = { en: T } & Partial<Record<Lang, T>>;

export type Triple = [label: string, value: string, href: string];

export interface Artist {
  name: Localized;
  city: Localized;
  year: number;
  email: string;
  commissions: string;
  press: string;
}

export const ARTIST: Artist = {
  name: { en: "Anya Volkov", uk: "Аня Волкова" },
  city: { en: "Tbilisi", uk: "Тбілісі" },
  year: 2026,
  email: "studio@anyavolkov.work",
  commissions: "commissions@anyavolkov.work",
  press: "press@anyavolkov.work",
};

// --- Tag vocabulary (medium / format) used for Index filtering ---
export type TagKey = "Traditional" | "Digital" | "Editorial" | "Poster" | "Book";

export const TAGS: Record<TagKey, Localized> = {
  Traditional: { en: "Traditional", uk: "Традиційна" },
  Digital: { en: "Digital", uk: "Діджитал" },
  Editorial: { en: "Editorial", uk: "Редакційна" },
  Poster: { en: "Poster", uk: "Постери" },
  Book: { en: "Book", uk: "Книги" },
};
export const TAG_ORDER: TagKey[] = ["Traditional", "Digital", "Editorial", "Poster", "Book"];

// --- Works (the Index) ---
export interface Work {
  id: number;
  num: string;
  title: Localized;
  client: string;
  year: number;
  plate: number;
  tags: TagKey[];
}

export const WORKS: Work[] = [
  { id: 1,  num: "01", title: { en: "A Letter to the Garden",       uk: "Лист до саду" },              client: "The New York Times",   year: 2025, plate: 1, tags: ["Traditional", "Editorial"] },
  { id: 2,  num: "02", title: { en: "Slow Burn",                    uk: "Повільне горіння" },          client: "The Atlantic",         year: 2025, plate: 2, tags: ["Traditional", "Editorial"] },
  { id: 3,  num: "03", title: { en: "Notes from a Northern Spring", uk: "Нотатки північної весни" },   client: "Penguin Press",        year: 2024, plate: 3, tags: ["Traditional", "Book"] },
  { id: 4,  num: "04", title: { en: "The Algorithm Forgets",        uk: "Алгоритм забуває" },          client: "Wired",                year: 2024, plate: 4, tags: ["Digital", "Editorial"] },
  { id: 5,  num: "05", title: { en: "Tbilisi Film Festival",        uk: "Тбіліський кінофестиваль" },  client: "TIFF",                 year: 2024, plate: 1, tags: ["Digital", "Poster"] },
  { id: 6,  num: "06", title: { en: "Mothers, Daughters",           uk: "Матері, доньки" },            client: "The Guardian Weekly",  year: 2024, plate: 2, tags: ["Traditional", "Editorial"] },
  { id: 7,  num: "07", title: { en: "Granta 168: The Slow Lane",    uk: "Granta 168: Повільна смуга" },client: "Granta",               year: 2023, plate: 3, tags: ["Traditional", "Book"] },
  { id: 8,  num: "08", title: { en: "A Year of Sundays",            uk: "Рік неділь" },                client: "Self-published",       year: 2023, plate: 4, tags: ["Traditional", "Poster"] },
  { id: 9,  num: "09", title: { en: "On Patience",                  uk: "Про терпіння" },              client: "The Paris Review",     year: 2023, plate: 1, tags: ["Traditional", "Editorial"] },
  { id: 10, num: "10", title: { en: "Pirosmani Reissue",            uk: "Піросмані. Перевидання" },    client: "Sulakauri Publishing", year: 2023, plate: 2, tags: ["Digital", "Book"] },
  { id: 11, num: "11", title: { en: "The Long Walk Home",           uk: "Довга дорога додому" },       client: "Faber & Faber",        year: 2022, plate: 3, tags: ["Traditional", "Book"] },
  { id: 12, num: "12", title: { en: "Inheritance",                  uk: "Спадок" },                    client: "Harper's Magazine",    year: 2022, plate: 4, tags: ["Digital", "Editorial"] },
];

// --- Project article (short) — content is generic so any work can open it ---
export const PROJECT = {
  subtitle: {
    en: "A short series of plates for an essay on the patient labour of tending things you may never harvest.",
    uk: "Коротка серія робіт до есею про терпляву працю — доглядати те, чого, можливо, ніколи не збереш.",
  },
  body: {
    en: [
      "The commission began, as most do, with a brief that was generous and slightly impossible — and a deadline that was neither.",
      "I work slowly and on purpose. What survives the final edit is usually the quietest option: the one that leaves the reader something to finish.",
    ],
    uk: [
      "Замовлення почалося, як майже всі, зі щедрого й трохи неможливого брифа — і дедлайну, що не був ані тим, ані іншим.",
      "Я працюю повільно і свідомо. До фінального відбору зазвичай доживає найтихіший варіант — той, що лишає читачеві щось дозавершити.",
    ],
  },
  pull: {
    en: "What survives the edit is usually the quietest option.",
    uk: "До фінального відбору доживає найтихіший варіант.",
  },
} satisfies Record<"subtitle" | "pull", Localized> & { body: Record<Lang, string[]> };

// --- Letter from the artist (short) ---
export const LETTER = {
  dek: {
    en: "On working slowly, in a small room, in a year that wanted things faster.",
    uk: "Про те, як працювати повільно, у маленькій кімнаті, у рік, що хотів усього швидше.",
  },
  paragraphs: {
    en: [
      "I trained as a printmaker, which is to say I trained to wait. A plate does not negotiate; it tells you, after the acid bath, whether you guessed right.",
      "My studio is one room in a building from 1903 in Sololaki. I read in the mornings, cook in the evenings, and keep the middle of the day for drawing.",
      "I think of an illustration as a small contract with a reader: I agree not to waste your attention; you agree to bring some of your own. If you are here looking for a collaborator, please write. I answer letters slowly, on purpose.",
    ],
    uk: [
      "Я навчалася друкарській справі — тобто навчалася чекати. Друкарська форма не торгується: після кислотної ванни вона просто каже, чи ти вгадала.",
      "Моя майстерня — одна кімната в будинку 1903 року в Сололакі. Зранку читаю, увечері готую, а середину дня лишаю для малювання.",
      "Я думаю про ілюстрацію як про невелику угоду з читачем: я обіцяю не марнувати вашу увагу; ви обіцяєте додати трохи власної. Якщо ви тут у пошуку колаборації — напишіть. Я відповідаю на листи повільно і свідомо.",
    ],
  },
} satisfies { dek: Localized; paragraphs: Record<Lang, string[]> };

// ============================================================
// UI strings
// ============================================================
export interface UIStrings {
  journal: string;
  nav: Record<PageKey, string>;
  folio: string;
  dayNight: { day: string; night: string };

  // Home
  home_meta_l: string;
  home_meta_r: string;
  home_statement_label: string;
  home_statement: string;
  home_fig: string;
  fig_lead: string;
  home_cover_note: string;
  read_project: string;
  home_avail_label: string;
  home_avail: string;
  home_reach_label: string;
  home_follow_label: string;
  home_social: Triple[];
  home_copyright: string;
  home_place: string;

  // Issue
  issue_meta_l: string;
  issue_meta_r: string;
  issue_title: string;
  issue_dek: string;
  filter_all: string;
  filter_label: string;
  showing: string;
  of: string;
  works_word: string;
  page_of: string;
  pag_cover: string;
  pag_project: string;

  // Project
  proj_section: string;
  tomb_title: string;
  tomb: { client: string; year: string; medium: string; section: string };
  medium_trad: string;
  medium_digi: string;
  setin_label: string;
  setin_body: string;
  fig1_cap: string;
  fig4_cap: string;
  byline: string;
  back_index: string;
  continue: string;
  cont_letter: string;

  // Letter
  letter_section: string;
  letter_place: string;
  letter_title: string;
  letter_sign: string;
  pag_project_back: string;
  pag_masthead: string;

  // Masthead
  mast_section: string;
  page5: string;
  mast_title: string;
  mast_dek: string;
  studio_label: string;
  roles: Triple[];
  dist_label: string;
  dist: Triple[];
  type_label: string;
  type_body: string;
  colophon_l: string;
  colophon_r: string;
  return_cover: string;
}

export const STR: Record<Lang, UIStrings> = {
  en: {
    journal: "An Illustrator's Journal",
    nav: { home: "Cover", issue: "Index", project: "Project", letter: "Letter", masthead: "Masthead" },
    folio: "№ 01 · 2026 · Tbilisi",
    dayNight: { day: "Day", night: "Night" },

    // Home
    home_meta_l: "Illustrator & Printmaker",
    home_meta_r: "Lviv · Printed on the open web",
    home_statement_label: "— Artist's Statement —",
    home_statement: "I draw <em>slowly</em>, mostly in gouache, sometimes in pencil, occasionally on a screen — for editors, publishers, and anyone still in the business of holding a reader's attention for longer than a glance.",
    home_fig: "Cover plate · A Letter to the Garden · 2025",
    fig_lead: "Fig. 1 — ",
    home_cover_note: "The Cover, March 2025",
    read_project: "Read the full project →",
    home_avail_label: "— Currently —",
    home_avail: "Open for new commissions from June 2026 onward.",
    home_reach_label: "— Get in touch —",
    home_follow_label: "— Follow —",
    home_social: [
      ["Instagram", "@anya.volkov", "https://instagram.com"],
      ["Are.na", "anya-volkov", "https://are.na"],
    ],
    home_copyright: "© Anya Volkov · 2026",
    home_place: "Lviv · Printed on the open web",

    // Issue
    issue_meta_l: "Section II · The Index · Twelve works",
    issue_meta_r: "Filter by medium · Listed without hierarchy",
    issue_title: "The <em>Index</em>",
    issue_dek: "A complete list of commissioned & personal work — 2022 through 2025.",
    filter_all: "All",
    filter_label: "Filter —",
    showing: "Showing",
    of: "of",
    works_word: "works",
    page_of: "Page 2 of 5 — The Index",
    pag_cover: "← Cover",
    pag_project: "Project →",

    // Project
    proj_section: "Section III · A Project",
    tomb_title: "— Tombstone —",
    tomb: { client: "Client", year: "Year", medium: "Medium", section: "Section" },
    medium_trad: "Gouache & graphite on Arches paper",
    medium_digi: "Digital · Procreate & risograph proof",
    setin_label: "— Set in —",
    setin_body: "Fraunces 144 (display)<br/>Bricolage Grotesque (subhead)<br/>Source Serif 4 (body)",
    fig1_cap: "Gouache & graphite on paper. The plate chosen for the opening spread.",
    fig4_cap: "A second plate — quieter, and the one that took the longest.",
    byline: "— A.V., Sololaki",
    back_index: "← Back to the Index",
    continue: "Continue —",
    cont_letter: "A Letter from the Artist →",

    // Letter
    letter_section: "Section IV · Editorial · From the Studio",
    letter_place: "Sololaki, Tbilisi · Spring, 2026",
    letter_title: "A <em>Letter</em>.",
    letter_sign: "— Anya Volkov, Tbilisi, 2026",
    pag_project_back: "← The Project",
    pag_masthead: "Masthead →",

    // Masthead
    mast_section: "Section V · Imprint · Correspondence",
    page5: "Page 5 of 5",
    mast_title: "<em>Mast</em>head",
    mast_dek: "The people, the addresses, the typefaces.",
    studio_label: "— The Studio —",
    roles: [
      ["Illustrator / Founder", "Anya Volkov", "studio@anyavolkov.work"],
      ["Commissions & Editorial", "All enquiries", "commissions@anyavolkov.work"],
      ["Press & Interviews", "Words about pictures", "press@anyavolkov.work"],
      ["Studio Assistant", "Lia Khatchaturian", "lia@anyavolkov.work"],
      ["Representation", "Currently self-represented", "—"],
    ],
    dist_label: "— Distribution —",
    dist: [
      ["Instagram", "@anya.volkov", "https://instagram.com"],
      ["Are.na", "anya-volkov", "https://are.na"],
      ["It's Nice That", "Profile", "https://itsnicethat.com"],
      ["Newsletter", "Quarterly, by post and by email", "#"],
      ["Print shop", "Limited risograph editions", "#"],
    ],
    type_label: "— A Note on the Type —",
    type_body: "Set in <em>Fraunces</em> for display, <em>Bricolage Grotesque</em> for subheads, and <em>Source Serif 4</em> for the body. Numerals are <em>JetBrains Mono</em>. The accent is a typographical red, RGB 221 · 54 · 36.",
    colophon_l: "Set in Fraunces & Söhne. Printed on the open web, Tbilisi, 2026.",
    colophon_r: "© Anya Volkov · Reproduction by permission only.",
    return_cover: "← Return to the Cover",
  },

  uk: {
    journal: "Журнал ілюстраторки",
    nav: { home: "Обкладинка", issue: "Зміст", project: "Робота", letter: "Лист", masthead: "Імпринт" },
    folio: "№ 01 · 2026 · Тбілісі",
    dayNight: { day: "День", night: "Ніч" },

    // Home
    home_meta_l: "Ілюстраторка та друкарка",
    home_meta_r: "Львів · Надруковано у відкритому вебі",
    home_statement_label: "— Художня заява —",
    home_statement: "Я малюю <em>повільно</em> — переважно гуашшю, інколи олівцем, подеколи на екрані — для редакцій, видавців і всіх, хто ще займається тим, щоб утримати увагу читача довше за один погляд.",
    home_fig: "Обкладинка · «Лист до саду» · 2025",
    fig_lead: "Іл. 1 — ",
    home_cover_note: "Обкладинка, березень 2025",
    read_project: "Читати про роботу →",
    home_avail_label: "— Зараз —",
    home_avail: "Відкрита до нових замовлень з червня 2026 року.",
    home_reach_label: "— Зв'язок —",
    home_follow_label: "— Слідкувати —",
    home_social: [
      ["Instagram", "@anya.volkov", "https://instagram.com"],
      ["Are.na", "anya-volkov", "https://are.na"],
    ],
    home_copyright: "© Аня Волкова · 2026",
    home_place: "Львів · Надруковано у відкритому вебі",

    // Issue
    issue_meta_l: "Розділ II · Зміст · Дванадцять робіт",
    issue_meta_r: "Фільтр за технікою · Перелік без ієрархії",
    issue_title: "<em>Зміст</em>",
    issue_dek: "Повний перелік замовлених і особистих робіт — 2022–2025.",
    filter_all: "Усі",
    filter_label: "Фільтр —",
    showing: "Показано",
    of: "із",
    works_word: "робіт",
    page_of: "Сторінка 2 з 5 — Зміст",
    pag_cover: "← Обкладинка",
    pag_project: "Робота →",

    // Project
    proj_section: "Розділ III · Робота",
    tomb_title: "— Реквізити —",
    tomb: { client: "Замовник", year: "Рік", medium: "Техніка", section: "Розділ" },
    medium_trad: "Гуаш і графіт на папері Arches",
    medium_digi: "Діджитал · Procreate і ризограф-проба",
    setin_label: "— Набрано шрифтами —",
    setin_body: "Fraunces 144 (заголовки)<br/>Bricolage Grotesque (підзаголовки)<br/>Source Serif 4 (текст)",
    fig1_cap: "Гуаш і графіт на папері. Робота, обрана для відкриваючого розвороту.",
    fig4_cap: "Друга робота — тихіша, і та, що забрала найбільше часу.",
    byline: "— А.В., Сололакі",
    back_index: "← Назад до Змісту",
    continue: "Далі —",
    cont_letter: "Лист від художниці →",

    // Letter
    letter_section: "Розділ IV · Редакційна колонка · З майстерні",
    letter_place: "Сололакі, Тбілісі · Весна, 2026",
    letter_title: "<em>Лист</em>.",
    letter_sign: "— Аня Волкова, Тбілісі, 2026",
    pag_project_back: "← Робота",
    pag_masthead: "Імпринт →",

    // Masthead
    mast_section: "Розділ V · Імпринт · Листування",
    page5: "Сторінка 5 з 5",
    mast_title: "<em>Ім</em>принт",
    mast_dek: "Люди, адреси, шрифти.",
    studio_label: "— Майстерня —",
    roles: [
      ["Ілюстраторка / Засновниця", "Аня Волкова", "studio@anyavolkov.work"],
      ["Замовлення та редакції", "Усі запити", "commissions@anyavolkov.work"],
      ["Преса та інтерв'ю", "Слова про малюнки", "press@anyavolkov.work"],
      ["Асистентка майстерні", "Лія Хачатурян", "lia@anyavolkov.work"],
      ["Представництво", "Наразі без агента", "—"],
    ],
    dist_label: "— Поширення —",
    dist: [
      ["Instagram", "@anya.volkov", "https://instagram.com"],
      ["Are.na", "anya-volkov", "https://are.na"],
      ["It's Nice That", "Профіль", "https://itsnicethat.com"],
      ["Розсилка", "Щокварталу, поштою та електронкою", "#"],
      ["Друкарня", "Обмежені ризограф-видання", "#"],
    ],
    type_label: "— Про шрифт —",
    type_body: "Набрано <em>Fraunces</em> для заголовків, <em>Bricolage Grotesque</em> для підзаголовків і <em>Source Serif 4</em> для основного тексту. Цифри — <em>JetBrains Mono</em>. Акцент — типографський червоний, RGB 221 · 54 · 36.",
    colophon_l: "Набрано Fraunces і Söhne. Надруковано у відкритому вебі, Тбілісі, 2026.",
    colophon_r: "© Аня Волкова · Відтворення лише з дозволу.",
    return_cover: "← Повернутися до обкладинки",
  },
};

/** Pick the right language for a localised value; pass plain strings through. */
export function L<T>(field: Localized<T> | T, lang: Lang): T {
  if (field && typeof field === "object" && !Array.isArray(field)) {
    const f = field as Localized<T>;
    return f[lang] ?? f.en;
  }
  return field as T;
}

// --- Work slugs (for /work/[slug] routes) ---
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function workSlug(w: Work): string {
  return slugify(w.title.en);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return WORKS.find((w) => workSlug(w) === slug);
}

/** Split a textarea body into paragraphs (blank-line separated). */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

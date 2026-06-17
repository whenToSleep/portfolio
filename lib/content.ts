// ============================================================
// Data + bilingual (UK / EN) content for the portfolio.
// Real content: Anna Starostina, Lviv (see CONTENT-IMPLEMENTATION.md).
// STR is read directly by the client components (UI chrome); Home/Letter/
// Masthead/SiteSettings body content is served from Payload (seeded from here).
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
  name: { en: "Anna Starostina", uk: "Анна Старостіна" },
  city: { en: "Lviv", uk: "Львів" },
  year: 2026,
  email: "t8ananas@gmail.com",
  commissions: "t8ananas@gmail.com",
  press: "t8ananas@gmail.com",
};

// --- Tag vocabulary (medium / format) used for Index filtering ---
export type TagKey = "Traditional" | "Digital" | "Book" | "Poster" | "Playbill" | "Cover";

export const TAGS: Record<TagKey, Localized> = {
  Traditional: { en: "Traditional", uk: "Традиційна графіка" },
  Digital: { en: "Digital", uk: "Діджитал" },
  Book: { en: "Book illustration", uk: "Книжкова ілюстрація" },
  Poster: { en: "Posters", uk: "Постери" },
  Playbill: { en: "Playbills", uk: "Афіші" },
  Cover: { en: "Covers", uk: "Обкладинки" },
};
export const TAG_ORDER: TagKey[] = ["Traditional", "Digital", "Book", "Poster", "Playbill", "Cover"];

// --- Works (the Index) ---
export interface Work {
  id: number;
  num: string;
  title: Localized;
  context: string;
  year: number;
  plate: number;
  tags: TagKey[];
}

// Real works are not published yet (portfolio in progress) — empty list renders
// the Works page's empty state; /work/[slug] pages come from the CMS once added.
export const WORKS: Work[] = [];

// --- Project article (short) — neutral defaults until real works are added ---
export const PROJECT = {
  subtitle: {
    en: "Work page — description coming soon.",
    uk: "Сторінка роботи — опис буде додано.",
  },
  body: {
    en: ["A description of this work will be added soon."],
    uk: ["Опис цієї роботи з'явиться згодом."],
  },
  pull: {
    en: "",
    uk: "",
  },
} satisfies Record<"subtitle" | "pull", Localized> & { body: Record<Lang, string[]> };

// --- About / "Про мене" (the Letter global) ---
export const LETTER = {
  dek: {
    en: "On why I draw and how I work.",
    uk: "Про те, навіщо я малюю і як працюю.",
  },
  paragraphs: {
    en: [
      "For as long as I can remember, I've wanted to picture what the eye can't see. To me an artist is someone who conveys their feelings, thoughts and imagination visually — through composition, the psychology of colour, and the way an image works directly on perception.",
      "I study at the Institute of Printing and Media Technologies, in the Book Graphics department. It's where I learned book layout and design, drawing and composition — and that's exactly what brings me closer to my goals.",
      "My process depends on the task, but it usually starts with the layout — a quick sketch of the main composition. Then I refine the details step by step, choose the right materials, and the idea comes to life. I'm open to book illustration, posters and playbills, advertising visuals, and book and website design — write to me if you'd like to work together.",
    ],
    uk: [
      "Скільки себе пам'ятаю, мені хотілося зобразити те, чого не побачиш очима. Для мене художник — це той, хто передає візуально свої почуття, думки й уяву: через композицію, психологію кольору, через те, як зображення напряму впливає на сприйняття.",
      "Навчаюся в Інституті поліграфії та медійних технологій на кафедрі книжкової графіки. Тут я опанувала верстку й дизайн книги, графіку та композицію — і саме це наближає мене до моїх цілей.",
      "Процес залежить від задачі, але зазвичай усе починається з компоновки — швидкого ескізу основної композиції. Далі поетапно уточнюю деталі, підбираю матеріали, і ідея оживає. Я відкрита до книжкової ілюстрації, плакатів і афіш, рекламних інтеграцій, дизайну книг та сайтів — пишіть, якщо хочете попрацювати разом.",
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
  issue_empty: string;
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
    journal: "Illustrator's Portfolio",
    nav: { home: "Home", issue: "Works", project: "Work", letter: "About", masthead: "Contacts" },
    folio: "Lviv · 2026",
    dayNight: { day: "Day", night: "Night" },

    // Home
    home_meta_l: "Book graphics student",
    home_meta_r: "Lviv, Ukraine",
    home_statement_label: "— Artist's Statement —",
    home_statement: "I work in ink, liner, pencil and digital — drawn most of all to <em>people</em> and the mysterious. What matters to me is conveying the feelings that surface as I draw: an artist's task is to show meaning through the image itself, without words.",
    home_fig: "Cover — coming soon",
    fig_lead: "",
    home_cover_note: "Cover — coming soon",
    read_project: "Read project →",
    home_avail_label: "— Currently —",
    home_avail: "Open to commissions, collaborations, internships and exhibitions.",
    home_reach_label: "— Get in touch —",
    home_follow_label: "— Follow —",
    home_social: [],
    home_copyright: "© Anna Starostina · 2026",
    home_place: "Lviv",

    // Issue
    issue_meta_l: "Selected work",
    issue_meta_r: "Filter by medium",
    issue_title: "<em>Works</em>",
    issue_dek: "Student and personal work.",
    issue_empty: "Works coming soon — portfolio in progress.",
    filter_all: "All",
    filter_label: "Filter —",
    showing: "Showing",
    of: "of",
    works_word: "works",
    page_of: "Works",
    pag_cover: "← Home",
    pag_project: "Work →",

    // Project
    proj_section: "Work",
    tomb_title: "— Details —",
    tomb: { client: "Context", year: "Year", medium: "Medium", section: "Section" },
    medium_trad: "Ink, liner and pencil on paper",
    medium_digi: "Digital",
    setin_label: "",
    setin_body: "",
    fig1_cap: "An illustration from the series.",
    fig4_cap: "Another illustration.",
    byline: "— A.S., Lviv",
    back_index: "← Back to works",
    continue: "Continue —",
    cont_letter: "About the artist →",

    // Letter
    letter_section: "About",
    letter_place: "Lviv · 2026",
    letter_title: "<em>About</em> me",
    letter_sign: "— Anna Starostina, Lviv, 2026",
    pag_project_back: "← Work",
    pag_masthead: "Contacts →",

    // Masthead
    mast_section: "Contacts",
    page5: "Contacts",
    mast_title: "<em>Con</em>tact",
    mast_dek: "How to reach me.",
    studio_label: "— Contact —",
    roles: [
      ["Contact", "Anna Starostina", "t8ananas@gmail.com"],
      ["Commissions & collaboration", "All enquiries", "t8ananas@gmail.com"],
    ],
    dist_label: "— Follow —",
    dist: [],
    type_label: "",
    type_body: "",
    colophon_l: "Lviv, 2026.",
    colophon_r: "© Anna Starostina · Reproduction by permission only.",
    return_cover: "← Back to home",
  },

  uk: {
    journal: "Портфоліо ілюстраторки",
    nav: { home: "Головна", issue: "Роботи", project: "Робота", letter: "Про мене", masthead: "Контакти" },
    folio: "Львів · 2026",
    dayNight: { day: "День", night: "Ніч" },

    // Home
    home_meta_l: "Студентка книжкової графіки",
    home_meta_r: "Львів, Україна",
    home_statement_label: "— Художня заява —",
    home_statement: "Малюю тушшю, лінером, олівцем та в діджиталі — найбільше люблю <em>людей</em> і містику. Головне для мене — передати ті відчуття, що виникають у процесі: завдання художника показати сенс ілюстративно, без слів.",
    home_fig: "Обкладинка — незабаром",
    fig_lead: "",
    home_cover_note: "Обкладинка — незабаром",
    read_project: "Читати про роботу →",
    home_avail_label: "— Зараз —",
    home_avail: "Відкрита до замовлень, колаборацій, практики та участі у виставках.",
    home_reach_label: "— Зв'язок —",
    home_follow_label: "— Слідкувати —",
    home_social: [],
    home_copyright: "© Анна Старостіна · 2026",
    home_place: "Львів",

    // Issue
    issue_meta_l: "Вибрані роботи",
    issue_meta_r: "Фільтр за технікою",
    issue_title: "<em>Роботи</em>",
    issue_dek: "Навчальні та особисті роботи.",
    issue_empty: "Роботи незабаром — портфоліо наповнюється.",
    filter_all: "Усі",
    filter_label: "Фільтр —",
    showing: "Показано",
    of: "із",
    works_word: "робіт",
    page_of: "Роботи",
    pag_cover: "← Головна",
    pag_project: "Робота →",

    // Project
    proj_section: "Робота",
    tomb_title: "— Реквізити —",
    tomb: { client: "Контекст", year: "Рік", medium: "Техніка", section: "Розділ" },
    medium_trad: "Туш, лінер, олівець на папері",
    medium_digi: "Діджитал",
    setin_label: "",
    setin_body: "",
    fig1_cap: "Ілюстрація з серії.",
    fig4_cap: "Ще одна ілюстрація.",
    byline: "— А.С., Львів",
    back_index: "← Назад до робіт",
    continue: "Далі —",
    cont_letter: "Про художницю →",

    // Letter
    letter_section: "Про мене",
    letter_place: "Львів · 2026",
    letter_title: "<em>Про</em> мене",
    letter_sign: "— Анна Старостіна, Львів, 2026",
    pag_project_back: "← Робота",
    pag_masthead: "Контакти →",

    // Masthead
    mast_section: "Контакти",
    page5: "Контакти",
    mast_title: "<em>Кон</em>такти",
    mast_dek: "Як зі мною зв'язатися.",
    studio_label: "— Контакти —",
    roles: [
      ["Зв'язок", "Анна Старостіна", "t8ananas@gmail.com"],
      ["Замовлення та співпраця", "Усі запити", "t8ananas@gmail.com"],
    ],
    dist_label: "— Слідкувати —",
    dist: [],
    type_label: "",
    type_body: "",
    colophon_l: "Львів, 2026.",
    colophon_r: "© Анна Старостіна · Відтворення лише з дозволу.",
    return_cover: "← На головну",
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

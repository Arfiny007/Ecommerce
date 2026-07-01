export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "art-of-restraint",
    title: "The Art of Restraint",
    excerpt:
      "Why the most luxurious wardrobe is often the smallest — and how to build one with intention.",
    category: "Editorial",
    author: "Elena Vasquez",
    date: "June 15, 2026",
    readTime: "6 min read",
    image: "photo-1469334031218-e382a71b716b",
    body: [
      "There is a moment in every well-dressed person's life when they stop accumulating and start editing. The closet shrinks. The choices clarify. What remains is not less — it is more precise.",
      "At FINY, we have always believed that luxury is a practice of restraint. Not austerity, but intention. The cashmere overcoat you reach for every winter. The silk blouse that works with everything. The leather bag that develops a patina only you could create.",
      "Building a considered wardrobe begins with understanding your life — how you move through your days, what environments you inhabit, what silhouettes make you feel most yourself. From there, each addition should earn its place.",
      "We design for this philosophy. Our Essentials collection exists precisely because some pieces should never leave your rotation. They are not seasonal. They are permanent.",
      "The art of restraint is not about denying yourself. It is about choosing so well that you need less. That is the quiet revolution we are part of — and invite you to join.",
    ],
  },
  {
    slug: "grasse-perfumery",
    title: "Inside Grasse: Where Scent Becomes Memory",
    excerpt:
      "A visit to the atelier where our signature Eau de Parfum No. 7 was composed.",
    category: "Craft",
    author: "James Whitfield",
    date: "May 28, 2026",
    readTime: "8 min read",
    image: "photo-1541643600914-78b084683601",
    body: [
      "Grasse has been the world's perfume capital since the 16th century. The hills above the town are still planted with jasmine, rose, and tuberose — flowers harvested at dawn when their oils are most concentrated.",
      "It was here, in a small atelier overlooking the Mediterranean, that our master perfumer composed Eau de Parfum No. 7. The brief was simple: create something that feels like memory — familiar yet impossible to place.",
      "The composition opens with bergamot from Calabria — bright, almost green. Then iris, powdery and intimate. The base is white musk, clean and skin-like, designed to linger without announcing itself.",
      "We chose eau de parfum concentration for longevity without heaviness. Each bottle is filled and sealed by hand. The atomiser delivers a fine, even mist — one or two sprays is sufficient.",
      "Fragrance, like clothing, is personal. No. 7 was not designed to please everyone. It was designed to resonate deeply with those who recognise something of themselves in it.",
    ],
  },
  {
    slug: "belgian-linen-guide",
    title: "A Guide to Belgian Linen",
    excerpt:
      "Why we source our linen from the flax fields of Flanders — and how to care for it.",
    category: "Materials",
    author: "Sofia Laurent",
    date: "May 10, 2026",
    readTime: "5 min read",
    image: "photo-1596755094514-f87e34085b2c",
    body: [
      "Belgian linen is among the finest in the world. The cool, damp climate of Flanders produces flax fibres that are long, strong, and remarkably soft. The tradition of linen weaving in the region dates back centuries.",
      "Our camp collar shirts are cut from washed Belgian linen — pre-softened so they feel lived-in from the first wear. The relaxed silhouette and breathable weave make them ideal for warm weather and layered transitions.",
      "Linen wrinkles. This is not a flaw — it is character. The natural creases that develop through a day of wear are part of the fabric's appeal. If you prefer a crisper look, a light steam will restore structure without eliminating the texture.",
      "Care is straightforward: machine wash cold on a gentle cycle, hang to dry, and steam rather than iron when needed. Linen grows softer with each wash. A well-cared-for linen shirt can last decades.",
      "We offer our linen pieces in white and sage — two colours that embody the FINY palette. Neutral, versatile, and designed to harmonise with everything else in your wardrobe.",
    ],
  },
  {
    slug: "ss26-lookbook-notes",
    title: "Notes from the SS26 Lookbook",
    excerpt:
      "Behind the scenes of our Spring/Summer campaign — light, form, and the city rhythm.",
    category: "Campaign",
    author: "Creative Team",
    date: "April 22, 2026",
    readTime: "4 min read",
    image: "photo-1509631179647-0177331693ae",
    body: [
      "The SS26 lookbook was shot over three days in New York — early morning light on Mercer Street, golden hour on the Brooklyn Bridge, and a final evening sequence in a SoHo loft.",
      "The creative direction was clear from the start: lightness. Not weightlessness, but the quality of fabric and form that moves with the body rather than against it. Tailored trousers with a pressed crease. A cashmere overcoat worn open. Suede loafers on cobblestone.",
      "We worked with photographer Amara Okonkwo and stylist Luca Ferretti — both long-time collaborators who understand the FINY aesthetic. The models were cast for presence, not perfection. Real people in real clothes.",
      "The palette is restrained: charcoal, camel, ivory, stone. Colour appears sparingly — a sage linen shirt, a navy loafer. The focus remains on proportion, texture, and the confidence of wearing less.",
      "View the full lookbook for the complete visual narrative. Each image is a chapter in the SS26 story.",
    ],
  },
  {
    slug: "leather-patina",
    title: "The Life of Leather: Embracing Patina",
    excerpt:
      "How vegetable-tanned leather develops character — and why we consider it a feature, not a flaw.",
    category: "Craft",
    author: "Marco Bellini",
    date: "April 5, 2026",
    readTime: "7 min read",
    image: "photo-1548036328-c9fa89d128fa",
    body: [
      "Vegetable-tanned leather is among the oldest materials in fashion. The process uses tannins from tree bark — oak, chestnut, mimosa — rather than chromium salts. The result is leather that ages visibly and beautifully.",
      "Our crossbody bag is hand-stitched in Florence using leather from a family tannery that has operated since 1872. The initial colour is consistent. Over months and years, it deepens, softens, and develops a patina unique to its owner.",
      "Sunlight, oils from your hands, the friction of daily use — all contribute to this transformation. Scratches lighten with time. The leather moulds to the objects you carry. No two bags look the same after a year of wear.",
      "We recommend conditioning with a natural leather balm every three months. Avoid prolonged exposure to water. Store in the provided dust bag when not in use.",
      "Patina is not damage. It is evidence of a life well-lived. We build our leather goods to reward the years you spend with them.",
    ],
  },
  {
    slug: "wardrobe-foundations",
    title: "Five Wardrobe Foundations Worth Investing In",
    excerpt:
      "The pieces that form the backbone of a considered wardrobe — and why quality compounds over time.",
    category: "Style",
    author: "Elena Vasquez",
    date: "March 18, 2026",
    readTime: "6 min read",
    image: "photo-1539533018447-63fcce2678e3",
    body: [
      "Every wardrobe needs a foundation — not trendy pieces, but permanent ones. Here are five we believe every considered dresser should own.",
      "First, a cashmere overcoat. Double-faced, relaxed tailoring, horn buttons. It should work over a suit or a sweater. You will wear it for twenty years.",
      "Second, tailored wool trousers. High-rise, pressed crease, side adjusters. Graphite or stone. They anchor everything above the waist.",
      "Third, a silk crepe blouse or shirt. Fluid, minimal, with mother-of-pearl buttons. Pearl or noir — both are essential.",
      "Fourth, a leather crossbody or tote. Vegetable-tanned, hand-stitched, sized for daily carry. It will develop a patina that tells your story.",
      "Fifth, suede penny loafers. Hand-lasted, leather-soled, true to size. The shoe that bridges formal and casual without effort.",
      "These are not rules. They are starting points. Build from here, edit ruthlessly, and let time reveal what truly belongs.",
    ],
  },
];

export const JOURNAL_PAGE = {
  eyebrow: "Journal",
  title: "The FINY Journal",
  lead: "Essays on craft, materials, and the art of dressing with intention.",
};

export function getJournalArticle(slug: string) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}

export function getJournalSlugs() {
  return JOURNAL_ARTICLES.map((a) => a.slug);
}

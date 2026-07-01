export const CATEGORY_COPY: Record<
  string,
  { title: string; description: string; editorial: string }
> = {
  "ready-to-wear": {
    title: "Ready-to-Wear",
    description:
      "Tailored silhouettes and refined essentials — garments designed to move through seasons with quiet confidence.",
    editorial:
      "From double-faced cashmere to washed Belgian linen, every piece is cut for proportion and ease. Wardrobe foundations that reward repetition.",
  },
  accessories: {
    title: "Accessories",
    description:
      "Finishing statements in leather, precious metals, and considered hardware — objects that elevate the everyday.",
    editorial:
      "Hand-stitched in Florence, vegetable-tanned and built to develop character over time. The details that complete a look.",
  },
  footwear: {
    title: "Footwear",
    description:
      "Hand-lasted shoes crafted for movement — suede, calf leather, and Blake-stitched soles made to last.",
    editorial:
      "Portuguese artisans, cedar shoe trees, and silhouettes that bridge formal and casual with equal grace.",
  },
  fragrance: {
    title: "Fragrance",
    description:
      "Olfactory compositions created in Grasse — layered, intimate, and designed to linger on skin and memory.",
    editorial:
      "Eau de parfum concentrations with bergamot, iris, and white musk. Cruelty-free formulations in signature atomisers.",
  },
  home: {
    title: "Home",
    description:
      "Sculptural objects for the considered interior — hand-finished stoneware, blown glass, and ritual pieces.",
    editorial:
      "Natural variations celebrate the artisan process. Objects that age with the spaces they inhabit.",
  },
};

export const COLLECTION_COPY: Record<
  string,
  { title: string; season: string; description: string; narrative: string }
> = {
  ss26: {
    title: "Spring / Summer 2026",
    season: "SS26",
    description:
      "Lightness, form, and intention — a collection built for longer days and quieter confidence.",
    narrative:
      "This season explores the tension between structure and ease. Neutral palettes meet precise tailoring; breathable linens sit alongside fluid silks. An edit for those who dress with purpose, not performance.",
  },
  essentials: {
    title: "FINY Essentials",
    season: "Permanent",
    description:
      "Wardrobe foundations designed to outlast trends — timeless silhouettes in premium natural fibres.",
    narrative:
      "The pieces you reach for without thinking. Silk crepe blouses, vegetable-tanned leather, and tailored wool in a palette that harmonises with everything you already own.",
  },
  limited: {
    title: "Limited Edition",
    season: "Exclusive",
    description:
      "Small-batch releases and numbered editions — available only while quantities last.",
    narrative:
      "When a composition or collaboration resonates, we produce it in limited runs. Once gone, these pieces exist only in the wardrobes of those who recognised them in time.",
  },
  gifts: {
    title: "Gift Guide",
    season: "Curated",
    description:
      "Thoughtfully selected pieces for every occasion — from first impressions to lifelong favourites.",
    narrative:
      "Complimentary gift wrapping on all orders. Each piece arrives in signature FINY packaging, ready to give or to keep.",
  },
};

export function getCategoryCopy(slug: string) {
  return CATEGORY_COPY[slug];
}

export function getCollectionCopy(slug: string) {
  return COLLECTION_COPY[slug];
}

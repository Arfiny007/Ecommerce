import type { LucideIcon } from "lucide-react";
import {
  Gem,
  Gift,
  Globe,
  Leaf,
  Package,
  Scissors,
  Shield,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&q=85&auto=format&fit=crop`;

export const BRAND_STATS = [
  { value: "2018", label: "Founded in SoHo" },
  { value: "4", label: "Global Boutiques" },
  { value: "12", label: "European Ateliers" },
  { value: "40+", label: "Countries Shipped" },
] as const;

export const CAMPAIGN_STORY = {
  eyebrow: "SS26 Campaign",
  title: "Lightness & Form",
  lead: "Our Spring/Summer narrative explores the tension between structure and ease — neutral palettes, precise tailoring, and the confidence of dressing with less.",
  body: "Shot across Mercer Street, Brooklyn Bridge, and a SoHo loft over three days, the SS26 campaign captures the FINY wardrobe in motion. Tailored silhouettes on city streets. Golden hour on structured forms. The quiet revolution continues.",
  quote: "This season, we asked: what if every garment felt inevitable?",
  attribution: "Elena Vasquez, Creative Director",
  images: [
    { src: IMG("photo-1509631179647-0177331693ae"), alt: "Urban tailoring", caption: "Mercer Street, dawn" },
    { src: IMG("photo-1539533018447-63fcce2678e3"), alt: "Cashmere detail", caption: "Double-faced cashmere" },
    { src: IMG("photo-1483985988355-763728e1935b"), alt: "Neutral palette", caption: "Soft power dressing" },
  ],
  cta: { label: "Shop SS26", href: "/shop?collection=ss26" },
};

export const LUXURY_SERVICES = {
  eyebrow: "Client Experience",
  title: "The FINY Standard",
  description: "Luxury extends beyond the garment — through every touchpoint of your experience with us.",
  services: [
    {
      icon: Sparkles,
      title: "Personal Styling",
      description: "Complimentary virtual or in-boutique sessions with our trained advisors.",
    },
    {
      icon: Gift,
      title: "Gift Concierge",
      description: "Signature packaging, handwritten notes, and curated gift edits for every occasion.",
    },
    {
      icon: Truck,
      title: "White-Glove Delivery",
      description: "Complimentary shipping over $250. Express and boutique pickup available.",
    },
    {
      icon: Scissors,
      title: "Alterations",
      description: "Expert tailoring at our New York and Milan flagships for the perfect fit.",
    },
    {
      icon: Users,
      title: "VIP Programme",
      description: "Early access, private appointments, and invitation-only events for loyal clients.",
    },
    {
      icon: Shield,
      title: "Craftsmanship Guarantee",
      description: "Two-year warranty on ready-to-wear. Lifetime hardware replacement on leather goods.",
    },
  ] satisfies { icon: LucideIcon; title: string; description: string }[],
};

export const CRAFTSMANSHIP = {
  eyebrow: "Craft",
  title: "Made to Last",
  lead: "We partner with ateliers where generations have perfected their trade — and we visit every workshop before a single piece reaches you.",
  pillars: [
    {
      title: "Italian Tailoring",
      body: "Double-faced cashmere coats and silk crepe blouses cut in workshops outside Milan, where pattern-making is still done by hand.",
      image: "photo-1539533018447-63fcce2678e3",
    },
    {
      title: "Florentine Leather",
      body: "Vegetable-tanned Vachetta from a family tannery established in 1872. Hand-stitched crossbodies that develop patina over decades.",
      image: "photo-1548036328-c9fa89d128fa",
    },
    {
      title: "Portuguese Footwear",
      body: "Blake-stitched suede loafers from artisans in Porto — resolable soles, cedar trees included, built for years of wear.",
      image: "photo-1614252235316-8c857d38b5f4",
    },
  ],
  quote: {
    text: "We do not design for seasons. We design for wardrobes.",
    attribution: "Marco Bellini, Head of Production",
  },
};

export const FABRIC_TECHNOLOGY = {
  eyebrow: "Materials",
  title: "Fabric & Fibre",
  description: "Every composition is chosen for hand-feel, longevity, and how it lives on the body.",
  fabrics: [
    {
      name: "Mongolian Cashmere",
      composition: "100% Grade A",
      weight: "520gsm double-faced",
      origin: "Mongolia → Italy",
      image: "photo-1591047139820-d91fecd50f1b",
      detail: "Sourced from the finest Mongolian goats, spun and woven in Biella.",
    },
    {
      name: "Belgian Linen",
      composition: "100% flax",
      weight: "185gsm washed",
      origin: "Flanders → Portugal",
      image: "photo-1596755094514-f87e34085b2c",
      detail: "Stone-washed for softness. Breathable, creases beautifully.",
    },
    {
      name: "Super 120s Wool",
      composition: "Merino wool",
      weight: "280gsm",
      origin: "England → Italy",
      image: "photo-1594938298603-c8148c4dae35",
      detail: "Pressed crease holds through a full day. Lined to the knee.",
    },
    {
      name: "Silk Crepe",
      composition: "19 momme",
      weight: "Fluid drape",
      origin: "China → France",
      image: "photo-1564257631407-4deb1f99d992",
      detail: "French seams throughout. Mother-of-pearl buttons.",
    },
  ],
};

export const EDITORS_PICKS_NOTE = {
  quote: "These are the pieces I reach for when building a wardrobe from zero — each one earns its place through craft, not trend.",
  author: "Luca Ferretti",
  role: "Head of Merchandising",
  tips: [
    { title: "Layer with intention", body: "Start with the cashmere overcoat — everything else follows its proportion." },
    { title: "Invest in leather", body: "A crossbody that patinas with you outlasts three seasonal bags." },
    { title: "Neutral first", body: "Charcoal, camel, and ivory harmonise with everything you already own." },
  ],
};

export const INSTAGRAM_FEED = [
  { id: "1", image: "photo-1469334031218-e382a71b716b", handle: "@finyfashions" },
  { id: "2", image: "photo-1483985988355-763728e1935b", handle: "@finyfashions" },
  { id: "3", image: "photo-1509631179647-0177331693ae", handle: "@finyfashions" },
  { id: "4", image: "photo-1490481651871-ab68de25d43d", handle: "@finyfashions" },
  { id: "5", image: "photo-1515886657613-9f3515b0c78f", handle: "@finyfashions" },
  { id: "6", image: "photo-1539533018447-63fcce2678e3", handle: "@finyfashions" },
  { id: "7", image: "photo-1548036328-c9fa89d128fa", handle: "@finyfashions" },
  { id: "8", image: "photo-1558618666-fcd25c85f82e", handle: "@finyfashions" },
] as const;

export const SHOP_EDITORIAL = {
  seasonBanner: {
    eyebrow: "Spring / Summer 2026",
    title: "The Season of Lightness",
    body: "Breathable linens, fluid silks, and structured cashmere — an edit for longer days and quieter confidence.",
    image: "photo-1509631179647-0177331693ae",
    href: "/shop?collection=ss26",
  },
  shoppingBenefits: [
    { icon: Truck, title: "Complimentary Shipping", description: "On orders over $250 worldwide" },
    { icon: Package, title: "Signature Packaging", description: "Recycled tissue, branded boxes, dust bags" },
    { icon: Gift, title: "Gift Services", description: "Wrapping, notes, and curated gift edits" },
    { icon: Globe, title: "Global Boutiques", description: "4 locations · Personal styling available" },
  ] satisfies { icon: LucideIcon; title: string; description: string }[],
  styleAdvice: {
    title: "How to Shop FINY",
    items: [
      { heading: "Build foundations first", body: "Essentials — silk blouse, wool trousers, leather crossbody — before seasonal pieces." },
      { heading: "Consider proportion", body: "Our relaxed tailoring pairs with both structured and fluid silhouettes. Refer to the size guide." },
      { heading: "Think in palettes", body: "Charcoal, camel, ivory, and stone are designed to harmonise across collections." },
    ],
  },
  fabricGuide: {
    title: "Understanding Our Materials",
    fabrics: FABRIC_TECHNOLOGY.fabrics.slice(0, 3),
  },
  featuredLooks: [
    { title: "City Morning", image: "photo-1509631179647-0177331693ae", pieces: "Overcoat · Trousers · Loafers" },
    { title: "Evening Ease", image: "photo-1515886657613-9f3515b0c78f", pieces: "Silk Blouse · Trousers · Crossbody" },
    { title: "Weekend Linen", image: "photo-1596755094514-f87e34085b2c", pieces: "Camp Collar · Loafers · Vessel" },
  ],
};

export const SUSTAINABILITY_HIGHLIGHTS = {
  eyebrow: "Responsibility",
  title: "Designed with Tomorrow in Mind",
  items: [
    { icon: Leaf, title: "Limited Production", description: "Small batches minimise waste. We produce only what we believe will be worn for years." },
    { icon: Package, title: "Recyclable Packaging", description: "100% recyclable boxes, tissue, and dust bags. Plastic-free since 2024." },
    { icon: Gem, title: "Artisan Partnerships", description: "Long-term relationships with European ateliers — fair wages, safe conditions." },
  ] satisfies { icon: LucideIcon; title: string; description: string }[],
};

export const PRODUCT_EDITORIAL_DEFAULTS = {
  craftsmanship: "Each FINY piece passes through multiple quality checkpoints — from raw material inspection to final pressing. Our production partners in Italy, Portugal, and France share our refusal to compromise on stitch count, fibre grade, or finishing detail.",
  designerNote: "Designed in our SoHo studio with a single question: will you reach for this in five years? If the answer is yes, it earns a place in the collection.",
  stylingAdvice: "Pair with neutral foundations from our Essentials edit. Let texture and proportion do the work — avoid competing statement pieces.",
  packaging: "Arrives in signature FINY packaging: recycled tissue, rigid branded box, and dust bags for leather and footwear. Gift wrapping available at checkout.",
};

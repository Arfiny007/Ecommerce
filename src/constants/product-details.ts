import type { Product, ProductDetailContent } from "@/types/product";

const CATEGORY_DEFAULTS: Record<string, ProductDetailContent> = {
  "ready-to-wear": {
    materials:
      "Premium natural fibres sourced from European mills. Reinforced stitching at stress points. Lined where noted. Hardware in brushed nickel or horn.",
    dimensions:
      "Model is 178cm / 5'10\" and wears size M. Refer to our size guide for detailed measurements across all ready-to-wear.",
    care: "Dry clean only for structured pieces. Store on padded hangers away from direct sunlight. Steam to refresh between wears. Fold knitwear flat.",
    shipping:
      "Complimentary standard shipping on orders over $250. Express delivery available at checkout. Dispatched within 1–2 business days from our New York fulfilment centre.",
    returns:
      "Returns accepted within 30 days of delivery. Items must be unworn with original tags attached. Visit our returns page for full details.",
    warranty:
      "Two-year craftsmanship guarantee covering manufacturing defects. Does not include normal wear or improper care.",
  },
  accessories: {
    materials:
      "Vegetable-tanned leather from Tuscan tanneries or Italian suede. Solid brass hardware with anti-tarnish coating. Cotton-lined interior.",
    dimensions:
      "Dimensions listed per variant. Strap drop adjustable where applicable. Interior compartments designed for daily essentials.",
    care: "Condition leather quarterly with an approved natural balm. Avoid prolonged exposure to moisture, heat, and direct sunlight. Store in the provided dust bag.",
    shipping:
      "Complimentary standard shipping on orders over $250. Signature required on delivery for items over $500.",
    returns:
      "Returns accepted within 30 days. Item must be unused with protective film intact and dust bag included.",
    warranty:
      "Lifetime hardware replacement on manufacturing defects. Leather patina and natural ageing are not covered — they are features.",
  },
  footwear: {
    materials:
      "Hand-lasted upper in premium suede or calf leather. Leather sole with cushioned insole. Blake-stitched construction for resolability.",
    dimensions: "True to size with a standard width. Half sizes available. Refer to our size guide for EU/US conversion.",
    care: "Use cedar shoe trees after every wear. Brush suede gently with a soft brush. Apply waterproof spray before first outdoor wear. Store in dust bags.",
    shipping:
      "Shipped in signature FINY shoe box with dust bags and tissue. Complimentary shipping on orders over $250.",
    returns:
      "Unworn footwear only — tested indoors on a clean surface. Original box and packaging required for return.",
    warranty: "One-year sole and stitching guarantee. Resoling available through our client services team.",
  },
  fragrance: {
    materials:
      "Eau de parfum concentration (15–20%). Alcohol base with natural and synthetic aroma molecules. Cruelty-free, paraben-free formulation.",
    dimensions: "50ml and 100ml atomiser bottles. Weight: 180g / 280g respectively. Refill programme available at select boutiques.",
    care: "Store upright in a cool, dark place away from windows. Avoid bathroom humidity. Cap tightly after use to preserve the composition.",
    shipping:
      "Fragrance ships via ground transport only within the US. Cannot be expedited internationally due to regulations.",
    returns:
      "Unopened and cellophane-sealed bottles only. Returns within 14 days of delivery.",
    warranty: "Satisfaction guarantee on first purchase — contact client services within 30 days if the composition does not resonate.",
  },
  home: {
    materials:
      "Hand-finished stoneware or blown glass from European artisans. Lead-free glazes. Natural variations in colour and texture celebrate the craft process.",
    dimensions: "Dimensions vary by piece and are listed per product. Weight included for shipping calculation.",
    care: "Wipe with a soft, dry cloth. Not dishwasher safe unless explicitly stated. Avoid sudden temperature changes.",
    shipping:
      "Fragile items packed with custom moulded inserts and double-boxed. Complimentary shipping on orders over $250.",
    returns: "Returns within 30 days if undamaged. Original packaging required — we cannot accept returns of broken pieces without photo documentation.",
    warranty: "One-year guarantee against structural defects. Hairline variations in glaze are characteristic, not defects.",
  },
};

const SLUG_OVERRIDES: Partial<Record<string, Partial<ProductDetailContent>>> = {
  "cashmere-overcoat": {
    materials:
      "100% double-faced Mongolian cashmere, 520gsm. Horn buttons sourced from sustainable farms. Fully lined in Bemberg cupro.",
    dimensions: "Length: 115cm from shoulder. Relaxed fit through body and sleeve. Model wears size M.",
    care: "Dry clean only. Store folded in a breathable garment bag during off-season. Cedar blocks recommended.",
  },
  "silk-crepe-blouse": {
    materials: "100% silk crepe de chine, 19 momme. Mother-of-pearl buttons. French seams throughout.",
    care: "Dry clean or hand wash cold. Hang to dry. Steam — never iron directly on silk.",
  },
  "leather-crossbody": {
    materials:
      "Vegetable-tanned Vachetta leather from a family tannery in Tuscany, est. 1872. Brushed gold hardware. Cotton-lined interior with two compartments.",
    dimensions: "H: 18cm × W: 22cm × D: 8cm. Adjustable strap drop: 50–58cm.",
  },
  "wool-trousers": {
    materials: "Super 120s merino wool from an English mill. Side adjusters in brushed nickel. Lined to the knee.",
    dimensions: "High-rise fit. Inseam: 32\". Model wears size 32.",
    care: "Dry clean. Hang on a trouser hanger with crease clips to maintain the pressed line.",
  },
  "suede-loafers": {
    materials: "Premium calf suede upper. Leather sole with rubber inset at heel. Cushioned leather insole.",
    care: "Brush with a suede brush after each wear. Use cedar shoe trees. Waterproof spray before first wear.",
  },
  "eau-de-parfum": {
    materials:
      "Bergamot from Calabria, iris absolute, white musk. 18% concentration. Alcohol from French beetroot.",
    dimensions: "50ml: 8.5cm height. 100ml: 11cm height. Both in weighted glass with magnetic cap.",
    care: "Store at 15–20°C. Avoid bathroom storage. Best used within 24 months of opening.",
  },
  "linen-shirt": {
    materials: "100% Belgian linen, stone-washed for softness. Corozo nut buttons. Single-needle construction.",
    care: "Machine wash cold, gentle cycle. Hang to dry. Steam to remove wrinkles — embrace natural creasing.",
  },
  "ceramic-vessel": {
    materials: "Hand-thrown stoneware. Matte reactive glaze. Each piece is unique — slight variations in form are intentional.",
    dimensions: "H: 24cm × W: 14cm. Weight: 680g.",
    care: "Not suitable for liquids. Dust with a soft cloth. Display away from direct sunlight to preserve glaze.",
  },
};

export function getProductDetails(product: Product): ProductDetailContent {
  const base = CATEGORY_DEFAULTS[product.category] ?? CATEGORY_DEFAULTS["ready-to-wear"];
  const override = SLUG_OVERRIDES[product.slug] ?? {};
  return { ...base, ...override };
}

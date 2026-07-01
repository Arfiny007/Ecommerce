import type { Product, ProductDetailContent } from "@/types/product";

const CATEGORY_DEFAULTS: Record<string, ProductDetailContent> = {
  "ready-to-wear": {
    materials:
      "Premium natural fibres with reinforced stitching at stress points. Lined where noted. Hardware in brushed nickel or horn.",
    dimensions:
      "Model is 178cm / 5'10\" and wears size M. Refer to our size guide for detailed measurements.",
    care: "Dry clean only. Store on padded hangers away from direct sunlight. Steam to refresh between wears.",
    shipping:
      "Complimentary standard shipping on orders over $250. Express delivery available at checkout. Dispatched within 1–2 business days.",
    returns:
      "Returns accepted within 30 days of delivery. Items must be unworn with original tags attached.",
    warranty:
      "Two-year craftsmanship guarantee covering manufacturing defects. Does not include normal wear.",
  },
  accessories: {
    materials:
      "Vegetable-tanned leather or Italian suede. Solid brass hardware with anti-tarnish coating. Cotton-lined interior.",
    dimensions:
      "Dimensions listed per variant. Strap drop adjustable where applicable.",
    care: "Condition leather quarterly with approved balm. Avoid prolonged exposure to moisture and heat.",
    shipping:
      "Complimentary standard shipping on orders over $250. Signature required on delivery.",
    returns:
      "Returns accepted within 30 days. Item must be unused with protective film intact.",
    warranty:
      "Lifetime hardware replacement on manufacturing defects. Leather patina is not covered.",
  },
  footwear: {
    materials:
      "Hand-lasted upper in premium suede or calf leather. Leather sole with cushioned insole. Blake-stitched construction.",
    dimensions: "True to size. Half sizes available. Width: standard.",
    care: "Use cedar shoe trees. Brush suede gently. Waterproof spray recommended before first wear.",
    shipping:
      "Shipped in signature FINY shoe box with dust bags. Complimentary shipping over $250.",
    returns:
      "Unworn footwear only. Original box and packaging required for return.",
    warranty: "One-year sole and stitching guarantee.",
  },
  fragrance: {
    materials:
      "Eau de parfum concentration. Alcohol base with natural and synthetic aroma molecules. Cruelty-free formulation.",
    dimensions: "50ml and 100ml atomiser bottles. Weight: 180g / 280g respectively.",
    care: "Store upright in a cool, dark place. Avoid direct sunlight to preserve the composition.",
    shipping:
      "Fragrance ships via ground only. Cannot be expedited internationally.",
    returns:
      "Unopened and cellophane-sealed bottles only. Returns within 14 days.",
    warranty: "Satisfaction guarantee on first purchase — contact support within 30 days.",
  },
  home: {
    materials:
      "Hand-finished stoneware or blown glass. Lead-free glazes. Natural variations celebrate the artisan process.",
    dimensions: "Dimensions vary by piece. Listed per product where applicable.",
    care: "Wipe with a soft, dry cloth. Not dishwasher safe unless stated.",
    shipping:
      "Fragile items packed with moulded inserts. Complimentary shipping over $250.",
    returns: "Returns within 30 days if undamaged. Original packaging required.",
    warranty: "One-year guarantee against structural defects.",
  },
};

const SLUG_OVERRIDES: Partial<Record<string, Partial<ProductDetailContent>>> = {
  "cashmere-overcoat": {
    materials:
      "100% double-faced Mongolian cashmere. Horn buttons. Fully lined in Bemberg cupro.",
    dimensions: "Length: 115cm from shoulder. Relaxed fit through body and sleeve.",
  },
  "silk-crepe-blouse": {
    materials: "100% silk crepe de chine. Mother-of-pearl buttons. French seams throughout.",
  },
};

export function getProductDetails(product: Product): ProductDetailContent {
  const base = CATEGORY_DEFAULTS[product.category] ?? CATEGORY_DEFAULTS["ready-to-wear"];
  const override = SLUG_OVERRIDES[product.slug] ?? {};
  return { ...base, ...override };
}

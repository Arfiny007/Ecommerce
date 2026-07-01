export const EMPTY_STATE_COPY = {
  search: {
    title: "No pieces found",
    body: "We couldn't find anything matching your search. Try different keywords or explore our collections.",
    suggestions: ["Cashmere", "Silk", "Leather", "SS26"],
  },
  shop: {
    title: "No pieces match your selection",
    bodyFiltered: "Refine your filters or explore our full collection — there is always something waiting to be discovered.",
    bodyDefault: "Our atelier is preparing new arrivals. Subscribe to our newsletter for first access.",
  },
  cart: {
    title: "Your bag is empty",
    body: "Discover pieces crafted for everyday luxury — from cashmere to leather, each designed with intention.",
  },
  wishlist: {
    title: "Your wishlist awaits",
    body: "Save pieces you love and return when the moment is right. Your curated edit starts here.",
  },
  journal: {
    title: "No articles found",
    body: "Explore our full journal for essays on craft, materials, and the art of dressing.",
  },
} as const;

export const MAINTENANCE_PAGE = {
  eyebrow: "Maintenance",
  title: "We'll Be Right Back",
  lead: "We're making a few refinements to serve you better. The FINY experience will return shortly.",
  body: "Thank you for your patience. For urgent inquiries, reach us at support@finyfashions.com.",
};

export const NOT_FOUND_PAGE = {
  eyebrow: "404",
  title: "This Page Has Moved On",
  lead: "The page you're looking for doesn't exist — or perhaps it never did. Like a limited edition, some things are simply gone.",
  cta: "Return Home",
  secondaryCta: "Explore the Shop",
};

export * from "./catalog";
export * from "./policies";
export * from "./support";
export * from "./company";
export * from "./journal";
export * from "./lookbook";

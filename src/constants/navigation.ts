export const FOOTER_SECTION_LABELS = {
  shop: "Shop",
  company: "Company",
  customerCare: "Customer Care",
} as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  featured?: boolean;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      {
        label: "New Arrivals",
        href: "/shop?sort=newest",
        description: "Latest editorial drops",
        featured: true,
      },
      {
        label: "Ready-to-Wear",
        href: "/shop?category=ready-to-wear",
        description: "Tailored silhouettes",
      },
      {
        label: "Accessories",
        href: "/shop?category=accessories",
        description: "Finishing touches",
      },
      {
        label: "Footwear",
        href: "/shop?category=footwear",
        description: "Crafted for movement",
      },
      {
        label: "Fragrance",
        href: "/shop?category=fragrance",
        description: "Olfactory artistry",
      },
      {
        label: "Home",
        href: "/shop?category=home",
        description: "Objects of desire",
      },
    ],
  },
  {
    label: "Collections",
    href: "/shop",
    children: [
      {
        label: "Spring / Summer",
        href: "/shop?collection=ss26",
        description: "Lightness & form",
        featured: true,
      },
      {
        label: "Essentials",
        href: "/shop?collection=essentials",
        description: "Wardrobe foundations",
      },
      {
        label: "Limited Edition",
        href: "/shop?collection=limited",
        description: "Exclusive releases",
      },
    ],
  },
  {
    label: "Lookbook",
    href: "/lookbook",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const FOOTER_NAV = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "Gift Guide", href: "/shop?collection=gifts" },
    { label: "Lookbook", href: "/lookbook" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Store Locations", href: "/stores" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  customerCare: [
    { label: "Client Services", href: "/support" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;

export const FOOTER_LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
] as const;

export const LEGAL_LINKS = FOOTER_LEGAL;

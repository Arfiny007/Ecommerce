import { supportEmail } from "@/constants/branding";

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
    label: "Editorial",
    href: "/#editorial",
  },
  {
    label: "About",
    href: "/#story",
  },
];

export const FOOTER_NAV = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "Gift Guide", href: "/shop?collection=gifts" },
  ],
  company: [
    { label: "Our Story", href: "/#story" },
    { label: "Sustainability", href: "/#story" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  customerCare: [
    { label: "My Account", href: "/profile" },
    { label: "Contact", href: `mailto:${supportEmail}` },
    { label: "Shipping", href: "#" },
    { label: "Returns & Exchanges", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "FAQ", href: "#" },
  ],
} as const;

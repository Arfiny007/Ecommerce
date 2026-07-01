import { brandName, contactEmail, supportEmail } from "@/constants/branding";

export const ABOUT_PAGE = {
  eyebrow: "About",
  title: "Our Story",
  lead: `${brandName} was founded on a simple conviction: luxury belongs in everyday life.`,
  sections: [
    {
      title: "The Vision",
      body: "In 2018, we set out to create a wardrobe for those who move through the world with intention. Not costume, not uniform — but pieces that feel inevitable. Premium streetwear sensibility meets editorial refinement, designed for a minimalist lifestyle that values craft over noise.",
    },
    {
      title: "Material Integrity",
      body: "Every fibre is considered. Mongolian cashmere, Belgian linen, vegetable-tanned leather from Tuscan tanneries. We partner with ateliers in Italy, Portugal, and France — workshops where generations of artisans have perfected their trade. We visit every supplier. We wear every sample.",
    },
    {
      title: "Editorial Identity",
      body: "FINY is as much a magazine as it is a brand. Our seasonal lookbooks, journal essays, and campaign imagery are created in-house by a team of photographers, stylists, and writers who share our belief that fashion is a form of storytelling.",
    },
    {
      title: "Sustainability",
      body: "We produce in limited quantities to minimise waste. Our packaging is 100% recyclable, and we are working toward carbon-neutral shipping by 2028. We believe the most sustainable garment is one you wear for decades — which is why we build pieces to last.",
    },
  ],
  values: [
    {
      title: "Craft",
      description: "Every seam, every stitch, every button chosen with purpose.",
    },
    {
      title: "Restraint",
      description: "Luxury is not loud. It lives in proportion and the confidence of less.",
    },
    {
      title: "Longevity",
      description: "Pieces designed to age with grace, not follow seasons.",
    },
    {
      title: "Intention",
      description: "A wardrobe for those who dress with purpose, not performance.",
    },
  ],
};

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  title: "Get in Touch",
  lead: "Whether you have a question about an order, need styling advice, or want to explore a collaboration — we would love to hear from you.",
  departments: [
    {
      title: "Client Services",
      email: supportEmail,
      description: "Orders, returns, shipping, and account inquiries.",
    },
    {
      title: "Press & Partnerships",
      email: "press@finyfashions.com",
      description: "Media requests, collaborations, and wholesale inquiries.",
    },
    {
      title: "Careers",
      email: "careers@finyfashions.com",
      description: "Join our team in New York, London, or Milan.",
    },
    {
      title: "General",
      email: contactEmail,
      description: "Everything else — we read every message.",
    },
  ],
};

export interface StoreLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  image: string;
}

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "nyc-flagship",
    city: "New York",
    name: "Mercer Street Flagship",
    address: "123 Mercer Street, New York, NY 10012",
    phone: "+1 (212) 555-0142",
    hours: "Mon – Sat, 11 AM – 7 PM · Sun, 12 PM – 6 PM",
    services: ["Personal Styling", "Alterations", "Boutique Pickup", "Private Appointments"],
    image: "photo-1441986300917-64674bd600d8",
  },
  {
    id: "london",
    city: "London",
    name: "Mayfair Boutique",
    address: "42 Brook Street, London W1K 5DB, United Kingdom",
    phone: "+44 20 7946 0958",
    hours: "Mon – Sat, 10 AM – 6 PM · Closed Sunday",
    services: ["Personal Styling", "Boutique Pickup", "Private Appointments"],
    image: "photo-1528697203043-7333fc8c1660",
  },
  {
    id: "milan",
    city: "Milan",
    name: "Brera Atelier",
    address: "Via della Spiga 26, 20121 Milano, Italy",
    phone: "+39 02 5555 0142",
    hours: "Tue – Sat, 11 AM – 7 PM · Mon by appointment",
    services: ["Personal Styling", "Alterations", "Private Appointments"],
    image: "photo-1555529669-e93e1a7a36d7",
  },
  {
    id: "la",
    city: "Los Angeles",
    name: "Melrose Place",
    address: "8522 Melrose Place, West Hollywood, CA 90069",
    phone: "+1 (323) 555-0198",
    hours: "Wed – Sun, 11 AM – 6 PM · Mon – Tue closed",
    services: ["Personal Styling", "Boutique Pickup", "Private Appointments"],
    image: "photo-1497366216548-37526070297c",
  },
];

export const STORES_PAGE = {
  eyebrow: "Boutiques",
  title: "Store Locations",
  lead: "Visit us in person for fittings, styling sessions, and the full FINY experience.",
};

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "senior-designer",
    title: "Senior Ready-to-Wear Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Lead seasonal collection development from concept to production. Collaborate with our ateliers in Italy and Portugal to bring editorial vision to life.",
  },
  {
    id: "ecommerce-manager",
    title: "E-Commerce Manager",
    department: "Digital",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Own the digital storefront experience — merchandising, analytics, and conversion optimisation for a luxury fashion audience.",
  },
  {
    id: "client-advisor-london",
    title: "Senior Client Advisor",
    department: "Retail",
    location: "London, UK",
    type: "Full-time",
    description:
      "Deliver exceptional client experiences at our Mayfair boutique. Build lasting relationships through personalised styling and product expertise.",
  },
  {
    id: "content-producer",
    title: "Content Producer",
    department: "Creative",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Produce seasonal lookbooks, campaign imagery, and journal content. Coordinate photographers, stylists, and models across locations.",
  },
  {
    id: "supply-chain",
    title: "Supply Chain Coordinator",
    department: "Operations",
    location: "Milan, Italy",
    type: "Full-time",
    description:
      "Manage relationships with European ateliers and tanneries. Ensure quality standards and on-time delivery for seasonal collections.",
  },
];

export const CAREERS_PAGE = {
  eyebrow: "Careers",
  title: "Join FINY",
  lead: "We are a small, passionate team building a luxury brand for the modern wardrobe. If you share our belief in craft, restraint, and intention — we want to meet you.",
  benefits: [
    "Competitive compensation and equity",
    "Employee discount on all collections",
    "Health, dental, and vision coverage",
    "Flexible work arrangements",
    "Annual team retreats in inspiring locations",
    "Professional development budget",
  ],
  culture:
    "We work hard and care deeply. Our studio in SoHo is open, light-filled, and filled with fabric swatches, coffee, and the occasional editorial shoot. We value diverse perspectives and believe the best ideas come from collaboration.",
};

export const PRESS_PAGE = {
  eyebrow: "Press",
  title: "Press & Media",
  lead: "Download assets, read recent coverage, and connect with our communications team.",
  contact: "press@finyfashions.com",
  coverage: [
    {
      outlet: "Vogue",
      title: "The Quiet Revolution: How FINY FASHIONS Is Redefining Everyday Luxury",
      date: "March 2026",
      href: "#",
    },
    {
      outlet: "The New York Times",
      title: "A SoHo Brand Making the Case for Fewer, Better Clothes",
      date: "January 2026",
      href: "#",
    },
    {
      outlet: "Monocle",
      title: "Retail Spotlight: Mercer Street Flagship",
      date: "November 2025",
      href: "#",
    },
    {
      outlet: "Business of Fashion",
      title: "FINY FASHIONS Raises Series A to Expand European Atelier Network",
      date: "September 2025",
      href: "#",
    },
  ],
  assets: [
    { label: "Brand Guidelines", description: "Logo usage, colour palette, typography" },
    { label: "SS26 Press Kit", description: "Campaign imagery, lookbook selects, product shots" },
    { label: "Founder Biography", description: "Company history and leadership profiles" },
    { label: "Fact Sheet", description: "Key statistics, milestones, and contact information" },
  ],
};

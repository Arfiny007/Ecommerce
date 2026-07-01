import { supportEmail, contactEmail } from "@/constants/branding";

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: "Orders",
    question: "How do I track my order?",
    answer:
      "Once your order ships, you will receive a confirmation email with a tracking number and link. You can also view order status in your account under Profile.",
  },
  {
    category: "Orders",
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or cancelled within one hour of placement. Contact our client advisors at support@finyfashions.com immediately. After this window, orders enter processing and cannot be changed.",
  },
  {
    category: "Orders",
    question: "Do you offer gift wrapping?",
    answer:
      "Yes. Select gift wrapping at checkout for $25. Your order will arrive in signature FINY packaging with a handwritten note card if requested.",
  },
  {
    category: "Shipping",
    question: "How long does delivery take?",
    answer:
      "Standard shipping takes 5–7 business days within the US. Express delivery (2–3 days) and overnight options are available at checkout. International delivery typically takes 5–10 business days.",
  },
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "We ship to over 40 countries via DHL Express. Import duties may apply depending on your destination and are calculated at checkout where possible.",
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "Ready-to-wear, accessories, and home items may be returned within 30 days if unworn with tags attached. Footwear must be unworn in original packaging. Fragrance returns are accepted within 14 days if sealed.",
  },
  {
    category: "Returns",
    question: "How do I initiate a return?",
    answer:
      "Visit your Profile to start a return, or email our client advisors. We provide a prepaid return label for domestic orders.",
  },
  {
    category: "Products",
    question: "How do I find my size?",
    answer:
      "Each product page includes fit notes and a link to our Size Guide. When in doubt, our client advisors are happy to assist with sizing recommendations.",
  },
  {
    category: "Products",
    question: "Are FINY pieces true to size?",
    answer:
      "Most ready-to-wear runs true to size with a relaxed, modern fit. Footwear is true to size. Specific fit notes are listed on each product page.",
  },
  {
    category: "Products",
    question: "How should I care for my FINY pieces?",
    answer:
      "Care instructions are included on every product page and on garment labels. As a general guide: dry clean structured pieces, condition leather quarterly, and store cashmere folded with cedar.",
  },
  {
    category: "Account",
    question: "Do I need an account to order?",
    answer:
      "No. Guest checkout is available. Creating an account lets you track orders, save preferences, and access your wishlist across devices.",
  },
  {
    category: "Account",
    question: "How do I update my newsletter preferences?",
    answer:
      "Use the unsubscribe link in any FINY email, or contact us at hello@finyfashions.com to update your preferences.",
  },
];

export const FAQ_PAGE = {
  eyebrow: "Customer Care",
  title: "Frequently Asked Questions",
  lead: "Answers to common questions about ordering, shipping, returns, and our collections.",
};

export const SUPPORT_PAGE = {
  eyebrow: "Customer Care",
  title: "Client Services",
  lead: "Our client advisors are here to assist with orders, styling, sizing, and anything else you need.",
  channels: [
    {
      title: "Email",
      description: "For order inquiries, returns, and general questions.",
      contact: supportEmail,
      href: `mailto:${supportEmail}`,
      hours: "Response within 24 hours",
    },
    {
      title: "Personal Styling",
      description: "Book a complimentary virtual styling session with our team.",
      contact: contactEmail,
      href: `mailto:${contactEmail}?subject=Styling%20Appointment`,
      hours: "Monday – Friday, 10 AM – 6 PM EST",
    },
    {
      title: "Flagship Boutique",
      description: "Visit us in person for fittings, alterations, and private appointments.",
      contact: "123 Mercer Street, New York, NY 10012",
      href: "/stores",
      hours: "Monday – Saturday, 11 AM – 7 PM",
    },
  ],
};

export const SIZE_GUIDE = {
  eyebrow: "Customer Care",
  title: "Size Guide",
  lead: "Measurements are in inches. When between sizes, we recommend sizing up for a relaxed fit.",
  tables: [
    {
      title: "Ready-to-Wear",
      headers: ["Size", "Chest", "Waist", "Hips", "Sleeve"],
      rows: [
        ["XS", "32–34", "26–28", "34–36", "32"],
        ["S", "34–36", "28–30", "36–38", "33"],
        ["M", "36–38", "30–32", "38–40", "34"],
        ["L", "38–40", "32–34", "40–42", "35"],
        ["XL", "40–42", "34–36", "42–44", "36"],
      ],
    },
    {
      title: "Trousers",
      headers: ["Size", "Waist", "Hip", "Inseam"],
      rows: [
        ["28", "28", "36", "32"],
        ["30", "30", "38", "32"],
        ["32", "32", "40", "32"],
        ["34", "34", "42", "32"],
        ["36", "36", "44", "32"],
      ],
    },
    {
      title: "Footwear",
      headers: ["EU", "US Men", "US Women", "UK"],
      rows: [
        ["39", "6", "8", "5.5"],
        ["40", "7", "9", "6.5"],
        ["41", "8", "10", "7.5"],
        ["42", "9", "11", "8.5"],
        ["43", "10", "12", "9.5"],
      ],
    },
  ],
  notes: [
    "Model measurements are listed on each product page.",
    "For personalised sizing advice, contact our client advisors.",
    "Alterations are available at our New York flagship for a nominal fee.",
  ],
};

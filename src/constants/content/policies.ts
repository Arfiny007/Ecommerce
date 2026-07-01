import { brandName, contactEmail, supportEmail } from "@/constants/branding";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/site";

export const SHIPPING_POLICY = {
  eyebrow: "Customer Care",
  title: "Shipping & Delivery",
  lead: "We deliver worldwide with the same care we bring to every FINY piece — thoughtfully packed, tracked, and insured.",
  sections: [
    {
      title: "Complimentary Standard Shipping",
      body: `Orders over $${FREE_SHIPPING_THRESHOLD} qualify for complimentary standard shipping within the contiguous United States. Orders below this threshold are charged a flat rate of $15 at checkout.`,
    },
    {
      title: "Express & Overnight",
      body: "Express delivery (2–3 business days) is available for $35. Overnight shipping is offered to select metropolitan areas for $55. Cut-off for same-day dispatch is 2:00 PM EST, Monday through Friday.",
    },
    {
      title: "International Delivery",
      body: "We ship to over 40 countries via DHL Express. Delivery times vary by destination — typically 5–10 business days. Import duties and taxes are calculated at checkout where possible; otherwise, they are the responsibility of the recipient.",
    },
    {
      title: "Order Processing",
      body: "Orders are processed within 1–2 business days. You will receive a confirmation email with tracking information once your parcel has been dispatched. Fragrance and limited-edition items may require additional processing time.",
    },
    {
      title: "Boutique Pickup",
      body: "Select boutique pickup at checkout to collect your order from our New York flagship. You will receive a notification when your pieces are ready — typically within 24 hours of order confirmation.",
    },
    {
      title: "Packaging",
      body: "Every FINY order arrives in signature packaging — recycled tissue, branded boxes, and dust bags for footwear and leather goods. Gift wrapping is available at checkout for $25.",
    },
  ],
};

export const RETURNS_POLICY = {
  eyebrow: "Customer Care",
  title: "Returns & Exchanges",
  lead: "We want you to love every FINY piece. If something isn't right, we make returns straightforward and respectful of your time.",
  sections: [
    {
      title: "30-Day Return Window",
      body: "Ready-to-wear, accessories, and home items may be returned within 30 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached.",
    },
    {
      title: "Footwear Returns",
      body: "Footwear must be unworn and returned in the original box with dust bags. We cannot accept returns on shoes that show signs of outdoor wear.",
    },
    {
      title: "Fragrance Returns",
      body: "Fragrance may only be returned if the cellophane seal is intact and the bottle has not been opened. Returns must be initiated within 14 days of delivery.",
    },
    {
      title: "How to Return",
      body: `Initiate a return through your account at finyfashions.com/profile or contact our client advisors at ${supportEmail}. We will provide a prepaid return label for domestic orders. International returns are the customer's responsibility unless the item is defective.`,
    },
    {
      title: "Exchanges",
      body: "To exchange for a different size or colour, initiate a return and place a new order. This ensures the fastest fulfilment of your preferred piece.",
    },
    {
      title: "Refunds",
      body: "Refunds are processed within 5–7 business days of receiving your return. The refund will be issued to your original payment method. Shipping costs are non-refundable unless the return is due to our error.",
    },
    {
      title: "Final Sale",
      body: "Limited-edition pieces marked as final sale cannot be returned or exchanged. This will be clearly indicated on the product page at time of purchase.",
    },
  ],
};

export const PRIVACY_POLICY = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  lead: `Your privacy matters to ${brandName}. This policy explains how we collect, use, and protect your personal information.`,
  lastUpdated: "July 1, 2026",
  sections: [
    {
      title: "Information We Collect",
      body: "We collect information you provide directly — name, email address, shipping address, payment details, and order history. We also collect browsing data through cookies and analytics tools to improve your experience.",
    },
    {
      title: "How We Use Your Information",
      body: "Your information is used to process orders, communicate about your purchases, send marketing communications (with your consent), improve our website and services, and comply with legal obligations.",
    },
    {
      title: "Information Sharing",
      body: "We do not sell your personal information. We share data with trusted service providers — payment processors, shipping carriers, and email platforms — solely to fulfil your orders and communications. All partners are bound by confidentiality agreements.",
    },
    {
      title: "Cookies & Tracking",
      body: "We use essential cookies for site functionality and optional analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through our cookie banner or your browser settings. See our Cookie Policy for details.",
    },
    {
      title: "Data Security",
      body: "We implement industry-standard security measures including SSL encryption, secure payment processing via PCI-compliant providers, and restricted access to personal data.",
    },
    {
      title: "Your Rights",
      body: "Depending on your location, you may have the right to access, correct, delete, or port your personal data. You may also opt out of marketing communications at any time. Contact us at the address below to exercise these rights.",
    },
    {
      title: "Children's Privacy",
      body: "Our services are not directed to individuals under 16. We do not knowingly collect personal information from children.",
    },
    {
      title: "Contact",
      body: `For privacy-related inquiries, contact our Data Protection Officer at ${contactEmail}.`,
    },
  ],
};

export const TERMS_OF_SERVICE = {
  eyebrow: "Legal",
  title: "Terms of Service",
  lead: `These terms govern your use of the ${brandName} website and services. By placing an order, you agree to these terms.`,
  lastUpdated: "July 1, 2026",
  sections: [
    {
      title: "Use of Website",
      body: "You may use our website for lawful purposes only. You agree not to misuse the site, attempt unauthorised access, or interfere with its operation.",
    },
    {
      title: "Products & Pricing",
      body: "We strive for accuracy in product descriptions, images, and pricing. We reserve the right to correct errors and to limit quantities. Prices are listed in USD and are subject to change without notice.",
    },
    {
      title: "Orders & Payment",
      body: "Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel orders at our discretion. Payment is processed securely at checkout. You represent that your payment information is accurate and authorised.",
    },
    {
      title: "Intellectual Property",
      body: `All content on this website — including text, images, logos, and designs — is the property of ${brandName} or its licensors and is protected by copyright and trademark law. Unauthorised use is prohibited.`,
    },
    {
      title: "Limitation of Liability",
      body: `${brandName} is not liable for indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability is limited to the amount you paid for the relevant order.`,
    },
    {
      title: "Governing Law",
      body: "These terms are governed by the laws of the State of New York, without regard to conflict of law principles. Disputes shall be resolved in the courts of New York County.",
    },
    {
      title: "Changes",
      body: "We may update these terms from time to time. Continued use of the website after changes constitutes acceptance of the revised terms.",
    },
    {
      title: "Contact",
      body: `Questions about these terms may be directed to ${contactEmail}.`,
    },
  ],
};

export const COOKIE_POLICY = {
  eyebrow: "Legal",
  title: "Cookie Policy",
  lead: "This policy explains how FINY FASHIONS uses cookies and similar technologies on our website.",
  lastUpdated: "July 1, 2026",
  sections: [
    {
      title: "What Are Cookies",
      body: "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you interact with our content.",
    },
    {
      title: "Essential Cookies",
      body: "These cookies are necessary for the website to function — maintaining your cart, session state, and security. They cannot be disabled without affecting site functionality.",
    },
    {
      title: "Analytics Cookies",
      body: "We use analytics cookies to understand traffic patterns, popular products, and areas for improvement. This data is aggregated and anonymised where possible.",
    },
    {
      title: "Marketing Cookies",
      body: "With your consent, we may use marketing cookies to deliver relevant advertisements and measure campaign effectiveness across platforms.",
    },
    {
      title: "Managing Cookies",
      body: "You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling certain cookies may limit site functionality.",
    },
    {
      title: "Third-Party Cookies",
      body: "Some cookies are set by third-party services we use — payment processors, analytics providers, and social media platforms. These parties have their own privacy policies.",
    },
    {
      title: "Contact",
      body: `For questions about our use of cookies, contact ${contactEmail}.`,
    },
  ],
};

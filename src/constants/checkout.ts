import { address } from "@/constants/branding";

export const TAX_RATE = 0.08875;
export const GIFT_WRAP_PRICE = 25;
export const STANDARD_SHIPPING_COST = 15;
export const EXPRESS_SHIPPING_COST = 35;

export const VALID_PROMO_CODES: Record<string, number> = {
  FINY10: 0.1,
  WELCOME15: 0.15,
  LUXURY20: 0.2,
};

export const SHIPPING_METHODS = [
  {
    id: "standard",
    label: "Complimentary Standard",
    description: "5–7 business days",
    cost: 0,
    daysMin: 5,
    daysMax: 7,
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "2–3 business days",
    cost: EXPRESS_SHIPPING_COST,
    daysMin: 2,
    daysMax: 3,
  },
  {
    id: "overnight",
    label: "Overnight",
    description: "Next business day",
    cost: 55,
    daysMin: 1,
    daysMax: 1,
  },
] as const;

export type ShippingMethodId = (typeof SHIPPING_METHODS)[number]["id"];

export const PAYMENT_METHODS = [
  { id: "card", label: "Credit Card", icon: "card" },
  { id: "apple-pay", label: "Apple Pay", icon: "apple" },
  { id: "google-pay", label: "Google Pay", icon: "google" },
  { id: "paypal", label: "PayPal", icon: "paypal" },
  { id: "cod", label: "Cash on Delivery", icon: "cod" },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

export const CHECKOUT_STEPS = [
  { id: "shipping", label: "Shipping" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
] as const;

export type CheckoutStepId = (typeof CHECKOUT_STEPS)[number]["id"] | "success";

export const checkoutCopy = {
  cartTitle: "Your Bag",
  cartSubtitle: "Review your selections before checkout.",
  checkoutTitle: "Checkout",
  emptyCartTitle: "Your bag awaits",
  emptyCartDescription:
    "Discover our curated collection of luxury essentials crafted for the modern minimalist.",
  continueShopping: "Continue Shopping",
  proceedToCheckout: "Proceed to Checkout",
  viewFullCart: "View Full Bag",
  giftWrapLabel: "Complimentary gift wrapping",
  giftWrapDescription: "Elegant FINY packaging with handwritten note",
  couponPlaceholder: "Enter promo code",
  couponApplied: "Promo applied",
  couponInvalid: "Invalid promo code",
  shippingEstimate: "Estimated shipping",
  taxEstimate: "Estimated tax",
  freeShippingLabel: "Complimentary shipping unlocked",
  freeShippingProgress: "away from complimentary shipping",
  savedItemsTitle: "Saved for Later",
  recommendationsAccessories: "Recommended Accessories",
  recommendationsRecent: "Recently Viewed",
  trustSecure: "Secure Checkout",
  trustAuthentic: "Authenticity Guaranteed",
  trustReturns: "30-Day Returns",
  trustShipping: "Complimentary Shipping $250+",
  orderSummary: "Order Summary",
  estimatedDelivery: "Estimated delivery",
  placeOrder: "Place Order",
  successTitle: "Thank You",
  successSubtitle: "Your order has been confirmed.",
  successOrderNumber: "Order Number",
  profileTitle: "My Account",
  profileAddresses: "Saved Addresses",
  profilePayments: "Payment Methods",
  profileWishlist: "Wishlist",
  profileOrders: "Order History",
} as const;

export const MOCK_SAVED_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    name: "Alexandra Chen",
    line1: "123 Mercer Street",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10012",
    country: "United States",
    phone: "(212) 555-0147",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    name: "Alexandra Chen",
    line1: "350 Fifth Avenue",
    line2: "Suite 4200",
    city: "New York",
    state: "NY",
    zip: "10118",
    country: "United States",
    phone: "(212) 555-0198",
    isDefault: false,
  },
] as const;

export const MOCK_SAVED_CARDS = [
  {
    id: "card-1",
    brand: "Visa",
    last4: "4242",
    expiry: "09/28",
    isDefault: true,
  },
  {
    id: "card-2",
    brand: "Amex",
    last4: "1005",
    expiry: "03/27",
    isDefault: false,
  },
] as const;

export const MOCK_ORDER_HISTORY = [
  {
    id: "FF-2026-0847",
    date: "2026-05-14",
    status: "Delivered",
    total: 2570,
    items: 2,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&q=85&auto=format&fit=crop",
  },
  {
    id: "FF-2026-0623",
    date: "2026-03-22",
    status: "Delivered",
    total: 1250,
    items: 1,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=85&auto=format&fit=crop",
  },
  {
    id: "FF-2026-0401",
    date: "2026-01-08",
    status: "Delivered",
    total: 680,
    items: 1,
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=200&q=85&auto=format&fit=crop",
  },
] as const;

export const BOUTIQUE_ADDRESS = address;

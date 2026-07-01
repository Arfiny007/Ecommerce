import type { Product, ProductColor, ProductSize } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartContextValue extends CartState {
  itemCount: number;
  subtotal: number;
  addItem: (
    product: Product,
    color: ProductColor,
    size: ProductSize,
    quantity?: number
  ) => void;
  removeItem: (id: string) => void;
  removeItemWithUndo: (id: string) => CartItem | null;
  restoreItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export interface CheckoutPreferences {
  couponCode: string | null;
  giftWrapping: boolean;
  shippingMethodId: import("@/constants/checkout").ShippingMethodId;
  paymentMethodId: import("@/constants/checkout").PaymentMethodId;
}

export interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

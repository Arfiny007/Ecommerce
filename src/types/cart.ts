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
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

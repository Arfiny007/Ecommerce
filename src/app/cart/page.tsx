import { CartPageContent } from "@/components/cart/cart-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { checkoutCopy } from "@/constants/checkout";

export const metadata = createPageMetadata(
  checkoutCopy.cartTitle,
  checkoutCopy.cartSubtitle
);

export default function CartPage() {
  return <CartPageContent />;
}

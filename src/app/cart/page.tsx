import { CartPageContent } from "@/components/cart/cart-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { checkoutCopy } from "@/constants/checkout";

export const metadata = createPageMetadata({
  title: checkoutCopy.cartTitle,
  description: checkoutCopy.cartSubtitle,
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartPageContent />;
}

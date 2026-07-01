import { CheckoutPageContent } from "@/components/checkout/checkout-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { checkoutCopy } from "@/constants/checkout";

export const metadata = createPageMetadata(
  checkoutCopy.checkoutTitle,
  "Complete your FINY FASHIONS purchase with our premium checkout experience."
);

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}

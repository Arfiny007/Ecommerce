import { CheckoutPageContent } from "@/components/checkout/checkout-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { checkoutCopy } from "@/constants/checkout";

export const metadata = createPageMetadata({
  title: checkoutCopy.checkoutTitle,
  description:
    "Complete your FINY FASHIONS purchase with our premium checkout experience.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}

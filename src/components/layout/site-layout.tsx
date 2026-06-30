import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ScrollIndicator } from "@/components/common/scroll-indicator";
import { BackToTop } from "@/components/common/back-to-top";
import { LoadingScreen } from "@/components/common/loading-screen";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <LoadingScreen />
      <ScrollIndicator />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </>
  );
}

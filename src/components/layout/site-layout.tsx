import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ScrollIndicator } from "@/components/common/scroll-indicator";
import { BackToTop } from "@/components/common/back-to-top";
import { LoadingScreen } from "@/components/common/loading-screen";
import { SkipLink } from "@/components/common/skip-link";
import { ScrollRestoration } from "@/components/common/scroll-restoration";
import { RoutePrefetch } from "@/components/common/route-prefetch";
import { MotionShell } from "@/components/motion/motion-shell";
import { BackgroundEffects } from "@/components/motion/background-effects";
import { PageTransition } from "@/components/motion/page-transition";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <MotionShell>
      <div className="relative min-h-screen bg-background">
        <SkipLink />
        <ScrollRestoration />
        <RoutePrefetch />
        <BackgroundEffects />
        <LoadingScreen />
        <ScrollIndicator />
        <Navbar />
        <main id="main-content" className="relative min-h-screen" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CartDrawer />
        <BackToTop />
      </div>
    </MotionShell>
  );
}

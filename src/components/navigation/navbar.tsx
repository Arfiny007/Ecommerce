"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Magnetic } from "@/components/motion/magnetic";
import { MAIN_NAV } from "@/constants/navigation";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/hooks/use-wishlist";
import { useScrollDirection } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { MegaMenu } from "@/components/navigation/mega-menu";
import { SearchDialog } from "@/components/navigation/search-dialog";
import { MobileMenu } from "@/components/navigation/mobile-menu";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const scrollDirection = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-navbar transition-luxury",
          scrolled || activeMenu
            ? "surface-glass border-b border-border-subtle shadow-subtle"
            : "bg-transparent",
          scrollDirection === "down" && scrolled && !activeMenu && "-translate-y-full"
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <nav className="mx-auto flex h-16 max-w-[var(--container-default)] items-center justify-between px-[var(--space-5)] sm:px-[var(--space-8)] lg:h-20 lg:px-[var(--space-12)]">
          <div className="flex items-center gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden items-center gap-8 lg:flex">
              {MAIN_NAV.map((item) => (
                <button
                  key={item.label}
                  onMouseEnter={() =>
                    item.children ? setActiveMenu(item.label) : setActiveMenu(null)
                  }
                  className="group relative text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-muted-foreground"
                  data-cursor="link"
                >
                  {item.children ? (
                    <span>{item.label}</span>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 ease-[var(--ease-luxury)] group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>

          <Magnetic className="absolute left-1/2 -translate-x-1/2" strength={0.18}>
            <Logo size="md" animated />
          </Magnetic>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Link href="/shop">
              <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
                <Heart className="h-4 w-4" />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] text-background"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              aria-label="Open cart"
              className="relative"
            >
              <ShoppingBag className="h-4 w-4" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] text-background"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {activeMenu && (
            <MegaMenu
              items={MAIN_NAV.filter((item) => item.label === activeMenu)}
              isOpen={!!activeMenu}
              onClose={() => setActiveMenu(null)}
            />
          )}
        </AnimatePresence>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

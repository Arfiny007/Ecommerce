"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { NavItem } from "@/constants/navigation";

interface MegaMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ items, isOpen, onClose }: MegaMenuProps) {
  const reducedMotion = useReducedMotion();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: -8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={getTransition(reducedMotion, 0.4)}
      className="absolute left-0 right-0 top-full border-b border-border-subtle surface-glass shadow-soft"
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-[var(--container-default)] grid-cols-1 gap-8 px-[var(--space-8)] py-10 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-4">
            <Link
              href={item.href}
              onClick={onClose}
              className="text-[var(--text-xs)] font-medium uppercase tracking-[var(--tracking-widest)] text-muted-foreground transition-luxury hover:text-foreground"
            >
              {item.label}
            </Link>
            {item.children && (
              <ul className="space-y-3">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      onClick={onClose}
                      className={cn(
                        "group block transition-luxury",
                        child.featured && "md:col-span-2"
                      )}
                    >
                      <span className="text-sm font-medium transition-luxury group-hover:text-muted-foreground">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

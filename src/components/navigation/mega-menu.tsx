"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/constants/navigation";

interface MegaMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ items, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-full border-b border-border bg-background/95 backdrop-blur-xl"
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-8 py-10 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-4">
            <Link
              href={item.href}
              onClick={onClose}
              className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
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
                        "group block transition-colors",
                        child.featured && "md:col-span-2"
                      )}
                    >
                      <span className="text-sm font-medium transition-colors group-hover:text-muted-foreground">
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

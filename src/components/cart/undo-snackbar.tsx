"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types/cart";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getTransition } from "@/lib/motion-config";

interface UndoSnackbarProps {
  item: CartItem | null;
  onUndo: () => void;
  onDismiss: () => void;
  duration?: number;
}

export function UndoSnackbar({
  item,
  onUndo,
  onDismiss,
  duration = 5000,
}: UndoSnackbarProps) {
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (!item) return;
    timerRef.current = setTimeout(dismiss, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [item, duration, dismiss]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 24 }}
          transition={getTransition(reducedMotion)}
          className="fixed bottom-6 left-1/2 z-toast flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-[var(--radius-2xl)] border border-border-subtle surface-elevated px-5 py-4 shadow-luxury"
        >
          <p className="text-sm">
            <span className="text-muted-foreground">Removed</span>{" "}
            <span className="font-medium">{item.product.name}</span>
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onUndo();
              dismiss();
            }}
            className="shrink-0 gap-1.5"
          >
            <Undo2 className="h-3.5 w-3.5" aria-hidden />
            Undo
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

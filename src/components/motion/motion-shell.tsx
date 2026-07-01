"use client";

import { MotionProvider } from "@/components/motion/motion-provider";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { CursorGlow } from "@/components/motion/cursor-glow";

interface MotionShellProps {
  children: React.ReactNode;
}

export function MotionShell({ children }: MotionShellProps) {
  return (
    <MotionProvider>
      <CursorGlow />
      <CustomCursor />
      {children}
    </MotionProvider>
  );
}

"use client";

export function BackgroundEffects() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-radial-bloom bg-mesh-light bg-noise"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-radial-vignette opacity-60"
      />
    </>
  );
}

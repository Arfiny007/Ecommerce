import { ImageResponse } from "next/og";
import { brandName } from "@/constants/branding";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fafaf8",
          fontFamily: "Georgia, serif",
          fontSize: 64,
          fontWeight: 300,
          letterSpacing: "0.15em",
        }}
      >
        {brandName}
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { brandName, tagline } from "@/constants/branding";

export const runtime = "edge";
export const alt = `${brandName} — ${tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fafaf8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {brandName}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: "0.08em",
            color: "#c9b896",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}

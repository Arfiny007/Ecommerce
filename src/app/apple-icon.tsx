import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            color: "#fafaf8",
            fontSize: 96,
            fontFamily: "Georgia, serif",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size }
  );
}

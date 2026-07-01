import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: "#fafaf8",
            fontSize: 18,
            fontFamily: "Georgia, serif",
            fontWeight: 300,
            letterSpacing: "0.08em",
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size }
  );
}

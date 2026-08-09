import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Teranga Digital Consulting Group — Transformer vos idées en résultats";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0B0F1E",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(201,162,39,0.18) 0%, rgba(11,15,30,0) 55%)",
          padding: "90px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 46,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 6,
              border: "2px solid #C9A227",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C9A227",
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "serif",
            }}
          >
            TG
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#C9A227", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>TDCG</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>Des idées aux résultats</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 600,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 920,
            fontFamily: "serif",
          }}
        >
          Transformer vos idées en résultats.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            marginTop: 28,
            maxWidth: 780,
          }}
        >
          Cabinet de conseil en transformation digitale et stratégie — Afrique de l&apos;Ouest
        </div>
      </div>
    ),
    { ...size }
  );
}

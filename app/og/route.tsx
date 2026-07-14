import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Turan Arıcan Matematik";
  const label = searchParams.get("label") ?? "Matematik Platformu";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff",
          color: "#170b0b",
          padding: "64px",
          borderTop: "22px solid #d80000",
          fontFamily: "Arial Black",
        }}
      >
        <div style={{ color: "#d80000", fontSize: 28, fontWeight: 900 }}>
          {label}
        </div>
        <div
          style={{
            maxWidth: 850,
            fontSize: 76,
            lineHeight: 0.98,
            textTransform: "uppercase",
            textShadow: "5px 5px 0 #ffcaca",
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 340,
            height: 128,
            display: "flex",
            alignItems: "center",
            background: "#d80000",
            color: "#fff",
            padding: "24px",
            fontSize: 34,
            textTransform: "uppercase",
            boxShadow: "10px 10px 0 #170b0b",
          }}
        >
          turanarican.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}


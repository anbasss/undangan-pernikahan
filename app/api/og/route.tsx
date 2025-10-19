import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Undangan Pernikahan Andi Baso & Andi Amparita";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitee = searchParams.get("name");
  const backgroundUrl = new URL("/gambar2.jpg", request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          backgroundColor: "#0b2a4a",
          backgroundImage: `linear-gradient(rgba(11,42,74,0.25), rgba(11,42,74,0.65)), url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            padding: "28px 44px",
            borderRadius: "28px",
            border: "2px solid rgba(255,255,255,0.45)",
            backgroundColor: "rgba(14,32,58,0.68)",
            backdropFilter: "blur(6px)",
            color: "#f7f3ea",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            The Wedding Of
          </span>
          <span
            style={{
              fontSize: "68px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              lineHeight: 1.1,
            }}
          >
            Andi Baso & Andi Amparita
          </span>
          {invitee ? (
            <span
              style={{
                marginTop: "6px",
                fontSize: "26px",
                fontWeight: 500,
                letterSpacing: "0.08em",
              }}
            >
              Untuk: {invitee}
            </span>
          ) : null}
          <span
            style={{
              marginTop: "10px",
              fontSize: "24px",
              fontWeight: 500,
              letterSpacing: "0.12em",
            }}
          >
            09 November 2025 · Soppeng, Sulawesi Selatan
          </span>
        </div>
      </div>
    ),
    size
  );
}

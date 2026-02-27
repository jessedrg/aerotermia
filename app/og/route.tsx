import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          backgroundColor: "#1a1a1a",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, color: "#faf9f6", fontStyle: "italic", letterSpacing: "-2px" }}>
            aero.
          </div>
          <div style={{ fontSize: 32, color: "#faf9f680", marginTop: 16, fontFamily: "system-ui, sans-serif" }}>
            Aerotermia en toda España
          </div>
          <div style={{ fontSize: 18, color: "#faf9f640", marginTop: 24, fontFamily: "system-ui, sans-serif" }}>
            Ahorra hasta 70% · Instaladores certificados · Presupuesto gratis
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

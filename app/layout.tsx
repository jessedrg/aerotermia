import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600", "700"], display: "swap" })

export const metadata: Metadata = {
  title: "aero. — Aerotermia en España",
  description: "Instalación de aerotermia y bombas de calor en toda España. Ahorra hasta un 70% en calefacción. Presupuesto gratis de instaladores certificados.",
  keywords: "aerotermia, bomba de calor, instalación aerotermia, aerotermia precio, aerotermia radiadores, suelo radiante, calefacción eficiente",
  openGraph: {
    title: "aero. — Aerotermia en España",
    description: "Instalación de aerotermia y bombas de calor. Ahorra hasta un 70% en calefacción.",
    type: "website",
    siteName: "aero.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "aero. — Aerotermia en España" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "aero. — Aerotermia en España",
    description: "Instalación de aerotermia y bombas de calor. Presupuesto gratis.",
    images: ["/og"],
  },
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}

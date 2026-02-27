import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceCityContent } from "@/components/service-city-content"
import { VALID_SERVICES, MODIFIERS, CITIES, type Service } from "@/lib/sitemap-data"

export const dynamicParams = true
export const revalidate = 604800

const KNOWN_MODIFIERS = MODIFIERS.filter(m => m !== "").map(m => m.slice(1)) as string[]

const SERVICE_NAMES: Record<Service, { name: string; title: string; singular: string }> = {
  "aerotermia": { name: "Aerotermia", title: "Aerotermia", singular: "sistema de aerotermia" },
  "bomba-calor": { name: "Bomba de Calor", title: "Bombas de Calor", singular: "bomba de calor" },
  "aerotermia-radiadores": { name: "Aerotermia con Radiadores", title: "Aerotermia con Radiadores", singular: "aerotermia con radiadores" },
  "aerotermia-suelo-radiante": { name: "Aerotermia con Suelo Radiante", title: "Aerotermia con Suelo Radiante", singular: "aerotermia con suelo radiante" },
  "aerotermia-acs": { name: "Aerotermia para ACS", title: "Aerotermia para Agua Caliente", singular: "aerotermia para ACS" },
  "aerotermia-piscina": { name: "Aerotermia para Piscina", title: "Aerotermia para Piscinas", singular: "aerotermia para piscina" },
  "instalacion-aerotermia": { name: "Instalación de Aerotermia", title: "Instalación de Aerotermia", singular: "instalación de aerotermia" },
  "mantenimiento-aerotermia": { name: "Mantenimiento de Aerotermia", title: "Mantenimiento de Aerotermia", singular: "mantenimiento de aerotermia" },
  "aerotermia-vivienda-unifamiliar": { name: "Aerotermia para Chalet", title: "Aerotermia para Vivienda Unifamiliar", singular: "aerotermia para chalet" },
  "aerotermia-piso": { name: "Aerotermia para Piso", title: "Aerotermia para Pisos", singular: "aerotermia para piso" },
}

function parseServiceAndModifier(rawService: string): { serviceId: Service | null; modifier?: string } {
  if (VALID_SERVICES.includes(rawService as Service)) return { serviceId: rawService as Service }
  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (rawService.endsWith(suffix)) {
      const serviceId = rawService.slice(0, -suffix.length)
      if (VALID_SERVICES.includes(serviceId as Service)) return { serviceId: serviceId as Service, modifier: mod }
    }
  }
  return { serviceId: null }
}

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

function formatModifier(modifier: string): string {
  const map: Record<string, string> = {
    "precios": "Precios", "barata": "Barata", "economica": "Económica",
    "cuanto-cuesta": "Cuánto Cuesta", "presupuesto": "Presupuesto",
    "presupuesto-online": "Presupuesto Online", "financiacion": "Financiación",
    "rapida": "Rápida", "urgente": "Urgente", "express": "Express",
    "en-una-semana": "en Una Semana", "mejor": "Mejor",
    "calidad-precio": "Calidad-Precio", "profesional": "Profesional",
    "de-confianza": "de Confianza", "mejor-valorada": "Mejor Valorada",
    "recomendada": "Recomendada", "llave-en-mano": "Llave en Mano",
    "integral": "Integral", "completa": "Completa", "parcial": "Parcial",
    "sin-obras": "Sin Obras", "moderna": "Moderna", "minimalista": "Minimalista",
    "rustica": "Rústica", "vintage": "Vintage", "nordica": "Nórdica",
    "industrial": "Industrial", "pequena": "Pequeña", "grande": "Grande",
    "abierta": "Abierta", "americana": "Americana", "madera": "Madera",
    "lacada": "Lacada", "silestone": "Silestone", "dekton": "Dekton",
    "granito": "Granito", "corian": "Corian", "cerca-de-mi": "Cerca de Mí",
    "centro": "Centro", "economica-integral": "Económica Integral",
    "moderna-llave-en-mano": "Moderna Llave en Mano",
  }
  return map[modifier] || modifier.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string; city: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) return { title: "No encontrado" }

  const serviceName = SERVICE_NAMES[serviceId]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? ` ${formatModifier(modifier)}` : ""
  const fullTitle = `${serviceName.title}${modifierText} en ${cityName}`

  return {
    title: `${fullTitle} | Instaladores Certificados | aero.`,
    description: `${serviceName.title}${modifierText.toLowerCase()} en ${cityName}. Instaladores certificados. Presupuesto GRATIS. Contacta por WhatsApp.`,
    alternates: { canonical: `https://aerotermiaespana.com/${rawService}/${citySlug}/` },
    openGraph: { title: fullTitle, description: `Instalación de ${serviceName.singular} en ${cityName}. Presupuestos gratis.`, type: "website", siteName: "aero." },
  }
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) notFound()

  const serviceName = SERVICE_NAMES[serviceId as Service]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? formatModifier(modifier) : ""
  const pageTitle = modifier ? `${serviceName.title} ${modifierText} en ${cityName}` : `${serviceName.title} en ${cityName}`

  const cityIndex = CITIES.indexOf(citySlug)
  const nearbyCities = CITIES.slice(Math.max(0, cityIndex - 5), Math.min(CITIES.length, cityIndex + 6)).filter(c => c !== citySlug).slice(0, 5)
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <ServiceCityContent
          pageTitle={pageTitle} serviceName={serviceName} cityName={cityName}
          citySlug={citySlug} serviceId={serviceId as Service} modifierText={modifierText}
          nearbyCities={nearbyCities} relatedServices={relatedServices} serviceNames={SERVICE_NAMES}
        />
      </main>
      <Footer />
    </div>
  )
}

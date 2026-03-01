"use client"

import { useState } from "react"
import Link from "next/link"
import type { Service } from "@/lib/sitemap-data"
import { MessageCircle, Star, Shield, Clock, Ruler, Users, CheckCircle, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20una%20aerotermia."

const SERVICE_IMAGES: Record<string, string> = {
  "aerotermia": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  "bomba-calor": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop",
  "aerotermia-radiadores": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop",
  "aerotermia-suelo-radiante": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  "aerotermia-acs": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  "aerotermia-piscina": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
  "instalacion-aerotermia": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop",
  "mantenimiento-aerotermia": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop",
  "aerotermia-vivienda-unifamiliar": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
  "aerotermia-piso": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function generateReviews(cityName: string, serviceId: string) {
  const seed = hashCode(`${cityName}-${serviceId}`)
  const names = ["Maria L.", "Carlos G.", "Ana R.", "Javier M.", "Elena S.", "Roberto P.", "Patricia D.", "Fernando T.", "Laura B.", "Sergio V."]
  const surnames2 = ["Garcia", "Martinez", "Lopez", "Sanchez", "Fernandez", "Perez", "Rodriguez", "Gonzalez", "Hernandez", "Diaz"]

  const aerotermiaTemplates = [
    `Teniamos caldera de gas de 15 anos y la factura era brutal. aero. nos presento 3 presupuestos en ${cityName} y elegimos el que mejor encajaba. En 3 dias teniamos aerotermia funcionando. La factura ha bajado un 60%.`,
    `Queriamos quitar el gas de casa y pasarnos a renovables. El instalador que nos recomendo aero. en ${cityName} nos explico todo sin presion. Ahora tenemos calefaccion, aire acondicionado y agua caliente con un solo equipo.`,
    `Vivienda unifamiliar de 200m2 en ${cityName}. Nos daban presupuestos muy dispares. aero. nos ayudo a comparar y elegir la mejor opcion calidad-precio. Muy contentos con el resultado.`,
    `Instalacion de aerotermia con suelo radiante en ${cityName}. El equipo fue muy profesional y cumplio los plazos. El confort es increible, calor uniforme en toda la casa.`,
    `Tenia miedo de que la aerotermia no funcionara bien con mis radiadores antiguos en ${cityName}. El tecnico evaluo todo y funciona perfecto. Ademas me ayudaron con la subvencion.`,
    `Segunda instalacion que hago con aero. en ${cityName}. La primera vez fue tan bien que no dude en repetir para mi segunda vivienda. Profesionalidad y cumplimiento de plazos.`,
  ]

  const piscinaTemplates = [
    `Aerotermia para la piscina en ${cityName}. Ahora la usamos de abril a octubre. El coste de funcionamiento es minimo comparado con lo que gastaba antes en gas.`,
    `Queriamos alargar la temporada de bano en ${cityName}. El instalador que nos recomendo aero. dimensiono perfectamente la bomba de calor. Agua a 28 grados todo el verano.`,
    `Piscina de 50m3 en ${cityName}. La bomba de calor que nos instalaron calienta el agua en 24 horas. Muy eficiente y silenciosa.`,
    `Sustituimos el calentador de gas de la piscina por aerotermia en ${cityName}. El ahorro es brutal y el mantenimiento minimo.`,
    `Climatizacion de piscina cubierta en ${cityName}. El sistema funciona todo el ano sin problemas. Muy recomendable.`,
    `Instalacion rapida y limpia en ${cityName}. En un dia teniamos la bomba de calor funcionando. Servicio excelente.`,
  ]

  const templates = serviceId.includes("piscina") ? piscinaTemplates : aerotermiaTemplates
  const startIdx = seed % templates.length

  return Array.from({ length: 6 }, (_, i) => ({
    name: names[(seed + i * 3) % names.length],
    city: cityName,
    rating: (seed + i) % 7 === 0 ? 4 : 5,
    text: templates[(startIdx + i) % templates.length],
    date: `${[3, 17, 8, 24, 11, 29][i]} de ${["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][[7, 9, 8, 10, 11, 7][i]]} 2025`,
    verified: true,
  }))
}

function generateFAQs(cityName: string, serviceName: { title: string; singular: string }, serviceId: string) {
  const faqs = [
    { q: `Cuanto cuesta instalar ${serviceName.singular} en ${cityName}?`, a: `El precio de ${serviceName.singular} en ${cityName} depende de la potencia necesaria, el tipo de emisores y la complejidad de la instalacion. Un sistema completo para una vivienda unifamiliar suele oscilar entre 8.000-15.000€. aero. te presenta presupuestos detallados de instaladores certificados en ${cityName}. Escribenos por WhatsApp para orientacion gratuita.` },
    { q: `El servicio de aero. en ${cityName} tiene algun coste?`, a: `El asesoramiento de aero. es completamente gratuito. Te conectamos con instaladores certificados, te presentamos presupuestos y te acompanamos durante la instalacion. Sin comisiones ni costes ocultos. Escribenos por WhatsApp sin compromiso.` },
    { q: `Cuanto se ahorra con aerotermia en ${cityName}?`, a: `La aerotermia puede reducir tu factura de calefaccion entre un 50% y un 70% respecto al gas o gasoil. El ahorro exacto depende del aislamiento de tu vivienda, el clima de ${cityName} y tus habitos de consumo. La inversion se amortiza en 5-7 anos.` },
  ]

  if (serviceId.includes("radiadores")) {
    faqs.push(
      { q: "Puedo instalar aerotermia con mis radiadores actuales?", a: `Si, en la mayoria de casos. Los radiadores de aluminio funcionan muy bien con aerotermia. Los de hierro fundido pueden requerir una bomba de calor de alta temperatura. Nuestros tecnicos en ${cityName} evaluan tu instalacion antes de presupuestar.` },
      { q: "Hay que cambiar los radiadores?", a: "No siempre. Si tus radiadores estan sobredimensionados o son de aluminio, pueden funcionar perfectamente. En algunos casos se recomienda anadir algun radiador adicional para optimizar el rendimiento." },
      { q: "Cuanto tarda la instalacion?", a: `La instalacion de aerotermia con radiadores existentes en ${cityName} suele completarse en 1-2 dias. Es una de las opciones mas rapidas y economicas para pasarte a la aerotermia.` },
    )
  } else if (serviceId.includes("suelo-radiante")) {
    faqs.push(
      { q: "Es necesario levantar todo el suelo?", a: "Si es obra nueva, el suelo radiante se instala antes del pavimento. En reformas, existen sistemas de bajo espesor (3-4 cm) que minimizan la obra. Nuestros profesionales te asesoran sobre la mejor opcion para tu caso." },
      { q: "Puedo refrescar en verano con suelo radiante?", a: `Si. El suelo radiante refrescante baja la temperatura del suelo unos grados, creando una sensacion de frescor muy agradable. No sustituye al aire acondicionado pero complementa muy bien en ${cityName}.` },
    )
  } else if (serviceId.includes("piscina")) {
    faqs.push(
      { q: "Cuanto tarda en calentar la piscina?", a: `Depende del volumen de agua y la potencia de la bomba. Una piscina de 50m3 puede subir 1-2 grados por dia. Una vez alcanzada la temperatura, el mantenimiento es muy eficiente.` },
      { q: "Funciona en invierno?", a: "Las bombas de calor para piscina funcionan mejor en primavera y otono. En invierno, el rendimiento baja pero sigue siendo mas eficiente que otros sistemas. Para piscinas cubiertas funciona todo el ano." },
    )
  } else {
    faqs.push(
      { q: "Hay subvenciones para aerotermia en ${cityName}?", a: `Si. Existen ayudas europeas, estatales y autonomicas que pueden cubrir entre el 20% y el 40% de la inversion. Los instaladores de nuestra red en ${cityName} te ayudan con la gestion de las subvenciones disponibles.` },
      { q: "Que marcas de aerotermia recomendais?", a: "Trabajamos con instaladores certificados de las principales marcas: Daikin, Mitsubishi, Vaillant, Saunier Duval, Panasonic, Samsung, LG y Toshiba. Te asesoramos sobre la mejor opcion segun tu presupuesto y necesidades." },
      { q: "Cuanto dura una instalacion de aerotermia?", a: `La instalacion completa de aerotermia en ${cityName} suele tardar entre 2-5 dias dependiendo de la complejidad. Si incluye suelo radiante, puede extenderse a 1-2 semanas.` },
    )
  }
  return faqs
}

interface ServiceCityContentProps {
  pageTitle: string
  serviceName: { name: string; title: string; singular: string }
  cityName: string
  citySlug: string
  serviceId: Service
  modifierText: string
  nearbyCities: string[]
  relatedServices: string[]
  serviceNames: Record<Service, { name: string; title: string; singular: string }>
}

export function ServiceCityContent({
  pageTitle, serviceName, cityName, citySlug, serviceId, modifierText,
  nearbyCities, relatedServices, serviceNames,
}: ServiceCityContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(3)

  const reviews = generateReviews(cityName, serviceId)
  const faqs = generateFAQs(cityName, serviceName, serviceId)
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["reforma-cocina"]

  function getCityDisplayName(slug: string): string {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt={pageTitle} className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
                <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
                <span>/</span>
                <span>{serviceName.title}</span>
                <span>/</span>
                <span className="text-background/60">{cityName}</span>
              </nav>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
                {pageTitle}
              </h1>

              <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
                {"Compara los mejores profesionales de "}
                {serviceName.singular}
                {modifierText ? ` ${modifierText.toLowerCase()}` : ""}
                {` en ${cityName}. Presupuestos reales, opiniones verificadas. Gratis.`}
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex flex-col gap-3">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  Presupuesto gratis
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors"
                >
                  Como funciona
                </a>
              </div>

              <div className="flex items-center gap-4 mt-6 text-xs text-background/40 font-sans">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-background/60" />)}
                  <span className="ml-1 text-background/60 font-medium">{avgRating}</span>
                </div>
                <span>|</span>
                <span>{reviews.length}+ opiniones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Verificados", sub: "Profesionales visitados" },
              { icon: Clock, label: "< 48 horas", sub: "Presupuestos en mano" },
              { icon: Ruler, label: "Gratuito", sub: "Sin compromiso" },
              { icon: Users, label: "847 cocinas", sub: "Reformadas con aero." },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs font-sans font-medium text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground font-sans">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Proceso</p>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.1]">
              {`Tu ${serviceName.singular} en ${cityName}, paso a paso`}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-0">
            {[
              { n: "01", t: "Cuentanos tu proyecto", d: `Llamanos. Que quieres reformar en ${cityName}, tu estilo, tu presupuesto. 5 minutos bastan.` },
              { n: "02", t: "Recibe presupuestos", d: `Contactamos con los mejores profesionales de ${cityName}. Recibes hasta 3 presupuestos comparados.` },
              { n: "03", t: "Elige y reforma", d: `Tu decides. Coordinamos la primera visita y te acompanamos durante toda la obra en ${cityName}.` },
            ].map((step, i) => (
              <div key={step.n} className={`flex gap-8 py-8 ${i < 2 ? "border-b border-border" : ""}`}>
                <span className="font-serif text-4xl lg:text-5xl text-foreground/10 flex-shrink-0">{step.n}</span>
                <div>
                  <h3 className="text-sm font-sans font-medium text-foreground">{step.t}</h3>
                  <p className="text-xs text-muted-foreground mt-2 font-sans leading-relaxed max-w-md">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Opiniones</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground">
                {`Clientes de ${cityName} opinan`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-foreground" />)}
              <span className="text-sm font-sans font-medium">{avgRating}/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {reviews.slice(0, visibleReviews).map((r, i) => (
              <article key={i} className="bg-card p-8 flex flex-col justify-between">
                <p className="text-xs text-foreground/80 font-sans leading-relaxed">{r.text}</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium font-sans">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground font-sans">{r.city} · {r.date}</p>
                  </div>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-sans">
                      <CheckCircle className="w-3 h-3" /> Verificada
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <button onClick={() => setVisibleReviews(reviews.length)} className="mt-8 flex items-center gap-2 text-xs font-sans font-medium text-foreground hover:opacity-70 transition-opacity mx-auto">
              Ver mas opiniones <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
            {`Tu cocina en ${cityName} merece`}
            <br />
            <span className="italic font-light">los mejores profesionales.</span>
          </h2>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
            <MessageCircle className="w-4 h-4" /> Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
        <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">
          {`Preguntas sobre ${serviceName.singular} en ${cityName}`}
        </h2>
        <div className="border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-start justify-between gap-6 py-5 text-left group">
                <h3 className="text-xs sm:text-sm font-sans font-medium text-foreground leading-relaxed group-hover:opacity-70 transition-opacity">{faq.q}</h3>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="pb-5 -mt-1">
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Guia</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-8">
            {`Guia para tu ${serviceName.singular} en ${cityName}`}
          </h2>
          <div className="prose-sm font-sans text-muted-foreground space-y-4 leading-relaxed text-xs sm:text-sm">
            <p>{`Reformar la cocina en ${cityName} es una de las mejores inversiones que puedes hacer en tu hogar. Es el espacio donde mas tiempo pasamos y el que mas impacto tiene en el valor de la vivienda. En aero. lo sabemos porque hemos acompanado a mas de 800 familias en toda España en este proceso.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">Que tener en cuenta</h3>
            <p>{`Al planificar tu ${serviceName.singular} en ${cityName}, define primero tu presupuesto real (incluyendo un 10-15% de margen para imprevistos), el estilo que buscas (moderna, nordica, clasica), y las funcionalidades prioritarias (mas almacenaje, isla, electrodomesticos integrados). Con estos datos, nuestros profesionales te presentan opciones concretas.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">{`Por que confiar en aero. en ${cityName}`}</h3>
            <p>{`Nuestro equipo conoce a los profesionales de ${cityName} personalmente. Verificamos licencias, seguros, garantias y portfolios. Cuando te recomendamos un profesional, es porque lo conocemos por dentro. Sin sorpresas, sin intermediarios opacos.`}</p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">{serviceName.title} en otras ciudades</p>
            <h3 className="font-serif text-xl tracking-tight text-foreground mb-6">Localidades cercanas</h3>
            <nav><ul className="space-y-0">
              {nearbyCities.map(city => (
                <li key={city}>
                  <Link href={`/${serviceId}/${city}/`} className="flex items-center justify-between py-3 border-b border-border/50 group">
                    <span className="text-xs font-sans text-foreground group-hover:opacity-70 transition-opacity">{`${serviceName.title} en ${getCityDisplayName(city)}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios en {cityName}</p>
            <h3 className="font-serif text-xl tracking-tight text-foreground mb-6">Tambien te puede interesar</h3>
            <nav><ul className="space-y-0">
              {relatedServices.map(svc => (
                <li key={svc}>
                  <Link href={`/${svc}/${citySlug}/`} className="flex items-center justify-between py-3 border-b border-border/50 group">
                    <span className="text-xs font-sans text-foreground group-hover:opacity-70 transition-opacity">{`${serviceNames[svc as Service]?.title || svc} en ${cityName}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-background/20 mb-4 font-sans">Da el primer paso</p>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background">La cocina que imaginas, existe.</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link href="/" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
              Ver servicios <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness",
        name: `aero. - ${pageTitle}`,
        description: `Los mejores profesionales de ${serviceName.singular} en ${cityName}. Presupuestos gratis.`,
         url: `https://aerotermiaesp.com/${serviceId}/${citySlug}/`,
        address: { "@type": "PostalAddress", addressLocality: cityName, addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating, reviewCount: reviews.length, bestRating: "5", worstRating: "1" },
      })}} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}} />
    </>
  )
}

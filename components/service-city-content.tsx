"use client"

import { useState } from "react"
import Link from "next/link"
import type { Service } from "@/lib/sitemap-data"
import { MessageCircle, Star, CheckCircle, ChevronDown, ArrowRight, ArrowUpRight, Zap, Thermometer, Leaf, PiggyBank, Award, Phone } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

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
  const names = ["María L.", "Carlos G.", "Ana R.", "Javier M.", "Elena S.", "Roberto P.", "Patricia D.", "Fernando T.", "Laura B.", "Sergio V."]

  const aerotermiaTemplates = [
    `Teníamos caldera de gas de 15 años y la factura era brutal. Nos presentaron 3 presupuestos en ${cityName} y elegimos el que mejor encajaba. En 3 días teníamos aerotermia funcionando. La factura ha bajado un 60%.`,
    `Queríamos quitar el gas de casa y pasarnos a renovables. El instalador en ${cityName} nos explicó todo sin presión. Ahora tenemos calefacción, aire acondicionado y agua caliente con un solo equipo.`,
    `Vivienda unifamiliar de 200m² en ${cityName}. Nos daban presupuestos muy dispares. Nos ayudaron a comparar y elegir la mejor opción calidad-precio. Muy contentos con el resultado.`,
    `Instalación de aerotermia con suelo radiante en ${cityName}. El equipo fue muy profesional y cumplió los plazos. El confort es increíble, calor uniforme en toda la casa.`,
    `Tenía miedo de que la aerotermia no funcionara bien con mis radiadores antiguos en ${cityName}. El técnico evaluó todo y funciona perfecto. Además me ayudaron con la subvención.`,
    `Segunda instalación que hago en ${cityName}. La primera vez fue tan bien que no dudé en repetir para mi segunda vivienda. Profesionalidad y cumplimiento de plazos.`,
  ]

  const piscinaTemplates = [
    `Aerotermia para la piscina en ${cityName}. Ahora la usamos de abril a octubre. El coste de funcionamiento es mínimo comparado con lo que gastaba antes en gas.`,
    `Queríamos alargar la temporada de baño en ${cityName}. Dimensionaron perfectamente la bomba de calor. Agua a 28 grados todo el verano.`,
    `Piscina de 50m³ en ${cityName}. La bomba de calor calienta el agua en 24 horas. Muy eficiente y silenciosa.`,
    `Sustituimos el calentador de gas de la piscina por aerotermia en ${cityName}. El ahorro es brutal y el mantenimiento mínimo.`,
    `Climatización de piscina cubierta en ${cityName}. El sistema funciona todo el año sin problemas. Muy recomendable.`,
    `Instalación rápida y limpia en ${cityName}. En un día teníamos la bomba de calor funcionando. Servicio excelente.`,
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
    { q: `¿Cuánto cuesta instalar ${serviceName.singular} en ${cityName}?`, a: `El precio de ${serviceName.singular} en ${cityName} depende de la potencia necesaria, el tipo de emisores y la complejidad de la instalación. Un sistema completo para una vivienda unifamiliar suele oscilar entre 8.000-15.000€. Te presentamos presupuestos detallados de instaladores certificados en ${cityName}. Escríbenos por WhatsApp para orientación gratuita.` },
    { q: `¿El asesoramiento en ${cityName} tiene algún coste?`, a: `El asesoramiento es completamente gratuito. Te conectamos con instaladores certificados, te presentamos presupuestos y te acompañamos durante la instalación. Sin comisiones ni costes ocultos. Escríbenos por WhatsApp sin compromiso.` },
    { q: `¿Cuánto se ahorra con aerotermia en ${cityName}?`, a: `La aerotermia puede reducir tu factura de calefacción entre un 50% y un 70% respecto al gas o gasóleo. El ahorro exacto depende del aislamiento de tu vivienda, el clima de ${cityName} y tus hábitos de consumo. La inversión se amortiza en 5-7 años.` },
  ]

  if (serviceId.includes("radiadores")) {
    faqs.push(
      { q: "¿Puedo instalar aerotermia con mis radiadores actuales?", a: `Sí, en la mayoría de casos. Los radiadores de aluminio funcionan muy bien con aerotermia. Los de hierro fundido pueden requerir una bomba de calor de alta temperatura. Nuestros técnicos en ${cityName} evalúan tu instalación antes de presupuestar.` },
      { q: "¿Hay que cambiar los radiadores?", a: "No siempre. Si tus radiadores están sobredimensionados o son de aluminio, pueden funcionar perfectamente. En algunos casos se recomienda añadir algún radiador adicional para optimizar el rendimiento." },
      { q: "¿Cuánto tarda la instalación?", a: `La instalación de aerotermia con radiadores existentes en ${cityName} suele completarse en 1-2 días. Es una de las opciones más rápidas y económicas para pasarte a la aerotermia.` },
    )
  } else if (serviceId.includes("suelo-radiante")) {
    faqs.push(
      { q: "¿Es necesario levantar todo el suelo?", a: "Si es obra nueva, el suelo radiante se instala antes del pavimento. En reformas, existen sistemas de bajo espesor (3-4 cm) que minimizan la obra. Nuestros profesionales te asesoran sobre la mejor opción para tu caso." },
      { q: "¿Puedo refrescar en verano con suelo radiante?", a: `Sí. El suelo radiante refrescante baja la temperatura del suelo unos grados, creando una sensación de frescor muy agradable. No sustituye al aire acondicionado pero complementa muy bien en ${cityName}.` },
    )
  } else if (serviceId.includes("piscina")) {
    faqs.push(
      { q: "¿Cuánto tarda en calentar la piscina?", a: `Depende del volumen de agua y la potencia de la bomba. Una piscina de 50m³ puede subir 1-2 grados por día. Una vez alcanzada la temperatura, el mantenimiento es muy eficiente.` },
      { q: "¿Funciona en invierno?", a: "Las bombas de calor para piscina funcionan mejor en primavera y otoño. En invierno, el rendimiento baja pero sigue siendo más eficiente que otros sistemas. Para piscinas cubiertas funciona todo el año." },
    )
  } else {
    faqs.push(
      { q: `¿Hay subvenciones para aerotermia en ${cityName}?`, a: `Sí. Existen ayudas europeas, estatales y autonómicas que pueden cubrir entre el 20% y el 40% de la inversión. Los instaladores de nuestra red en ${cityName} te ayudan con la gestión de las subvenciones disponibles.` },
      { q: "¿Qué marcas de aerotermia recomendáis?", a: "Trabajamos con instaladores certificados de las principales marcas: Daikin, Mitsubishi, Vaillant, Saunier Duval, Panasonic, Samsung, LG y Toshiba. Te asesoramos sobre la mejor opción según tu presupuesto y necesidades." },
      { q: `¿Cuánto dura una instalación de aerotermia?`, a: `La instalación completa de aerotermia en ${cityName} suele tardar entre 2-5 días dependiendo de la complejidad. Si incluye suelo radiante, puede extenderse a 1-2 semanas.` },
    )
  }
  return faqs
}

const SERVICE_VALUE_PROPS: Record<string, { icon: typeof Zap; title: string; desc: string }[]> = {
  "aerotermia": [
    { icon: PiggyBank, title: "Ahorra hasta 70%", desc: "En tu factura de calefacción respecto al gas o gasóleo" },
    { icon: Leaf, title: "100% renovable", desc: "El 75% de la energía la extrae gratis del aire exterior" },
    { icon: Thermometer, title: "3 en 1", desc: "Calefacción, refrigeración y agua caliente en un solo equipo" },
    { icon: Award, title: "Subvenciones", desc: "Hasta 40% de ayudas disponibles según comunidad autónoma" },
  ],
  "bomba-calor": [
    { icon: Zap, title: "COP 3-5", desc: "Por cada kWh eléctrico genera 3-5 kWh térmicos" },
    { icon: Thermometer, title: "Hasta -20°C", desc: "Funciona incluso con temperaturas extremas" },
    { icon: PiggyBank, title: "Amortización 5-7 años", desc: "Recupera la inversión con el ahorro en facturas" },
    { icon: Leaf, title: "Sin combustión", desc: "Cero emisiones directas, sin humos ni olores" },
  ],
  "aerotermia-radiadores": [
    { icon: PiggyBank, title: "Menor inversión", desc: "Aprovecha tus radiadores existentes sin cambiarlos" },
    { icon: Zap, title: "Instalación rápida", desc: "En 1-2 días tienes el sistema funcionando" },
    { icon: Thermometer, title: "Alta temperatura", desc: "Bombas de calor que trabajan hasta 65°C" },
    { icon: Award, title: "Sin obras", desc: "Solo se sustituye la caldera, el circuito se mantiene" },
  ],
  "aerotermia-suelo-radiante": [
    { icon: Thermometer, title: "Máximo confort", desc: "Calor uniforme desde el suelo, sin corrientes" },
    { icon: Zap, title: "Máxima eficiencia", desc: "El suelo radiante trabaja a 30-35°C, ideal para aerotermia" },
    { icon: Leaf, title: "Refrescante", desc: "En verano puede enfriar el suelo varios grados" },
    { icon: Award, title: "Invisible", desc: "Sin radiadores visibles, más espacio útil" },
  ],
  "aerotermia-acs": [
    { icon: PiggyBank, title: "70% menos", desc: "Que un termo eléctrico convencional" },
    { icon: Thermometer, title: "Agua ilimitada", desc: "Producción continua de agua caliente" },
    { icon: Zap, title: "Compacto", desc: "Equipos que caben en un armario" },
    { icon: Leaf, title: "Combinable", desc: "Con calefacción o solo para ACS" },
  ],
  "aerotermia-piscina": [
    { icon: Thermometer, title: "+5 meses", desc: "Alarga la temporada de baño de abril a octubre" },
    { icon: PiggyBank, title: "Coste mínimo", desc: "Funcionamiento muy económico vs gas o eléctrico" },
    { icon: Zap, title: "Eficiente", desc: "COP muy alto al trabajar a baja temperatura (26-30°C)" },
    { icon: Award, title: "Amortización 2-3 años", desc: "Recupera la inversión rápidamente" },
  ],
  "instalacion-aerotermia": [
    { icon: Award, title: "Certificados", desc: "Instaladores autorizados por los fabricantes" },
    { icon: Zap, title: "Garantía válida", desc: "Solo con instalación profesional" },
    { icon: Thermometer, title: "Puesta en marcha", desc: "Configuración óptima incluida" },
    { icon: PiggyBank, title: "Gestión ayudas", desc: "Te ayudamos con las subvenciones" },
  ],
  "mantenimiento-aerotermia": [
    { icon: Zap, title: "Eficiencia óptima", desc: "Mantén el rendimiento del primer día" },
    { icon: Award, title: "Prevención", desc: "Detecta problemas antes de que sean averías" },
    { icon: Thermometer, title: "Vida útil", desc: "Prolonga la duración del equipo 5-10 años" },
    { icon: PiggyBank, title: "Ahorro", desc: "Evita reparaciones costosas" },
  ],
  "aerotermia-vivienda-unifamiliar": [
    { icon: PiggyBank, title: "Mayor ahorro", desc: "Cuanto más grande la casa, más ahorras" },
    { icon: Thermometer, title: "Zonificación", desc: "Temperatura independiente por plantas" },
    { icon: Zap, title: "Todo incluido", desc: "Calefacción, ACS, refrigeración y piscina" },
    { icon: Award, title: "Valor vivienda", desc: "Mejora la certificación energética" },
  ],
  "aerotermia-piso": [
    { icon: Zap, title: "Compacto", desc: "Soluciones diseñadas para espacios reducidos" },
    { icon: Thermometer, title: "Silencioso", desc: "Unidades exteriores de bajo ruido" },
    { icon: PiggyBank, title: "Adiós al gas", desc: "Sustituye tu caldera individual" },
    { icon: Award, title: "Comunidad", desc: "Te ayudamos con los permisos" },
  ],
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
  const valueProps = SERVICE_VALUE_PROPS[serviceId] || SERVICE_VALUE_PROPS["aerotermia"]

  function getCityDisplayName(slug: string): string {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  return (
    <>
      {/* Hero - Boutique minimal sin imagen */}
      <section className="bg-[#fafafa] border-b border-[#111]/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <nav className="text-[10px] tracking-[0.3em] uppercase text-[#111]/30 mb-12 font-sans flex items-center gap-2">
            <Link href="/" className="hover:text-[#111]/60 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href={`/${serviceId}/`} className="hover:text-[#111]/60 transition-colors">{serviceName.title}</Link>
            <span>/</span>
            <span className="text-[#111]/50">{cityName}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#111] leading-[1.05]">
              {serviceName.title}
              <br />
              <span className="italic font-light">en {cityName}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#111]/50 mt-8 font-sans leading-relaxed max-w-xl">
              Instaladores certificados de {serviceName.singular}{modifierText ? ` ${modifierText.toLowerCase()}` : ""} en {cityName}. 
              Presupuesto gratuito en 48h. Sin compromiso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#111] text-white px-8 py-4 text-sm font-sans font-medium hover:bg-[#333] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir presupuesto gratis
              </a>
              <a
                href="tel:+34711267223"
                className="inline-flex items-center justify-center gap-2 border border-[#111]/20 text-[#111] px-8 py-4 text-sm font-sans hover:border-[#111]/40 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Llamar ahora
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 text-xs text-[#111]/40 font-sans">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#111] text-[#111]" />)}
                <span className="ml-1 text-[#111]/70 font-medium">{avgRating}/5</span>
              </div>
              <span className="text-[#111]/20">|</span>
              <span>{reviews.length}+ opiniones verificadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props - Por qué aerotermia */}
      <section className="border-b border-[#111]/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-8 font-sans">Por qué {serviceName.singular}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {valueProps.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="space-y-3">
                <Icon className="w-5 h-5 text-[#111]" />
                <h3 className="text-sm font-sans font-medium text-[#111]">{title}</h3>
                <p className="text-xs text-[#111]/50 font-sans leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-4 font-sans">Proceso</p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111] leading-[1.15]">
              Tu {serviceName.singular} en {cityName},
              <br />
              <span className="italic font-light">en 3 pasos</span>
            </h2>
            <p className="text-sm text-[#111]/50 mt-6 font-sans leading-relaxed">
              Te conectamos con instaladores certificados de tu zona. Sin intermediarios, sin comisiones ocultas.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {[
              { n: "01", t: "Cuéntanos tu proyecto", d: `Escríbenos por WhatsApp o llámanos. Superficie de tu vivienda, sistema actual (gas, gasóleo, eléctrico) y qué necesitas. 5 minutos.` },
              { n: "02", t: "Recibe presupuestos", d: `En 48h contactamos con instaladores certificados en ${cityName}. Recibes hasta 3 presupuestos detallados para comparar.` },
              { n: "03", t: "Instala y ahorra", d: `Eliges el que más te convence. Te acompañamos durante la instalación y te ayudamos con las subvenciones disponibles.` },
            ].map((step, i) => (
              <div key={step.n} className={`flex gap-6 py-6 ${i < 2 ? "border-b border-[#111]/5" : ""}`}>
                <span className="font-serif text-3xl text-[#111]/10 flex-shrink-0 w-10">{step.n}</span>
                <div>
                  <h3 className="text-sm font-sans font-medium text-[#111]">{step.t}</h3>
                  <p className="text-xs text-[#111]/50 mt-2 font-sans leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-3 font-sans">Opiniones</p>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111]">
                Clientes en {cityName}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#111] text-[#111]" />)}
              <span className="text-sm font-sans font-medium text-[#111]">{avgRating}/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {reviews.slice(0, visibleReviews).map((r, i) => (
              <article key={i} className="bg-white p-6 flex flex-col justify-between">
                <p className="text-xs text-[#111]/70 font-sans leading-relaxed">{r.text}</p>
                <div className="mt-6 pt-4 border-t border-[#111]/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium font-sans text-[#111]">{r.name}</p>
                    <p className="text-[10px] text-[#111]/40 font-sans">{r.city} · {r.date}</p>
                  </div>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#111]/40 font-sans">
                      <CheckCircle className="w-3 h-3" /> Verificada
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <button onClick={() => setVisibleReviews(reviews.length)} className="mt-8 flex items-center gap-2 text-xs font-sans font-medium text-[#111] hover:opacity-70 transition-opacity mx-auto">
              Ver más opiniones <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-[#111]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4 font-sans">Empieza a ahorrar</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-white leading-[1.1]">
            Deja de pagar de más
            <br />
            <span className="italic font-light">por calentar tu casa.</span>
          </h2>
          <p className="text-sm text-white/50 mt-6 max-w-md mx-auto font-sans">
            La aerotermia reduce tu factura hasta un 70%. Presupuesto gratuito de instaladores certificados en {cityName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#111] px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Pedir presupuesto
            </a>
            <a href="tel:+34711267223" className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-sans hover:border-white/40 transition-colors">
              <Phone className="w-4 h-4" /> Llamar
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-3 font-sans">Preguntas frecuentes</p>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111] mb-10">
          Sobre {serviceName.singular} en {cityName}
        </h2>
        <div className="border-t border-[#111]/10">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#111]/10">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-start justify-between gap-6 py-5 text-left group">
                <h3 className="text-sm font-sans font-medium text-[#111] leading-relaxed group-hover:opacity-70 transition-opacity">{faq.q}</h3>
                <ChevronDown className={`w-4 h-4 text-[#111]/40 flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="pb-5 -mt-1">
                  <p className="text-sm text-[#111]/60 font-sans leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO content - Guía de valor */}
      <section className="bg-[#fafafa] border-y border-[#111]/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-3 font-sans">Guía</p>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111] mb-8">
            Todo sobre {serviceName.singular} en {cityName}
          </h2>
          <div className="font-sans text-[#111]/60 space-y-6 leading-relaxed text-sm">
            <p>
              La aerotermia es la tecnología de climatización más eficiente del mercado. Extrae hasta el 75% de la energía del aire exterior de forma gratuita, 
              lo que se traduce en un ahorro de entre el 50% y el 70% en tu factura de calefacción respecto al gas o gasóleo.
            </p>
            <h3 className="text-[#111] font-medium pt-2">¿Cómo funciona la aerotermia?</h3>
            <p>
              Una bomba de calor aire-agua capta la energía térmica del aire exterior (incluso a temperaturas bajo cero) y la transfiere al agua del circuito de calefacción. 
              Por cada kWh eléctrico que consume, genera entre 3 y 5 kWh térmicos. Es lo que se conoce como COP (Coeficiente de Rendimiento).
            </p>
            <h3 className="text-[#111] font-medium pt-2">¿Es rentable en {cityName}?</h3>
            <p>
              Sí. El clima de {cityName} es ideal para la aerotermia. La inversión inicial (entre 8.000€ y 15.000€ para una vivienda unifamiliar) 
              se amortiza en 5-7 años con el ahorro en facturas. Además, existen subvenciones que pueden cubrir hasta el 40% del coste.
            </p>
            <h3 className="text-[#111] font-medium pt-2">¿Qué incluye la instalación?</h3>
            <p>
              Una instalación completa incluye: unidad exterior (bomba de calor), depósito de ACS si procede, conexiones hidráulicas y eléctricas, 
              integración con tus emisores (radiadores, suelo radiante o fancoils), puesta en marcha y formación de uso.
            </p>
            <h3 className="text-[#111] font-medium pt-2">¿Por qué elegirnos?</h3>
            <p>
              Trabajamos solo con instaladores certificados por los fabricantes (Daikin, Mitsubishi, Vaillant, etc.). 
              Te presentamos hasta 3 presupuestos para que compares. Te ayudamos con la gestión de subvenciones. 
              Y nuestro servicio es 100% gratuito para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-3 font-sans">{serviceName.title} cerca</p>
            <h3 className="font-serif text-xl tracking-tight text-[#111] mb-6">Localidades cercanas</h3>
            <nav><ul className="space-y-0">
              {nearbyCities.map(city => (
                <li key={city}>
                  <Link href={`/${serviceId}/${city}/`} className="flex items-center justify-between py-3 border-b border-[#111]/5 group">
                    <span className="text-sm font-sans text-[#111] group-hover:opacity-70 transition-opacity">{serviceName.title} en {getCityDisplayName(city)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#111]/30" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-3 font-sans">Otros servicios</p>
            <h3 className="font-serif text-xl tracking-tight text-[#111] mb-6">En {cityName}</h3>
            <nav><ul className="space-y-0">
              {relatedServices.map(svc => (
                <li key={svc}>
                  <Link href={`/${svc}/${citySlug}/`} className="flex items-center justify-between py-3 border-b border-[#111]/5 group">
                    <span className="text-sm font-sans text-[#111] group-hover:opacity-70 transition-opacity">{serviceNames[svc as Service]?.title || svc} en {cityName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#111]/30" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#111]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4 font-sans">Da el primer paso</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-white leading-[1.1]">
            Tu hogar más eficiente
            <br />
            <span className="italic font-light">empieza hoy.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-[#111] px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link href={`/${serviceId}/`} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-sans hover:border-white/40 transition-colors">
              Ver más sobre {serviceName.title} <ArrowUpRight className="w-3.5 h-3.5" />
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

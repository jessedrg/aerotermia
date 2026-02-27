import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VALID_SERVICES, type Service } from "@/lib/sitemap-data"
import { MessageCircle, ArrowRight, MapPin } from "lucide-react"

export const dynamicParams = true
export const revalidate = 604800

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

interface ServiceInfo {
  name: string
  title: string
  singular: string
  description: string
  benefits: string[]
  process: { step: string; desc: string }[]
  tips: string[]
  duration: string
  guarantee: string
}

const SERVICE_INFO: Record<Service, ServiceInfo> = {
  "aerotermia": {
    name: "Aerotermia", title: "Aerotermia", singular: "sistema de aerotermia",
    description: "La aerotermia es la tecnología más eficiente para climatizar tu hogar. Extrae energía del aire exterior para generar calefacción, refrigeración y agua caliente sanitaria. Hasta un 75% de la energía es gratuita del aire. Reduce tu factura energética y tu huella de carbono.",
    benefits: ["Ahorro de hasta 70% en calefacción", "Energía renovable y limpia", "Calefacción, refrigeración y ACS en uno", "Subvenciones disponibles", "Sin combustibles fósiles", "Bajo mantenimiento"],
    process: [
      { step: "Estudio energético", desc: "Analizamos tu vivienda: superficie, aislamiento, clima de la zona y necesidades de calefacción y ACS." },
      { step: "Dimensionado", desc: "Calculamos la potencia necesaria y seleccionamos el equipo óptimo para tu caso." },
      { step: "Presupuesto detallado", desc: "Incluye equipo, instalación, materiales y gestión de subvenciones si aplica." },
      { step: "Instalación", desc: "Colocación de unidad exterior, conexiones hidráulicas y eléctricas, integración con emisores." },
      { step: "Puesta en marcha", desc: "Configuración, pruebas de funcionamiento y formación de uso." },
      { step: "Garantía y mantenimiento", desc: "Garantía del fabricante y plan de mantenimiento preventivo." },
    ],
    tips: ["Verifica el aislamiento de tu vivienda antes de instalar", "La aerotermia funciona mejor con suelo radiante o radiadores de baja temperatura", "Compara el COP (coeficiente de rendimiento) entre equipos", "Infórmate sobre las subvenciones disponibles en tu comunidad", "El ruido de la unidad exterior es un factor a considerar"],
    duration: "2-5 días", guarantee: "5-10 años"
  },
  "bomba-calor": {
    name: "Bomba de Calor", title: "Bomba de Calor", singular: "bomba de calor",
    description: "La bomba de calor aire-agua es el corazón de un sistema de aerotermia. Capta energía térmica del aire exterior y la transfiere al agua del circuito de calefacción. Funciona incluso con temperaturas bajo cero. La alternativa más eficiente a las calderas de gas.",
    benefits: ["COP de 3 a 5: por cada kWh eléctrico genera 3-5 kWh térmicos", "Funciona hasta -20°C exterior", "Compatible con radiadores existentes", "Versiones monobloc y bibloc", "Tecnología inverter para máxima eficiencia", "Refrigerantes ecológicos R32 o R290"],
    process: [
      { step: "Evaluación", desc: "Analizamos tu instalación actual y necesidades térmicas." },
      { step: "Selección de equipo", desc: "Monobloc o bibloc, potencia adecuada, marca y modelo." },
      { step: "Preparación", desc: "Ubicación de unidad exterior, conexiones eléctricas y de agua." },
      { step: "Instalación", desc: "Montaje del equipo, conexión al circuito hidráulico existente." },
      { step: "Configuración", desc: "Programación de curvas de calefacción y parámetros óptimos." },
    ],
    tips: ["Monobloc es más fácil de instalar, bibloc más eficiente en climas fríos", "Verifica que tu instalación eléctrica soporta la potencia", "Los radiadores de aluminio funcionan mejor que los de hierro fundido", "Pide siempre el certificado de instalación", "El mantenimiento anual prolonga la vida útil"],
    duration: "1-3 días", guarantee: "5-7 años"
  },
  "aerotermia-radiadores": {
    name: "Aerotermia con Radiadores", title: "Aerotermia con Radiadores", singular: "aerotermia con radiadores",
    description: "Puedes instalar aerotermia aprovechando tus radiadores existentes. La clave está en usar radiadores de baja temperatura o sobredimensionados. Es la forma más económica de pasarte a la aerotermia sin cambiar toda la instalación de tu casa.",
    benefits: ["Aprovecha radiadores existentes", "Menor inversión inicial", "Sin obras de suelo", "Instalación más rápida", "Compatible con radiadores de aluminio", "Posibilidad de añadir refrigeración con fancoils"],
    process: [
      { step: "Evaluación de radiadores", desc: "Verificamos si tus radiadores actuales son compatibles o necesitan ampliación." },
      { step: "Cálculo térmico", desc: "Determinamos si los radiadores pueden trabajar a baja temperatura (45-55°C)." },
      { step: "Selección de bomba", desc: "Elegimos una bomba de calor optimizada para alta temperatura si es necesario." },
      { step: "Instalación", desc: "Sustitución de caldera por bomba de calor, manteniendo el circuito." },
      { step: "Ajustes", desc: "Equilibrado del circuito y configuración de temperaturas." },
    ],
    tips: ["Los radiadores de aluminio son los más compatibles", "Si tus radiadores son pequeños, puede que necesites añadir alguno más", "Las bombas de calor de alta temperatura (hasta 65°C) son ideales para radiadores antiguos", "El equilibrado hidráulico es clave para un buen funcionamiento", "Considera añadir un depósito de inercia"],
    duration: "1-2 días", guarantee: "5-7 años"
  },
  "aerotermia-suelo-radiante": {
    name: "Aerotermia con Suelo Radiante", title: "Aerotermia con Suelo Radiante", singular: "aerotermia con suelo radiante",
    description: "La combinación perfecta: aerotermia + suelo radiante. El suelo radiante trabaja a baja temperatura (30-35°C), lo que maximiza el rendimiento de la bomba de calor. Confort superior, eficiencia máxima y posibilidad de refrescar en verano.",
    benefits: ["Máxima eficiencia energética", "Confort térmico superior", "Calor uniforme sin corrientes", "Suelo refrescante en verano", "Sin radiadores visibles", "Ideal para obra nueva o reforma integral"],
    process: [
      { step: "Proyecto técnico", desc: "Diseño del circuito de suelo radiante según la geometría de cada estancia." },
      { step: "Preparación del suelo", desc: "Aislamiento, colocación de tuberías y colectores." },
      { step: "Vertido de mortero", desc: "Capa de mortero autonivelante que embebe las tuberías." },
      { step: "Instalación de aerotermia", desc: "Bomba de calor conectada al colector del suelo radiante." },
      { step: "Puesta en marcha", desc: "Llenado, purgado, pruebas de presión y configuración." },
    ],
    tips: ["El suelo radiante necesita 4-5 cm de altura adicional", "Funciona con cualquier pavimento, pero la cerámica es ideal", "El tiempo de respuesta es más lento que los radiadores", "En verano puede refrescar pero no sustituye al aire acondicionado", "Requiere termostatos por zona para máximo confort"],
    duration: "1-2 semanas", guarantee: "10-25 años"
  },
  "aerotermia-acs": {
    name: "Aerotermia para ACS", title: "Aerotermia para Agua Caliente", singular: "aerotermia para ACS",
    description: "La aerotermia puede producir agua caliente sanitaria (ACS) con un rendimiento 3-4 veces superior al termo eléctrico. Existen equipos compactos solo para ACS o sistemas integrados que también dan calefacción. Agua caliente ilimitada con mínimo consumo.",
    benefits: ["Ahorro de hasta 70% vs termo eléctrico", "Agua caliente ilimitada", "Equipos compactos disponibles", "Combinable con calefacción", "Sin gas ni combustibles", "Bajo mantenimiento"],
    process: [
      { step: "Evaluación de consumo", desc: "Calculamos tus necesidades de ACS según personas y hábitos." },
      { step: "Selección de equipo", desc: "Bomba de calor ACS compacta o sistema integrado con calefacción." },
      { step: "Ubicación", desc: "La unidad necesita espacio y ventilación (interior o exterior)." },
      { step: "Instalación", desc: "Conexión a la red de agua fría y caliente, y a la electricidad." },
      { step: "Configuración", desc: "Programación de horarios y temperaturas óptimas." },
    ],
    tips: ["Un depósito de 200L es suficiente para 3-4 personas", "Los equipos compactos caben en un armario", "Programa la producción de ACS en horas valle si tienes discriminación horaria", "La legionela se previene con ciclos periódicos a alta temperatura", "Combinar con placas solares maximiza el ahorro"],
    duration: "1 día", guarantee: "5-7 años"
  },
  "aerotermia-piscina": {
    name: "Aerotermia para Piscina", title: "Aerotermia para Piscina", singular: "aerotermia para piscina",
    description: "Climatiza tu piscina con aerotermia y alarga la temporada de baño de abril a octubre. Las bombas de calor para piscina son muy eficientes porque trabajan a baja temperatura (26-30°C). Disfruta de tu piscina sin facturas desorbitadas.",
    benefits: ["Alarga la temporada 4-5 meses", "Coste de funcionamiento muy bajo", "Temperatura constante y agradable", "Instalación sencilla", "Compatible con cualquier piscina", "Amortización en 2-3 temporadas"],
    process: [
      { step: "Cálculo de potencia", desc: "Según el volumen de la piscina, ubicación y uso deseado." },
      { step: "Selección de equipo", desc: "Bomba de calor específica para piscina, con carcasa anticorrosión." },
      { step: "Ubicación", desc: "Cerca de la depuradora, con buena ventilación y desagüe." },
      { step: "Instalación", desc: "Conexión al circuito de filtración, entre filtro y retornos." },
      { step: "Configuración", desc: "Ajuste de temperatura deseada y horarios de funcionamiento." },
    ],
    tips: ["Usa manta térmica para reducir pérdidas nocturnas hasta un 70%", "La bomba debe funcionar solo cuando la depuradora está en marcha", "En zonas frías, considera modelos con resistencia de apoyo", "El COP es mayor cuanto más caliente está el aire exterior", "Dimensiona con margen: es mejor que sobre potencia"],
    duration: "1 día", guarantee: "3-5 años"
  },
  "instalacion-aerotermia": {
    name: "Instalación de Aerotermia", title: "Instalación de Aerotermia", singular: "instalación de aerotermia",
    description: "La instalación profesional de aerotermia es clave para el rendimiento del sistema. Incluye estudio previo, dimensionado correcto, instalación según normativa, puesta en marcha y formación. Solo instaladores certificados garantizan el resultado.",
    benefits: ["Instaladores certificados por fabricante", "Cumplimiento de normativa RITE", "Garantía de fabricante válida", "Puesta en marcha profesional", "Formación de uso incluida", "Servicio post-venta"],
    process: [
      { step: "Visita técnica", desc: "Evaluación in situ de la vivienda, instalaciones existentes y necesidades." },
      { step: "Proyecto y presupuesto", desc: "Documentación técnica completa y presupuesto detallado." },
      { step: "Instalación", desc: "Montaje de equipos, conexiones hidráulicas, eléctricas y de control." },
      { step: "Pruebas", desc: "Verificación de estanqueidad, presiones y funcionamiento." },
      { step: "Puesta en marcha", desc: "Configuración óptima y registro en el fabricante." },
      { step: "Formación", desc: "Te enseñamos a usar el sistema y el termostato." },
    ],
    tips: ["Exige siempre el certificado de instalación", "Verifica que el instalador está autorizado por el fabricante", "La garantía del equipo depende de una instalación correcta", "Pide el manual de uso y mantenimiento", "Programa una revisión anual"],
    duration: "2-5 días", guarantee: "2 años instalación + garantía equipo"
  },
  "mantenimiento-aerotermia": {
    name: "Mantenimiento de Aerotermia", title: "Mantenimiento de Aerotermia", singular: "mantenimiento de aerotermia",
    description: "El mantenimiento preventivo de aerotermia asegura el máximo rendimiento y prolonga la vida útil del equipo. Incluye limpieza de filtros, verificación de presiones, comprobación de refrigerante y ajuste de parámetros. Recomendado una vez al año.",
    benefits: ["Mantiene la eficiencia óptima", "Previene averías costosas", "Prolonga la vida útil", "Garantiza la seguridad", "Detecta problemas a tiempo", "Cumple con normativa"],
    process: [
      { step: "Inspección visual", desc: "Revisión del estado general de unidad interior y exterior." },
      { step: "Limpieza", desc: "Filtros, batería del evaporador y condensador." },
      { step: "Verificación hidráulica", desc: "Presiones, caudales, estado del vaso de expansión." },
      { step: "Comprobación eléctrica", desc: "Consumos, conexiones, estado de componentes." },
      { step: "Verificación de refrigerante", desc: "Presiones y temperaturas del circuito frigorífico." },
      { step: "Informe", desc: "Documento con el estado del equipo y recomendaciones." },
    ],
    tips: ["Limpia los filtros de la unidad interior cada 3 meses", "Mantén la unidad exterior libre de hojas y suciedad", "No tapes ni obstruyas las rejillas de ventilación", "Si notas ruidos extraños o bajada de rendimiento, llama al técnico", "Guarda todos los informes de mantenimiento"],
    duration: "1-2 horas", guarantee: "Garantía de intervención"
  },
  "aerotermia-vivienda-unifamiliar": {
    name: "Aerotermia Vivienda Unifamiliar", title: "Aerotermia para Chalet", singular: "aerotermia para vivienda unifamiliar",
    description: "La aerotermia es ideal para viviendas unifamiliares y chalets. Mayor superficie significa mayor ahorro. Puedes climatizar toda la casa con un único sistema: calefacción, refrigeración, agua caliente e incluso piscina. La inversión se amortiza en 5-7 años.",
    benefits: ["Solución integral para toda la casa", "Mayor ahorro en viviendas grandes", "Posibilidad de zonificación", "Compatible con piscina", "Subvenciones más altas", "Aumento del valor de la vivienda"],
    process: [
      { step: "Estudio energético completo", desc: "Análisis de toda la vivienda: orientación, aislamiento, superficie por planta." },
      { step: "Diseño del sistema", desc: "Selección de potencia, tipo de emisores por zona, integración de ACS." },
      { step: "Presupuesto integral", desc: "Incluye todo: equipos, instalación, emisores si procede, y gestión de ayudas." },
      { step: "Instalación por fases", desc: "Planificación para minimizar molestias, especialmente si hay suelo radiante." },
      { step: "Puesta en marcha y formación", desc: "Configuración de zonas, programación y explicación del sistema." },
    ],
    tips: ["Considera zonificar por plantas o áreas de uso", "El suelo radiante en planta baja y radiadores en planta alta es una buena combinación", "Si tienes piscina, dimensiona la bomba para cubrir también esa demanda", "Las subvenciones pueden cubrir hasta el 40% de la inversión", "Pide siempre certificado energético antes y después"],
    duration: "3-7 días", guarantee: "5-10 años"
  },
  "aerotermia-piso": {
    name: "Aerotermia para Piso", title: "Aerotermia para Piso", singular: "aerotermia para piso",
    description: "Sí, puedes instalar aerotermia en un piso. Existen soluciones compactas y de baja potencia perfectas para apartamentos. La unidad exterior se coloca en terraza, balcón o fachada (con permiso de comunidad). Ideal para sustituir calderas individuales de gas.",
    benefits: ["Soluciones compactas para pisos", "Unidades exteriores silenciosas", "Sustituye caldera de gas", "Ahorro significativo", "Sin combustión ni humos", "Mejora certificación energética"],
    process: [
      { step: "Evaluación de viabilidad", desc: "Verificamos espacio para unidad exterior y potencia eléctrica disponible." },
      { step: "Permisos", desc: "Gestión de autorización de comunidad si es necesario." },
      { step: "Selección de equipo", desc: "Equipos compactos y silenciosos específicos para pisos." },
      { step: "Instalación", desc: "Mínima obra, aprovechando instalación existente de radiadores." },
      { step: "Puesta en marcha", desc: "Configuración y pruebas de funcionamiento." },
    ],
    tips: ["Verifica que tienes espacio en terraza o balcón para la unidad exterior", "Los equipos monobloc son más fáciles de instalar en pisos", "Consulta con la comunidad antes de instalar", "La potencia eléctrica contratada puede necesitar ampliación", "Los modelos de alta temperatura son mejores para radiadores antiguos"],
    duration: "1-2 días", guarantee: "5-7 años"
  },
}

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

const MAIN_CITIES = [
  "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga",
  "murcia", "palma-de-mallorca", "las-palmas-de-gran-canaria", "bilbao",
  "alicante", "cordoba", "valladolid", "vigo", "gijon", "hospitalet-de-llobregat",
  "vitoria-gasteiz", "la-coruna", "granada", "elche", "oviedo", "terrassa",
  "badalona", "cartagena", "jerez-de-la-frontera", "sabadell", "mostoles",
  "santa-cruz-de-tenerife", "alcala-de-henares", "pamplona", "fuenlabrada",
  "almeria", "san-sebastian", "leganes", "santander", "burgos", "albacete",
  "getafe", "salamanca", "logrono", "huelva", "badajoz", "tarragona",
  "lleida", "marbella", "leon", "cadiz", "dos-hermanas", "torrevieja",
]

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) return { title: "No encontrado" }

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  return {
    title: `${serviceInfo.title} en España | Instaladores Certificados | aero.`,
    description: `${serviceInfo.description} Servicio en toda España. Presupuestos gratis.`,
    alternates: { canonical: `https://aerotermiaespana.com/${serviceId}/` },
    openGraph: { title: `${serviceInfo.title} en España`, description: serviceInfo.description, type: "website", siteName: "aero." },
  }
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) notFound()

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["aerotermia"]
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt={serviceInfo.title} className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
            <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
              <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-background/60">{serviceInfo.title}</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
              {serviceInfo.title}
              <br />
              <span className="italic font-light">en toda España</span>
            </h1>
            <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
              {serviceInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> Presupuesto gratis
              </a>
              <a href="#ciudades" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
                Ver ciudades <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ventajas</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                ¿Por qué elegir {serviceInfo.singular}?
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Trabajamos solo con profesionales verificados que garantizan resultados excepcionales.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid sm:grid-cols-2 gap-4">
                {serviceInfo.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-secondary/50">
                    <span className="text-xs text-muted-foreground font-mono mt-0.5">0{i + 1}</span>
                    <span className="text-sm text-foreground font-sans">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">El proceso</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Cómo trabajamos
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Nuestros profesionales verificados siguen un proceso claro para garantizar tu satisfacción.
              </p>
              <div className="mt-6 p-4 bg-secondary/50">
                <p className="text-xs text-muted-foreground font-sans">Duración estimada</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.duration}</p>
                <p className="text-xs text-muted-foreground font-sans mt-3">Garantía</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.guarantee}</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6">
                {serviceInfo.process.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-foreground text-background flex items-center justify-center font-serif text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-sans font-medium text-foreground">{step.step}</h3>
                      <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consejos */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Consejos</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Lo que debes saber
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Antes de empezar tu proyecto, ten en cuenta estos consejos de nuestros expertos:
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="space-y-4">
                {serviceInfo.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 border border-border">
                    <svg className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-foreground font-sans">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ciudades principales */}
        <section id="ciudades" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-4 mb-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ciudades</p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
                {serviceInfo.title}
                <br />
                <span className="italic font-light">cerca de ti</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Selecciona tu ciudad para ver profesionales verificados en tu zona. Servicio disponible en más de 8.000 localidades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {MAIN_CITIES.map(city => (
              <Link
                key={city}
                href={`/${serviceId}/${city}/`}
                className="group flex items-center gap-2 p-4 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                <span className="text-sm font-sans text-foreground truncate">{getCityDisplayName(city)}</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              ¿No encuentras tu ciudad? <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:no-underline">Escríbenos por WhatsApp</a> y te conectamos con profesionales de tu zona.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
              {serviceInfo.title} profesional
              <br />
              <span className="italic font-light">con garantía</span>
            </h2>
            <p className="text-sm text-background/50 mt-6 font-sans max-w-md mx-auto">
              Profesionales verificados. Presupuestos gratis. Resultados garantizados.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Contactar ahora
            </a>
          </div>
        </section>

        {/* Otros servicios */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">También te puede interesar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(svc => (
              <Link
                key={svc}
                href={`/${svc}/`}
                className="group p-6 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <h3 className="text-sm font-sans font-medium text-foreground group-hover:underline">{SERVICE_INFO[svc as Service]?.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{SERVICE_INFO[svc as Service]?.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VALID_SERVICES, type Service } from "@/lib/sitemap-data"
import { MessageCircle, ArrowRight, MapPin, Phone, Zap, Thermometer, Leaf, PiggyBank, Award, CheckCircle } from "lucide-react"

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
    alternates: { canonical: `https://aerotermiaesp.com/${serviceId}/` },
    openGraph: { title: `${serviceInfo.title} en España`, description: serviceInfo.description, type: "website", siteName: "aero." },
  }
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) notFound()

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  const valueProps = SERVICE_VALUE_PROPS[serviceId] || SERVICE_VALUE_PROPS["aerotermia"]
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero - Boutique minimal sin imagen */}
        <section className="bg-[#fafafa] border-b border-[#111]/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
            <nav className="text-[10px] tracking-[0.3em] uppercase text-[#111]/30 mb-12 font-sans flex items-center gap-2">
              <Link href="/" className="hover:text-[#111]/60 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-[#111]/50">{serviceInfo.title}</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#111] leading-[1.05]">
                {serviceInfo.title}
                <br />
                <span className="italic font-light">en toda España</span>
              </h1>

              <p className="text-base sm:text-lg text-[#111]/50 mt-8 font-sans leading-relaxed max-w-xl">
                {serviceInfo.description}
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
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Instaladores certificados</span>
                <span className="text-[#111]/20">|</span>
                <span>Presupuesto en 48h</span>
                <span className="text-[#111]/20">|</span>
                <span>100% gratuito</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="border-b border-[#111]/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-8 font-sans">Por qué {serviceInfo.singular}</p>
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

        {/* Proceso */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-4 font-sans">El proceso</p>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111] leading-[1.15]">
                Cómo trabajamos
              </h2>
              <p className="text-sm text-[#111]/50 mt-6 font-sans leading-relaxed">
                Te conectamos con instaladores certificados de tu zona. Sin intermediarios, sin comisiones ocultas.
              </p>
              <div className="mt-8 p-5 bg-[#fafafa] border border-[#111]/5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#111]/30 font-sans">Duración</p>
                    <p className="text-lg font-serif text-[#111] mt-1">{serviceInfo.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-[#111]/30 font-sans">Garantía</p>
                    <p className="text-lg font-serif text-[#111] mt-1">{serviceInfo.guarantee}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              {serviceInfo.process.slice(0, 5).map((step, i) => (
                <div key={i} className={`flex gap-6 py-5 ${i < 4 ? "border-b border-[#111]/5" : ""}`}>
                  <span className="font-serif text-2xl text-[#111]/10 flex-shrink-0 w-8">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-sm font-sans font-medium text-[#111]">{step.step}</h3>
                    <p className="text-xs text-[#111]/50 mt-2 font-sans leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consejos */}
        <section className="bg-[#fafafa] border-y border-[#111]/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-4 font-sans">Consejos</p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111] mb-10">
              Lo que debes saber
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {serviceInfo.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white border border-[#111]/5">
                  <CheckCircle className="w-4 h-4 text-[#111] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#111]/70 font-sans leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ciudades principales */}
        <section id="ciudades" className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-4 font-sans">Ciudades</p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111]">
              {serviceInfo.title} cerca de ti
            </h2>
            <p className="text-sm text-[#111]/50 mt-4 font-sans max-w-lg">
              Selecciona tu ciudad para ver instaladores certificados en tu zona. Servicio disponible en más de 8.000 localidades.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {MAIN_CITIES.map(city => (
              <Link
                key={city}
                href={`/${serviceId}/${city}/`}
                className="group flex items-center gap-2 p-3 border border-[#111]/5 hover:border-[#111]/20 hover:bg-[#fafafa] transition-all"
              >
                <MapPin className="w-3 h-3 text-[#111]/30 group-hover:text-[#111] transition-colors flex-shrink-0" />
                <span className="text-xs font-sans text-[#111] truncate">{getCityDisplayName(city)}</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-[#111]/50 font-sans">
              ¿No encuentras tu ciudad? <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-[#111] underline underline-offset-4 hover:no-underline">Escríbenos por WhatsApp</a>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#111]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4 font-sans">Empieza a ahorrar</p>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-white leading-[1.1]">
              {serviceInfo.title} profesional
              <br />
              <span className="italic font-light">con garantía</span>
            </h2>
            <p className="text-sm text-white/50 mt-6 font-sans max-w-md mx-auto">
              Instaladores certificados. Presupuestos gratis. Resultados garantizados.
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

        {/* Otros servicios */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#111]/30 mb-4 font-sans">Otros servicios</p>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#111] mb-10">También te puede interesar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(svc => (
              <Link
                key={svc}
                href={`/${svc}/`}
                className="group p-5 border border-[#111]/5 hover:border-[#111]/20 hover:bg-[#fafafa] transition-all"
              >
                <h3 className="text-sm font-sans font-medium text-[#111] group-hover:underline">{SERVICE_INFO[svc as Service]?.title}</h3>
                <p className="text-xs text-[#111]/50 mt-2 line-clamp-2 leading-relaxed">{SERVICE_INFO[svc as Service]?.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[#111]/40 mt-3 font-sans">
                  Ver más <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

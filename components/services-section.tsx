import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    id: "aerotermia",
    title: "Aerotermia",
    desc: "Sistema completo de calefaccion, refrigeracion y agua caliente. Ahorra hasta un 70% en energia.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "bomba-calor",
    title: "Bomba de calor",
    desc: "Aire-agua de alta eficiencia. Monobloc o bibloc segun tu vivienda.",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop",
    span: "",
  },
  {
    id: "aerotermia-suelo-radiante",
    title: "Suelo radiante",
    desc: "La combinacion perfecta. Maximo confort y eficiencia energetica.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    span: "",
  },
  {
    id: "aerotermia-radiadores",
    title: "Con radiadores",
    desc: "Aprovecha tus radiadores existentes. Instalacion rapida y economica.",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop",
    span: "",
  },
  {
    id: "aerotermia-acs",
    title: "Agua caliente",
    desc: "ACS con aerotermia. Agua caliente ilimitada con minimo consumo.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    span: "",
  },
  {
    id: "aerotermia-piscina",
    title: "Piscina climatizada",
    desc: "Alarga la temporada de bano. Eficiencia maxima para tu piscina.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
    span: "md:col-span-2",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-4 mb-16 lg:mb-24">
        <div className="lg:col-span-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Servicios</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05]">
            Soluciones de aerotermia
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-8 flex items-end">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Calefaccion, refrigeracion y agua caliente con energia renovable. Instaladores certificados en toda España.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {services.map((svc) => (
          <Link
            key={svc.id}
            href={`/${svc.id}/`}
            className={`group relative overflow-hidden bg-secondary aspect-[4/3] ${svc.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svc.img}
              alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 bg-foreground/40 group-hover:bg-foreground/60 transition-colors duration-500">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-xl sm:text-2xl text-background transition-colors duration-500">{svc.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-background/60 group-hover:text-background transition-colors duration-500" />
              </div>
              <p className="text-xs text-background/70 group-hover:text-background/90 transition-colors duration-500 max-w-xs font-sans">
                {svc.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

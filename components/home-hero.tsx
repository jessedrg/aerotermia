import { MessageCircle, ArrowDown, Zap } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end bg-foreground text-background overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
          alt="Sistema de aerotermia moderno"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 pt-32">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1.5 rounded-full text-xs font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Ahorra hasta un 70% en calefacción
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-background leading-[0.9]">
              Aerotermia,
              <br />
              <span className="italic font-light">energía del aire.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <p className="text-sm text-background/60 font-sans leading-relaxed max-w-sm lg:ml-auto mb-8">
              Instalamos sistemas de aerotermia en toda España. Calefacción, refrigeración y agua caliente con energía renovable. Presupuesto gratis.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
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
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-8 py-4 text-sm font-sans hover:border-background/60 transition-colors"
              >
                Ver servicios
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-px mt-16 lg:mt-24 border-t border-background/10 pt-8">
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">70%</p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Ahorro en calefacción</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">8.000+</p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Municipios cubiertos</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">100%</p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Instaladores certificados</p>
          </div>
        </div>
      </div>
    </section>
  )
}

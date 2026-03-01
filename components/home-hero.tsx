import { MessageCircle, ArrowDown } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

export function HomeHero() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-[#fafafa] pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#111] leading-[1.1] tracking-tight">
            La aerotermia extrae energía
            <br />
            <span className="text-[#111]/40">del aire para calentar tu casa.</span>
          </h1>

          <p className="mt-8 text-lg lg:text-xl text-[#111]/60 max-w-2xl mx-auto leading-relaxed">
            Una bomba de calor captura la energía térmica del aire exterior —incluso en invierno— 
            y la transfiere al interior. Por cada kWh eléctrico que consume, genera 4-5 kWh de calor.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#111] hover:bg-[#333] text-white px-8 py-4 text-base font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir presupuesto
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 border border-[#111]/20 hover:border-[#111]/40 text-[#111] px-8 py-4 text-base transition-colors"
            >
              Cómo funciona
            </a>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-5xl lg:text-6xl font-serif text-[#111]">75%</p>
            <p className="text-sm text-[#111]/50 mt-3">de la energía es gratuita, extraída del aire</p>
          </div>
          <div>
            <p className="text-5xl lg:text-6xl font-serif text-[#111]">70%</p>
            <p className="text-sm text-[#111]/50 mt-3">de ahorro frente a gasoil o gas</p>
          </div>
          <div>
            <p className="text-5xl lg:text-6xl font-serif text-[#111]">25</p>
            <p className="text-sm text-[#111]/50 mt-3">años de vida útil del equipo</p>
          </div>
        </div>
      </div>

      <div className="pb-8 flex justify-center">
        <a href="#como-funciona" className="flex flex-col items-center gap-2 text-[#111]/30 hover:text-[#111]/60 transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

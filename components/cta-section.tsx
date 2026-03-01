import { MessageCircle } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

export function CtaSection() {
  return (
    <section className="bg-[#111] py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15]">
          Calcula cuánto puedes ahorrar
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
          Cuéntanos tu situación actual y te enviamos una estimación personalizada. Sin compromiso.
        </p>
        <div className="mt-10">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#111] px-8 py-4 text-base font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Pedir presupuesto
          </a>
        </div>
        <p className="mt-8 text-sm text-white/40">
          Instaladores certificados en más de 8.000 municipios de España
        </p>
      </div>
    </section>
  )
}

import Link from "next/link"
import { MessageCircle } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

const solutions = [
  {
    id: "aerotermia-radiadores",
    title: "Con radiadores",
    desc: "Aprovecha tus radiadores existentes. Solo sustituimos la caldera. Instalación en 1-2 días.",
    price: "6.500 – 10.000€",
    savings: "50-60%",
  },
  {
    id: "aerotermia-suelo-radiante",
    title: "Con suelo radiante",
    desc: "La combinación más eficiente. Calor uniforme desde el suelo. Ideal para obra nueva.",
    price: "12.000 – 18.000€",
    savings: "65-75%",
  },
  {
    id: "aerotermia-acs",
    title: "Solo agua caliente",
    desc: "Bomba de calor para ACS. Sustituye tu termo o calentador. Agua caliente ilimitada.",
    price: "2.200 – 3.500€",
    savings: "70%",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-[#fafafa] py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111] leading-[1.15]">
            Tres formas de instalar aerotermia
          </h2>
          <p className="mt-6 text-lg text-[#111]/60">
            Cada vivienda es diferente. Te ayudamos a elegir la mejor opción.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#111]/10">
          {solutions.map((sol) => (
            <Link
              key={sol.id}
              href={`/${sol.id}/`}
              className="group bg-white p-8 lg:p-10 hover:bg-[#111] transition-colors duration-300"
            >
              <h3 className="font-serif text-xl text-[#111] group-hover:text-white mb-3 transition-colors">
                {sol.title}
              </h3>
              <p className="text-sm text-[#111]/60 group-hover:text-white/60 leading-relaxed mb-8 transition-colors">
                {sol.desc}
              </p>
              <div className="space-y-2 pt-6 border-t border-[#111]/10 group-hover:border-white/10 transition-colors">
                <div className="flex justify-between text-sm">
                  <span className="text-[#111]/40 group-hover:text-white/40 transition-colors">Precio</span>
                  <span className="text-[#111] group-hover:text-white transition-colors">{sol.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#111]/40 group-hover:text-white/40 transition-colors">Ahorro</span>
                  <span className="text-[#111] group-hover:text-white transition-colors">{sol.savings}</span>
                </div>
              </div>
              <div className="mt-6 text-sm text-[#111]/40 group-hover:text-white/60 transition-colors">
                Ver más →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#111]/60 mb-6">¿No sabes qué opción elegir?</p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#111] hover:bg-[#333] text-white px-8 py-4 text-base font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Te asesoramos gratis
          </a>
        </div>
      </div>
    </section>
  )
}

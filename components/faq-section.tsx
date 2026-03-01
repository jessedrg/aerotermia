"use client"

import { useState } from "react"

const faqs = [
  {
    q: "¿Cuánto cuesta instalar aerotermia?",
    a: "Entre 6.500€ y 18.000€ dependiendo del tipo de emisores (radiadores, suelo radiante) y la potencia necesaria. Incluye equipo, instalación y puesta en marcha.",
  },
  {
    q: "¿Cuánto se ahorra con aerotermia?",
    a: "Entre un 50% y un 70% frente a gasoil o gas. Una vivienda que gasta 2.400€/año en gasoil puede pasar a 800€/año con aerotermia.",
  },
  {
    q: "¿Funciona cuando hace frío?",
    a: "Sí. Las bombas de calor modernas funcionan eficientemente hasta -20°C. En España el rendimiento es excelente todo el año.",
  },
  {
    q: "¿Puedo usar mis radiadores actuales?",
    a: "En la mayoría de casos, sí. Los radiadores de aluminio funcionan muy bien. Los de hierro fundido pueden requerir ajustes.",
  },
  {
    q: "¿Hay subvenciones?",
    a: "Sí. Plan Moves III (hasta 3.000€), ayudas autonómicas (1.000-5.000€) y deducciones en IRPF. Gestionamos las ayudas por ti.",
  },
  {
    q: "¿Cuánto dura la instalación?",
    a: "Con radiadores existentes, 1-2 días. Con suelo radiante en obra nueva, 1-2 semanas.",
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-[#fafafa] py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111] leading-[1.15]">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="divide-y divide-[#111]/10">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-[#111] leading-relaxed">{faq.q}</span>
                <span className="text-[#111]/30 text-xl flex-shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                <p className="text-[#111]/60 leading-relaxed pr-12">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Cuanto cuesta instalar aerotermia?",
    a: "El precio depende de la potencia necesaria, el tipo de emisores y la complejidad de la instalacion. Un sistema completo para una vivienda unifamiliar suele oscilar entre 8.000-15.000€. aero. te presenta presupuestos detallados de instaladores certificados para que compares con informacion real.",
  },
  {
    q: "Cuanto se ahorra con aerotermia?",
    a: "La aerotermia puede reducir tu factura de calefaccion entre un 50% y un 70% respecto al gas o gasoil. El ahorro exacto depende del aislamiento de tu vivienda, el clima de tu zona y tus habitos de consumo. La inversion se amortiza en 5-7 años.",
  },
  {
    q: "El servicio de aero. tiene algun coste?",
    a: "No. Nuestro asesoramiento es 100% gratuito. Te conectamos con instaladores certificados, te presentamos presupuestos y te acompanamos durante la instalacion. Sin comisiones, sin costes ocultos.",
  },
  {
    q: "Puedo instalar aerotermia con mis radiadores actuales?",
    a: "Si, en la mayoria de casos. Los radiadores de aluminio funcionan muy bien con aerotermia. Los de hierro fundido pueden requerir una bomba de calor de alta temperatura o añadir algun radiador adicional. Nuestros tecnicos evaluan tu instalacion antes de presupuestar.",
  },
  {
    q: "Hay subvenciones para aerotermia?",
    a: "Si. Existen ayudas europeas, estatales y autonomicas que pueden cubrir entre el 20% y el 40% de la inversion. Los instaladores de nuestra red te ayudan con la gestion de las subvenciones disponibles en tu comunidad.",
  },
  {
    q: "Trabajais en toda España?",
    a: "Si. Tenemos instaladores certificados en mas de 8.000 municipios de toda España. Desde grandes ciudades hasta localidades pequenas.",
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
      <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground mb-16">
        Preguntas frecuentes
      </h2>

      <div className="border-t border-border">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
            >
              <h3 className="text-sm font-sans font-medium text-foreground leading-relaxed group-hover:opacity-70 transition-opacity">
                {faq.q}
              </h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-6" : "max-h-0"}`}>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed -mt-2">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const cases = [
  {
    type: "Chalet 220m²",
    location: "Madrid",
    before: "Gasoil",
    after: "Daikin 14kW + radiadores",
    cost: "11.200€",
    savings: "1.820€/año",
    payback: "2,7 años",
  },
  {
    type: "Piso 95m²",
    location: "Barcelona",
    before: "Gas natural",
    after: "Vaillant 7kW + fancoils",
    cost: "8.900€",
    savings: "880€/año",
    payback: "3,2 años",
  },
  {
    type: "Casa 180m²",
    location: "Valencia",
    before: "Butano + splits",
    after: "Mitsubishi 11kW + suelo radiante",
    cost: "18.500€",
    savings: "1.450€/año",
    payback: "4,1 años",
  },
]

export function ReviewsSection() {
  return (
    <section id="casos" className="bg-white py-24 lg:py-32 border-t border-[#111]/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111] leading-[1.15]">
            Casos reales
          </h2>
          <p className="mt-6 text-lg text-[#111]/60">
            Datos de inversión, ahorro y amortización en instalaciones recientes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#111]/10">
                <th className="text-left py-4 font-medium text-[#111]/40">Vivienda</th>
                <th className="text-left py-4 font-medium text-[#111]/40">Antes</th>
                <th className="text-left py-4 font-medium text-[#111]/40">Solución</th>
                <th className="text-right py-4 font-medium text-[#111]/40">Inversión</th>
                <th className="text-right py-4 font-medium text-[#111]/40">Ahorro/año</th>
                <th className="text-right py-4 font-medium text-[#111]/40">Amortización</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c, i) => (
                <tr key={i} className="border-b border-[#111]/5">
                  <td className="py-5">
                    <span className="text-[#111]">{c.type}</span>
                    <span className="text-[#111]/40 ml-2">{c.location}</span>
                  </td>
                  <td className="py-5 text-[#111]/60">{c.before}</td>
                  <td className="py-5 text-[#111]">{c.after}</td>
                  <td className="py-5 text-right text-[#111]">{c.cost}</td>
                  <td className="py-5 text-right text-[#111]">{c.savings}</td>
                  <td className="py-5 text-right text-[#111] font-medium">{c.payback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#111]/40 mt-8 text-center">
          Datos reales de instalaciones realizadas en 2024. Ahorro calculado frente al sistema anterior.
        </p>
      </div>
    </section>
  )
}

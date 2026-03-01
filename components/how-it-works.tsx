export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-24 lg:py-32 border-t border-[#111]/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111] leading-[1.15]">
            ¿Cómo funciona?
          </h2>
          <p className="mt-6 text-lg text-[#111]/60 leading-relaxed">
            La aerotermia aprovecha un principio físico simple: el aire siempre contiene energía térmica, 
            incluso cuando está frío. Una bomba de calor captura esa energía y la amplifica.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 border border-[#111]/10 flex items-center justify-center">
              <span className="font-serif text-2xl text-[#111]/30">1</span>
            </div>
            <h3 className="font-medium text-[#111] mb-2">Captación</h3>
            <p className="text-sm text-[#111]/60 leading-relaxed">
              Un ventilador aspira aire exterior. A 7°C ya hay suficiente energía para calentar tu casa.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 border border-[#111]/10 flex items-center justify-center">
              <span className="font-serif text-2xl text-[#111]/30">2</span>
            </div>
            <h3 className="font-medium text-[#111] mb-2">Compresión</h3>
            <p className="text-sm text-[#111]/60 leading-relaxed">
              Un compresor eleva la temperatura del refrigerante hasta 55-65°C usando electricidad.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 border border-[#111]/10 flex items-center justify-center">
              <span className="font-serif text-2xl text-[#111]/30">3</span>
            </div>
            <h3 className="font-medium text-[#111] mb-2">Transferencia</h3>
            <p className="text-sm text-[#111]/60 leading-relaxed">
              El calor pasa al circuito de agua que alimenta radiadores, suelo radiante o fancoils.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 border border-[#111]/10 flex items-center justify-center">
              <span className="font-serif text-2xl text-[#111]/30">4</span>
            </div>
            <h3 className="font-medium text-[#111] mb-2">Ciclo</h3>
            <p className="text-sm text-[#111]/60 leading-relaxed">
              El refrigerante se enfría y vuelve al inicio. El proceso se repite continuamente.
            </p>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-[#111]/5">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl text-[#111] text-center mb-12">
              Comparativa de costes anuales
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#111]/60">Gasoil</span>
                  <span className="text-[#111]">~2.400€/año</span>
                </div>
                <div className="h-2 bg-[#111]/5">
                  <div className="h-full bg-[#111]/30 w-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#111]/60">Gas natural</span>
                  <span className="text-[#111]">~1.800€/año</span>
                </div>
                <div className="h-2 bg-[#111]/5">
                  <div className="h-full bg-[#111]/30 w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#111]">Aerotermia</span>
                  <span className="text-[#111] font-medium">~720€/año</span>
                </div>
                <div className="h-2 bg-[#111]/5">
                  <div className="h-full bg-[#111] w-[30%]" />
                </div>
              </div>
            </div>
            <p className="text-xs text-[#111]/40 mt-6 text-center">
              Estimación para vivienda de 150m² en zona climática D (Madrid, interior peninsular)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

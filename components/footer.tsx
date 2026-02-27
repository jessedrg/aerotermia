import Link from "next/link"
import { MessageCircle, Mail, MapPin } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-serif italic text-background tracking-tight">aero.</Link>
            <p className="text-background/50 text-xs mt-4 leading-relaxed max-w-xs">
              Instalación de aerotermia en toda España. Ahorra hasta un 70% en calefacción con energía renovable. Presupuesto gratis de instaladores certificados.
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-4">Servicios</p>
            <ul className="space-y-2.5">
              {["Aerotermia", "Bomba de calor", "Suelo radiante", "Radiadores", "Mantenimiento"].map(s => (
                <li key={s}><Link href="/" className="text-xs text-background/60 hover:text-background transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-4">Ciudades</p>
            <ul className="space-y-2.5">
              {["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Malaga"].map(c => (
                <li key={c}><Link href={`/aerotermia/${c.toLowerCase()}/`} className="text-xs text-background/60 hover:text-background transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-4">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-background/60 hover:text-background transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hola@aerotermiaespana.com" className="flex items-center gap-2 text-xs text-background/60 hover:text-background transition-colors">
                  <Mail className="w-3.5 h-3.5" /> hola@aerotermiaespana.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-background/60">
                <MapPin className="w-3.5 h-3.5" /> España
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-background/30">© {new Date().getFullYear()} aero. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-[10px] text-background/30">
            <Link href="/" className="hover:text-background/60 transition-colors">Privacidad</Link>
            <Link href="/" className="hover:text-background/60 transition-colors">Legal</Link>
            <Link href="/" className="hover:text-background/60 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

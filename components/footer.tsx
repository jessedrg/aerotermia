import Link from "next/link"
import { MessageCircle } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

export function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-[#111]/5 py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Link href="/" className="text-xl font-serif text-[#111]">aero.</Link>
            <p className="text-sm text-[#111]/40 mt-2">Aerotermia en toda España</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#111]/60">
            <Link href="#como-funciona" className="hover:text-[#111]">Cómo funciona</Link>
            <Link href="#servicios" className="hover:text-[#111]">Soluciones</Link>
            <Link href="#casos" className="hover:text-[#111]">Casos</Link>
            <Link href="#faq" className="hover:text-[#111]">FAQ</Link>
            <a 
              href={WA_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#111] hover:text-[#111]/70"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#111]/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#111]/30">© {new Date().getFullYear()} aero.</p>
          <div className="flex gap-6 text-xs text-[#111]/30">
            <Link href="/" className="hover:text-[#111]/60">Privacidad</Link>
            <Link href="/" className="hover:text-[#111]/60">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

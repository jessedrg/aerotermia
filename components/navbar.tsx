"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageCircle, Menu, X } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20instalar%20aerotermia%20en%20mi%20vivienda."

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <nav className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-serif text-[#111] tracking-tight">aero.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm">
          <Link href="#como-funciona" className="text-[#111]/60 hover:text-[#111] transition-colors">Cómo funciona</Link>
          <Link href="#servicios" className="text-[#111]/60 hover:text-[#111] transition-colors">Soluciones</Link>
          <Link href="#casos" className="text-[#111]/60 hover:text-[#111] transition-colors">Casos</Link>
          <Link href="#faq" className="text-[#111]/60 hover:text-[#111] transition-colors">FAQ</Link>
        </div>

        <div className="hidden lg:flex items-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#111] hover:bg-[#333] text-white text-sm px-5 py-2.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Presupuesto
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2 text-[#111]">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#111]/10 px-6 py-6 space-y-4">
          <Link href="#como-funciona" onClick={() => setOpen(false)} className="block text-[#111]/70">Cómo funciona</Link>
          <Link href="#servicios" onClick={() => setOpen(false)} className="block text-[#111]/70">Soluciones</Link>
          <Link href="#casos" onClick={() => setOpen(false)} className="block text-[#111]/70">Casos</Link>
          <Link href="#faq" onClick={() => setOpen(false)} className="block text-[#111]/70">FAQ</Link>
          <hr className="border-[#111]/10" />
          <a 
            href={WA_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 bg-[#111] text-white px-6 py-3"
          >
            <MessageCircle className="w-4 h-4" />
            Presupuesto
          </a>
        </div>
      )}
    </header>
  )
}

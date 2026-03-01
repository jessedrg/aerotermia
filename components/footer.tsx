import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-[#111]/5 py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Link href="/" className="text-xl font-serif text-[#111]">aero.</Link>
            <p className="text-sm text-[#111]/40 mt-2">Aerotermia en toda España</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-[#111]/60">
            <Link href="#como-funciona" className="hover:text-[#111]">Cómo funciona</Link>
            <Link href="#servicios" className="hover:text-[#111]">Soluciones</Link>
            <Link href="#casos" className="hover:text-[#111]">Casos</Link>
            <Link href="#faq" className="hover:text-[#111]">FAQ</Link>
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

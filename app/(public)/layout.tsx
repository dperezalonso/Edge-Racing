import Link from 'next/link';
import UserNav from '@/components/nav/UserNav';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header para rutas públicas */}
      <header className="bg-[color:var(--racing-black)]/70 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2 relative group">
            <div className="absolute -left-3 top-0 h-full w-1 bg-[color:var(--f1-red)] transform scale-y-0 group-hover:scale-y-100 transition-transform"></div>
            <span className="text-[color:var(--f1-red)]">Edge</span>
            <span>Racing</span>
          </Link>
          <nav className="flex items-center">
            <ul className="flex items-center space-x-1 md:space-x-6 mr-4">
              <li>
                <Link href="/" className="py-2 px-3 hover:text-[color:var(--motogp-blue)] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/clasificacion" className="py-2 px-3 hover:text-[color:var(--motogp-blue)] transition-colors">
                  Clasificación
                </Link>
              </li>
              <li>
                <Link href="/competiciones" className="py-2 px-3 hover:text-[color:var(--motogp-blue)] transition-colors">
                  Competiciones
                </Link>
              </li>
            </ul>
            <UserNav />
          </nav>
        </div>
      </header>
      
      {/* Decorative racing line */}
      <div className="circuit-line"></div>
      
      {/* Contenido principal */}
      <main className="flex-grow">
        {/* Decorative racing corner */}
        <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden z-0">
          <div className="absolute -right-20 -top-20 w-40 h-40 checkered-flag opacity-10"></div>
        </div>
        
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-[color:var(--f1-dark-blue)]/90 border-t border-gray-800 py-8 relative overflow-hidden">
        <div className="circuit-line absolute top-0 left-0 right-0"></div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[color:var(--f1-red)]">Edge Racing</h3>
              <p className="text-gray-400">
                La plataforma definitiva para seguir todas las competiciones de carreras en un solo lugar.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Enlaces rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/clasificacion" className="hover:text-[color:var(--motogp-blue)]">Clasificación</Link></li>
                <li><Link href="/competiciones" className="hover:text-[color:var(--motogp-blue)]">Competiciones</Link></li>
                <li><Link href="/dashboard" className="hover:text-[color:var(--motogp-blue)]">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-[color:var(--motogp-blue)]">Términos y condiciones</Link></li>
                <li><Link href="#" className="hover:text-[color:var(--motogp-blue)]">Política de privacidad</Link></li>
                <li><Link href="#" className="hover:text-[color:var(--motogp-blue)]">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Edge Racing. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Header para rutas públicas */}
      <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-blue-500">Edge</span>Racing
          </Link>
          <nav>
            <ul className="flex items-center space-x-2 md:space-x-6">
              <li>
                <Link href="/" className="py-2 px-3 hover:text-blue-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/clasificacion" className="py-2 px-3 hover:text-blue-400 transition-colors">
                  Clasificación
                </Link>
              </li>
              <li>
                <Link href="/competiciones" className="py-2 px-3 hover:text-blue-400 transition-colors">
                  Competiciones
                </Link>
              </li>
              <li className="ml-2">
                <Link 
                  href="/dashboard" 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm md:text-base font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-black/80 border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-500">Edge Racing</h3>
              <p className="text-gray-400">
                La plataforma definitiva para seguir todas las competiciones de carreras en un solo lugar.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Enlaces rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/clasificacion" className="hover:text-blue-400">Clasificación</Link></li>
                <li><Link href="/competiciones" className="hover:text-blue-400">Competiciones</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-blue-400">Términos y condiciones</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Política de privacidad</Link></li>
                <li><Link href="#" className="hover:text-blue-400">Cookies</Link></li>
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
import Link from "next/link";
fetch('http://localhost:8000/api/saludo').then(r => r.json()).then(console.log)
export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/EdgeRacingIntro.mp4" type="video/mp4" />
          {/* Video de respaldo por si el primero falla */}
          <source src="/videos/racing-background.webm" type="video/webm" />
          Tu navegador no soporta videos HTML5.
        </video>
        {/* Overlay oscuro para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 text-center">
        <div className="py-16">
        
          <div className="mb-6 speed-line inline-block px-8 py-4 rounded-lg">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--f1-red)] to-[color:var(--motogp-blue)]">
              Edge Racing
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
            La plataforma definitiva para competiciones de carreras. Sigue a tus pilotos favoritos, consulta clasificaciones en tiempo real y descubre las próximas competiciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="btn-primary"
            >
              Acceder al Dashboard
            </Link>
            <Link
              href="/clasificacion"
              className="btn-gradient"
            >
              Ver clasificaciones
            </Link>
            <Link
              href="/competiciones"
              className="btn-secondary"
            >
              Ver competiciones
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative racing stripe */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-8 md:w-16 bg-[color:var(--f1-red)]"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-8 md:w-16 bg-[color:var(--f1-red)]"></div>
    </section>
  );
}
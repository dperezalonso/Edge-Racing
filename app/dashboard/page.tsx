import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Panel de Control</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
            Temporada 2025
          </span>
        </div>
      </div>

      {/* Resumen en tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Pilotos', value: '45', color: 'bg-blue-600', icon: 'user' },
          { title: 'Equipos Activos', value: '12', color: 'bg-purple-600', icon: 'team' },
          { title: 'Próximas Carreras', value: '8', color: 'bg-amber-600', icon: 'calendar' },
          { title: 'Países', value: '18', color: 'bg-emerald-600', icon: 'globe' },
        ].map((card, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <div className={`${card.color} h-10 w-10 rounded-full flex items-center justify-center text-white`}>
                  {card.icon === 'user' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )}
                  {card.icon === 'team' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  )}
                  {card.icon === 'calendar' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  )}
                  {card.icon === 'globe' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Próximas carreras */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Próximas Carreras</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3">Fecha</th>
                  <th className="pb-3">Carrera</th>
                  <th className="pb-3">Ubicación</th>
                  <th className="pb-3">Circuito</th>
                  <th className="pb-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  { date: '15 Abr', name: 'GP de España', location: 'Barcelona, España', circuit: 'Circuit de Barcelona-Catalunya', status: 'Programada' },
                  { date: '29 Abr', name: 'GP de Mónaco', location: 'Monte Carlo, Mónaco', circuit: 'Circuit de Monaco', status: 'Programada' },
                  { date: '12 May', name: 'GP de Italia', location: 'Monza, Italia', circuit: 'Autodromo Nazionale Monza', status: 'Programada' },
                ].map((race, index) => (
                  <tr key={index} className="hover:bg-gray-700/30">
                    <td className="py-4">{race.date}</td>
                    <td className="py-4 font-medium">{race.name}</td>
                    <td className="py-4">{race.location}</td>
                    <td className="py-4">{race.circuit}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                        {race.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/competitions" className="text-sm text-blue-400 hover:text-blue-300">
              Ver todas las carreras →
            </Link>
          </div>
        </div>
      </div>

      {/* Top Pilotos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Top Pilotos</h2>
            <ul className="space-y-3">
              {[
                { name: 'Max Verstappen', team: 'Red Bull', points: 125 },
                { name: 'Lewis Hamilton', team: 'Mercedes', points: 118 },
                { name: 'Charles Leclerc', team: 'Ferrari', points: 104 },
                { name: 'Lando Norris', team: 'McLaren', points: 92 },
              ].map((driver, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-sm text-gray-400">{driver.team}</p>
                    </div>
                  </div>
                  <div className="text-amber-400 font-bold">{driver.points} pts</div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/dashboard/drivers" className="text-sm text-blue-400 hover:text-blue-300">
                Ver todos los pilotos →
              </Link>
            </div>
          </div>
        </div>

        {/* Top Equipos */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Top Equipos</h2>
            <ul className="space-y-3">
              {[
                { name: 'Red Bull Racing', country: 'Austria', points: 210 },
                { name: 'Ferrari', country: 'Italia', points: 194 },
                { name: 'Mercedes', country: 'Alemania', points: 186 },
                { name: 'McLaren', country: 'Reino Unido', points: 145 },
              ].map((team, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{team.name}</p>
                      <p className="text-sm text-gray-400">{team.country}</p>
                    </div>
                  </div>
                  <div className="text-amber-400 font-bold">{team.points} pts</div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/dashboard/teams" className="text-sm text-blue-400 hover:text-blue-300">
                Ver todos los equipos →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

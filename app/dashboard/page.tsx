// 'use client';

// import Link from "next/link";
// import { useEffect, useState } from "react";
// // import { getGlobalDriversRanking, getGlobalTeamsRanking } from "@/services/rankingService";
// import { useCompetitions } from "@/lib/hooks/useCompetitions";

// // Interfaces para tipos de datos
// // interface Driver {
// //   id: string;
// //   driver_name: string;
// //   position: number;
// //   team_name: string;
// //   points: number;
// //   nationality?: string;
// //   team_color?: string;
// // }

// // interface Team {
// //   id: string;
// //   team_name: string;
// //   position: number;
// //   points: number;
// //   wins: number;
// //   color?: string;
// //   country?: string;
// // }

// export default function Dashboard() {
//   const { competitions, loading: competitionsLoading } = useCompetitions();
//   // const [topDrivers, setTopDrivers] = useState<Driver[]>([]);
//   // const [topTeams, setTopTeams] = useState<Team[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Cargar datos al iniciar
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       try {
//         // Cargar datos en paralelo
//         // const [tracksData] = await Promise.all([
//         //   getGlobalDriversRanking(),
//         //   getGlobalTeamsRanking(),

//         // ]);

//         // Procesar datos de pilotos
//         // const formattedDrivers = driversData.map((driver: any) => ({
//         //   id: String(driver.id || driver.driver_id),
//         //   driver_name: driver.driver_name,
//         //   position: driver.position,
//         //   team_name: driver.team_name,
//         //   points: driver.points,
//         //   nationality: driver.nationality,
//         //   team_color: driver.team_color
//         // }));

//         // Procesar datos de equipos
//         // const formattedTeams = teamsData.map((team: any) => ({
//         //   id: String(team.id || team.team_id),
//         //   team_name: team.team_name,
//         //   position: team.position,
//         //   points: team.points,
//         //   wins: team.wins,
//         //   color: team.color,
//         //   country: getTeamCountry(team.team_name) // Función auxiliar para obtener país
//         // }));

//         // Ordenar por posición y tomar los 4 primeros
//         // const sortedDrivers = formattedDrivers.sort((a, b) => a.position - b.position).slice(0, 4);
//         // const sortedTeams = formattedTeams.sort((a, b) => a.position - b.position).slice(0, 4);

//         // setTopDrivers(sortedDrivers);
//         // setTopTeams(sortedTeams);
//         // setTotalTracks(tracksData.length);

//         setError(null);

//       } catch (err) {
//         console.error('Error al cargar datos del dashboard:', err);
//         setError('Error al cargar los datos. Por favor, inténtalo de nuevo.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Función auxiliar para asignar países a los equipos (simula datos adicionales)
//   // const getTeamCountry = (teamName: string) => {
//   //   const teamCountries: Record<string, string> = {
//   //     "Red Bull Racing": "Austria",
//   //     "Ferrari": "Italia",
//   //     "Mercedes": "Alemania",
//   //     "McLaren": "Reino Unido",
//   //     "Aston Martin": "Reino Unido",
//   //     "Ducati Lenovo Team": "Italia",
//   //     "Pramac Racing": "Italia",
//   //     "Aprilia Racing": "Italia",
//   //     "Gresini Racing": "Italia",
//   //   };
//   //   return teamCountries[teamName] || "Desconocido";
//   // };

//   // Mostrar estado de carga
//   if (loading || competitionsLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
//       </div>
//     );
//   }

//   // Mostrar error si ocurre
//   if (error) {
//     return (
//       <div className="p-4 bg-red-900/50 border border-red-800 rounded-md text-red-300 mb-4">
//         {error}
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-2 bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md"
//         >
//           Reintentar
//         </button>
//       </div>
//     );
//   }

//   // const totalDrivers = topDrivers.length > 0 ? 20 : 0; // Valor aproximado si hay datos
//   // const totalTeams = topTeams.length > 0 ? 10 : 0; // Valor aproximado si hay datos
//   const totalCompetitions = competitions.length;
//   // const totalCountries = [...new Set(topTeams.map(team => team.country))].length;

//   return (
//     <section className="space-y-4">
//       {/* Resumen en tarjetas */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {[
//           {
//             title: 'Total Pilotos',
//             // value: totalDrivers.toString(),
//             color: 'bg-blue-600',
//             icon: 'user',
//             link: '/dashboard/drivers'
//           },
//           {
//             title: 'Equipos Activos',
//             // value: totalTeams.toString(),
//             color: 'bg-purple-600',
//             icon: 'team',
//             link: '/dashboard/teams'
//           },
//           {
//             title: 'Competiciones',
//             value: totalCompetitions.toString(),
//             color: 'bg-amber-600',
//             icon: 'calendar',
//             link: '/dashboard/competitions'
//           },
//           {
//             title: 'Países',
//             // value: totalCountries.toString(),
//             color: 'bg-emerald-600',
//             icon: 'globe'
//           },
//         ].map((card, index) => (
//           <Link key={index} href={card.link || '#'} className={`block ${card.link ? 'hover:shadow-md hover:-translate-y-1 transition-all' : ''}`}>
//             <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden h-full">
//               <div className="p-5">
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-sm text-gray-400">{card.title}</p>
//                     <p className="text-2xl font-bold mt-1">{card.value}</p>
//                   </div>
//                   <div className={`${card.color} h-10 w-10 rounded-full flex items-center justify-center text-white`}>
//                     {card.icon === 'user' && (
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//                       </svg>
//                     )}
//                     {card.icon === 'team' && (
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                       </svg>
//                     )}
//                     {card.icon === 'calendar' && (
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
//                       </svg>
//                     )}
//                     {card.icon === 'globe' && (
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
//                       </svg>
//                     )}
//                   </div>
//                 </div>
//                 {card.link && (
//                   <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400 flex justify-end">
//                     Ver detalles →
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Top Pilotos y Equipos */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Top Pilotos</h2>
//               <Link
//                 href="/dashboard/drivers"
//                 className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
//               >
//                 <span>Ver todo</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </div>
//             <ul className="space-y-3">
//               {/* {topDrivers.length > 0 ? (
//                 topDrivers.map((driver, index) => (
//                   <li key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <p className="font-medium">{driver.driver_name}</p>
//                         <p className="text-sm text-gray-400">{driver.team_name}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="text-amber-400 font-bold">{driver.points} pts</div>
//                       <Link
//                         href={`/dashboard/drivers/edit/${driver.id}`}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                         </svg>
//                       </Link>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="py-4 text-center text-gray-400">
//                   No hay pilotos disponibles. Añade pilotos para ver el ranking.
//                 </li>
//               )} */}
//             </ul>
//             <div className="mt-4">
//               <Link
//                 href="/dashboard/drivers/add"
//                 className="flex items-center justify-center text-sm text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 py-2 px-4 rounded-md mt-2 transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                 </svg>
//                 Añadir piloto
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Top Equipos */}
//         <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Top Equipos</h2>
//               <Link
//                 href="/dashboard/teams"
//                 className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
//               >
//                 <span>Ver todo</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </div>
//             <ul className="space-y-3">
//               {/* {topTeams.length > 0 ? (
//                 topTeams.map((team, index) => (
//                   <li key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <p className="font-medium">{team.team_name}</p>
//                         <p className="text-sm text-gray-400">{team.country}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="text-amber-400 font-bold">{team.points} pts</div>
//                       <Link
//                         href={`/dashboard/teams/edit/${team.id}`}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                         </svg>
//                       </Link>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="py-4 text-center text-gray-400">
//                   No hay equipos disponibles. Añade equipos para ver el ranking.
//                 </li>
//               )} */}
//             </ul>
//             <div className="mt-4">
//               <Link
//                 href="/dashboard/teams/add"
//                 className="flex items-center justify-center text-sm text-purple-400 hover:text-purple-300 bg-purple-400/10 hover:bg-purple-400/20 py-2 px-4 rounded-md mt-2 transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                 </svg>
//                 Añadir equipo
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Competiciones */}
//       <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Competiciones Activas</h2>
//             <Link
//               href="/dashboard/competitions"
//               className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
//             >
//               <span>Ver todo</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </Link>
//           </div>

//           {competitions.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {competitions.map((competition, index) => (
//                 <div key={index} className="bg-gray-900/60 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors">
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex items-center">

//                       <div
//                         className="w-10 h-10 rounded-full mr-3 flex items-center justify-center text-white font-bold"
//                         style={{ backgroundColor: competition.color }}
//                       >
//                         {competition.name.charAt(0)}
//                       </div>

//                       <div>
//                         <h3 className="font-bold">{competition.name}</h3>
//                         <p className="text-xs text-gray-400">{competition.season}</p>
//                       </div>
//                     </div>
//                     <Link
//                       href={`/dashboard/competitions/edit/${competition.id}`}
//                       className="text-blue-400 hover:text-blue-300"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                       </svg>
//                     </Link>
//                   </div>
//                   <p className="text-sm text-gray-300 mb-3">{competition.description}</p>

//                   <div className="flex flex-wrap gap-2">
//                     <Link
//                       href={`/dashboard/drivers?competition=${competition.id}`}
//                       className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded"
//                     >
//                       Ver pilotos
//                     </Link>
//                     <Link
//                       href={`/dashboard/teams?competition=${competition.id}`}
//                       className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded"
//                     >
//                       Ver equipos
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8 text-gray-400">
//               <p className="mb-4">No hay competiciones disponibles.</p>
//               <Link
//                 href="/dashboard/competitions/add"
//                 className="inline-flex items-center text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 py-2 px-4 rounded-md transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                 </svg>
//                 Añadir competición
//               </Link>
//             </div>
//           )}

//           {competitions.length > 0 && (
//             <div className="mt-4">
//               <Link
//                 href="/dashboard/competitions/add"
//                 className="flex items-center justify-center text-sm text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 py-2 px-4 rounded-md transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                 </svg>
//                 Añadir competición
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>


//     </section>
//   );
// }



'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCompetitions } from "@/lib/hooks/useCompetitions";
import { useDrivers } from "@/lib/hooks/useDrivers";
import { useTeams } from "@/lib/hooks/useTeams";
import Image from "next/image";

interface DashboardDriver {
  id: string;
  name: string;
  team: string;
  points: number;
  position: number;
  teamColor: string;
  competition: string;
}

interface DashboardTeam {
  id: string;
  name: string;
  points: number;
  wins: number;
  color: string;
  country: string;
  competition: string;
}

export default function Dashboard() {
  const { competitions, loading: competitionsLoading } = useCompetitions();
  const { drivers, loading: driversLoading } = useDrivers();
  const { teams, loading: teamsLoading } = useTeams();

  const [topDrivers, setTopDrivers] = useState<DashboardDriver[]>([]);
  const [topTeams, setTopTeams] = useState<DashboardTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Procesar datos cuando se cargan
  useEffect(() => {
    if (!driversLoading && !teamsLoading && !competitionsLoading) {
      try {
        // Procesar pilotos
        const processedDrivers: DashboardDriver[] = drivers.map((driver) => {
          // Buscar el equipo del piloto
          const driverTeam = teams.find(team => team.id === driver.team_id);
          // Buscar la competición
          const competition = competitions.find(comp => comp.id === driver.competition_id);

          return {
            id: driver.id,
            name: `${driver.first_name} ${driver.last_name}`,
            team: driverTeam?.name || "Equipo desconocido",
            points: driver.points || 0,
            position: driver.position || 0,
            teamColor: driverTeam?.color || "#CCCCCC",
            competition: competition?.name || "Competición desconocida"
          };
        }).sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 4);

        // Procesar equipos
        const processedTeams: DashboardTeam[] = teams.map((team) => {
          const competition = competitions.find(comp => comp.id === team.competition_id);

          return {
            id: team.id,
            name: team.name,
            points: team.points || 0,
            wins: team.wins || 0,
            color: team.color || "#CCCCCC",
            country: team.country || "País desconocido",
            competition: competition?.name || "Competición desconocida"
          };
        }).sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 4);

        setTopDrivers(processedDrivers);
        setTopTeams(processedTeams);
        setError(null);
      } catch (err) {
        console.error('Error al procesar datos del dashboard:', err);
        setError('Error al procesar los datos del dashboard.');
      } finally {
        setLoading(false);
      }
    }
  }, [drivers, teams, competitions, driversLoading, teamsLoading, competitionsLoading]);

  // Calcular estadísticas
  const totalDrivers = drivers.length;
  const totalTeams = teams.length;
  const totalCompetitions = competitions.length;
  const totalCountries = [...new Set(teams.map(team => team.country))].length;

  // Mostrar estado de carga
  if (loading || competitionsLoading || driversLoading || teamsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
        <span className="ml-3">Cargando datos del dashboard...</span>
      </div>
    );
  }

  // Mostrar error si ocurre
  if (error) {
    return (
      <div className="p-4 bg-red-900/50 border border-red-800 rounded-md text-red-300 mb-4">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Resumen en tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Pilotos',
            value: totalDrivers.toString(),
            color: 'bg-blue-600',
            icon: 'user',
            link: '/dashboard/drivers'
          },
          {
            title: 'Equipos Activos',
            value: totalTeams.toString(),
            color: 'bg-purple-600',
            icon: 'team',
            link: '/dashboard/teams'
          },
          {
            title: 'Competiciones',
            value: totalCompetitions.toString(),
            color: 'bg-amber-600',
            icon: 'calendar',
            link: '/dashboard/competitions'
          },
          {
            title: 'Países',
            value: totalCountries.toString(),
            color: 'bg-emerald-600',
            icon: 'globe'
          },
        ].map((card, index) => (
          <Link key={index} href={card.link || '#'} className={`block ${card.link ? 'hover:shadow-md hover:-translate-y-1 transition-all' : ''}`}>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden h-full">
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
                {card.link && (
                  <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400 flex justify-end">
                    Ver detalles →
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Top Pilotos y Equipos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pilotos */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Pilotos</h2>
              <Link
                href="/dashboard/drivers"
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
              >
                <span>Ver todo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <ul className="space-y-3">
              {topDrivers.length > 0 ? (
                topDrivers.map((driver, index) => (
                  <li key={driver.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: driver.teamColor }}
                      ></div>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-gray-400">{driver.team}</p>
                        <p className="text-xs text-gray-500">{driver.competition}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-amber-400 font-bold">{driver.points} pts</div>
                      <Link
                        href={`/dashboard/drivers/edit/${driver.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-8 text-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p>No hay pilotos disponibles.</p>
                  <p className="text-sm">Añade pilotos para ver el ranking.</p>
                </li>
              )}
            </ul>

            <div className="mt-4">
              <Link
                href="/dashboard/drivers/add"
                className="flex items-center justify-center text-sm text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 py-2 px-4 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Añadir piloto
              </Link>
            </div>
          </div>
        </div>

        {/* Top Equipos */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Equipos</h2>
              <Link
                href="/dashboard/teams"
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
              >
                <span>Ver todo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <ul className="space-y-3">
              {topTeams.length > 0 ? (
                topTeams.map((team, index) => (
                  <li key={team.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                        style={{ backgroundColor: team.color }}
                      >
                        {team.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-gray-400">{team.country}</p>
                        <p className="text-xs text-gray-500">{team.competition}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-amber-400 font-bold">{team.points} pts</div>
                        <div className="text-xs text-gray-400">{team.wins} victorias</div>
                      </div>
                      <Link
                        href={`/dashboard/teams/edit/${team.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-8 text-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>No hay equipos disponibles.</p>
                  <p className="text-sm">Añade equipos para ver el ranking.</p>
                </li>
              )}
            </ul>

            <div className="mt-4">
              <Link
                href="/dashboard/teams/add"
                className="flex items-center justify-center text-sm text-purple-400 hover:text-purple-300 bg-purple-400/10 hover:bg-purple-400/20 py-2 px-4 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Añadir equipo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Competiciones */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Competiciones Activas</h2>
            <Link
              href="/dashboard/competitions"
              className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
            >
              <span>Ver todo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {competitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitions.map((competition) => {
                // Calcular estadísticas por competición
                const competitionDrivers = drivers.filter(d => d.competition_id === competition.id);
                const competitionTeams = teams.filter(t => t.competition_id === competition.id);

                return (
                  <div key={competition.id} className="bg-gray-900/60 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        {/* {competition.logo ? (
                          <div className="w-10 h-10 bg-white rounded-full p-1 mr-3">
                            <Image
                              src={competition.logo}
                              alt={competition.name}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full mr-3 flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: competition.color }}
                          >
                            {competition.name.charAt(0)}
                          </div>
                        )} */}
                        <div
                          className="w-10 h-10 rounded-full mr-3 flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: competition.color }}
                        >
                          {competition.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold">{competition.name}</h3>
                          <p className="text-xs text-gray-400">{competition.season}</p>
                        </div>
                      </div>
                      <Link
                        href={`/dashboard/competitions/edit/${competition.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                    </div>

                    <p className="text-sm text-gray-300 mb-3">{competition.description}</p>

                    {/* Estadísticas de la competición */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-gray-800/50 rounded p-2 text-center">
                        <div className="text-lg font-bold text-blue-400">{competitionDrivers.length}</div>
                        <div className="text-xs text-gray-400">Pilotos</div>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2 text-center">
                        <div className="text-lg font-bold text-purple-400">{competitionTeams.length}</div>
                        <div className="text-xs text-gray-400">Equipos</div>
                      </div>
                    </div>

                    {/* <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/drivers?competition=${competition.id}`}
                        className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition-colors"
                      >
                        Ver pilotos
                      </Link>
                      <Link
                        href={`/dashboard/teams?competition=${competition.id}`}
                        className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded hover:bg-purple-600/30 transition-colors"
                      >
                        Ver equipos
                      </Link>
                      <Link
                        href={`/clasificacion/${competition.id}`}
                        className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded hover:bg-green-600/30 transition-colors"
                      >
                        Clasificación
                      </Link>
                    </div> */}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="mb-2">No hay competiciones disponibles.</p>
              <Link
                href="/dashboard/competitions/add"
                className="inline-flex items-center text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 py-2 px-4 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Añadir competición
              </Link>
            </div>
          )}

          {competitions.length > 0 && (
            <div className="mt-4">

              <Link
                href="/dashboard/competitions/add"
                className="flex items-center justify-center text-sm text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 py-2 px-4 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Añadir competición
              </Link>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
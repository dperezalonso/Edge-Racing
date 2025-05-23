"use client";

import { useState, useEffect } from "react";

export default function PilotClassification({
  drivers,
  teams
}: {
  drivers: any[];
  competitionId: string;
  teams: any[];
}) {
  // Cambiamos el valor predeterminado a "points"
  const [sort, setSort] = useState<"points">("points");
  const [sortedDrivers, setSortedDrivers] = useState<any[]>([]);

  // Función para obtener información del equipo por ID
  const getTeamInfo = (teamId: number | string) => {
    const team = teams.find((t) => t.id === teamId);
    return {
      name: team?.team || team?.name || "Equipo desconocido",
      color: team?.color || getDefaultTeamColor(teamId)
    };
  };

  // Usar useEffect para actualizar los pilotos ordenados cuando cambien los datos o el criterio de ordenación
  useEffect(() => {
    // Función para ordenar pilotos
    const orderDrivers = () => {
      // Crear una copia para ordenar
      const ordered = [...drivers].sort((a, b) => {
        if (sort === "points") return (b.points || 0) - (a.points || 0);
       return 0;
      });

      // Asignar posiciones actualizadas según el criterio de ordenación
      return ordered.map((driver, index) => ({
        ...driver,
        calculatedPosition: index + 1
      }));
    };

    // Aplicar la ordenación
    setSortedDrivers(orderDrivers());
  }, [drivers, sort]);

 
  // Si no hay datos
  if (drivers.length === 0) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-lg text-center">
        <p className="text-gray-400">
          No hay pilotos disponibles para esta competición.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">Clasificación de Pilotos</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="standings-table w-full">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-800">
              <th className="px-4 py-2">Pos</th>
              <th className="px-4 py-2">Piloto</th>
              <th className="px-4 py-2">Nacionalidad</th>
              <th className="px-4 py-2">Equipo</th>
              <th className="px-4 py-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedDrivers.map((driver, index) => {
              // Manejo flexible de nombres
              const driverName =
                // Si existe driver (campo compuesto)
                driver.driver ? driver.driver :
                  // Si existen first_name y last_name
                  (driver.first_name && driver.last_name) ?
                    `${driver.first_name} ${driver.last_name}` :
                    // Si existe name
                    driver.name ? driver.name :
                      // Si todo falla
                      "Piloto sin nombre";

              // Manejo flexible de nacionalidad
              const nationality =
                driver.nationality ||
                driver.birth_country ||
                "---";

              // Obtener información del equipo por ID
              const teamInfo = getTeamInfo(driver.team_id || driver.team);

              // Usar la posición calculada o la original
              const displayPosition = driver.calculatedPosition || driver.position || index + 1;

              return (
                <tr
                  key={driver.id || index}
                  className="bg-gray-900/50 hover:bg-gray-800/70 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      displayPosition <= 3
                        ? `${positionColorClass(displayPosition)} text-black`
                        : "bg-gray-800"
                    }`}>
                      {displayPosition}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {driverName}
                  </td>
                  <td className="px-4 py-3">{nationality}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div
                        className="size-3 rounded-full mr-2"
                        style={{ backgroundColor: teamInfo.color }}
                      ></div>
                      {teamInfo.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold">{driver.points || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Utilidades para presentación de datos
function positionColorClass(position: number): string {
  switch (position) {
    case 1: return "bg-[color:var(--accent-yellow)]";
    case 2: return "bg-[color:var(--racing-silver)]";
    case 3: return "bg-[#CD7F32]"; // Bronze
    default: return "bg-gray-800";
  }
}

function getDefaultTeamColor(teamId: number | string): string {
  // Mapa de colores predeterminados para equipos conocidos por ID
  const teamColors: Record<string, string> = {
    "1": "#0600EF", // Red Bull Racing
    "2": "#00D2BE", // Mercedes
    "3": "#DC0000", // Ferrari
    "4": "#FF8700", // McLaren
    "5": "#006F62", // Aston Martin
    "6": "#0090FF", // Alpine
    "7": "#0059FF", // Williams
    "8": "#900000", // Stake F1 (Sauber)
    "9": "#2B4562", // RB
    "10": "#FFFFFF" // Haas
  };

  return teamColors[String(teamId)] || "#CCCCCC"; // Color por defecto
}
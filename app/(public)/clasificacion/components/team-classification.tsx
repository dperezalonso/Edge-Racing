"use client";

import { useState, useEffect } from "react";

export default function TeamClassification({
  teams
}: {
  teams: any[];
  competitionId: string;
}) {
  // Cambiamos el valor predeterminado a "points"
  const [sort] = useState<"points">("points");
  const [sortedTeams, setSortedTeams] = useState<any[]>([]);

  // Usar useEffect para actualizar los equipos ordenados cuando cambien los datos o el criterio de ordenación
  useEffect(() => {
    // Función para ordenar equipos
    const orderTeams = () => {
      // Crear una copia para ordenar
      const ordered = [...teams].sort((a, b) => {
        if (sort === "points") return (b.points || 0) - (a.points || 0);
        return 0;
      });

      // Asignar posiciones actualizadas según el criterio de ordenación
      return ordered.map((team, index) => ({
        ...team,
        calculatedPosition: index + 1
      }));
    };

    // Aplicar la ordenación
    setSortedTeams(orderTeams());
  }, [teams, sort]);



  // Si no hay datos
  if (teams.length === 0) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-lg text-center">
        <p className="text-gray-400">
          No hay equipos disponibles para esta competición.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">Clasificación de Constructores</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="standings-table w-full">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-800">
              <th className="px-4 py-2">Pos</th>
              <th className="px-4 py-2">Equipo</th>
              <th className="px-4 py-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedTeams.map((team, index) => {
              // Manejo flexible de nombres de equipo
              const teamName = team.team || team.name || "Equipo sin nombre";

              // Usar la posición calculada o la original
              const displayPosition = team.calculatedPosition || team.position || index + 1;

              return (
                <tr
                  key={team.id || index}
                  className="bg-gray-900/50 hover:bg-gray-800/70 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${displayPosition <= 3
                        ? `${positionColorClass(displayPosition)} text-black`
                        : "bg-gray-800"
                      }`}>
                      {displayPosition}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div
                        className="size-4 rounded-full mr-3"
                        style={{ backgroundColor: team.color || "#cccccc" }}
                      ></div>
                      <span className="font-medium">{teamName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold">{team.points || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function positionColorClass(position: number): string {
  switch (position) {
    case 1: return "bg-[color:var(--accent-yellow)]";
    case 2: return "bg-[color:var(--racing-silver)]";
    case 3: return "bg-[#CD7F32]"; // Bronze
    default: return "bg-gray-800";
  }
}
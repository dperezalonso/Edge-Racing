"use client";

import { useState } from "react";
import { Team } from "@/types/models";

export default function TeamClassification({
  teams,
  competitionId
}: {
  teams: Team[];
  competitionId: string;
}) {
  const [sort, setSort] = useState<"position" | "points" | "wins">("position");
  
  // Preparar equipos para la UI
  const prepareTeams = (teamsData: Team[]) => {
    return teamsData.map(team => ({
      ...team,
      // Para UI, garantizar que existe el campo "team" para compatibilidad
      team: team.name,
      position: team.position || 0,
      wins: team.wins || 0,
      podiums: team.podiums || 0,
    }));
  };
  
  // Ordenar equipos según el criterio seleccionado
  const sortedTeams = [...prepareTeams(teams)].sort((a, b) => {
    if (sort === "position") return (a.position || 0) - (b.position || 0);
    if (sort === "points") return b.points - a.points;
    if (sort === "wins") return (b.wins || 0) - (a.wins || 0);
    return 0;
  });
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">Clasificación de Constructores</h3>
        <div className="flex items-center space-x-2 text-sm">
          <button 
            onClick={() => setSort("position")}
            className={`px-3 py-1 rounded-md ${
              sort === "position" 
                ? "bg-white text-black font-medium" 
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Posición
          </button>
          <button 
            onClick={() => setSort("points")}
            className={`px-3 py-1 rounded-md ${
              sort === "points" 
                ? "bg-white text-black font-medium" 
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Puntos
          </button>
          <button 
            onClick={() => setSort("wins")}
            className={`px-3 py-1 rounded-md ${
              sort === "wins" 
                ? "bg-white text-black font-medium" 
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Victorias
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="standings-table w-full">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-800">
              <th className="px-4 py-2">Pos</th>
              <th className="px-4 py-2">Equipo</th>
              <th className="px-4 py-2 text-right">Pts</th>
              <th className="px-4 py-2 text-right">Victorias</th>
              <th className="px-4 py-2 text-right">Podios</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedTeams.map((team) => (
              <tr 
                key={team.id}
                className="bg-gray-900/50 hover:bg-gray-800/70 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    (team.position || 0) <= 3 
                      ? `${positionColorClass(team.position || 0)} text-black` 
                      : "bg-gray-800"
                  }`}>
                    {team.position || "-"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div 
                      className="size-4 rounded-full mr-3"
                      style={{ backgroundColor: team.color }}
                    ></div>
                    <span className="font-medium">{team.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-bold">{team.points}</td>
                <td className="px-4 py-3 text-right">{team.wins || 0}</td>
                <td className="px-4 py-3 text-right">{team.podiums || 0}</td>
              </tr>
            ))}
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
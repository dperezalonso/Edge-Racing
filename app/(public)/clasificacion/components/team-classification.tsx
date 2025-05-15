"use client";

import { useState } from "react";

export default function TeamClassification({
  teams,
  competitionId
}: {
  teams: any[];
  competitionId: string;
}) {
  const [sort, setSort] = useState<"position" | "points" | "wins">("position");
  
  // Función para depurar - imprime la estructura del primer equipo
  console.log("Primer equipo:", teams.length > 0 ? teams[0] : "No hay equipos");
  
  // Ordenar equipos según el criterio seleccionado
  const sortedTeams = [...teams].sort((a, b) => {
    if (sort === "position") return (a.position || 0) - (b.position || 0);
    if (sort === "points") return (b.points || 0) - (a.points || 0);
    if (sort === "wins") return (b.wins || 0) - (a.wins || 0);
    return 0;
  });
  
  // Si no hay datos
  if (sortedTeams.length === 0) {
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
              // Manejo flexible del nombre del equipo
              const teamName = 
                team.name || 
                team.team || 
                team.team_name || 
                "Equipo sin nombre";
              
              // Manejo flexible del color del equipo
              const teamColor = 
                team.color || 
                team.team_color || 
                getTeamColor(teamName);
              
              return (
                <tr 
                  key={team.id || index}
                  className="bg-gray-900/50 hover:bg-gray-800/70 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      (team.position || index + 1) <= 3 
                        ? `${positionColorClass(team.position || index + 1)} text-black` 
                        : "bg-gray-800"
                    }`}>
                      {team.position || index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div 
                        className="size-4 rounded-full mr-3"
                        style={{ backgroundColor: teamColor }}
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

// Utilidades para presentación de datos
function positionColorClass(position: number): string {
  switch (position) {
    case 1: return "bg-[color:var(--accent-yellow)]";
    case 2: return "bg-[color:var(--racing-silver)]";
    case 3: return "bg-[#CD7F32]"; // Bronze
    default: return "bg-gray-800";
  }
}

function getTeamColor(teamName: string): string {
  // Mapa de colores predeterminados para equipos conocidos
  const teamColors: Record<string, string> = {
    "Red Bull Racing": "#0600EF",
    "Ferrari": "#DC0000",
    "Mercedes": "#00D2BE",
    "McLaren": "#FF8700",
    "Aston Martin": "#006F62",
    "Ducati Lenovo Team": "#FF0000",
    "Pramac Racing": "#2596be",
    "Aprilia Racing": "#41BFFF",
    "Gresini Racing": "#56A0D3",
  };
  
  return teamColors[teamName] || "#CCCCCC"; // Color por defecto
}
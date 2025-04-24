// src/components/StandingsTable.tsx
import { Driver, Team, StandingsResponse } from '../types/standings';

interface StandingsTableProps {
  data: StandingsResponse;
  type: 'drivers' | 'constructors';
}

export default function StandingsTable({ data, type }: StandingsTableProps) {
  if (type === 'drivers' && data.drivers) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Pos</th>
              <th className="py-3 px-4 text-left">Piloto</th>
              <th className="py-3 px-4 text-left">Equipo</th>
              <th className="py-3 px-4 text-right">Victorias</th>
              <th className="py-3 px-4 text-right">Podios</th>
              <th className="py-3 px-4 text-right">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {data.drivers.map((driver: Driver) => (
              <tr key={driver.id} className="border-t border-gray-700 hover:bg-gray-750">
                <td className="py-3 px-4">{driver.position}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div 
                      className="w-1 h-5 mr-3" 
                      style={{ backgroundColor: driver.team_color || '#ccc' }}
                    ></div>
                    {driver.name}
                  </div>
                </td>
                <td className="py-3 px-4">{driver.team}</td>
                <td className="py-3 px-4 text-right">{driver.wins}</td>
                <td className="py-3 px-4 text-right">{driver.podiums}</td>
                <td className="py-3 px-4 text-right font-bold">{driver.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === 'constructors' && data.teams) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Pos</th>
              <th className="py-3 px-4 text-left">Equipo</th>
              <th className="py-3 px-4 text-right">Victorias</th>
              <th className="py-3 px-4 text-right">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {data.teams.map((team: Team) => (
              <tr key={team.id} className="border-t border-gray-700 hover:bg-gray-750">
                <td className="py-3 px-4">{team.position}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div 
                      className="w-1 h-5 mr-3" 
                      style={{ backgroundColor: team.color }}
                    ></div>
                    {team.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-right">{team.wins}</td>
                <td className="py-3 px-4 text-right font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div>No hay datos disponibles</div>;
}
'use client';

import { useState, useEffect } from 'react';
import { useDrivers } from "@/lib/hooks/useDrivers";
import { useTeams } from "@/lib/hooks/useTeams";
import { useCompetitions } from "@/lib/hooks/useCompetitions";
import DataTable from '@/components/crud/DataTable';

export default function DriversPage() {
  const { drivers, loading, error, deleteDriver, refreshDrivers } = useDrivers();
  const { teams } = useTeams();
  const { competitions } = useCompetitions();
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);

  // Recargar datos al montar el componente
  useEffect(() => {
    refreshDrivers();
  }, [refreshDrivers]);

  // Preparar opciones para el filtro de competiciones
  useEffect(() => {
    if (competitions.length > 0) {
      const options = competitions.map((comp) => ({
        label: comp.name,
        value: comp.id
      }));
      setCompetitionOptions(options);
    }
  }, [competitions]);

  // Definir columnas para la tabla de pilotos
  const columns = [
    { 
      key: 'first_name', 
      label: 'Piloto',
      render: (item: any) => (
        <div className="flex items-center">
          <div 
            className="w-2 h-full mr-2" 
            style={{ backgroundColor: item.teamColor || "#cccccc" }}
          ></div>
          <span>{`${item.first_name} ${item.last_name}`}</span>
        </div>
      )
    },
    { key: 'birth_country', label: 'Nacionalidad' },
    { 
      key: 'team_id', 
      label: 'Equipo',
      render: (item: any) => {
        const team = teams.find(t => t.id === item.team_id);
        return team ? team.name : item.team_id;
      }
    },
    { key: 'vehicle_number', label: 'Número' },
    { key: 'points', label: 'Puntos' },
    { 
      key: 'active', 
      label: 'Estado',
      render: (item: any) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          item.active ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
        }`}>
          {item.active ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    { 
      key: 'competition_id', 
      label: 'Competición',
      render: (item: any) => {
        const competition = competitions.find(c => c.id === item.competition_id);
        return competition ? competition.name : item.competition_id;
      }
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-800 rounded-md p-4 text-red-300">
        {error}
        <button 
          onClick={refreshDrivers} 
          className="ml-4 bg-red-800 hover:bg-red-700 px-3 py-1 rounded-md text-white text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <DataTable
        data={drivers}
        columns={columns}
        entityName="Pilotos"
        entityPath="drivers"
        onDelete={deleteDriver}
        filterOptions={competitionOptions}
        filterKey="competition_id"
      />
    </div>
  );
}
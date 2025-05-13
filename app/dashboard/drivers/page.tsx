'use client';

import { useState, useEffect } from 'react';
import { useDrivers } from '@/lib/hooks/useDrivers';
import { useCompetitions, Competition } from '@/lib/hooks/useCompetitions';
import DataTable from '@/components/crud/DataTable';

export default function DriversPage() {
  const { drivers, loading, error, deleteDriver } = useDrivers();
  const { competitions } = useCompetitions();
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    // Preparar opciones para el filtro de competiciones
    if (competitions.length > 0) {
      const options = competitions.map((comp: Competition) => ({
        label: comp.name,
        value: comp.id
      }));
      setCompetitionOptions(options);
    }
  }, [competitions]);

  // Definir columnas para la tabla de pilotos
  const columns = [
    { key: 'position', label: 'Pos' },
    { 
      key: 'driver', 
      label: 'Piloto',
      render: (item: any) => (
        <div className="flex items-center">
          <div className="w-2 h-full mr-2" style={{ backgroundColor: item.teamColor }}></div>
          <span>{item.driver}</span>
        </div>
      )
    },
    { key: 'nationality', label: 'Nacionalidad' },
    { key: 'team', label: 'Equipo' },
    { key: 'points', label: 'Puntos' },
    { key: 'wins', label: 'Victorias' },
    { key: 'podiums', label: 'Podios' },
    { 
      key: 'competitionId', 
      label: 'Competición',
      render: (item: any) => {
        const competition = competitions.find(c => c.id === item.competitionId);
        return competition ? competition.name : item.competitionId;
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
        filterKey="competitionId"
      />
    </div>
  );
}
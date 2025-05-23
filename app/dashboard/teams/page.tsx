'use client';

import { useState, useEffect } from 'react';
import { useTeams } from "@/lib/hooks/useTeams";
import { useCompetitions } from "@/lib/hooks/useCompetitions";
import DataTable from '@/components/crud/DataTable';
import Image from 'next/image';

export default function TeamsPage() {
  const { teams, loading, error, deleteTeam, refreshTeams } = useTeams();
  const { competitions } = useCompetitions();
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);

  // Recargar datos al montar el componente
  useEffect(() => {
    refreshTeams();
  }, [refreshTeams]);

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

  // Definir columnas para la tabla de equipos
  const columns = [
    { 
      key: 'name', 
      label: 'Equipo',
      render: (item: any) => (
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-2" 
            style={{ backgroundColor: item.color }}
          ></div>
          {item.name}
        </div>
      ) 
    },
    { key: 'country', label: 'País' },
    { key: 'principal', label: 'Director' },
    { key: 'points', label: 'Puntos' },
    { 
      key: 'competition_id', 
      label: 'Competición',
      render: (item: any) => {
        const competition = competitions.find(c => c.id === item.competition_id);
        return competition ? competition.name : item.competition_id;
      }
    },
    // { 
    //   key: 'logo', 
    //   label: 'Logo',
    //   render: (item: any) => (
    //     item.logo ? (
    //       <div className="w-8 h-8 bg-white p-1 rounded-full">
    //         <Image src={item.logo} alt={item.name} className="w-full h-full object-contain" />
    //       </div>
    //     ) : (
    //       <div 
    //         className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
    //         style={{ backgroundColor: item.color }}
    //       >
    //         {item.name.charAt(0)}
    //       </div>
    //     )
    //   )
    // },
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
          onClick={refreshTeams} 
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
        data={teams}
        columns={columns}
        entityName="Equipos"
        entityPath="teams"
        onDelete={deleteTeam}
        filterOptions={competitionOptions}
        filterKey="competition_id"
      />
    </div>
  );
}
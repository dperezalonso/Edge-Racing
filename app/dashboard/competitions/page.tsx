'use client';

import { useCompetitions } from "@/lib/hooks/useCompetitions";
import DataTable from '@/components/crud/DataTable';
import { useEffect } from "react";

export default function CompetitionsPage() {
  const { competitions, loading, error, deleteCompetition, refreshCompetitions } = useCompetitions();

  // Recargar datos al montar el componente
  useEffect(() => {
    refreshCompetitions();
  }, [refreshCompetitions]);

  // Definir columnas para la tabla de competiciones
  const columns = [
    { 
      key: 'name', 
      label: 'Competición',
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
    { key: 'description', label: 'Descripción' },
    { key: 'status', label: 'Estado' },
    { key: 'season', label: 'Temporada' },
    { 
      key: 'image', 
      label: 'Logo',
      render: (item: any) => (
        item.image ? (
          <div className="w-8 h-8 bg-white p-1 rounded-full">
            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: item.color }}
          >
            {item.name.charAt(0)}
          </div>
        )
      )
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
          onClick={refreshCompetitions} 
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
        data={competitions}
        columns={columns}
        entityName="Competiciones"
        entityPath="competitions"
        onDelete={deleteCompetition}
      />
    </div>
  );
}
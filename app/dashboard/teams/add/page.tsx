'use client';

import { useEffect, useState } from 'react';
import { useTeams } from '@/lib/hooks/useTeams';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function AddTeamPage() {
  const { addTeam } = useTeams();
  const { competitions, loading: competitionsLoading } = useCompetitions();
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);

  // Preparar opciones para el selector de competiciones
  useEffect(() => {
    if (competitions.length > 0) {
      const options = competitions.map(comp => ({
        label: comp.name,
        value: comp.id
      }));
      setCompetitionOptions(options);
    }
  }, [competitions]);

  // Definir campos para el formulario
  const fields = [
    { name: 'name', label: 'Nombre del Equipo', type: 'text', required: true },
    { name: 'country', label: 'País', type: 'text', required: true },
    { name: 'principal', label: 'Director del Equipo', type: 'text', required: true },
    { 
      name: 'competition_id', 
      label: 'Competición', 
      type: 'select', 
      required: true,
      options: competitionOptions
    },
    { name: 'points', label: 'Puntos', type: 'number', required: true, defaultValue: "0" },
    { name: 'description', label: 'Descripción', type: 'textarea', required: false },
    { name: 'logo', label: 'URL del Logo', type: 'text', required: false },
    { name: 'color', label: 'Color', type: 'color', required: true, defaultValue: "#0088ff" },
  ];

  // Función para manejar el envío del formulario
  const handleSubmit = async (data: any) => {
    try {
      // Preparar datos para la API
      const teamData = {
        ...data,
        // Convertir puntos a número
        points: parseInt(data.points, 10) || 0
      };
      
      // Enviar a la API
      const result = await addTeam(teamData);
      return result;
    } catch (error) {
      console.error('Error al crear equipo:', error);
      throw error;
    }
  };

  // Mostrar carga si no tenemos las competiciones aún
  if (competitionsLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
      </div>
    );
  }

  return (
    <EntityForm
      fields={fields}
      onSubmit={handleSubmit}
      entityName="Equipo"
      entityPath="teams"
    />
  );
}
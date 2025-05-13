'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTeams } from '@/lib/hooks/useTeams';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function EditTeamPage() {
  const params = useParams();
  const teamId = params.id as string;
  const router = useRouter();
  const { teams, getTeamById, updateTeam } = useTeams();
  const { competitions } = useCompetitions();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);

  // Cargar datos del equipo
  useEffect(() => {
    // Depuración - Imprimir información para diagnóstico
    console.log("Intentando obtener equipo con ID:", teamId);
    console.log("Equipos disponibles:", teams);
    
    try {
      const teamData = getTeamById(teamId);
      console.log("Resultado de getTeamById:", teamData);
      
      if (teamData) {
        setTeam(teamData);
      } else {
        setError('Equipo no encontrado. Verifica el ID en la URL.');
        console.error("No se encontró el equipo con ID:", teamId);
      }
    } catch (err) {
      console.error("Error al obtener el equipo:", err);
      setError(`Error al cargar el equipo: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  }, [teamId, getTeamById, teams]);

  // Preparar opciones para selectores
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
    { name: 'team', label: 'Nombre del Equipo', type: 'text', required: true },
    { 
      name: 'competitionId', 
      label: 'Competición', 
      type: 'select', 
      required: true,
      options: competitionOptions
    },
    { name: 'color', label: 'Color', type: 'color', required: true },
    { name: 'position', label: 'Posición', type: 'number', required: true },
    { name: 'points', label: 'Puntos', type: 'number', required: true },
    { name: 'wins', label: 'Victorias', type: 'number', required: true },
    { name: 'podiums', label: 'Podios', type: 'number', required: true },
  ];

  const handleSubmit = useCallback(async (data: any) => {
    console.log("Enviando datos para actualizar:", data);
    const result = await updateTeam(teamId, data);
    console.log("Resultado de la actualización:", result);
    return result;
  }, [teamId, updateTeam]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-900/50 border border-red-800 rounded-md p-4 text-red-300 mb-4">
          {error}
        </div>
        <button 
          onClick={() => router.push('/dashboard/teams')}
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
        >
          Volver a la lista de equipos
        </button>
      </div>
    );
  }

  return team ? (
    <EntityForm
      fields={fields}
      initialData={team}
      onSubmit={handleSubmit}
      entityName="Equipo"
      entityPath="teams"
      isEditing={true}
    />
  ) : (
    <div className="p-6">
      <div className="bg-yellow-900/50 border border-yellow-800 rounded-md p-4 text-yellow-300 mb-4">
        No se pudo cargar la información del equipo. Por favor, vuelve a intentarlo.
      </div>
      <button 
        onClick={() => router.push('/dashboard/teams')}
        className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
      >
        Volver a la lista de equipos
      </button>
    </div>
  );
}
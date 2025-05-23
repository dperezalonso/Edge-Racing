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
  const {  loading, getTeamById, updateTeam } = useTeams();
  const { competitions, loading: competitionsLoading } = useCompetitions();
  const [team, setTeam] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);

  // Cargar datos del equipo
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setFormLoading(true);
        const foundTeam = await getTeamById(teamId);

        if (foundTeam) {
          setTeam(foundTeam);
          // Cualquier lógica adicional de inicialización
        } else {
          setError('Equipo no encontrado. Verifica el ID en la URL.');
        }
      } catch (err) {
        console.error("Error al obtener el equipo:", err);
        setError(`Error al cargar el equipo: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      } finally {
        setFormLoading(false);
      }
    };

    fetchTeam();
  }, [teamId, getTeamById]);

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
    { name: 'points', label: 'Puntos', type: 'number', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: false },
    { name: 'logo', label: 'URL del Logo', type: 'text', required: false },
    { name: 'color', label: 'Color', type: 'color', required: true },
  ];

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(async (data: any) => {
    try {
      // Preparar datos para la API
      const teamData = {
        ...data,
        // Convertir puntos a número
        points: parseInt(data.points, 10) || 0
      };

      // Enviar a la API
      const result = await updateTeam(teamId, teamData);
      return result;
    } catch (error) {
      console.error("Error al actualizar equipo:", error);
      throw error;
    }
  }, [teamId, updateTeam]);

  if (loading || competitionsLoading || formLoading) {
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
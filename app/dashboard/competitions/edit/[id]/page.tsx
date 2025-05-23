'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function EditCompetitionPage() {
  const params = useParams();
  const competitionId = params.id as string;
  const router = useRouter();
  const {  loading, getCompetitionById, updateCompetition } = useCompetitions();
  const [competition, setCompetition] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos de la competición
  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        setFormLoading(true);
        const foundCompetition = await getCompetitionById(competitionId);

        if (foundCompetition) {
          setCompetition(foundCompetition);
          // Cualquier lógica adicional de inicialización
        } else {
          setError('Competición no encontrada. Verifica el ID en la URL.');
        }
      } catch (err) {
        console.error("Error al obtener la competición:", err);
        setError(`Error al cargar la competición: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      } finally {
        setFormLoading(false);
      }
    };

    fetchCompetition();
  }, [competitionId, getCompetitionById]);

  // Definir campos para el formulario
  const fields = [
    { name: 'name', label: 'Nombre de la Competición', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'text', required: true },
    { name: 'season', label: 'Temporada', type: 'text', required: true },
    { name: 'image', label: 'URL del Logo', type: 'text', required: false },
    {
      name: 'status', label: 'Estado', type: 'select', required: true,
      options: [
        { label: 'Activo', value: 'ongoing' },
        { label: 'Terminado', value: 'finished' },
        { label: 'Próximamente', value: 'upcoming' }
      ]
    },
    { name: 'color', label: 'Color', type: 'color', required: true },
  ];

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(async (data: any) => {
    try {
      // Preparar datos para la API
      const competitionData = {
        ...data,
        // Asegúrate de que todos los campos estén presentes
        name: data.name.trim(),
        description: data.description.trim(),
        status: data.status || 'active'
      };

      // Enviar a la API
      const result = await updateCompetition(competitionId, competitionData);
      return result;
    } catch (error) {
      console.error("Error al actualizar competición:", error);
      throw error;
    }
  }, [competitionId, updateCompetition]);

  if (loading || formLoading) {
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
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/dashboard/competitions')}
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
          >
            Volver a la lista de competiciones
          </button>
        </div>
      </div>
    );
  }

  return competition ? (
    <EntityForm
      fields={fields}
      initialData={competition}
      onSubmit={handleSubmit}
      entityName="Competición"
      entityPath="competitions"
      isEditing={true}
    />
  ) : (
    <div className="p-6">
      <div className="bg-yellow-900/50 border border-yellow-800 rounded-md p-4 text-yellow-300 mb-4">
        No se pudo cargar la información de la competición. Por favor, vuelve a intentarlo.
      </div>
      <button
        onClick={() => router.push('/dashboard/competitions')}
        className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
      >
        Volver a la lista de competiciones
      </button>
    </div>
  );
}
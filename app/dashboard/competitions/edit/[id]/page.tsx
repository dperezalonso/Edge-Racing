'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function EditCompetitionPage() {
  const params = useParams();
  const competitionId = params.id as string;
  const router = useRouter();
  const { competitions, loading: competitionsLoading, getCompetitionById, updateCompetition } = useCompetitions();
  const [competition, setCompetition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Esperar a que las competiciones se carguen antes de buscar por ID
  useEffect(() => {
    // Solo ejecutar cuando las competiciones estén cargadas
    if (!competitionsLoading && competitions.length > 0) {
      console.log("Competiciones cargadas, intentando obtener competición con ID:", competitionId);
      console.log("Competiciones disponibles:", competitions);
      
      try {
        const competitionData = getCompetitionById(competitionId);
        console.log("Resultado de getCompetitionById:", competitionData);
        
        if (competitionData) {
          setCompetition(competitionData);
        } else {
          setError('Competición no encontrada. Verifica el ID en la URL.');
          console.error("No se encontró la competición con ID:", competitionId);
          console.error("IDs disponibles:", competitions.map(c => c.id));
        }
      } catch (err) {
        console.error("Error al obtener la competición:", err);
        setError(`Error al cargar la competición: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      } finally {
        setLoading(false);
      }
    } else if (!competitionsLoading && competitions.length === 0) {
      // Si no hay competiciones después de cargar
      setError('No hay competiciones disponibles para editar.');
      setLoading(false);
    }
    // No cambiar loading si aún estamos cargando las competiciones
  }, [competitionId, getCompetitionById, competitions, competitionsLoading]);

  // Definir campos para el formulario
  const fields = [
    { name: 'name', label: 'Nombre de la Competición', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'text', required: true },
    { name: 'season', label: 'Temporada', type: 'text', required: true },
    { name: 'logo', label: 'URL del Logo', type: 'text', required: false },
    { name: 'color', label: 'Color', type: 'color', required: true },
  ];

  const handleSubmit = useCallback(async (data: any) => {
    console.log("Enviando datos para actualizar:", data);
    try {
      // Usando try/catch para manejar errores en la actualización
      const result = await updateCompetition(competitionId, data);
      console.log("Resultado de la actualización:", result);
      return result;
    } catch (error) {
      console.error("Error al actualizar:", error);
      throw error;
    }
  }, [competitionId, updateCompetition]);

  // Mostrar indicador de carga mientras las competiciones se están cargando
  if (competitionsLoading || (loading && competitions.length > 0)) {
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
          <button 
            onClick={() => {
              console.log("IDs disponibles:", competitions.map(c => ({id: c.id, name: c.name})));
              alert(`IDs disponibles: ${competitions.map(c => c.id).join(', ')}`);
            }}
            className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Mostrar IDs disponibles
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
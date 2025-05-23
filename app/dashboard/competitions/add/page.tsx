'use client';

import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function AddCompetitionPage() {
  const { addCompetition } = useCompetitions();

  // Definir campos para el formulario de competiciones
  const fields = [
    { name: 'name', label: 'Nombre de la Competición', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'text', required: true },
    { name: 'season', label: 'Temporada', type: 'text', required: true, 
      defaultValue: new Date().getFullYear().toString() },
    { name: 'image', label: 'URL del Logo', type: 'text', required: false },
    { name: 'status', label: 'Estado', type: 'select', required: true,
      options: [
        { label: 'Activo', value: 'ongoing' },
        { label: 'Terminado', value: 'finished' },
        { label: 'Próximamente', value: 'upcoming' }
      ],
      defaultValue: 'ongoing'
    },
    { name: 'color', label: 'Color', type: 'color', required: true, 
      defaultValue: '#e10600' },
  ];

  // Función para manejar el envío del formulario
  const handleSubmit = async (data: any) => {
    try {
      // Preparar datos para la API
      const competitionData = {
        ...data,
        // Asegúrate de que todos los campos requeridos por la API estén presentes
        name: data.name.trim(),
        description: data.description.trim(),
        status: data.status || 'ongoing',
        season: data.season || new Date().getFullYear().toString(),
        image: data.image || '',
        // También asignar el color
        color: data.color || '#e10600'
      };
      
      // Enviar a la API a través del hook
      const result = await addCompetition(competitionData);
      return result;
    } catch (error) {
      console.error('Error al crear competición:', error);
      throw error;
    }
  };

  return (
    <EntityForm
      fields={fields}
      onSubmit={handleSubmit}
      entityName="Competición"
      entityPath="competitions"
    />
  );
}
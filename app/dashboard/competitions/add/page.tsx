'use client';

import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function AddCompetitionPage() {
  const { addCompetition } = useCompetitions();

  // Definir campos para el formulario
  const fields = [
    { name: 'name', label: 'Nombre de la Competición', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'text', required: true },
    { name: 'season', label: 'Temporada', type: 'text', required: true },
    { name: 'logo', label: 'URL del Logo', type: 'text', required: false },
    { name: 'color', label: 'Color', type: 'color', required: true },
  ];

  return (
    <EntityForm
      fields={fields}
      onSubmit={addCompetition}
      entityName="Competición"
      entityPath="competitions"
    />
  );
}
'use client';

import { useDrivers } from '@/lib/hooks/useDrivers';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';
import { useEffect, useState } from 'react';

export default function AddDriverPage() {
  const { addDriver } = useDrivers();
  const { competitions } = useCompetitions();
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);
  const [teamOptions, setTeamOptions] = useState<{ label: string; value: string; color: string }[]>([]);

  useEffect(() => {
    // Preparar opciones para el selector de competiciones
    if (competitions.length > 0) {
      const options = competitions.map(comp => ({
        label: comp.name,
        value: comp.id
      }));
      setCompetitionOptions(options);
    }

    // Simular opciones para equipos (en una app real esto vendría de otra API/hook)
    setTeamOptions([
      { label: 'Red Bull Racing', value: 'Red Bull Racing', color: '#0600EF' },
      { label: 'Ferrari', value: 'Ferrari', color: '#DC0000' },
      { label: 'Mercedes', value: 'Mercedes', color: '#00D2BE' },
      { label: 'McLaren', value: 'McLaren', color: '#FF8700' },
      { label: 'Aston Martin', value: 'Aston Martin', color: '#006F62' },
      { label: 'Ducati Lenovo', value: 'Ducati Lenovo', color: '#FF0000' },
      { label: 'Pramac Racing', value: 'Pramac Racing', color: '#2596be' },
      { label: 'Aprilia Racing', value: 'Aprilia Racing', color: '#41BFFF' },
      { label: 'Gresini Racing', value: 'Gresini Racing', color: '#56A0D3' },
    ]);
  }, [competitions]);

  // Definir campos para el formulario
  const fields = [
    { name: 'driver', label: 'Nombre del Piloto', type: 'text', required: true },
    { name: 'nationality', label: 'Nacionalidad', type: 'text', required: true },
    { 
      name: 'competitionId', 
      label: 'Competición', 
      type: 'select', 
      required: true,
      options: competitionOptions
    },
    { name: 'position', label: 'Posición', type: 'number', required: true },
    { 
      name: 'team', 
      label: 'Equipo', 
      type: 'select', 
      required: true, 
      options: teamOptions.map(t => ({ label: t.label, value: t.value }))
    },
    { name: 'teamColor', label: 'Color del Equipo', type: 'color', required: true },
    { name: 'points', label: 'Puntos', type: 'number', required: true },
    { name: 'wins', label: 'Victorias', type: 'number', required: true },
    { name: 'podiums', label: 'Podios', type: 'number', required: true },
  ];

  return (
    <EntityForm
      fields={fields}
      onSubmit={addDriver}
      entityName="Piloto"
      entityPath="drivers"
    />
  );
}
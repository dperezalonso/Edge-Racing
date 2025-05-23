'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDrivers } from '@/lib/hooks/useDrivers';
import { useTeams } from '@/lib/hooks/useTeams';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function AddDriverPage() {

  const { addDriver } = useDrivers();
  const { teams, loading: teamsLoading } = useTeams();
  const { competitions, loading: competitionsLoading } = useCompetitions();
  
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);
  const [teamOptions, setTeamOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');

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

  // Preparar opciones para el selector de equipos
  useEffect(() => {
    if (teams.length > 0) {
      // Filtrar equipos por competición si hay alguna seleccionada
      const filteredTeams = selectedCompetition
        ? teams.filter(team => team.competition_id === selectedCompetition)
        : teams;
      
      const options = filteredTeams.map(team => ({
        label: team.name,
        value: team.id
      }));
      
      setTeamOptions(options);
    }
  }, [teams, selectedCompetition]);

  // Función para manejar cambios en el selector de competición
  const handleCompetitionChange = useCallback((value: string) => {
    console.log("Competición seleccionada:", value);
    setSelectedCompetition(value);
  }, []);

  // Definir campos para el formulario
  const getFormFields = useCallback(() => {
    return [
      { name: 'first_name', label: 'Nombre', type: 'text', required: true },
      { name: 'last_name', label: 'Apellido', type: 'text', required: true },
      { name: 'birth_country', label: 'Nacionalidad', type: 'text', required: true },
      { 
        name: 'competition_id', 
        label: 'Competición', 
        type: 'select', 
        required: true,
        options: competitionOptions,
 
      },
      { 
        name: 'team_id', 
        label: 'Equipo', 
        type: 'select', 
        required: true, 
        options: teamOptions
      },
      { name: 'vehicle_number', label: 'Número', type: 'number', required: true },
      { name: 'birth_date', label: 'Fecha de Nacimiento', type: 'date', required: true },
      { name: 'points', label: 'Puntos', type: 'number', required: true },
      { 
        name: 'active', 
        label: 'Estado', 
        type: 'select', 
        required: true,
        options: [
          { label: 'Activo', value: 'true' },
          { label: 'Inactivo', value: 'false' }
        ]
      },
      { name: 'profile_image', label: 'URL de la Imagen', type: 'text', required: false },
    ];
  }, [competitionOptions, teamOptions, handleCompetitionChange]);

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(async (data: any) => {
    try {
      // Preparar datos para la API
      const driverData = {
        ...data,
        // Convertir valores numéricos
        points: parseInt(data.points, 10) || 0,
        vehicle_number: parseInt(data.vehicle_number, 10) || 0,
        // Convertir valor booleano (si viene como string)
        active: typeof data.active === 'string' ? data.active === 'true' : Boolean(data.active)
      };
      
      // Enviar a la API
      const result = await addDriver(driverData);
      return result;
    } catch (error) {
      console.error("Error al crear piloto:", error);
      throw error;
    }
  }, [addDriver]);

  if (teamsLoading || competitionsLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
      </div>
    );
  }

  return (
    <EntityForm
      fields={getFormFields()}
      initialData={{
        points: 0,
        vehicle_number: '',
        active: 'true'
      }}
      onSubmit={handleSubmit}
      entityName="Piloto"
      entityPath="drivers"
      isEditing={false}
    />
  );
}
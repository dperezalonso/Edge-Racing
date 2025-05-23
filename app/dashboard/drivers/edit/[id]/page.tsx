'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDrivers } from '@/lib/hooks/useDrivers';
import { useTeams } from '@/lib/hooks/useTeams';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function EditDriverPage() {
  const params = useParams();
  const driverId = params.id as string;
  const router = useRouter();
  const { drivers, loading: driversLoading, getDriverById, updateDriver, refreshDrivers } = useDrivers();
  const { teams, loading: teamsLoading } = useTeams();
  const { competitions, loading: competitionsLoading } = useCompetitions();
  const [driver, setDriver] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);
  const [teamOptions, setTeamOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');

  // Cargar datos del piloto
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        setFormLoading(true);
        const foundDriver = await getDriverById(driverId);

        if (foundDriver) {
          setDriver(foundDriver);
          setSelectedCompetition(foundDriver.competition_id);
        } else {
          setError('Piloto no encontrado. Verifica el ID en la URL.');
        }
      } catch (err) {
        console.error("Error al obtener el piloto:", err);
        setError(`Error al cargar el piloto: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      } finally {
        setFormLoading(false);
      }
    };

    fetchDriver();
  }, [driverId, getDriverById]);

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
      // Si hay una competición seleccionada, filtrar los equipos
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

  // Procesar datos iniciales para el formulario
  const getInitialData = useCallback(() => {
    if (!driver) return {};

    return {
      ...driver,
      // Convertir booleano a string para el select
      active: driver.active ? 'true' : 'false'
    };
  }, [driver]);

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
      const result = await updateDriver(driverId, driverData);
      return result;
    } catch (error) {
      console.error("Error al actualizar piloto:", error);
      throw error;
    }
  }, [driverId, updateDriver]);

  if (driversLoading || teamsLoading || competitionsLoading || formLoading) {
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
          onClick={() => router.push('/dashboard/drivers')}
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
        >
          Volver a la lista de pilotos
        </button>
      </div>
    );
  }

  return driver ? (
    <EntityForm
      fields={getFormFields()}
      initialData={getInitialData()}
      onSubmit={handleSubmit}
      entityName="Piloto"
      entityPath="drivers"
      isEditing={true}
    />
  ) : (
    <div className="p-6">
      <div className="bg-yellow-900/50 border border-yellow-800 rounded-md p-4 text-yellow-300 mb-4">
        No se pudo cargar la información del piloto. Por favor, vuelve a intentarlo.
      </div>
      <button
        onClick={() => router.push('/dashboard/drivers')}
        className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
      >
        Volver a la lista de pilotos
      </button>
    </div>
  );
}
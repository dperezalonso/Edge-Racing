'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDrivers } from '@/lib/hooks/useDrivers';
import { useCompetitions } from '@/lib/hooks/useCompetitions';
import EntityForm from '@/components/crud/EntityForm';

export default function EditDriverPage() {
  const params = useParams();
  const driverId = params.id as string;
  const router = useRouter();
  const { drivers, loading: driversLoading, getDriverById, updateDriver } = useDrivers();
  const { competitions, loading: competitionsLoading } = useCompetitions();
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competitionOptions, setCompetitionOptions] = useState<{ label: string; value: string }[]>([]);
  const [teamOptions, setTeamOptions] = useState<{ label: string; value: string; color: string }[]>([]);

  // Cargar datos del piloto cuando los drivers estén disponibles
  useEffect(() => {
    if (!driversLoading && drivers.length > 0) {
      console.log("Pilotos cargados, intentando obtener piloto con ID:", driverId);
      console.log("Pilotos disponibles:", drivers);
      
      try {
        const driverData = getDriverById(driverId);
        console.log("Resultado de getDriverById:", driverData);
        
        if (driverData) {
          setDriver(driverData);
        } else {
          setError('Piloto no encontrado. Verifica el ID en la URL.');
          console.error("No se encontró el piloto con ID:", driverId);
          console.error("IDs disponibles:", drivers.map(d => d.id));
        }
      } catch (err) {
        console.error("Error al obtener el piloto:", err);
        setError(`Error al cargar el piloto: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      } finally {
        setLoading(false);
      }
    } else if (!driversLoading && drivers.length === 0) {
      setError('No hay pilotos disponibles para editar.');
      setLoading(false);
    }
  }, [driverId, getDriverById, drivers, driversLoading]);

  // Preparar opciones para selectores cuando las competiciones estén disponibles
  useEffect(() => {
    if (!competitionsLoading && competitions.length > 0) {
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
  }, [competitions, competitionsLoading]);

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

  const handleSubmit = useCallback(async (data: any) => {
    console.log("Enviando datos para actualizar:", data);
    try {
      const result = await updateDriver(driverId, data);
      console.log("Resultado de la actualización:", result);
      return result;
    } catch (error) {
      console.error("Error al actualizar:", error);
      throw error;
    }
  }, [driverId, updateDriver]);

  if (driversLoading || (loading && drivers.length > 0)) {
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
            onClick={() => router.push('/dashboard/drivers')}
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
          >
            Volver a la lista de pilotos
          </button>
          <button 
            onClick={() => {
              console.log("IDs disponibles:", drivers.map(d => ({id: d.id, name: d.driver})));
              alert(`IDs disponibles: ${drivers.map(d => d.id).join(', ')}`);
            }}
            className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Mostrar IDs disponibles
          </button>
        </div>
      </div>
    );
  }

  return driver ? (
    <EntityForm
      fields={fields}
      initialData={driver}
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
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Driver } from '../../types/models';
import apiClient from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar datos desde la API
  const fetchDrivers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener datos de la API
      const response = await apiClient.get(API_ENDPOINTS.drivers);
      console.log("Pilotos cargados desde API:", response.data);

      // Transformar los datos para mantener compatibilidad con UI
      const formattedDrivers = response.data.map((driver: any) => {
        // Buscar información del equipo si es necesario (esto se haría de forma más eficiente con endpoints específicos)
        return {
          ...driver,
          // Campos calculados para UI
          driver: `${driver.first_name} ${driver.last_name}`, // Campo calculado para compatibilidad
          nationality: driver.birth_country || driver.nationality || "N/A",
          wins: driver.wins || 0,
          podiums: driver.podiums || 0,
          teamColor: driver.teamColor || getTeamColor(driver.team_id) || "#cccccc"
        };
      });

      setDrivers(formattedDrivers);
      setError(null);
    } catch (error) {
      console.error("Error al cargar pilotos:", error);
      setError('Error al cargar los pilotos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para obtener color del equipo (placeholder, ideal obtenerlo directamente de la API)
  const getTeamColor = (teamId: string) => {
    // Colores predefinidos para equipos conocidos
    const teamColors: Record<string, string> = {
      'redbull': '#0600EF',
      'ferrari': '#DC0000',
      'mercedes': '#00D2BE',
      'mclaren': '#FF8700',
      'astonmartin': '#006F62',
      'ducat': '#FF0000',
      'pramac': '#2596be',
      'aprilia': '#41BFFF',
      'gresini': '#56A0D3'
    };

    return teamColors[teamId] || null;
  };

  // Cargar datos al iniciar
  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  // Obtener un piloto por ID
  const getDriverById = useCallback(async (id: string) => {
    // Primero, buscar en el array de drivers local
    let driver = drivers.find(driver => driver.id === id);

    // Si no lo encuentra en local, hacer una llamada a la API
    if (!driver) {
      try {
        const response = await apiClient.get(`/driver/show/${id}`);
        driver = response.data;
      } catch (error) {
        console.error('Error al obtener detalles del piloto:', error);
        return null;
      }
    }

    return driver || null;
  }, [drivers]);

  // Filtrar pilotos por competición
  const getDriversByCompetition = useCallback((competitionId: string) => {
    return drivers.filter(driver => driver.competition_id === competitionId);
  }, [drivers]);

  // Añadir un nuevo piloto
  const addDriver = useCallback(async (driver: Omit<Driver, 'id'>) => {
    try {
      // Preparar datos para la API
      const apiData = {
        ...driver,
        points: driver.points || 0,
        active: driver.active !== undefined ? driver.active : true,
        // Asegurar que los campos requeridos tienen valores
        birth_date: driver.birth_date || new Date().toISOString().slice(0, 10)
      };

      // Enviar a la API
      const response = await apiClient.post(API_ENDPOINTS.driverNew, apiData);
      console.log("Piloto añadido:", response.data);

      // Actualizar state
      await fetchDrivers(); // Mejor recargar todos los datos 
      router.refresh();

      return response.data;
    } catch (error) {
      console.error("Error al añadir piloto:", error);
      setError('Error al añadir el piloto');
      throw error;
    }
  }, [fetchDrivers, router]);

  // Actualizar un piloto existente
  const updateDriver = useCallback(async (id: string, updatedData: Partial<Driver>) => {
    try {
      // Enviar a la API
      const response = await apiClient.post(API_ENDPOINTS.driverEdit(id), updatedData);
      console.log("Piloto actualizado:", response.data);

      // Actualizar state
      await fetchDrivers(); // Mejor recargar todos los datos
      router.refresh();

      return response.data;
    } catch (error) {
      console.error("Error al actualizar piloto:", error);
      setError('Error al actualizar el piloto');
      throw error;
    }
  }, [fetchDrivers, router]);

  // Eliminar un piloto
  const deleteDriver = useCallback(async (id: string) => {
    try {
      // Enviar a la API
      await apiClient.get(API_ENDPOINTS.driverDelete(id));
      console.log("Piloto eliminado con ID:", id);

      // Actualizar state
      await fetchDrivers(); // Mejor recargar todos los datos
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar piloto:", error);
      setError('Error al eliminar el piloto');
      throw error;
    }
  }, [fetchDrivers, router]);

  return {
    drivers,
    loading,
    error,
    getDriverById,
    getDriversByCompetition,
    addDriver,
    updateDriver,
    deleteDriver,
    refreshDrivers: fetchDrivers
  };
}

export type { Driver };
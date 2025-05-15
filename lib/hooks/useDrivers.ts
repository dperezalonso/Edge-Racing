'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';

// Definimos la interfaz para Driver y la exportamos
export interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_country: string;
  vehicle_number: number;
  profile_image: string | null;
  active: boolean;
  points: number;
  team_id: string;
  competition_id: string;
  // Campos calculados/adicionales
  position?: number;
  wins?: number;
  podiums?: number;
  // Campos para UI
  teamColor?: string;
  team?: string; // Nombre del equipo
  nationality?: string; // Alias para birth_country
}

// Key para almacenamiento en localStorage (solo para modo desarrollo)
const STORAGE_KEY = 'edge_racing_drivers';

// Mock data inicial (simulación para desarrollo)
const initialDrivers: Driver[] = [
  { 
    id: "verstappen",
    first_name: "Max",
    last_name: "Verstappen",
    birth_date: "1997-09-30",
    birth_country: "NED",
    vehicle_number: 1,
    profile_image: "/images/drivers/verstappen.jpg",
    active: true,
    points: 280,
    team_id: "redbull",
    competition_id: "formula1",
    // Campos calculados para UI
    position: 1,
    wins: 8,
    podiums: 11,
    teamColor: "#0600EF",
    team: "Red Bull Racing",
    nationality: "NED"
  },
  { 
    id: "norris",
    first_name: "Lando",
    last_name: "Norris",
    birth_date: "1999-11-13",
    birth_country: "GBR",
    vehicle_number: 4,
    profile_image: "/images/drivers/norris.jpg",
    active: true,
    points: 219,
    team_id: "mclaren",
    competition_id: "formula1",
    position: 2,
    wins: 1,
    podiums: 9,
    teamColor: "#FF8700",
    team: "McLaren",
    nationality: "GBR"
  },
  // Más pilotos...
];

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Cargar datos desde la API o localStorage como fallback
  useEffect(() => {
    if (!isInitialized) {
      const fetchDrivers = async () => {
        try {
          // Intentar obtener datos de la API
          const response = await apiClient.get(API_ENDPOINTS.drivers);
          console.log("Datos obtenidos de la API:", response.data);
          
          // Transformar los datos al formato esperado por la UI
          const formattedDrivers = response.data.map((driver: any) => ({
            ...driver,
            // Crear campos derivados para compatibilidad con la UI
            driver: `${driver.first_name} ${driver.last_name}`, // Campo calculado
            nationality: driver.birth_country,
          }));
          
          setDrivers(formattedDrivers);
        } catch (error) {
          console.error("Error al cargar pilotos desde API:", error);
          
          // Fallback a localStorage en modo desarrollo
          try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
              console.log("Usando datos de localStorage como fallback");
              setDrivers(JSON.parse(storedData));
            } else {
              console.log("Usando datos mock como fallback");
              setDrivers(initialDrivers);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDrivers));
            }
          } catch (localError) {
            console.error("Error completo al cargar drivers:", localError);
            setError('Error al cargar los pilotos');
            setDrivers(initialDrivers);
          }
        } finally {
          setLoading(false);
          setIsInitialized(true);
        }
      };

      fetchDrivers();
    }
  }, [isInitialized]);

  // Actualizar localStorage en desarrollo cuando cambian los drivers
  useEffect(() => {
    if (isInitialized && !loading && process.env.NODE_ENV === 'development') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drivers));
    }
  }, [drivers, loading, isInitialized]);

  // Obtener un piloto por ID
  const getDriverById = useCallback((id: string) => {
    console.log("Buscando piloto con ID:", id);
    
    const driver = drivers.find(driver => driver.id === id);
    console.log("Piloto encontrado:", driver);
    
    return driver || null;
  }, [drivers]);

  // Filtrar pilotos por competición
  const getDriversByCompetition = useCallback((competitionId: string) => {
    return drivers.filter(driver => driver.competition_id === competitionId);
  }, [drivers]);

  // Añadir un nuevo piloto
  const addDriver = useCallback(async (driver: Omit<Driver, 'id'>) => {
    try {
      // Usar el endpoint correcto para crear un nuevo driver
      const response = await apiClient.post(API_ENDPOINTS.driverNew, driver);
      const newDriver = response.data;
      
      setDrivers(prevDrivers => [...prevDrivers, newDriver]);
      console.log("Piloto añadido:", newDriver);
      router.refresh();
      return newDriver;
    } catch (error) {
      console.error("Error al añadir piloto:", error);
      setError('Error al añadir el piloto');
      throw error;
    }
  }, [router]);

  // Actualizar un piloto existente
  const updateDriver = useCallback(async (id: string, updatedData: Partial<Driver>) => {
    try {
      // Enviar a la API
      const response = await apiClient.put(`${API_ENDPOINTS.drivers}/${id}`, updatedData);
      const updatedDriver = response.data;
      
      setDrivers(prevDrivers => {
        return prevDrivers.map(driver => 
          driver.id === id ? { ...driver, ...updatedDriver } : driver
        );
      });
      
      router.refresh();
      return updatedDriver;
    } catch (error) {
      console.error("Error al actualizar piloto:", error);
      setError('Error al actualizar el piloto');
      throw error;
    }
  }, [router]);

  // Eliminar un piloto
  const deleteDriver = useCallback(async (id: string) => {
    try {
      // Enviar a la API
      await apiClient.delete(`${API_ENDPOINTS.drivers}/${id}`);
      
      setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar piloto:", error);
      setError('Error al eliminar el piloto');
      throw error;
    }
  }, [router]);

  return {
    drivers,
    loading,
    error,
    getDriverById,
    getDriversByCompetition,
    addDriver,
    updateDriver,
    deleteDriver
  };
}
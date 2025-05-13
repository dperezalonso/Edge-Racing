'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Define la interfaz para Driver
export interface Driver {
  id: string;
  position: number;
  driver: string;
  nationality: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  teamColor: string;
  competitionId: string; // Añadido para permitir filtrado por competición
}

// Mock data inicial (simulación de una base de datos)
const initialDrivers: Driver[] = [
  { 
    id: "verstappen",
    position: 1, 
    driver: "Max Verstappen", 
    nationality: "NED", 
    team: "Red Bull Racing", 
    points: 280, 
    wins: 8, 
    podiums: 11,
    teamColor: "#0600EF",
    competitionId: "formula1"
  },
  { 
    id: "norris",
    position: 2, 
    driver: "Lando Norris", 
    nationality: "GBR", 
    team: "McLaren", 
    points: 219, 
    wins: 1, 
    podiums: 9,
    teamColor: "#FF8700",
    competitionId: "formula1"
  },
  { 
    id: "leclerc",
    position: 3, 
    driver: "Charles Leclerc", 
    nationality: "MON", 
    team: "Ferrari", 
    points: 208, 
    wins: 2, 
    podiums: 8,
    teamColor: "#DC0000",
    competitionId: "formula1"
  },
  {
    id: "martin",
    position: 1,
    driver: "Jorge Martín",
    nationality: "ESP",
    team: "Pramac Racing",
    points: 275,
    wins: 5,
    podiums: 12,
    teamColor: "#2596be",
    competitionId: "motogp"
  },
  {
    id: "bagnaia",
    position: 2,
    driver: "Francesco Bagnaia",
    nationality: "ITA",
    team: "Ducati Lenovo",
    points: 270,
    wins: 6,
    podiums: 10,
    teamColor: "#FF0000",
    competitionId: "motogp"
  },
  {
    id: "marquez",
    position: 3,
    driver: "Marc Márquez",
    nationality: "ESP",
    team: "Gresini Racing",
    points: 225,
    wins: 1,
    podiums: 8,
    teamColor: "#56A0D3",
    competitionId: "motogp"
  }
];

// Key para almacenamiento en localStorage
const STORAGE_KEY = 'edge_racing_drivers';

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Cargar datos de localStorage o usar datos iniciales
  useEffect(() => {
    // Evitar múltiples inicializaciones
    if (!isInitialized) {
      try {
        // Intenta obtener los datos de localStorage
        const storedData = localStorage.getItem(STORAGE_KEY);
        console.log("Datos almacenados en localStorage:", storedData);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Datos parseados de localStorage:", parsedData);
          setDrivers(parsedData);
        } else {
          console.log("No hay datos en localStorage, usando iniciales:", initialDrivers);
          setDrivers(initialDrivers);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDrivers));
        }
      } catch (error) {
        console.error("Error al cargar drivers de localStorage:", error);
        setError('Error al cargar los pilotos');
        setDrivers(initialDrivers);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    }
  }, [isInitialized]);

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    if (isInitialized && !loading) {
      console.log("Guardando drivers en localStorage:", drivers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drivers));
    }
  }, [drivers, loading, isInitialized]);

  // Obtener un piloto por ID - IMPORTANTE: Esta función causa problemas
  const getDriverById = useCallback((id: string) => {
    console.log("Buscando piloto con ID:", id);
    console.log("Lista de pilotos disponible:", drivers);
    
    const driver = drivers.find(driver => driver.id === id);
    console.log("Piloto encontrado:", driver);
    
    return driver || null;
  }, [drivers]);

  // Filtrar pilotos por competición
  const getDriversByCompetition = useCallback((competitionId: string) => {
    return drivers.filter(driver => driver.competitionId === competitionId);
  }, [drivers]);

  // Añadir un nuevo piloto
  const addDriver = useCallback(async (driver: Omit<Driver, 'id'>) => {
    try {
      // Generar un ID único basado en el nombre
      const id = driver.driver
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      const newDriver = {
        ...driver,
        id
      };
      
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
      console.log("Actualizando piloto con ID:", id);
      console.log("Datos de actualización:", updatedData);
      
      let updatedDriver: Driver | null = null;
      
      setDrivers(prevDrivers => {
        const index = prevDrivers.findIndex(driver => driver.id === id);
        console.log("Índice del piloto:", index);
        
        if (index === -1) {
          console.error("Piloto no encontrado para actualizar");
          throw new Error('Piloto no encontrado');
        }
        
        const updatedDrivers = [...prevDrivers];
        updatedDrivers[index] = {
          ...updatedDrivers[index],
          ...updatedData
        };
        
        updatedDriver = updatedDrivers[index];
        console.log("Array de pilotos actualizado:", updatedDrivers);
        return updatedDrivers;
      });
      
      router.refresh();
      console.log("Piloto actualizado:", updatedDriver);
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
      console.log("Eliminando piloto con ID:", id);
      setDrivers(prevDrivers => {
        const filteredDrivers = prevDrivers.filter(driver => driver.id !== id);
        console.log("Pilotos después de eliminar:", filteredDrivers);
        return filteredDrivers;
      });
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
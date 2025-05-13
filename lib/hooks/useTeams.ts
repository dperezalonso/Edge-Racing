'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Define la interfaz para Team
export interface Team {
  id: string;
  position: number;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  color: string;
  competitionId: string; // Añadido para permitir filtrado por competición
}

// Mock data inicial (simulación de una base de datos)
const initialTeams: Team[] = [
  {
    id: "redbull",
    position: 1,
    team: "Red Bull Racing",
    points: 423,
    wins: 8,
    podiums: 13,
    color: "#0600EF",
    competitionId: "formula1"
  },
  {
    id: "mclaren",
    position: 2,
    team: "McLaren",
    points: 406,
    wins: 2,
    podiums: 16,
    color: "#FF8700",
    competitionId: "formula1"
  },
  {
    id: "ferrari",
    position: 3,
    team: "Ferrari",
    points: 392,
    wins: 3,
    podiums: 14,
    color: "#DC0000",
    competitionId: "formula1"
  },
  {
    id: "ducati",
    position: 1,
    team: "Ducati Lenovo Team",
    points: 475,
    wins: 8,
    podiums: 16,
    color: "#FF0000",
    competitionId: "motogp"
  },
  {
    id: "pramac",
    position: 2,
    team: "Pramac Racing",
    points: 419,
    wins: 5,
    podiums: 14,
    color: "#2596be",
    competitionId: "motogp"
  },
  {
    id: "aprilia",
    position: 3,
    team: "Aprilia Racing",
    points: 295,
    wins: 1,
    podiums: 6,
    color: "#41BFFF",
    competitionId: "motogp"
  }
];

// Key para almacenamiento en localStorage
const STORAGE_KEY = 'edge_racing_teams';

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
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
        console.log("Datos almacenados en localStorage (equipos):", storedData);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Datos parseados de localStorage (equipos):", parsedData);
          setTeams(parsedData);
        } else {
          console.log("No hay datos en localStorage, usando iniciales (equipos):", initialTeams);
          setTeams(initialTeams);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTeams));
        }
      } catch (error) {
        console.error("Error al cargar equipos de localStorage:", error);
        setError('Error al cargar los equipos');
        setTeams(initialTeams);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    }
  }, [isInitialized]);

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    if (isInitialized && !loading) {
      console.log("Guardando equipos en localStorage:", teams);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
    }
  }, [teams, loading, isInitialized]);

  // Obtener un equipo por ID
  const getTeamById = useCallback((id: string) => {
    console.log("Buscando equipo con ID:", id);
    console.log("Lista de equipos disponible:", teams);
    
    const team = teams.find(team => team.id === id);
    console.log("Equipo encontrado:", team);
    
    return team || null;
  }, [teams]);

  // Filtrar equipos por competición
  const getTeamsByCompetition = useCallback((competitionId: string) => {
    return teams.filter(team => team.competitionId === competitionId);
  }, [teams]);

  // Añadir un nuevo equipo
  const addTeam = useCallback(async (team: Omit<Team, 'id'>) => {
    try {
      // Generar un ID único basado en el nombre
      const id = team.team
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      const newTeam = {
        ...team,
        id
      };
      
      setTeams(prevTeams => [...prevTeams, newTeam]);
      console.log("Equipo añadido:", newTeam);
      router.refresh();
      return newTeam;
    } catch (error) {
      console.error("Error al añadir equipo:", error);
      setError('Error al añadir el equipo');
      throw error;
    }
  }, [router]);

  // Actualizar un equipo existente
  const updateTeam = useCallback(async (id: string, updatedData: Partial<Team>) => {
    try {
      console.log("Actualizando equipo con ID:", id);
      console.log("Datos de actualización:", updatedData);
      
      let updatedTeam: Team | null = null;
      
      setTeams(prevTeams => {
        const index = prevTeams.findIndex(team => team.id === id);
        console.log("Índice del equipo:", index);
        
        if (index === -1) {
          console.error("Equipo no encontrado para actualizar");
          throw new Error('Equipo no encontrado');
        }
        
        const updatedTeams = [...prevTeams];
        updatedTeams[index] = {
          ...updatedTeams[index],
          ...updatedData
        };
        
        updatedTeam = updatedTeams[index];
        console.log("Array de equipos actualizado:", updatedTeams);
        return updatedTeams;
      });
      
      router.refresh();
      console.log("Equipo actualizado:", updatedTeam);
      return updatedTeam;
    } catch (error) {
      console.error("Error al actualizar equipo:", error);
      setError('Error al actualizar el equipo');
      throw error;
    }
  }, [router]);

  // Eliminar un equipo
  const deleteTeam = useCallback(async (id: string) => {
    try {
      console.log("Eliminando equipo con ID:", id);
      setTeams(prevTeams => {
        const filteredTeams = prevTeams.filter(team => team.id !== id);
        console.log("Equipos después de eliminar:", filteredTeams);
        return filteredTeams;
      });
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
      setError('Error al eliminar el equipo');
      throw error;
    }
  }, [router]);

  return {
    teams,
    loading,
    error,
    getTeamById,
    getTeamsByCompetition,
    addTeam,
    updateTeam,
    deleteTeam
  };
}
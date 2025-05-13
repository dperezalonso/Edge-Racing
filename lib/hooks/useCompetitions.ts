'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Define la interfaz para Competition
export interface Competition {
  id: string;
  name: string;
  description: string;
  season: string;
  logo?: string;
  color: string;
}

// Mock data inicial (simulación de una base de datos)
const initialCompetitions: Competition[] = [
  {
    id: "formula1",
    name: "Formula 1",
    logo: "/images/f1-logo.png",
    description: "Campeonato Mundial de Formula 1",
    season: "2025",
    color: "var(--f1-red)"
  },
  {
    id: "motogp",
    name: "MotoGP",
    logo: "/images/motogp-logo.png",
    description: "Campeonato Mundial de Motociclismo",
    season: "2025",
    color: "var(--motogp-blue)"
  }
];

// Key para almacenamiento en localStorage
const STORAGE_KEY = 'edge_racing_competitions';

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
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
        console.log("Datos almacenados en localStorage (competiciones):", storedData);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Datos parseados de localStorage (competiciones):", parsedData);
          setCompetitions(parsedData);
        } else {
          console.log("No hay datos en localStorage, usando iniciales (competiciones):", initialCompetitions);
          setCompetitions(initialCompetitions);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCompetitions));
        }
      } catch (error) {
        console.error("Error al cargar competiciones de localStorage:", error);
        setError('Error al cargar las competiciones');
        setCompetitions(initialCompetitions);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    }
  }, [isInitialized]);

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    if (isInitialized && !loading) {
      console.log("Guardando competiciones en localStorage:", competitions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(competitions));
    }
  }, [competitions, loading, isInitialized]);

  // Obtener una competición por ID
  const getCompetitionById = useCallback((id: string) => {
    console.log("Buscando competición con ID:", id);
    console.log("Lista de competiciones disponible:", competitions);
    
    const competition = competitions.find(competition => competition.id === id);
    console.log("Competición encontrada:", competition);
    
    return competition || null;
  }, [competitions]);

  // Añadir una nueva competición
  const addCompetition = useCallback(async (competition: Omit<Competition, 'id'>) => {
    try {
      // Generar un ID único basado en el nombre
      const id = competition.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      const newCompetition = {
        ...competition,
        id
      };
      
      setCompetitions(prevCompetitions => [...prevCompetitions, newCompetition]);
      console.log("Competición añadida:", newCompetition);
      router.refresh();
      return newCompetition;
    } catch (error) {
      console.error("Error al añadir competición:", error);
      setError('Error al añadir la competición');
      throw error;
    }
  }, [router]);

  // Actualizar una competición existente
  const updateCompetition = useCallback(async (id: string, updatedData: Partial<Competition>) => {
    try {
      console.log("Actualizando competición con ID:", id);
      console.log("Datos de actualización:", updatedData);
      
      let updatedCompetition: Competition | null = null;
      
      setCompetitions(prevCompetitions => {
        const index = prevCompetitions.findIndex(comp => comp.id === id);
        console.log("Índice de la competición:", index);
        
        if (index === -1) {
          console.error("Competición no encontrada para actualizar");
          throw new Error('Competición no encontrada');
        }
        
        const updatedCompetitions = [...prevCompetitions];
        updatedCompetitions[index] = {
          ...updatedCompetitions[index],
          ...updatedData
        };
        
        updatedCompetition = updatedCompetitions[index];
        console.log("Array de competiciones actualizado:", updatedCompetitions);
        return updatedCompetitions;
      });
      
      router.refresh();
      console.log("Competición actualizada:", updatedCompetition);
      return updatedCompetition;
    } catch (error) {
      console.error("Error al actualizar competición:", error);
      setError('Error al actualizar la competición');
      throw error;
    }
  }, [router]);

  // Eliminar una competición
  const deleteCompetition = useCallback(async (id: string) => {
    try {
      console.log("Eliminando competición con ID:", id);
      setCompetitions(prevCompetitions => {
        const filteredCompetitions = prevCompetitions.filter(comp => comp.id !== id);
        console.log("Competiciones después de eliminar:", filteredCompetitions);
        return filteredCompetitions;
      });
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar competición:", error);
      setError('Error al eliminar la competición');
      throw error;
    }
  }, [router]);

  return {
    competitions,
    loading,
    error,
    getCompetitionById,
    addCompetition,
    updateCompetition,
    deleteCompetition
  };
}
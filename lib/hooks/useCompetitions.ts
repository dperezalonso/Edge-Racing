'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';

// Key para almacenamiento en localStorage
const STORAGE_KEY = 'edge_racing_competitions';

export interface Competition {
  id: string;
  name: string;
  description: string;
  logo?: string;
  color: string;
  season: string;
}

// Mock data inicial (simulación para desarrollo)
const initialCompetitions: Competition[] = [
  {
    id: "formula1",
    name: "Formula 1",
    description: "Campeonato Mundial de Formula 1",
    // image: "/images/f1-logo.png",
    // status: "active",
    // Campos personalizados para UI
    logo: "/images/f1-logo.png",
    season: "2025",
    color: "var(--f1-red)"
  },
  {
    id: "motogp",
    name: "MotoGP",
    description: "Campeonato Mundial de Motociclismo",
    // image: "/images/motogp-logo.png",
    // status: "active",
    // Campos personalizados para UI
    logo: "/images/motogp-logo.png",
    season: "2025",
    color: "var(--motogp-blue)"
  }
];

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Cargar datos desde la API o usar fallback
  useEffect(() => {
    if (!isInitialized) {
      const fetchCompetitions = async () => {
        try {
          // Intentar obtener datos de la API
          const response = await apiClient.get(API_ENDPOINTS.competitions);
          console.log("Datos de competiciones de la API:", response.data);
          
          // Transformar los datos para mantener compatibilidad con UI
          const formattedCompetitions = response.data.map((comp: any) => ({
            ...comp,
            // Mapear campos para mantener compatibilidad con la UI
            logo: comp.image, 
            color: comp.id === "formula1" ? "var(--f1-red)" : 
                  comp.id === "motogp" ? "var(--motogp-blue)" : 
                  "#" + Math.floor(Math.random()*16777215).toString(16), // Color aleatorio para otras competiciones
            season: comp.season || new Date().getFullYear().toString(),
          }));
          
          setCompetitions(formattedCompetitions);
        } catch (error) {
          console.error("Error al cargar competiciones desde API:", error);
          
          // Fallback a localStorage en desarrollo
          try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            
            if (storedData) {
              console.log("Usando datos de competiciones de localStorage como fallback");
              setCompetitions(JSON.parse(storedData));
            } else {
              console.log("Usando datos mock de competiciones como fallback");
              setCompetitions(initialCompetitions);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCompetitions));
            }
          } catch (localError) {
            console.error("Error completo al cargar competiciones:", localError);
            setError('Error al cargar las competiciones');
            setCompetitions(initialCompetitions);
          }
        } finally {
          setLoading(false);
          setIsInitialized(true);
        }
      };

      fetchCompetitions();
    }
  }, [isInitialized]);

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    if (isInitialized && !loading && process.env.NODE_ENV === 'development') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(competitions));
    }
  }, [competitions, loading, isInitialized]);

  // Obtener una competición por ID
  const getCompetitionById = useCallback((id: string) => {
    console.log("Buscando competición con ID:", id);
    
    const competition = competitions.find(competition => competition.id === id);
    console.log("Competición encontrada:", competition);
    
    return competition || null;
  }, [competitions]);

  // Añadir una nueva competición
  const addCompetition = useCallback(async (competition: Omit<Competition, 'id'>) => {
    try {
      // Enviar a la API
      const response = await apiClient.post(API_ENDPOINTS.competitions, competition);
      const newCompetition = response.data;
      
      // Asegurar compatibilidad UI
      newCompetition.logo = newCompetition.image;
      newCompetition.season = newCompetition.season || new Date().getFullYear().toString();
      
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
      // Si hay campos personalizados UI, mapearlos a campos de la BD
      const apiData = { ...updatedData };
      if (apiData.logo) {
        // apiData.image = apiData.logo;
        delete apiData.logo;
      }
      
      // Enviar a la API
      const response = await apiClient.put(`${API_ENDPOINTS.competitions}/${id}`, apiData);
      const updatedCompetition = response.data;
      
      // Asegurar compatibilidad UI en el estado
      updatedCompetition.logo = updatedCompetition.image;
      
      setCompetitions(prevCompetitions => {
        return prevCompetitions.map(comp => 
          comp.id === id ? { ...comp, ...updatedCompetition } : comp
        );
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
      // Enviar a la API
      await apiClient.delete(`${API_ENDPOINTS.competitions}/${id}`);
      
      setCompetitions(prevCompetitions => {
        const filteredCompetitions = prevCompetitions.filter(comp => comp.id !== id);
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

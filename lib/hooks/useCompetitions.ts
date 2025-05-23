'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Competition } from '../../types/models';
import apiClient from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';



export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar datos desde la API
  const fetchCompetitions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener competiciones desde la API
      const response = await apiClient.get(API_ENDPOINTS.competitions);
      console.log("Datos de competiciones de la API:", response.data);

      // Transformar los datos si es necesario para mantener compatibilidad con UI
      const formattedCompetitions = response.data.map((comp: any) => ({
        ...comp,
        // Agregar campos necesarios para UI si no existen
        logo: comp.image || comp.logo || "",
        color: comp.color || "#e10600", // Color por defecto si no existe
        season: comp.season || new Date().getFullYear().toString(),
      }));

      setCompetitions(formattedCompetitions);
    } catch (error) {
      console.error("Error al cargar competiciones desde API:", error);
      setError('Error al cargar las competiciones. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  // Obtener una competición por ID
  const getCompetitionById = useCallback(async (id: string) => {
    // Primero, buscar en el array de competitions local
    let competition = competitions.find(competition => competition.id === id);

    // Si no lo encuentra en local, hacer una llamada a la API
    if (!competition) {
      try {
        const response = await apiClient.get(`/competition/show/${id}`);
        competition = response.data;
      } catch (error) {
        console.error('Error al obtener detalles de la competición:', error);
        return null;
      }
    }

    return competition || null;
  }, [competitions]);

  // Añadir una nueva competición
  const addCompetition = useCallback(async (competition: Omit<Competition, 'id'>) => {
    try {
      // Preparar datos para la API
      const apiData = { ...competition };
      if (apiData.logo && !apiData.image) {
        apiData.image = apiData.logo;
      }

      // Enviar a la API
      const response = await apiClient.post(API_ENDPOINTS.competitionNew, apiData);
      const newCompetition = response.data;

      // Añadir a state
      setCompetitions(prevCompetitions => [...prevCompetitions, {
        ...newCompetition,
        logo: newCompetition.image || newCompetition.logo || "",
        color: newCompetition.color || "#e10600",
        season: newCompetition.season || new Date().getFullYear().toString(),
      }]);

      console.log("Competición añadida:", newCompetition);
      await fetchCompetitions(); // Actualizar lista completa
      router.refresh();
      return newCompetition;
    } catch (error) {
      console.error("Error al añadir competición:", error);
      setError('Error al añadir la competición');
      throw error;
    }
  }, [fetchCompetitions, router]);

  // Actualizar una competición existente
  const updateCompetition = useCallback(async (id: string, updatedData: Partial<Competition>) => {
    try {
      // Preparar datos para la API
      const apiData = { ...updatedData };
      if (apiData.logo && !apiData.image) {
        apiData.image = apiData.logo;
      }

      // Enviar a la API
      const response = await apiClient.post(API_ENDPOINTS.competitionEdit(id), apiData);
      const updatedCompetition = response.data;

      // Actualizar state
      setCompetitions(prevCompetitions => {
        return prevCompetitions.map(comp =>
          comp.id === id ? {
            ...comp,
            ...updatedCompetition,
            logo: updatedCompetition.image || updatedCompetition.logo || "",
            color: updatedCompetition.color || comp.color || "#e10600",
            season: updatedCompetition.season || comp.season || new Date().getFullYear().toString(),
          } : comp
        );
      });

      await fetchCompetitions(); // Actualizar lista completa
      router.refresh();
      console.log("Competición actualizada:", updatedCompetition);
      return updatedCompetition;
    } catch (error) {
      console.error("Error al actualizar competición:", error);
      setError('Error al actualizar la competición');
      throw error;
    }
  }, [fetchCompetitions, router]);

  // Eliminar una competición
  const deleteCompetition = useCallback(async (id: string) => {
    try {
      // Enviar a la API
      await apiClient.get(API_ENDPOINTS.competitionDelete(id), { params: { id } });

      // Actualizar state
      setCompetitions(prevCompetitions => {
        return prevCompetitions.filter(comp => comp.id !== id);
      });

      await fetchCompetitions(); // Actualizar lista completa
      router.refresh();
      console.log("Competición eliminada con ID:", id);
    } catch (error) {
      console.error("Error al eliminar competición:", error);
      setError('Error al eliminar la competición');
      throw error;
    }
  }, [fetchCompetitions, router]);

  return {
    competitions,
    loading,
    error,
    getCompetitionById,
    addCompetition,
    updateCompetition,
    deleteCompetition,
    refreshCompetitions: fetchCompetitions
  };
}

export type { Competition };
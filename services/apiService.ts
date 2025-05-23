// services/apiService.ts
import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';
import { Competition, Driver, Team } from '../types/models';

/**
 * Generic service for handling API operations for Edge Racing app
 * This service handles the mapping between front-end and back-end data structures
 */

// Competition API methods
export const CompetitionService = {
  // Get all competitions
  getAll: async (): Promise<Competition[]> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.competitions);
      return response.data.map((comp: any) => ({
        ...comp,
        logo: comp.image, // Map image to logo for UI compatibility
        color: getCompetitionColor(comp.id), // Assign color based on ID
        season: comp.season || new Date().getFullYear().toString(),
      }));
    } catch (error) {
      console.error('Error fetching competitions:', error);
      throw error;
    }
  },

  // Get a competition by ID
  getById: async (id: string): Promise<Competition> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.competitionShow(id));
      const comp = response.data;
      return {
        ...comp,
        logo: comp.image,
        color: getCompetitionColor(comp.id),
        season: comp.season || new Date().getFullYear().toString(),
      };
    } catch (error) {
      console.error(`Error fetching competition ${id}:`, error);
      throw error;
    }
  },

  // Create a competition
  create: async (data: Omit<Competition, 'id'>): Promise<Competition> => {
    try {
      // Map UI fields to API fields
      const apiData = {
        ...data,
        image: data.logo || data.image,
        status: data.status || 'active',
      };
      
      const response = await apiClient.post(API_ENDPOINTS.competitionNew, apiData);
      return {
        ...response.data,
        logo: response.data.image,
        color: getCompetitionColor(response.data.id),
      };
    } catch (error) {
      console.error('Error creating competition:', error);
      throw error;
    }
  },

  // Update a competition
  update: async (id: string, data: Partial<Competition>): Promise<Competition> => {
    try {
      // Map UI fields to API fields
      const apiData = {
        ...data,
        image: data.logo || data.image,
      };
      
      const response = await apiClient.post(API_ENDPOINTS.competitionEdit(id), apiData);
      return {
        ...response.data,
        logo: response.data.image,
        color: getCompetitionColor(response.data.id),
      };
    } catch (error) {
      console.error(`Error updating competition ${id}:`, error);
      throw error;
    }
  },

  // Delete a competition
  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.get(API_ENDPOINTS.competitionDelete(id));
    } catch (error) {
      console.error(`Error deleting competition ${id}:`, error);
      throw error;
    }
  }
};

// Driver API methods
export const DriverService = {
  // Get all drivers
  getAll: async (): Promise<Driver[]> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.drivers);
      return response.data.map((driver: any) => ({
        ...driver,
        // Add UI-specific fields
        nationality: driver.birth_country,
        wins: driver.wins || 0,
        podiums: driver.podiums || 0,
        // Try to find a position if not provided
        position: driver.position || 0
      }));
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },

  // Get a driver by ID
  getById: async (id: string): Promise<Driver> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.driverShow(id));
      const driver = response.data;
      return {
        ...driver,
        nationality: driver.birth_country,
        wins: driver.wins || 0,
        podiums: driver.podiums || 0,
      };
    } catch (error) {
      console.error(`Error fetching driver ${id}:`, error);
      throw error;
    }
  },

  // Get drivers by competition
  getByCompetition: async (competitionId: string): Promise<Driver[]> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.drivers);
      const filteredDrivers = response.data.filter(
        (driver: any) => driver.competition_id === competitionId
      );
      
      return filteredDrivers.map((driver: any) => ({
        ...driver,
        nationality: driver.birth_country,
        wins: driver.wins || 0,
        podiums: driver.podiums || 0,
      }));
    } catch (error) {
      console.error(`Error fetching drivers for competition ${competitionId}:`, error);
      throw error;
    }
  },

  // Create a driver
  create: async (data: Omit<Driver, 'id'>): Promise<Driver> => {
    try {
      const apiData = {
        ...data,
        active: data.active !== undefined ? data.active : true,
      };
      
      const response = await apiClient.post(API_ENDPOINTS.driverNew, apiData);
      return {
        ...response.data,
        nationality: response.data.birth_country,
      };
    } catch (error) {
      console.error('Error creating driver:', error);
      throw error;
    }
  },

  // Update a driver
  update: async (id: string, data: Partial<Driver>): Promise<Driver> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.driverEdit(id), data);
      return {
        ...response.data,
        nationality: response.data.birth_country,
      };
    } catch (error) {
      console.error(`Error updating driver ${id}:`, error);
      throw error;
    }
  },

  // Delete a driver
  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.get(API_ENDPOINTS.driverDelete(id));
    } catch (error) {
      console.error(`Error deleting driver ${id}:`, error);
      throw error;
    }
  }
};

// Team API methods
export const TeamService = {
  // Get all teams
  getAll: async (): Promise<Team[]> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.teams);
      return response.data.map((team: any) => ({
        ...team,
        team: team.name, // For UI compatibility
        wins: team.wins || 0,
        podiums: team.podiums || 0,
        position: team.position || 0,
      }));
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },

  // Get a team by ID
  getById: async (id: string): Promise<Team> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.teamShow(id));
      const team = response.data;
      return {
        ...team,
        team: team.name,
        wins: team.wins || 0,
        podiums: team.podiums || 0,
      };
    } catch (error) {
      console.error(`Error fetching team ${id}:`, error);
      throw error;
    }
  },

  // Get teams by competition
  getByCompetition: async (competitionId: string): Promise<Team[]> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.teams);
      const filteredTeams = response.data.filter(
        (team: any) => team.competition_id === competitionId
      );
      
      return filteredTeams.map((team: any) => ({
        ...team,
        team: team.name,
        wins: team.wins || 0,
        podiums: team.podiums || 0,
      }));
    } catch (error) {
      console.error(`Error fetching teams for competition ${competitionId}:`, error);
      throw error;
    }
  },

  // Create a team
  create: async (data: Omit<Team, 'id'>): Promise<Team> => {
    try {
      const apiData = {
        ...data,
        name: data.name
      };
      
      const response = await apiClient.post(API_ENDPOINTS.teamNew, apiData);
      return {
        ...response.data,
        team: response.data.name,
      };
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  },

  // Update a team
  update: async (id: string, data: Partial<Team>): Promise<Team> => {
    try {
      // Map UI fields to API fields if needed
      const apiData = {
        ...data,
        name: data.name
      };
      
      const response = await apiClient.post(API_ENDPOINTS.teamEdit(id), apiData);
      return {
        ...response.data,
        team: response.data.name,
      };
    } catch (error) {
      console.error(`Error updating team ${id}:`, error);
      throw error;
    }
  },

  // Delete a team
  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.get(API_ENDPOINTS.teamDelete(id));
    } catch (error) {
      console.error(`Error deleting team ${id}:`, error);
      throw error;
    }
  }
};

// Helper function to determine competition color
function getCompetitionColor(id: string): string {
  switch (id.toLowerCase()) {
    case 'formula1':
      return 'var(--f1-red)';
    case 'motogp':
      return 'var(--motogp-blue)';
    default:
      // Generate a consistent color based on the ID
      let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
      }
      return `#${Math.abs(hash).toString(16).substring(0, 6).padEnd(6, 'f')}`;
  }
}
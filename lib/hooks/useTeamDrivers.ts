import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';
import { DriverByTeams } from '@/types/models';

export function useTeamDrivers() {
  const [teamDrivers, setTeamDrivers] = useState<DriverByTeams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamDrivers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get(API_ENDPOINTS.teamsDrivers);
      setTeamDrivers(response.data);
      
    } catch (err) {
      console.error('Error fetching team drivers:', err);
      setError('Failed to load team drivers data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    fetchTeamDrivers();
  }, [fetchTeamDrivers]);

  // Optional: Get drivers by specific team
  const getDriversByTeamName = useCallback((teamName: string) => {
    const team = teamDrivers.find(t => t.team === teamName);
    return team?.drivers || [];
  }, [teamDrivers]);

  return {
    teamDrivers,
    loading,
    error,
    fetchTeamDrivers,
    getDriversByTeamName
  };
}
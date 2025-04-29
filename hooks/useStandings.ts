// src/hooks/useStandings.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getStandings } from '../services/standingsService';
import { StandingsFilter } from '../types/standings';

export const useStandings = (filters: StandingsFilter) => {
  return useQuery({
    queryKey: ['standings', filters],
    queryFn: () => getStandings(filters),
  });
};
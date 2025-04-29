// src/config/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  races: '/races',
  drivers: '/drivers',
  teams: '/teams',
  standings: '/standings',
};
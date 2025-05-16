// config/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://172.16.206.6:8000/api';

// Endpoints actualizados según las rutas de la API de Laravel
export const API_ENDPOINTS = {
  // Endpoints de usuarios y autenticación
  auth: {
    login: '/login',
    register: '/register',
    logout: '/logout'
  },

  // Endpoints de competiciones
  competitions: '/competition/list',
  competitionNew: '/competition/new',
  competitionEdit: (id: string) => `/competition/edit/${id}`,
  competitionDelete: (id: string) => `/competition/delete/${id}`,
  competitionShow: (id: string) => `/competition/show/${id}`,

  // Endpoints de carreras
  races: '/race/list',
  raceNew: '/race/new',
  raceEdit: (id: string) => `/race/edit/${id}`,
  raceDelete: (id: string) => `/race/delete/${id}`,
  raceShow: (id: string) => `/race/show/${id}`,

  // Endpoints de circuitos
  tracks: '/track/list',
  trackNew: '/track/new',
  trackEdit: (id: string) => `/track/edit/${id}`,
  trackDelete: (id: string) => `/track/delete/${id}`,
  trackShow: (id: string) => `/track/show/${id}`,

  // Endpoints de equipos
  teams: '/team/list',
  teamNew: '/team/new',
  teamEdit: (id: string) => `/team/edit/${id}`,
  teamDelete: (id: string) => `/team/delete/${id}`,
  teamShow: (id: string) => `/team/show/${id}`,

  // Endpoints de pilotos
  drivers: '/driver/list',
  driverNew: '/driver/new',
  driverEdit: (id: string) => `/driver/edit/${id}`,
  driverDelete: (id: string) => `/driver/delete/${id}`,
  driverShow: (id: string) => `/driver/show/${id}`,

  // Endpoints de clasificaciones
  rankings: '/ranking/list',
  rankingNew: '/ranking/new',
  rankingEdit: (id: string) => `/ranking/edit/${id}`,
  rankingDelete: (id: string) => `/ranking/delete/${id}`,
  rankingShow: (id: string) => `/ranking/show/${id}`,

  // Endpoints de clasificaciones globales
  globalDriverRankings: '/ranking/global/drivers',
  globalTeamRankings: '/ranking/global/teams',

  // Endpoints de usuarios (admin)
  users: '/user/list',
  userNew: '/user/new',
  userEdit: (id: string) => `/user/edit/${id}`,
  userDelete: (id: string) => `/user/delete/${id}`,
  userShow: (id: string) => `/user/show/${id}`,

  teamsDrivers: '/team/drivers',

};
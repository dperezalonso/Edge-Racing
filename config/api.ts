// // 
// // config/api.ts
// // export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
// // export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://172.16.206.6:8000/api';
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://www.edgeracing.net.mialias.net/EdgeBack/public/index.php/api';


// // Configuración de autenticación
// export const API_CONFIG = {
//   // Credenciales para acceso a la API (del servidor)
//   USERNAME: process.env.API_USERNAME,
//   PASSWORD: process.env.API_PASSWORD,
//   TOKEN: process.env.API_TOKEN,
  
//   // Configuración de timeouts
//   TIMEOUT: 10000,
  
//   // Headers por defecto
//   DEFAULT_HEADERS: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   }
// };




// config/api.ts
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://www.edgeracing.net.mialias.net/EdgeBack/public/index.php/api'
  : '/api'; // Usar proxy de Next.js en desarrollo

// Configuración de autenticación
export const API_CONFIG = {
  // Credenciales para acceso a la API (del servidor)
  USERNAME: process.env.API_USERNAME,
  PASSWORD: process.env.API_PASSWORD,
  TOKEN: process.env.API_TOKEN,
  
  // Configuración de timeouts
  TIMEOUT: 100000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

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

  // Endpoint de pilotos por equipo
  teamsDrivers: '/teams/drivers',

  // Endpoint de prueba
  test: '/saludo'
};
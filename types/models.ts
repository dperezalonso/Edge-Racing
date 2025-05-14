// types/models.ts

// Modelo de usuario según la estructura de la tabla
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Opcional, ya que no lo usamos al mostrar datos
  role: string;
}

// Modelo de competición actualizado
export interface Competition {
  id: string;
  name: string;
  description: string;
  image: string | null;
  status: string;
  // Campos personalizados/calculados que nos interesan mantener
  season?: string;
  color?: string;
  logo?: string;
}

// Modelo de piloto actualizado
export interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_country: string;
  vehicle_number: number;
  profile_image: string | null;
  active: boolean;
  points: number;
  team_id: string;
  competition_id: string;
  // Campos calculados/adicionales
  position?: number;
  wins?: number;
  podiums?: number;
  // Campos para UI
  teamColor?: string;
  team?: string; // Nombre del equipo
  nationality?: string; // Alias para birth_country
}

// Modelo de equipo actualizado
export interface Team {
  id: string;
  name: string;
  country: string;
  principal: string;
  logo: string | null;
  points: number;
  description: string;
  competition_id: string;
  // Campos calculados/adicionales
  position?: number;
  wins?: number;
  podiums?: number;
  color?: string;
}

export interface DriverByTeams {

  team: string;
  drivers: TeamDrivers[];

}

export interface TeamDrivers {

  id: number;
  name: string;
  points: number;

}

// Otros modelos relevantes
export interface Track {
  id: string;
  name: string;
  country: string;
  length: number;
  layout: string | null;
  description: string;
}

export interface Race {
  id: string;
  name: string;
  date: string;
  competition_id: string;
  track_id: string;
  status: string;
  round: number;
  season: string;
}

export interface Ranking {
  id: string;
  driver_id: string;
  race_id: string;
  position: number;
  points: number;
  fastest_lap: boolean;
  dnf: boolean;
}

// Interfaces para los filtros
export interface StandingsFilter {
  competition?: string;
  type?: 'drivers' | 'teams';
  year?: number;
  sortBy?: 'position' | 'points' | 'wins';
}

// Respuesta de la API de clasificaciones
export interface StandingsResponse {
  drivers?: Driver[];
  teams?: Team[];
}
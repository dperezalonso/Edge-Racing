// // src/types/standings.ts
// export interface Driver {
//     id: number;
//     name: string;
//     team: string;
//     points: number;
//     position: number;
//     wins: number;
//     podiums: number;
//     country: string;
//     team_color?: string;
//   }
  
//   export interface Team {
//     id: number;
//     name: string;
//     points: number;
//     position: number;
//     wins: number;
//     color: string;
//     logo?: string;
//   }
  
//   export interface StandingsFilter {
//     competition?: 'f1' | 'motogp';
//     type?: 'drivers' | 'constructors';
//     year?: number;
//     sortBy?: 'position' | 'points' | 'wins';
//   }
  
//   export interface StandingsResponse {
//     drivers?: Driver[];
//     teams?: Team[];
//     season: number;
//     last_updated: string;
//   }

export interface Driver {
  id: string;
  position: number;
  name: string;
  nationality: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  team_color: string;
}

export interface Team {
  id: string;
  position: number;
  name: string;
  points: number;
  wins: number;
  podiums?: number;
  color: string;
}

export interface StandingsResponse {
  drivers?: Driver[];
  teams?: Team[];
}
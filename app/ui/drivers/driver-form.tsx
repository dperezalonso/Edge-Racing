'use client';

import { useState, useEffect } from 'react';

// Definimos la interfaz para los pilotos
interface Driver {
  id: string;
  name: string;
  team: string;
  teamId: string;
  number: number;
  nationality: string;
  age: number;
  points: number;
  competitionId: string;
  competitionName: string;
}

// Definimos las props que acepta el componente
interface DriversTableProps {
  competitionFilter: string;
  searchQuery: string;
  onEdit: (driver: Driver) => void;
}

// Datos de ejemplo para los pilotos
const MOCK_DRIVERS: Driver[] = [
  {
    id: '1',
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    teamId: '1',
    number: 1,
    nationality: 'Países Bajos',
    age: 27,
    points: 125,
    competitionId: '1',
    competitionName: 'Formula 1'
  },
  {
    id: '2',
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    teamId: '2',
    number: 44,
    nationality: 'Reino Unido',
    age: 39,
    points: 118,
    competitionId: '1',
    competitionName: 'Formula 1'
  },
  {
    id: '3',
    name: 'Charles Leclerc',
    team: 'Ferrari',
    teamId: '3',
    number: 16,
    nationality: 'Mónaco',
    age: 26,
    points: 104,
    competitionId: '1',
    competitionName: 'Formula 1'
  },
  {
    id: '4',
    name: 'Francesco Bagnaia',
    team: 'Ducati',
    teamId: '4',
    number: 63,
    nationality: 'Italia',
    age: 28,
    points: 85,
    competitionId: '2',
    competitionName: 'MotoGP'
  },
  {
    id: '5',
    name: 'Marc Márquez',
    team: 'Gresini Racing',
    teamId: '5',
    number: 93,
    nationality: 'España',
    age: 31,
    points: 78,
    competitionId: '2',
    competitionName: 'MotoGP'
  }
];

export function DriversTable({ competitionFilter, searchQuery, onEdit }: DriversTableProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);

  // Simulamos carga de datos
  useEffect(() => {
    setTimeout(() => {
      setDrivers(MOCK_DRIVERS);
      setLoading(false);
    }, 500);
  }, []);

  // Aplicamos filtros cuando cambian los datos o los filtros
  useEffect(() => {
    let result = [...drivers];
    
    // Filtro por competición
    if (competitionFilter && competitionFilter !== 'all') {
      result = result.filter(driver => driver.competitionId === competitionFilter);
    }
    
    // Filtro por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(driver => 
        driver.name.toLowerCase().includes(query) ||
        driver.team.toLowerCase().includes(query) ||
        driver.nationality.toLowerCase().includes(query) ||
        driver.number.toString().includes(query)
      );
    }
    
    setFilteredDrivers(result);
  }, [drivers, competitionFilter, searchQuery]);

  // Función para eliminar un piloto
  const handleDelete = (driverId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este piloto?')) {
      // En una aplicación real, llamaríamos a una API
      setDrivers(prevDrivers => prevDrivers.filter(d => d.id !== driverId));
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-gray-400">Cargando pilotos...</div>;
  }

  if (filteredDrivers.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400">
        No se encontraron pilotos con los filtros aplicados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="standings-table w-full">
        <thead>
          <tr className="header-row">
            <th>Número</th>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Nacionalidad</th>
            <th>Edad</th>
            <th>Competición</th>
            <th>Puntos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <tr key={driver.id}>
              <td>
                <div className="w-10 h-10 rounded-full bg-[color:var(--f1-dark-blue)] flex items-center justify-center font-bold">
                  {driver.number}
                </div>
              </td>
              <td className="font-medium">{driver.name}</td>
              <td>{driver.team}</td>
              <td>{driver.nationality}</td>
              <td>{driver.age}</td>
              <td>{driver.competitionName}</td>
              <td className="font-bold text-amber-400">{driver.points} pts</td>
              <td>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(driver)}
                    className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Editar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(driver.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="Eliminar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
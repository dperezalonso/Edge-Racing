'use client';

import { useEffect, useState } from 'react';

// Esta interfaz define las propiedades que acepta el componente
interface CompetitionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

// Simulamos datos de competiciones
const MOCK_COMPETITIONS = [
  { id: '1', name: 'Formula 1' },
  { id: '2', name: 'MotoGP' },
  { id: '3', name: 'Rally Dakar' },
  { id: '4', name: 'WRC' },
  { id: '5', name: 'Formula E' },
];

export function CompetitionFilter({ value, onChange }: CompetitionFilterProps) {
  const [competitions, setCompetitions] = useState<any[]>([]);
  
  // En una implementación real, cargaríamos las competiciones desde una API
  useEffect(() => {
    // Simular una llamada a la API
    setTimeout(() => {
      setCompetitions(MOCK_COMPETITIONS);
    }, 300);
  }, []);

  return (
    <div className="w-full">
      <label htmlFor="competition-filter" className="block text-sm font-medium text-gray-400 mb-1">
        Filtrar por Competición
      </label>
      <select
        id="competition-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-700 bg-[color:var(--racing-black)] text-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[color:var(--f1-red)] focus:border-[color:var(--f1-red)]"
      >
        <option value="all">Todas las competiciones</option>
        {competitions.map((competition) => (
          <option key={competition.id} value={competition.id}>
            {competition.name}
          </option>
        ))}
      </select>
    </div>
  );
}
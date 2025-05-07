'use client';

import { useState } from 'react';
// import { CompetitionForm } from '@/app/ui/competitions/competition-form';
// import { CompetitionsTable } from '@/app/ui/competitions/competitions-table';
// import { Search } from '@/app/ui/competitions/search';

export default function CompetitionsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingCompetition, setEditingCompetition] = useState<any>(null);

  // Función para abrir el formulario para crear una nueva competición
  const handleAddCompetition = () => {
    setEditingCompetition(null);
    setIsFormOpen(true);
  };

  // Función para abrir el formulario para editar una competición existente
  const handleEditCompetition = (competition: any) => {
    setEditingCompetition(competition);
    setIsFormOpen(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCompetition(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Competiciones</h1>
        <button
          onClick={handleAddCompetition}
          className="bg-[color:var(--f1-red)] hover:bg-[color:var(--f1-red)]/80 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Añadir Competición
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            {/* <Search placeholder="Buscar competiciones..." onSearch={setSearchQuery} /> */}
          </div>
        </div>

        {/* <CompetitionsTable 
          searchQuery={searchQuery} 
          onEdit={handleEditCompetition}
        /> */}
      </div>

      {/* {isFormOpen && (
        <CompetitionForm
          competition={editingCompetition}
          onClose={handleCloseForm}
        />
      )} */}
    </div>
  );
}
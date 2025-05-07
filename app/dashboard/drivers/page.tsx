'use client';

import { useState } from 'react';
// import { DriverForm } from '@/app/ui/drivers/driver-form';
// import { DriversTable } from '@/app/ui/drivers/drivers-table';
import { Search } from '@/app/ui/drivers/search';
import { CompetitionFilter } from '@/app/ui/shared/competition-filter';

export default function DriversPage() {
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingDriver, setEditingDriver] = useState<any>(null);

  // Función para abrir el formulario para crear un nuevo piloto
  const handleAddDriver = () => {
    setEditingDriver(null);
    setIsFormOpen(true);
  };

  // Función para abrir el formulario para editar un piloto existente
  const handleEditDriver = (driver: any) => {
    setEditingDriver(driver);
    setIsFormOpen(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDriver(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Pilotos</h1>
        <button
          onClick={handleAddDriver}
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
          Añadir Piloto
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Search placeholder="Buscar pilotos..." onSearch={setSearchQuery} />
          </div>
          <div className="w-full md:w-64">
            <CompetitionFilter
              value={selectedCompetition}
              onChange={setSelectedCompetition}
            />
          </div>
        </div>

        {/* <DriversTable 
          competitionFilter={selectedCompetition} 
          searchQuery={searchQuery} 
          onEdit={handleEditDriver}
        /> */}
      </div>

      {/* {isFormOpen && (
        // <DriverForm
        //   driver={editingDriver}
        //   onClose={handleCloseForm}
        // />
      )} */}
    </div>
  );
}
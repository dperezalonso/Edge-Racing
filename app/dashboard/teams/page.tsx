'use client';

// import { useState } from 'react';
// import { TeamForm } from '@/app/ui/teams/team-form';
// import { TeamsTable } from '@/app/ui/teams/teams-table';
// import { Search } from '@/app/ui/teams/search';
// import { CompetitionFilter } from '@/app/ui/shared/competition-filter';

export default function TeamsPage() {
  // const [selectedCompetition, setSelectedCompetition] = useState<string>('all');
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  // const [editingTeam, setEditingTeam] = useState<any>(null);

  // Función para abrir el formulario para crear un nuevo equipo
  // const handleAddTeam = () => {
  //   setEditingTeam(null);
  //   setIsFormOpen(true);
  // };

  // // Función para abrir el formulario para editar un equipo existente
  // const handleEditTeam = (team: any) => {
  //   setEditingTeam(team);
  //   setIsFormOpen(true);
  // };

  // // Función para cerrar el formulario
  // const handleCloseForm = () => {
  //   setIsFormOpen(false);
  //   setEditingTeam(null);
  // };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Equipos</h1>
        <button
          // onClick={handleAddTeam}
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
          Añadir Equipo
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            {/* <Search placeholder="Buscar equipos..." onSearch={setSearchQuery} /> */}
          </div>
          <div className="w-full md:w-64">
            {/* <CompetitionFilter
              value={selectedCompetition}
              onChange={setSelectedCompetition}
            /> */}
          </div>
        </div>

        {/* <TeamsTable 
          competitionFilter={selectedCompetition} 
          searchQuery={searchQuery} 
          onEdit={handleEditTeam}
        /> */}
      </div>

      {/* {isFormOpen && (
        <TeamForm
          team={editingTeam}
          onClose={handleCloseForm}
        />
      )} */}
    </div>
  );
}
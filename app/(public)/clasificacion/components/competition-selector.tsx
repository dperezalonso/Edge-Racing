"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Competition } from "@/lib/hooks/useCompetitions";

export default function CompetitionSelector({
  competitions
}: {
  competitions: Competition[];
}) {
  const pathname = usePathname();
  const isRootPath = pathname === "/clasificacion";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {competitions.length > 0 ? (
        competitions.map((competition) => {
          const isActive = pathname.includes(`/clasificacion/${competition.id}`);
          
          return (
            <Link 
              href={`/clasificacion/${competition.id}`}
              key={competition.id}
              className={`relative group overflow-hidden rounded-lg border transition-all ${
                isActive 
                  ? 'border-2' 
                  : 'border border-gray-800 hover:border-gray-700'
              }`}
              style={{ 
                borderColor: isActive ? competition.color : ''
              }}
            >
              <div className="flex items-center p-6 bg-[color:var(--racing-gray)]/30 backdrop-blur-sm">
                <div className="mr-6 flex-shrink-0 relative size-16 flex items-center justify-center bg-white">
                  {competition.logo ? (
                    <Image 
                      src={competition.logo} 
                      alt={competition.name} 
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  ) : (
                    <div 
                      className="size-full rounded-full flex items-center justify-center text-2xl font-bold"
                      style={{ backgroundColor: competition.color }}
                    >
                      {competition.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{competition.name}</h3>
                  <p className="text-sm text-gray-400">{competition.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs font-medium bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                      {competition.season}
                    </span>
                  </div>
                </div>
                
                <div className="ml-4">
                  <div className={`size-8 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-[color:var(--racing-white)]' : 'bg-gray-800 group-hover:bg-gray-700'
                  }`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke={isActive ? "#000" : "currentColor"}
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: competition.color }}></div>
              )}
            </Link>
          );
        })
      ) : (
        <div className="col-span-2 text-center py-8 bg-gray-800/30 rounded-lg border border-gray-800">
          <p className="text-gray-400">No hay competiciones disponibles.</p>
          <p className="text-gray-500 text-sm mt-2">Añade competiciones desde el dashboard.</p>
        </div>
      )}
    </div>
  );
}
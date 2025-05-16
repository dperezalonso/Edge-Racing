"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CompetitionSelector from "../../clasificacion/components/competition-selector";
import { useCompetitions } from "@/lib/hooks/useCompetitions";
import { useDrivers } from "@/lib/hooks/useDrivers";
import { useTeams } from "@/lib/hooks/useTeams";

export default function CompetitionDetailPage() {
    const params = useParams();
    const competitionId = params.competition as string;

    const { competitions, loading: competitionsLoading } = useCompetitions();
    const { getDriversByCompetition, loading: driversLoading } = useDrivers();
    const { teams, loading: teamsLoading } = useTeams();
    
    // Estado para la competición actual
    const [competition, setCompetition] = useState<any>(null);
    
    // Obtener la competición actual
    useEffect(() => {
        if (!competitionsLoading && competitions.length > 0) {
            const foundCompetition = competitions.find(comp => comp.id === competitionId);
            setCompetition(foundCompetition || null);
        }
    }, [competitionId, competitions, competitionsLoading]);
    
    // Obtener pilotos y equipos filtrados por competición
    const competitionDrivers = !driversLoading ? getDriversByCompetition(competitionId) : [];
    const competitionTeams = !teamsLoading ? teams.filter(team => team.competition_id === competitionId) : [];
    
    // Estado de carga
    if (competitionsLoading || driversLoading || teamsLoading) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[color:var(--f1-red)]"></div>
                </div>
            </div>
        );
    }

    if (!competition) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-[color:var(--racing-gray)]/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                    <h2 className="text-xl font-bold mb-2">Competición no encontrada</h2>
                    <p className="text-gray-400 mb-4">
                        La competición que estás buscando no existe o no está disponible.
                    </p>
                    <Link
                        href="/competiciones"
                        className="inline-flex items-center text-[color:var(--f1-red)] hover:underline"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-4 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                            />
                        </svg>
                        Volver a competiciones
                    </Link>
                </div>
            </div>
        );
    }

    // Valores por defecto para competitionId
    const isF1 = competitionId === "formula1";

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--f1-red)] to-[color:var(--motogp-blue)]">
                    Competiciones
                </h1>
                <p className="text-gray-400 max-w-3xl mx-auto">
                    Explora los equipos y pilotos de las principales competiciones de motor
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Selecciona una competición</h2>
                <CompetitionSelector
                    competitions={competitions}
                    baseRoute="/competiciones"
                />
            </div>

            <div className="bg-[color:var(--racing-gray)]/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        {competition.logo || competition.image ? (
                            <div className="mr-4 size-12 bg-white rounded-full p-1">
                                <Image
                                    src={competition.logo || competition.image}
                                    alt={competition.name}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <div
                                className="mr-4 size-12 rounded-full flex items-center justify-center text-xl font-bold"
                                style={{ backgroundColor: competition.color }}
                            >
                                {competition.name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold">{competition.name}</h2>
                            <p className="text-sm text-gray-400">{competition.description}</p>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <span
                            className="inline-block px-3 py-1 text-sm font-medium rounded-full"
                            style={{ backgroundColor: competition.color }}
                        >
                            Temporada {competition.season || new Date().getFullYear()}
                        </span>
                    </div>
                </div>

                {/* Información general */}
                <div className="mb-10 p-6 bg-gradient-to-r from-[color:var(--racing-black)]/70 to-[color:var(--racing-gray)]/30 rounded-lg border border-gray-800">
                    <h3 className="text-xl font-bold mb-4">Sobre {competition.name}</h3>
                    <p className="text-gray-300 mb-6">
                        {isF1
                            ? "La Fórmula 1 es la categoría más prestigiosa del automovilismo internacional. Combina la tecnología más avanzada, estrategia y talento de los mejores pilotos del mundo en circuitos alrededor del planeta."
                            : "MotoGP representa la élite del motociclismo de velocidad, donde los mejores pilotos del mundo compiten en prototipos de alta tecnología que pueden superar los 350 km/h, demostrando habilidad, valentía y precisión."}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">
                                {isF1 ? "24" : "20"}
                            </div>
                            <div className="text-sm text-gray-400">Grandes Premios</div>
                        </div>
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">{competitionTeams.length}</div>
                            <div className="text-sm text-gray-400">Equipos</div>
                        </div>
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">{competitionDrivers.length}</div>
                            <div className="text-sm text-gray-400">Pilotos</div>
                        </div>
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">
                                {isF1 ? "1950" : "1949"}
                            </div>
                            <div className="text-sm text-gray-400">Año de fundación</div>
                        </div>
                    </div>
                </div>

                {/* Equipos */}
                <div className="mb-12">
                    <div className="mb-4">
                        <h3
                            className="text-2xl font-bold"
                            style={{ color: competition.color }}
                        >
                            Equipos participantes
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            {competitionTeams.length} equipos compiten esta temporada
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {competitionTeams.slice(0, 6).map((team) => (
                            <div
                                key={team.id}
                                className="flex items-center p-4 rounded-lg bg-[color:var(--racing-black)]/50 hover:bg-[color:var(--racing-black)]/70 border border-gray-800 transition-colors"
                            >
                                <div
                                    className="mr-3 size-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: team.color }}
                                ></div>
                                <div>
                                    <div className="font-bold text-white">{team.name}</div>
                                    <div className="text-sm text-gray-400">
                                        {team.points} puntos • {team.wins || 0} victorias
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <div
                                        className="size-8 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{
                                            backgroundColor:
                                                (team.position || 0) <= 3
                                                    ? team.position === 1
                                                        ? "var(--accent-yellow)"
                                                        : team.position === 2
                                                            ? "var(--racing-silver)"
                                                            : "#CD7F32"
                                                    : "transparent",
                                            color: (team.position || 0) <= 3 ? "black" : "white",
                                        }}
                                    >
                                        {team.position || "-"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pilotos - SECCIÓN ACTUALIZADA */}
                <div className="mb-12">
                    <div className="mb-4">
                        <h3
                            className="text-2xl font-bold"
                            style={{ color: competition.color }}
                        >
                            Pilotos destacados
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            {competitionDrivers.length} pilotos compiten esta temporada
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {competitionDrivers.length > 0 ? (
                            competitionDrivers.slice(0, 6).map((driver) => {
                                // Buscar el equipo correspondiente al piloto
                                const driverTeam = teams.find(team => team.id === driver.team_id);
                                const teamColor = driverTeam?.color || "#CCCCCC";
                                const teamName = driverTeam?.name || "Equipo desconocido";
                                
                                // Determinar el nombre completo del piloto
                                const fullName = driver.first_name && driver.last_name 
                                    ? `${driver.first_name} ${driver.last_name}`
                                    : "Piloto sin nombre";
                                
                                // Determinar nacionalidad/país
                                const nationality = driver.nationality || driver.birth_country || "---";
                                
                                return (
                                    <div
                                        key={driver.id}
                                        className="flex items-center p-4 rounded-lg bg-[color:var(--racing-black)]/50 hover:bg-[color:var(--racing-black)]/70 border border-gray-800 transition-colors"
                                    >
                                        <div
                                            className="mr-3 size-10 rounded-full flex items-center justify-center text-center text-xs font-bold"
                                            style={{
                                                backgroundColor: teamColor,
                                                color: "#fff"
                                            }}
                                        >
                                            {nationality}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{fullName}</div>
                                            <div className="text-sm text-gray-400">
                                                {teamName} • {driver.points} pts • {driver.wins || 0} victorias
                                            </div>
                                        </div>
                                        <div className="ml-auto">
                                            <div
                                                className="size-8 rounded-full flex items-center justify-center font-bold text-sm"
                                                style={{
                                                    backgroundColor:
                                                        (driver.position || 0) <= 3
                                                            ? driver.position === 1
                                                                ? "var(--accent-yellow)"
                                                                : driver.position === 2
                                                                    ? "var(--racing-silver)"
                                                                    : "#CD7F32"
                                                            : "transparent",
                                                    color: (driver.position || 0) <= 3 ? "black" : "white",
                                                }}
                                            >
                                                {driver.position || "-"}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-2 text-gray-400 text-center py-4 bg-gray-800/30 rounded-md">
                                No hay pilotos registrados en esta competición.
                            </div>
                        )}
                    </div>

                    <Link
                        href={`/clasificacion/${competitionId}`}
                        className="text-sm inline-flex items-center text-gray-400 hover:text-white"
                    >
                        Ver clasificación completa
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-4 ml-1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
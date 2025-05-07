"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CompetitionSelector from "../../clasificacion/components/competition-selector";
import { competitions, f1Teams, motogpTeams, f1Drivers, motogpRiders } from "../../clasificacion/data";

export default function CompetitionDetailPage() {
    const params = useParams();
    const competitionId = params.competition as string;

    const competition = competitions.find((comp) => comp.id === competitionId);

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

    // Determinar qué datos mostrar según la competición
    const teams = competitionId === "formula1" ? f1Teams : motogpTeams;
    const drivers = competitionId === "formula1" ? f1Drivers : motogpRiders;

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
                        {competition.logo ? (
                            <div className="mr-4 size-12 bg-white rounded-full p-1">
                                <Image
                                    src={competition.logo}
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
                            Temporada {competition.season}
                        </span>
                    </div>
                </div>

                {/* Información general */}
                <div className="mb-10 p-6 bg-gradient-to-r from-[color:var(--racing-black)]/70 to-[color:var(--racing-gray)]/30 rounded-lg border border-gray-800">
                    <h3 className="text-xl font-bold mb-4">Sobre {competition.name}</h3>
                    <p className="text-gray-300 mb-6">
                        {competitionId === "formula1"
                            ? "La Fórmula 1 es la categoría más prestigiosa del automovilismo internacional. Combina la tecnología más avanzada, estrategia y talento de los mejores pilotos del mundo en circuitos alrededor del planeta."
                            : "MotoGP representa la élite del motociclismo de velocidad, donde los mejores pilotos del mundo compiten en prototipos de alta tecnología que pueden superar los 350 km/h, demostrando habilidad, valentía y precisión."}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">
                                {competitionId === "formula1" ? "24" : "20"}
                            </div>
                            <div className="text-sm text-gray-400">Grandes Premios</div>
                        </div>
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">{teams.length}</div>
                            <div className="text-sm text-gray-400">Equipos</div>
                        </div>
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">{drivers.length}</div>
                            <div className="text-sm text-gray-400">Pilotos</div>
                        </div>
                        <div className="bg-[color:var(--racing-black)]/70 p-4 rounded-md">
                            <div className="text-2xl font-bold">
                                {competitionId === "formula1" ? "1950" : "1949"}
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
                            {teams.length} equipos compiten esta temporada
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {teams.slice(0, 6).map((team) => (
                            <div
                                key={team.team}
                                className="flex items-center p-4 rounded-lg bg-[color:var(--racing-black)]/50 hover:bg-[color:var(--racing-black)]/70 border border-gray-800 transition-colors"
                            >
                                <div
                                    className="mr-3 size-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: team.color }}
                                ></div>
                                <div>
                                    <div className="font-bold text-white">{team.team}</div>
                                    <div className="text-sm text-gray-400">
                                        {team.points} puntos • {team.wins} victorias
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <div
                                        className="size-8 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{
                                            backgroundColor:
                                                team.position <= 3
                                                    ? team.position === 1
                                                        ? "var(--accent-yellow)"
                                                        : team.position === 2
                                                            ? "var(--racing-silver)"
                                                            : "#CD7F32"
                                                    : "transparent",
                                            color: team.position <= 3 ? "black" : "white",
                                        }}
                                    >
                                        {team.position}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

               
                </div>

                {/* Pilotos - NUEVA SECCIÓN */}
                <div className="mb-12">
                    <div className="mb-4">
                        <h3
                            className="text-2xl font-bold"
                            style={{ color: competition.color }}
                        >
                            Pilotos destacados
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            {drivers.length} pilotos compiten esta temporada
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {drivers.slice(0, 6).map((driver) => (
                            <div
                                key={driver.driver}
                                className="flex items-center p-4 rounded-lg bg-[color:var(--racing-black)]/50 hover:bg-[color:var(--racing-black)]/70 border border-gray-800 transition-colors"
                            >
                                <div
                                    className="mr-3 size-10 rounded-full flex items-center justify-center text-center text-xs font-bold"
                                    style={{
                                        backgroundColor: driver.teamColor,
                                        color: "#fff"
                                    }}
                                >
                                    {driver.nationality}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{driver.driver}</div>
                                    <div className="text-sm text-gray-400">
                                        {driver.team} • {driver.points} pts • {driver.wins} victorias
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <div
                                        className="size-8 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{
                                            backgroundColor:
                                                driver.position <= 3
                                                    ? driver.position === 1
                                                        ? "var(--accent-yellow)"
                                                        : driver.position === 2
                                                            ? "var(--racing-silver)"
                                                            : "#CD7F32"
                                                    : "transparent",
                                            color: driver.position <= 3 ? "black" : "white",
                                        }}
                                    >
                                        {driver.position}
                                    </div>
                                </div>
                            </div>
                        ))}
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
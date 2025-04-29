"use client";

import { useState } from "react";

export default function ViewTabs({
  onTabChange,
  competitionId
}: {
  onTabChange: (tab: "drivers" | "teams") => void;
  competitionId: string;
}) {
  const [activeTab, setActiveTab] = useState<"drivers" | "teams">("drivers");
  
  const handleTabChange = (tab: "drivers" | "teams") => {
    setActiveTab(tab);
    onTabChange(tab);
  };
  
  const getTabColors = () => {
    return competitionId === "formula1" 
      ? { drivers: "var(--f1-red)", teams: "var(--f1-red)" }
      : { drivers: "var(--motogp-blue)", teams: "var(--motogp-blue)" };
  };
  
  const colors = getTabColors();
  
  return (
    <div className="flex space-x-1 rounded-lg bg-gray-900/50 p-1 mb-6">
      <button
        onClick={() => handleTabChange("drivers")}
        className={`flex-1 items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
          activeTab === "drivers" 
            ? "bg-white text-gray-900" 
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
        style={{
          backgroundColor: activeTab === "drivers" ? colors.drivers : undefined,
          color: activeTab === "drivers" ? "white" : undefined
        }}
      >
        Pilotos
      </button>
      <button
        onClick={() => handleTabChange("teams")}
        className={`flex-1 items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
          activeTab === "teams" 
            ? "bg-white text-gray-900" 
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
        style={{
          backgroundColor: activeTab === "teams" ? colors.teams : undefined,
          color: activeTab === "teams" ? "white" : undefined
        }}
      >
        Equipos
      </button>
    </div>
  );
}
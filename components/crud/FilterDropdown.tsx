'use client';

import { useState } from 'react';

interface FilterDropdownProps {
  options: { label: string; value: string }[];
  activeFilter: string | null;
  onFilterChange: (value: string | null) => void;
}

export default function FilterDropdown({ options, activeFilter, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string | null) => {
    onFilterChange(value);
    setIsOpen(false);
  };

  const getActiveLabel = () => {
    if (!activeFilter) return 'Todas las competiciones';
    const option = options.find(opt => opt.value === activeFilter);
    return option ? option.label : 'Todas las competiciones';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-md"
      >
        <span>{getActiveLabel()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`block w-full text-left px-4 py-2 text-sm ${
                !activeFilter ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleSelect(null)}
            >
              Todas las competiciones
            </button>

            {options.map((option) => (
              <button
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeFilter === option.value ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
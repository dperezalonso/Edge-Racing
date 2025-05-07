'use client';

import { useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

export function Search({ placeholder, onSearch }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="w-full py-2 pl-10 pr-4 bg-[color:var(--racing-black)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[color:var(--f1-red)] focus:border-[color:var(--f1-red)]"
        placeholder={placeholder}
      />
    </div>
  );
}
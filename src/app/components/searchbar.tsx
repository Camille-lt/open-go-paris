"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  activeFilter: string;
  onFilterChange: (category: string) => void;
  onSearchChange: (value: string) => void; // <--- Vérifie que c'est bien présent
}

export const SearchBar = ({ activeFilter, onFilterChange, onSearchChange }: SearchBarProps) => {
  const filters = ['All', 'Théâtre', 'Balade urbaine', 'Concert', 'Sport', 'Danse', 'Loisir', 'Atelier', 'Littérature', 'Santé'];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative mt-4">
        <input 
          type="text" 
          placeholder="Trouver ma sortie..." 
          // Ligne 21 : On appelle la fonction passée par le parent
          onChange={(e) => onSearchChange(e.target.value)} 
          className="w-full bg-white text-gray-700 placeholder:text-gray-400 rounded-[3vw] py-4 px-6 shadow-xl border-none outline-none font-bold text-sm"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex gap-6 mt-4 overflow-x-auto no-scrollbar py-2">
        {filters.map((filter) => (
          <button 
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`whitespace-nowrap text-sm font-medium transition-all ${
              activeFilter === filter ? 'text-[#fde047] font-extrabold' : 'text-white/90'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
"use client";

import React from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Conteneur de l'input (Relatif pour l'icône) */}
      <div className="relative mt-4">
        <input 
          type="text" 
          placeholder="Trouver ma sortie..." 
          className="w-full bg-white text-gray-700 placeholder:text-gray-400 rounded-[3vw] py-4 px-6 shadow-xl border-none outline-none font-bold text-sm"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* Conteneur des FILTRES (Flex avec gap pour l'espacement) */}
      <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar py-2">
        {['All', 'Théâtre', 'Concerts', 'Expos'].map((filter) => (
          <button 
            key={filter}
            className={`${
              filter === 'All' ? 'text-[#fde047]' : 'text-white'
            } text-sm font-medium whitespace-nowrap hover:text-[#fde047] transition-colors`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
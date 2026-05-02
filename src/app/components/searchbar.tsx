"use client";

import React from "react";
import { Search } from "lucide-react"; // N'oublie pas d'avoir installé lucide-react

export const SearchBar = () => {
  return (
    <div className="relative mt-4 w-full max-w-md mx-auto">
      {/* L'input avec arrondi total (rounded-full) */}
      <input 
        type="text" 
        placeholder="SEARCH" 
        className="w-full bg-white text-gray-700 placeholder:text-gray-400 rounded-full py-4 px-6 shadow-sm border-none outline-none font-bold text-sm"
      />
      
      {/* L'icône Loupe positionnée de façon absolue à droite */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={20} strokeWidth={2.5} />
      </div>
    </div>
  );
};
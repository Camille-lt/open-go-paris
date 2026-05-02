import React from "react";

// src/components/Button.tsx
export const Button = ({ label, onClick, className = '' }: any) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-brand-yellow text-brand-dark px-4 py-2 rounded-xl font-bold ${className}`}
    >
      {label}
    </button>
  );
};
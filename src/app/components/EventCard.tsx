"use client";

import React from "react";
import { Button } from "./button";

interface EventCardProps {
  title: string;
  image: string;
  description?: string;
  category?: string;
  price?: string;
  priceDetail?: string;
  audience?: string;
}

// 1. La fonction magique pour enlever le HTML
const stripHtml = (html: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, "") // Enlève les balises style <p>
    .replace(/&nbsp;/g, " ")    // Remplace les espaces insécables
    .trim();                    // Enlève les espaces inutiles au début/fin
};

export const EventCard = ({ 
  title, 
  image, 
  description, 
  category, 
  price, 
  priceDetail, 
  audience 
}: EventCardProps) => {
  
  // 2. Nettoyage systématique des données de l'API
  const cleanPrice = stripHtml(priceDetail || "");
  const cleanAudience = stripHtml(audience || "Tout public");

  return (
    <div className="bg-white rounded-[30px] shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative h-48">
        {category && (
          <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] px-3 py-1 rounded-full z-10 font-bold uppercase">
            {category}
          </span>
        )}
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-brand-blue font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{description}</p>

        {/* PIED DE CARTE NETTOYÉ */}
        <div className="mt-auto pt-4 flex justify-between items-end border-t border-gray-50">
          
          <div className="flex flex-col max-w-[60%]">
            {/* Audience propre */}
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {cleanAudience}
            </span>
            {/* Prix sans balises <p> */}
            <span className="text-sm font-extrabold text-brand-blue leading-tight line-clamp-2">
              {price === "gratuit" ? "Gratuit" : (cleanPrice || "Payant")}
            </span>
          </div>

          <Button label="Réserver" />
        </div>
      </div>
    </div>
  );
};
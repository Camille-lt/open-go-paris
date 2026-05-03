"use client";

import React from "react";
import { Button } from "./button";

interface EventCardProps {
  id: string; 
  title: string;
  image: string;
  description?: string;
  category?: string;
  price?: string;
  priceDetail?: string;
  audience?: string;
}

const stripHtml = (html: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

export const EventCard = ({ 
  id,
  title, 
  image, 
  description, 
  category, 
  price, 
  priceDetail, 
  audience 
}: EventCardProps) => {
  
  const cleanPrice = stripHtml(priceDetail || "");
  const cleanAudience = stripHtml(audience || "Tout public");

  const handleReserve = () => {
    // 1. SÉCURITÉ : On vérifie que l'ID existe bien
    if (!id) {
      console.error("ID manquant pour l'événement:", title);
      return;
    }

    // 2. Récupération et conversion systématique en String
    const rawData = localStorage.getItem("my_reservations");
    const savedReservations = rawData ? JSON.parse(rawData) : [];
    const idToSave = String(id); 

    // 3. Vérification de présence
    if (!savedReservations.includes(idToSave)) {
      const newReservations = [...savedReservations, idToSave];
      localStorage.setItem("my_reservations", JSON.stringify(newReservations));
      alert("🎉 Ajouté à vos réservations !");
    } else {
      alert("Vous avez déjà réservé cet événement.");
    }
  };

  return (
    <div className="bg-white rounded-[30px] shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative h-48">
        {category && (
          <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] px-3 py-1 rounded-full z-10 font-bold uppercase">
            {category}
          </span>
        )}
        {/* On ajoute une image par défaut au cas où cover_url est vide */}
        <img 
          src={image || "https://images.unsplash.com/photo-1513151233558-d860c5398176"} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-brand-blue font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{description}</p>

        <div className="mt-auto pt-4 flex justify-between items-end border-t border-gray-50">
          <div className="flex flex-col max-w-[60%]">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {cleanAudience}
            </span>
            <span className="text-sm font-extrabold text-brand-blue leading-tight line-clamp-2">
              {price === "gratuit" ? "Gratuit" : (cleanPrice || "Payant")}
            </span>
          </div>

          <div onClick={handleReserve}>
            <Button label="Réserver" />
          </div>
        </div>
      </div>
    </div>
  );
};
"use client";

import React, { useState, useEffect } from "react";
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
  onUnreserve?: (id: string) => void;
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
  audience,
  onUnreserve
}: EventCardProps) => {
  const [isReserved, setIsReserved] = useState(false);
  
  // GESTION DYNAMIQUE DE L'URL : Local si rien n'est défini, sinon Render
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const cleanPrice = stripHtml(priceDetail || "");
  const cleanAudience = stripHtml(audience || "Tout public");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${apiUrl}/reservations`);
        const reservedIds: string[] = await res.json();
        if (reservedIds.includes(String(id))) {
          setIsReserved(true);
        }
      } catch (err) {
        console.error("Erreur de connexion au backend", err);
      }
    };
    checkStatus();
  }, [id, apiUrl]);

  const handleReserve = async () => {
    if (!id) return;

    if (isReserved) {
      try {
        const response = await fetch(`${apiUrl}/reservations/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setIsReserved(false);
          if (onUnreserve) {
            onUnreserve(id);
          }
          alert("🗑️ Réservation annulée.");
        }
      } catch (error) {
        alert("Erreur lors de l'annulation.");
      }
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            event_id: String(id),
            event_title: title 
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setIsReserved(true);
        alert(`🎉 ${title} ajouté à la base Neon !`);
      } else if (data.status === "already_exists") {
        setIsReserved(true);
        alert("Déjà réservé.");
      }
    } catch (error) {
      console.error("Impossible de joindre le serveur Python:", error);
      alert("Le backend Python ne répond pas.");
    }
  };

  return (
    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="relative h-48">
        {category && (
          <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] px-3 py-1 rounded-full z-10 font-bold uppercase">
            {category}
          </span>
        )}
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
            <Button 
              label={isReserved ? "Annuler" : "Réserver"} 
              variant={isReserved ? "secondary" : "primary"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
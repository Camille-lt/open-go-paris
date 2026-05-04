"use client";

import { useEffect, useState } from "react";
import { EventCard } from "../components/EventCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReservationsPage() {
  const [reservedEvents, setReservedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReservedFromBackend = async () => {
      setLoading(true);
      try {
        // 1. RÉCUPÉRATION DEPUIS TON BACKEND PYTHON (NEON)
        const responseBack = await fetch("http://127.0.0.1:8000/reservations");
        if (!responseBack.ok) throw new Error("Erreur Backend");
        
        const savedIds: string[] = await responseBack.json();
        console.log("IDs récupérés depuis Neon :", savedIds);

        if (savedIds.length === 0) {
          setReservedEvents([]);
          setLoading(false);
          return;
        }

        // 2. RÉCUPÉRATION DES DÉTAILS DEPUIS L'API PARIS
        const responseParis = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100");
        const dataParis = await responseParis.json();
        
        if (dataParis?.results) {
          // 3. Filtrage en comparant les IDs de Neon avec ceux de Paris
          const filtered = dataParis.results.filter((event: any) => {
            const idStr = String(event.id || event.event_id);
            return savedIds.includes(idStr);
          });
          
          setReservedEvents(filtered);
        }
      } catch (error) {
        console.error("Erreur lors du fetch des réservations :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservedFromBackend();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-brand-blue pt-10 px-6 rounded-b-[50px] relative">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 text-white mb-6">
            <Link href="/" className="p-2 -ml-2">
              <ArrowLeft size={28} strokeWidth={3} />
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight uppercase">Mes réservations</h1>
          </div>
        </div>
      </header>

      <main className="p-6 ">
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-brand-blue font-bold">Connexion à la base Neon...</p>
            </div>
          ) : reservedEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {reservedEvents.map((event: any) => (
                <EventCard 
                  key={event.id || event.event_id}
                  id={String(event.id || event.event_id)}
                  title={event.title}
                  image={event.cover_url}
                  description={event.lead_text}
                  category={event.qfap_tags?.split(';')[0]}
                  price={event.price_type}
                  priceDetail={event.price_detail}
                  audience={event.audience}
                  onUnreserve={(idToRemove) => {
    setReservedEvents(prev => prev.filter(e => String(e.id || e.event_id) !== idToRemove));
  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[40px] px-6 shadow-inner">
              <p className="text-gray-400 font-medium mb-8">
                Aucune réservation trouvée dans Neon.
              </p>
              <Link 
                href="/" 
                className="bg-brand-blue text-white px-10 py-4 rounded-full font-bold shadow-xl active:scale-95 transition-transform inline-block"
              >
                Explorer les sorties
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
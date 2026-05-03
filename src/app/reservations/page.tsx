"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "../components/searchbar";
import { EventCard } from "../components/EventCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReservationsPage() {
  const [reservedEvents, setReservedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReserved = async () => {
      // 1. Récupération sécurisée
      const rawData = localStorage.getItem("my_reservations");
      const savedIds = rawData ? JSON.parse(rawData) : [];
      
      console.log("1. IDs dans le storage :", savedIds);

      if (savedIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // 2. Fetch de l'API (on monte à 100 pour être sûr de trouver les cartes)
        const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100");
        const data = await response.json();
        
        if (data?.results) {
          // 3. Filtrage ultra-large (on compare des Strings pour éviter les bugs)
          const filtered = data.results.filter((event: any) => {
            const id1 = String(event.id);
            const id2 = String(event.event_id);
            return savedIds.some((savedId: string) => String(savedId) === id1 || String(savedId) === id2);
          });
          
          console.log("2. Événements correspondants trouvés :", filtered.length);
          setReservedEvents(filtered);
        }
      } catch (error) {
        console.error("Erreur API :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReserved();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-brand-blue pt-12 pb-28 px-6 rounded-b-[50px] relative">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 text-white mb-6">
            <Link href="/" className="p-2 -ml-2">
              <ArrowLeft size={28} strokeWidth={3} />
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight">MES RÉSERVATIONS</h1>
          </div>
          
          <SearchBar 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
            onSearchChange={setSearchQuery} 
          />
        </div>
      </header>

      <main className="p-6 -mt-10">
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-brand-blue font-bold">Récupération de vos favoris...</p>
            </div>
          ) : reservedEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {reservedEvents.map((event: any) => (
                <EventCard 
                  key={event.id || event.event_id}
                  id={event.id || event.event_id} // ON PASSE BIEN L'ID
                  title={event.title}
                  image={event.cover_url}
                  description={event.lead_text}
                  category={event.qfap_tags?.split(';')[0]}
                  price={event.price_type}
                  priceDetail={event.price_detail}
                  audience={event.audience}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[40px] px-6 shadow-inner">
              <p className="text-gray-400 font-medium mb-8">
                On dirait que votre liste est vide...
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
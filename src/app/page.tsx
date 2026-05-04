"use client";

import { useEffect, useState } from "react";
import { Button } from "./components/button";
import { CalendarCheck } from 'lucide-react';
import { SearchBar } from "./components/searchbar";
import { EventCard } from "./components/EventCard";
import Link from "next/link";
import SimpleBar from 'simplebar-react';

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

const filters = ['All', 'Théâtre', 'Balade urbaine', 'Concert', 'Sport & bien-être', 'Danse', 'Loisir & Atelier', 'Littérature'];
  // Récupération des événements de Paris
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100"
        );
        const data = await response.json();
        if (data?.results) setEvents(data.results);
      } catch (error) {
        console.error("Erreur API Paris:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // LOGIQUE DE FILTRAGE : Gère la catégorie ET la barre de recherche
  const getFilteredEvents = (categoryName: string) => {
    const categoryFilter = categoryName.toLowerCase();
    const search = searchQuery.toLowerCase();
    
    return events.filter((event: any) => {
      const tags = event.qfap_tags?.toLowerCase() || "";
      const title = event.title?.toLowerCase() || "";
      const lead = event.lead_text?.toLowerCase() || "";

      // 1. Filtre par texte (Barre de recherche)
      const matchesSearch = searchQuery === "" || 
                            title.includes(search) || 
                            tags.includes(search) || 
                            lead.includes(search);
      
      if (!matchesSearch) return false;

      // 2. Filtre par catégorie
      if (categoryFilter === "sport & bien-être") {
        return (tags.includes("sport") || tags.includes("santé") || tags.includes("bien-être") || title.includes("yoga"));
      }
      if (categoryFilter === "loisir & atelier") {
  return (
    tags.includes("loisir") || 
    tags.includes("atelier") || 
    title.includes("atelier") ||
    title.includes("loisir")
  );
      }
      if (categoryFilter === "danse") return tags.includes("danse") || title.includes("danse");
      if (categoryFilter === "littérature") return tags.includes("littérature") || tags.includes("bibliothèques");
      if (categoryFilter === "balade urbaine") return tags.includes("balade") || tags.includes("visite guidée");
      if (categoryFilter === "théâtre") return tags.includes("théâtre");
      if (categoryFilter === "concert") return tags.includes("concert") || tags.includes("musique");

      return tags.includes(categoryFilter);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-brand-blue pt-5 pb-5 px-5 sm:pt-10 sm:pb-10 sm:px-6 rounded-b-[50px] relative">
        <div className="max-w-4xl mx-auto flex flex-col">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-extrabold text-white uppercase tracking-tighter">OPEN GO PARIS</h1>
            <Link href="/reservations">
              <Button label={
                <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap text-xs sm:text-sm md:text-base">
                  <span>Mes Events</span>
                  <CalendarCheck size={14} className="sm:w-4 sm:h-4" />
                </div>
              } />
            </Link>
          </div>
          
          <p className="w-full max-w-md mx-auto text-blue-200 text-lg font-bold uppercase tracking-widest mt-5 text-center">
            Que faire à Paris ?
          </p>

          <SearchBar
            activeFilter={activeFilter}
            onFilterChange={(cat) => {
              setActiveFilter(cat);
              setSearchQuery("");
            }}
            onSearchChange={(val) => setSearchQuery(val)}
          />
        </div>
      </header>

      <main className="py-8">
        {loading ? (
          <p className="text-center py-10 animate-pulse text-brand-blue font-bold">Chargement des pépites parisiennes...</p>
        ) : (
          <div className="flex flex-col gap-10">
            {filters.map((category) => {
              const categoryEvents = getFilteredEvents(category);
              
              // On affiche la section seulement s'il y a des résultats ET
              // qu'on n'est pas filtré sur une AUTRE catégorie
              const shouldDisplaySection = (activeFilter === "All" || activeFilter === category) && categoryEvents.length > 0;

              if (!shouldDisplaySection) return null;

              return (
                <section key={category} className="flex flex-col">
                  <h2 className="px-6 text-brand-blue text-xl font-bold mb-4 uppercase tracking-wider">
                    {category}
                  </h2>
                  <SimpleBar autoHide={false}>
                    <div className="flex gap-6 px-6 pb-4">
                      {categoryEvents.map((event: any) => (
                        <div key={event.id || event.event_id} className="min-w-[280px] max-w-[280px]">
                          <EventCard
                            id={String(event.id || event.event_id)}
                            title={event.title}
                            image={event.cover_url}
                            description={event.lead_text}
                            category={event.qfap_tags?.split(';')[0]}
                            price={event.price_type}
                            priceDetail={event.price_detail}
                            audience={event.audience}
                          />
                        </div>
                      ))}
                    </div>
                  </SimpleBar>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
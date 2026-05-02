"use client";
import { Button } from "./components/button";
import { CalendarCheck } from 'lucide-react';
import { SearchBar } from "./components/searchbar";
export default function Home() {
  return (
    /* Fond de page blanc pur comme sur ton image */
    <div className="flex flex-col min-h-screen bg-white font-sans">

      {/* Header bleu avec arrondis prononcés en bas */}
      <header className="bg-brand-blue pt-12 pb-24 px-6 rounded-b-[50px] relative h-auto">        <div className="max-w-md mx-auto">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            OPEN GO PARIS
          </h1>
          <div className="flex">
            <Button
              label={
                <div className="flex items-center gap-2">
                  Mes Events <CalendarCheck size={18} />
                </div>
              }
              onClick={() => console.log("Vers mes events")}
            />
          </div>
        </div>
        <p className="relative z-10 text-white mt-10 mb-4 font-semibold text-xl block">            Que Faire à Paris ?
        </p>
        {/* Barre de recherche blanche */}
        < SearchBar />
      </div>
      </header>

      {/* Zone de contenu principale */}
      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          {/* Titre de section en bleu comme sur l'image */}
          <h2 className="text-brand-blue text-2xl font-bold mb-6">Type</h2>

          {/* Ta carte de test mise à jour */}
          <div className="p-6 bg-white rounded-3xl shadow-md border border-slate-100">
            <h3 className="text-brand-dark text-lg font-bold">Titre</h3>
            <p className="text-brand-gray text-xs mt-2 leading-relaxed">
              Vérification visuelle : Le fond est blanc, le header est bleu avec le titre en blanc,
              et le mot "Type" juste au-dessus est bien en bleu.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
import Image from "next/image";

export default function Home() {
  return (
    /* Fond de page blanc pur comme sur ton image */
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* Header bleu avec arrondis prononcés en bas */}
      <header className="bg-brand-blue pt-12 pb-16 px-6 rounded-b-[50px] relative">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              OPEN GO PARIS
            </h1>
            {/* Badge jaune "Mes Events" */}
            <div className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-xl flex items-center gap-2 font-bold text-sm">
              Mes Events 📅
            </div>
          </div>

          <h2 className="text-white mt-6 text-lg font-semibold">
            Que Faire à Paris ?
          </h2>

          {/* Barre de recherche blanche */}
          <div className="mt-4 bg-white rounded-full p-4 shadow-sm flex justify-between items-center">
            <span className="text-gray-400">SEARCH</span>
            <span className="text-gray-400">🔍</span>
          </div>
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
# 🚲 Open Go Paris - Frontend
<img width="1371" height="712" alt="open-go-paris-dekstop" src="https://github.com/user-attachments/assets/d8b5f719-1e1b-42f1-bf89-4a81c1cf94ea" />
<img width="290" height="626" alt="open-go-paris-mobile" src="https://github.com/user-attachments/assets/3715147e-1a1e-4615-be50-59a144bf928e" /><img width="292" height="626" alt="open-go-paris-mobile-2" src="https://github.com/user-attachments/assets/f1f89d04-fa34-4b54-be75-adcea033e114" />



Application web interactive pour découvrir et réserver des activités à Paris en un clic.

## 🛠️ Stack Technique
* **Framework :** Next.js 14 (App Router)
* **Langage :** TypeScript
* **Styling :** Tailwind CSS
* **Composants :** Lucide React, SimpleBar (pour un scroll fluide)
* **Déploiement :** Vercel

## ✨ Points Clés de l'UI/UX
* **Filtrage Dynamique :** Recherche par mots-clés et catégories avec mise à jour instantanée.
* **Scroll Horizontal :** Interface optimisée mobile avec carrousels fluides.
* **Dashboard Réservations :** Espace dédié pour consulter et annuler ses sorties.

## 🔗 Connexion API
Le frontend communique avec un backend Python FastAPI déployé sur Render. L'URL de l'API est gérée via une variable d'environnement `NEXT_PUBLIC_API_URL` pour faciliter le passage du local à la production.

## 🚀 Lancement
1. `npm install`
2. `npm run dev`

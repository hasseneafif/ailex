import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      // Icône « Intelligence artificielle / prédiction » : cerveau stylisé minimaliste
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-none"
      >
        <path d="M12 2a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7a9 9 0 0 0-3-7z" />
        <path d="M9 12h6M9 16h6M12 8v8" />
      </svg>
    ),
    title: "Prédiction intelligente des actions",
    paragraph:
      "Grâce à l’intelligence artificielle, Vestr.ai analyse les données boursières pour anticiper les tendances et vous aider à investir avec confiance.",
  },
  {
    id: 2,
    icon: (
      // Icône « Recommandations personnalisées » : bulle de dialogue avec coche
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-none"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <polyline points="9 11 12 14 22 4" />
      </svg>
    ),
    title: "Recommandations personnalisées",
    paragraph:
      "Recevez des conseils clairs sur les actions à acheter, vendre ou conserver, adaptés à votre profil et à l’évolution du marché.",
  },
  {
    id: 3,
    icon: (
      // Icône « Interface épurée » : fenêtre d’application simplifiée (rectangle avec 3 barres)
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-none"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="7" y1="15" x2="17" y2="15" />
        <line x1="7" y1="19" x2="13" y2="19" />
      </svg>
    ),
    title: "Interface épurée et intuitive",
    paragraph:
      "Profitez d’une interface claire et accessible, sans complexité inutile, pour prendre vos décisions rapidement et efficacement.",
  },
];

export default featuresData;

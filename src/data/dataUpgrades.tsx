export interface Upgrade {
  id: string;
  name: string;
  initialCost: number;
  incomePerSecond: number;
  count: number;
  description: string;
}

export const Upgrades: Upgrade[] = [
  {
    id: "dev-junior",
    name: "Dev Junior",
    initialCost: 10,
    incomePerSecond: 1,
    count: 0,
    description: "Un développeur junior pour aider à construire votre produit.",
  },
  {
    id: "dev-senior",
    name: "Dev Senior",
    initialCost: 50,
    incomePerSecond: 3,
    count: 0,
    description:
      "Un développeur senior pour accélérer le développement de votre produit.",
  },
  {
    id: "serveur-cloud",
    name: "Serveur Cloud",
    initialCost: 120,
    incomePerSecond: 5,
    count: 0,
    description:
      "Un serveur cloud pour héberger votre application et gérer plus de trafic.",
  },
  {
    id: "marketing",
    name: "Marketing",
    initialCost: 200,
    incomePerSecond: 7,
    count: 0,
    description: "Une campagne de marketing pour attirer plus d'utilisateurs.",
  },
  {
    id: "cto",
    name: "CTO",
    initialCost: 500,
    incomePerSecond: 15,
    count: 0,
    description: "Un CTO pour guider la vision technique de votre startup.",
  },
  {
    id: "data-center",
    name: "Data Center",
    initialCost: 2000,
    incomePerSecond: 50,
    count: 0,
    description: "Un data center pour stocker et gérer vos données.",
  },
  {
    id: "ai-integration",
    name: "AI Integration",
    initialCost: 5000,
    incomePerSecond: 100,
    count: 0,
    description: "Intégrez l'IA pour automatiser et optimiser vos processus.",
  },
  {
    id: "blockchain",
    name: "Blockchain",
    initialCost: 10000,
    incomePerSecond: 200,
    count: 0,
    description: "Technologie blockchain pour sécuriser vos transactions.",
  },
  {
    id: "quantum-computing",
    name: "Quantum Computing",
    initialCost: 25000,
    incomePerSecond: 500,
    count: 0,
    description: "Calculateurs quantiques pour des performances extrêmes.",
  },
  {
    id: "global-expansion",
    name: "Global Expansion",
    initialCost: 50000,
    incomePerSecond: 1000,
    count: 0,
    description: "Expandez votre présence dans le monde entier.",
  },
  {
    id: "research-lab",
    name: "Research Lab",
    initialCost: 100000,
    incomePerSecond: 2000,
    count: 0,
    description:
      "Laboratoire de recherche pour innover et développer de nouveaux produits.",
  },
  {
    id: "space-tech",
    name: "Space Tech",
    initialCost: 250000,
    incomePerSecond: 5000,
    count: 0,
    description: "Technologie spatiale pour un avenir au-delà de la Terre.",
  },
  {
    id: "neural-interface",
    name: "Neural Interface",
    initialCost: 500000,
    incomePerSecond: 10000,
    count: 0,
    description: "Interface neurale pour une intégration homme-machine.",
  },
  {
    id: "time-machine",
    name: "Time Machine",
    initialCost: 1000000,
    incomePerSecond: 25000,
    count: 0,
    description: "Machine à remonter le temps pour optimiser l'histoire.",
  },
  {
    id: "multiverse-access",
    name: "Multiverse Access",
    initialCost: 5000000,
    incomePerSecond: 100000,
    count: 0,
    description: "Accès au multivers pour des ressources infinies.",
  },
];

export default Upgrades;

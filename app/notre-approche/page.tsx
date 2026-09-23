import type { Metadata } from "next";
import NotreApprochePage from "./NotreApprochePage";

export const metadata: Metadata = {
  title: "Notre Approche — TDCG | Teranga Digital Consulting Group",
  description: "Découvrez la méthodologie TDCG : un processus rigoureux en 5 étapes pour accompagner les entreprises d'Afrique de l'Ouest dans leur transformation digitale et leur développement.",
  openGraph: {
    title: "Notre Approche — TDCG",
    description: "La méthode qui fait la différence : rigueur internationale, ancrage local, résultats mesurables.",
    url: "https://terangadigitalconsultinggroup.com/notre-approche",
  },
};

export default function Page() {
  return <NotreApprochePage />;
}

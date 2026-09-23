"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Search, Lightbulb, Target, Rocket, BarChart3 } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Écoute & Diagnostic",
    duration: "Semaine 1–2",
    color: "text-[#D4AF5A]",
    bg: "bg-[#D4AF5A]/10",
    border: "border-[#D4AF5A]/25",
    description: "Avant de proposer quoi que ce soit, nous prenons le temps de comprendre votre réalité : votre secteur, vos enjeux, vos contraintes, vos équipes et votre environnement concurrentiel.",
    actions: [
      "Entretiens avec les parties prenantes clés",
      "Analyse de vos données et outils existants",
      "Benchmark sectoriel et concurrentiel",
      "Identification des quick wins et des chantiers structurants",
    ],
    deliverable: "Rapport de diagnostic avec recommandations prioritaires",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Stratégie & Conception",
    duration: "Semaine 2–4",
    color: "text-[#6AB5FF]",
    bg: "bg-[#6AB5FF]/10",
    border: "border-[#6AB5FF]/25",
    description: "À partir du diagnostic, nous co-construisons avec vous une stratégie sur mesure, ancrée dans vos réalités opérationnelles et financières. Pas de solutions génériques copiées-collées.",
    actions: [
      "Définition des objectifs et des KPIs de réussite",
      "Architecture de la solution et plan d'action détaillé",
      "Estimation budgétaire et planning des phases",
      "Validation avec les décideurs",
    ],
    deliverable: "Plan stratégique opérationnel avec feuille de route",
  },
  {
    num: "03",
    icon: Target,
    title: "Planification & Cadrage",
    duration: "Semaine 3–5",
    color: "text-[#6AFFB4]",
    bg: "bg-[#6AFFB4]/10",
    border: "border-[#6AFFB4]/25",
    description: "Nous cadrons précisément la mission : périmètre, responsabilités, gouvernance, risques et indicateurs de suivi. Chaque acteur sait ce qu'il doit faire, quand et avec quels moyens.",
    actions: [
      "Constitution de l'équipe projet et des sponsors",
      "Matrice RACI et gouvernance de la transformation",
      "Plan de gestion des risques",
      "Mise en place des outils de pilotage",
    ],
    deliverable: "Charte de projet et tableau de bord de pilotage",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Exécution & Accompagnement",
    duration: "Variable selon la mission",
    color: "text-[#B56AFF]",
    bg: "bg-[#B56AFF]/10",
    border: "border-[#B56AFF]/25",
    description: "Nous n'envoyons pas un rapport et nous partons. Nous restons aux côtés de vos équipes pendant l'exécution, nous adaptons la stratégie aux réalités du terrain et nous gérons les imprévus.",
    actions: [
      "Points de suivi hebdomadaires avec les équipes",
      "Ajustements en temps réel selon les résultats",
      "Formation et montée en compétence des équipes",
      "Gestion des parties prenantes et de la communication",
    ],
    deliverable: "Rapports d'avancement réguliers et livrables intermédiaires",
  },
  {
    num: "05",
    icon: BarChart3,
    title: "Mesure & Pérennisation",
    duration: "Phase finale et suivi",
    color: "text-[#FF9A6A]",
    bg: "bg-[#FF9A6A]/10",
    border: "border-[#FF9A6A]/25",
    description: "Une transformation réussie, c'est une transformation qui dure sans nous. Nous mesurons les résultats obtenus, documentons les acquis et transférons les compétences à vos équipes.",
    actions: [
      "Mesure des KPIs définis en phase de cadrage",
      "Rapport de clôture et bilan de la mission",
      "Transfert de compétences aux équipes internes",
      "Plan de continuité et recommandations post-mission",
    ],
    deliverable: "Rapport final de mission avec plan de continuité",
  },
];

const PRINCIPES = [
  {
    title: "La rigueur avant tout",
    description: "Chaque mission démarre par un diagnostic rigoureux. Nous ne prescrivons jamais avant d'avoir compris. C'est ce qui distingue un vrai cabinet de conseil d'une agence qui vend des prestations standardisées.",
  },
  {
    title: "Des résultats mesurables",
    description: "Nous définissons avec vous, dès le départ, les indicateurs de succès. Si nous ne pouvons pas mesurer l'impact de notre intervention, nous le disons clairement avant de commencer.",
  },
  {
    title: "L'ancrage local comme avantage",
    description: "Nous connaissons les réalités du marché sénégalais et ouest-africain : les contraintes réglementaires, les dynamiques sectorielles, les habitudes des consommateurs. Cette connaissance accélère l'exécution.",
  },
  {
    title: "Le transfert de compétences",
    description: "Notre objectif n'est pas de créer une dépendance à notre cabinet. Nous formons vos équipes pour qu'elles puissent continuer sans nous. Un client autonome est un client satisfait.",
  },
];

export default function NotreApprochePage() {
  const { openModal } = useModal();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#080D18]">

        {/* ── HERO ── */}
        <section className="relative pt-36 pb-24 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse 55% 45% at 30% 40%, #D4AF5A 0%, transparent 60%)" }}
          />
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="flex items-center gap-2 text-[13px] text-white/40 mb-10">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Notre Approche</span>
            </div>
            <div className="max-w-[760px]">
              <span className="font-mono text-[12px] tracking-[3px] uppercase text-[#D4AF5A] mb-4 block">
                Méthodologie
              </span>
              <h1 className="font-display text-[clamp(32px,4.5vw,60px)] text-white leading-tight mb-6">
                Comment nous travaillons.
              </h1>
              <p className="text-white/60 text-[17px] leading-relaxed mb-10">
                La transformation digitale échoue souvent non par manque de technologie, mais par manque de méthode.
                Chez TDCG, chaque mission suit un processus éprouvé en cinq étapes, conçu pour maximiser l&apos;impact
                et pérenniser les résultats dans votre organisation.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal("audit")}
                  className="flex items-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[15px] rounded-full px-8 py-4 transition-colors"
                >
                  Démarrer par un audit
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => openModal("contact")}
                  className="flex items-center gap-2 text-white border border-white/20 hover:border-white/40 text-[15px] rounded-full px-8 py-4 transition-colors"
                >
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── NOS 4 PRINCIPES ── */}
        <section className="py-20 bg-[#0B0F1E] border-y border-white/[0.05]">
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#D4AF5A] mb-10">
              <span className="w-6 h-px bg-[#D4AF5A]" /> Nos principes fondateurs
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {PRINCIPES.map((p, i) => (
                <div key={p.title} className="bg-[#0F1526] border border-white/[0.07] rounded-xl p-6">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF5A]/10 flex items-center justify-center mb-4">
                    <span className="font-mono text-[11px] font-bold text-[#D4AF5A]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-white font-semibold text-[15px] mb-3">{p.title}</h3>
                  <p className="text-white/50 text-[13.5px] leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LES 5 ÉTAPES ── */}
        <section className="py-24 bg-[#080D18]">
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#D4AF5A] mb-4">
              <span className="w-6 h-px bg-[#D4AF5A]" /> Notre processus
            </div>
            <h2 className="font-display text-[clamp(26px,3vw,42px)] text-white mb-4">
              5 étapes pour une transformation réussie
            </h2>
            <p className="text-white/50 text-[16px] leading-relaxed max-w-[600px] mb-16">
              Un processus structuré ne signifie pas rigide. Nous l&apos;adaptons à la taille de votre organisation,
              à la complexité de votre projet et à la maturité de vos équipes.
            </p>
            <div className="flex flex-col gap-4">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className={`bg-[#0F1526] border ${step.border} rounded-2xl overflow-hidden`}>
                    <div className="p-8 md:p-10 grid md:grid-cols-[260px_1fr_260px] gap-8 items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center shrink-0`}>
                            <Icon size={20} className={step.color} />
                          </div>
                          <span className={`font-mono text-[12px] tracking-[2px] ${step.color}`}>{step.num}</span>
                        </div>
                        <h3 className="font-display text-[22px] text-white mb-2">{step.title}</h3>
                        <span className="text-[12px] text-white/35 font-mono">{step.duration}</span>
                      </div>
                      <div>
                        <p className="text-white/60 text-[15px] leading-relaxed mb-6">{step.description}</p>
                        <ul className="flex flex-col gap-2.5">
                          {step.actions.map((action) => (
                            <li key={action} className="flex items-start gap-3 text-[13.5px] text-white/70">
                              <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${step.color}`} />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`${step.bg} border ${step.border} rounded-xl p-5`}>
                        <p className="text-[10px] uppercase tracking-[2px] text-white/40 font-semibold mb-3">Livrable</p>
                        <p className={`text-[14px] font-medium ${step.color} leading-snug`}>{step.deliverable}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-24 bg-[#0B0F1E] border-t border-white/[0.05]">
          <div className="max-w-[760px] mx-auto px-8 text-center">
            <span className="font-mono text-[12px] tracking-[3px] uppercase text-[#D4AF5A] mb-4 block">
              Passons à l&apos;action
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] text-white mb-6">
              Prêt à démarrer votre transformation ?
            </h2>
            <p className="text-white/55 text-[16px] leading-relaxed mb-10">
              Un premier échange de 30 minutes sans engagement suffit pour évaluer votre situation,
              identifier les priorités et vous proposer un plan d&apos;action concret.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openModal("audit")}
                className="flex items-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[15px] rounded-full px-9 py-4 transition-colors"
              >
                Demander un audit gratuit
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => openModal("contact")}
                className="flex items-center gap-2 text-white border border-white/20 hover:border-white/40 text-[15px] rounded-full px-9 py-4 transition-colors"
              >
                Nous contacter
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

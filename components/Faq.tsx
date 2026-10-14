"use client";

import { useState, useRef, useEffect } from "react";
import { useModal } from "@/lib/ModalContext";

const FAQ_ITEMS = [
  {
    category: "Missions",
    q: "Comment se déroule une mission TDCG, de la prise de contact au livrable ?",
    a: "Tout commence par un échange de cadrage gratuit (30 min) pour comprendre vos enjeux. Nous produisons ensuite un diagnostic initial, puis une proposition d'accompagnement sur-mesure avec périmètre, livrables et calendrier. Chaque mission est pilotée par des KPIs définis dès le départ — vous suivez l'avancement à chaque étape.",
  },
  {
    category: "Missions",
    q: "En combien de temps peut-on voir des résultats concrets ?",
    a: "Selon le type de mission : un audit stratégique produit ses livrables en 2 à 4 semaines. Un premier déploiement IA ou automatisation peut générer des gains opérationnels mesurables en 4 à 8 semaines. Les transformations structurelles s'inscrivent sur 3 à 6 mois — mais avec des jalons intermédiaires dès le premier mois.",
  },
  {
    category: "Expertise",
    q: "Quelle est votre approche de l'IA pour les entreprises africaines ?",
    a: "Nous ne vendons pas l'IA comme une technologie — nous l'intégrons comme un levier de performance opérationnelle. Nos missions IA débutent toujours par un diagnostic de maturité, puis une feuille de route réaliste adaptée à votre contexte : connectivité, ressources humaines, données disponibles. Aucun déploiement générique.",
  },
  {
    category: "Expertise",
    q: "Pouvez-vous accompagner une organisation qui n'a pas encore commencé sa transformation digitale ?",
    a: "C'est même notre cas le plus fréquent. Nous partons de zéro avec vous : état des lieux, priorisation des actions à fort impact, puis mise en œuvre progressive. Notre rôle est de vous éviter les erreurs coûteuses et de structurer votre transformation dans le bon ordre.",
  },
  {
    category: "Tarifs",
    q: "Comment sont structurés vos honoraires ?",
    a: "Nos missions sont facturées au forfait, défini dès la proposition. Pas de facturation à l'heure ni de surprise en cours de mission. Nous proposons aussi des accompagnements mensuels (retainer) pour les organisations qui souhaitent un partenaire stratégique dans la durée. Un premier devis est fourni sous 48h.",
  },
  {
    category: "Clients",
    q: "Travaillez-vous uniquement avec de grandes entreprises ?",
    a: "Non. Nos clients vont des PME structurées aux groupes régionaux, en passant par les institutions publiques, les ONG et les startups ambitieuses. Ce qui compte, c'est votre volonté de passer à l'action — pas la taille de votre organisation. Nos offres s'adaptent à votre réalité budgétaire.",
  },
  {
    category: "Clients",
    q: "Intervenez-vous uniquement au Sénégal ?",
    a: "Notre ancrage est sénégalais mais notre périmètre est ouest-africain et francophone. Nous avons accompagné des organisations au Sénégal, en Côte d'Ivoire, au Mali et au Maroc. Nos équipes peuvent intervenir en présentiel ou à distance selon le contexte de la mission.",
  },
  {
    category: "Garanties",
    q: "Comment mesurez-vous l'impact de vos missions ?",
    a: "Avant toute intervention, nous définissons avec vous les indicateurs de succès (KPIs). Chaque livrable est accompagné d'un tableau de bord de suivi. Si nous ne pouvons pas mesurer l'impact d'une mission, nous le disons honnêtement avant de commencer — c'est notre engagement.",
  },
];

const CATEGORIES = ["Tous", "Missions", "Expertise", "Tarifs", "Clients", "Garanties"];

export default function Faq() {
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = activeCategory === "Tous"
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-[#060B16] py-[120px] scroll-mt-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(212,175,90,0.4) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(212,175,90,0.4) 60px)",
        }}
      />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div
          className="mb-12 transition-all duration-700"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#D4AF5A]/60" />
            <span className="font-mono text-[10.5px] tracking-[3px] uppercase text-[#D4AF5A]/70">
              Questions fréquentes
            </span>
          </div>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="font-display font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
            >
              Les réponses avant<br />
              <span style={{ color: "#D4AF5A" }}>la première réunion.</span>
            </h2>
            <p className="text-white/40 text-[14.5px] leading-relaxed max-w-[340px] lg:pb-1">
              Les questions que nous posent systématiquement les dirigeants avant de démarrer une mission.
            </p>
          </div>
        </div>

        {/* Category filter pills */}
        <div
          className="flex flex-wrap gap-2 mb-10 transition-all duration-700"
          style={{ opacity: revealed ? 1 : 0, transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s", transform: revealed ? "translateY(0)" : "translateY(12px)" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className="font-mono text-[10px] tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background: isActive ? "rgba(212,175,90,0.15)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#D4AF5A" : "rgba(255,255,255,0.30)",
                  border: `1px solid ${isActive ? "rgba(212,175,90,0.30)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Main grid */}
        <div
          className="grid lg:grid-cols-[1fr_340px] gap-8 items-start"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s" }}
        >
          {/* FAQ accordion */}
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {filtered.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-start gap-5 py-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF5A]/40 rounded"
                    aria-expanded={isOpen}
                  >
                    {/* Category tag */}
                    <span
                      className="shrink-0 font-mono text-[9px] tracking-[1.5px] uppercase px-2 py-0.5 rounded mt-1 whitespace-nowrap transition-colors duration-200"
                      style={{
                        background: isOpen ? "rgba(212,175,90,0.12)" : "rgba(255,255,255,0.04)",
                        color: isOpen ? "#D4AF5A" : "rgba(255,255,255,0.20)",
                        border: `1px solid ${isOpen ? "rgba(212,175,90,0.25)" : "rgba(255,255,255,0.07)"}`,
                      }}
                    >
                      {item.category}
                    </span>

                    <p
                      className="flex-1 font-medium text-[15px] leading-snug transition-colors duration-200"
                      style={{ color: isOpen ? "#fff" : "rgba(255,255,255,0.60)" }}
                    >
                      {item.q}
                    </p>

                    {/* Plus / minus icon */}
                    <span
                      className="shrink-0 mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: isOpen ? "#D4AF5A" : "rgba(255,255,255,0.10)",
                        background: isOpen ? "rgba(212,175,90,0.12)" : "transparent",
                      }}
                    >
                      <svg
                        width="9" height="9" viewBox="0 0 9 9" fill="none"
                        style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.25s ease" }}
                      >
                        <path d="M4.5 1v7M1 4.5h7" stroke={isOpen ? "#D4AF5A" : "rgba(255,255,255,0.35)"} strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className="overflow-hidden transition-all duration-350 ease-out"
                    style={{ maxHeight: isOpen ? "300px" : "0px" }}
                  >
                    <div className="pl-[72px] pb-6 pr-11">
                      <p className="text-[14px] leading-relaxed text-white/50">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky side panel */}
          <div className="lg:sticky lg:top-28 space-y-4">
            {/* Contact card */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(212,175,90,0.14)",
              }}
            >
              <div
                className="h-px w-full mb-6"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,90,0.40), transparent)" }}
              />
              <p className="font-mono text-[10px] tracking-[2.5px] uppercase text-[#D4AF5A]/60 mb-3">
                Autre question ?
              </p>
              <p className="text-white/65 text-[14px] leading-relaxed mb-6">
                Notre équipe répond sous 48h. Décrivez votre situation en quelques mots, nous revenons vers vous avec une réponse précise.
              </p>
              <button
                onClick={() => openModal("contact")}
                className="w-full font-semibold text-[13.5px] rounded-full py-3.5 transition-colors duration-200"
                style={{ background: "#D4AF5A", color: "#080D18" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E0BB3F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#D4AF5A")}
              >
                Nous écrire →
              </button>
            </div>

            {/* Audit CTA card */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="font-mono text-[10px] tracking-[2.5px] uppercase text-white/30 mb-3">
                Prêt à passer à l&apos;action ?
              </p>
              <p className="text-white/50 text-[13px] leading-relaxed mb-5">
                Demandez un audit stratégique gratuit de votre situation. Premier diagnostic en 48h.
              </p>
              <button
                onClick={() => openModal("audit")}
                className="w-full font-semibold text-[13.5px] rounded-full py-3.5 border transition-colors duration-200"
                style={{ borderColor: "rgba(212,175,90,0.25)", color: "#D4AF5A" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,90,0.10)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,90,0.40)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,90,0.25)";
                }}
              >
                Demander un audit →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [style*="transition"] { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

"use client";

import {
  Landmark, LineChart, GraduationCap, HeartPulse, Sprout, ShoppingBag,
  Factory, HandHeart, Radio, Truck, Zap, Rocket, ArrowRight,
} from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { SECTORS } from "@/lib/constants";

const ICONS = [
  Landmark, LineChart, GraduationCap, HeartPulse, Sprout, ShoppingBag,
  Factory, HandHeart, Radio, Truck, Zap, Rocket,
];

export default function Sectors() {
  const { openModal } = useModal();
  const headRef = useReveal();

  return (
    <section id="secteurs" className="py-[120px] scroll-mt-24">
      <div className="max-w-[1240px] mx-auto px-8">
        <div ref={headRef} className="reveal max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Secteurs d&apos;activité
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-navy leading-tight">
            Une expertise transversale, adaptée à chaque écosystème.
          </h2>
          <p className="mt-4 text-grey text-[16.5px] max-w-[520px]">
            Douze secteurs clés de l&apos;économie sénégalaise et ouest-africaine, chacun avec ses enjeux propres —
            et une méthode TDCG qui s&apos;y adapte.
          </p>
        </div>

        <div
          className="
            grid gap-6
            md:grid-cols-3 lg:grid-cols-4
            max-md:flex max-md:overflow-x-auto max-md:gap-4 max-md:pb-3
            max-md:snap-x max-md:snap-mandatory max-md:-mx-8 max-md:px-8
          "
        >
          {SECTORS.map((sector, i) => {
            const Icon = ICONS[i];
            return (
              <SectorCard key={sector.name} icon={Icon} name={sector.name} description={sector.description} onDiscover={() => openModal("contact")} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectorCard({
  icon: Icon,
  name,
  description,
  onDiscover,
}: {
  icon: typeof Landmark;
  name: string;
  description: string;
  onDiscover: () => void;
}) {
  const ref = useReveal<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className="
        reveal group relative flex flex-col gap-3.5 overflow-hidden rounded-xl border border-navy/10 bg-white
        p-[34px_28px] transition-all duration-[400ms] ease-premium
        hover:-translate-y-2 hover:shadow-card hover:border-gold/40
        max-md:min-w-[260px] max-md:shrink-0 max-md:snap-start
      "
    >
      <span className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-[#e6c766] transition-transform duration-[450ms] ease-premium group-hover:scale-x-100" />
      <div className="w-[52px] h-[52px] rounded-xl bg-grey-light flex items-center justify-center transition-colors duration-[400ms] group-hover:bg-gold-soft">
        <Icon size={24} className="text-navy transition-transform duration-[400ms] group-hover:scale-110" />
      </div>
      <h3 className="text-lg font-semibold text-navy">{name}</h3>
      <p className="text-[13.5px] text-grey leading-relaxed flex-1">{description}</p>
      <button
        type="button"
        onClick={onDiscover}
        className="relative inline-flex items-center gap-1.5 w-fit text-[13.5px] font-semibold text-navy group-hover:text-gold"
      >
        Découvrir
        <ArrowRight size={14} className="transition-transform duration-[350ms] group-hover:translate-x-1" />
        <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold transition-all duration-[350ms] group-hover:w-full" />
      </button>
    </div>
  );
}

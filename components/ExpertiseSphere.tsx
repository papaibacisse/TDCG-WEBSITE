"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart3, Cpu, MessageSquare, RefreshCw, Compass, Users, Settings, Database, Search, Megaphone, X,
} from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { EXPERTISE_DOMAINS } from "@/lib/constants";

const ICONS = [BarChart3, Cpu, MessageSquare, RefreshCw, Compass, Users, Settings, Database, Search, Megaphone];

export default function ExpertiseSphere() {
  const { openModal } = useModal();
  const wrapRef = useReveal();
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rotationRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = EXPERTISE_DOMAINS.length;

  function render() {
    const stage = stageRef.current;
    if (!stage) return;
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const rx = w * 0.4;
    const ry = h * 0.34;

    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      const base = (360 / total) * i;
      const angleDeg = base + rotationRef.current;
      const angle = (angleDeg * Math.PI) / 180;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);
      const depth = (Math.sin(angle) + 1) / 2;
      const scale = 0.6 + depth * 0.55;
      const opacity = 0.38 + depth * 0.62;
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      node.style.opacity = opacity.toFixed(2);
      node.style.zIndex = String(Math.round(depth * 100) + 1);
    });
  }

  useEffect(() => {
    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function focusNode(i: number) {
    const base = (360 / total) * i;
    const target = 90 - base;
    const current = rotationRef.current % 360;
    const diff = ((target - current + 540) % 360) - 180;
    rotationRef.current += diff;
    render();
  }

  function handleNodeClick(i: number) {
    if (activeIndex === i) {
      setActiveIndex(null);
      return;
    }
    setActiveIndex(i);
    focusNode(i);
  }

  const active = activeIndex !== null ? EXPERTISE_DOMAINS[activeIndex] : null;
  const ActiveIcon = activeIndex !== null ? ICONS[activeIndex] : null;

  return (
    <section id="expertise" className="bg-grey-light py-[120px] scroll-mt-24">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Nos expertises
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-navy leading-tight">
            Un écosystème d&apos;expertises, une seule ambition.
          </h2>
          <p className="mt-4 text-grey text-[16.5px]">
            Dix domaines interconnectés autour d&apos;une même méthode. Cliquez sur une expertise pour l&apos;explorer.
          </p>
        </div>

        <div ref={wrapRef} className="reveal">
          <div ref={stageRef} className="relative w-full h-[520px] md:h-[560px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-navy flex items-center justify-center font-display font-bold text-gold text-lg shadow-card z-10">
              TDCG
            </div>

            {EXPERTISE_DOMAINS.map((domain, i) => {
              const Icon = ICONS[i];
              return (
                <button
                  key={domain.name}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  type="button"
                  onClick={() => handleNodeClick(i)}
                  className={
                    "absolute top-0 left-0 w-[104px] h-[104px] rounded-full bg-white flex flex-col items-center justify-center gap-1.5 shadow-[0_14px_30px_-12px_rgba(11,31,58,0.22)] transition-[left,top,transform,opacity,box-shadow,border-color] duration-[800ms] ease-premium border " +
                    (activeIndex === i ? "border-gold ring-2 ring-gold/40" : "border-navy/10")
                  }
                >
                  <Icon size={22} className="text-navy" />
                  <span className="text-[11px] font-semibold text-navy text-center px-2 leading-tight">{domain.name}</span>
                </button>
              );
            })}

            {active && ActiveIcon && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="pointer-events-auto bg-white rounded-2xl shadow-modal p-8 max-w-[320px] text-center relative">
                  <button
                    onClick={() => setActiveIndex(null)}
                    aria-label="Fermer"
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center hover:bg-grey-light"
                  >
                    <X size={14} className="text-navy" />
                  </button>
                  <div className="w-11 h-11 rounded-[10px] bg-gold-soft flex items-center justify-center mx-auto mb-4">
                    <ActiveIcon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-navy mb-2">{active.name}</h3>
                  <p className="text-[13.5px] text-grey leading-relaxed mb-5">{active.description}</p>
                  <button
                    onClick={() => openModal("contact")}
                    className="w-full justify-center bg-navy text-white font-semibold text-sm rounded-full py-3"
                  >
                    Discuter de ce sujet
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="text-center text-sm text-grey mt-6">✦ Cliquez sur une expertise pour l&apos;explorer</p>
        </div>
      </div>
    </section>
  );
}

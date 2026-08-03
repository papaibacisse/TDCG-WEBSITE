"use client";

import { useReveal } from "@/lib/useReveal";
import { CASE_STUDIES } from "@/lib/constants";

export default function CaseStudies() {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section id="etudes" className="bg-grey-light py-[120px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <div ref={headRef} className="reveal max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Études de cas
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-navy leading-tight">
            Des résultats concrets, mesurables.
          </h2>
          <p className="mt-4 text-grey text-[16.5px]">Exemples illustratifs de missions types menées par nos équipes.</p>
        </div>

        <div ref={gridRef} className="reveal grid md:grid-cols-3 gap-7">
          {CASE_STUDIES.map((study) => (
            <div key={study.title} className="bg-white border border-navy/10 flex flex-col">
              <span className="font-mono text-[11.5px] uppercase tracking-wider text-gold px-7 pt-7">{study.tag}</span>
              <h3 className="text-xl text-navy px-7 pt-3">{study.title}</h3>
              <p className="text-sm text-grey px-7 pt-3.5 leading-relaxed">{study.description}</p>
              <div className="flex gap-7 p-7 mt-auto border-t border-navy/10">
                {study.kpis.map((kpi) => (
                  <div key={kpi.label} className="flex flex-col">
                    <span className="font-display text-[26px] text-navy font-semibold">{kpi.value}</span>
                    <span className="text-[11.5px] text-grey mt-0.5">{kpi.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

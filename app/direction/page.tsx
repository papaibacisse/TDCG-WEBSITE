"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Quote, X, Send, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSent(true);
    } catch {}
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg bg-[#0B1525] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.08]">
          <div>
            <h2 className="font-display text-[18px] text-white font-semibold">Nous contacter</h2>
            <p className="text-white/45 text-[13px] mt-0.5">Notre équipe vous répond sous 24h</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        {sent ? (
          <div className="px-7 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[#D4AF5A]/15 flex items-center justify-center mx-auto mb-4">
              <Send size={22} className="text-[#D4AF5A]" />
            </div>
            <p className="font-display text-[17px] text-white font-semibold">Message envoyé !</p>
            <p className="text-white/50 text-[14px] mt-2">Merci. Nous vous répondrons rapidement.</p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[14px] rounded-full px-6 py-3 transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input name="name" required placeholder="Nom complet" className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors" />
            </div>
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input name="email" type="email" required placeholder="Adresse e-mail" className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors" />
            </div>
            <div className="relative">
              <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input name="phone" type="tel" placeholder="Téléphone (optionnel)" className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors" />
            </div>
            <textarea name="message" required rows={4} placeholder="Votre message…" className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors resize-none" />
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF5A] hover:bg-[#E0BB3F] disabled:opacity-60 text-black font-semibold text-[14.5px] rounded-full py-3.5 transition-colors">
              {loading ? "Envoi…" : "Envoyer le message"}
              {!loading && <Send size={15} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function DirectionPage() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-[#080D18]">

        {/* ── HERO BAND ─────────────────────────────────────── */}
        <section className="relative pt-36 pb-6 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ background: "radial-gradient(ellipse 60% 50% at 30% 0%, #D4AF5A 0%, transparent 65%)" }}
          />
          <div className="relative z-[2] max-w-[1240px] mx-auto px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-white/40 mb-10">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Direction</span>
            </div>
          </div>
        </section>

        {/* ── MAQUETTE CARD ────────────────────────────────── */}
        <section className="pb-28">
          <div className="max-w-[1240px] mx-auto px-8">

            {/* Header card — bandeau doré */}
            <div
              className="rounded-2xl px-8 py-7 mb-6"
              style={{
                background: "rgba(14,20,38,0.85)",
                border: "1px solid rgba(212,175,90,0.20)",
              }}
            >
              {/* Gold accent line */}
              <div className="h-px w-full mb-6" style={{ background: "linear-gradient(90deg, #D4AF5A, rgba(212,175,90,0.15))" }} />
              <p className="font-mono text-[11px] tracking-[3px] uppercase text-[#D4AF5A] mb-3">
                Direction Générale
              </p>
              <h1 className="font-display font-semibold text-white text-[clamp(24px,3vw,38px)] leading-tight mb-2">
                Le mot du Directeur général
              </h1>
              <p className="text-white/45 text-[14.5px]">
                Une vision, un engagement, des résultats.
              </p>
            </div>

            {/* Main two-column block */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,13,24,0.95)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="grid md:grid-cols-[420px_1fr]">

                {/* LEFT — large photo */}
                <div className="relative bg-[#0a0f1e]">
                  <Image
                    src="/dg-photo-new.jpg"
                    alt="Papa Iba CISSE — Directeur Général TDCG"
                    width={900}
                    height={900}
                    className="w-full h-full object-cover object-top"
                    style={{ minHeight: "520px", maxHeight: "640px" }}
                    priority
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(8,13,24,0.7) 0%, transparent 100%)" }} />
                </div>

                {/* RIGHT — identity + quote + letter */}
                <div className="p-10 lg:p-14 flex flex-col justify-between bg-[#080d18]">
                  {/* Top: identity */}
                  <div>
                    <p className="font-mono text-[10px] tracking-[3px] uppercase text-[#D4AF5A] mb-5">
                      Notre Engagement
                    </p>

                    <h2 className="font-display font-semibold text-white text-[28px] leading-tight mb-1">
                      Papa Iba CISSE
                    </h2>
                    <p className="text-white/55 text-[15px] mb-8">
                      Directeur général
                    </p>

                    {/* Opening quote block */}
                    <div
                      className="rounded-xl p-6 mb-8"
                      style={{
                        background: "rgba(212,175,90,0.05)",
                        border: "1px solid rgba(212,175,90,0.15)",
                      }}
                    >
                      <Quote size={20} className="text-[#D4AF5A] mb-3" />
                      <p className="font-display text-[16.5px] text-white/85 leading-relaxed italic">
                        Transformer les idées en résultats, en accompagnant les organisations dans
                        leur transformation et leur développement.
                      </p>
                    </div>

                    {/* Letter body */}
                    <div className="space-y-5 text-[14.5px] text-white/55 leading-[1.85]">
                      <p>
                        Nous vivons une époque de transformations profondes. La révolution numérique
                        ne se limite plus aux grandes puissances économiques — elle est au cœur des
                        dynamiques africaines. Et c&apos;est précisément dans ce contexte que Teranga
                        Digital Consulting Group a été fondé : pour être l&apos;architecte de cette
                        transformation sur notre continent.
                      </p>
                      <p>
                        Notre approche repose sur une conviction : la transformation digitale n&apos;est
                        pas une fin en soi, c&apos;est un levier de performance. Chaque projet que nous
                        menons doit produire des résultats mesurables — en croissance, en efficacité
                        et en compétitivité. L&apos;intelligence artificielle et l&apos;automatisation ne sont
                        pas des menaces, mais des opportunités extraordinaires pour les organisations
                        africaines qui sauront les saisir.
                      </p>
                      <p>
                        Ce qui nous distingue, c&apos;est notre double ancrage : la rigueur d&apos;un cabinet
                        de conseil international, associée à la connaissance intime des marchés,
                        cultures et contraintes de l&apos;Afrique de l&apos;Ouest. Nous ne transposons pas
                        des modèles étrangers — nous construisons des solutions adaptées, durables
                        et appropriées à notre contexte.
                      </p>
                    </div>
                  </div>

                  {/* Bottom: signature + CTA */}
                  <div className="mt-10 pt-8 border-t border-white/[0.07]">
                    <div className="flex items-end justify-between flex-wrap gap-6">
                      <div>
                        <p className="font-display text-[18px] text-white font-semibold">Papa Iba CISSE</p>
                        <p className="text-[#D4AF5A] text-[13px] font-medium mt-0.5">Directeur Général — TDCG</p>
                      </div>
                      {/* Decorative lines */}
                      <div className="flex flex-col items-end gap-1 opacity-50">
                        <div className="w-28 h-px" style={{ background: "linear-gradient(to left, rgba(212,175,90,0), #D4AF5A)" }} />
                        <div className="w-16 h-px" style={{ background: "linear-gradient(to left, rgba(212,175,90,0), rgba(212,175,90,0.5))" }} />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/expertises"
                        className="inline-flex items-center gap-2.5 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[13.5px] rounded-full px-7 py-3.5 transition-colors"
                      >
                        Découvrir nos expertises
                        <ArrowRight size={14} />
                      </Link>
                      <button
                        onClick={() => setShowContact(true)}
                        className="inline-flex items-center gap-2.5 text-white/55 hover:text-white border border-white/[0.12] hover:border-white/25 text-[13.5px] rounded-full px-6 py-3.5 transition-colors"
                      >
                        Nous contacter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
}

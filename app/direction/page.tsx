"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, X, Send, Mail, Phone, User } from "lucide-react";
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

        {/* ── HERO CINÉMATIQUE ──────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ minHeight: "100svh" }}>

          {/* Photo plein écran avec traitement sombre */}
          <div className="absolute inset-0">
            <Image
              src="/dg-photo-new.jpg"
              alt="Papa Iba CISSE — Directeur Général TDCG"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Overlay cinématique multicouche */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.45) 100%)" }} />
            {/* Vignette bas */}
            <div className="absolute inset-x-0 bottom-0 h-64" style={{ background: "linear-gradient(to top, #080A14 0%, transparent 100%)" }} />
            {/* Vignette haut */}
            <div className="absolute inset-x-0 top-0 h-48" style={{ background: "linear-gradient(to bottom, rgba(8,10,20,0.9) 0%, transparent 100%)" }} />
          </div>

          {/* Halo or subtil derrière le texte */}
          <div
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,175,90,0.045) 0%, transparent 65%)" }}
          />

          {/* Contenu positionné */}
          <div className="relative z-[2] max-w-[1240px] mx-auto px-8 flex flex-col min-h-screen pt-36 pb-20">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] text-white/35 mb-auto">
              <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
              <ChevronRight size={11} className="text-white/25" />
              <span className="text-white/55">Direction</span>
            </div>

            {/* Bloc texte principal — aligné à gauche, bas de page */}
            <div className="max-w-[680px] mt-16 md:mt-0">

              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px" style={{ background: "#D4AF5A" }} />
                <span className="font-mono text-[11px] tracking-[3px] uppercase text-[#D4AF5A]">Direction Générale</span>
              </div>

              {/* Grande citation en vedette */}
              <blockquote
                className="font-display font-semibold leading-[1.18] mb-10 text-white"
                style={{ fontSize: "clamp(28px, 3.8vw, 52px)" }}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.75) 100%)" }}
                >
                  &ldquo;Transformer les idées en résultats — c&apos;est notre engagement envers l&apos;Afrique.&rdquo;
                </span>
              </blockquote>

              {/* Identité */}
              <div className="flex items-center gap-5 mb-10">
                {/* Avatar badge */}
                <div
                  className="w-14 h-14 rounded-full overflow-hidden shrink-0"
                  style={{ border: "1.5px solid rgba(212,175,90,0.4)" }}
                >
                  <Image
                    src="/dg-photo-new.jpg"
                    alt="Papa Iba CISSE"
                    width={56} height={56}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-[17px] leading-tight">Papa Iba CISSE</p>
                  <p className="text-[#D4AF5A] text-[13px] font-medium mt-0.5">Directeur Général, TDCG</p>
                </div>
                {/* Ligne décorative */}
                <div className="ml-4 flex-1 hidden sm:block">
                  <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,90,0.4), transparent)" }} />
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowContact(true)}
                  className="inline-flex items-center gap-2.5 font-semibold text-[13.5px] rounded-full px-7 py-3.5 transition-all"
                  style={{ background: "#D4AF5A", color: "#080A14" }}
                >
                  Prendre contact
                  <ArrowRight size={14} />
                </button>
                <Link
                  href="/notre-approche"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white border border-white/[0.14] hover:border-white/30 text-[13.5px] rounded-full px-6 py-3.5 transition-colors"
                >
                  Notre approche
                </Link>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 opacity-30">
              <div className="w-px h-20" style={{ background: "linear-gradient(to bottom, transparent, #D4AF5A, transparent)" }} />
              <span className="font-mono text-[9px] tracking-[3px] uppercase text-white rotate-90 mt-2">Scroll</span>
              <div className="w-px h-20" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,90,0.3))" }} />
            </div>
          </div>
        </section>

        {/* ── LETTRE DU DG ──────────────────────────────────── */}
        <section className="bg-[#080A14] pb-32 relative overflow-hidden">

          {/* Texture grain */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />

          <div className="max-w-[1240px] mx-auto px-8">

            {/* Séparateur doré */}
            <div className="flex items-center gap-6 py-16">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,90,0.25))" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#D4AF5A", boxShadow: "0 0 12px rgba(212,175,90,0.5)" }} />
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,90,0.25), transparent)" }} />
            </div>

            {/* Layout deux colonnes */}
            <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

              {/* GAUCHE — corps de la lettre */}
              <div>
                {/* Numéro de section */}
                <p className="font-mono text-[11px] tracking-[3px] uppercase mb-8"
                  style={{ color: "rgba(212,175,90,0.6)" }}>
                  Message du Directeur Général
                </p>

                {/* Paragraphes */}
                <div className="space-y-7 text-[16px] text-white/60 leading-[1.9]">
                  <p>
                    Nous vivons une époque de transformations profondes. La révolution numérique
                    ne se limite plus aux grandes puissances économiques — elle est désormais au cœur des
                    dynamiques africaines. Et c&apos;est précisément dans ce contexte que{" "}
                    <span className="text-white/85 font-medium">Teranga Digital Consulting Group</span>{" "}
                    a été fondé : pour être l&apos;architecte de cette transformation sur notre continent.
                  </p>
                  <p>
                    Notre approche repose sur une conviction fondamentale : la transformation digitale n&apos;est
                    pas une fin en soi, c&apos;est un{" "}
                    <span className="text-white/85 font-medium">levier de performance business</span>.
                    Chaque mission que nous menons doit produire des résultats mesurables — en croissance,
                    en efficacité et en compétitivité. L&apos;intelligence artificielle et l&apos;automatisation
                    ne sont pas des menaces, mais des opportunités extraordinaires pour les organisations
                    africaines qui sauront les saisir avec méthode et ambition.
                  </p>
                  <p>
                    Ce qui nous distingue, c&apos;est notre double ancrage : la rigueur d&apos;un cabinet
                    de conseil international, associée à la connaissance intime des marchés,
                    cultures et contraintes de l&apos;Afrique de l&apos;Ouest. Nous ne transposons pas
                    des modèles étrangers — nous{" "}
                    <span className="text-white/85 font-medium">construisons des solutions adaptées</span>,
                    durables et appropriées à notre réalité.
                  </p>
                  <p>
                    Je vous invite à découvrir TDCG, à explorer nos expertises, et surtout à engager
                    la conversation. Les organisations qui se transforment aujourd&apos;hui seront celles
                    qui domineront demain.
                  </p>
                </div>

                {/* Signature formelle */}
                <div className="mt-14 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-end gap-10 flex-wrap">
                    <div>
                      {/* Pseudo-signature typographique */}
                      <p
                        className="font-display text-[26px] leading-none mb-2"
                        style={{
                          color: "#D4AF5A",
                          fontStyle: "italic",
                          letterSpacing: "-0.02em",
                          textShadow: "0 0 32px rgba(212,175,90,0.25)",
                        }}
                      >
                        Papa Iba Cissé
                      </p>
                      <p className="font-mono text-[11px] tracking-[2px] uppercase text-white/35">
                        Directeur Général — TDCG
                      </p>
                      <p className="font-mono text-[11px] tracking-[1.5px] uppercase text-white/20 mt-1">
                        Louga, Sénégal
                      </p>
                    </div>
                    {/* Lignes décoratives */}
                    <div className="flex flex-col gap-1.5 mb-1">
                      <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, #D4AF5A, transparent)" }} />
                      <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,90,0.4), transparent)" }} />
                      <div className="w-7 h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,90,0.2), transparent)" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* DROITE — carte identité + valeurs */}
              <div className="lg:sticky lg:top-32 space-y-5">

                {/* Carte photo */}
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{ border: "1px solid rgba(212,175,90,0.15)", background: "rgba(14,18,32,0.8)" }}
                >
                  <div className="relative h-72">
                    <Image
                      src="/dg-photo-new.jpg"
                      alt="Papa Iba CISSE"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,18,32,1) 0%, rgba(14,18,32,0.3) 50%, transparent 100%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-display font-semibold text-white text-[17px] leading-tight">Papa Iba CISSE</p>
                      <p className="text-[#D4AF5A] text-[12px] font-medium mt-0.5">Directeur Général</p>
                    </div>
                  </div>
                  {/* Stats sous la photo */}
                  <div className="grid grid-cols-2 divide-x divide-white/[0.07]"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    {[
                      { n: "5+", l: "Années d'expertise" },
                      { n: "11", l: "Secteurs couverts" },
                    ].map(({ n, l }) => (
                      <div key={l} className="p-4 text-center">
                        <p className="font-display font-semibold text-[#D4AF5A] text-[22px] leading-none">{n}</p>
                        <p className="text-white/40 text-[11px] mt-1 leading-tight">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carte valeurs */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(14,18,32,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p className="font-mono text-[10px] tracking-[2.5px] uppercase text-[#D4AF5A]/70 mb-5">
                    Nos engagements
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Résultats mesurables avant tout",
                      "Expertise adaptée aux réalités africaines",
                      "Innovation au service de la performance",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full mt-[7px] shrink-0" style={{ background: "#D4AF5A" }} />
                        <span className="text-white/60 text-[13.5px] leading-[1.6]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3 pt-1">
                  <Link
                    href="/expertises"
                    className="inline-flex items-center justify-center gap-2.5 font-semibold text-[13.5px] rounded-xl py-3.5 transition-all"
                    style={{ background: "#D4AF5A", color: "#080A14" }}
                  >
                    Découvrir nos expertises
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    onClick={() => setShowContact(true)}
                    className="inline-flex items-center justify-center gap-2 text-white/55 hover:text-white border border-white/[0.12] hover:border-white/25 text-[13.5px] rounded-xl py-3.5 transition-colors"
                  >
                    Écrire au Directeur Général
                  </button>
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

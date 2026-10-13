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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg bg-[#0B1525] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.08]">
          <div>
            <h2 className="font-display text-[18px] text-white font-semibold">
              Nous contacter
            </h2>
            <p className="text-white/45 text-[13px] mt-0.5">
              Notre équipe vous répond sous 24h
            </p>
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
            <p className="text-white/50 text-[14px] mt-2">
              Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[14px] rounded-full px-6 py-3 transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
            {/* Name */}
            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                name="name"
                required
                placeholder="Nom complet"
                className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors"
              />
            </div>
            {/* Email */}
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                name="email"
                type="email"
                required
                placeholder="Adresse e-mail"
                className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors"
              />
            </div>
            {/* Phone */}
            <div className="relative">
              <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                name="phone"
                type="tel"
                placeholder="Téléphone (optionnel)"
                className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors"
              />
            </div>
            {/* Message */}
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Votre message…"
              className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF5A]/50 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF5A] hover:bg-[#E0BB3F] disabled:opacity-60 text-black font-semibold text-[14.5px] rounded-full py-3.5 transition-colors"
            >
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
        {/* HERO BAND */}
        <section className="relative pt-36 pb-10 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 0%, #D4AF5A 0%, transparent 65%)",
            }}
          />
          {/* Decorative lines */}
          <svg
            className="pointer-events-none absolute right-0 top-0 h-full w-[40%] opacity-[0.06]"
            viewBox="0 0 500 700"
            fill="none"
          >
            <path
              d="M450 700 C 430 560, 470 460, 440 360 C 420 290, 480 230, 460 140"
              stroke="#D4AF5A"
              strokeWidth="0.8"
            />
            <path
              d="M450 700 C 390 600, 350 530, 370 420"
              stroke="#D4AF5A"
              strokeWidth="0.5"
            />
          </svg>

          <div className="relative z-[2] max-w-[1240px] mx-auto px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-white/40 mb-10">
              <Link href="/" className="hover:text-white/70 transition-colors">
                Accueil
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Direction</span>
            </div>

            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[2.5px] uppercase text-[#D4AF5A] mb-4">
              <span className="w-5 h-px bg-[#D4AF5A]" />
              Leadership & Vision
            </div>
            <h1 className="font-display text-[clamp(28px,3.8vw,48px)] text-white leading-tight max-w-[620px]">
              Mot du Directeur Général
            </h1>
          </div>
        </section>

        {/* MAIN CONTENT — photo left / text right */}
        <section className="pb-24">
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="grid md:grid-cols-[380px_1fr] gap-14 lg:gap-20 items-start">

              {/* Left — Photo + identity card */}
              <div className="md:sticky md:top-28">
                {/* Photo */}
                <div className="relative rounded-2xl overflow-hidden bg-[#0B1F33]">
                  <Image
                    src="/dg-photo.jpg"
                    alt="Papa Iba CISSE — Directeur Général de Teranga Digital Consulting Group"
                    width={614}
                    height={598}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Gold bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF5A]/80 via-[#D4AF5A] to-[#D4AF5A]/20" />
                </div>

                {/* Identity card */}
                <div className="mt-5 bg-[#0F1526] border border-white/[0.08] rounded-xl p-6">
                  <p className="font-display text-[19px] text-white font-semibold leading-tight">
                    Papa Iba CISSE
                  </p>
                  <p className="text-[#D4AF5A] text-[13px] font-medium mt-1">
                    Directeur Général
                  </p>
                  <p className="text-white/45 text-[13px] mt-0.5">
                    Teranga Digital Consulting Group (TDCG)
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/[0.07] flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[12.5px] text-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A]/70 shrink-0" />
                      Cabinet basé au Sénégal
                    </div>
                    <div className="flex items-center gap-2 text-[12.5px] text-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A]/70 shrink-0" />
                      Transformation digitale & IA
                    </div>
                    <div className="flex items-center gap-2 text-[12.5px] text-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A]/70 shrink-0" />
                      Afrique de l&apos;Ouest
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Letter text */}
              <div className="pt-2">
                {/* Opening quote */}
                <div className="flex items-start gap-4 mb-10 p-6 bg-[#D4AF5A]/[0.06] border border-[#D4AF5A]/20 rounded-xl">
                  <Quote size={22} className="text-[#D4AF5A] shrink-0 mt-0.5" />
                  <p className="font-display text-[18px] text-white/90 leading-relaxed italic">
                    La transformation digitale est la plus grande opportunité de développement
                    que l&apos;Afrique ait jamais connue. Notre génération a la responsabilité de
                    la saisir — avec vision, méthode et fierté de ce que nous sommes.
                  </p>
                </div>

                <div className="prose-tdcg space-y-6 text-[15.5px] text-white/70 leading-[1.8]">
                  <p>
                    Mesdames, Messieurs, chers partenaires,
                  </p>

                  <p>
                    Nous vivons une époque de transformations profondes. La révolution numérique
                    ne se limite plus aux grandes puissances économiques — elle est désormais au
                    cœur des dynamiques africaines. Et c&apos;est précisément dans ce contexte que
                    Teranga Digital Consulting Group (TDCG) a été fondé : pour être l&apos;architecte
                    de cette transformation sur notre continent.
                  </p>

                  <p>
                    Depuis notre création, notre mission est restée constante : accompagner les
                    entreprises, institutions et organisations africaines dans leur transition
                    numérique avec expertise, rigueur et une profonde compréhension des réalités
                    locales. Nous ne sommes pas simplement un cabinet de conseil — nous sommes un
                    partenaire stratégique engagé dans la construction d&apos;une Afrique digitalement
                    compétitive.
                  </p>

                  <p>
                    Notre approche repose sur une conviction simple mais puissante : la
                    transformation digitale n&apos;est pas une fin en soi, c&apos;est un levier de
                    performance. Chaque projet que nous menons, chaque stratégie que nous
                    concevons, chaque solution que nous déployons doit produire des résultats
                    mesurables — en termes de croissance, d&apos;efficacité et de compétitivité.
                  </p>

                  <p>
                    Chez TDCG, nous croyons que l&apos;intelligence artificielle et l&apos;automatisation
                    ne sont pas des menaces pour les entreprises africaines, mais des
                    opportunités extraordinaires de rattrapage et de leadership. Les organisations
                    qui sauront intégrer ces technologies aujourd&apos;hui seront les champions de
                    demain. Notre rôle est de les y préparer.
                  </p>

                  <p>
                    Ce qui nous distingue, c&apos;est notre double ancrage : la rigueur d&apos;un cabinet
                    de conseil international, associée à la connaissance intime des marchés,
                    des cultures et des contraintes de l&apos;Afrique de l&apos;Ouest. Nous ne transposons
                    pas des modèles étrangers — nous construisons des solutions adaptées,
                    durables et appropriées à notre contexte.
                  </p>

                  <p>
                    Je vous invite à explorer nos expertises, à découvrir nos méthodologies, et
                    surtout, à engager avec nous une conversation sur vos enjeux. Car c&apos;est
                    ensemble — en combinant votre connaissance de votre métier et notre expertise
                    digitale — que nous bâtirons les entreprises africaines de demain.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-10 pt-8 border-t border-white/[0.08]">
                  <div className="flex items-start justify-between flex-wrap gap-6">
                    <div>
                      <p className="font-display text-[20px] text-white font-semibold">
                        Papa Iba CISSE
                      </p>
                      <p className="text-[#D4AF5A] text-[13.5px] font-medium mt-1">
                        Directeur Général
                      </p>
                      <p className="text-white/45 text-[13px] mt-0.5">
                        Teranga Digital Consulting Group (TDCG)
                      </p>
                    </div>

                    {/* Decorative signature line */}
                    <div className="flex flex-col items-end gap-1 opacity-60">
                      <div className="w-32 h-px bg-gradient-to-r from-transparent to-[#D4AF5A]" />
                      <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#D4AF5A]/50" />
                      <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#D4AF5A]/25" />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <Link
                    href="/expertises"
                    className="inline-flex items-center gap-2.5 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[14.5px] rounded-full px-8 py-4 transition-colors"
                  >
                    Découvrir nos expertises
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => setShowContact(true)}
                    className="inline-flex items-center gap-2.5 ml-3 text-white/60 hover:text-white border border-white/15 hover:border-white/30 text-[14px] rounded-full px-7 py-3.5 transition-colors"
                  >
                    Nous contacter
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

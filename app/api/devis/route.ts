import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { escapeHtml, sanitizeEmail } from "@/lib/formSecurity";

export async function POST(req: Request) {
  try {
    const { prenom, nomfamille, email, secteur, budget, tailleLabel, objectifs, estimateText, website } =
      await req.json();

    // Honeypot anti-bot (voir /api/contact)
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!prenom || !nomfamille || !email) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const safeEmail = sanitizeEmail(email);
    if (!safeEmail) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    const html = `
      <h2>Nouvelle demande de devis</h2>
      <p><strong>Prénom :</strong> ${escapeHtml(prenom)}</p>
      <p><strong>Nom :</strong> ${escapeHtml(nomfamille)}</p>
      <p><strong>Email :</strong> ${escapeHtml(safeEmail)}</p>
      <p><strong>Secteur :</strong> ${escapeHtml(secteur)}</p>
      <p><strong>Budget indiqué :</strong> ${escapeHtml(budget)}</p>
      <p><strong>Taille de l'entreprise :</strong> ${escapeHtml(tailleLabel)}</p>
      <p><strong>Objectifs :</strong> ${escapeHtml(objectifs)}</p>
      <p><strong>Estimation calculée :</strong> ${escapeHtml(estimateText)}</p>
    `;

    await sendMail({
      subject: "Demande de devis - TDCG",
      html,
      replyTo: safeEmail,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi devis:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { escapeHtml, sanitizeEmail } from "@/lib/formSecurity";

export async function POST(req: Request) {
  try {
    const { prenom, nomfamille, email, entreprise, url, tailleLabel, website } = await req.json();

    // Honeypot anti-bot (voir /api/contact)
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!prenom || !nomfamille || !email || !entreprise || !url || !tailleLabel) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const safeEmail = sanitizeEmail(email);
    if (!safeEmail) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    const html = `
      <h2>Nouvelle demande d'audit digital</h2>
      <p><strong>Prénom :</strong> ${escapeHtml(prenom)}</p>
      <p><strong>Nom :</strong> ${escapeHtml(nomfamille)}</p>
      <p><strong>Email :</strong> ${escapeHtml(safeEmail)}</p>
      <p><strong>Entreprise :</strong> ${escapeHtml(entreprise)}</p>
      <p><strong>Site web :</strong> ${escapeHtml(url)}</p>
      <p><strong>Taille de l'entreprise :</strong> ${escapeHtml(tailleLabel)}</p>
    `;

    await sendMail({
      subject: "Demande d'audit digital - TDCG",
      html,
      replyTo: safeEmail,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi audit:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}

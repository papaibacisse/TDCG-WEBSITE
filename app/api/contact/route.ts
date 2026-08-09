import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { escapeHtml, sanitizeEmail } from "@/lib/formSecurity";

export async function POST(req: Request) {
  try {
    const { nom, email, entreprise, services, message, website } = await req.json();

    // Honeypot anti-bot : ce champ est invisible pour un humain mais souvent
    // rempli automatiquement par les robots de spam. S'il est rempli, on
    // fait semblant que tout s'est bien passé sans envoyer d'email.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!nom || !email || !entreprise || !message) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const safeEmail = sanitizeEmail(email);
    if (!safeEmail) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    const html = `
      <h2>Nouvelle demande depuis le site TDCG</h2>
      <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
      <p><strong>Email :</strong> ${escapeHtml(safeEmail)}</p>
      <p><strong>Entreprise :</strong> ${escapeHtml(entreprise)}</p>
      <p><strong>Services souhaités :</strong> ${escapeHtml(services)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    await sendMail({
      subject: "Nouvelle demande depuis le site TDCG",
      html,
      replyTo: safeEmail,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi contact:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}

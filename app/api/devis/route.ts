import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { prenom, nomfamille, email, secteur, budget, tailleLabel, objectifs, estimateText } =
      await req.json();

    if (!prenom || !nomfamille || !email) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const html = `
      <h2>Nouvelle demande de devis</h2>
      <p><strong>Prénom :</strong> ${prenom}</p>
      <p><strong>Nom :</strong> ${nomfamille}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Secteur :</strong> ${secteur}</p>
      <p><strong>Budget indiqué :</strong> ${budget}</p>
      <p><strong>Taille de l'entreprise :</strong> ${tailleLabel}</p>
      <p><strong>Objectifs :</strong> ${objectifs}</p>
      <p><strong>Estimation calculée :</strong> ${estimateText}</p>
    `;

    await sendMail({
      subject: "Demande de devis - TDCG",
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi devis:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}

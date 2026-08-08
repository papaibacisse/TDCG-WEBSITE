import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { prenom, nomfamille, email, entreprise, url, tailleLabel } = await req.json();

    if (!prenom || !nomfamille || !email || !entreprise || !url || !tailleLabel) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const html = `
      <h2>Nouvelle demande d'audit digital</h2>
      <p><strong>Prénom :</strong> ${prenom}</p>
      <p><strong>Nom :</strong> ${nomfamille}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Entreprise :</strong> ${entreprise}</p>
      <p><strong>Site web :</strong> ${url}</p>
      <p><strong>Taille de l'entreprise :</strong> ${tailleLabel}</p>
    `;

    await sendMail({
      subject: "Demande d'audit digital - TDCG",
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi audit:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}

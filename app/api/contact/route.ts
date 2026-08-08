import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { nom, email, entreprise, services, message } = await req.json();

    if (!nom || !email || !entreprise || !message) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const html = `
      <h2>Nouvelle demande depuis le site TDCG</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Entreprise :</strong> ${entreprise}</p>
      <p><strong>Services souhaités :</strong> ${services}</p>
      <p><strong>Message :</strong></p>
      <p>${String(message).replace(/\n/g, "<br/>")}</p>
    `;

    await sendMail({
      subject: "Nouvelle demande depuis le site TDCG",
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi contact:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}

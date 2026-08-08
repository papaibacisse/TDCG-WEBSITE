import nodemailer from "nodemailer";

// Réutilise la connexion SMTP entre les invocations quand c'est possible
// (utile en environnement serverless comme Vercel).
let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const port = Number(process.env.SMTP_PORT || 587);

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // ex: mail.infomaniak.com
    port,
    secure: port === 465, // true pour le port 465 (SSL), false pour 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER, // ex: contact@terangadigitalconsultinggroup.com
      pass: process.env.SMTP_PASS,
    },
  });

  return cachedTransporter;
}

export async function sendMail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Site TDCG" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO || process.env.SMTP_USER,
    replyTo,
    subject,
    html,
  });
}

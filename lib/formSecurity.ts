/**
 * Échappe les caractères spéciaux HTML pour éviter toute injection de
 * balises/scripts dans les emails générés à partir de champs de formulaire
 * saisis par les visiteurs.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Valide un format d'email simple et retire tout caractère de contrôle
 * (retour à la ligne, etc.) pouvant permettre une injection d'en-tête SMTP.
 * Retourne null si l'email est invalide.
 */
export function sanitizeEmail(value: unknown): string | null {
  const raw = String(value ?? "").replace(/[\r\n]/g, "").trim();
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_RE.test(raw) ? raw : null;
}

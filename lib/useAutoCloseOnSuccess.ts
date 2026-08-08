import { useEffect } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Ferme automatiquement le modal 6 secondes après un envoi réussi,
 * sauf si l'utilisateur l'a déjà fermé entre-temps. Réinitialise aussi
 * le statut du formulaire à "idle" quand le modal se referme, pour que
 * le prochain envoi reparte sur un état propre.
 */
export function useAutoCloseOnSuccess(
  status: Status,
  isOpen: boolean,
  closeModal: () => void,
  setStatus?: (status: Status) => void
) {
  useEffect(() => {
    if (status !== "success" || !isOpen) return;

    const timer = setTimeout(() => {
      closeModal();
    }, 6000);

    return () => clearTimeout(timer);
  }, [status, isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen && setStatus) {
      setStatus("idle");
    }
  }, [isOpen, setStatus]);
}

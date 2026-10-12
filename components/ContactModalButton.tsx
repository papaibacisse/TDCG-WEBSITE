"use client";

import { useModal } from "@/lib/ModalContext";
import { ArrowRight } from "lucide-react";

interface Props {
  label?: string;
  className?: string;
  showArrow?: boolean;
}

export default function ContactModalButton({
  label = "Prendre rendez-vous",
  className = "flex items-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[15px] rounded-full px-8 py-4 transition-colors",
  showArrow = true,
}: Props) {
  const { openModal } = useModal();
  return (
    <button onClick={() => openModal("contact")} className={className}>
      {label}
      {showArrow && <ArrowRight size={16} />}
    </button>
  );
}

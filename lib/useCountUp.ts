"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 up to `target` once the returned ref scrolls
 * into view. Returns the ref to attach and the current display value.
 */
export function useCountUp(target: number, suffix = "", duration = 1600) {
  const ref = useRef<HTMLElement | null>(null);
  // Valeur initiale = la valeur finale, pour que le contenu soit correct
  // même sans JavaScript (SEO, lecteurs d'écran, robots d'indexation).
  // L'animation "depuis 0" ne démarre qu'une fois le JS chargé et la
  // section visible à l'écran.
  const [value, setValue] = useState(`${target}${suffix}`);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            setValue(`0${suffix}`);
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * target) + suffix);
              if (progress < 1) requestAnimationFrame(step);
              else setValue(target + suffix);
            };
            requestAnimationFrame(step);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix, duration]);

  return { ref, value };
}

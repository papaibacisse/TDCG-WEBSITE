"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight particle-network animation (glowing gold connections on a
 * dark background) — the enterprise-tech visual language used by IBM,
 * Cisco and Microsoft. Pauses via IntersectionObserver when off-screen.
 *
 * Usage: place <NetworkCanvas /> as the first child of a `position:
 * relative` container; it absolutely fills that container.
 */
export default function NetworkCanvas({ opacity = 0.5, particleCount = 55 }: { opacity?: number; particleCount?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const section = canvas.closest("section");
    let width: number, height: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let running = true;
    let frame: number;
    const LINK_DIST = 130;

    function resize() {
      width = canvas!.width = canvas!.offsetWidth;
      height = canvas!.height = canvas!.offsetHeight;
    }

    function makeParticles() {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.35;
            ctx!.strokeStyle = `rgba(201,162,39,${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,255,0.55)";
        ctx!.fill();
      });

      frame = requestAnimationFrame(step);
    }

    resize();
    makeParticles();
    step();

    const onResize = () => { resize(); makeParticles(); };
    window.addEventListener("resize", onResize);

    let io: IntersectionObserver | undefined;
    if (section) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const wasRunning = running;
            running = entry.isIntersecting;
            if (running && !wasRunning) step();
          });
        },
        { threshold: 0 }
      );
      io.observe(section);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

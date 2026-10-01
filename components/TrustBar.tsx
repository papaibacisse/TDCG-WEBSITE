"use client";

const SECTORS_PREVIEW = [
  "Administration publique",
  "Finance & Banque",
  "Santé",
  "Agriculture",
  "Télécommunications",
  "ONG & Institutions",
  "Commerce & Distribution",
  "Startups",
];

export default function TrustBar() {
  return (
    <div className="bg-[#0B0F1E] border-y border-white/[0.06] py-5 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-8 flex items-center gap-8">
        <span className="font-mono text-[10px] uppercase tracking-[2.5px] text-white/30 shrink-0 whitespace-nowrap">
          Secteurs accompagnés
        </span>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex gap-6 w-max"
            style={{
              animation: "marquee 28s linear infinite",
            }}
          >
            {[...SECTORS_PREVIEW, ...SECTORS_PREVIEW].map((s, i) => (
              <span
                key={i}
                className="text-[13px] font-medium text-white/40 whitespace-nowrap px-3 py-1 rounded-full border border-white/[0.07]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const SECTORS_PREVIEW = [
  "Administration publique",
  "Finance",
  "Santé",
  "Agriculture",
  "ONG",
  "Télécommunications",
  "Startups",
];

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-navy/[0.08] py-7">
      <div className="max-w-[1240px] mx-auto px-8 flex items-center justify-between flex-wrap gap-6">
        <span className="font-mono text-xs uppercase tracking-wider text-grey">Ils nous font confiance dans</span>
        <div className="flex gap-8 flex-wrap">
          {SECTORS_PREVIEW.map((s) => (
            <span key={s} className="text-[13.5px] font-medium text-navy/75">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

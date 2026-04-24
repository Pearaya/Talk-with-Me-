import Link from "next/link";

const steps = [
  { n: 1, href: "/onboarding/step-1-profile", label: "Profile" },
  { n: 2, href: "/onboarding/step-2-status", label: "Status" },
  { n: 3, href: "/onboarding/step-3-skills", label: "Skills" },
  { n: 4, href: "/onboarding/step-4-portfolio", label: "Portfolio" },
];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-alt/40">
      <header className="border-b border-line bg-white">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand grid place-items-center text-white font-mono text-sm font-bold">
              C
            </div>
            <span className="font-bold">Coaching</span>
          </Link>
          <span className="text-sm text-ink-muted">Onboarding</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.n} className="flex-1 flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-brand text-white grid place-items-center font-mono text-sm font-bold">
                  {s.n}
                </div>
                <span className="text-xs font-semibold">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-brand/30 mb-5" />}
            </div>
          ))}
        </div>

        <div className="card p-8">{children}</div>
      </div>
    </div>
  );
}

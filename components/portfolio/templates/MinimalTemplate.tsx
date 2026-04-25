import { Portfolio } from "@/lib/portfolio-types";

export function MinimalTemplate({ p }: { p: Portfolio }) {
  return (
    <div className="bg-white text-ink p-10 md:p-14 max-w-3xl mx-auto">
      <header className="mb-10 pb-8 border-b border-line">
        <h1 className="text-4xl font-bold">{p.header.name || "Your Name"}</h1>
        <p className="text-ink-muted mt-1">
          {p.header.title}
          {p.header.location && ` · ${p.header.location}`}
        </p>
        {p.header.tagline && (
          <p className="text-lg mt-4 max-w-xl">{p.header.tagline}</p>
        )}
      </header>

      {p.about && (
        <Section title="About">
          <p className="text-ink-muted leading-relaxed">{p.about}</p>
        </Section>
      )}

      {p.experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-5">
            {p.experience.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline gap-4 flex-wrap">
                  <h3 className="font-bold">{e.role}</h3>
                  <span className="text-xs font-mono text-ink-muted">
                    {e.startDate} — {e.endDate}
                  </span>
                </div>
                <p className="text-sm text-ink-muted">{e.company}</p>
                {e.description && (
                  <p className="text-sm mt-2">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {p.projects.length > 0 && (
        <Section title="Selected Work">
          <div className="space-y-5">
            {p.projects.map((pr) => (
              <div key={pr.id}>
                <h3 className="font-bold">{pr.title}</h3>
                <p className="text-sm text-ink-muted mt-1">{pr.description}</p>
                {pr.impact && (
                  <p className="text-sm mt-1">
                    <span className="font-semibold">Impact:</span> {pr.impact}
                  </p>
                )}
                {pr.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pr.tags.map((t) => (
                      <span key={t} className="text-xs text-ink-muted">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {p.skills.length > 0 && (
        <Section title="Skills">
          <ul className="grid grid-cols-2 gap-y-1 text-sm">
            {p.skills.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </Section>
      )}

      {p.outcomes.length > 0 && (
        <Section title="Coaching Outcomes">
          <div className="space-y-4">
            {p.outcomes.map((o) => (
              <div key={o.id}>
                <h3 className="font-bold text-sm">{o.title}</h3>
                <p className="text-sm text-ink-muted mt-1">{o.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(p.contact.email || p.contact.linkedin || p.contact.website) && (
        <Section title="Contact">
          <div className="text-sm space-y-1">
            {p.contact.email && <div>✉ {p.contact.email}</div>}
            {p.contact.linkedin && <div>in {p.contact.linkedin}</div>}
            {p.contact.website && <div>🌐 {p.contact.website}</div>}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="tag mb-4">{title}</h2>
      {children}
    </section>
  );
}

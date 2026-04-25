import { Portfolio } from "@/lib/portfolio-types";

export function ModernTemplate({ p }: { p: Portfolio }) {
  return (
    <div className="bg-surface text-ink">
      {/* Hero */}
      <header className="relative overflow-hidden bg-white border-b border-line">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-light blur-3xl" />
        <div className="max-w-4xl mx-auto px-8 md:px-12 py-14 relative grid md:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="w-24 h-24 rounded-2xl bg-brand text-white grid place-items-center font-bold text-4xl">
            {p.header.avatarInitial || p.header.name[0] || "?"}
          </div>
          <div>
            <div className="tag mb-1">Portfolio</div>
            <h1 className="text-4xl font-bold">{p.header.name || "Your Name"}</h1>
            <p className="text-ink-muted text-lg mt-1">{p.header.title}</p>
            {p.header.location && (
              <p className="text-sm font-mono text-ink-muted mt-1">
                📍 {p.header.location}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 md:px-12 py-12 grid md:grid-cols-[1fr_280px] gap-10">
        <main className="space-y-12">
          {p.header.tagline && (
            <p className="text-xl leading-relaxed text-ink">
              {p.header.tagline}
            </p>
          )}

          {p.about && (
            <section>
              <div className="tag mb-3">About</div>
              <p className="text-ink-muted leading-relaxed">{p.about}</p>
            </section>
          )}

          {p.experience.length > 0 && (
            <section>
              <div className="tag mb-4">Experience</div>
              <div className="space-y-5">
                {p.experience.map((e) => (
                  <div key={e.id} className="card p-5">
                    <div className="flex justify-between flex-wrap gap-2">
                      <h3 className="font-bold">{e.role}</h3>
                      <span className="text-xs font-mono text-ink-muted">
                        {e.startDate} — {e.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-brand font-semibold mt-1">
                      {e.company}
                    </p>
                    {e.description && (
                      <p className="text-sm text-ink-muted mt-2">
                        {e.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {p.projects.length > 0 && (
            <section>
              <div className="tag mb-4">Selected Work</div>
              <div className="space-y-4">
                {p.projects.map((pr) => (
                  <div key={pr.id} className="card p-5 hover:border-brand transition-colors">
                    <h3 className="font-bold">{pr.title}</h3>
                    <p className="text-sm text-ink-muted mt-1">{pr.description}</p>
                    {pr.impact && (
                      <div className="mt-3 inline-block bg-brand-light text-brand text-sm font-semibold px-3 py-1 rounded-full">
                        → {pr.impact}
                      </div>
                    )}
                    {pr.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {pr.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 bg-surface-alt rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {p.outcomes.length > 0 && (
            <section>
              <div className="tag mb-4">Coaching Outcomes</div>
              <div className="space-y-3">
                {p.outcomes.map((o) => (
                  <div key={o.id} className="card p-5 border-l-4 border-l-brand">
                    <h3 className="font-bold text-sm">{o.title}</h3>
                    <p className="text-sm text-ink-muted mt-1">{o.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="space-y-8">
          {p.skills.length > 0 && (
            <section>
              <div className="tag mb-3">Skills</div>
              <div className="space-y-2">
                {p.skills.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold">{s.name}</span>
                      <span className="font-mono text-ink-muted text-xs">
                        {s.level}/5
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-alt overflow-hidden">
                      <div
                        className="h-full bg-brand"
                        style={{ width: `${(s.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(p.contact.email || p.contact.linkedin || p.contact.website) && (
            <section>
              <div className="tag mb-3">Contact</div>
              <div className="space-y-2 text-sm">
                {p.contact.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-ink-muted">✉</span>
                    <span>{p.contact.email}</span>
                  </div>
                )}
                {p.contact.linkedin && (
                  <div className="flex items-center gap-2">
                    <span className="text-ink-muted">in</span>
                    <span>{p.contact.linkedin}</span>
                  </div>
                )}
                {p.contact.website && (
                  <div className="flex items-center gap-2">
                    <span className="text-ink-muted">🌐</span>
                    <span>{p.contact.website}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

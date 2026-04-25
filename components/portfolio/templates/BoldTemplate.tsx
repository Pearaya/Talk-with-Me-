import { Portfolio } from "@/lib/portfolio-types";

export function BoldTemplate({ p }: { p: Portfolio }) {
  return (
    <div className="bg-ink text-white">
      <header className="px-8 md:px-14 py-16 bg-gradient-to-br from-brand via-brand-mid to-ink">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-white text-brand grid place-items-center font-bold text-4xl mb-6">
            {p.header.avatarInitial || p.header.name[0] || "?"}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] mb-3">
            {p.header.name || "Your Name"}
          </h1>
          <p className="text-xl text-white/90">{p.header.title}</p>
          {p.header.tagline && (
            <p className="text-lg text-white/70 mt-6 max-w-2xl">
              {p.header.tagline}
            </p>
          )}
          <p className="text-sm text-white/50 mt-4 font-mono">
            {p.header.location}
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-8 md:px-14 py-14 space-y-14">
        {p.about && (
          <section>
            <div className="tag mb-3 !text-brand-mid">About</div>
            <p className="text-xl leading-relaxed">{p.about}</p>
          </section>
        )}

        {p.experience.length > 0 && (
          <section>
            <div className="tag mb-5 !text-brand-mid">Experience</div>
            <div className="space-y-6">
              {p.experience.map((e) => (
                <div
                  key={e.id}
                  className="border-l-2 border-brand pl-5 py-1"
                >
                  <h3 className="text-xl font-bold">{e.role}</h3>
                  <p className="text-white/60 text-sm">
                    {e.company} · {e.startDate} — {e.endDate}
                  </p>
                  {e.description && (
                    <p className="mt-2 text-white/80">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {p.projects.length > 0 && (
          <section>
            <div className="tag mb-5 !text-brand-mid">Selected Work</div>
            <div className="grid md:grid-cols-2 gap-4">
              {p.projects.map((pr) => (
                <div
                  key={pr.id}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h3 className="font-bold text-lg">{pr.title}</h3>
                  <p className="text-sm text-white/70 mt-2">{pr.description}</p>
                  {pr.impact && (
                    <p className="text-sm mt-3 text-brand-mid font-semibold">
                      → {pr.impact}
                    </p>
                  )}
                  {pr.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {pr.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-brand/20 text-brand-mid"
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

        {p.skills.length > 0 && (
          <section>
            <div className="tag mb-5 !text-brand-mid">Skills</div>
            <div className="flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <span
                  key={s.id}
                  className="px-4 py-2 rounded-full bg-white/10 font-semibold"
                >
                  {s.name}
                  <span className="ml-2 text-brand-mid font-mono text-xs">
                    {"●".repeat(s.level)}
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}

        {p.outcomes.length > 0 && (
          <section>
            <div className="tag mb-5 !text-brand-mid">Coaching Outcomes</div>
            <div className="space-y-4">
              {p.outcomes.map((o) => (
                <div key={o.id} className="p-5 rounded-xl bg-brand/10 border border-brand/30">
                  <h3 className="font-bold">{o.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{o.description}</p>
                  <span className="text-xs font-mono uppercase text-brand-mid mt-2 inline-block">
                    via {o.source}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {(p.contact.email || p.contact.linkedin || p.contact.website) && (
          <section className="pt-8 border-t border-white/10">
            <div className="tag mb-3 !text-brand-mid">Contact</div>
            <div className="flex flex-wrap gap-4 text-sm">
              {p.contact.email && <span>✉ {p.contact.email}</span>}
              {p.contact.linkedin && <span>in {p.contact.linkedin}</span>}
              {p.contact.website && <span>🌐 {p.contact.website}</span>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

"use client";

import { Portfolio, Experience, Project, Skill, Outcome } from "@/lib/portfolio-types";

type SetPortfolio = (p: Portfolio) => void;

const genId = () => Math.random().toString(36).slice(2, 10);

export function HeaderSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="ชื่อ-นามสกุล">
          <input
            className="input"
            value={p.header.name}
            onChange={(e) =>
              set({ ...p, header: { ...p.header, name: e.target.value } })
            }
          />
        </Field>
        <Field label="Avatar (อักษรย่อ)">
          <input
            className="input"
            maxLength={2}
            value={p.header.avatarInitial}
            onChange={(e) =>
              set({ ...p, header: { ...p.header, avatarInitial: e.target.value } })
            }
          />
        </Field>
      </div>
      <Field label="ตำแหน่ง">
        <input
          className="input"
          value={p.header.title}
          onChange={(e) =>
            set({ ...p, header: { ...p.header, title: e.target.value } })
          }
        />
      </Field>
      <Field label="Tagline / แนะนำตัวสั้น ๆ">
        <input
          className="input"
          value={p.header.tagline}
          onChange={(e) =>
            set({ ...p, header: { ...p.header, tagline: e.target.value } })
          }
        />
      </Field>
      <Field label="สถานที่">
        <input
          className="input"
          value={p.header.location}
          onChange={(e) =>
            set({ ...p, header: { ...p.header, location: e.target.value } })
          }
        />
      </Field>
    </div>
  );
}

export function AboutSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  return (
    <Field label="เกี่ยวกับคุณ">
      <textarea
        rows={6}
        className="input"
        value={p.about}
        onChange={(e) => set({ ...p, about: e.target.value })}
        placeholder="เล่าประสบการณ์ จุดแข็ง และสิ่งที่คุณหลงใหล..."
      />
    </Field>
  );
}

export function ExperienceSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  const update = (id: string, patch: Partial<Experience>) =>
    set({
      ...p,
      experience: p.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  const add = () =>
    set({
      ...p,
      experience: [
        ...p.experience,
        { id: genId(), role: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    });
  const remove = (id: string) =>
    set({ ...p, experience: p.experience.filter((e) => e.id !== id) });

  return (
    <div className="space-y-4">
      {p.experience.map((e) => (
        <div key={e.id} className="card p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="ตำแหน่ง">
              <input
                className="input"
                value={e.role}
                onChange={(ev) => update(e.id, { role: ev.target.value })}
              />
            </Field>
            <Field label="บริษัท">
              <input
                className="input"
                value={e.company}
                onChange={(ev) => update(e.id, { company: ev.target.value })}
              />
            </Field>
            <Field label="เริ่ม">
              <input
                className="input"
                placeholder="เช่น 2022"
                value={e.startDate}
                onChange={(ev) => update(e.id, { startDate: ev.target.value })}
              />
            </Field>
            <Field label="สิ้นสุด">
              <input
                className="input"
                placeholder="Present หรือ 2024"
                value={e.endDate}
                onChange={(ev) => update(e.id, { endDate: ev.target.value })}
              />
            </Field>
          </div>
          <Field label="รายละเอียด">
            <textarea
              rows={2}
              className="input"
              value={e.description}
              onChange={(ev) => update(e.id, { description: ev.target.value })}
            />
          </Field>
          <button
            type="button"
            onClick={() => remove(e.id)}
            className="text-xs text-red-600 font-semibold hover:underline"
          >
            ลบ
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-secondary w-full">
        + เพิ่มประสบการณ์
      </button>
    </div>
  );
}

export function ProjectsSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  const update = (id: string, patch: Partial<Project>) =>
    set({
      ...p,
      projects: p.projects.map((pr) => (pr.id === id ? { ...pr, ...patch } : pr)),
    });
  const add = () =>
    set({
      ...p,
      projects: [
        ...p.projects,
        { id: genId(), title: "", description: "", tags: [], link: "", impact: "" },
      ],
    });
  const remove = (id: string) =>
    set({ ...p, projects: p.projects.filter((pr) => pr.id !== id) });

  return (
    <div className="space-y-4">
      {p.projects.map((pr) => (
        <div key={pr.id} className="card p-4 space-y-3">
          <Field label="ชื่อผลงาน">
            <input
              className="input"
              value={pr.title}
              onChange={(e) => update(pr.id, { title: e.target.value })}
            />
          </Field>
          <Field label="รายละเอียด">
            <textarea
              rows={2}
              className="input"
              value={pr.description}
              onChange={(e) => update(pr.id, { description: e.target.value })}
            />
          </Field>
          <Field label="Impact / ผลลัพธ์">
            <input
              className="input"
              placeholder="เช่น +42% activation rate"
              value={pr.impact}
              onChange={(e) => update(pr.id, { impact: e.target.value })}
            />
          </Field>
          <Field label="Tags (คั่นด้วย comma)">
            <input
              className="input"
              value={pr.tags.join(", ")}
              onChange={(e) =>
                update(pr.id, {
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
          <button
            type="button"
            onClick={() => remove(pr.id)}
            className="text-xs text-red-600 font-semibold hover:underline"
          >
            ลบ
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-secondary w-full">
        + เพิ่มผลงาน
      </button>
    </div>
  );
}

export function SkillsSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  const update = (id: string, patch: Partial<Skill>) =>
    set({
      ...p,
      skills: p.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  const add = () =>
    set({
      ...p,
      skills: [...p.skills, { id: genId(), name: "", level: 3 }],
    });
  const remove = (id: string) =>
    set({ ...p, skills: p.skills.filter((s) => s.id !== id) });

  return (
    <div className="space-y-3">
      {p.skills.map((s) => (
        <div key={s.id} className="flex items-center gap-3">
          <input
            className="input flex-1"
            placeholder="ชื่อ Skill"
            value={s.name}
            onChange={(e) => update(s.id, { name: e.target.value })}
          />
          <select
            className="input max-w-[100px]"
            value={s.level}
            onChange={(e) =>
              update(s.id, { level: Number(e.target.value) as Skill["level"] })
            }
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} / 5
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => remove(s.id)}
            className="text-ink-muted hover:text-red-600 px-2"
            aria-label="remove"
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-secondary w-full">
        + เพิ่ม Skill
      </button>
    </div>
  );
}

export function OutcomesSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  const update = (id: string, patch: Partial<Outcome>) =>
    set({
      ...p,
      outcomes: p.outcomes.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    });
  const add = () =>
    set({
      ...p,
      outcomes: [
        ...p.outcomes,
        { id: genId(), title: "", description: "", source: "coaching" },
      ],
    });
  const remove = (id: string) =>
    set({ ...p, outcomes: p.outcomes.filter((o) => o.id !== id) });

  return (
    <div className="space-y-4">
      {p.outcomes.map((o) => (
        <div key={o.id} className="card p-4 space-y-3">
          <Field label="ชื่อ Outcome">
            <input
              className="input"
              value={o.title}
              onChange={(e) => update(o.id, { title: e.target.value })}
            />
          </Field>
          <Field label="รายละเอียด">
            <textarea
              rows={2}
              className="input"
              value={o.description}
              onChange={(e) => update(o.id, { description: e.target.value })}
            />
          </Field>
          <Field label="แหล่งที่มา">
            <select
              className="input"
              value={o.source}
              onChange={(e) =>
                update(o.id, { source: e.target.value as Outcome["source"] })
              }
            >
              <option value="coaching">จาก Coaching</option>
              <option value="self">บันทึกเอง</option>
            </select>
          </Field>
          <button
            type="button"
            onClick={() => remove(o.id)}
            className="text-xs text-red-600 font-semibold hover:underline"
          >
            ลบ
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-secondary w-full">
        + เพิ่ม Outcome
      </button>
    </div>
  );
}

export function ContactSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  return (
    <div className="space-y-4">
      <Field label="Email">
        <input
          type="email"
          className="input"
          value={p.contact.email}
          onChange={(e) =>
            set({ ...p, contact: { ...p.contact, email: e.target.value } })
          }
        />
      </Field>
      <Field label="LinkedIn">
        <input
          className="input"
          value={p.contact.linkedin}
          onChange={(e) =>
            set({ ...p, contact: { ...p.contact, linkedin: e.target.value } })
          }
        />
      </Field>
      <Field label="Website">
        <input
          className="input"
          value={p.contact.website}
          onChange={(e) =>
            set({ ...p, contact: { ...p.contact, website: e.target.value } })
          }
        />
      </Field>
    </div>
  );
}

export function SettingsSection({ p, set }: { p: Portfolio; set: SetPortfolio }) {
  const templates = [
    { id: "minimal", name: "Minimal", desc: "เรียบง่าย เน้นเนื้อหา" },
    { id: "bold", name: "Bold", desc: "สะดุดตา ทันสมัย" },
    { id: "modern", name: "Modern", desc: "มีโครงสร้างชัดเจน มี Sidebar" },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <div className="label mb-3">Template</div>
        <div className="grid sm:grid-cols-3 gap-3">
          {templates.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => set({ ...p, templateId: t.id })}
              className={`card p-4 text-left hover:border-brand ${
                p.templateId === t.id ? "border-brand bg-brand-light" : ""
              }`}
            >
              <div className="font-bold">{t.name}</div>
              <div className="text-xs text-ink-muted mt-1">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={p.isPublic}
            onChange={(e) => set({ ...p, isPublic: e.target.checked })}
            className="rounded border-line text-brand focus:ring-brand"
          />
          <div>
            <div className="font-semibold">เปิดเป็นสาธารณะ</div>
            <div className="text-xs text-ink-muted">
              ให้คนอื่นดู Portfolio ได้ผ่านลิงก์
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

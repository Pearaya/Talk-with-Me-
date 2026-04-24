import { PageHeader } from "./PageHeader";

export function Placeholder({
  tag,
  title,
  description,
  note = "หน้านี้จะถูกพัฒนาใน Phase ถัดไป",
}: {
  tag?: string;
  title: string;
  description?: string;
  note?: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <PageHeader tag={tag} title={title} description={description} />
      <div className="card p-10 text-center">
        <div className="text-5xl mb-4">🚧</div>
        <p className="text-ink-muted">{note}</p>
      </div>
    </div>
  );
}

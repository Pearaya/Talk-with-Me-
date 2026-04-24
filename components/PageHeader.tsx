export function PageHeader({
  tag,
  title,
  description,
}: {
  tag?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      {tag && <div className="tag mb-2">{tag}</div>}
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-ink-muted mt-2 max-w-2xl">{description}</p>
      )}
    </div>
  );
}

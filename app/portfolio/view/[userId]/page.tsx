import { PublicHeader } from "@/components/PublicHeader";

export default function PublicPortfolioPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="tag mb-2">Public Portfolio</div>
        <h1 className="text-4xl font-bold">Portfolio ของ {params.userId}</h1>
        <div className="card p-10 mt-8 text-center">
          <div className="text-5xl mb-4">🚧</div>
          <p className="text-ink-muted">หน้า Public Portfolio จะถูกพัฒนาใน Phase ถัดไป</p>
        </div>
      </div>
    </>
  );
}

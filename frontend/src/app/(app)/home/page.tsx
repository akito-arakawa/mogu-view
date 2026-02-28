export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">ホーム</h1>
        <p className="mt-1 text-sm text-gray-500">
          おすすめのお店やお知らせを表示します
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
        <p className="text-4xl">🏠</p>
        <p className="mt-4 font-bold text-gray-700">ホームページ</p>
        <p className="mt-1 text-sm text-gray-400">このページは準備中です</p>
      </div>
    </div>
  );
}

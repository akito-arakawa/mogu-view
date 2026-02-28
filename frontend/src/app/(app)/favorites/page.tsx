export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">お気に入り</h1>
        <p className="mt-1 text-sm text-gray-500">
          お気に入りに追加したお店を一覧できます
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
        <p className="text-4xl">❤️</p>
        <p className="mt-4 font-bold text-gray-700">お気に入りページ</p>
        <p className="mt-1 text-sm text-gray-400">このページは準備中です</p>
      </div>
    </div>
  );
}

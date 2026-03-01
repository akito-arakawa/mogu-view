import Image from "next/image";
import { BackButton } from "@/components/elements/BackButton";
import type { HotPepperShop } from "@/features/restaurant/types/HotPepper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface RestaurantDetailProps {
  shop: HotPepperShop;
}

// セクションヘッダー
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
      <span className="inline-block h-5 w-1 rounded-full bg-primary" />
      {children}
    </h2>
  );
}

// 店舗情報
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6 border-b border-gray-100 px-4 py-3.5 last:border-b-0">
      <span className="w-16 shrink-0 text-sm font-medium text-primary">
        {label}
      </span>
      <span className="text-sm leading-relaxed text-gray-700">{value}</span>
    </div>
  );
}

// 店舗情報を作成
function buildInfoRows(shop: HotPepperShop) {
  const rows: { label: string; value: string }[] = [];
  if (shop.address) rows.push({ label: "住所", value: shop.address });
  if (shop.open) rows.push({ label: "営業時間", value: shop.open });
  if (shop.access) rows.push({ label: "アクセス", value: shop.access });
  if (shop.budget.name) rows.push({ label: "予算", value: shop.budget.name });
  if (shop.close) rows.push({ label: "定休日", value: shop.close });
  return rows;
}


export function RestaurantDetail({ shop }: RestaurantDetailProps) {
  const infoRows = buildInfoRows(shop);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      {/* 戻るリンク */}
      <div className="pt-4">
        <BackButton label="← 検索結果に戻る" />
      </div>

      {/* ヒーロー画像 + オーバーレイ */}
      <div className="relative mt-4 overflow-hidden rounded-3xl">
        <div className="relative h-72 sm:h-80">
          <Image
            src={shop.photo.pc.l}
            alt={shop.name}
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* オーバーレイコンテンツ */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <Badge className="mb-2">{shop.genre.name}</Badge>
          <h1 className="text-2xl font-bold leading-tight text-white drop-shadow-sm">
            {shop.name}
          </h1>
          {shop.genre.catch && (
            <p className="mt-1 text-sm text-white/75">{shop.genre.catch}</p>
          )}
        </div>

        {/* お気に入りアイコン */}
        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white/90 backdrop-blur-sm transition hover:bg-black/40">
          <HeartIcon />
        </button>
      </div>

      {/* アクションボタン */}
      <div className="mt-5 flex gap-3">
        <a
          href={shop.urls.pc}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="primary" size="lg" fullWidth>
            予約・公式サイト
          </Button>
        </a>
        <a
          href={`https://www.google.com/maps?q=${shop.lat},${shop.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="dark" size="lg" fullWidth>
            地図で確認
          </Button>
        </a>
      </div>

      {/* 店舗情報 */}
      {infoRows.length > 0 && (
        <div className="mt-10">
          <SectionHeading>店舗情報</SectionHeading>
          <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100">
            {infoRows.map((row) => (
              <InfoRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

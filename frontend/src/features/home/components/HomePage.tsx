import Link from "next/link";
import { FloatingCard } from "./FloatingCard";
import { OrangeBlob } from "./OrangeBlob";
import { FEATURES } from "@/constants/app";

export function HomePage() {
  return (
    <>
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24 lg:py-32">
          {/* 左: テキスト */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              近くの
              <span className="inline-block rounded-lg bg-primary px-3 py-1 text-white">
                美味しい
              </span>
              <br />
              お店を見つけよう
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-500">
              現在地からワンタップで周辺のレストランを検索。ジャンル、予算、距離であなたにぴったりのお店がすぐ見つかります。
            </p>
            <Link
              href="/search"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-orange-500/30"
            >
              お店を探す
            </Link>
          </div>

          {/* 右: イラストレーション */}
          <div className="relative hidden md:block">
            <OrangeBlob />

            <div className="relative z-10 flex items-center justify-center">
              <span className="text-[140px] drop-shadow-lg lg:text-[180px]">
                🍜
              </span>
            </div>

            {/* フローティングカード群 */}
            <FloatingCard className="-top-2 right-8 lg:right-16">
              <span className="text-lg">📍</span>
              <div>
                <p className="text-[13px] font-bold text-foreground">
                  現在地から検索
                </p>
                <p className="text-[11px] text-gray-400">
                  ワンタップで周辺検索
                </p>
              </div>
            </FloatingCard>

            <FloatingCard className="right-0 top-20 lg:-right-4">
              <span className="text-lg">🔍</span>
              <div>
                <p className="text-[13px] font-bold text-foreground">
                  キーワード検索
                </p>
                <p className="text-[11px] text-gray-400">
                  ジャンル・予算で絞り込み
                </p>
              </div>
            </FloatingCard>

            <FloatingCard className="-bottom-2 left-4 lg:left-12">
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-[13px] font-bold text-foreground">
                  お気に入り保存
                </p>
                <p className="text-[11px] text-gray-400">
                  ワンタップで保存
                </p>
              </div>
            </FloatingCard>

            <FloatingCard className="bottom-8 right-0 lg:right-4">
              <span className="text-lg">📋</span>
              <div>
                <p className="text-[13px] font-bold text-foreground">
                  閲覧履歴
                </p>
                <p className="text-[11px] text-gray-400">
                  自動で記録
                </p>
              </div>
            </FloatingCard>

          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section className="bg-gradient-to-b from-transparent to-orange-50/40 px-6 pb-20 pt-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${f.bg}`}
              >
                {f.emoji}
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-gray-500">
                {f.description}
              </p>
              {f.href && (
                <Link
                  href={f.href}
                  className="mt-4 inline-block text-[13px] font-semibold text-primary transition hover:text-primary-hover"
                >
                  Learn More →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

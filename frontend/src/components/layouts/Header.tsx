"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/", label: "ホーム" },
    { href: "/search", label: "お店を探す" },
    { href: "/roulette", label: "ルーレット" },
    { href: "/favorites", label: "お気に入り" },
    { href: "/history", label: "閲覧履歴" },
  ] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
     <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      {/* 左: ロゴ */}
      <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-base font-bold text-white shadow-md shadow-orange-500/30">
            G
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            グルメサーチ
          </span>
        </Link>

        {/* 右: ナビアイコン */}
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-gray-500 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition hover:text-primary",
                  isActive && "font-bold text-primary",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
         {/* 右: ログインボタン */}
         <Link
          href="/login"
          className="rounded-full border-2 border-primary px-5 py-1.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
        >
          ログイン
        </Link>
      </div>
    </header>
  );
}

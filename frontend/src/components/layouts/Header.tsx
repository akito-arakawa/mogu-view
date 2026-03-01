"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/home", label: "ホーム" },
  { href: "/search", label: "お店を探す" },
  { href: "/roulette", label: "ルーレット" },
  { href: "/favorites", label: "お気に入り" },
  { href: "/history", label: "閲覧履歴" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-4 md:px-6">
        {/* ─── SP: ハンバーガーボタン（左） / PC: ロゴ（左） ─── */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>

          <Link
            href="/"
            className="hidden items-center gap-2.5 md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-base font-bold text-white shadow-md shadow-orange-500/30">
              M
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              もぐビュー
            </span>
          </Link>
        </div>

        {/* ─── SP: ロゴ（中央） ─── */}
        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 md:hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-base font-bold text-white shadow-md shadow-orange-500/30">
            M
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-foreground min-[400px]:inline">
            もぐビュー
          </span>
        </Link>

        {/* ─── PC: テキストナビ（中央） ─── */}
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-gray-500 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/home"
                ? pathname === "/home"
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

        {/* ─── ログインボタン（右・常時表示） ─── */}
        <Link
          href="/login"
          className="shrink-0 rounded-full border-2 border-primary px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-orange-500/25 min-[400px]:px-5 min-[400px]:text-sm"
        >
          ログイン
        </Link>
      </div>

      {/* ─── SP: モバイルメニュー ─── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 top-[65px] z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <nav className="fixed inset-x-0 top-[65px] z-50 border-b border-gray-100 bg-white px-6 pb-6 pt-4 shadow-xl md:hidden">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/home"
                    ? pathname === "/home"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                        isActive
                          ? "bg-primary-light font-bold text-primary"
                          : "text-gray-600 hover:bg-gray-50",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </>
      )}
    </svg>
  );
}

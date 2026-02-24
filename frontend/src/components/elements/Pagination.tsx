import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Pagination as PaginationType } from "@/types/Pagination";

interface PaginationProps {
  pagination: PaginationType;
  buildHref: (page: number) => string;
  className?: string;
}

/**
 * ページ番号 + 前へ/次へ。URL ベースでページ切り替え。
 * buildHref にページ番号を渡すと遷移先 URL を返す関数を受け取る。
 */
export function Pagination({ pagination, buildHref, className }: PaginationProps) {
  const { current_page, last_page } = pagination;

  if (last_page <= 1) return null;

  const pages = getPageNumbers(current_page, last_page);
  const hasPrev = current_page > 1;
  const hasNext = current_page < last_page;

  return (
    <nav aria-label="ページネーション" className={cn("flex items-center justify-center gap-1", className)}>
      {/* 前へ */}
      <Link
        href={buildHref(current_page - 1)}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          hasPrev ? "text-gray-500 hover:bg-gray-100 hover:text-gray-700" : "cursor-not-allowed text-gray-300"
        )}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
      >
        <ChevronLeftIcon />
        前へ
      </Link>

      {/* ページ番号 */}
      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="flex h-10 w-10 items-center justify-center text-sm text-gray-400">
            &hellip;
          </span>
        ) : (
          <PageLink
            key={page}
            page={page}
            href={buildHref(page)}
            isActive={page === current_page}
          />
        ),
      )}

      {/* 次へ */}
      <Link
        href={buildHref(current_page + 1)}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          hasNext ? "text-primary hover:bg-primary-light" : "cursor-not-allowed text-gray-300"
        )}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? undefined : -1}
      >
        次へ
        <ChevronRightIcon />
      </Link>
    </nav>
  );
}

function PageLink({ page, href, isActive }: { page: number; href: string; isActive: boolean }) {
  if (isActive) {
    return (
      <span
        aria-current="page"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md"
      >
        {page}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >
      {page}
    </Link>
  );
}

type PageItem = number | "ellipsis";

/**
 * 表示するページ番号の配列を生成する。
 * 常に先頭・末尾ページを含み、現在ページ前後を表示、間を ellipsis で埋める。
 */
function getPageNumbers(current: number, last: number): PageItem[] {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  const pages: PageItem[] = [];
  const siblings = new Set<number>();
  siblings.add(1);
  siblings.add(last);
  for (let i = Math.max(2, current - 1); i <= Math.min(last - 1, current + 1); i++) {
    siblings.add(i);
  }

  const sorted = Array.from(siblings).sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      pages.push("ellipsis");
    }
    pages.push(sorted[i]);
  }

  return pages;
}

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

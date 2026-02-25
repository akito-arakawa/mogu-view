import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 text-center text-[13px] text-gray-400">
      <p>
        Powered by{" "}
        <Link
          href="https://webservice.recruit.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-primary"
        >
          ホットペッパー グルメ Webサービス
        </Link>
      </p>
    </footer>
  );
}

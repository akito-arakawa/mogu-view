import Link from "next/link";
import { HOTPEPPER_CREDIT_URL, HOTPEPPER_CREDIT_TEXT } from "@/constants/app";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
      <p>
        Powered by{" "}
        <Link
          href={HOTPEPPER_CREDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-primary"
        >
          {HOTPEPPER_CREDIT_TEXT}
        </Link>
      </p>
    </footer>
  );
}

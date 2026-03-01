"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export function BackButton({
  label = "← 戻る",
  className = "text-[13px] font-medium text-gray-400 transition hover:text-primary",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      {label}
    </button>
  );
}

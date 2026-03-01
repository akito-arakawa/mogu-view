export function FloatingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}

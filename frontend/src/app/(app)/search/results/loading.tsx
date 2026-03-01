import { CardSkeletonGrid, Skeleton } from "@/components/ui/Skeleton";

function HeaderSkeleton() {
  return (
    <div className="mb-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-6 w-48" />
    </div>
  );
}

export default function SearchResultsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-6">
      <HeaderSkeleton />
      <CardSkeletonGrid count={6} />
    </div>
  );
}

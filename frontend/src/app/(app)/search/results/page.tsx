import { searchRestaurants } from "@/features/restaurant/actions";
import { parseSearchParams } from "@/features/restaurant/utils/parseSearchParams";
import { SearchResults } from "@/features/restaurant/components/SearchResults";

interface SearchResultsPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchResultsPage({
  searchParams,
}: SearchResultsPageProps) {
  const resolvedParams = await searchParams;
  const params = parseSearchParams(resolvedParams);
  const result = await searchRestaurants(params);
  return <SearchResults params={params} result={result} />;
}

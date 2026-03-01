import { notFound } from "next/navigation";
import { getRestaurantById } from "@/features/restaurant/actions";
import { RestaurantDetail } from "@/features/restaurant/components/RestaurantDetail";

interface RestaurantPageProps {
  params: Promise<{ id: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = await params;
  const shop = await getRestaurantById(id);

  if (!shop) notFound();

  return <RestaurantDetail shop={shop} />;
}

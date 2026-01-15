import { getUniqueCategories, getUniqueTags } from "@/lib/filters";
import { FilterSidebar } from "./FilterSidebar";

export async function UserFilterSidebar() {
  const availableCategories = (await getUniqueCategories()) as string[];
  const availableTags = (await getUniqueTags()) as string[];

  return (
    <FilterSidebar categories={availableCategories} tags={availableTags} />
  );
}

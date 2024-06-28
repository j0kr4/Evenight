import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isFree, setIsFree] = useState(false);
  const [hasAlcohol, setHasAlcohol] = useState(false);
  const [hasFood, setHasFood] = useState(false);
  const query = new URLSearchParams();

  const queryGetFree = searchParams.get("free");
  const queryGetAlcohol = searchParams.get("alcool");
  const queryGetFood = searchParams.get("food");

  const toggleIsFree = () => {
    setIsFree(!isFree);
    updateQueryString(!isFree, hasAlcohol, hasFood);
  };
  const toggleHasAlcohol = () => {
    setHasAlcohol(!hasAlcohol);
    updateQueryString(isFree, !hasAlcohol, hasFood);
  };
  const toggleHasFood = () => {
    setHasFood(!hasFood);
    updateQueryString(isFree, hasAlcohol, !hasFood);
  };

  const updateQueryString = (free: any, alcohol: any, food: any) => {
    if (free) query.set("free", "true");
    if (alcohol) query.set("alcool", "true");
    if (food) query.set("food", "true");

    router.push(`?${query.toString()}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={isFree}
          onCheckedChange={toggleIsFree}
        >
          Gratuit
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={hasAlcohol}
          onCheckedChange={toggleHasAlcohol}
        >
          Avec Alcool
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={hasFood}
          onCheckedChange={toggleHasFood}
        >
          Avec à Manger
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterSearch;

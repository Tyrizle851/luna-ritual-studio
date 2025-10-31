import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SortFilter, SortOption } from "./SortFilter";

interface MobileFilterDrawerProps {
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const MobileFilterDrawer = ({
  sortValue,
  onSortChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: MobileFilterDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="border-clay text-clay">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle className="font-display">Filter & Sort</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <SortFilter value={sortValue} onChange={onSortChange} />
          </div>

          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    selectedCategory === category
                      ? "bg-clay hover:bg-clay-dark text-white"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "featured" | "price-low" | "price-high" | "newest";

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortFilter = ({ value, onChange }: SortFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-text-muted" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] border-border">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
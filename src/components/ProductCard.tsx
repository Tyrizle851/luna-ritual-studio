import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ProductCard = ({ children, onClick, className = "" }: ProductCardProps) => {
  return (
    <div 
      className={cn(
        "group relative bg-card rounded-xl border border-border/50 overflow-hidden",
        "shadow-subtle hover:shadow-card-hover",
        "hover:-translate-y-2 transition-all duration-300 ease-smooth cursor-pointer",
        "img-zoom",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
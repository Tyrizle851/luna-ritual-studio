import { ReactNode } from "react";

interface ProductCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ProductCard = ({ children, onClick, className = "" }: ProductCardProps) => {
  return (
    <div 
      className={`group relative bg-card border border-border shadow-subtle overflow-hidden hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

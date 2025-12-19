import { ReactNode } from "react";

interface ProductCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ProductCard = ({ children, onClick, className = "" }: ProductCardProps) => {
  return (
    <div 
      className={`group relative bg-card overflow-hidden cursor-pointer transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

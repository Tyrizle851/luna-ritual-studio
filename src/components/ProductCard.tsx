import { ReactNode } from "react";

interface ProductCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ProductCard = ({ children, onClick, className = "" }: ProductCardProps) => {
  return (
    <div 
      className={`group relative bg-[#FAF8F5] border border-[#EBDDD1]/50 shadow-[0_4px_16px_rgba(139,107,84,0.08)] overflow-hidden hover:shadow-[0_8px_24px_rgba(139,107,84,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

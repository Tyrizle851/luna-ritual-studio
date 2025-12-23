import { ReactNode, CSSProperties } from "react";

interface ProductCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const ProductCard = ({ children, onClick, className = "", style }: ProductCardProps) => {
  return (
    <div 
      className={`group relative bg-card border border-border shadow-subtle overflow-hidden hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

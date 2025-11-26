import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center justify-center mb-3" aria-label="Breadcrumb">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/40 text-xs text-text-muted backdrop-blur-sm">
        <Link to="/" className="hover:text-clay transition-colors flex items-center gap-1.5">
          <Home className="h-3 w-3" />
          <span>Home</span>
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-text-muted/50">•</span>
            {item.href && index < items.length - 1 ? (
              <Link to={item.href} className="hover:text-clay transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
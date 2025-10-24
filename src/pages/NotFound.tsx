import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="mb-4 font-display text-6xl text-clay">404</h1>
        <p className="mb-2 text-2xl">Page Not Found</p>
        <p className="mb-8 text-text-secondary">
          This page seems to have wandered off. Let us get you back home.
        </p>
        <Button asChild className="bg-clay hover:bg-clay-dark text-white">
          <a href="/">Return Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

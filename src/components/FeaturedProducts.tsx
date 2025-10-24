import { affiliateProducts } from "@/data/affiliateProducts";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FeaturedProducts = () => {
  const featured = affiliateProducts.slice(0, 3);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">The Ritual Edit</h2>
          <p className="text-lg text-text-secondary">Curated finds for intentional living</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featured.map((product) => (
            <div key={product.id} className="group animate-fade-up">
              <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-background">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-text-muted mb-1">{product.brand}</p>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <p className="text-sm text-text-secondary italic mb-3">{product.caption}</p>
              <Button
                size="sm"
                variant="outline"
                className="border-clay text-clay hover:bg-clay/10 w-full"
                asChild
              >
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                  View Product <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay/10">
            <a href="/shop/lifestyle">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

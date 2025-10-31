import { affiliateProducts } from "@/data/affiliateProducts";
import { ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FeaturedProducts = () => {
  const featured = affiliateProducts.slice(0, 3);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-clay" />
            <h2 className="mb-0">The Ritual Edit</h2>
            <Sparkles className="h-6 w-6 text-clay" />
          </div>
          <p className="text-lg text-text-secondary">Curated finds for intentional living</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featured.map((product) => (
            <div key={product.id} className="group animate-fade-up">
              <div className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-background transition-all duration-300 group-hover:shadow-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{product.brand}</p>
              <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{product.name}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{product.caption}</p>
              <Button
                size="sm"
                variant="outline"
                className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 w-full"
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
          <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300">
            <a href="/shop/lifestyle">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View All Products
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

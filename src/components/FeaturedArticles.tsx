import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, Clock } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const FeaturedArticles = () => {
  const featured = articles.slice(0, 1)[0];

  // Calculate more accurate read time based on excerpt length (approx 200 words/min)
  const getReadTime = (excerpt: string) => {
    const wordCount = excerpt.split(/\s+/).length;
    // Assume full article is ~5x excerpt length
    const estimatedFullWordCount = wordCount * 5;
    const minutes = Math.ceil(estimatedFullWordCount / 200);
    return `${minutes} min`;
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-clay" />
            <h2 className="mb-0 text-3xl sm:text-4xl md:text-5xl">The Journal</h2>
            <Sparkles className="h-6 w-6 text-clay" />
          </div>
          <p className="text-lg text-text-secondary">Stories on slow living and intentional design</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <Link
            to={`/journal/${featured.slug}`}
            className="group animate-fade-up block"
          >
            <ProductCard className="overflow-hidden">
              <div className="overflow-hidden aspect-video bg-secondary">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-clay uppercase tracking-wider">
                    {featured.category}
                  </span>
                  <span className="text-xs text-text-muted">•</span>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {getReadTime(featured.excerpt)} read
                  </div>
                </div>
                <h3 className="font-display text-xl mb-3 group-hover:text-clay transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>
            </ProductCard>
          </Link>
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 btn-premium">
            <Link to="/journal">
              <BookOpen className="mr-2 h-4 w-4" />
              Read More Stories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

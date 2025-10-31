import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";

export const FeaturedArticles = () => {
  const featured = articles.slice(0, 1);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-clay" />
            <h2 className="mb-0">The Journal</h2>
            <Sparkles className="h-6 w-6 text-clay" />
          </div>
          <p className="text-lg text-text-secondary">Stories on slow living and intentional design</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          {featured.map((article) => (
            <Link
              key={article.id}
              to={`/journal/${article.slug}`}
              className="group animate-fade-up"
            >
              <div className="mb-4 overflow-hidden rounded aspect-video bg-secondary">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <span className="inline-block text-xs font-medium text-clay mb-2">
                {article.category}
              </span>
              <h3 className="font-display text-xl mb-2 group-hover:text-clay transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-text-muted">{article.readTime} read</p>
            </Link>
          ))}
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

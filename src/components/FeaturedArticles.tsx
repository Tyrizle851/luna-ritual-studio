import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { Button } from "@/components/ui/button";

export const FeaturedArticles = () => {
  const featured = articles.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">The Journal</h2>
          <p className="text-lg text-text-secondary">Stories on slow living and intentional design</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
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
          <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay/10">
            <Link to="/journal">Read More Stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

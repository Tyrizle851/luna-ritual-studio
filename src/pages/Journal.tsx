import { Link } from "react-router-dom";
import { articles } from "@/data/articles";

const Journal = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-5xl">
        <h1 className="mb-4 text-center">The Journal</h1>
        <p className="text-center text-text-secondary mb-16 max-w-2xl mx-auto">
          Stories on slow living and intentional design
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group">
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
              <h2 className="font-display text-2xl mb-3 group-hover:text-clay transition-colors">
                <Link to={`/journal/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-text-secondary mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-text-muted">
                <span>{article.author}</span>
                <span>{article.readTime} read</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;

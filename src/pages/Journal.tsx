import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { BookOpen, Clock, User } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

const Journal = () => {
  return (
    <PageTransition>
      <div className="min-h-screen section-padding">
      <div className="container-custom max-w-5xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-clay" />
          <h1 className="mb-0 text-center">The Journal</h1>
        </div>
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
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime} read
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      </div>
    </PageTransition>
  );
};

export default Journal;

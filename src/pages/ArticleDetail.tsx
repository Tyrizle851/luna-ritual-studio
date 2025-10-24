import { useParams, Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom max-w-3xl text-center">
          <h1 className="mb-4">Article Not Found</h1>
          <Button asChild variant="outline" className="border-clay text-clay">
            <Link to="/journal">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      <div className="aspect-[21/9] bg-secondary">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="container-custom max-w-3xl section-padding">
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link to="/journal">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journal
          </Link>
        </Button>

        <span className="inline-block text-sm font-medium text-clay mb-4">
          {article.category}
        </span>
        
        <h1 className="mb-6">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-text-muted mb-12 pb-8 border-b">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.readTime} read</span>
          <span>•</span>
          <time>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-text-secondary leading-relaxed">
          <p className="text-xl leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:text-clay first-letter:mr-1 first-letter:float-left">
            {article.excerpt}
          </p>
          
          <p>
            This article explores the profound impact of intentional living and how small, 
            daily practices can transform your relationship with yourself and the world around you.
          </p>

          <h2 className="font-display text-3xl text-text-primary mt-12 mb-4">
            The Foundation
          </h2>
          
          <p>
            Building a life of intention starts with awareness. It begins the moment you notice 
            how you feel, what you need, and what brings you peace. This is not about perfection 
            or having all the answers. It is about showing up for yourself, consistently and 
            with compassion.
          </p>

          <p>
            Consider your morning routine. Does it nourish you or deplete you? Do you reach for 
            your phone immediately, or do you give yourself space to simply be? These small 
            choices compound over time, shaping the quality of your days and, ultimately, your life.
          </p>

          <blockquote className="border-l-4 border-clay pl-6 italic text-xl my-8">
            "The quality of your life is determined by the quality of your daily rituals."
          </blockquote>

          <h2 className="font-display text-3xl text-text-primary mt-12 mb-4">
            Creating Your Practice
          </h2>
          
          <p>
            Your practice does not need to be elaborate. In fact, simplicity often serves us better. 
            Choose one or two rituals that resonate deeply and commit to them. Maybe it is five 
            minutes of morning pages, a walk without your phone, or an evening gratitude practice.
          </p>

          <p>
            The key is consistency over intensity. A simple practice done daily will transform your 
            life more than an elaborate routine you abandon after a week. Start small. Build slowly. 
            Trust the process.
          </p>

          <h2 className="font-display text-3xl text-text-primary mt-12 mb-4">
            When Resistance Appears
          </h2>
          
          <p>
            There will be days when you do not want to do the thing. When your practice feels like 
            another obligation. This is normal. Resistance is not a sign that something is wrong—it 
            is often a sign that you are growing.
          </p>

          <p>
            On these days, give yourself permission to modify. If you cannot journal for twenty 
            minutes, write three lines. If you cannot walk for thirty minutes, step outside for five. 
            The practice is not about doing it perfectly. It is about showing up, even imperfectly.
          </p>

          <h2 className="font-display text-3xl text-text-primary mt-12 mb-4">
            The Ripple Effect
          </h2>
          
          <p>
            As you build your practice, you will notice shifts. Not dramatic overnight transformations, 
            but subtle changes in how you respond to stress, how you speak to yourself, how you move 
            through your days. You will become more present. More grounded. More you.
          </p>

          <p>
            This inner work ripples outward. The calm you cultivate within yourself creates calm in 
            your relationships, your work, your home. You become a different energy in the world—one 
            of intention, presence, and peace.
          </p>

          <div className="bg-secondary p-8 rounded my-12">
            <h3 className="font-display text-2xl text-text-primary mb-4">Try This Week</h3>
            <ul className="space-y-3">
              <li>• Choose one morning ritual and practice it for seven days</li>
              <li>• Notice how you feel without judgment</li>
              <li>• Adjust as needed—make it work for your life</li>
              <li>• Celebrate small wins and be gentle with yourself</li>
            </ul>
          </div>

          <p>
            Remember: You are not building a perfect life. You are building a life that feels good to 
            live. A life that honors who you are and who you are becoming. That is intentional living. 
            That is the ritual.
          </p>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t">
          <h3 className="font-display text-2xl mb-8">Continue Reading</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {articles
              .filter(a => a.id !== article.id)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.id}
                  to={`/journal/${related.slug}`}
                  className="group"
                >
                  <div className="aspect-video bg-secondary rounded mb-3 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-display text-lg mb-2 group-hover:text-clay transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-sm text-text-muted">{related.readTime} read</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;

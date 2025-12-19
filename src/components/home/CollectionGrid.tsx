import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Flame, Heart, Shirt, Palette } from "lucide-react";

interface CollectionItem {
  label: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
  image: string;
}

const collections: CollectionItem[] = [
  { 
    label: "AFFIRMATIONS", 
    subtitle: "Digital Art", 
    href: "/shop?tab=affirmations",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop"
  },
  { 
    label: "JOURNALS", 
    subtitle: "Stories & Books", 
    href: "/shop?tab=books",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop"
  },
  { 
    label: "CANDLES", 
    subtitle: "Set the Mood", 
    href: "/shop?tab=candles",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1602607625929-59c67f44b45a?w=400&h=500&fit=crop"
  },
  { 
    label: "WELLNESS", 
    subtitle: "Supplements", 
    href: "/shop?tab=supplements",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=500&fit=crop"
  },
  { 
    label: "FASHION", 
    subtitle: "Curated Style", 
    href: "/shop?tab=fashion",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop"
  },
  { 
    label: "STUDIO", 
    subtitle: "Create Yours", 
    href: "/affirmation-builder",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=500&fit=crop"
  },
];

export const CollectionGrid = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-clay mb-4">Shop by Category</p>
          <h2 className="text-3xl lg:text-4xl font-display text-foreground">The Collections</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {collections.map((item, index) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Link 
                to={item.href} 
                className="group relative block aspect-[4/5] overflow-hidden bg-secondary"
              >
                <img 
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <item.icon className="h-5 w-5 text-background/80 mb-2" />
                    <h3 className="text-sm lg:text-base font-semibold tracking-[0.15em] text-background uppercase">
                      {item.label}
                    </h3>
                    <p className="text-xs text-background/70 mt-1">{item.subtitle}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

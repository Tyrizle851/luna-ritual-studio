import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CollectionItem {
  label: string;
  subtitle: string;
  href: string;
  color: string;
}

const collections: CollectionItem[] = [
  { label: "AFFIRMATIONS", subtitle: "Your Inner Voice Matters", href: "/shop?tab=affirmations", color: "text-amber-700" },
  { label: "JOURNALS", subtitle: "Stories to Inspire", href: "/shop?tab=books", color: "text-emerald-700" },
  { label: "CANDLES", subtitle: "Set the Mood", href: "/shop?tab=candles", color: "text-orange-700" },
  { label: "WELLNESS", subtitle: "Nourish Your Journey", href: "/shop?tab=supplements", color: "text-teal-700" },
  { label: "LIFESTYLE", subtitle: "Timeless Pieces", href: "/shop?tab=lifestyle", color: "text-rose-700" },
  { label: "STUDIO", subtitle: "Create Your Own", href: "/affirmation-builder", color: "text-violet-700" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const CollectionGrid = () => {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {collections.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <Link 
                to={item.href} 
                className="group flex flex-col items-center text-center py-8 lg:py-10 px-4 hover:bg-white/60 rounded-lg transition-all duration-300"
              >
                <h3 className={`text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2 ${item.color} group-hover:scale-105 transition-transform duration-300`}>
                  {item.label}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
                  {item.subtitle}
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

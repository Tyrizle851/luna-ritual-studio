import { Truck, ShieldCheck, BadgeCheck } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "FREE Shipping on US orders $35+, UK £55+, EU €55+. We ship worldwide*."
    },
    {
      icon: ShieldCheck,
      title: "100% Secure Checkout",
      description: "Shop with confidence that your purchase is safe and secure throughout the checkout process."
    },
    {
      icon: BadgeCheck,
      title: "Satisfaction Guarantee",
      description: "On our entire collection. Because we're confident you'll love your purchase."
    }
  ];

  return (
    <section className="py-12 lg:py-16 border-y border-border bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {badges.map((badge) => (
            <div key={badge.title} className="flex gap-4">
              <badge.icon className="h-6 w-6 text-foreground/60 flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

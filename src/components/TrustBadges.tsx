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
    <section className="py-12 sm:py-16 bg-secondary border-y border-border/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <badge.icon className="h-8 w-8 text-clay mb-4" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-text-secondary">
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

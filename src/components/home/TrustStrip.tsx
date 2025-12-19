import { Truck, ShieldCheck, Heart, RefreshCw } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    text: "Free shipping on orders $35+"
  },
  {
    icon: ShieldCheck,
    text: "Secure checkout"
  },
  {
    icon: RefreshCw,
    text: "Easy 30-day returns"
  },
  {
    icon: Heart,
    text: "50K+ happy customers"
  },
];

export const TrustStrip = () => {
  return (
    <section className="py-4 bg-clay/5 border-t border-border/20">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-text-secondary">
              <item.icon className="h-4 w-4 text-clay" strokeWidth={1.5} />
              <span className="text-xs tracking-wide">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import aff001 from "@/assets/review/aff-001.png";
import aff002 from "@/assets/review/aff-002.png";
import aff003 from "@/assets/review/aff-003.png";
import aff004 from "@/assets/review/aff-004.png";
import aff005 from "@/assets/review/aff-005.png";
import aff006 from "@/assets/review/aff-006.png";
import aff007 from "@/assets/review/aff-007.png";
import aff008 from "@/assets/review/aff-008.png";
import aff009 from "@/assets/review/aff-009.png";
import aff010 from "@/assets/review/aff-010.png";
import aff011 from "@/assets/review/aff-011.png";
import aff012 from "@/assets/review/aff-012.png";
import aff013 from "@/assets/review/aff-013.png";
import aff014 from "@/assets/review/aff-014.png";
import aff015 from "@/assets/review/aff-015.png";
import aff016 from "@/assets/review/aff-016.png";
import aff017 from "@/assets/review/aff-017.png";
import aff018 from "@/assets/review/aff-018.png";
import aff019 from "@/assets/review/aff-019.png";
import aff020 from "@/assets/review/aff-020.png";
import aff021 from "@/assets/review/aff-021.png";
import aff022 from "@/assets/review/aff-022.png";
import aff023 from "@/assets/review/aff-023.png";
import aff024 from "@/assets/review/aff-024.png";

const images = [
  { id: "aff-001", title: "I am worthy of rest", src: aff001 },
  { id: "aff-002", title: "I am worthy of peace", src: aff002 },
  { id: "aff-003", title: "Growth is a journey, not a destination", src: aff003 },
  { id: "aff-004", title: "I trust my journey", src: aff004 },
  { id: "aff-005", title: "I am always enough", src: aff005 },
  { id: "aff-006", title: "My calm is my power", src: aff006 },
  { id: "aff-007", title: "I receive what I desire", src: aff007 },
  { id: "aff-008", title: "Today, I honor myself", src: aff008 },
  { id: "aff-009", title: "I release what no longer serves", src: aff009 },
  { id: "aff-010", title: "Joy is my natural state", src: aff010 },
  { id: "aff-011", title: "I am safe in my body", src: aff011 },
  { id: "aff-012", title: "My voice matters", src: aff012 },
  { id: "aff-013", title: "I am worthy of my dreams", src: aff013 },
  { id: "aff-014", title: "I choose peace over perfection", src: aff014 },
  { id: "aff-015", title: "I celebrate my progress", src: aff015 },
  { id: "aff-016", title: "My intuition guides me", src: aff016 },
  { id: "aff-017", title: "I am open to miracles", src: aff017 },
  { id: "aff-018", title: "I give myself permission to feel", src: aff018 },
  { id: "aff-019", title: "I am creating the life I desire", src: aff019 },
  { id: "aff-020", title: "Today is full of possibility", src: aff020 },
  { id: "aff-021", title: "I am allowed to change my mind", src: aff021 },
  { id: "aff-022", title: "My rest is productive", src: aff022 },
  { id: "aff-023", title: "I attract what I embody", src: aff023 },
  { id: "aff-024", title: "I am both the storm and the calm", src: aff024 },
];

export default function AdminImageReview() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Affirmation Image Review - All 24</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div key={img.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-3 bg-gray-800 text-white">
              <span className="font-mono text-sm">{img.id}</span>
              <p className="text-xs mt-1 opacity-75">{img.title}</p>
            </div>
            <div className="aspect-[3/4] bg-gray-200">
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-2 text-center text-sm text-gray-600">
              #{idx + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Download } from 'lucide-react';
import { toast } from 'sonner';
import { LOCAL_DIGITAL_IMAGES } from '@/lib/localDigitalImages';

const morningRitualImg = LOCAL_DIGITAL_IMAGES["aff-014"];
const powerHourImg = LOCAL_DIGITAL_IMAGES["aff-015"];
const gratitudeGardenImg = LOCAL_DIGITAL_IMAGES["aff-002"];
const focusFlowImg = LOCAL_DIGITAL_IMAGES["aff-004"];

interface StaffPreset {
  name: string;
  description: string;
  theme: string;
  mood: string;
  layoutStyle: string;
  keywords: string;
  previewImage: string;
}

const staffPresets: StaffPreset[] = [
  {
    name: "Morning Ritual",
    description: "Peaceful sunrise",
    theme: "peace",
    mood: "coastal",
    layoutStyle: "circular-orbit",
    keywords: "light, fresh, calm",
    previewImage: morningRitualImg
  },
  {
    name: "Power Hour",
    description: "Bold confidence",
    theme: "confidence",
    mood: "monochrome",
    layoutStyle: "angular-grid",
    keywords: "strong, fearless",
    previewImage: powerHourImg
  },
  {
    name: "Gratitude Garden",
    description: "Warm botanicals",
    theme: "gratitude",
    mood: "bohemian",
    layoutStyle: "flowing-curves",
    keywords: "flowers, warmth, joy",
    previewImage: gratitudeGardenImg
  },
  {
    name: "Focus Flow",
    description: "Clear sharp vision",
    theme: "focus",
    mood: "minimalist",
    layoutStyle: "minimal-focus",
    keywords: "clarity, precision",
    previewImage: focusFlowImg
  }
];

/**
 * Quick Start Templates gallery
 * Displays 4 pre-designed affirmation templates with auto-download on click
 */
export function StaffPresetGallery() {
  const handleDownload = async (preset: StaffPreset) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(preset.previewImage);
      const blob = await response.blob();

      // Create object URL and download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${preset.name.toLowerCase().replace(/\s+/g, '-')}-affirmation.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up object URL
      URL.revokeObjectURL(url);

      toast.success(`Downloaded "${preset.name}"!`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download. Please try again.');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-muted/20 mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>Quick Start Templates</CardTitle>
        </div>
        <CardDescription>Beautiful designs to inspire your creation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {staffPresets.map((preset) => (
            <div
              key={preset.name}
              className="flex flex-col border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 group"
              onClick={() => handleDownload(preset)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={preset.previewImage}
                  alt={preset.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Download className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="p-2 bg-card">
                <p className="font-semibold text-xs leading-tight mb-0.5">{preset.name}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{preset.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

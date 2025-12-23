import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ImageGalleryGridProps {
  images: string[];
  type: 'preview' | 'final';
  onImageClick: (url: string, type: 'preview' | 'final') => void;
  showShopButton?: boolean;
  showHelpText?: boolean;
}

/**
 * Reusable image grid for displaying preview or final affirmation images
 * Shows 2-column grid with hover effects and type badges
 */
export function ImageGalleryGrid({
  images,
  type,
  onImageClick,
  showShopButton = false,
  showHelpText = false,
}: ImageGalleryGridProps) {
  if (images.length === 0) return null;

  const isFinal = type === 'final';

  return (
    <div className="space-y-4 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {isFinal ? 'Final Images (High Quality)' : 'Preview Images'}
        </h3>
        {isFinal ? (
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>1024x1024px</span>
            <span>•</span>
            <span>4:5 Ratio</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Medium Quality</span>
        )}
      </div>

      {/* Image Grid - single column for preview, 2 columns for final */}
      <div className={`grid ${isFinal ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              isFinal
                ? 'border-[#3a2817] hover:border-primary duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1'
                : 'border-[#3a2817] hover:border-[#5a3817] hover:scale-[1.02]'
            }`}
            onClick={() => onImageClick(imageUrl, type)}
            style={{ aspectRatio: isFinal ? '4/5' : '16/10' }}
          >
            <img
              src={imageUrl}
              alt={`${isFinal ? 'Final' : 'Preview'} Affirmation ${index + 1}`}
              className={`w-full h-full object-contain bg-muted/30 ${isFinal ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                View Full Size
              </span>
            </div>
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                isFinal ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {isFinal ? 'Final' : 'Preview'}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions/Text */}
      {showShopButton && isFinal && (
        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Shop Prints
          </Button>
        </div>
      )}

      {showHelpText && !isFinal && (
        <p className="text-sm text-muted-foreground text-center">
          Preview quality. Click "Generate Final Images" for high-quality versions.
        </p>
      )}
    </div>
  );
}

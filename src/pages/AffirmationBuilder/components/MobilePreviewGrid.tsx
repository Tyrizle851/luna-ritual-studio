import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface MobilePreviewGridProps {
  images: string[];
  selectedImages: number[];
  onImageClick: (url: string) => void;
  onToggleSelection: (index: number) => void;
  onCompare: () => void;
}

/**
 * Mobile-specific preview grid with selection checkboxes
 * Allows multi-select for comparison with visual feedback
 */
export function MobilePreviewGrid({
  images,
  selectedImages,
  onImageClick,
  onToggleSelection,
  onCompare,
}: MobilePreviewGridProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
              selectedImages.includes(index) ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-[#3a2817]'
            }`}
            style={{ aspectRatio: '3/4' }}
          >
            <img
              src={imageUrl}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
              onClick={() => onImageClick(imageUrl)}
            />
            <div className="absolute top-2 right-2 bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-semibold">
              Preview
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelection(index);
              }}
              className="absolute top-2 left-2 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
            >
              {selectedImages.includes(index) && <Check className="h-4 w-4" />}
            </button>
          </div>
        ))}
      </div>
      {selectedImages.length >= 2 && (
        <Button
          onClick={onCompare}
          variant="outline"
          className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Compare Selected ({selectedImages.length})
        </Button>
      )}
      <p className="text-sm text-muted-foreground text-center">
        {selectedImages.length > 0
          ? `Select 2 or more to compare • ${selectedImages.length} selected`
          : "Click checkboxes to select favorites for comparison"}
      </p>
    </div>
  );
}

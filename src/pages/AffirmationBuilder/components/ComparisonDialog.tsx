import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ComparisonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImageIndices: number[];
  previewImages: string[];
  onClearSelection: () => void;
  onViewFullSize: (imageUrl: string) => void;
}

export function ComparisonDialog({
  open,
  onOpenChange,
  selectedImageIndices,
  previewImages,
  onClearSelection,
  onViewFullSize,
}: ComparisonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Your Favorites</DialogTitle>
          <DialogDescription>
            View your selected previews side-by-side to pick the perfect one
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {selectedImageIndices.map((imageIndex) => (
            <div key={imageIndex} className="space-y-2">
              <div className="relative rounded-lg overflow-hidden border-2 border-primary" style={{ aspectRatio: '4/5' }}>
                <img
                  src={previewImages[imageIndex]}
                  alt={`Preview ${imageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded font-semibold text-sm">
                  Option {imageIndex + 1}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onViewFullSize(previewImages[imageIndex]);
                  onOpenChange(false);
                }}
                className="w-full"
              >
                View Full Size
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              onClearSelection();
              onOpenChange(false);
            }}
            className="flex-1"
          >
            Clear Selection
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

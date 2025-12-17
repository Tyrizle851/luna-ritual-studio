import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { downloadImage } from '../utils/imageProcessing';

interface ExpandedImageModalProps {
  expandedImage: { url: string; type: 'preview' | 'final' } | null;
  onClose: () => void;
}

/**
 * Full-size image modal with download options
 * Shows preview or final image with format-specific download menu
 */
export function ExpandedImageModal({ expandedImage, onClose }: ExpandedImageModalProps) {
  return (
    <Dialog open={expandedImage !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {expandedImage?.type === 'final' ? 'High Quality Final' : 'Preview'} Image
          </DialogTitle>
          <DialogDescription>
            {expandedImage?.type === 'final'
              ? '1024x1024px • High Quality PNG • Perfect for printing'
              : 'Medium quality preview • Generate final for print-ready version'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden">
            <img src={expandedImage?.url || ''} alt="Expanded Affirmation" className="w-full h-auto" />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => expandedImage && downloadImage(expandedImage.url, 'original', expandedImage.type)}
                >
                  Original Size
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => expandedImage && downloadImage(expandedImage.url, 'instagram-square', expandedImage.type)}
                >
                  Instagram Square (1080x1080)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => expandedImage && downloadImage(expandedImage.url, 'instagram-story', expandedImage.type)}
                >
                  Instagram Story (1080x1920)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => expandedImage && downloadImage(expandedImage.url, 'print-8x10', expandedImage.type)}
                >
                  Print 8x10
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => expandedImage && downloadImage(expandedImage.url, 'print-11x14', expandedImage.type)}
                >
                  Print 11x14
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {expandedImage?.type === 'final' && (
              <Button variant="outline" className="flex-1">
                Shop Prints
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { downloadImage } from '../utils/imageProcessing';

interface MobileSingleImageDisplayProps {
  imageUrl: string;
}

/**
 * Mobile-specific single image display with download options and shop button
 * Shows high-quality final image with resolution info and actions
 */
export function MobileSingleImageDisplay({ imageUrl }: MobileSingleImageDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border">
        <img
          src={imageUrl}
          alt="Generated Affirmation"
          className="w-full h-auto"
        />
      </div>

      {/* Image Info */}
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Resolution</p>
            <p className="text-foreground text-sm font-medium">1024 x 1024px</p>
          </div>
          <div>
            <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Aspect Ratio</p>
            <p className="text-foreground text-sm font-medium">1:1 (Square)</p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Format</p>
          <p className="text-foreground text-sm font-medium">High Quality PNG</p>
        </div>
      </div>

      {/* Download & Shop Actions */}
      <div className="grid grid-cols-2 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => downloadImage(imageUrl, 'original', 'final')}>
              Original Size
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadImage(imageUrl, 'instagram-square', 'final')}>
              Instagram Square (1080x1080)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadImage(imageUrl, 'instagram-story', 'final')}>
              Instagram Story (1080x1920)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadImage(imageUrl, 'print-8x10', 'final')}>
              Print 8x10
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadImage(imageUrl, 'print-11x14', 'final')}>
              Print 11x14
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            window.open('/shop', '_blank');
            toast.success('Opening shop...');
          }}
        >
          <span className="mr-2">🛒</span>
          Shop Prints
        </Button>
      </div>
    </div>
  );
}

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Heart, Edit2, Share2, Check, X } from 'lucide-react';

interface PreviewCardHeaderProps {
  isEditing: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onStartEditing: () => void;
  onSaveEdits: () => void;
  onCancelEdits: () => void;
  onShareToSocial: (platform: string) => void;
}

/**
 * Preview card header with action buttons
 * Shows favorite, edit, share buttons when not editing
 * Shows save/cancel buttons when editing
 */
export function PreviewCardHeader({
  isEditing,
  isFavorite,
  onToggleFavorite,
  onStartEditing,
  onSaveEdits,
  onCancelEdits,
  onShareToSocial,
}: PreviewCardHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <div>
        <CardTitle>Preview</CardTitle>
        <CardDescription>Generated affirmation design</CardDescription>
      </div>
      <div className="flex gap-2">
        {!isEditing && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleFavorite}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onStartEditing}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onShareToSocial('twitter')}>
                  Share to X/Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShareToSocial('facebook')}>
                  Share to Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShareToSocial('pinterest')}>
                  Pin to Pinterest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShareToSocial('copy')}>
                  Copy Caption
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {isEditing && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={onSaveEdits}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onCancelEdits}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </CardHeader>
  );
}

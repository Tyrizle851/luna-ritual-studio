import { toast } from 'sonner';

/**
 * Supported image download formats with their dimensions
 */
export type ImageFormat =
  | 'original'
  | 'instagram-square'
  | 'instagram-story'
  | 'print-8x10'
  | 'print-11x14';

/**
 * Format configurations for image downloads
 */
export const IMAGE_FORMAT_CONFIG: Record<
  ImageFormat,
  { width?: number; height?: number; label: string }
> = {
  original: { label: 'Original Size' },
  'instagram-square': { width: 1080, height: 1080, label: 'Instagram Square' },
  'instagram-story': { width: 1080, height: 1920, label: 'Instagram Story' },
  'print-8x10': { width: 2400, height: 3000, label: 'Print 8×10"' },
  'print-11x14': { width: 3300, height: 4200, label: 'Print 11×14"' },
};

/**
 * Downloads an image from a base64 data URL
 * @param imageB64 - Base64 image data URL (with or without prefix)
 * @param format - Download format (determines filename and optional resizing)
 * @param type - Image type ('preview' or 'final')
 */
export async function downloadImage(
  imageB64: string,
  format: ImageFormat = 'original',
  type: 'preview' | 'final' = 'preview'
): Promise<void> {
  try {
    const config = IMAGE_FORMAT_CONFIG[format];

    // Create download link
    const link = document.createElement('a');
    link.href = imageB64;
    link.download = `affirmation-${type}-${config.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}.png`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Downloaded ${type} ${config.label} format!`);
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to download image. Please try again.');
  }
}

/**
 * Downloads an image from a URL (for staff presets)
 * @param imageUrl - URL of the image to download
 * @param filename - Custom filename for the download
 */
export async function downloadImageFromUrl(
  imageUrl: string,
  filename: string
): Promise<void> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success(`Downloaded "${filename}"!`);
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to download. Please try again.');
  }
}

/**
 * Converts a base64 string to a Blob
 * @param base64 - Base64 string (with or without data URI prefix)
 * @param contentType - MIME type of the image
 * @returns Blob object
 */
export function base64ToBlob(base64: string, contentType = 'image/png'): Blob {
  // Remove data URI prefix if present
  const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

  const byteCharacters = atob(base64Data);
  const byteArrays: BlobPart[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray as BlobPart);
  }

  return new Blob(byteArrays, { type: contentType });
}

/**
 * Validates if a string is a valid base64 image data URL
 * @param str - String to validate
 * @returns True if valid base64 image data URL
 */
export function isValidBase64Image(str: string): boolean {
  if (!str) return false;

  // Check if it has data URI prefix
  if (str.startsWith('data:image/')) {
    const parts = str.split(',');
    if (parts.length !== 2) return false;
    return parts[0].includes('base64');
  }

  // Check if it's raw base64
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

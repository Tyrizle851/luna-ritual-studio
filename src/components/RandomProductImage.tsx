import { useRandomProductImageWithRefresh } from "@/hooks/useRandomProductImage";
import { Skeleton } from "@/components/ui/skeleton";

interface RandomProductImageProps {
  productId: string;
  productCategory: "fashion" | "candles" | "supplements" | "books" | "affirmations";
  fallbackImage: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const RandomProductImage = ({
  productId,
  productCategory,
  fallbackImage,
  alt,
  className = "",
  onClick
}: RandomProductImageProps) => {
  const { imageUrl, isLoading, refreshImage, hasMultipleImages } = useRandomProductImageWithRefresh(
    productId,
    productCategory,
    fallbackImage
  );

  const handleClick = () => {
    if (hasMultipleImages) {
      refreshImage();
    }
    onClick?.();
  };

  if (isLoading) {
    return <Skeleton className={`w-full h-full ${className}`} />;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onClick={handleClick}
    />
  );
};
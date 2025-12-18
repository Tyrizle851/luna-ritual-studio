/**
 * Premium shimmer loading state for image generation
 * Inspired by Instagram/Threads loading animations
 * Shows during preview and final image generation
 */
export function ShimmerLoading({
  message = 'Creating your affirmation...',
  progress = 0,
}: {
  message?: string;
  progress?: number;
}) {
  return (
    <div className="space-y-4 mb-8">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{message}</h3>
        {progress > 0 && (
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        )}
      </div>

      {/* Shimmer Container */}
      <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-[#f5f1ed] via-[#e8dfd5] to-[#d4c5b5] border-2 border-[#3a2817]/20">
        {/* Animated Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Content Skeleton */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
          {/* Main headline placeholder */}
          <div className="w-3/4 space-y-3">
            <div className="h-8 bg-white/30 rounded-md animate-pulse" />
            <div className="h-8 bg-white/25 rounded-md animate-pulse delay-75" />
          </div>

          {/* Supporting lines placeholders */}
          <div className="w-2/3 space-y-2 mt-8">
            <div className="h-4 bg-white/20 rounded-md animate-pulse delay-150" />
            <div className="h-4 bg-white/20 rounded-md animate-pulse delay-200" />
            <div className="h-4 bg-white/20 rounded-md animate-pulse delay-300" />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-200" />
        </div>

        {/* Progress bar overlay (only show if progress > 0) */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-primary/60 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Status message */}
      {message && (
        <p className="text-sm text-muted-foreground text-center animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

/**
 * Grid shimmer for multiple images loading (4 previews)
 */
export function ShimmerGrid({
  count = 4,
  message = 'Creating variations...',
}: {
  count?: number;
  message?: string;
}) {
  return (
    <div className="space-y-4 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{message}</h3>
        <span className="text-xs text-muted-foreground">Please wait...</span>
      </div>

      {/* Grid of shimmer placeholders */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-[#f5f1ed] via-[#e8dfd5] to-[#d4c5b5] border-2 border-[#3a2817]/20"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            {/* Animated Shimmer Effect */}
            <div
              className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            />

            {/* Simple content skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white/60 rounded-full animate-spin" />
            </div>
          </div>
        ))}
      </div>

      {/* Status message */}
      <p className="text-sm text-muted-foreground text-center animate-pulse">
        {message}
      </p>
    </div>
  );
}

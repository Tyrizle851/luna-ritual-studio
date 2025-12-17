interface WorkflowProgressProps {
  hasPreviewImages: boolean;
  hasFinalImages: boolean;
}

/**
 * Visual workflow step indicator showing progress through the affirmation creation flow
 * Steps: 1. Choose → 2. Preview → 3. Create
 */
export function WorkflowProgress({ hasPreviewImages, hasFinalImages }: WorkflowProgressProps) {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 mb-8 max-w-2xl mx-auto">
      {/* Step 1: Choose */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            !hasPreviewImages
              ? 'bg-primary border-primary text-primary-foreground'
              : 'bg-primary/10 border-primary text-primary'
          }`}
        >
          <span className="text-sm font-semibold">1</span>
        </div>
        <span
          className={`hidden sm:inline text-sm font-medium ${
            !hasPreviewImages ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          Choose
        </span>
      </div>

      {/* Progress bar 1→2 */}
      <div className="flex-1 h-0.5 bg-muted max-w-[80px] md:max-w-[120px]">
        <div
          className={`h-full transition-all duration-500 ${
            hasPreviewImages ? 'bg-primary w-full' : 'bg-primary/30 w-0'
          }`}
        />
      </div>

      {/* Step 2: Preview */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            hasPreviewImages && !hasFinalImages
              ? 'bg-primary border-primary text-primary-foreground'
              : hasPreviewImages
              ? 'bg-primary/10 border-primary text-primary'
              : 'bg-muted border-muted-foreground/20 text-muted-foreground'
          }`}
        >
          <span className="text-sm font-semibold">2</span>
        </div>
        <span
          className={`hidden sm:inline text-sm font-medium ${
            hasPreviewImages && !hasFinalImages ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          Preview
        </span>
      </div>

      {/* Progress bar 2→3 */}
      <div className="flex-1 h-0.5 bg-muted max-w-[80px] md:max-w-[120px]">
        <div
          className={`h-full transition-all duration-500 ${
            hasFinalImages ? 'bg-primary w-full' : 'bg-primary/30 w-0'
          }`}
        />
      </div>

      {/* Step 3: Create */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            hasFinalImages
              ? 'bg-primary border-primary text-primary-foreground'
              : 'bg-muted border-muted-foreground/20 text-muted-foreground'
          }`}
        >
          <span className="text-sm font-semibold">3</span>
        </div>
        <span
          className={`hidden sm:inline text-sm font-medium ${
            hasFinalImages ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          Create
        </span>
      </div>
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface LoadingStateProps {
  isLoading: boolean;
  progress: number;
  message: string;
}

/**
 * Beautiful loading overlay with circular progress indicator
 * Shows progress percentage, contextual message, and animated sparkles
 */
export function LoadingState({ isLoading, progress, message }: LoadingStateProps) {
  if (!isLoading || !message) return null;

  return (
    <Card className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md shadow-2xl border-2 border-primary/20 animate-in fade-in-0 zoom-in-95">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Progress Circle */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                  className="text-primary transition-all duration-500 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Loading Message */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">This won't take long...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Animated Sparkles */}
          <div className="flex justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '0ms' }} />
            <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '200ms' }} />
            <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

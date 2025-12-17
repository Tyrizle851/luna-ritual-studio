import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
}

interface StaticPreviewDisplayProps {
  generatedData: GeneratedData;
  theme: string;
  mood: string;
  layoutStyle: string;
  isEditing: boolean;
  editedHeadline: string;
  editedLines: string[];
  onHeadlineChange: (value: string) => void;
  onLineChange: (index: number, value: string) => void;
  loading: boolean;
  onGenerate: () => void;
  isMobile?: boolean; // Controls sizing and line count
}

/**
 * Static preview display with editable headline/lines
 * Shows decorative affirmation preview when no images are generated
 * Responsive design for mobile and desktop
 */
export function StaticPreviewDisplay({
  generatedData,
  theme,
  mood,
  layoutStyle,
  isEditing,
  editedHeadline,
  editedLines,
  onHeadlineChange,
  onLineChange,
  loading,
  onGenerate,
  isMobile = false,
}: StaticPreviewDisplayProps) {
  const lineCount = isMobile ? 4 : 6;
  const headlineSize = isMobile ? 'text-2xl md:text-5xl' : 'text-4xl md:text-5xl';
  const lineSize = isMobile ? 'text-sm md:text-lg' : 'text-base md:text-lg';
  const minHeight = isMobile ? 'min-h-[400px]' : 'min-h-[600px]';
  const padding = isMobile ? 'p-6' : 'p-12';

  return (
    <div className="space-y-4">
      <div className={`bg-gradient-to-br from-background to-muted/20 ${padding} rounded-lg border-2 border-muted ${minHeight} flex flex-col justify-between relative overflow-hidden`}>
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-muted-foreground/30"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-muted-foreground/30"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-muted-foreground/30"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-muted-foreground/30"></div>

        {/* Additional decorative elements */}
        <div className="absolute top-1/4 left-8 w-8 h-8 rounded-full border border-muted-foreground/20"></div>
        <div className="absolute bottom-1/4 right-8 w-6 h-6 rounded-full border border-muted-foreground/20"></div>
        <div className="absolute top-1/3 right-12 w-1 h-16 bg-gradient-to-b from-muted-foreground/20 to-transparent"></div>
        <div className="absolute bottom-1/3 left-12 w-1 h-16 bg-gradient-to-t from-muted-foreground/20 to-transparent"></div>

        {/* Top section */}
        <div className="relative z-10">
          <div className="flex justify-center mb-3">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"></div>
          </div>
          {isEditing ? (
            <Input
              value={editedHeadline}
              onChange={(e) => onHeadlineChange(e.target.value.toUpperCase())}
              className={`font-display ${headlineSize} text-center ${isMobile ? 'mb-2' : 'mb-3'} tracking-wider uppercase bg-transparent border-2 border-dashed`}
              style={{ color: generatedData.palette[1] || '#c9a961' }}
            />
          ) : (
            <h3 className={`font-display ${headlineSize} text-center ${isMobile ? 'mb-2' : 'mb-3'} tracking-wider uppercase`} style={{ color: generatedData.palette[1] || '#c9a961' }}>
              {generatedData.headline}
            </h3>
          )}
          <div className="flex justify-center mb-4">
            <div className={isMobile ? 'w-24 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent' : 'w-32 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent'}></div>
          </div>
        </div>

        {/* Middle section with supporting lines */}
        <div className={`relative z-10 space-y-${isMobile ? '3' : '5'} ${isMobile ? 'mb-4' : 'mb-8'}`}>
          {(isEditing ? editedLines : generatedData.supportingLines).slice(0, lineCount).map((line, i) => (
            <div key={i} className={`flex items-center justify-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
              {i % 2 === 0 && <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full`} style={{ backgroundColor: generatedData.palette[0] || '#8b8b8b' }}></div>}
              {isEditing ? (
                <Input
                  value={line}
                  onChange={(e) => onLineChange(i, e.target.value)}
                  className={`text-center leading-relaxed ${lineSize} bg-transparent border border-dashed`}
                  style={{
                    color: generatedData.palette[i % generatedData.palette.length] || '#2c2c2c',
                    fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                    fontWeight: i % 2 === 0 ? '600' : '400'
                  }}
                />
              ) : (
                <p
                  className={`text-center leading-relaxed ${lineSize}`}
                  style={{
                    color: generatedData.palette[i % generatedData.palette.length] || '#2c2c2c',
                    fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                    fontWeight: i % 2 === 0 ? '600' : '400'
                  }}
                >
                  {line}
                </p>
              )}
              {i % 2 === 1 && <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full`} style={{ backgroundColor: generatedData.palette[1] || '#c9a961' }}></div>}
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="relative z-10">
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-muted-foreground/30"></div>
            <div className="w-3 h-3 rotate-45 border border-muted-foreground/30"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-muted-foreground/30"></div>
          </div>
        </div>
      </div>

      {/* Metadata Section */}
      <div className={isMobile ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div className={`${isMobile ? 'bg-muted/30 p-3 rounded-lg' : 'space-y-3 bg-muted/30 p-4 rounded-lg'}`}>
          {isMobile ? (
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="font-semibold mb-1 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Theme</p>
                <p className="text-foreground text-xs font-medium capitalize">{theme}</p>
              </div>
              <div>
                <p className="font-semibold mb-1 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Mood</p>
                <p className="text-foreground text-xs font-medium capitalize">{mood}</p>
              </div>
              <div>
                <p className="font-semibold mb-1 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Layout</p>
                <p className="text-foreground text-xs font-medium capitalize">{layoutStyle || 'Auto'}</p>
              </div>
            </div>
          ) : (
            <>
              <div>
                <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Theme</p>
                <p className="text-foreground text-sm font-medium capitalize">{theme}</p>
              </div>
              <div>
                <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Mood</p>
                <p className="text-foreground text-sm font-medium capitalize">{mood}</p>
              </div>
              <div>
                <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Layout</p>
                <p className="text-foreground text-sm font-medium capitalize">{layoutStyle || 'Auto'}</p>
              </div>
            </>
          )}
        </div>

        <div className={`${isMobile ? 'bg-muted/30 p-3 rounded-lg' : 'space-y-3 bg-muted/30 p-4 rounded-lg'}`}>
          <div className={isMobile ? 'mb-2' : ''}>
            <p className={`font-semibold ${isMobile ? 'mb-1.5 text-xs' : 'mb-2 text-sm'} uppercase tracking-wide`} style={{ color: generatedData.palette[1] || '#c9a961' }}>Palette</p>
            <div className={`flex ${isMobile ? 'gap-1.5' : 'gap-2'} flex-wrap`}>
              {generatedData.palette.map((color, i) => (
                <div key={i} className={`flex items-center ${isMobile ? 'gap-1.5' : 'gap-2'}`}>
                  <div className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded border border-muted`} style={{ backgroundColor: color }}></div>
                  <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>{color}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={`font-semibold ${isMobile ? 'mb-1 text-xs' : 'mb-2 text-sm'} uppercase tracking-wide`} style={{ color: generatedData.palette[1] || '#c9a961' }}>Accents</p>
            <p className={`text-muted-foreground ${isMobile ? 'text-[10px]' : 'text-xs'} leading-relaxed`}>{generatedData.accentElements}</p>
          </div>
        </div>
      </div>

      {/* Generate Button (Mobile Only) */}
      {isMobile && (
        <Button
          onClick={onGenerate}
          className="w-full h-11 bg-primary hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Generate Unique Image
        </Button>
      )}
    </div>
  );
}

import type { LayoutArchetype } from '@/types/design-spec';

/**
 * Maps legacy layout style names to new layout archetypes
 * Supports backward compatibility for old layout names
 */
export const LAYOUT_ARCHETYPE_MAP: Record<string, LayoutArchetype> = {
  // Legacy names mapped to new equivalents
  'vintage': 'arc-flow',
  'clean-serif': 'floating-cluster',
  'botanical': 'botanical-frame',
  'grid': 'editorial-grid-luxe',
  'halo': 'circle-harmony',
  'organic': 'arc-flow',
  'geometric': 'editorial-grid-luxe',
  'celestial': 'radiant-center-burst',
  'minimal-zen': 'floating-cluster',
  'grit': 'asymmetric-balance',
  'scattered-organic': 'pebble-scatter',
  'flowing-curves': 'arc-flow',
  'angular-grid': 'editorial-grid-luxe',
  'circular-orbit': 'circle-harmony',
  'diagonal-dynamic': 'asymmetric-balance',
  'layered-depth': 'floating-cluster',
  'vertical-cascade': 'vertical-flow',
  'horizontal-sweep': 'soft-anchor-left',
  'corner-radial': 'radiant-center-burst',
  'spiral-flow': 'golden-spiral',
  'stepped-rhythm': 'gentle-column',
  'arch-composition': 'arc-flow',
  'split-panel': 'soft-anchor-left',
  'wave-pattern': 'ribbon-drift',
  'botanical-branch': 'botanical-frame',
  'minimal-focus': 'minimal-horizon',
  'centered-stack': 'centered-serenity',

  // New layout archetypes (passthrough)
  'centered-serenity': 'centered-serenity',
  'vertical-flow': 'vertical-flow',
  'floating-cluster': 'floating-cluster',
  'asymmetric-balance': 'asymmetric-balance',
  'arc-flow': 'arc-flow',
  'golden-spiral': 'golden-spiral',
  'botanical-frame': 'botanical-frame',
  'minimal-horizon': 'minimal-horizon',
  'radiant-center-burst': 'radiant-center-burst',
  'soft-anchor-left': 'soft-anchor-left',
  'soft-anchor-right': 'soft-anchor-right',
  'gentle-column': 'gentle-column',
  'pebble-scatter': 'pebble-scatter',
  'circle-harmony': 'circle-harmony',
  'prayer-stack': 'prayer-stack',
  'ribbon-drift': 'ribbon-drift',
  'editorial-grid-luxe': 'editorial-grid-luxe',
  'calm-waterfall': 'calm-waterfall',
  'sacred-geometry': 'sacred-geometry',
  'breath-space-minimal': 'breath-space-minimal',
};

/**
 * Converts a layout style string to its corresponding layout archetype
 * @param layoutStyle - The layout style string (case-insensitive)
 * @param fallback - Default archetype if no match found
 * @returns The mapped LayoutArchetype
 */
export function getLayoutArchetype(
  layoutStyle: string | undefined,
  fallback: LayoutArchetype = 'asymmetric-balance'
): LayoutArchetype {
  if (!layoutStyle) return fallback;

  const normalized = layoutStyle.toLowerCase();
  return LAYOUT_ARCHETYPE_MAP[normalized] || LAYOUT_ARCHETYPE_MAP[layoutStyle] || fallback;
}

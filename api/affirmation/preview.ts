import type { VercelRequest, VercelResponse } from "@vercel/node";
import { mapTheme, mapMood, normalizeText, makePreviewSpec, buildBasePrompt, moderateText } from "./_shared";

const previews = new Map<string, any>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { theme, mood, text, styleSeed } = (req.body || {}) as any;
    const mappedTheme = mapTheme(theme);
    const mappedMood = mapMood(mood);
    const normalizedText = normalizeText(text);

    const moderation = await moderateText(normalizedText);
    if (!moderation.allowed) return res.status(400).json({ error: "Input not allowed by policy.", code: "moderation_blocked" });

    const previewId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const designSpec = makePreviewSpec(mappedTheme, mappedMood, normalizedText);
    const prompt = buildBasePrompt(mappedTheme, mappedMood, normalizedText);
    previews.set(previewId, { theme: mappedTheme, mood: mappedMood, text: normalizedText, styleSeed: styleSeed || null, prompt, designSpec });

    return res.status(200).json({ previewId, themeMapped: mappedTheme, moodMapped: mappedMood, designSpec });
  } catch (e) {
    return res.status(500).json({ error: "Preview failed" });
  }
}



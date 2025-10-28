import type { VercelRequest, VercelResponse } from "@vercel/node";
import { mapTheme, mapMood, normalizeText, buildBasePrompt, moderateText } from "./_shared";

const previews = new Map<string, any>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

    const { previewId, theme, mood, text, styleSeed } = (req.body || {}) as any;
    let mappedTheme: string, mappedMood: string, normalizedText: string, prompt: string;

    if (previewId && previews.has(previewId)) {
      const p = previews.get(previewId);
      mappedTheme = p.theme; mappedMood = p.mood; normalizedText = p.text; prompt = p.prompt;
    } else {
      mappedTheme = mapTheme(theme);
      mappedMood = mapMood(mood);
      normalizedText = normalizeText(text);
      const moderation = await moderateText(normalizedText);
      if (!moderation.allowed) return res.status(400).json({ error: "Input not allowed by policy.", code: "moderation_blocked" });
      prompt = buildBasePrompt(mappedTheme, mappedMood, normalizedText);
    }

    const hardened = `${prompt}\n\nConstraints: Hand-drawn organic aesthetics, brand palettes only, print-safe, high legibility, no neon, no gore/sexual content.`;

    const body = { model: "gpt-image-1", prompt: hardened, size: "1024x1024" };
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) return res.status(502).json({ error: "Image provider error", detail: await r.text() });
    const data = await r.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return res.status(502).json({ error: "No image returned" });

    const generationId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return res.status(200).json({ generationId, imageB64: b64 });
  } catch (e) {
    return res.status(500).json({ error: "Generation failed" });
  }
}



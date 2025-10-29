import { mapTheme, mapMood, normalizeText, makePreviewSpec, buildBasePrompt, moderateText } from "../_shared";

const previews = new Map<string, any>();

export default async function handler(req: any, res: any) {
  // CORS headers (allow Lovable domain or * for testing)
  const allowOrigin = process.env.CORS_ALLOW_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    // Parse request body manually for Vercel serverless runtime
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const parsedBody = body ? JSON.parse(body) : {};
    const { theme, mood, text, styleSeed } = parsedBody;
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
    console.error("Preview handler error:", e);
    return res.status(500).json({ error: "Preview failed", detail: e instanceof Error ? e.message : String(e) });
  }
}



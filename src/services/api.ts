import Anthropic from "@anthropic-ai/sdk";
import type { CarDetails, GenerationResult, Lang } from "../lib/types";
import { LANGS } from "../lib/types";
import { PLATFORMS } from "../lib/platforms";
import { buildSystemPrompt, buildUserPrompt } from "../lib/prompt";

const MODEL = import.meta.env.VITE_ANTHROPIC_MODEL || "claude-sonnet-4-6";
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
const BASE_URL = import.meta.env.VITE_ANTHROPIC_BASE_URL;

// Pull the JSON object out of the model's text, tolerating stray wrapping.
function extractJson(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model response");
  }
  return JSON.parse(text.slice(start, end + 1));
}

// Coerce whatever the model returned into a complete, typed result
function normalize(raw: unknown): GenerationResult {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  const out: GenerationResult = {};
  for (const p of PLATFORMS) {
    const pRaw = (obj[p.id] && typeof obj[p.id] === "object"
      ? obj[p.id]
      : {}) as Record<string, unknown>;
    out[p.id] = {} as GenerationResult[string];
    for (const lang of LANGS as Lang[]) {
      const lRaw = (pRaw[lang] && typeof pRaw[lang] === "object"
        ? pRaw[lang]
        : {}) as Record<string, unknown>;
      out[p.id][lang] = {
        title: typeof lRaw.title === "string" ? lRaw.title : "",
        body: typeof lRaw.body === "string" ? lRaw.body : "",
      };
    }
  }
  return out;
}

export async function generateListings(
  car: CarDetails
): Promise<GenerationResult> {
  if (!API_KEY) {
    throw new Error("VITE_ANTHROPIC_API_KEY is not configured");
  }

  try {
    let msg;

    if (BASE_URL) {
      // Custom base URL - use fetch with proper headers
      console.log("[generate] Using custom base URL:", BASE_URL);

      const response = await fetch(`${BASE_URL}/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 8000,
          system: buildSystemPrompt(),
          messages: [
            { role: "user", content: buildUserPrompt(car, PLATFORMS) },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[generate] API error response:", errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      msg = await response.json();
    } else {
      // Standard Anthropic API
      const client = new Anthropic({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true // Enable client-side usage
      });

      msg = await client.messages.create({
        model: MODEL,
        max_tokens: 8000,
        system: buildSystemPrompt(),
        messages: [
          { role: "user", content: buildUserPrompt(car, PLATFORMS) },
        ],
      });
    }

    const text = msg.content
      .filter((b: Anthropic.ContentBlock): b is Anthropic.TextBlock => b.type === "text")
      .map((b: Anthropic.TextBlock) => b.text)
      .join("");

    const result = normalize(extractJson(text));
    return result;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown generation error";
    console.error("[generate] failed:", message);
    throw new Error("Failed to generate listings", { cause: err });
  }
}

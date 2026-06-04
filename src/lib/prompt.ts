// Builds the prompt sent to Claude. Pure functions, no secrets here.

import type { CarDetails, Lang } from "./types";
import type { Platform } from "./platforms";
import { LANGS } from "./types";

const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  zh: "Simplified Chinese (简体中文)",
  fr: "French (français)",
};

// Human-readable summary of the car, language-neutral (labels in English;
// the model localizes them in output). Only includes provided fields.
export function carFactSheet(car: CarDetails): string {
  const lines: string[] = [];
  const add = (label: string, value: string) => {
    if (value && value.trim()) lines.push(`- ${label}: ${value.trim()}`);
  };
  add("Make", car.make);
  add("Model", car.model);
  add("Year", car.year);
  add("Price", car.price ? `${car.price} ${car.currency}` : "");
  add("Mileage", car.mileage ? `${car.mileage} ${car.mileageUnit}` : "");
  add("Transmission", car.transmission);
  add("Fuel", car.fuel);
  add("Color", car.color);
  add("Condition", car.condition);
  add("VIN", car.vin);
  add("Location", car.location);
  add("Seller name", car.sellerName);
  add("Contact", car.contact);
  if (car.images && car.images.length > 0) {
    add("Photos available", `${car.images.length} photo${car.images.length > 1 ? 's' : ''}`);
  }
  add("Additional notes", car.notes);
  return lines.join("\n");
}

export function buildSystemPrompt(): string {
  return [
    "You are an expert automotive copywriter who writes private-seller car listings.",
    "You write accurate, honest, persuasive listings that never invent facts.",
    "If a detail was not provided, you simply omit it — you never fabricate mileage, history, or features.",
    "You localize naturally into the requested language (idiomatic, not literal translation), including how price, mileage, and dates are conventionally written.",
    "You always reply with a single valid JSON object and nothing else — no markdown fences, no commentary.",
  ].join(" ");
}

// One prompt covers every platform and language in a single call, so the user
// pays one round trip. The model returns a nested JSON object.
export function buildUserPrompt(
  car: CarDetails,
  platforms: Platform[]
): string {
  const facts = carFactSheet(car);

  const platformSpec = platforms
    .map((p) => {
      const cap = p.maxBodyChars
        ? ` Keep the body under ${p.maxBodyChars} characters.`
        : "";
      return `- "${p.id}" (${p.name}): ${p.styleHint}${cap}`;
    })
    .join("\n");

  const langSpec = LANGS.map((l) => `"${l}" = ${LANG_NAMES[l]}`).join(", ");

  return [
    "Write car-for-sale listings based only on these facts:",
    "",
    facts,
    "",
    "Produce a tailored listing for EACH platform below, in EACH language.",
    "",
    "Platforms and their style:",
    platformSpec,
    "",
    `Languages: ${langSpec}.`,
    "",
    "For every (platform, language) pair produce:",
    '  - "title": a punchy listing headline (max ~70 characters).',
    '  - "body": the full listing description in that language, fitting the platform style.',
    "",
    "Rules:",
    "- Use only the facts above. Do not invent anything.",
    "- Localize fully and idiomatically for each language.",
    "- Include the contact and location naturally if provided.",
    "- Plain text for the body (no markdown), unless the platform style allows emojis.",
    "",
    "Respond with ONLY this JSON shape:",
    "{",
    '  "<platformId>": {',
    '    "en": { "title": "...", "body": "..." },',
    '    "zh": { "title": "...", "body": "..." },',
    '    "fr": { "title": "...", "body": "..." }',
    "  }",
    "}",
    `Platform ids to include: ${platforms.map((p) => `"${p.id}"`).join(", ")}.`,
  ].join("\n");
}

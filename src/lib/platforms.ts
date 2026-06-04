// Marketplace metadata. North-America focused per project scope.

import type { Lang } from "./types";

export interface Platform {
  id: string;
  name: string;
  region: string;
  postUrl: string;
  color: string;
  initials: string;
  maxBodyChars?: number;
  primaryLangs: Lang[];
  styleHint: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: "facebook",
    name: "Facebook Marketplace",
    region: "North America",
    postUrl: "https://www.facebook.com/marketplace/create/vehicle",
    color: "#666",
    initials: "FB",
    maxBodyChars: 5000,
    primaryLangs: ["en", "fr", "zh"],
    styleHint:
      "Friendly and casual. Lead with the highlight. Short scannable lines and a few relevant emojis are welcome. Buyers browse on mobile.",
  },
  {
    id: "craigslist",
    name: "Craigslist",
    region: "North America",
    postUrl: "https://accounts.craigslist.org/login/home",
    color: "#444",
    initials: "CL",
    maxBodyChars: 8000,
    primaryLangs: ["en"],
    styleHint:
      "Plain text, no emojis, no markdown. Factual and direct. Buyers expect price, mileage, condition, and a reason for selling up front.",
  },
  {
    id: "kijiji",
    name: "Kijiji",
    region: "Canada",
    postUrl: "https://www.kijiji.ca/p-select-category.html",
    color: "#555",
    initials: "KJ",
    maxBodyChars: 8000,
    primaryLangs: ["en", "fr"],
    styleHint:
      "Clear and trustworthy. Canadian audience; bilingual EN/FR is common. Bullet-style spec list works well.",
  },
  {
    id: "autotrader",
    name: "AutoTrader.ca",
    region: "Canada",
    postUrl: "https://www.autotrader.ca/sell/",
    color: "#333",
    initials: "AT",
    maxBodyChars: 4000,
    primaryLangs: ["en", "fr"],
    styleHint:
      "Polished and dealer-grade. Emphasize features, service history, and condition. No emojis. Confident but honest tone.",
  },
  {
    id: "carscom",
    name: "Cars.com",
    region: "United States",
    postUrl: "https://www.cars.com/sell/",
    color: "#222",
    initials: "CC",
    maxBodyChars: 4000,
    primaryLangs: ["en"],
    styleHint:
      "Professional US-market listing. Highlight trim, options, and reliability. Clean prose, no emojis.",
  },
];

export function getPlatform(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}

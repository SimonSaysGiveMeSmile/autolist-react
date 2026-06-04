// Shared domain types for the whole app.

export type Lang = "en" | "zh" | "fr";

export const LANGS: Lang[] = ["en", "zh", "fr"];

export type Transmission = "automatic" | "manual" | "";
export type FuelType = "gas" | "diesel" | "hybrid" | "electric" | "";
export type Condition = "excellent" | "good" | "fair" | "";

// The raw facts the user enters once.
export interface CarDetails {
  make: string;
  model: string;
  year: string;
  price: string;
  currency: string;
  mileage: string;
  mileageUnit: "km" | "mi";
  transmission: Transmission;
  fuel: FuelType;
  color: string;
  condition: Condition;
  vin: string;
  location: string;
  sellerName: string;
  contact: string;
  notes: string;
  images: string[]; // base64 data URLs
}

export const EMPTY_CAR: CarDetails = {
  make: "",
  model: "",
  year: "",
  price: "",
  currency: "USD",
  mileage: "",
  mileageUnit: "km",
  transmission: "",
  fuel: "",
  color: "",
  condition: "",
  vin: "",
  location: "",
  sellerName: "",
  contact: "",
  notes: "",
  images: [],
};

// AI-generated listing text, keyed by platform id then language.
export type GeneratedListing = {
  title: string;
  body: string;
};

export type GenerationResult = Record<string, Record<Lang, GeneratedListing>>;

// Per-platform posting status the user tracks manually.
export type PostStatus = "none" | "draft" | "posted";

export type StatusMap = Record<string, PostStatus>;

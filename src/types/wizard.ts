export interface VendorOption {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  tags: string[];
}

export interface ModuleRecommendation {
  id: string;
  category: string;
  icon: string;
  description: string;
  options: VendorOption[];
  selectedOptionId: string | null;
  status: "pending" | "accepted" | "rejected";
}

export interface ParsedRequirements {
  eventType: string | null;
  date: string | null;
  guestCount: number | null;
  ageGroup: string | null;
  location: string | null;
  budget: { min: number; max: number } | null;
  foodDrink: string[];
  entertainment: string[];
  theme: string | null;
  rawInput: string;
}

export type FlowStep = "input" | "requirements" | "loading" | "modules" | "shortlist" | "contact" | "confirmation";

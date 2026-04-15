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

export interface MissingField {
  key: keyof ParsedRequirements;
  label: string;
  question: string;
}

const MONTHS: Record<string, number> = {
  january: 0, jan: 0, february: 1, feb: 1, march: 2, mar: 2,
  april: 3, apr: 3, may: 4, june: 5, jun: 5, july: 6, jul: 6,
  august: 7, aug: 7, september: 8, sep: 8, sept: 8,
  october: 9, oct: 9, november: 10, nov: 10, december: 11, dec: 11,
};

const EVENT_TYPES = ["birthday", "wedding", "corporate", "baby shower", "anniversary", "graduation", "farewell", "housewarming", "dinner party", "cocktail party", "brunch", "holiday party", "retirement", "engagement"];

const AGE_KEYWORDS: Record<string, string> = {
  adults: "Adults (18+)", adult: "Adults (18+)", "grown-ups": "Adults (18+)",
  kids: "Kids (6-12)", children: "Kids (6-12)", child: "Kids (6-12)",
  teens: "Teens (13-17)", teenagers: "Teens (13-17)", teen: "Teens (13-17)",
  toddlers: "Children (0-5)", babies: "Children (0-5)", baby: "Children (0-5)",
  family: "Mixed (Kids + Adults)",
};

const FOOD_KEYWORDS = ["food", "catering", "dinner", "lunch", "brunch", "bbq", "barbecue", "buffet", "cocktails", "drinks", "drink", "beer", "wine", "snacks", "pizza", "sushi", "vegan", "vegetarian", "halal", "kosher", "gluten-free", "finger food", "canapes", "tapas", "dessert", "cake"];

const ENTERTAINMENT_KEYWORDS = ["board games", "game", "games", "dj", "music", "live band", "karaoke", "photo booth", "magician", "magic show", "face painting", "balloon", "comedian", "trivia", "dance", "dancing", "bowling", "laser tag", "escape room", "arcade", "sports", "painting", "craft", "workshop", "quiz"];

function parseDate(input: string): string | null {
  const lower = input.toLowerCase();

  // Match patterns like "13th May", "May 13", "13 May 2025", "May 13th 2025"
  const datePatterns = [
    /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)(?:\s+(\d{4}))?/i,
    /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s+(\d{4}))?/i,
    /(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{4}))?/,
  ];

  for (const pattern of datePatterns) {
    const match = lower.match(pattern);
    if (match) {
      let day: number, month: number, year: number;

      if (pattern === datePatterns[2]) {
        // DD/MM or DD/MM/YYYY
        day = parseInt(match[1]);
        month = parseInt(match[2]) - 1;
        year = match[3] ? parseInt(match[3]) : 2025;
      } else if (pattern === datePatterns[1]) {
        // Month Day Year
        month = MONTHS[match[1].toLowerCase()] ?? 0;
        day = parseInt(match[2]);
        year = match[3] ? parseInt(match[3]) : 2025;
      } else {
        // Day Month Year
        day = parseInt(match[1]);
        month = MONTHS[match[2].toLowerCase()] ?? 0;
        year = match[3] ? parseInt(match[3]) : 2025;
      }

      const date = new Date(year, month, day);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  }
  return null;
}

function parseGuestCount(input: string): number | null {
  const patterns = [
    /(?:for|about|around|approximately|approx|~)\s*(\d+)\s*(?:people|guests|persons|pax|attendees|adults|kids|children|friends)?/i,
    /(\d+)\s*(?:people|guests|persons|pax|attendees)/i,
    /(\d+)\s*(?:adults|kids|children|teens)/i,
  ];
  for (const p of patterns) {
    const match = input.match(p);
    if (match) return parseInt(match[1]);
  }
  return null;
}

function parseBudget(input: string): { min: number; max: number } | null {
  const rangeMatch = input.match(/(?:€|eur|euro)\s*(\d[\d,]*)\s*(?:-|to|–)\s*(?:€|eur|euro)?\s*(\d[\d,]*)/i);
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1].replace(/,/g, '')), max: parseInt(rangeMatch[2].replace(/,/g, '')) };
  }
  const singleMatch = input.match(/(?:budget|spend|spending|around|about|max|maximum|up to)\s*(?:of\s*)?(?:€|eur|euro)\s*(\d[\d,]*)/i);
  if (singleMatch) {
    const val = parseInt(singleMatch[1].replace(/,/g, ''));
    return { min: Math.round(val * 0.7), max: val };
  }
  const euroMatch = input.match(/(?:€|eur)\s*(\d[\d,]*)/i);
  if (euroMatch) {
    const val = parseInt(euroMatch[1].replace(/,/g, ''));
    return { min: Math.round(val * 0.7), max: val };
  }
  return null;
}

function findMatches(input: string, keywords: string[]): string[] {
  const lower = input.toLowerCase();
  return keywords.filter(kw => {
    const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(lower);
  });
}

function parseLocation(input: string): string | null {
  const inMatch = input.match(/\b(?:in|at|near|around)\s+([A-Z][a-zA-Z\s]+?)(?:\.|,|$|\s+(?:for|with|and|on|at|budget|around))/);
  if (inMatch) return inMatch[1].trim();

  // Common Dutch cities
  const cities = ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen", "Haarlem", "Leiden", "Delft", "Maastricht"];
  const lower = input.toLowerCase();
  for (const city of cities) {
    if (lower.includes(city.toLowerCase())) return city;
  }
  return null;
}

export function parseInput(input: string): ParsedRequirements {
  const lower = input.toLowerCase();

  // Event type
  const eventType = EVENT_TYPES.find(t => lower.includes(t)) ?? null;

  // Date
  const date = parseDate(input);

  // Guest count
  const guestCount = parseGuestCount(input);

  // Age group
  let ageGroup: string | null = null;
  for (const [keyword, label] of Object.entries(AGE_KEYWORDS)) {
    if (lower.includes(keyword)) { ageGroup = label; break; }
  }

  // Location
  const location = parseLocation(input);

  // Budget
  const budget = parseBudget(input);

  // Food & drink
  const foodDrink = findMatches(input, FOOD_KEYWORDS);

  // Entertainment
  const entertainment = findMatches(input, ENTERTAINMENT_KEYWORDS);

  // Theme
  const themeKeywords = ["tropical", "retro", "80s", "90s", "disco", "garden", "rustic", "elegant", "boho", "minimalist", "vintage", "neon", "fairy tale", "fantasy", "superhero", "space", "halloween", "christmas"];
  const theme = themeKeywords.find(t => lower.includes(t)) ?? null;

  return {
    eventType, date, guestCount, ageGroup, location, budget,
    foodDrink, entertainment, theme, rawInput: input,
  };
}

export function getMissingFields(parsed: ParsedRequirements): MissingField[] {
  const missing: MissingField[] = [];

  if (!parsed.eventType) {
    missing.push({ key: "eventType", label: "Event Type", question: "What type of event are you planning? (e.g., birthday, wedding, corporate)" });
  }
  if (!parsed.date) {
    missing.push({ key: "date", label: "Date", question: "When would you like to have this event? (e.g., May 13th, 2025)" });
  }
  if (!parsed.guestCount) {
    missing.push({ key: "guestCount", label: "Guest Count", question: "How many guests are you expecting?" });
  }
  if (!parsed.location) {
    missing.push({ key: "location", label: "Location", question: "Which city or area should we search for venues? (e.g., Amsterdam, Rotterdam)" });
  }
  if (!parsed.budget) {
    missing.push({ key: "budget", label: "Budget", question: "What's your budget range? (e.g., €500-€1500)" });
  }

  return missing;
}

export interface WizardData {
  date: string | null;
  budgetMin: number;
  budgetMax: number;
  guestCount: number;
  ageGroups: string[];
  setting: string;
  themes: string[];
  dietary: string[];
  entertainment: string[];
}

export type WizardStep = 'welcome' | 'date' | 'budget' | 'guests' | 'age' | 'preferences' | 'review' | 'results' | 'contact' | 'confirmation';

export interface Package {
  id: number;
  name: string;
  tag: string;
  venue: { name: string; location: string; capacity: string };
  entertainment: { name: string; type: string };
  catering: { name: string; menu: string };
  price: number;
  description: string;
}

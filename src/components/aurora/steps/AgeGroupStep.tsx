import { Check } from "lucide-react";

interface AgeGroupStepProps {
  ageGroups: string[];
  onAgeGroupsChange: (groups: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const AGE_OPTIONS = [
  { id: "0-5", label: "Children", range: "0 – 5 years", emoji: "👶" },
  { id: "6-12", label: "Kids", range: "6 – 12 years", emoji: "🧒" },
  { id: "13-17", label: "Teens", range: "13 – 17 years", emoji: "🧑‍🎓" },
  { id: "18+", label: "Adults", range: "18+ years", emoji: "🧑" },
];

const AgeGroupStep = ({ ageGroups, onAgeGroupsChange, onNext, onBack }: AgeGroupStepProps) => {
  const toggle = (id: string) => {
    onAgeGroupsChange(
      ageGroups.includes(id) ? ageGroups.filter(g => g !== id) : [...ageGroups, id]
    );
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Who's attending?</h2>
        <p className="text-muted-foreground">Select all age groups — this helps us match entertainment and catering</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {AGE_OPTIONS.map(opt => {
          const selected = ageGroups.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`relative p-6 rounded-lg border-2 text-left transition-all ${
                selected ? "border-primary bg-aurora-light-blue" : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {selected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
              <span className="text-2xl mb-2 block">{opt.emoji}</span>
              <p className="font-semibold text-foreground">{opt.label}</p>
              <p className="text-sm text-muted-foreground">{opt.range}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm font-semibold text-primary hover:underline">← Back to Guest Count</button>
        <button
          onClick={onNext}
          disabled={ageGroups.length === 0}
          className="bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Preferences
        </button>
      </div>
    </div>
  );
};

export default AgeGroupStep;

interface PreferencesStepProps {
  setting: string;
  themes: string[];
  dietary: string[];
  entertainment: string[];
  onSettingChange: (s: string) => void;
  onThemesChange: (t: string[]) => void;
  onDietaryChange: (d: string[]) => void;
  onEntertainmentChange: (e: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const SETTINGS = ["Indoor", "Outdoor", "Both"];
const THEMES = ["Fantasy / Magic", "Science / Space", "Sports", "Creative Workshop", "Nature / Animals", "Superhero"];
const DIETARY = ["Vegetarian", "Vegan", "Nut-Free", "Gluten-Free", "Halal", "No Restrictions"];
const ENTERTAINMENT_OPTS = ["Face Painting", "Balloon Artist", "Music & DJ", "Photo Booth", "Games & Activities", "Magician"];

const ChipGroup = ({ label, options, selected, onChange }: { label: string; options: string[]; selected: string[]; onChange: (s: string[]) => void }) => {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  };
  return (
    <div className="mb-6">
      <h3 className="font-display font-semibold text-sm text-foreground mb-3">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected.includes(opt)
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const PreferencesStep = ({ setting, themes, dietary, entertainment, onSettingChange, onThemesChange, onDietaryChange, onEntertainmentChange, onNext, onBack }: PreferencesStepProps) => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Fine-tune your preferences</h2>
        <p className="text-muted-foreground">Optional — but helps us find better matches</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        {/* Setting */}
        <div className="mb-6">
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">Setting</h3>
          <div className="flex gap-3">
            {SETTINGS.map(s => (
              <button
                key={s}
                onClick={() => onSettingChange(s)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  setting === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ChipGroup label="Party Themes" options={THEMES} selected={themes} onChange={onThemesChange} />
        <ChipGroup label="Dietary Restrictions" options={DIETARY} selected={dietary} onChange={onDietaryChange} />
        <ChipGroup label="Entertainment" options={ENTERTAINMENT_OPTS} selected={entertainment} onChange={onEntertainmentChange} />
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm font-semibold text-primary hover:underline">← Back to Age Groups</button>
        <button onClick={onNext} className="bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Review My Answers
        </button>
      </div>
    </div>
  );
};

export default PreferencesStep;

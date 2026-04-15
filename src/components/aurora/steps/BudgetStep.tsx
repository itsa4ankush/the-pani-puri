import { useState, useEffect } from "react";

interface BudgetStepProps {
  budgetMin: number;
  budgetMax: number;
  onBudgetChange: (min: number, max: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const BUDGET_TIERS = [
  { label: "Budget-Friendly", range: "€300 – €750", desc: "Home parties, simple setups" },
  { label: "Mid-Range", range: "€750 – €1,500", desc: "Venue + catering packages" },
  { label: "Premium", range: "€1,500 – €3,000", desc: "Full-service event planning" },
  { label: "Luxury", range: "€3,000+", desc: "Bespoke celebrations" },
];

const BudgetStep = ({ budgetMin, budgetMax, onBudgetChange, onNext, onBack }: BudgetStepProps) => {
  const [min, setMin] = useState(budgetMin);
  const [max, setMax] = useState(budgetMax);

  useEffect(() => {
    onBudgetChange(min, max);
  }, [min, max]);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">What's your budget range?</h2>
        <p className="text-muted-foreground">We'll match you with packages that fit your spending comfort zone</p>
      </div>

      {/* Budget display */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="text-center mb-6">
          <span className="font-display text-3xl font-bold text-primary">€{min.toLocaleString()}</span>
          <span className="text-muted-foreground mx-3">—</span>
          <span className="font-display text-3xl font-bold text-primary">€{max.toLocaleString()}</span>
        </div>

        {/* Min slider */}
        <div className="mb-4">
          <label className="text-xs text-muted-foreground font-medium mb-2 block">Minimum</label>
          <input
            type="range"
            min={200}
            max={4000}
            step={50}
            value={min}
            onChange={e => { const v = +e.target.value; if (v < max) setMin(v); }}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Max slider */}
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-2 block">Maximum</label>
          <input
            type="range"
            min={200}
            max={5000}
            step={50}
            value={max}
            onChange={e => { const v = +e.target.value; if (v > min) setMax(v); }}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Budget tiers */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {BUDGET_TIERS.map(tier => (
          <div key={tier.label} className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer"
            onClick={() => {
              const [lo, hi] = tier.range.replace(/[€,+]/g, '').trim().split('–').map(s => parseInt(s.trim()) || 5000);
              setMin(lo); setMax(hi);
            }}>
            <p className="font-semibold text-sm text-foreground">{tier.label}</p>
            <p className="text-xs text-accent font-medium">{tier.range}</p>
            <p className="text-xs text-muted-foreground mt-1">{tier.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mb-8">
        Aurora matches you with complete packages—not individual vendor quotes. Your budget covers venue + entertainment + catering combined.
      </p>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm font-semibold text-primary hover:underline">← Back to Date</button>
        <button onClick={onNext} className="bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Continue to Guest Count
        </button>
      </div>
    </div>
  );
};

export default BudgetStep;

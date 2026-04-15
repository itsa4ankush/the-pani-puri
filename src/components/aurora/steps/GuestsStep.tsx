import { Minus, Plus } from "lucide-react";

interface GuestsStepProps {
  guestCount: number;
  onGuestCountChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const GuestsStep = ({ guestCount, onGuestCountChange, onNext, onBack }: GuestsStepProps) => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">How many guests?</h2>
        <p className="text-muted-foreground">Approximate number of attendees expected</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-10 mb-6 flex flex-col items-center">
        <div className="flex items-center gap-8">
          <button
            onClick={() => onGuestCountChange(Math.max(1, guestCount - 1))}
            className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Minus className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-display text-6xl font-bold text-primary w-24 text-center">{guestCount}</span>
          <button
            onClick={() => onGuestCountChange(Math.min(200, guestCount + 1))}
            className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Plus className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">guests</p>
      </div>

      {/* Quick select */}
      <div className="flex justify-center gap-3 mb-8">
        {[10, 20, 30, 50, 75, 100].map(n => (
          <button
            key={n}
            onClick={() => onGuestCountChange(n)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              guestCount === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm font-semibold text-primary hover:underline">← Back to Budget</button>
        <button onClick={onNext} className="bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Continue to Age Group
        </button>
      </div>
    </div>
  );
};

export default GuestsStep;

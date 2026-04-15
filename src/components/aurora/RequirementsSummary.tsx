import { useState } from "react";
import { Check, AlertCircle, ArrowRight, Pencil, RotateCcw } from "lucide-react";
import type { ParsedRequirements, MissingField } from "@/lib/parseEventInput";
import { getMissingFields, parseInput } from "@/lib/parseEventInput";

interface RequirementsSummaryProps {
  parsed: ParsedRequirements;
  onConfirm: (finalParsed: ParsedRequirements) => void;
  onStartOver: () => void;
}

const FIELD_CONFIG: { key: keyof ParsedRequirements; label: string; icon: string; format: (val: unknown) => string }[] = [
  { key: "eventType", label: "Event Type", icon: "🎉", format: v => String(v) },
  { key: "date", label: "Date", icon: "📅", format: v => {
    if (!v) return "";
    const d = new Date(String(v));
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }},
  { key: "guestCount", label: "Guests", icon: "👥", format: v => `${v} people` },
  { key: "ageGroup", label: "Age Group", icon: "🎂", format: v => String(v) },
  { key: "location", label: "Location", icon: "📍", format: v => String(v) },
  { key: "budget", label: "Budget", icon: "💰", format: v => {
    const b = v as { min: number; max: number } | null;
    return b ? `€${b.min.toLocaleString()} – €${b.max.toLocaleString()}` : "";
  }},
  { key: "foodDrink", label: "Food & Drink", icon: "🍽️", format: v => (v as string[]).length ? (v as string[]).join(", ") : "" },
  { key: "entertainment", label: "Entertainment", icon: "🎮", format: v => (v as string[]).length ? (v as string[]).join(", ") : "" },
  { key: "theme", label: "Theme", icon: "🎨", format: v => String(v) },
];

const RequirementsSummary = ({ parsed, onConfirm, onStartOver }: RequirementsSummaryProps) => {
  const [currentParsed, setCurrentParsed] = useState<ParsedRequirements>(parsed);
  const [missingFields, setMissingFields] = useState<MissingField[]>(getMissingFields(parsed));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const hasMissing = currentQuestion < missingFields.length;

  const handleAnswer = () => {
    if (!answerInput.trim()) return;
    const field = missingFields[currentQuestion];
    const updated = { ...currentParsed };

    if (field.key === "guestCount") {
      const num = parseInt(answerInput.replace(/\D/g, ''));
      if (num) updated.guestCount = num;
    } else if (field.key === "budget") {
      const budgetParsed = parseInput(`budget ${answerInput}`);
      if (budgetParsed.budget) updated.budget = budgetParsed.budget;
      else {
        const num = parseInt(answerInput.replace(/[^\d]/g, ''));
        if (num) updated.budget = { min: Math.round(num * 0.7), max: num };
      }
    } else if (field.key === "date") {
      const dateParsed = parseInput(`on ${answerInput}`);
      if (dateParsed.date) updated.date = dateParsed.date;
    } else if (field.key === "location") {
      updated.location = answerInput.trim();
    } else if (field.key === "eventType") {
      updated.eventType = answerInput.trim().toLowerCase();
    }

    setCurrentParsed(updated);
    setAnswerInput("");
    setCurrentQuestion(prev => prev + 1);
  };

  const handleEditSave = (key: string) => {
    const updated = { ...currentParsed };
    if (key === "guestCount") {
      const num = parseInt(editValue.replace(/\D/g, ''));
      if (num) updated.guestCount = num;
    } else if (key === "location") {
      updated.location = editValue;
    } else if (key === "eventType") {
      updated.eventType = editValue.toLowerCase();
    } else if (key === "budget") {
      const budgetParsed = parseInput(`budget ${editValue}`);
      if (budgetParsed.budget) updated.budget = budgetParsed.budget;
    }
    setCurrentParsed(updated);
    setEditingField(null);
    setEditValue("");
  };

  const filledFields = FIELD_CONFIG.filter(f => {
    const val = currentParsed[f.key];
    if (val === null || val === undefined) return false;
    if (Array.isArray(val) && val.length === 0) return false;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Original input */}
      <div className="bg-aurora-light-blue rounded-lg p-4 mb-6">
        <p className="text-xs font-medium text-primary/60 mb-1">Your request</p>
        <p className="text-sm text-primary font-medium">"{currentParsed.rawInput}"</p>
      </div>

      <h2 className="font-display text-2xl font-bold text-primary mb-2">
        {hasMissing ? "Almost there — a few details needed" : "Here's what we understood"}
      </h2>
      <p className="text-muted-foreground mb-6">
        {hasMissing
          ? "We extracted most of your requirements. Just need a couple more details."
          : "Everything looks good! Confirm to see your curated packages."}
      </p>

      {/* Extracted requirements */}
      <div className="space-y-3 mb-6">
        {filledFields.map(field => {
          const val = currentParsed[field.key];
          const formatted = field.format(val);
          const isEditing = editingField === field.key;

          return (
            <div key={field.key} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
              <span className="text-lg">{field.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                {isEditing ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleEditSave(field.key)}
                      className="flex-1 text-sm border border-border rounded px-2 py-1 bg-background text-foreground outline-none focus:border-primary/40"
                      autoFocus
                    />
                    <button onClick={() => handleEditSave(field.key)} className="text-xs font-semibold text-primary hover:underline">Save</button>
                    <button onClick={() => setEditingField(null)} className="text-xs text-muted-foreground hover:underline">Cancel</button>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-foreground capitalize">{formatted}</p>
                )}
              </div>
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              {!isEditing && (
                <button
                  onClick={() => { setEditingField(field.key); setEditValue(String(formatted)); }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Missing field question */}
      {hasMissing && (
        <div className="bg-accent/10 border-2 border-accent/30 rounded-xl p-5 mb-6 animate-fade-in">
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">{missingFields[currentQuestion].label} needed</p>
              <p className="text-sm text-muted-foreground mt-1">{missingFields[currentQuestion].question}</p>
            </div>
          </div>
          <div className="flex gap-2 ml-8">
            <input
              value={answerInput}
              onChange={e => setAnswerInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAnswer()}
              placeholder="Type your answer..."
              className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary/40 transition-colors"
              autoFocus
            />
            <button
              onClick={handleAnswer}
              disabled={!answerInput.trim()}
              className="bg-accent text-accent-foreground font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {missingFields.length > 1 && (
            <p className="text-xs text-muted-foreground ml-8 mt-2">
              Question {currentQuestion + 1} of {missingFields.length} remaining
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button onClick={onStartOver} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          Start over
        </button>
        {!hasMissing && (
          <button
            onClick={() => onConfirm(currentParsed)}
            className="bg-accent text-accent-foreground font-display font-bold text-base px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Find My Packages
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RequirementsSummary;

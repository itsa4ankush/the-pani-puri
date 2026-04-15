import { Check, ArrowRight, RotateCcw, Download } from "lucide-react";
import type { ModuleRecommendation } from "@/types/wizard";

interface ShortlistSummaryProps {
  modules: ModuleRecommendation[];
  onProceedToContact: () => void;
  onBackToModules: () => void;
  onStartOver: () => void;
}

const ShortlistSummary = ({ modules, onProceedToContact, onBackToModules, onStartOver }: ShortlistSummaryProps) => {
  const accepted = modules.filter(m => m.status === "accepted" && m.selectedOptionId);
  const totalPrice = accepted.reduce((sum, m) => {
    const opt = m.options.find(o => o.id === m.selectedOptionId);
    return sum + (opt?.price ?? 0);
  }, 0);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-aurora-light-blue flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Your Shortlisted Event Plan</h2>
        <p className="text-muted-foreground">Here's your curated selection — {accepted.length} vendors ready to bring your event to life.</p>
      </div>

      {/* Shortlisted modules */}
      <div className="space-y-3 mb-6">
        {accepted.map(module => {
          const option = module.options.find(o => o.id === module.selectedOptionId)!;
          return (
            <div key={module.id} className="bg-card border border-border rounded-lg p-5 flex items-start gap-4">
              <span className="text-2xl">{module.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{module.category}</p>
                <p className="font-semibold text-foreground mt-0.5">{option.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {option.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full capitalize">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="font-display font-bold text-primary whitespace-nowrap">€{option.price.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="bg-primary rounded-xl p-5 mb-8 flex items-center justify-between">
        <div>
          <p className="text-primary-foreground/70 text-sm">Estimated Total</p>
          <p className="font-display text-3xl font-bold text-primary-foreground">€{totalPrice.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-primary-foreground/70 text-sm">{accepted.length} vendors</p>
          <p className="text-primary-foreground/70 text-xs">Prices are estimates</p>
        </div>
      </div>

      {/* Skipped categories */}
      {modules.filter(m => m.status === "rejected").length > 0 && (
        <div className="mb-8">
          <p className="text-xs text-muted-foreground font-medium mb-2">Skipped categories:</p>
          <div className="flex flex-wrap gap-2">
            {modules.filter(m => m.status === "rejected").map(m => (
              <span key={m.id} className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {m.icon} {m.category}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onProceedToContact}
          className="w-full sm:w-auto bg-accent text-accent-foreground font-display font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Request Vendor Contact
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={onBackToModules}
          className="w-full sm:w-auto border border-border text-foreground font-semibold px-6 py-3.5 rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Edit Selections
        </button>
      </div>

      <div className="text-center mt-4">
        <button onClick={onStartOver} className="text-xs text-muted-foreground hover:underline">Start over with a new event</button>
      </div>
    </div>
  );
};

export default ShortlistSummary;

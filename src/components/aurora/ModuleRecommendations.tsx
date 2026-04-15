import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, Star, RefreshCw } from "lucide-react";
import type { ModuleRecommendation, VendorOption } from "@/types/wizard";

interface ModuleRecommendationsProps {
  modules: ModuleRecommendation[];
  onModulesChange: (modules: ModuleRecommendation[]) => void;
  onFinalize: () => void;
  onStartOver: () => void;
}

const MODULE_COLORS: Record<string, { border: string; bg: string; text: string; accent: string; lightBg: string }> = {
  venue:         { border: "border-module-venue",         bg: "bg-module-venue",         text: "text-module-venue",         accent: "bg-module-venue/10",  lightBg: "bg-module-venue/5" },
  food:          { border: "border-module-food",          bg: "bg-module-food",          text: "text-module-food",          accent: "bg-module-food/10",   lightBg: "bg-module-food/5" },
  drinks:        { border: "border-module-drinks",        bg: "bg-module-drinks",        text: "text-module-drinks",        accent: "bg-module-drinks/10", lightBg: "bg-module-drinks/5" },
  entertainment: { border: "border-module-entertainment", bg: "bg-module-entertainment", text: "text-module-entertainment", accent: "bg-module-entertainment/10", lightBg: "bg-module-entertainment/5" },
  decor:         { border: "border-module-decor",         bg: "bg-module-decor",         text: "text-module-decor",         accent: "bg-module-decor/10",  lightBg: "bg-module-decor/5" },
  photography:   { border: "border-module-photography",   bg: "bg-module-photography",   text: "text-module-photography",   accent: "bg-module-photography/10", lightBg: "bg-module-photography/5" },
};

const getColors = (id: string) => MODULE_COLORS[id] ?? MODULE_COLORS.venue;

const VendorCard = ({
  option, isSelected, onSelect, colors,
}: { option: VendorOption; isSelected: boolean; onSelect: () => void; colors: typeof MODULE_COLORS.venue }) => (
  <button
    onClick={onSelect}
    className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
      isSelected
        ? `${colors.border} ${colors.accent}`
        : "border-border bg-card hover:border-muted-foreground/20"
    }`}
  >
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-semibold text-sm text-foreground">{option.name}</h4>
      <span className={`font-display font-bold text-sm ${isSelected ? colors.text : "text-foreground"}`}>€{option.price.toLocaleString()}</span>
    </div>
    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{option.description}</p>
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-1.5">
        {option.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full capitalize">{tag}</span>
        ))}
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Star className="w-3 h-3 fill-accent text-accent" />
        {option.rating}
      </div>
    </div>
    {isSelected && (
      <div className={`mt-3 flex items-center gap-1.5 text-xs font-semibold ${colors.text}`}>
        <Check className="w-3.5 h-3.5" /> Selected
      </div>
    )}
  </button>
);

const ModuleCard = ({
  module, onUpdate,
}: { module: ModuleRecommendation; onUpdate: (updated: ModuleRecommendation) => void }) => {
  const [expanded, setExpanded] = useState(module.status === "pending");
  const colors = getColors(module.id);

  const accept = (optionId: string) => {
    onUpdate({ ...module, status: "accepted", selectedOptionId: optionId });
    setExpanded(false);
  };

  const reject = () => {
    onUpdate({ ...module, status: "rejected", selectedOptionId: null });
    setExpanded(false);
  };

  const reopen = () => {
    onUpdate({ ...module, status: "pending", selectedOptionId: null });
    setExpanded(true);
  };

  const selectedOption = module.options.find(o => o.id === module.selectedOptionId);

  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all shadow-sm ${
      module.status === "accepted" ? `${colors.border} ${colors.lightBg}` :
      module.status === "rejected" ? "border-border bg-muted/20 opacity-50" :
      "border-border bg-card hover:shadow-md"
    }`}>
      {/* Color stripe */}
      <div className={`h-1 ${colors.bg}`} />

      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl ${colors.accent}`}>{module.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-foreground text-base">{module.category}</h3>
            {module.status === "accepted" && (
              <span className={`text-[10px] font-semibold ${colors.bg} text-white px-2.5 py-0.5 rounded-full flex items-center gap-1`}>
                <Check className="w-2.5 h-2.5" /> Accepted
              </span>
            )}
            {module.status === "rejected" && (
              <span className="text-[10px] font-semibold bg-muted-foreground/20 text-muted-foreground px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <X className="w-2.5 h-2.5" /> Skipped
              </span>
            )}
          </div>
          {module.status === "accepted" && selectedOption && !expanded && (
            <p className={`text-xs ${colors.text} mt-0.5 font-medium`}>{selectedOption.name} · €{selectedOption.price.toLocaleString()}</p>
          )}
          {module.status === "pending" && !expanded && (
            <p className="text-xs text-muted-foreground mt-0.5">{module.description}</p>
          )}
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4">{module.description} — pick your favorite or skip this category.</p>

          <div className="space-y-3 mb-4">
            {module.options.map(option => (
              <VendorCard
                key={option.id}
                option={option}
                isSelected={module.selectedOptionId === option.id}
                onSelect={() => accept(option.id)}
                colors={colors}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <button
              onClick={reject}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <X className="w-4 h-4" /> Skip this category
            </button>
            {module.status !== "pending" && (
              <button
                onClick={reopen}
                className={`text-sm ${colors.text} hover:underline flex items-center gap-1.5`}
              >
                <RefreshCw className="w-3.5 h-3.5" /> Change selection
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ModuleRecommendations = ({ modules, onModulesChange, onFinalize, onStartOver }: ModuleRecommendationsProps) => {
  const handleUpdate = (updated: ModuleRecommendation) => {
    onModulesChange(modules.map(m => m.id === updated.id ? updated : m));
  };

  const acceptedCount = modules.filter(m => m.status === "accepted").length;
  const pendingCount = modules.filter(m => m.status === "pending").length;
  const totalPrice = modules
    .filter(m => m.status === "accepted" && m.selectedOptionId)
    .reduce((sum, m) => {
      const opt = m.options.find(o => o.id === m.selectedOptionId);
      return sum + (opt?.price ?? 0);
    }, 0);

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Your Event Recommendations</h2>
        <p className="text-muted-foreground">Review each category and pick your favorites. Skip anything you don't need.</p>
      </div>

      {/* Summary bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-primary font-semibold">{acceptedCount} accepted</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{pendingCount} remaining</span>
        </div>
        {acceptedCount > 0 && (
          <span className="font-display font-bold text-primary">
            Total: €{totalPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* Module cards */}
      <div className="space-y-5 mb-8">
        {modules.map(module => (
          <ModuleCard key={module.id} module={module} onUpdate={handleUpdate} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button onClick={onStartOver} className="text-sm text-primary font-semibold hover:underline">
          ← Start over
        </button>
        <button
          onClick={onFinalize}
          disabled={acceptedCount === 0}
          className="bg-accent text-accent-foreground font-display font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          View My Shortlist ({acceptedCount})
        </button>
      </div>
    </div>
  );
};

export default ModuleRecommendations;

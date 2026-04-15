import { Calendar, Euro, Users, UserCheck, Settings2, Pencil } from "lucide-react";
import type { WizardData } from "@/types/wizard";

interface ReviewScreenProps {
  data: WizardData;
  onEdit: (step: number) => void;
  onGenerate: () => void;
}

const ReviewScreen = ({ data, onEdit, onGenerate }: ReviewScreenProps) => {
  const formatDate = data.date ? new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Not set";

  const sections = [
    { icon: Calendar, label: "Party Date", value: formatDate, step: 1 },
    { icon: Euro, label: "Budget", value: `€${data.budgetMin.toLocaleString()} – €${data.budgetMax.toLocaleString()}`, step: 2 },
    { icon: Users, label: "Guest Count", value: `${data.guestCount} guests`, step: 3 },
    { icon: UserCheck, label: "Age Groups", value: data.ageGroups.join(", ") || "Not set", step: 4 },
    { icon: Settings2, label: "Preferences", value: [data.setting, ...data.themes, ...data.dietary, ...data.entertainment].filter(Boolean).join(", ") || "None selected", step: 5 },
  ];

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Review your answers</h2>
        <p className="text-muted-foreground">Make sure everything looks right before we find your perfect packages</p>
      </div>

      <div className="space-y-4 mb-8">
        {sections.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-5 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-aurora-light-blue flex items-center justify-center flex-shrink-0">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</p>
                <p className="text-sm font-semibold text-foreground mt-1">{s.value}</p>
              </div>
            </div>
            <button onClick={() => onEdit(s.step)} className="text-primary hover:opacity-70 transition-opacity p-1">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-aurora-light-blue rounded-lg p-5 mb-8">
        <h3 className="font-display font-semibold text-sm text-primary mb-2">What happens next?</h3>
        <p className="text-sm text-primary/80">
          Aurora will search 127 verified vendors in Rotterdam and generate 3 curated packages that match your criteria. This usually takes about 10 seconds.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={onGenerate}
          className="bg-accent text-accent-foreground font-display font-bold text-lg px-10 py-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Generate My Party Packages
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;

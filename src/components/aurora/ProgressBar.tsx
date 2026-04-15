import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = ["Date", "Budget", "Guests", "Age", "Preferences"];

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="flex items-center justify-center gap-1 py-6">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <div key={label} className="flex items-center gap-1">
            <div className="flex items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                isCompleted ? "bg-primary text-primary-foreground" :
                isActive ? "bg-accent text-accent-foreground" :
                "bg-muted text-muted-foreground"
              }`}>
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : stepNum}
              </div>
              <span className={`text-sm ${isActive ? "font-semibold text-primary" : isCompleted ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-1 rounded-full ${stepNum < currentStep ? "bg-primary" : isActive ? "bg-accent" : "bg-muted"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;

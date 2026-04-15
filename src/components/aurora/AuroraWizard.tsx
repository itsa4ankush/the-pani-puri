import { useState } from "react";
import type { ModuleRecommendation, FlowStep } from "@/types/wizard";
import type { ParsedRequirements } from "@/types/wizard";
import { parseInput } from "@/lib/parseEventInput";
import { generateModules } from "@/lib/generateModules";
import AuroraHeader from "./AuroraHeader";
import SmartInput from "./SmartInput";
import RequirementsSummary from "./RequirementsSummary";
import ModuleRecommendations from "./ModuleRecommendations";
import ShortlistSummary from "./ShortlistSummary";
import ShortlistContactForm from "./ShortlistContactForm";
import ConfirmationScreen from "./ConfirmationScreen";

const AuroraWizard = () => {
  const [step, setStep] = useState<FlowStep>("input");
  const [parsed, setParsed] = useState<ParsedRequirements | null>(null);
  const [modules, setModules] = useState<ModuleRecommendation[]>([]);

  const reset = () => {
    setStep("input");
    setParsed(null);
    setModules([]);
  };

  const handleInputSubmit = (input: string) => {
    const result = parseInput(input);
    setParsed(result);
    setStep("requirements");
  };

  const handleConfirm = (finalParsed: ParsedRequirements) => {
    setParsed(finalParsed);
    setStep("loading");
    const generated = generateModules(finalParsed);
    setTimeout(() => {
      setModules(generated);
      setStep("modules");
    }, 2000);
  };

  const acceptedModules = modules.filter(m => m.status === "accepted" && m.selectedOptionId);

  if (step === "input") {
    return <SmartInput onSubmit={handleInputSubmit} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuroraHeader
        showSaveExit={step === "requirements" || step === "modules"}
        showBackToPackages={step === "contact"}
        onSaveExit={reset}
        onBackToPackages={() => setStep("shortlist")}
      />

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {step === "requirements" && parsed && (
          <RequirementsSummary parsed={parsed} onConfirm={handleConfirm} onStartOver={reset} />
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-muted border-t-accent rounded-full animate-spin mb-6" />
            <h3 className="font-display text-xl font-semibold text-primary mb-2">Finding vendors for your event...</h3>
            <p className="text-sm text-muted-foreground">
              Searching across 6 categories in {parsed?.location || "your area"}
            </p>
          </div>
        )}

        {step === "modules" && (
          <ModuleRecommendations
            modules={modules}
            onModulesChange={setModules}
            onFinalize={() => setStep("shortlist")}
            onStartOver={reset}
          />
        )}

        {step === "shortlist" && (
          <ShortlistSummary
            modules={modules}
            onProceedToContact={() => setStep("contact")}
            onBackToModules={() => setStep("modules")}
            onStartOver={reset}
          />
        )}

        {step === "contact" && (
          <ShortlistContactForm
            acceptedModules={acceptedModules}
            onSubmit={() => setStep("confirmation")}
            onBack={() => setStep("shortlist")}
          />
        )}

        {step === "confirmation" && <ConfirmationScreen onPlanAnother={reset} />}
      </div>
    </div>
  );
};

export default AuroraWizard;

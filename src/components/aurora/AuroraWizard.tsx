import { useState } from "react";
import type { Package } from "@/types/wizard";
import type { ParsedRequirements } from "@/lib/parseEventInput";
import { parseInput } from "@/lib/parseEventInput";
import AuroraHeader from "./AuroraHeader";
import SmartInput from "./SmartInput";
import RequirementsSummary from "./RequirementsSummary";
import PackageResults from "./PackageResults";
import ContactForm from "./ContactForm";
import ConfirmationScreen from "./ConfirmationScreen";

type FlowStep = "input" | "requirements" | "loading" | "results" | "contact" | "confirmation";

function generatePackages(parsed: ParsedRequirements): Package[] {
  const city = parsed.location || "Rotterdam";
  const type = parsed.eventType || "party";
  const isKids = parsed.ageGroup?.toLowerCase().includes("kid") || parsed.ageGroup?.toLowerCase().includes("child");
  const budget = parsed.budget ?? { min: 750, max: 1500 };
  const midPrice = Math.round((budget.min + budget.max) / 2);

  const entertainmentReq = parsed.entertainment.length > 0 ? parsed.entertainment.join(" + ") : isKids ? "Kids DJ + Dance Party" : "Live Music + DJ";
  const foodReq = parsed.foodDrink.length > 0 ? parsed.foodDrink.join(", ") : isKids ? "Kids menu + snack platter" : "Buffet dinner + drinks";

  return [
    {
      id: 1, name: "The Golden Hour", tag: "Best Match",
      venue: { name: `${city} Central Hall`, location: `${city} Centre`, capacity: `Up to ${(parsed.guestCount || 20) + 15} guests` },
      entertainment: { name: "Top Entertainment NL", type: entertainmentReq },
      catering: { name: "Bites & Delights", menu: foodReq },
      price: midPrice,
      description: `A perfectly matched ${type} experience in the heart of ${city} with everything you asked for.`,
    },
    {
      id: 2, name: "Creative Explorer", tag: "Most Creative",
      venue: { name: `Studio ${city}`, location: `${city} East`, capacity: `Up to ${(parsed.guestCount || 20) + 10} guests` },
      entertainment: { name: "Art & Fun Collective", type: parsed.entertainment.length ? parsed.entertainment[0] + " + Surprise Activities" : "Creative Workshop + Games" },
      catering: { name: "Green Table Catering", menu: parsed.foodDrink.includes("vegetarian") ? "Full vegetarian spread" : foodReq },
      price: Math.round(midPrice * 0.85),
      description: `A unique, creative ${type} in a bright studio space — perfect for making memories.`,
    },
    {
      id: 3, name: "Garden Party Deluxe", tag: "Best Value",
      venue: { name: `Het Park ${city}`, location: `${city} South`, capacity: `Up to ${(parsed.guestCount || 20) + 25} guests` },
      entertainment: { name: "Fun Factory NL", type: parsed.entertainment.length ? parsed.entertainment.join(" + ") : "Games + Photo Booth" },
      catering: { name: `${city} Eats`, menu: "BBQ-style " + (foodReq || "mixed menu") },
      price: Math.round(midPrice * 0.75),
      description: `An enchanting outdoor ${type} surrounded by greenery — great vibes at a great price.`,
    },
  ];
}

const AuroraWizard = () => {
  const [step, setStep] = useState<FlowStep>("input");
  const [parsed, setParsed] = useState<ParsedRequirements | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const reset = () => {
    setStep("input");
    setParsed(null);
    setPackages([]);
    setSelectedPackage(null);
  };

  const handleInputSubmit = (input: string) => {
    const result = parseInput(input);
    setParsed(result);
    setStep("requirements");
  };

  const handleConfirm = (finalParsed: ParsedRequirements) => {
    setParsed(finalParsed);
    setStep("loading");
    const pkgs = generatePackages(finalParsed);
    setTimeout(() => {
      setPackages(pkgs);
      setStep("results");
    }, 2000);
  };

  if (step === "input") {
    return <SmartInput onSubmit={handleInputSubmit} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuroraHeader
        showSaveExit={step === "requirements"}
        showBackToPackages={step === "contact"}
        onSaveExit={reset}
        onBackToPackages={() => setStep("results")}
      />

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {step === "requirements" && parsed && (
          <RequirementsSummary parsed={parsed} onConfirm={handleConfirm} onStartOver={reset} />
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-muted border-t-accent rounded-full animate-spin mb-6" />
            <h3 className="font-display text-xl font-semibold text-primary mb-2">Finding your perfect packages...</h3>
            <p className="text-sm text-muted-foreground">
              Searching vendors across {parsed?.location || "your area"}
            </p>
          </div>
        )}

        {step === "results" && (
          <PackageResults
            packages={packages}
            onSelectPackage={pkg => { setSelectedPackage(pkg); setStep("contact"); }}
            onStartOver={reset}
          />
        )}

        {step === "contact" && selectedPackage && (
          <ContactForm
            selectedPackage={selectedPackage}
            onSubmit={() => setStep("confirmation")}
            onBack={() => setStep("results")}
          />
        )}

        {step === "confirmation" && <ConfirmationScreen onPlanAnother={reset} />}
      </div>
    </div>
  );
};

export default AuroraWizard;

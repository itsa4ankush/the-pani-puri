import { useState } from "react";
import type { WizardData, WizardStep, Package } from "@/types/wizard";
import AuroraHeader from "./AuroraHeader";
import ProgressBar from "./ProgressBar";
import WelcomeScreen from "./WelcomeScreen";
import DateStep from "./steps/DateStep";
import BudgetStep from "./steps/BudgetStep";
import GuestsStep from "./steps/GuestsStep";
import AgeGroupStep from "./steps/AgeGroupStep";
import PreferencesStep from "./steps/PreferencesStep";
import ReviewScreen from "./ReviewScreen";
import PackageResults from "./PackageResults";
import ContactForm from "./ContactForm";
import ConfirmationScreen from "./ConfirmationScreen";

const MOCK_PACKAGES: Package[] = [
  {
    id: 1, name: "The Golden Hour", tag: "Best Match",
    venue: { name: "De Machinist", location: "Rotterdam West", capacity: "Up to 40 guests" },
    entertainment: { name: "DJ Sparkle", type: "Kids DJ + Dance Party" },
    catering: { name: "Bites & Delights", menu: "Kids menu + adult snack platter" },
    price: 1150,
    description: "A lively indoor celebration with professional DJ entertainment and crowd-favorite catering.",
  },
  {
    id: 2, name: "Creative Explorer", tag: "Most Creative",
    venue: { name: "Studio Rotterdam", location: "Rotterdam Centre", capacity: "Up to 30 guests" },
    entertainment: { name: "Art Adventures", type: "Creative Workshop + Face Painting" },
    catering: { name: "Green Table Catering", menu: "Vegetarian-friendly kids menu" },
    price: 980,
    description: "Hands-on creative workshops in a bright studio space, perfect for imaginative young minds.",
  },
  {
    id: 3, name: "Garden Party Deluxe", tag: "Best Value",
    venue: { name: "Het Park Paviljoen", location: "Rotterdam South", capacity: "Up to 50 guests" },
    entertainment: { name: "Magic Mike NL", type: "Magic Show + Balloon Art" },
    catering: { name: "Rotterdam Eats", menu: "BBQ-style kids & family menu" },
    price: 875,
    description: "An enchanting outdoor party with a magical show, surrounded by greenery and fresh-air fun.",
  },
];

const STEP_MAP: Record<number, WizardStep> = { 1: 'date', 2: 'budget', 3: 'guests', 4: 'age', 5: 'preferences' };
const STEP_NUM: Record<WizardStep, number> = { welcome: 0, date: 1, budget: 2, guests: 3, age: 4, preferences: 5, review: 6, results: 7, contact: 8, confirmation: 9 };

const AuroraWizard = () => {
  const [step, setStep] = useState<WizardStep>('welcome');
  const [data, setData] = useState<WizardData>({
    date: null, budgetMin: 750, budgetMax: 1500, guestCount: 20,
    ageGroups: [], setting: "Indoor", themes: [], dietary: [], entertainment: [],
  });
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(false);

  const currentStepNum = STEP_NUM[step];
  const showHeader = step !== 'welcome';
  const showProgress = currentStepNum >= 1 && currentStepNum <= 5;

  const goTo = (s: WizardStep) => setStep(s);
  const resetWizard = () => {
    setStep('welcome');
    setData({ date: null, budgetMin: 750, budgetMax: 1500, guestCount: 20, ageGroups: [], setting: "Indoor", themes: [], dietary: [], entertainment: [] });
    setSelectedPackage(null);
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); goTo('results'); }, 2000);
  };

  if (step === 'welcome') return <WelcomeScreen onStart={() => goTo('date')} />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && (
        <AuroraHeader
          showSaveExit={currentStepNum >= 1 && currentStepNum <= 6}
          showBackToPackages={step === 'contact'}
          onSaveExit={resetWizard}
          onBackToPackages={() => goTo('results')}
        />
      )}
      {showProgress && <ProgressBar currentStep={currentStepNum} totalSteps={5} />}

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-muted border-t-accent rounded-full animate-spin mb-6" />
            <h3 className="font-display text-xl font-semibold text-primary mb-2">Finding your perfect packages...</h3>
            <p className="text-sm text-muted-foreground">Searching 127 vendors across Rotterdam</p>
          </div>
        ) : (
          <>
            {step === 'date' && (
              <DateStep selectedDate={data.date} onDateChange={d => setData(p => ({ ...p, date: d }))} onNext={() => goTo('budget')} onBack={resetWizard} />
            )}
            {step === 'budget' && (
              <BudgetStep budgetMin={data.budgetMin} budgetMax={data.budgetMax} onBudgetChange={(min, max) => setData(p => ({ ...p, budgetMin: min, budgetMax: max }))} onNext={() => goTo('guests')} onBack={() => goTo('date')} />
            )}
            {step === 'guests' && (
              <GuestsStep guestCount={data.guestCount} onGuestCountChange={c => setData(p => ({ ...p, guestCount: c }))} onNext={() => goTo('age')} onBack={() => goTo('budget')} />
            )}
            {step === 'age' && (
              <AgeGroupStep ageGroups={data.ageGroups} onAgeGroupsChange={g => setData(p => ({ ...p, ageGroups: g }))} onNext={() => goTo('preferences')} onBack={() => goTo('guests')} />
            )}
            {step === 'preferences' && (
              <PreferencesStep
                setting={data.setting} themes={data.themes} dietary={data.dietary} entertainment={data.entertainment}
                onSettingChange={s => setData(p => ({ ...p, setting: s }))}
                onThemesChange={t => setData(p => ({ ...p, themes: t }))}
                onDietaryChange={d => setData(p => ({ ...p, dietary: d }))}
                onEntertainmentChange={e => setData(p => ({ ...p, entertainment: e }))}
                onNext={() => goTo('review')} onBack={() => goTo('age')}
              />
            )}
            {step === 'review' && (
              <ReviewScreen data={data} onEdit={s => goTo(STEP_MAP[s])} onGenerate={handleGenerate} />
            )}
            {step === 'results' && (
              <PackageResults packages={MOCK_PACKAGES} onSelectPackage={pkg => { setSelectedPackage(pkg); goTo('contact'); }} onStartOver={resetWizard} />
            )}
            {step === 'contact' && selectedPackage && (
              <ContactForm selectedPackage={selectedPackage} onSubmit={() => goTo('confirmation')} onBack={() => goTo('results')} />
            )}
            {step === 'confirmation' && <ConfirmationScreen onPlanAnother={resetWizard} />}
          </>
        )}
      </div>
    </div>
  );
};

export default AuroraWizard;

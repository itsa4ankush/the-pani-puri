import { Sun, CheckCircle, Shield, Euro, Star } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center">
            <Sun className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-primary">Aurora</span>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-28 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            Your party, planned in 15 minutes
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Aurora asks five smart questions about your event, then instantly delivers three curated packages combining venue, entertainment, and catering—all matched to your budget and date in Rotterdam.
          </p>

          <div className="space-y-4 mb-10">
            {[
              "Answer 5 quick questions",
              "Review smart matches from local vendors",
              "Request vendor contact instantly",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm font-semibold text-primary">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="bg-accent text-accent-foreground font-display font-bold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity w-fit"
          >
            Start Planning Your Party
          </button>

          <p className="text-sm text-muted-foreground mt-5">
            We've got this. No account required to start.
          </p>

          <div className="border-t border-border mt-10 pt-6 flex flex-wrap gap-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              127 verified Rotterdam vendors
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Euro className="w-4 h-4 text-primary" />
              No hidden fees
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-primary" />
              4.8 average vendor rating
            </div>
          </div>
        </div>

        {/* Right decorative panel - hidden on mobile */}
        <div className="hidden lg:flex w-96 bg-aurora-light-blue items-center justify-center">
          <div className="text-center space-y-4 px-10">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Sun className="w-10 h-10 text-primary" />
            </div>
            <p className="text-sm text-primary font-medium">Trusted by 2,400+ party planners in Rotterdam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

import { Sun, CheckCircle, Shield, Euro, Star, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-background.jpg";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Soft overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/70 backdrop-blur-[2px]" />
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-aurora-coral/15 blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-aurora-lavender/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-aurora-mint/15 blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Header */}
      <header className="px-6 py-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
            <Sun className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-gradient-primary">Aurora</span>
        </div>
      </header>

      <div className="flex-1 flex relative z-10">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-28 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 mb-6 w-fit shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold text-primary">AI-Powered Event Planning</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-foreground">Your party,</span>
            <br />
            <span className="text-gradient-aurora">planned in 15 minutes</span>
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
                <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                </div>
                <span className="text-sm font-semibold text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="bg-gradient-accent text-accent-foreground font-display font-bold text-lg px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-smooth w-fit shadow-elegant hover:shadow-glow"
          >
            Start Planning Your Party
          </button>

          <p className="text-sm text-muted-foreground mt-5">
            We've got this. No account required to start.
          </p>

          <div className="border-t border-border/60 mt-10 pt-6 flex flex-wrap gap-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-aurora-mint" />
              127 verified Rotterdam vendors
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Euro className="w-4 h-4 text-aurora-coral" />
              No hidden fees
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-accent" />
              4.8 average vendor rating
            </div>
          </div>
        </div>

        {/* Right decorative panel - hidden on mobile */}
        <div className="hidden lg:flex w-96 bg-gradient-aurora items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="text-center space-y-4 px-10 relative z-10">
            <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto shadow-glow animate-float">
              <Sun className="w-12 h-12 text-white" />
            </div>
            <p className="text-sm text-white/90 font-medium">Trusted by 2,400+ party planners in Rotterdam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

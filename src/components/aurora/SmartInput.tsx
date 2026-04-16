import { useState, useRef, useEffect } from "react";
import { Sun, ArrowRight, Sparkles, Shield, Euro, Star } from "lucide-react";

interface SmartInputProps {
  onSubmit: (input: string) => void;
}

const EXAMPLES = [
  "Plan a birthday party for 20 adults on 13th May with food and drinks along with board games in Amsterdam",
  "Organize a kids' party for 15 children in Rotterdam, budget €800, with a magician and face painting",
  "Corporate cocktail event for 50 people in The Hague on June 20th, budget €3000",
];

const SmartInput = ({ onSubmit }: SmartInputProps) => {
  const [input, setInput] = useState("");
  const [showExamples, setShowExamples] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-aurora-coral/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-aurora-lavender/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Header */}
      <header className="px-6 py-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
            <Sun className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-gradient-primary">Aurora</span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-3xl mx-auto w-full -mt-16 relative z-10">
        <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 mb-6 shadow-soft">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-semibold text-primary">AI-Powered Planning</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="text-foreground">Tell us about</span>{" "}
            <span className="text-gradient-aurora">your event</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Describe your perfect party in one sentence. Include date, guests, location, and what you'd like — we'll handle the rest.
          </p>
        </div>

        {/* Input area */}
        <div className="w-full relative mb-6">
          <div className="relative bg-gradient-card border-2 border-border rounded-2xl overflow-hidden focus-within:border-primary/40 focus-within:shadow-elegant transition-smooth shadow-card">
            <div className="flex items-center gap-2 px-4 pt-3 pb-1">
              <div className="w-5 h-5 rounded-md bg-gradient-accent flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-accent-foreground" />
              </div>
              <span className="text-xs font-semibold text-accent">AI-Powered</span>
            </div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setShowExamples(e.target.value.length === 0); }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Plan a birthday party for 20 adults on 13th May with food and drinks in Amsterdam..."
              rows={3}
              className="w-full px-4 py-3 text-foreground bg-transparent resize-none outline-none text-base placeholder:text-muted-foreground/60"
            />
            <div className="flex items-center justify-between px-4 pb-3">
              <p className="text-xs text-muted-foreground">Press Enter to submit</p>
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className="bg-gradient-accent text-accent-foreground font-semibold px-5 py-2 rounded-lg hover:scale-[1.03] active:scale-[0.97] transition-smooth disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 text-sm shadow-soft hover:shadow-glow"
              >
                Plan My Event
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Example prompts */}
        {showExamples && (
          <div className="w-full animate-fade-in">
            <p className="text-xs text-muted-foreground font-medium mb-3 text-center">Try an example:</p>
            <div className="space-y-2">
              {EXAMPLES.map((example, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(example); setShowExamples(false); inputRef.current?.focus(); }}
                  className="w-full text-left px-4 py-3 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:bg-card hover:border-primary/30 hover:shadow-soft transition-smooth text-sm text-muted-foreground"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer trust bar */}
      <div className="px-6 py-4 border-t border-border/60 backdrop-blur-sm bg-background/40 relative z-10">
        <div className="flex justify-center gap-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-aurora-mint" /> 127 verified vendors</span>
          <span className="flex items-center gap-1.5"><Euro className="w-3.5 h-3.5 text-aurora-coral" /> No hidden fees</span>
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-accent" /> 4.8 average rating</span>
        </div>
      </div>
    </div>
  );
};

export default SmartInput;

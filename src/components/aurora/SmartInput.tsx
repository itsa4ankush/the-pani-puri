import { useState, useRef, useEffect } from "react";
import { Sun, ArrowRight, Sparkles } from "lucide-react";

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

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-3xl mx-auto w-full -mt-16">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
            Tell us about your event
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Describe your perfect party in one sentence. Include date, guests, location, and what you'd like — we'll handle the rest.
          </p>
        </div>

        {/* Input area */}
        <div className="w-full relative mb-6">
          <div className="relative bg-card border-2 border-border rounded-xl overflow-hidden focus-within:border-primary/40 transition-colors shadow-sm">
            <div className="flex items-center gap-2 px-4 pt-3 pb-1">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs font-medium text-accent">AI-Powered Planning</span>
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
                className="bg-accent text-accent-foreground font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
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
                  className="w-full text-left px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all text-sm text-muted-foreground"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer trust bar */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex justify-center gap-8 text-xs text-muted-foreground">
          <span>🛡️ 127 verified vendors</span>
          <span>💰 No hidden fees</span>
          <span>⭐ 4.8 average rating</span>
        </div>
      </div>
    </div>
  );
};

export default SmartInput;

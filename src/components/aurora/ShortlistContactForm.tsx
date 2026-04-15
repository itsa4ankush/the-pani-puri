import { useState } from "react";
import { MapPin, Music, Utensils } from "lucide-react";
import type { ModuleRecommendation } from "@/types/wizard";

interface ShortlistContactFormProps {
  acceptedModules: ModuleRecommendation[];
  onSubmit: (data: { name: string; email: string; phone: string; message: string }) => void;
  onBack: () => void;
}

const ShortlistContactForm = ({ acceptedModules, onSubmit, onBack }: ShortlistContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const totalPrice = acceptedModules.reduce((sum, m) => {
    const opt = m.options.find(o => o.id === m.selectedOptionId);
    return sum + (opt?.price ?? 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone && agreed) {
      onSubmit({ name, email, phone, message });
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Almost There — Let's Connect You</h2>
        <p className="text-muted-foreground">Fill in your details and we'll confirm availability with {acceptedModules.length} vendors within 4 business hours.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Selected vendors summary */}
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-4">Your Shortlisted Vendors</p>

          <div className="space-y-3 mb-4">
            {acceptedModules.map(module => {
              const option = module.options.find(o => o.id === module.selectedOptionId);
              if (!option) return null;
              return (
                <div key={module.id} className="flex items-start gap-3">
                  <span className="text-lg">{module.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{module.category}</p>
                    <p className="text-xs text-muted-foreground">{option.name} · €{option.price.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border pt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estimated Total</span>
            <span className="font-display text-xl font-bold text-primary">€{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Full Name *</label>
            <input
              type="text" required value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Email Address *</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Phone Number *</label>
            <input
              type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="+31 6 12 34 56 78"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Additional Message</label>
            <textarea
              value={message} onChange={e => setMessage(e.target.value)} rows={3}
              className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              placeholder="Anything else the vendors should know?"
            />
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 accent-primary" />
            <span className="text-xs text-muted-foreground">I agree to share my contact details with the selected vendors. Aurora will facilitate the introduction.</span>
          </label>
          <button
            type="submit"
            disabled={!name || !email || !phone || !agreed}
            className="w-full bg-accent text-accent-foreground font-display font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShortlistContactForm;

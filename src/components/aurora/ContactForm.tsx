import { useState } from "react";
import { MapPin, Music, Utensils } from "lucide-react";
import type { Package } from "@/types/wizard";

interface ContactFormProps {
  selectedPackage: Package;
  onSubmit: (data: { name: string; email: string; phone: string; message: string }) => void;
  onBack: () => void;
}

const ContactForm = ({ selectedPackage, onSubmit, onBack }: ContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

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
        <p className="text-muted-foreground">Fill in your details and we'll confirm availability with the vendors within 4 business hours.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Selected package summary */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Selected Package</span>
          </div>
          <h3 className="font-display text-lg font-bold text-primary mb-4">{selectedPackage.name}</h3>

          <div className="space-y-3">
            {[
              { icon: MapPin, label: "Venue", value: `${selectedPackage.venue.name} — ${selectedPackage.venue.location}` },
              { icon: Music, label: "Entertainment", value: `${selectedPackage.entertainment.name} — ${selectedPackage.entertainment.type}` },
              { icon: Utensils, label: "Catering", value: `${selectedPackage.catering.name} — ${selectedPackage.catering.menu}` },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-aurora-light-blue flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-xl font-bold text-primary">€{selectedPackage.price.toLocaleString()}</span>
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

export default ContactForm;

import { CheckCircle, PartyPopper } from "lucide-react";

interface ConfirmationScreenProps {
  onPlanAnother: () => void;
}

const ConfirmationScreen = ({ onPlanAnother }: ConfirmationScreenProps) => {
  return (
    <div className="max-w-lg mx-auto text-center animate-fade-in py-20">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="font-display text-3xl font-bold text-primary mb-3">Your request has been sent!</h2>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        We've notified the vendors from your selected package. Expect a confirmation email within 4 business hours with vendor contact details and next steps.
      </p>

      <div className="bg-aurora-light-blue rounded-lg p-6 mb-8 text-left">
        <h3 className="font-display font-semibold text-sm text-primary mb-3">What happens next?</h3>
        <ol className="space-y-2 text-sm text-primary/80">
          <li className="flex items-start gap-2">
            <span className="font-semibold text-accent">1.</span>
            Vendors review your event details
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-accent">2.</span>
            You'll receive a confirmation email with contact info
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-accent">3.</span>
            Connect directly with vendors to finalize your party
          </li>
        </ol>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onPlanAnother}
          className="bg-accent text-accent-foreground font-display font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <PartyPopper className="w-5 h-5" />
          Plan Another Party
        </button>
        <button onClick={onPlanAnother} className="text-sm text-primary hover:underline">
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;

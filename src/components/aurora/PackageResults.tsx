import { MapPin, Music, Utensils, Star } from "lucide-react";
import type { Package } from "@/types/wizard";

interface PackageResultsProps {
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
  onStartOver: () => void;
}

const PackageResults = ({ packages, onSelectPackage, onStartOver }: PackageResultsProps) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Your Personalized Party Packages</h2>
        <p className="text-muted-foreground">3 curated options matched to your preferences — tap any to request vendor contact</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="bg-primary p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-lg text-primary-foreground">{pkg.name}</h3>
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-semibold">{pkg.tag}</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">{pkg.description}</p>
            </div>

            <div className="p-5 space-y-4">
              {/* Venue */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-aurora-light-blue flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Venue</p>
                  <p className="text-xs text-muted-foreground">{pkg.venue.name}</p>
                  <p className="text-xs text-muted-foreground">{pkg.venue.location} · {pkg.venue.capacity}</p>
                </div>
              </div>

              {/* Entertainment */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-aurora-light-blue flex items-center justify-center flex-shrink-0">
                  <Music className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Entertainment</p>
                  <p className="text-xs text-muted-foreground">{pkg.entertainment.name}</p>
                  <p className="text-xs text-muted-foreground">{pkg.entertainment.type}</p>
                </div>
              </div>

              {/* Catering */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-aurora-light-blue flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Catering</p>
                  <p className="text-xs text-muted-foreground">{pkg.catering.name}</p>
                  <p className="text-xs text-muted-foreground">{pkg.catering.menu}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Total Package</span>
                  <span className="font-display text-xl font-bold text-primary">€{pkg.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">4.8 avg</span>
                </div>
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="w-full bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Request Contact Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={onStartOver} className="text-sm text-primary font-semibold hover:underline">← Start Over</button>
      </div>
    </div>
  );
};

export default PackageResults;

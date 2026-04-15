import { Sun } from "lucide-react";

interface AuroraHeaderProps {
  onSaveExit?: () => void;
  onBackToPackages?: () => void;
  showSaveExit?: boolean;
  showBackToPackages?: boolean;
}

const AuroraHeader = ({ onSaveExit, onBackToPackages, showSaveExit, showBackToPackages }: AuroraHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Sun className="w-[18px] h-[18px] text-primary-foreground" />
        </div>
        <span className="font-display text-xl font-bold text-primary">Aurora</span>
      </div>
      <div className="flex items-center gap-3">
        {showBackToPackages && (
          <button onClick={onBackToPackages} className="text-sm font-semibold text-primary flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            ← Back to Packages
          </button>
        )}
        {showSaveExit && (
          <button onClick={onSaveExit} className="text-sm text-muted-foreground border border-border rounded-md px-4 py-2 hover:bg-muted transition-colors">
            Save & Exit
          </button>
        )}
      </div>
    </header>
  );
};

export default AuroraHeader;

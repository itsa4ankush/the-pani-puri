import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateStepProps {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const DateStep = ({ selectedDate, onDateChange, onNext, onBack }: DateStepProps) => {
  const [viewYear, setViewYear] = useState(2025);
  const [viewMonth, setViewMonth] = useState(7); // August

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handleSelect = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateChange(dateStr);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const formatSelected = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : null;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">When's the party?</h2>
        <p className="text-muted-foreground">Pick a date and we'll check venue availability in Rotterdam</p>
      </div>

      {/* Calendar */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-muted rounded-md transition-colors">
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <h3 className="font-display font-semibold text-lg text-primary">{MONTHS[viewMonth]} {viewYear}</h3>
          <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-md transition-colors">
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map(i => <div key={`b${i}`} />)}
          {days.map(day => {
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            return (
              <button
                key={day}
                onClick={() => handleSelect(day)}
                className={`h-10 rounded-md text-sm font-medium transition-colors ${
                  isSelected ? "bg-primary text-primary-foreground" : "hover:bg-aurora-light-blue text-foreground"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-aurora-light-blue rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-primary font-medium">Selected: {formatSelected}</p>
        </div>
      )}

      {/* Tip */}
      <div className="bg-card border border-border rounded-lg p-4 mb-8">
        <p className="text-xs text-muted-foreground">
          💡 <strong className="text-foreground">Tip:</strong> Saturdays in summer fill up fast in Rotterdam. Booking 6-8 weeks ahead gives you the best venue options.
        </p>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm text-primary hover:underline">← Back to start</button>
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className="bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Set Your Budget
        </button>
      </div>
    </div>
  );
};

export default DateStep;

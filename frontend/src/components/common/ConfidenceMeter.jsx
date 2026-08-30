import React from 'react';

export const ConfidenceMeter = ({ label = 'AI Confidence', value = 90, subtext }) => {
  const getColor = (v) => {
    if (v >= 90) return 'bg-emerald-600';
    if (v >= 75) return 'bg-civic';
    if (v >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-charcoal-muted">{label}</span>
        <span className="font-mono font-bold text-charcoal">{value}%</span>
      </div>
      <div className="w-full bg-canvas-muted rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-1.5 rounded-full transition-all duration-500 ${getColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      {subtext && <p className="text-[11px] text-charcoal-subtle">{subtext}</p>}
    </div>
  );
};

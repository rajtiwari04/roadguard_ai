import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { activeToast } = useCivic();

  if (!activeToast) return null;

  const { message, type } = activeToast;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-charcoal text-white rounded-lg p-4 shadow-modal flex items-start space-x-3 border border-charcoal-muted/30 transition-all duration-300 animate-slide-up">
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
      {type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
      {type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
      <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
        {message}
      </div>
    </div>
  );
};

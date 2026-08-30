import React from 'react';

export const StatusBadge = ({ status }) => {
  const getStyle = () => {
    switch (status) {
      case 'Resolution Verified':
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Under Repair':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Forwarded':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Community Verified':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'AI Verified':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Reported':
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${getStyle()}`}>
      {status}
    </span>
  );
};

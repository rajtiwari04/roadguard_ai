import React from 'react';

export const SeverityBadge = ({ severity, size = 'normal' }) => {
  const getStyles = () => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'low':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const px = size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center rounded-md border font-medium ${px} ${getStyles()}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        severity?.toLowerCase() === 'critical' ? 'bg-red-600' :
        severity?.toLowerCase() === 'high' ? 'bg-orange-500' :
        severity?.toLowerCase() === 'medium' ? 'bg-amber-500' : 'bg-blue-600'
      }`}></span>
      {severity}
    </span>
  );
};

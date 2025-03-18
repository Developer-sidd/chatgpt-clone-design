
import React from 'react';

const MastercardLogo = ({ className = "h-8 w-auto" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <div className="bg-mastercard-red rounded-full w-7 h-7 absolute left-0"></div>
        <div className="bg-mastercard-orange rounded-full w-7 h-7 absolute left-4"></div>
        <span className="ml-12 font-bold text-lg text-white">Mastercard</span>
      </div>
    </div>
  );
};

export default MastercardLogo;

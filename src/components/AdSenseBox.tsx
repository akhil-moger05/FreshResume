import React from 'react';

interface Props {
  slotId?: string;
  className?: string;
}

export const AdSenseBox: React.FC<Props> = ({ slotId = 'banner-top', className = '' }) => {
  return (
    <div
      className={`no-print border border-dashed border-slate-300 bg-slate-50/70 rounded-lg p-3 text-center my-4 ${className}`}
      data-ad-slot={slotId}
    >
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-2 pb-1.5 border-b border-slate-200/60 mb-2">
        <span className="tracking-wider uppercase">Advertisement</span>
        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">Google AdSense</span>
      </div>
      <div className="h-16 sm:h-20 flex flex-col items-center justify-center text-slate-400 text-xs gap-1">
        <p className="font-medium text-slate-500">Google AdSense Responsive Ad Unit</p>
        <p className="text-[11px] text-slate-400">Ad slot ID: ca-pub-freshresume-{slotId}</p>
      </div>
    </div>
  );
};

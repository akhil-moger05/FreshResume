import React from 'react';
import { ResumeData } from '../../types/resume';
import { TemplateSimple } from './TemplateSimple';
import { TemplateModern } from './TemplateModern';
import { TemplateClean } from './TemplateClean';
import { Sparkles } from 'lucide-react';

interface Props {
  data: ResumeData;
  onUpgradeClick?: () => void;
}

export const ResumeRenderer: React.FC<Props> = ({ data, onUpgradeClick }) => {
  const isPremium = !!data.isPremium;

  return (
    <div
      id="printable-resume"
      className="print-resume-container bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 relative flex flex-col justify-between"
      style={{
        minHeight: '297mm', // A4 aspect height
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
      }}
    >
      {/* Resume Content */}
      <div className="flex-1">
        {data.template === 'modern' ? (
          <TemplateModern data={data} />
        ) : data.template === 'clean' ? (
          <TemplateClean data={data} />
        ) : (
          <TemplateSimple data={data} />
        )}
      </div>

      {/* Watermark Section */}
      {!isPremium ? (
        <div className="border-t border-gray-100 py-2.5 px-6 bg-slate-50 flex items-center justify-between text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Created free with</span>
            <span className="font-bold text-blue-600">FreshResume.in</span>
            <span>• Free ATS Resume Maker for Freshers</span>
          </div>
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              type="button"
              className="no-print inline-flex items-center gap-1 text-[10px] text-blue-700 bg-blue-100 hover:bg-blue-200 px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              Remove Watermark (₹49)
            </button>
          )}
        </div>
      ) : (
        <div className="no-print py-1 px-4 text-right bg-emerald-50 text-[10px] text-emerald-700 font-medium">
          ✨ Premium Resume (Watermark removed)
        </div>
      )}
    </div>
  );
};

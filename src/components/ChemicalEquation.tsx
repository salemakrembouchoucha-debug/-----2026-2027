import React from 'react';

interface ChemicalEquationProps {
  reactants: string; // Left side: المواد المتفاعلة على اليسار
  products: string; // Right side: المواد الناتجة على اليمين
  arrowCondition?: string; // Condition above arrow, e.g. "طاقة حرارية"
  isThermalDecomposition?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  highlightProducts?: boolean;
}

export const ChemicalEquation: React.FC<ChemicalEquationProps> = ({
  reactants,
  products,
  arrowCondition,
  isThermalDecomposition = false,
  className = '',
  size = 'md',
  highlightProducts = false,
}) => {
  const condition = arrowCondition || (isThermalDecomposition ? 'طاقة حرارية' : undefined);

  const textSize =
    size === 'sm'
      ? 'text-xs'
      : size === 'lg'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  const arrowWidth = size === 'sm' ? 'w-8 h-3.5' : size === 'lg' ? 'w-14 h-5' : 'w-11 h-4';

  return (
    <div
      dir="ltr"
      className={`inline-flex items-center justify-center gap-2 sm:gap-3 py-1.5 px-3 sm:px-4 rounded-xl border border-slate-200 bg-slate-50/90 shadow-2xs font-extrabold ${className}`}
    >
      {/* 1. Left Side: Reactants (المواد المتفاعلة على اليسار) */}
      <span
        dir="rtl"
        className={`font-black text-slate-900 ${textSize} tracking-tight whitespace-normal text-right`}
      >
        {reactants}
      </span>

      {/* 2. Middle: Arrow with optional condition above it (e.g. طاقة حرارية) */}
      <div className="flex flex-col items-center justify-center px-1 shrink-0">
        {condition ? (
          <span
            dir="rtl"
            className="text-[10px] sm:text-xs font-black text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/80 mb-0.5 whitespace-nowrap shadow-2xs"
          >
            {condition}
          </span>
        ) : (
          <span className="h-3 text-[10px] opacity-0 select-none">ـ</span>
        )}

        <svg viewBox="0 0 50 16" className={`${arrowWidth} text-slate-700 stroke-current fill-current`}>
          <line x1="2" y1="8" x2="43" y2="8" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="41,3 49,8 41,13" />
        </svg>
      </div>

      {/* 3. Right Side: Products (المواد الناتجة على اليمين) */}
      <span
        dir="rtl"
        className={`font-black ${
          highlightProducts ? 'text-emerald-700' : 'text-slate-900'
        } ${textSize} tracking-tight whitespace-normal text-right`}
      >
        {products}
      </span>
    </div>
  );
};

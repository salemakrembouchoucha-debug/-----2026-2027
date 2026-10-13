import React from 'react';
import { DiagramConfig } from '../types/quiz';

interface DiagramRendererProps {
  diagram: DiagramConfig;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  diagram,
  className = '',
  size = 'md',
}) => {
  const heightClass =
    size === 'sm' ? 'h-36' : size === 'lg' ? 'h-64 sm:h-72' : 'h-48 sm:h-56';

  switch (diagram.type) {
    case 'dalton_sphere':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 ${className}`}>
          <svg viewBox="0 0 160 160" className={`w-auto ${heightClass}`}>
            <defs>
              <radialGradient id="daltonSphereGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="40%" stopColor="#f97316" />
                <stop offset="85%" stopColor="#c2410c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <filter id="sphereShadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25" />
              </filter>
            </defs>
            <circle cx="80" cy="80" r="60" fill="url(#daltonSphereGrad)" filter="url(#sphereShadow)" />
          </svg>
          <span className="text-xs font-semibold text-amber-800 mt-1">نموذج العالم جون دالتون (كرة صلبة مصمتة)</span>
        </div>
      );

    case 'thomson_model':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 ${className}`}>
          <svg viewBox="0 0 160 160" className={`w-auto ${heightClass}`}>
            <defs>
              <radialGradient id="thomsonGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </radialGradient>
            </defs>
            {/* Positive cloud sphere */}
            <circle cx="80" cy="80" r="62" fill="url(#thomsonGrad)" stroke="#a16207" strokeWidth="2" />
            {/* Large + signs in background */}
            <text x="80" y="86" fontSize="38" fontWeight="bold" fill="#78350f" textAnchor="middle" opacity="0.35">+</text>
            <text x="45" y="60" fontSize="22" fontWeight="bold" fill="#78350f" textAnchor="middle" opacity="0.3">+</text>
            <text x="115" y="60" fontSize="22" fontWeight="bold" fill="#78350f" textAnchor="middle" opacity="0.3">+</text>
            <text x="50" y="115" fontSize="22" fontWeight="bold" fill="#78350f" textAnchor="middle" opacity="0.3">+</text>
            <text x="110" y="115" fontSize="22" fontWeight="bold" fill="#78350f" textAnchor="middle" opacity="0.3">+</text>

            {/* Negative electrons distributed around perimeter and inside */}
            {[
              { cx: 80, cy: 30 },
              { cx: 120, cy: 50 },
              { cx: 130, cy: 80 },
              { cx: 115, cy: 110 },
              { cx: 80, cy: 130 },
              { cx: 45, cy: 110 },
              { cx: 30, cy: 80 },
              { cx: 40, cy: 50 },
              { cx: 65, cy: 75 },
              { cx: 95, cy: 85 },
            ].map((e, idx) => (
              <g key={idx}>
                <circle cx={e.cx} cy={e.cy} r="9" fill="#0284c7" stroke="#075985" strokeWidth="1.5" />
                <line x1={e.cx - 5} y1={e.cy} x2={e.cx + 5} y2={e.cy} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </g>
            ))}
          </svg>
          <span className="text-xs font-semibold text-amber-800 mt-1">نموذج طومسون (شحنة موجبة تتخللها إلكترونات سالبة)</span>
        </div>
      );

    case 'bohr_model':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-sky-50/50 rounded-xl border border-sky-200/60 ${className}`}>
          <svg viewBox="0 0 190 190" className={`w-auto ${heightClass}`}>
            {/* Concentric circular orbits */}
            <circle cx="95" cy="95" r="28" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="95" cy="95" r="50" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="95" cy="95" r="72" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Central nucleus */}
            <circle cx="95" cy="95" r="16" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            <text x="95" y="100" fontSize="16" fontWeight="bold" fill="#ffffff" textAnchor="middle">+</text>

            {/* Electrons on orbits */}
            {/* Shell 1 */}
            <circle cx="95" cy="67" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="95" cy="123" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            {/* Shell 2 */}
            <circle cx="45" cy="95" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="145" cy="95" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="130" cy="130" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            {/* Shell 3 */}
            <circle cx="95" cy="23" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="95" cy="167" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />

            {/* Labels as in textbook */}
            <text x="175" y="25" fontSize="10" fill="#0369a1" fontWeight="bold" textAnchor="end">إلكترون</text>
            <line x1="102" y1="23" x2="140" y2="23" stroke="#0369a1" strokeWidth="1" />
            <text x="25" y="115" fontSize="10" fill="#991b1b" fontWeight="bold">نواة</text>
            <line x1="45" y1="112" x2="80" y2="100" stroke="#991b1b" strokeWidth="1" />
          </svg>
          <span className="text-xs font-semibold text-sky-800 mt-1">نموذج بور (مدارات دائرية محددة تدور فيها الإلكترونات)</span>
        </div>
      );

    case 'aluminum_atom':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 200 200" className={`w-auto ${heightClass}`}>
            {/* Shells */}
            <circle cx="100" cy="100" r="32" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="56" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1.5" />

            {/* Nucleus with 13P 14N */}
            <circle cx="100" cy="100" r="22" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            <text x="100" y="96" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">13P</text>
            <text x="100" y="108" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">14N</text>

            {/* 13 electrons (2 in shell 1, 8 in shell 2, 3 in shell 3) */}
            {/* Shell 1 (2) */}
            <circle cx="100" cy="68" r="4.5" fill="#2563eb" />
            <circle cx="100" cy="132" r="4.5" fill="#2563eb" />
            {/* Shell 2 (8) */}
            <circle cx="100" cy="44" r="4.5" fill="#2563eb" />
            <circle cx="100" cy="156" r="4.5" fill="#2563eb" />
            <circle cx="44" cy="100" r="4.5" fill="#2563eb" />
            <circle cx="156" cy="100" r="4.5" fill="#2563eb" />
            <circle cx="60" cy="60" r="4.5" fill="#2563eb" />
            <circle cx="140" cy="60" r="4.5" fill="#2563eb" />
            <circle cx="60" cy="140" r="4.5" fill="#2563eb" />
            <circle cx="140" cy="140" r="4.5" fill="#2563eb" />
            {/* Shell 3 (3) */}
            <circle cx="100" cy="20" r="4.5" fill="#2563eb" />
            <circle cx="169" cy="140" r="4.5" fill="#2563eb" />
            <circle cx="31" cy="140" r="4.5" fill="#2563eb" />
          </svg>
          <span className="text-xs font-semibold text-slate-700 mt-1">نموذج ذرة الألمنيوم (Aluminium)</span>
        </div>
      );

    case 'beryllium_atom':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 170 170" className={`w-auto ${heightClass}`}>
            <circle cx="85" cy="85" r="32" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="85" cy="85" r="58" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Nucleus Be */}
            <circle cx="85" cy="85" r="20" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <text x="85" y="90" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">Be</text>
            {/* 4 electrons */}
            <circle cx="85" cy="53" r="5" fill="#dc2626" />
            <circle cx="85" cy="117" r="5" fill="#dc2626" />
            <circle cx="85" cy="27" r="5" fill="#dc2626" />
            <circle cx="85" cy="143" r="5" fill="#dc2626" />
          </svg>
          <span className="text-xs font-semibold text-slate-700 mt-1">نموذج ذرة عنصر البريليوم (Be)</span>
        </div>
      );

    case 'lithium_atom_mcq':
    case 'lithium_atom_diagram':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 220 200" className={`w-auto ${heightClass}`}>
            {/* Shell orbits */}
            <ellipse cx="110" cy="100" rx="38" ry="36" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <ellipse cx="110" cy="100" rx="72" ry="68" fill="none" stroke="#64748b" strokeWidth="1.5" />

            {/* Nucleus in center (3 protons +, neutrons) */}
            <circle cx="110" cy="100" r="22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="103" cy="94" r="6" fill="#fbbf24" />
            <text x="103" y="97" fontSize="8" fontWeight="bold" fill="#78350f" textAnchor="middle">+</text>
            <circle cx="117" cy="94" r="6" fill="#fbbf24" />
            <text x="117" y="97" fontSize="8" fontWeight="bold" fill="#78350f" textAnchor="middle">+</text>
            <circle cx="110" cy="108" r="6" fill="#fbbf24" />
            <text x="110" y="111" fontSize="8" fontWeight="bold" fill="#78350f" textAnchor="middle">+</text>
            <circle cx="102" cy="105" r="5" fill="#cbd5e1" />
            <circle cx="118" cy="105" r="5" fill="#cbd5e1" />

            {/* Electrons (3 total: 2 in inner, 1 in outer) */}
            <circle cx="110" cy="64" r="6.5" fill="#6366f1" stroke="#4338ca" strokeWidth="1.5" />
            <line x1="106" y1="64" x2="114" y2="64" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

            <circle cx="110" cy="136" r="6.5" fill="#6366f1" stroke="#4338ca" strokeWidth="1.5" />
            <line x1="106" y1="136" x2="114" y2="136" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

            <circle cx="182" cy="100" r="7" fill="#6366f1" stroke="#4338ca" strokeWidth="1.5" />
            <line x1="178" y1="100" x2="186" y2="100" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

            {diagram.type === 'lithium_atom_diagram' && (
              <>
                {/* Pointer A: Electron in outer shell */}
                <rect x="180" y="25" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="191" y="39" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">A</text>
                <line x1="191" y1="45" x2="182" y2="92" stroke="#0f172a" strokeWidth="1.2" />

                {/* Pointer B: Orbit / Shell */}
                <rect x="180" y="145" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="191" y="159" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">B</text>
                <line x1="180" y1="150" x2="152" y2="132" stroke="#0f172a" strokeWidth="1.2" />

                {/* Pointer C: Nucleus */}
                <rect x="20" y="45" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="31" y="59" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">C</text>
                <line x1="42" y1="58" x2="95" y2="95" stroke="#0f172a" strokeWidth="1.2" />

                {/* Pointer D: Inner electron */}
                <rect x="20" y="125" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="31" y="139" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">D</text>
                <line x1="42" y1="130" x2="104" y2="134" stroke="#0f172a" strokeWidth="1.2" />
              </>
            )}
          </svg>
          <span className="text-xs font-semibold text-slate-700 mt-1">نموذج ذرة عنصر الليثيوم (Li)</span>
        </div>
      );

    case 'boron_atom_essay':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 200 200" className={`w-auto ${heightClass}`}>
            <circle cx="100" cy="100" r="36" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="72" fill="none" stroke="#64748b" strokeWidth="1.5" />
            {/* Nucleus containing 5 clearly marked Protons (+) */}
            <circle cx="100" cy="100" r="25" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />

            {/* 5 Protons with '+' sign in the nucleus */}
            {/* Proton 1 (top left) */}
            <circle cx="93" cy="92" r="5.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <text x="93" y="95" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">+</text>

            {/* Proton 2 (top right) */}
            <circle cx="107" cy="92" r="5.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <text x="107" y="95" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">+</text>

            {/* Proton 3 (center) */}
            <circle cx="100" cy="100" r="5.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <text x="100" y="103" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">+</text>

            {/* Proton 4 (bottom left) */}
            <circle cx="93" cy="108" r="5.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <text x="93" y="111" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">+</text>

            {/* Proton 5 (bottom right) */}
            <circle cx="107" cy="108" r="5.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <text x="107" y="111" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">+</text>

            {/* 5 electrons (2 in inner shell, 3 in outer shell) */}
            {/* Inner shell (2) */}
            <circle cx="100" cy="64" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
            <line x1="97" y1="64" x2="103" y2="64" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="100" cy="136" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
            <line x1="97" y1="136" x2="103" y2="136" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

            {/* Outer shell (3) */}
            <circle cx="100" cy="28" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
            <line x1="97" y1="28" x2="103" y2="28" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="38" cy="136" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
            <line x1="35" y1="136" x2="41" y2="136" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="162" cy="136" r="5.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
            <line x1="159" y1="136" x2="165" y2="136" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-semibold text-slate-700 mt-1">نموذج ذرة لعنصر البورون (5 بروتونات في النواة و 5 إلكترونات)</span>
        </div>
      );

    case 'ammonia_ball_stick':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-indigo-50/40 rounded-xl border border-indigo-200/60 ${className}`}>
          <svg viewBox="0 0 160 150" className={`w-auto ${heightClass}`}>
            {/* Sticks */}
            <line x1="80" y1="50" x2="40" y2="105" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="50" x2="80" y2="115" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="50" x2="120" y2="105" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />

            {/* Central N atom */}
            <circle cx="80" cy="50" r="24" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="80" y="58" fontSize="20" fontWeight="bold" fill="#ffffff" textAnchor="middle">N</text>

            {/* 3 Hydrogen atoms */}
            <circle cx="40" cy="105" r="16" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <text x="40" y="111" fontSize="15" fontWeight="bold" fill="#334155" textAnchor="middle">H</text>

            <circle cx="80" cy="115" r="16" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <text x="80" y="121" fontSize="15" fontWeight="bold" fill="#334155" textAnchor="middle">H</text>

            <circle cx="120" cy="105" r="16" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <text x="120" y="111" fontSize="15" fontWeight="bold" fill="#334155" textAnchor="middle">H</text>
          </svg>
          <span className="text-xs font-semibold text-indigo-900 mt-1">نموذج الكرة والعصا لجزيء الأمونيا (NH3)</span>
        </div>
      );

    case 'ammonia_space_filling':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-indigo-50/40 rounded-xl border border-indigo-200/60 ${className}`}>
          <svg viewBox="0 0 160 150" className={`w-auto ${heightClass}`}>
            <circle cx="48" cy="98" r="24" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="48" y="104" fontSize="14" fontWeight="bold" fill="#475569" textAnchor="middle">H</text>

            <circle cx="80" cy="105" r="24" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="80" y="111" fontSize="14" fontWeight="bold" fill="#475569" textAnchor="middle">H</text>

            <circle cx="112" cy="98" r="24" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="112" y="104" fontSize="14" fontWeight="bold" fill="#475569" textAnchor="middle">H</text>

            {/* Overlapping large N atom */}
            <circle cx="80" cy="62" r="34" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <text x="80" y="70" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle">N</text>
          </svg>
          <span className="text-xs font-semibold text-indigo-900 mt-1">نموذج ملئ الفراغ لجزيء الأمونيا (NH3)</span>
        </div>
      );

    case 'water_space_filling':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-rose-50/40 rounded-xl border border-rose-200/60 ${className}`}>
          <svg viewBox="0 0 160 140" className={`w-auto ${heightClass}`}>
            {/* Hydrogen atoms behind / overlapping */}
            <circle cx="48" cy="92" r="22" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <text x="48" y="98" fontSize="16" fontWeight="bold" fill="#334155" textAnchor="middle">H</text>

            <circle cx="112" cy="92" r="22" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <text x="112" y="98" fontSize="16" fontWeight="bold" fill="#334155" textAnchor="middle">H</text>

            {/* Central Oxygen atom */}
            <circle cx="80" cy="60" r="32" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
            <text x="80" y="68" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle">O</text>
          </svg>
          <span className="text-xs font-semibold text-rose-900 mt-1">نموذج ملئ الفراغ لجزيء الماء (H2O)</span>
        </div>
      );

    case 'four_molecules_ball_stick':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <div className="grid grid-cols-4 gap-2 w-full max-w-lg text-center">
            {/* Model 1 (Right): Compound */}
            <div className="p-2 border border-slate-200 rounded-lg bg-white flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-1">النموذج 1 (يمين)</span>
              <svg viewBox="0 0 80 80" className="w-16 h-16">
                <circle cx="28" cy="40" r="14" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
                <circle cx="52" cy="40" r="11" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
                <circle cx="28" cy="65" r="14" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
                <circle cx="52" cy="65" r="11" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
                <circle cx="40" cy="18" r="14" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
              </svg>
            </div>
            {/* Model 2: Diatomic Element */}
            <div className="p-2 border border-slate-200 rounded-lg bg-white flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-1">النموذج 2</span>
              <svg viewBox="0 0 80 80" className="w-16 h-16">
                <circle cx="25" cy="30" r="12" fill="#2563eb" />
                <circle cx="45" cy="30" r="12" fill="#2563eb" />
                <circle cx="25" cy="60" r="12" fill="#2563eb" />
                <circle cx="45" cy="60" r="12" fill="#2563eb" />
              </svg>
            </div>
            {/* Model 3: Compound */}
            <div className="p-2 border border-slate-200 rounded-lg bg-white flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-1">النموذج 3</span>
              <svg viewBox="0 0 80 80" className="w-16 h-16">
                <circle cx="25" cy="30" r="12" fill="#1e293b" />
                <circle cx="48" cy="30" r="12" fill="#dc2626" />
                <circle cx="25" cy="60" r="12" fill="#1e293b" />
                <circle cx="48" cy="60" r="12" fill="#dc2626" />
              </svg>
            </div>
            {/* Model 4 (Left): Monatomic/Element */}
            <div className="p-2 border border-slate-200 rounded-lg bg-white flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-1">النموذج 4 (يسار)</span>
              <svg viewBox="0 0 80 80" className="w-16 h-16">
                <circle cx="30" cy="25" r="10" fill="#dc2626" />
                <circle cx="55" cy="25" r="10" fill="#dc2626" />
                <circle cx="30" cy="55" r="10" fill="#dc2626" />
                <circle cx="55" cy="55" r="10" fill="#dc2626" />
              </svg>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-2">نماذج الكرة والعصا لتحديد نوع الجزيء (عنصر أم مركب)</span>
        </div>
      );

    case 'hoffman_voltameter':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-sky-50/50 rounded-xl border border-sky-200/60 ${className}`}>
          <svg viewBox="0 0 200 190" className={`w-auto ${heightClass}`}>
            {/* Two Hoffman tubes */}
            <rect x="50" y="30" width="22" height="90" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <rect x="128" y="30" width="22" height="90" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            {/* Connecting tube bottom */}
            <rect x="65" y="95" width="70" height="15" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            {/* Middle reservoir */}
            <rect x="90" y="15" width="20" height="85" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="100" cy="15" r="14" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />

            {/* Liquid levels and gas collection bubbles */}
            <rect x="51" y="65" width="20" height="54" fill="#38bdf8" opacity="0.6" />
            <rect x="129" y="50" width="20" height="69" fill="#38bdf8" opacity="0.6" />

            {/* Electrodes */}
            <line x1="61" y1="95" x2="61" y2="128" stroke="#0f172a" strokeWidth="3" />
            <line x1="139" y1="95" x2="139" y2="128" stroke="#0f172a" strokeWidth="3" />

            {/* Power labels */}
            <rect x="30" y="132" width="55" height="18" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
            <text x="57" y="145" fontSize="9" fontWeight="bold" fill="#0f172a" textAnchor="middle">القطب الموجب</text>

            <rect x="115" y="132" width="55" height="18" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
            <text x="142" y="145" fontSize="9" fontWeight="bold" fill="#0f172a" textAnchor="middle">القطب السالب</text>

            {/* Power source */}
            <rect x="75" y="160" width="50" height="20" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
            <text x="100" y="174" fontSize="9" fontWeight="bold" fill="#1e293b" textAnchor="middle">مصدر طاقة</text>
            <line x1="61" y1="128" x2="61" y2="170" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="61" y1="170" x2="75" y2="170" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="139" y1="128" x2="139" y2="170" stroke="#2563eb" strokeWidth="1.5" />
            <line x1="139" y1="170" x2="125" y2="170" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
          <span className="text-xs font-semibold text-sky-900 mt-1">جهاز التحليل الكهربائي للماء (فولتامتر هوفمان)</span>
        </div>
      );

    case 'caco3_heating_apparatus':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-amber-50/40 rounded-xl border border-amber-200/60 ${className}`}>
          <svg viewBox="0 0 240 160" className={`w-auto ${heightClass}`}>
            {/* Stand */}
            <line x1="40" y1="140" x2="200" y2="140" stroke="#475569" strokeWidth="3" />
            <line x1="75" y1="40" x2="75" y2="140" stroke="#475569" strokeWidth="2.5" />

            {/* Test tube 1 with CaCO3 */}
            <rect x="40" y="60" width="70" height="16" rx="4" transform="rotate(-15 40 60)" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" />
            <rect x="43" y="62" width="22" height="12" transform="rotate(-15 40 60)" fill="#d97706" opacity="0.8" />
            <text x="45" y="45" fontSize="8" fill="#78350f" fontWeight="bold">كربونات الكالسيوم</text>

            {/* Bunsen burner flame */}
            <polygon points="50,110 46,95 54,95" fill="#f59e0b" />
            <polygon points="50,105 48,93 52,93" fill="#ef4444" />
            <rect x="44" y="110" width="12" height="25" fill="#64748b" />
            <text x="50" y="148" fontSize="8" fill="#475569" textAnchor="middle">موقد بنسن</text>

            {/* Delivery tube */}
            <path d="M 105,45 Q 135,35 155,65 L 155,105" fill="none" stroke="#0284c7" strokeWidth="2.5" />

            {/* Test tube 2 containing limewater [A] */}
            <rect x="145" y="75" width="24" height="55" rx="5" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
            <rect x="147" y="95" width="20" height="32" rx="3" fill="#e0f2fe" opacity="0.8" />
            <rect x="140" y="100" width="18" height="18" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <text x="149" y="113" fontSize="12" fontWeight="bold" fill="#0f172a" textAnchor="middle">A</text>
          </svg>
          <span className="text-xs font-semibold text-amber-900 mt-1">تجربة تسخين كربونات الكالسيوم مع ماء الجير [A]</span>
        </div>
      );

    case 'banana_browning':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 ${className}`}>
          <svg viewBox="0 0 180 140" className={`w-auto ${heightClass}`}>
            {/* Fresh yellow banana */}
            <path d="M 40,30 Q 90,65 140,40 Q 100,105 30,50 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            {/* Brown/black rotting spots representing chemical ripening & browning */}
            <ellipse cx="60" cy="55" rx="8" ry="5" fill="#713f12" />
            <ellipse cx="85" cy="70" rx="12" ry="7" fill="#451a03" />
            <ellipse cx="110" cy="65" rx="10" ry="6" fill="#713f12" />
            <ellipse cx="75" cy="58" rx="6" ry="4" fill="#1c1917" />
            {/* Brown banana on right */}
            <path d="M 50,85 Q 100,120 150,95 Q 110,135 45,95 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" opacity="0.85" />
          </svg>
          <span className="text-xs font-semibold text-amber-900 mt-1">تغير لون ثمار الموز تدريجياً (دليل تغير كيميائي)</span>
        </div>
      );

    case 'magnesium_burning':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl border border-slate-700 ${className}`}>
          <svg viewBox="0 0 180 150" className={`w-auto ${heightClass}`}>
            <defs>
              <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#e0f2fe" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Dark background with brilliant white flash */}
            <circle cx="90" cy="75" r="60" fill="url(#sparkleGrad)" />
            {/* Blinding sparks */}
            <polygon points="90,20 95,70 145,75 95,80 90,130 85,80 35,75 85,70" fill="#ffffff" />
            <polygon points="90,40 93,72 125,75 93,78 90,110 87,78 55,75 87,72" fill="#bae6fd" />
            {/* Ribbon holding tongs */}
            <line x1="20" y1="120" x2="85" y2="78" stroke="#94a3b8" strokeWidth="3" />
          </svg>
          <span className="text-xs font-semibold text-sky-200 mt-1">اشتعال شريط المغنيسيوم بانبعاث ضوء ساطع (أكسدة)</span>
        </div>
      );

    case 'wood_ice_changes':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {/* Wood burning */}
            <div className="p-2.5 border border-amber-300 rounded-lg bg-amber-50/60 flex flex-col items-center text-center">
              <svg viewBox="0 0 80 70" className="w-16 h-14">
                <rect x="15" y="50" width="50" height="10" rx="3" fill="#78350f" transform="rotate(-10 40 55)" />
                <rect x="18" y="48" width="45" height="9" rx="3" fill="#92400e" transform="rotate(12 40 52)" />
                {/* Flames */}
                <polygon points="35,50 30,25 42,35 48,15 55,38 48,50" fill="#ef4444" />
                <polygon points="38,50 34,32 43,40 46,24 51,42 45,50" fill="#f59e0b" />
              </svg>
              <span className="text-xs font-bold text-amber-900 mt-1">حرق الخشب</span>
            </div>
            {/* Ice melting */}
            <div className="p-2.5 border border-cyan-300 rounded-lg bg-cyan-50/60 flex flex-col items-center text-center">
              <svg viewBox="0 0 80 70" className="w-16 h-14">
                {/* Ice cube */}
                <polygon points="25,30 45,20 65,30 45,40" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                <polygon points="25,30 45,40 45,55 25,45" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1" />
                <polygon points="45,40 65,30 65,45 45,55" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                {/* Water puddle */}
                <ellipse cx="45" cy="58" rx="30" ry="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
              </svg>
              <span className="text-xs font-bold text-cyan-900 mt-1">ذوبان الثلج</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-2">تصنيف التغيرات (تغير فيزيائي أم كيميائي)</span>
        </div>
      );

    case 'heart_anatomy': {
      const highlight = diagram.props?.highlight;
      const showLabelsABCD = diagram.props?.showFullLabelsABCD;

      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-rose-50/40 rounded-xl border border-rose-200/60 ${className}`}>
          <svg viewBox="0 0 240 220" className={`w-auto ${heightClass}`}>
            {/* Superior Vena Cava / blue vessels */}
            <path d="M 70,20 L 70,65 Q 70,80 85,85" fill="none" stroke="#2563eb" strokeWidth="14" strokeLinecap="round" />
            <path d="M 65,160 L 65,130" fill="none" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" />

            {/* Aorta (A) - red arch branching */}
            <path d="M 125,75 Q 120,25 155,25 Q 185,25 180,65" fill="none" stroke="#dc2626" strokeWidth="16" strokeLinecap="round" />
            <line x1="145" y1="25" x2="145" y2="10" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
            <line x1="160" y1="25" x2="160" y2="10" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />

            {/* Heart Muscle Body */}
            <path
              d="M 60,85 C 40,110 50,165 115,200 C 180,165 200,110 180,85 C 160,65 130,80 120,95 C 110,80 80,65 60,85 Z"
              fill="#e11d48"
              stroke="#9f1239"
              strokeWidth="2"
            />

            {/* Right Atrium (blue chamber top left) */}
            <path
              d="M 75,85 Q 95,90 95,115 Q 75,120 70,95 Z"
              fill="#3b82f6"
              opacity="0.85"
            />

            {/* Right Ventricle (D) (blue chamber bottom) */}
            <path
              d="M 75,125 Q 110,125 110,175 Q 85,170 75,135 Z"
              fill={highlight === 'right_ventricle' ? '#f59e0b' : '#1d4ed8'}
              stroke={highlight === 'right_ventricle' ? '#b45309' : '#1e40af'}
              strokeWidth={highlight === 'right_ventricle' ? 2.5 : 1}
            />

            {/* Left Atrium (B) (red chamber top right) */}
            <path
              d="M 140,85 Q 165,90 165,110 Q 140,115 135,95 Z"
              fill={highlight === 'left_atrium' ? '#f59e0b' : '#f43f5e'}
              stroke={highlight === 'left_atrium' ? '#b45309' : '#be123c'}
              strokeWidth={highlight === 'left_atrium' ? 2.5 : 1}
            />

            {/* Left Ventricle (thick muscle wall red chamber) */}
            <path
              d="M 125,125 Q 160,125 145,185 Q 122,175 122,135 Z"
              fill="#be123c"
            />

            {/* Septum (C) (central dividing wall) */}
            <path
              d="M 110,120 Q 112,150 115,190 Q 122,185 122,125 Z"
              fill={highlight === 'septum' ? '#f59e0b' : '#881337'}
              stroke={highlight === 'septum' ? '#b45309' : 'none'}
              strokeWidth={highlight === 'septum' ? 2.5 : 0}
            />

            {/* Heart valves */}
            <line x1="78" y1="120" x2="94" y2="120" stroke="#f8fafc" strokeWidth="2.5" />
            <line x1="138" y1="120" x2="154" y2="120" stroke="#f8fafc" strokeWidth="2.5" />

            {/* Pointer for MCQ Highlight */}
            {highlight === 'septum' && (
              <g>
                <line x1="190" y1="150" x2="120" y2="150" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow)" />
                <circle cx="118" cy="150" r="4" fill="#0f172a" />
              </g>
            )}
            {highlight === 'right_ventricle' && (
              <g>
                <line x1="30" y1="175" x2="85" y2="155" stroke="#0f172a" strokeWidth="2" />
                <circle cx="85" cy="155" r="4" fill="#0f172a" />
              </g>
            )}
            {highlight === 'left_atrium' && (
              <g>
                <line x1="205" y1="65" x2="155" y2="95" stroke="#0f172a" strokeWidth="2" />
                <circle cx="155" cy="95" r="4" fill="#0f172a" />
              </g>
            )}

            {/* Full labels A, B, C, D for Essay Question */}
            {showLabelsABCD && (
              <>
                {/* Pointer A -> Aorta */}
                <rect x="180" y="15" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="191" y="29" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">A</text>
                <line x1="180" y1="25" x2="155" y2="28" stroke="#0f172a" strokeWidth="1.5" />

                {/* Pointer B -> Left Atrium */}
                <rect x="190" y="80" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="201" y="94" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">B</text>
                <line x1="190" y1="90" x2="160" y2="98" stroke="#0f172a" strokeWidth="1.5" />

                {/* Pointer C -> Septum */}
                <rect x="190" y="140" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="201" y="154" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">C</text>
                <line x1="190" y1="150" x2="120" y2="155" stroke="#0f172a" strokeWidth="1.5" />

                {/* Pointer D -> Right Ventricle */}
                <rect x="25" y="150" width="22" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                <text x="36" y="164" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">D</text>
                <line x1="47" y1="160" x2="88" y2="155" stroke="#0f172a" strokeWidth="1.5" />
              </>
            )}
          </svg>
          <span className="text-xs font-semibold text-rose-900 mt-1">
            {showLabelsABCD
              ? 'رسم تخطيطي لتركيب القلب بالحروف (A, B, C, D)'
              : highlight === 'septum'
              ? 'السهم يشير إلى الحاجز القلبي'
              : highlight === 'right_ventricle'
              ? 'السهم يشير إلى البطين الأيمن'
              : highlight === 'left_atrium'
              ? 'السهم يشير إلى الأذين الأيسر'
              : 'رسم تخطيطي لتشريح القلب وحجراته'}
          </span>
        </div>
      );
    }

    case 'blood_vessel_artery':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-rose-50/50 rounded-xl border border-rose-200/60 ${className}`}>
          <svg viewBox="0 0 160 120" className={`w-auto ${heightClass}`}>
            {/* Thick muscular artery wall (red/pink layers) */}
            <ellipse cx="80" cy="60" rx="55" ry="45" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
            <ellipse cx="80" cy="60" rx="42" ry="34" fill="#fb7185" />
            {/* Narrow lumen */}
            <ellipse cx="80" cy="60" rx="22" ry="17" fill="#4c0519" stroke="#9f1239" strokeWidth="1.5" />
          </svg>
          <span className="text-xs font-semibold text-rose-900 mt-1">شريان (جدار عضلي سميك وتجويف ضيق)</span>
        </div>
      );

    case 'blood_vessel_vein':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-blue-50/50 rounded-xl border border-blue-200/60 ${className}`}>
          <svg viewBox="0 0 160 120" className={`w-auto ${heightClass}`}>
            {/* Thinner vein wall (blue/purple) */}
            <ellipse cx="80" cy="60" rx="60" ry="45" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            {/* Wide lumen */}
            <ellipse cx="80" cy="60" rx="48" ry="34" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
            {/* Internal pocket valves */}
            <path d="M 45,60 Q 65,50 80,60" fill="none" stroke="#93c5fd" strokeWidth="2" />
            <path d="M 115,60 Q 95,50 80,60" fill="none" stroke="#93c5fd" strokeWidth="2" />
          </svg>
          <span className="text-xs font-semibold text-blue-900 mt-1">وريد (جدار أرق وتجويف واسع وصمامات)</span>
        </div>
      );

    case 'blood_vessel_capillary':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-violet-50/50 rounded-xl border border-violet-200/60 ${className}`}>
          <svg viewBox="0 0 160 120" className={`w-auto ${heightClass}`}>
            {/* Extremely thin capillary wall (single layer of cells with junctions) */}
            <ellipse cx="80" cy="60" rx="40" ry="30" fill="none" stroke="#c084fc" strokeWidth="3" strokeDasharray="18 4" />
            <ellipse cx="80" cy="60" rx="36" ry="26" fill="#f5d0fe" opacity="0.6" />
            {/* Red blood cell passing in single file */}
            <ellipse cx="80" cy="60" rx="16" ry="12" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
          </svg>
          <span className="text-xs font-semibold text-violet-900 mt-1">شعيرة دموية (جدار رقيق جداً من طبقة واحدة)</span>
        </div>
      );

    case 'blood_vessels_comparison_abc':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <div className="grid grid-cols-3 gap-2 w-full max-w-md text-center">
            {/* Vessel A: Vein (Wide lumen, blue/purple) */}
            <div className="p-2 border border-slate-200 rounded-lg bg-white flex flex-col items-center">
              <span className="text-xs font-bold text-slate-700 mb-1">الوعاء [A]</span>
              <svg viewBox="0 0 80 65" className="w-20 h-16">
                <ellipse cx="40" cy="32" rx="34" ry="25" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
                <ellipse cx="40" cy="32" rx="27" ry="19" fill="#1e3a8a" />
              </svg>
            </div>
            {/* Vessel B: Capillary (Very thin, single-celled) */}
            <div className="p-2 border border-slate-200 rounded-lg bg-white flex flex-col items-center">
              <span className="text-xs font-bold text-slate-700 mb-1">الوعاء [B]</span>
              <svg viewBox="0 0 80 65" className="w-20 h-16">
                <ellipse cx="40" cy="32" rx="20" ry="15" fill="#fdf4ff" stroke="#c084fc" strokeWidth="2" strokeDasharray="12 3" />
                <ellipse cx="40" cy="32" rx="10" ry="7" fill="#ef4444" />
              </svg>
            </div>
            {/* Vessel C: Artery (Thick muscular wall, red/pink, narrow lumen) */}
            <div className="p-2 border border-slate-200 rounded-lg bg-white flex flex-col items-center">
              <span className="text-xs font-bold text-slate-700 mb-1">الوعاء [C]</span>
              <svg viewBox="0 0 80 65" className="w-20 h-16">
                <ellipse cx="40" cy="32" rx="32" ry="24" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
                <ellipse cx="40" cy="32" rx="24" ry="18" fill="#fb7185" />
                <ellipse cx="40" cy="32" rx="12" ry="9" fill="#4c0519" />
              </svg>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-2">مقارنة قطاعات الأوعية الدموية (A: وريد ، B: شعيرة دموية ، C: شريان)</span>
        </div>
      );

    default:
      return null;
  }
};

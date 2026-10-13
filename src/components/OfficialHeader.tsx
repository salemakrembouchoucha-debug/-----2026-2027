import React from 'react';

interface OfficialHeaderProps {
  studentName?: string;
  studentSection?: string;
  dateStr?: string;
  onStudentNameChange?: (name: string) => void;
  onStudentSectionChange?: (sec: string) => void;
  isPrintVersion?: boolean;
}

export const OfficialHeader: React.FC<OfficialHeaderProps> = ({
  studentName = '',
  studentSection = '',
  dateStr = '',
  onStudentNameChange,
  onStudentSectionChange,
  isPrintVersion = false,
}) => {
  return (
    <header className={`w-full bg-white border-b-2 border-slate-300 ${isPrintVersion ? 'pb-3 mb-4' : 'shadow-sm p-4 sm:p-5 rounded-2xl mb-6 border'}`}>
      {/* Official 3-Line Institutional Heading */}
      <div className="flex flex-col items-center justify-center text-center space-y-1">
        {/* State of Qatar Emblem Placeholder / Flag colors */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
          <span className="text-xs tracking-widest text-slate-500 font-semibold uppercase">State of Qatar • دولة قطر</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#8A1538]"></span>
        </div>

        <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          وزارة التربية والتعليم والتعليم العالي – دولة قطر
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-[#8A1538] leading-tight">
          مدرسة الريان الخاصة
        </h2>
        <h3 className="text-sm sm:text-base font-bold text-emerald-800 leading-tight">
          تحت إشراف قسم العلوم
        </h3>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
          <span className="bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
            أوراق عمل رفع كفاءة – منتصف الفصل الدراسي الأول
          </span>
          <span className="bg-amber-100/70 text-amber-900 px-3 py-1 rounded-md border border-amber-200">
            الصف الثامن الإعدادي (2026 م / 2027 م)
          </span>
          <span className="bg-emerald-50 text-emerald-900 px-3 py-1 rounded-md border border-emerald-200">
            برنامج التدريبات العلاجية / الإثرائية
          </span>
        </div>
      </div>

      {/* Student Details Bar */}
      <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span className="font-bold text-slate-800 whitespace-nowrap">اسم الطالب:</span>
          {isPrintVersion ? (
            <span className="border-b border-dashed border-slate-500 flex-1 min-h-[1.2rem] inline-block font-semibold text-slate-900">
              {studentName || '...........................................'}
            </span>
          ) : (
            <input
              type="text"
              placeholder="اكتب اسمك هنا..."
              value={studentName}
              onChange={(e) => onStudentNameChange && onStudentNameChange(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-slate-800 font-medium placeholder:text-slate-400 text-xs sm:text-sm"
            />
          )}
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span className="font-bold text-slate-800 whitespace-nowrap">الصف:</span>
          {isPrintVersion ? (
            <span className="font-semibold text-slate-900">الثامن / {studentSection || '.......'}</span>
          ) : (
            <div className="flex items-center gap-1 w-full">
              <span className="text-slate-600 font-semibold">الثامن /</span>
              <input
                type="text"
                placeholder="الشعبة..."
                value={studentSection}
                onChange={(e) => onStudentSectionChange && onStudentSectionChange(e.target.value)}
                className="bg-transparent border-none outline-none w-20 text-slate-800 font-medium placeholder:text-slate-400 text-xs sm:text-sm"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span className="font-bold text-slate-800 whitespace-nowrap">التاريخ:</span>
          <span className="text-slate-600 font-medium">
            {dateStr || (isPrintVersion ? '..... / ..... / 2026 م' : new Date().toLocaleDateString('ar-QA', { year: 'numeric', month: 'long', day: 'numeric' }))}
          </span>
        </div>
      </div>
    </header>
  );
};

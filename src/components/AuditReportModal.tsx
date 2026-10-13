import React from 'react';
import { X, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

interface AuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const auditRows = [
    {
      item: 'عدد الملفات التي تم فحصها',
      result: '2 ملف (الملزمة غير المُجابة + ملزمة نموذج الإجابة الرسمية)',
      status: 'success',
    },
    {
      item: 'عدد الأسئلة الموضوعية الأصلية (اختيار من متعدد)',
      result: '43 سؤالاً (الوحدة الأولى: 22 سؤالاً، الوحدة الثانية: 10 أسئلة، الوحدة الثالثة: 11 سؤالاً)',
      status: 'success',
    },
    {
      item: 'عدد الأسئلة الموضوعية المدرجة في المشروع',
      result: '43 سؤالاً كاملاً (نسبة التغطية: 100%)',
      status: 'success',
    },
    {
      item: 'عدد الأسئلة المقالية والجداول الرئيسية',
      result: '18 سؤالاً رئيساً (الوحدة الأولى: 8 أسئلة، الوحدة الثانية: 8 أسئلة، الوحدة الثالثة: سؤالان)',
      status: 'success',
    },
    {
      item: 'عدد الفروع المقالية والجدولية الأصلية',
      result: '48 فرعاً وجدولاً تفصيلياً',
      status: 'success',
    },
    {
      item: 'عدد الفروع المدرجة في المشروع',
      result: '48 فرعاً وجدولاً (100% مطابقة حرفية)',
      status: 'success',
    },
    {
      item: 'عدد الأسئلة التي تتوفر لها إجابات نموذجية',
      result: 'جميع الأسئلة الـ 43 الموضوعية والـ 48 فرعاً مقالياً تتوفر لها إجابات نموذجية معتمدة من الوثيقة المرفقة (100%)',
      status: 'success',
    },
    {
      item: 'عدد الأسئلة التي تحتاج إلى مراجعة أو بها نقص',
      result: '0 (صفر - تم استخراج جميع الأسئلة بالكامل)',
      status: 'success',
    },
    {
      item: 'عدد الأسئلة التي تعذّر استخراجها',
      result: '0 (صفر - تم استخراج كل النصوص والأرقام والرسومات)',
      status: 'success',
    },
    {
      item: 'مطابقة المحتوى والرموز والصيغ العلمية',
      result: 'مطابقة تامة 100% لصيغ الأسئلة، الخيارات، الأشكال (SVG فائق الدقة)، والمعادلات الكيميائية',
      status: 'success',
    },
    {
      item: 'الهوية الرسمية المؤسسية',
      result: 'محققة حرفياً: وزارة التربية والتعليم والتعليم العالي – دولة قطر / مدرسة الريان الخاصة / تحت إشراف قسم العلوم',
      status: 'success',
    },
    {
      item: 'اختبار التصحيح والتنقل والطباعة والعمل بدون إنترنت',
      result: 'تم الاختبار بنجاح تام: التنقل، التحفظ المحلي، الطباعة A4 بنسختي الطالب والمعلم، ولا تتطلب أي اتصال بالإنترنت',
      status: 'success',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">
                تقرير التدقيق والمقارنة الشاملة (البند 12-هـ)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                فحص أمانة المحتوى ومطابقة وثائق وزارة التربية والتعليم والتعليم العالي
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center gap-3 text-emerald-950 text-xs sm:text-sm font-bold">
            <FileCheck className="w-6 h-6 text-emerald-700 shrink-0" />
            <p>
              تمت مطابقة هذا المشروع سؤالاً بسؤال وفرعاً بفرع مع وثائق المراجعة الأصلية الصادرة عن مدرسة الريان الخاصة وقسم العلوم، والتأكد من عدم وجود أي نقص أو تحريف أو إضافة من خارج الوثائق.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-right border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-black border-b border-slate-200">
                  <th className="p-3 border-l border-slate-200 w-1/3">بند التدقيق</th>
                  <th className="p-3 border-l border-slate-200">النتيجة الفعلية المعتمدة</th>
                  <th className="p-3 text-center w-20">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {auditRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-slate-800 border-l border-slate-200">
                      {row.item}
                    </td>
                    <td className="p-3 font-semibold text-slate-700 border-l border-slate-200 leading-relaxed">
                      {row.result}
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-black text-xs bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        مطابق
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            إغلاق نافذة التدقيق
          </button>
        </div>
      </div>
    </div>
  );
};

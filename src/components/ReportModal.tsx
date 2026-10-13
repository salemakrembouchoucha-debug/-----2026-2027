import React from 'react';
import { ALL_MCQS, ALL_ESSAYS } from '../data/scienceReviewData';
import { ChemicalEquation } from './ChemicalEquation';
import { CheckCircle2, XCircle, AlertCircle, RotateCcw, X, Award, FileSpreadsheet } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  userMcqAnswers: Record<string, string>;
  userEssayAnswers: Record<string, string>;
  onRetryQuestion: (questionId: string) => void;
  onOpenAudit: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  studentName,
  userMcqAnswers,
  userEssayAnswers,
  onRetryQuestion,
  onOpenAudit,
}) => {
  if (!isOpen) return null;

  const totalMcqs = ALL_MCQS.length;
  const answeredMcqs = ALL_MCQS.filter((q) => userMcqAnswers[q.id]);
  const answeredMcqsCount = answeredMcqs.length;
  const unansweredMcqsCount = totalMcqs - answeredMcqsCount;

  const correctMcqs = ALL_MCQS.filter(
    (q) => userMcqAnswers[q.id] === q.correctOptionId
  );
  const correctMcqsCount = correctMcqs.length;

  const wrongMcqs = ALL_MCQS.filter(
    (q) => userMcqAnswers[q.id] && userMcqAnswers[q.id] !== q.correctOptionId
  );
  const wrongMcqsCount = wrongMcqs.length;

  const scorePercentage =
    answeredMcqsCount > 0 ? Math.round((correctMcqsCount / totalMcqs) * 100) : 0;

  // Total essay subquestions answered
  let totalEssayParts = 0;
  let answeredEssayParts = 0;
  ALL_ESSAYS.forEach((eq) => {
    eq.subQuestions.forEach((sq) => {
      totalEssayParts++;
      if (userEssayAnswers[sq.id]?.trim()) {
        answeredEssayParts++;
      }
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">
                تقرير مستوى التحصيل والمراجعة
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                مدرسة الريان الخاصة – قسم العلوم – الصف الثامن
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Greeting */}
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-sm">
            <span className="font-bold text-slate-700">
              الطالب: <span className="text-[#8A1538] font-black">{studentName || 'طالب متميز'}</span>
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-md">
              المنهج القطري المعتمد
            </span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block mb-1">إجمالي الأسئلة</span>
              <span className="text-2xl font-black text-slate-900">{totalMcqs}</span>
            </div>

            <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200">
              <span className="text-xs font-bold text-blue-700 block mb-1">تمت الإجابة</span>
              <span className="text-2xl font-black text-blue-900">{answeredMcqsCount}</span>
            </div>

            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 block mb-1">إجابات صحيحة</span>
              <span className="text-2xl font-black text-emerald-800">{correctMcqsCount}</span>
            </div>

            <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
              <span className="text-xs font-bold text-rose-700 block mb-1">إجابات خاطئة</span>
              <span className="text-2xl font-black text-rose-800">{wrongMcqsCount}</span>
            </div>
          </div>

          {/* Overall Score Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-100 block">نسبة الإتقان في الأسئلة الموضوعية:</span>
              <span className="text-3xl font-black tracking-tight">{scorePercentage}%</span>
            </div>
            <div className="text-left text-xs text-emerald-100 space-y-0.5">
              <p>• أسئلة غير مجابة: {unansweredMcqsCount}</p>
              <p>• فروع مقالية تمت محاولتها: {answeredEssayParts} من {totalEssayParts}</p>
            </div>
          </div>

          {/* Wrong Questions Breakdown */}
          <div>
            <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              الأسئلة التي تحتاج إلى إعادة تركيز ومحاولة ({wrongMcqs.length}):
            </h4>

            {wrongMcqs.length === 0 ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-sm font-bold text-emerald-900 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                {answeredMcqsCount === 0
                  ? 'لم تقم بحل أي أسئلة بعد. ابدأ الحل لتظهر نتائجك هنا!'
                  : 'ممتاز جداً! لا توجد إجابات خاطئة مسجلة في أسئلتك المجابة.'}
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto p-1">
                {wrongMcqs.map((q) => {
                  const studentOption = q.options.find((o) => o.id === userMcqAnswers[q.id]);
                  const correctOption = q.options.find((o) => o.id === q.correctOptionId);

                  return (
                    <div
                      key={q.id}
                      className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <p className="font-extrabold text-slate-900">
                          [{q.unitTitle}] س{q.originalNumber}: {q.text}
                        </p>
                        {q.equation && (
                          <div className="py-1">
                            <ChemicalEquation
                              reactants={q.equation.reactants}
                              products={q.equation.products}
                              arrowCondition={q.equation.arrowCondition}
                              size="sm"
                            />
                          </div>
                        )}
                        <div className="text-slate-600">
                          <span className="text-rose-700 font-bold">إجابتك: ({userMcqAnswers[q.id]}) {studentOption?.text}</span>
                          <span className="mx-2">•</span>
                          <span className="text-emerald-700 font-bold">النموذج الرسمي: ({q.correctOptionId}) {correctOption?.text}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onRetryQuestion(q.id);
                          onClose();
                        }}
                        className="bg-white hover:bg-rose-100 text-rose-800 font-bold px-2.5 py-1 rounded-lg border border-rose-300 flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> إعادة الحل
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Audit Link Button */}
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">
              الأسئلة المقالية تعتمد على المقارنة الذاتية بالنموذج الرسمي.
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenAudit();
              }}
              className="text-[#8A1538] hover:underline font-extrabold flex items-center gap-1"
            >
              <FileSpreadsheet className="w-4 h-4" />
              عرض جدول التدقيق الشامل
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            إغلاق التقرير
          </button>
        </div>
      </div>
    </div>
  );
};

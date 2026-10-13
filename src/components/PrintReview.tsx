import React, { useState } from 'react';
import { ALL_MCQS, ALL_ESSAYS, ALL_TABLES, UNITS } from '../data/scienceReviewData';
import { OfficialHeader } from './OfficialHeader';
import { DiagramRenderer } from './DiagramRenderer';
import { ChemicalEquation } from './ChemicalEquation';
import { Printer, CheckSquare, Square, FileText } from 'lucide-react';

interface PrintReviewProps {
  studentName: string;
  studentSection: string;
}

export const PrintReview: React.FC<PrintReviewProps> = ({
  studentName,
  studentSection,
}) => {
  const [printMode, setPrintMode] = useState<'student' | 'teacher'>('student');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  const filteredMcqs = ALL_MCQS.filter(
    (q) => selectedUnit === 'all' || q.unitId === selectedUnit
  );
  const filteredEssays = ALL_ESSAYS.filter(
    (q) => selectedUnit === 'all' || q.unitId === selectedUnit
  );
  const filteredTables = ALL_TABLES.filter(
    (q) => selectedUnit === 'all' || q.unitId === selectedUnit
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Print Controls Bar - Hidden when printing */}
      <div className="no-print bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500">اختر نوع النسخة:</span>
          <button
            onClick={() => setPrintMode('student')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              printMode === 'student'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            نسخة الطالب (أوراق عمل غير مُجابة للحل الورقي)
          </button>
          <button
            onClick={() => setPrintMode('teacher')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              printMode === 'teacher'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-emerald-300" />
            نسخة المعلم (دليل الإجابات النموذجية الرسمية)
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Unit Filter */}
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-800 outline-none"
          >
            <option value="all">طباعة المراجعة كاملة (جميع الوحدات)</option>
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.numberArabic}: {u.title}
              </option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="bg-[#8A1538] hover:bg-[#6c102c] text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            طباعة المراجعة (Ctrl + P)
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto print:p-0 print:border-none print:shadow-none print:max-w-none">
        {/* Official Header */}
        <OfficialHeader
          studentName={studentName}
          studentSection={studentSection}
          isPrintVersion={true}
        />

        {/* Notice badge if Teacher mode */}
        {printMode === 'teacher' && (
          <div className="mb-4 p-2.5 bg-emerald-100 border-2 border-emerald-600 rounded-lg text-center text-xs font-black text-emerald-900 print:border-black">
            ★★★ دليل الإجابة النموذجي الرسمي – مخصص للمعلم وقسم العلوم ★★★
          </div>
        )}

        {/* Loop through Units */}
        {UNITS.filter((u) => selectedUnit === 'all' || u.id === selectedUnit).map((unit) => {
          const unitMcqs = filteredMcqs.filter((q) => q.unitId === unit.id);
          const unitEssays = filteredEssays.filter((q) => q.unitId === unit.id);
          const unitTables = filteredTables.filter((q) => q.unitId === unit.id);

          return (
            <div key={unit.id} className="space-y-6 mb-8">
              {/* Unit Header Banner */}
              <div className="bg-amber-100/90 border-r-4 border-amber-600 p-2.5 rounded text-slate-900 font-black text-base print:bg-slate-200 print:border-black">
                {unit.numberArabic}: {unit.title}
              </div>

              {/* MCQs Section */}
              {unitMcqs.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-800 bg-slate-100 px-3 py-1.5 rounded border border-slate-200 print:bg-slate-100">
                    اختر الإجابة الصحيحة فيما يلي:
                  </h4>

                  <div className="space-y-4">
                    {unitMcqs.map((mcq) => (
                      <div
                        key={mcq.id}
                        className="avoid-break p-3 rounded-lg border border-slate-200 bg-slate-50/30 print:bg-white print:border-slate-300"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-slate-900 leading-snug">
                            <span className="font-black text-[#8A1538] print:text-black ml-1">
                              .{mcq.originalNumber}
                            </span>{' '}
                            {mcq.text}
                          </p>
                        </div>

                        {/* Diagram if present */}
                        {mcq.diagram && (
                          <div className="my-2 max-w-xs mx-auto">
                            <DiagramRenderer diagram={mcq.diagram} size="sm" />
                          </div>
                        )}

                        {/* Chemical Equation if present */}
                        {mcq.equation && (
                          <div className="my-2 flex justify-center">
                            <ChemicalEquation
                              reactants={mcq.equation.reactants}
                              products={mcq.equation.products}
                              arrowCondition={mcq.equation.arrowCondition}
                              size="sm"
                            />
                          </div>
                        )}

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {mcq.options.map((opt) => {
                            const isCorrectOption =
                              printMode === 'teacher' && opt.id === mcq.correctOptionId;

                            return (
                              <div
                                key={opt.id}
                                className={`flex items-center gap-2 p-1.5 rounded border text-xs leading-tight ${
                                  isCorrectOption
                                    ? 'bg-emerald-100 border-emerald-600 font-black text-emerald-950 print:bg-emerald-50 print:border-black'
                                    : 'border-slate-200 bg-white text-slate-800'
                                }`}
                              >
                                <span className="w-5 h-5 rounded border border-slate-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                                  {opt.id}
                                </span>
                                <span className="flex-1">{opt.text}</span>
                                {isCorrectOption && (
                                  <span className="text-[10px] font-black text-emerald-700 print:text-black shrink-0">
                                    [الإجابة النموذجية]
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Essay & Tables Section */}
              {(unitEssays.length > 0 || unitTables.length > 0) && (
                <div className="space-y-5 pt-4">
                  <h4 className="font-extrabold text-sm text-slate-800 bg-slate-100 px-3 py-1.5 rounded border border-slate-200 print:bg-slate-100">
                    ثانياً: الأسئلة المقالية
                  </h4>

                  {/* Essays */}
                  {unitEssays.map((essay) => (
                    <div
                      key={essay.id}
                      className="avoid-break p-3.5 rounded-lg border border-slate-200 bg-white print:border-slate-300 space-y-3"
                    >
                      <div className="border-b border-slate-100 pb-1.5">
                        <span className="font-black text-sm text-[#8A1538] print:text-black">
                          {essay.originalTitle}:
                        </span>{' '}
                        {essay.introText && (
                          <span className="text-xs font-bold text-slate-800">
                            {essay.introText}
                          </span>
                        )}
                      </div>

                      {/* Diagram if present */}
                      {essay.diagram && (
                        <div className="my-2 max-w-sm mx-auto">
                          <DiagramRenderer diagram={essay.diagram} size="md" />
                        </div>
                      )}

                      {/* Chemical Equation if attached to the question intro */}
                      {essay.equation && (
                        <div className="my-2 flex justify-center">
                          <ChemicalEquation
                            reactants={essay.equation.reactants}
                            products={essay.equation.products}
                            arrowCondition={essay.equation.arrowCondition}
                            size="sm"
                          />
                        </div>
                      )}

                      {/* Sub-questions */}
                      <div className="space-y-3">
                        {essay.subQuestions.map((sub) => (
                          <div key={sub.id} className="text-xs space-y-1.5 avoid-break">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex-1 space-y-1">
                                <div className="font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                                  <span className="font-black text-slate-700">
                                    -{sub.partNumber}
                                  </span>
                                  {sub.text ? <span>{sub.text}</span> : null}
                                  {/* Chemical Equation for sub-question (Reactants on left, Products on right) */}
                                  {sub.equation && (
                                    <ChemicalEquation
                                      reactants={sub.equation.reactants}
                                      products={sub.equation.products}
                                      arrowCondition={sub.equation.arrowCondition}
                                      size="sm"
                                    />
                                  )}
                                </div>
                              </div>

                              {/* Attached Diagram for sub-question (e.g. Question 5 branches 1 and 2) */}
                              {sub.diagram && (
                                <div className="shrink-0 max-w-[130px] self-center sm:self-start my-1">
                                  <DiagramRenderer diagram={sub.diagram} size="sm" />
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="font-bold text-slate-700 shrink-0">الإجابة:</span>
                              {printMode === 'teacher' ? (
                                <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 print:border-black print:text-black">
                                  {sub.officialAnswer}
                                </span>
                              ) : (
                                <div className="border-b border-dashed border-slate-400 flex-1 min-h-[1.5rem]"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Tables */}
                  {unitTables.map((tbl) => (
                    <div
                      key={tbl.id}
                      className="avoid-break p-3 rounded-lg border border-slate-200 bg-white print:border-slate-300 space-y-2"
                    >
                      <h5 className="font-black text-xs text-slate-900">
                        {tbl.originalTitle}
                      </h5>

                      {tbl.id === 'u3_table_1' && (
                        <div className="my-2 max-w-xs mx-auto">
                          <DiagramRenderer
                            diagram={{ type: 'blood_vessels_comparison_abc' }}
                            size="sm"
                          />
                        </div>
                      )}

                      <table className="w-full text-center border-collapse border border-slate-300 text-xs">
                        <thead>
                          <tr className="bg-slate-100 text-slate-900 font-extrabold">
                            {tbl.columns.map((c, idx) => (
                              <th key={idx} className="p-1.5 border border-slate-300">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tbl.rows.map((row) => (
                            <tr key={row.id}>
                              {row.values.map((v, vIdx) => (
                                <td key={vIdx} className="p-1.5 border border-slate-300">
                                  {v.isBlank ? (
                                    printMode === 'teacher' ? (
                                      <span className="font-black text-emerald-700 print:text-black">
                                        {v.officialAnswer}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400">.......................</span>
                                    )
                                  ) : (
                                    <span className="font-bold text-slate-800">{v.text}</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer of Printout */}
        <div className="mt-8 pt-4 border-t-2 border-slate-300 text-center text-xs font-bold text-slate-600 print:block">
          <p>مدرسة الريان الخاصة – تحت إشراف قسم العلوم – مراجعة العلوم للصف الثامن</p>
          <p className="text-[10px] text-slate-500 mt-0.5">هذه الملزمة لا تغني عن الكتاب المدرسي</p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ALL_MCQS, ALL_ESSAYS, ALL_TABLES, UNITS } from '../data/scienceReviewData';
import { McqQuestion, EssayQuestion, TableQuestion } from '../types/quiz';
import { DiagramRenderer } from './DiagramRenderer';
import { ChemicalEquation } from './ChemicalEquation';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RefreshCw, Eye, BookOpen, AlertCircle } from 'lucide-react';

interface InteractiveQuizProps {
  studentName: string;
  onOpenReport: () => void;
  userMcqAnswers: Record<string, string>;
  setUserMcqAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  userEssayAnswers: Record<string, string>;
  setUserEssayAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  userTableAnswers: Record<string, string>;
  setUserTableAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  userMcqAnswers,
  setUserMcqAnswers,
  userEssayAnswers,
  setUserEssayAnswers,
  userTableAnswers,
  setUserTableAnswers,
  onOpenReport,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'mcq' | 'essay' | 'table'>('mcq');
  const [currentMcqIndex, setCurrentMcqIndex] = useState<number>(0);
  const [currentEssayIndex, setCurrentEssayIndex] = useState<number>(0);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Filter questions based on selected unit
  const filteredMcqs: McqQuestion[] = ALL_MCQS.filter(
    (q) => selectedUnit === 'all' || q.unitId === selectedUnit
  );

  const filteredEssays: EssayQuestion[] = ALL_ESSAYS.filter(
    (q) => selectedUnit === 'all' || q.unitId === selectedUnit
  );

  const filteredTables: TableQuestion[] = ALL_TABLES.filter(
    (q) => selectedUnit === 'all' || q.unitId === selectedUnit
  );

  // Safely clamp active index
  const safeMcqIndex = Math.min(currentMcqIndex, Math.max(0, filteredMcqs.length - 1));
  const safeEssayIndex = Math.min(currentEssayIndex, Math.max(0, filteredEssays.length - 1));

  const currentMcq = filteredMcqs[safeMcqIndex];
  const currentEssay = filteredEssays[safeEssayIndex];

  // Helper to handle MCQ selection
  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserMcqAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Helper to toggle solution reveal
  const toggleSolution = (key: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Stats calculation
  const totalMcqsCount = filteredMcqs.length;
  const answeredMcqsCount = filteredMcqs.filter((q) => userMcqAnswers[q.id]).length;
  const correctMcqsCount = filteredMcqs.filter(
    (q) => userMcqAnswers[q.id] === q.correctOptionId
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Filter & Navigation Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Unit Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">الوحدة:</span>
          <button
            onClick={() => {
              setSelectedUnit('all');
              setCurrentMcqIndex(0);
              setCurrentEssayIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              selectedUnit === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            جميع الوحدات (الكل)
          </button>
          {UNITS.map((unit) => (
            <button
              key={unit.id}
              onClick={() => {
                setSelectedUnit(unit.id);
                setCurrentMcqIndex(0);
                setCurrentEssayIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedUnit === unit.id
                  ? 'bg-[#8A1538] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {unit.numberArabic}: {unit.title}
            </button>
          ))}
        </div>

        {/* Tab Selector: MCQs vs Essay Questions vs Tables */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto justify-center">
          <button
            onClick={() => setActiveTab('mcq')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'mcq'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            أسئلة الاختيار من متعدد ({filteredMcqs.length})
          </button>
          <button
            onClick={() => setActiveTab('essay')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'essay'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            الأسئلة المقالية ({filteredEssays.length})
          </button>
          {filteredTables.length > 0 && (
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              الجداول العلمية ({filteredTables.length})
            </button>
          )}
        </div>
      </div>

      {/* Quick Progress Indicator */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-300">التقدم:</span>
            <span className="font-black text-amber-400">
              {answeredMcqsCount} من {totalMcqsCount} مجاب
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-300">الإجابات الصحيحة:</span>
            <span className="font-black text-emerald-400">{correctMcqsCount}</span>
          </div>
        </div>

        <button
          onClick={onOpenReport}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 text-xs shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          عرض التقرير الشامل
        </button>
      </div>

      {/* MCQ Section */}
      {activeTab === 'mcq' && currentMcq && (
        <div className="space-y-4">
          {/* Question Grid Navigator */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600">الانتقال السريع بين الأسئلة:</span>
              <span className="text-xs font-semibold text-slate-500">
                سؤال {safeMcqIndex + 1} من {filteredMcqs.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
              {filteredMcqs.map((q, idx) => {
                const ans = userMcqAnswers[q.id];
                const isCorrect = ans && ans === q.correctOptionId;
                const isWrong = ans && ans !== q.correctOptionId;
                const isCurrent = idx === safeMcqIndex;

                let badgeClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (isCorrect) badgeClass = 'bg-emerald-600 text-white font-bold';
                else if (isWrong) badgeClass = 'bg-rose-500 text-white font-bold';
                else if (ans) badgeClass = 'bg-blue-600 text-white font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentMcqIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all ${badgeClass} ${
                      isCurrent ? 'ring-2 ring-slate-900 ring-offset-2 scale-105 font-black' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Question Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-6">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#8A1538] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  {currentMcq.unitTitle} • صفحة {currentMcq.pageNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2 leading-relaxed">
                  <span className="text-emerald-700 font-extrabold ml-2">سؤال {currentMcq.originalNumber}.</span>
                  {currentMcq.text}
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                اختر إجابة واحدة
              </span>
            </div>

            {/* Scientific Diagram if exists */}
            {currentMcq.diagram && (
              <div className="my-2">
                <DiagramRenderer diagram={currentMcq.diagram} size="md" />
              </div>
            )}

            {/* Chemical Equation if exists (Reactants on left, Products on right) */}
            {currentMcq.equation && (
              <div className="my-3 flex justify-center">
                <ChemicalEquation
                  reactants={currentMcq.equation.reactants}
                  products={currentMcq.equation.products}
                  arrowCondition={currentMcq.equation.arrowCondition}
                  size="md"
                />
              </div>
            )}

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentMcq.options.map((opt) => {
                const isSelected = userMcqAnswers[currentMcq.id] === opt.id;
                const isRevealed = revealedSolutions[currentMcq.id];
                const isCorrect = opt.id === currentMcq.correctOptionId;

                let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (isSelected && !isRevealed) {
                  optionStyle = isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30'
                    : 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-500/30';
                } else if (isRevealed) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-600';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold line-through';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentMcq.id, opt.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-right transition-all cursor-pointer ${optionStyle}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-sm sm:text-base font-semibold leading-snug flex-1">
                      {opt.text}
                    </span>
                    {isSelected && (
                      <span className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Message */}
            {userMcqAnswers[currentMcq.id] && (
              <div
                className={`p-4 rounded-xl text-sm font-bold flex items-center justify-between gap-3 ${
                  userMcqAnswers[currentMcq.id] === currentMcq.correctOptionId
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {userMcqAnswers[currentMcq.id] === currentMcq.correctOptionId ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>إجابة صحيحة وفق النموذج الرسمي للوزارة! ({currentMcq.correctOptionId})</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>إجابة غير صحيحة. الإجابة الصحيحة في النموذج الرسمي هي: ({currentMcq.correctOptionId})</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleSelectOption(currentMcq.id, '')}
                  className="text-xs bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-slate-300 text-slate-700 flex items-center gap-1 font-bold shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> إعادة المحاولة
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={safeMcqIndex === 0}
                onClick={() => setCurrentMcqIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="w-4 h-4" /> السؤال السابق
              </button>

              <button
                onClick={() => toggleSolution(currentMcq.id)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                <Eye className="w-3.5 h-3.5" />
                {revealedSolutions[currentMcq.id] ? 'إخفاء مفتاح الحل' : 'إظهار مفتاح الحل'}
              </button>

              <button
                disabled={safeMcqIndex === filteredMcqs.length - 1}
                onClick={() => setCurrentMcqIndex((prev) => Math.min(filteredMcqs.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#8A1538] hover:bg-[#6c102c] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                السؤال التالي <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Essay Questions Section */}
      {activeTab === 'essay' && currentEssay && (
        <div className="space-y-4">
          {/* Navigator for Essay Questions */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600">اختر السؤال المقالي:</span>
              <span className="text-xs font-semibold text-slate-500">
                سؤال {safeEssayIndex + 1} من {filteredEssays.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredEssays.map((eq, idx) => (
                <button
                  key={eq.id}
                  onClick={() => setCurrentEssayIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    idx === safeEssayIndex
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {eq.originalTitle} (ص {eq.pageNumber})
                </button>
              ))}
            </div>
          </div>

          {/* Current Essay Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold text-[#8A1538] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                {currentEssay.unitTitle} • صفحة {currentEssay.pageNumber}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                {currentEssay.originalTitle}
              </h3>
              {currentEssay.introText && (
                <p className="text-sm font-bold text-slate-700 mt-1 whitespace-pre-line leading-relaxed">
                  {currentEssay.introText}
                </p>
              )}
            </div>

            {/* Scientific Diagram if attached */}
            {currentEssay.diagram && (
              <div className="my-2">
                <DiagramRenderer diagram={currentEssay.diagram} size="lg" />
              </div>
            )}

            {/* Chemical Equation if attached to the question intro */}
            {currentEssay.equation && (
              <div className="my-3 flex justify-center">
                <ChemicalEquation
                  reactants={currentEssay.equation.reactants}
                  products={currentEssay.equation.products}
                  arrowCondition={currentEssay.equation.arrowCondition}
                  size="md"
                />
              </div>
            )}

            {/* Sub-questions */}
            <div className="space-y-5">
              {currentEssay.subQuestions.map((sub, sIdx) => {
                const subAnswer = userEssayAnswers[sub.id] || '';
                const isRevealed = revealedSolutions[sub.id];

                return (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-sm sm:text-base font-black text-[#8A1538]">
                            ({sub.partNumber})
                          </span>
                          {sub.text ? (
                            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                              {sub.text}
                            </h4>
                          ) : null}
                          {/* Chemical Equation in sub-question (Reactants on left, Products on right) */}
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
                        <div className="shrink-0 max-w-[160px] sm:max-w-[180px] self-center sm:self-start">
                          <DiagramRenderer diagram={sub.diagram} size="sm" />
                        </div>
                      )}

                      <button
                        onClick={() => toggleSolution(sub.id)}
                        className="text-xs font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 px-2.5 py-1 rounded-lg border border-emerald-300 shrink-0 flex items-center gap-1 transition-colors self-start"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {isRevealed ? 'إخفاء الإجابة' : 'إظهار إجابة النموذج'}
                      </button>
                    </div>

                    {/* Student input field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">
                        إجابتك:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="اكتب إجابتك هنا قبل مقارنتها بالنموذج الرسمي..."
                        value={subAnswer}
                        onChange={(e) =>
                          setUserEssayAnswers((prev) => ({
                            ...prev,
                            [sub.id]: e.target.value,
                          }))
                        }
                        className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-[#8A1538] focus:border-[#8A1538] outline-none"
                      />
                    </div>

                    {/* Official Answer Box in Green matching official document */}
                    {isRevealed && (
                      <div className="p-3 bg-emerald-50 rounded-lg border-2 border-emerald-500 space-y-2 animate-fade-in">
                        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>الإجابة النموذجية المعتمدة (الوزارة):</span>
                        </div>
                        <p className="text-sm sm:text-base font-black text-emerald-800 pr-5 whitespace-pre-wrap">
                          {sub.officialAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={safeEssayIndex === 0}
                onClick={() => setCurrentEssayIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="w-4 h-4" /> السؤال المقالي السابق
              </button>

              <button
                disabled={safeEssayIndex === filteredEssays.length - 1}
                onClick={() => setCurrentEssayIndex((prev) => Math.min(filteredEssays.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#8A1538] hover:bg-[#6c102c] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                السؤال المقالي التالي <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scientific Tables Section */}
      {activeTab === 'table' && (
        <div className="space-y-6">
          {filteredTables.map((tbl) => (
            <div
              key={tbl.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-4"
            >
              <div className="border-b border-slate-100 pb-2">
                <span className="text-xs font-extrabold text-[#8A1538] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  {tbl.unitTitle} • صفحة {tbl.pageNumber}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-2">
                  {tbl.originalTitle}
                </h3>
              </div>

              {/* Table Diagram if needed (e.g. Question 1 p20) */}
              {tbl.id === 'u3_table_1' && (
                <div className="my-2">
                  <DiagramRenderer
                    diagram={{ type: 'blood_vessels_comparison_abc' }}
                    size="md"
                  />
                </div>
              )}

              {/* The Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse border border-slate-300 text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-extrabold">
                      {tbl.columns.map((col, cIdx) => (
                        <th key={cIdx} className="p-2.5 border border-slate-300">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tbl.rows.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50">
                        {row.values.map((val, vIdx) => {
                          const cellKey = `${tbl.id}_${row.id}_${vIdx}`;
                          const isBlank = val.isBlank;
                          const userVal = userTableAnswers[cellKey] || '';
                          const isRevealed = revealedSolutions[cellKey];

                          return (
                            <td key={vIdx} className="p-3 border border-slate-300">
                              {!isBlank ? (
                                <span className="font-bold text-slate-800">
                                  {val.text}
                                </span>
                              ) : (
                                <div className="flex flex-col items-center gap-1.5">
                                  <input
                                    type="text"
                                    placeholder="اكتب الإجابة..."
                                    value={userVal}
                                    onChange={(e) =>
                                      setUserTableAnswers((prev) => ({
                                        ...prev,
                                        [cellKey]: e.target.value,
                                      }))
                                    }
                                    className="w-full max-w-xs text-center p-1.5 rounded border border-slate-300 font-semibold text-slate-900 bg-amber-50/40 focus:ring-2 focus:ring-[#8A1538] outline-none"
                                  />
                                  {isRevealed && (
                                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                                      النموذج: {val.officialAnswer}
                                    </span>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Show Table Solutions button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    tbl.rows.forEach((r) => {
                      r.values.forEach((v, vIdx) => {
                        if (v.isBlank) {
                          toggleSolution(`${tbl.id}_${r.id}_${vIdx}`);
                        }
                      });
                    });
                  }}
                  className="text-xs font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  إظهار / إخفاء حلول هذا الجدول
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

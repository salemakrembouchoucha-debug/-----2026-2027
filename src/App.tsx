import React, { useState, useEffect } from 'react';
import { OfficialHeader } from './components/OfficialHeader';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { PrintReview } from './components/PrintReview';
import { ConceptSummary } from './components/ConceptSummary';
import { ReportModal } from './components/ReportModal';
import { AuditReportModal } from './components/AuditReportModal';
import {
  BookOpen,
  Printer,
  Sparkles,
  Award,
  ShieldCheck,
  GraduationCap,
  RotateCcw,
} from 'lucide-react';
import { ALL_MCQS, ALL_ESSAYS, ALL_TABLES } from './data/scienceReviewData';

export default function App() {
  const [activeView, setActiveView] = useState<'quiz' | 'print' | 'summary'>('quiz');
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('qr_student_name') || '';
  });
  const [studentSection, setStudentSection] = useState<string>(() => {
    return localStorage.getItem('qr_student_section') || '';
  });

  const [userMcqAnswers, setUserMcqAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('qr_mcq_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [userEssayAnswers, setUserEssayAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('qr_essay_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [userTableAnswers, setUserTableAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('qr_table_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('qr_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('qr_student_section', studentSection);
  }, [studentSection]);

  useEffect(() => {
    localStorage.setItem('qr_mcq_answers', JSON.stringify(userMcqAnswers));
  }, [userMcqAnswers]);

  useEffect(() => {
    localStorage.setItem('qr_essay_answers', JSON.stringify(userEssayAnswers));
  }, [userEssayAnswers]);

  useEffect(() => {
    localStorage.setItem('qr_table_answers', JSON.stringify(userTableAnswers));
  }, [userTableAnswers]);

  const handleResetProgress = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين جميع الإجابات والبدء من جديد؟')) {
      setUserMcqAnswers({});
      setUserEssayAnswers({});
      setUserTableAnswers({});
      localStorage.removeItem('qr_mcq_answers');
      localStorage.removeItem('qr_essay_answers');
      localStorage.removeItem('qr_table_answers');
    }
  };

  const answeredMcqCount = Object.keys(userMcqAnswers).filter((k) => userMcqAnswers[k]).length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 pb-16 font-['Cairo',sans-serif]">
      {/* Top Navigation Ribbon - Hidden on print */}
      <nav className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#8A1538] text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 block leading-tight">
                مراجعة العلوم – الصف الثامن
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                مدرسة الريان الخاصة • قسم العلوم
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-extrabold">
            <button
              onClick={() => setActiveView('quiz')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === 'quiz'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              المراجعة التفاعلية
            </button>

            <button
              onClick={() => setActiveView('print')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === 'print'
                  ? 'bg-white text-[#8A1538] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-[#8A1538]" />
              أوراق العمل للطباعة (A4)
            </button>

            <button
              onClick={() => setActiveView('summary')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === 'summary'
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              أشياء تعلمتها (المفاهيم)
            </button>
          </div>

          {/* Secondary Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="عرض تقرير النتيجة ومستوى التحصيل"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>النتيجة ({answeredMcqCount}/{ALL_MCQS.length})</span>
            </button>

            <button
              onClick={() => setIsAuditOpen(true)}
              className="flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="سجل التدقيق والمطابقة مع الوثائق الرسمية"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>التدقيق</span>
            </button>

            <button
              onClick={handleResetProgress}
              className="text-xs font-bold text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
              title="إعادة تعيين كافة الإجابات"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* Render Official Header for Interactive & Summary Views */}
        {activeView !== 'print' && (
          <OfficialHeader
            studentName={studentName}
            studentSection={studentSection}
            onStudentNameChange={setStudentName}
            onStudentSectionChange={setStudentSection}
            isPrintVersion={false}
          />
        )}

        {/* View Routing */}
        {activeView === 'quiz' && (
          <InteractiveQuiz
            studentName={studentName}
            userMcqAnswers={userMcqAnswers}
            setUserMcqAnswers={setUserMcqAnswers}
            userEssayAnswers={userEssayAnswers}
            setUserEssayAnswers={setUserEssayAnswers}
            userTableAnswers={userTableAnswers}
            setUserTableAnswers={setUserTableAnswers}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeView === 'print' && (
          <PrintReview
            studentName={studentName}
            studentSection={studentSection}
          />
        )}

        {activeView === 'summary' && <ConceptSummary />}
      </main>

      {/* Modals */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        studentName={studentName}
        userMcqAnswers={userMcqAnswers}
        userEssayAnswers={userEssayAnswers}
        onRetryQuestion={(qId) => {
          setUserMcqAnswers((prev) => {
            const copy = { ...prev };
            delete copy[qId];
            return copy;
          });
          setActiveView('quiz');
        }}
        onOpenAudit={() => setIsAuditOpen(true)}
      />

      <AuditReportModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />
    </div>
  );
}

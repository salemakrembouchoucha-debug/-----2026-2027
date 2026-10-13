import React, { useState } from 'react';
import { UNITS } from '../data/scienceReviewData';
import { DiagramRenderer } from './DiagramRenderer';
import { ChemicalEquation } from './ChemicalEquation';
import { BookMarked, Sparkles } from 'lucide-react';

export const ConceptSummary: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('unit_1');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              «أشياء تعلمتها» – ملخص المفاهيم والخرائط الذهنية
            </h3>
            <p className="text-xs text-slate-500">
              مأخوذة نصاً من صفحات الملزمة الأصلية (ص 2 ، ص 10 ، ص 17)
            </p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {UNITS.map((u) => (
            <button
              key={u.id}
              onClick={() => setActiveUnit(u.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeUnit === u.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {u.numberArabic}: {u.title}
            </button>
          ))}
        </div>
      </div>

      {/* Unit 1 Summary (Page 2) */}
      {activeUnit === 'unit_1' && (
        <div className="space-y-6 animate-fade-in">
          {/* Timeline of Atomic Models */}
          <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-200/70 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h4>تطور النماذج الذرية (الكتاب صفحة 8-9):</h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {/* 1803 Dalton */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
                  1803 م
                </span>
                <span className="text-xs font-bold text-slate-900 mb-2">
                  النموذج الذري للعالم جون دالتون
                </span>
                <DiagramRenderer diagram={{ type: 'dalton_sphere' }} size="sm" />
                <p className="text-[11px] text-slate-600 mt-2 font-medium">الذرة كرة صلبة مصمتة غير قابلة للتجزئة</p>
              </div>

              {/* 1897 Thomson */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
                  1897 م
                </span>
                <span className="text-xs font-bold text-slate-900 mb-2">
                  النموذج الذري للعالم طومسون
                </span>
                <DiagramRenderer diagram={{ type: 'thomson_model' }} size="sm" />
                <p className="text-[11px] text-slate-600 mt-2 font-medium">كرة موجبة مطمور بداخلها إلكترونات سالبة</p>
              </div>

              {/* 1911 Rutherford */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
                  1911 م
                </span>
                <span className="text-xs font-bold text-slate-900 mb-2">
                  النموذج الذري للعالم رذرفورد
                </span>
                <div className="h-36 flex items-center justify-center">
                  <svg viewBox="0 0 140 140" className="w-28 h-28">
                    <ellipse cx="70" cy="70" rx="60" ry="20" fill="none" stroke="#0284c7" strokeWidth="1.5" transform="rotate(30 70 70)" />
                    <ellipse cx="70" cy="70" rx="60" ry="20" fill="none" stroke="#0284c7" strokeWidth="1.5" transform="rotate(-30 70 70)" />
                    <circle cx="70" cy="70" r="14" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
                    <text x="70" y="75" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">+</text>
                  </svg>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 font-medium">نواة صغيرة موجبة تتركز فيها معظم الكتلة</p>
              </div>

              {/* 1913 Bohr */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
                  1913 م
                </span>
                <span className="text-xs font-bold text-slate-900 mb-2">
                  النموذج الذري للعالم بور
                </span>
                <DiagramRenderer diagram={{ type: 'bohr_model' }} size="sm" />
                <p className="text-[11px] text-slate-600 mt-2 font-medium">تدور الإلكترونات في مدارات دائرية محددة</p>
              </div>
            </div>
          </div>

          {/* Elements vs Compounds (Page 2 bottom) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-black text-slate-900">
              العناصر والمركبات (المادة):
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#8A1538]">عنصر</span>
                  <span className="text-xs text-slate-500 font-bold">مثال: الأكسجين ، المغنيسيوم</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                  يتكون العنصر من نوع واحد من الذرات المتماثلة التي ترتبط ببعضها البعض بروابط كيميائية.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#8A1538]">مركّب</span>
                  <span className="text-xs text-slate-500 font-bold">مثال: أكسيد المغنيسيوم</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                  يتكون المركب من اتحاد كيميائي بين ذرات عنصرين مختلفين أو أكثر بنسب ثابتة.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unit 2 Summary (Page 10) */}
      {activeUnit === 'unit_2' && (
        <div className="space-y-6 animate-fade-in">
          {/* Evidences of chemical reaction */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200/70 space-y-3">
            <h4 className="text-sm font-black text-rose-950">
              دلائل حدوث التفاعل الكيميائي (تكون مادة جديدة نواتج):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs font-bold text-slate-800">
              <div className="bg-white p-3 rounded-lg border border-rose-200 shadow-2xs">
                <span className="block text-rose-700 mb-1 font-black">1</span>
                تكون راسب
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose-200 shadow-2xs">
                <span className="block text-rose-700 mb-1 font-black">2</span>
                تصاعد غاز
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose-200 shadow-2xs">
                <span className="block text-rose-700 mb-1 font-black">3</span>
                انبعاث حرارة
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose-200 shadow-2xs">
                <span className="block text-rose-700 mb-1 font-black">4</span>
                انبعاث ضوء
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="block text-rose-700 mb-1 font-black">5</span>
                تغير اللون
              </div>
            </div>
          </div>

          {/* Types of Chemical Reactions */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-black text-slate-900">
              أنواع التفاعلات الكيميائية:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-extrabold text-[#8A1538] block text-sm">تفاعل التعادل:</span>
                <p className="text-slate-700 font-semibold leading-relaxed">
                  تفاعل يحدث بين حمض وقاعدة لتكوين ملح وماء.
                </p>
                <div className="pt-1.5 flex">
                  <ChemicalEquation
                    reactants="حمض + قاعدة"
                    products="ملح + ماء"
                    size="sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-extrabold text-[#8A1538] block text-sm">تفاعل الأكسدة:</span>
                <p className="text-slate-700 font-semibold leading-relaxed">
                  تفاعل يحدث عندما تتحد مادة مع الأكسجين.
                </p>
                <div className="pt-1.5 flex">
                  <ChemicalEquation
                    reactants="نحاس + أكسجين"
                    products="أكسيد النحاس"
                    size="sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-extrabold text-[#8A1538] block text-sm">تفاعل الاحتراق:</span>
                <p className="text-slate-700 font-semibold leading-relaxed">
                  احتراق المادة القابلة للاشتعال بتفاعلها مع الأكسجين في وجود طاقة حرارية.
                </p>
                <div className="pt-1.5 flex">
                  <ChemicalEquation
                    reactants="ميثان + أكسجين"
                    products="ثاني أكسيد الكربون + ماء"
                    size="sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-extrabold text-[#8A1538] block text-sm">تفاعل التفكك الحراري:</span>
                <p className="text-slate-700 font-semibold leading-relaxed">
                  تفاعل يحدث حين تتفكك مادة واحدة إلى مادتين أو أكثر عند تسخينها.
                </p>
                <div className="pt-1.5 flex">
                  <ChemicalEquation
                    reactants="كربونات المغنيسيوم"
                    arrowCondition="طاقة حرارية"
                    products="أكسيد المغنيسيوم + ثاني أكسيد الكربون"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unit 3 Summary (Page 17) */}
      {activeUnit === 'unit_3' && (
        <div className="space-y-6 animate-fade-in">
          {/* Circulatory System Components */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200/70 space-y-3">
            <h4 className="text-sm font-black text-blue-950">
              تركيب الجهاز الدوري:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1.5">
                <span className="font-extrabold text-blue-900 block text-sm">1. القلب:</span>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  عضلة تضخ الدم المؤكسج وغير المؤكسج، ويتكون من أربع حجرات (أذينين وبطينين)، ويوجد بين كل أذين وبطين صمام، كما يوجد حاجز يفصل بين الجانب الأيمن والأيسر.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1.5">
                <span className="font-extrabold text-blue-900 block text-sm">2. الأوعية الدموية:</span>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  أنابيب تحمل الدم من القلب وإليه، وهي ثلاثة أنواع: الشريان، الوريد، والشعيرات الدموية.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1.5">
                <span className="font-extrabold text-blue-900 block text-sm">3. الدم:</span>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  السائل الذي يحمل الأكسجين والغذاء لخلايا الجسم، ويتكون من خلايا دم حمراء وخلايا دم بيضاء وصفائح دموية وبلازما.
                </p>
              </div>
            </div>
          </div>

          {/* Blood Vessels Comparison Table (Page 17) */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse border border-slate-300 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-extrabold">
                  <th className="p-2.5 border border-slate-300">وجه المقارنة</th>
                  <th className="p-2.5 border border-slate-300">الشريان</th>
                  <th className="p-2.5 border border-slate-300">الوريد</th>
                  <th className="p-2.5 border border-slate-300">الشعيرات الدموية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-bold border border-slate-300 bg-slate-50">الوظيفة والاتجاه</td>
                  <td className="p-2.5 border border-slate-300">تنقل الشرايين الدم المؤكسج بعيداً عن القلب</td>
                  <td className="p-2.5 border border-slate-300">تحمل الدم باتجاه القلب</td>
                  <td className="p-2.5 border border-slate-300">تتبادل المواد (الغذاء والأكسجين وثاني أكسيد الكربون) بين الخلايا والدم</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border border-slate-300 bg-slate-50">طبيعة الجدار والضغط</td>
                  <td className="p-2.5 border border-slate-300">جدران مرنة سميكة كي تتحمل الضغط المرتفع للدم</td>
                  <td className="p-2.5 border border-slate-300">جدران أقل سمكاً لأن ضغط الدم فيها منخفض</td>
                  <td className="p-2.5 border border-slate-300">جدران رقيقة جداً تربط شبكة هائلة بين الشرايين والأوردة</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border border-slate-300 bg-slate-50">وجود الصمامات</td>
                  <td className="p-2.5 border border-slate-300">لا تحتوي على صمامات (باستثناء الشرايين الرئيسية قرب القلب)</td>
                  <td className="p-2.5 border border-slate-300 font-extrabold text-blue-900">تحتوي على صمامات لمنع رجوع الدم بالاتجاه المعاكس</td>
                  <td className="p-2.5 border border-slate-300">لا تحتوي على صمامات</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

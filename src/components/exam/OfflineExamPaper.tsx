import React, { useState } from 'react';
import { Printer, Download, ArrowLeft, CheckSquare, FileText, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MockTest, Question } from '../../types';
import { Logo } from '../common/Logo';

interface Props {
  test: MockTest;
  onBack: () => void;
}

export const OfflineExamPaper: React.FC<Props> = ({ test, onBack }) => {
  const { questions: allQuestions, settings } = useApp();
  const [includeOMR, setIncludeOMR] = useState<boolean>(true);

  const testQuestions: Question[] = test.questions && test.questions.length > 0
    ? test.questions
    : allQuestions.filter((q) => test.questionIds?.includes(q.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Action Bar - Hidden in print */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মক টেস্ট তালিকায় ফিরুন</span>
        </button>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeOMR}
              onChange={(e) => setIncludeOMR(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>OMR শিট সংযুক্ত রাখুন</span>
          </label>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট করুন (Print Question Paper)</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (Styling matches West Bengal Board standard question paper) */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-md border border-slate-200 print:border-none print:shadow-none print:p-2 print:m-0">
        {/* Header Block */}
        <div className="text-center border-b-2 border-slate-800 pb-5 mb-6">
          <div className="flex items-center justify-center gap-3 mb-1">
            <Logo size="md" showText={false} />
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
              {settings.centreName || 'EASY TO LEARN'}
            </h1>
          </div>
          <p className="text-sm font-bold text-indigo-900 uppercase tracking-wide">
            {settings.subtitle || 'West Bengal Board Mock Test Portal'}
          </p>
          <div className="text-xs text-slate-600 mt-1">
            {settings.address || 'Kolkata, West Bengal'} | যোগাযোগ: {settings.contactNumber}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-slate-800">
            <div>শ্রেণি: Class {test.classId}</div>
            <div>পূর্ণমান: {test.totalMarks}</div>
            <div>সময়: {test.durationMinutes} মিনিট</div>
            <div>সেশন: {settings.academicYear || '2026-2027'}</div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-3 underline decoration-slate-400 underline-offset-4">
            {test.titleBn || test.title}
          </h2>
        </div>

        {/* Student identification fill-in fields */}
        <div className="border border-slate-400 p-3 rounded-xl mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="font-bold">শিক্ষার্থীর নাম: </span>
            <span className="inline-block border-b border-dotted border-slate-500 w-44" />
          </div>
          <div>
            <span className="font-bold">রোল নম্বর: </span>
            <span className="inline-block border-b border-dotted border-slate-500 w-28" />
          </div>
          <div>
            <span className="font-bold">তারিখ: </span>
            <span className="inline-block border-b border-dotted border-slate-500 w-28" />
          </div>
        </div>

        {/* General Instructions */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700 mb-6 space-y-1">
          <div className="font-bold text-slate-900">সাধারণ নির্দেশাবলী:</div>
          <ol className="list-decimal list-inside space-y-0.5">
            <li>সব প্রশ্নের উত্তর দেওয়া আবশ্যক। প্রতিটি সঠিক উত্তরের জন্য মান ডানপাশে দেওয়া আছে।</li>
            <li>OMR শিটে উত্তর বৃত্ত পূরণের জন্য কালো বা নীল কালির ডট পেন ব্যবহার করুন।</li>
            <li>কোনো প্রকার অসদুপায় অবলম্বন করলে পরীক্ষা বাতিল হবে।</li>
          </ol>
        </div>

        {/* 2-Column Questions Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {testQuestions.map((q, idx) => (
            <div key={q.id} className="text-xs space-y-2 break-inside-avoid">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-slate-900 leading-snug">
                  <span className="font-bold mr-1.5">{idx + 1}.</span>
                  <span>{q.questionBn || q.questionEn}</span>
                </div>
                <span className="font-bold text-slate-600 shrink-0">[{q.marks || 1}]</span>
              </div>

              {/* Options */}
              {q.options && (
                <div className="grid grid-cols-2 gap-1.5 pl-4 text-slate-700">
                  {q.options.map((opt) => (
                    <div key={opt.id} className="flex items-center gap-1.5">
                      <span className="font-bold">({opt.id})</span>
                      <span>{opt.textBn || opt.textEn}</span>
                    </div>
                  ))}
                </div>
              )}

              {q.questionType === 'true_false' && (
                <div className="pl-4 text-slate-600 flex items-center gap-4">
                  <span>(A) সত্য</span>
                  <span>(B) মিথ্যা</span>
                </div>
              )}

              {q.questionType === 'fill_blank' && (
                <div className="pl-4 text-slate-500 italic">
                  উত্তর: _________________________
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Attached OMR Sheet if toggled */}
        {includeOMR && (
          <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-800 break-before-page">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                OFFICIAL OMR ANSWER SHEET
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                {test.titleBn || test.title} – উত্তরপত্র (OMR)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                সঠিক বৃত্তটি সম্পূর্ণ কালো বা নীল পেন দিয়ে পূরণ করুন: (A) (B) (C) (D)
              </p>
            </div>

            {/* OMR Bubble Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 border border-slate-300 rounded-2xl">
              {testQuestions.map((q, idx) => (
                <div key={q.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 w-7">{idx + 1}.</span>
                  <div className="flex items-center gap-2">
                    {['A', 'B', 'C', 'D'].map((bubble) => (
                      <div
                        key={bubble}
                        className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center font-bold text-[10px] text-slate-600 select-none hover:bg-slate-200"
                      >
                        {bubble}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Signatures */}
            <div className="mt-10 pt-8 flex items-center justify-between text-xs text-slate-600 px-4">
              <div className="text-center">
                <div className="w-36 border-b border-slate-400 mb-1" />
                <span>শিক্ষার্থীর পূর্ণ স্বাক্ষর</span>
              </div>
              <div className="text-center">
                <div className="w-36 border-b border-slate-400 mb-1" />
                <span>কক্ষ পরিদর্শকের স্বাক্ষর (Invigilator)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

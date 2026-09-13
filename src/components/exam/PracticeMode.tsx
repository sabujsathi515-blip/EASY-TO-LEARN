import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  HelpCircle,
  Filter,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Question } from '../../types';

export const PracticeMode: React.FC = () => {
  const { questions, classes, subjects, selectedClassId, setSelectedClassId } = useApp();

  const [filterSubjectId, setFilterSubjectId] = useState<string>('all');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  // Filtered practice questions
  const filteredQuestions: Question[] = useMemo(() => {
    return questions.filter((q) => {
      const matchClass = selectedClassId ? q.classId === selectedClassId : true;
      const matchSubject = filterSubjectId === 'all' ? true : q.subjectId === filterSubjectId;
      return matchClass && matchSubject;
    });
  }, [questions, selectedClassId, filterSubjectId]);

  const currentQ = filteredQuestions[selectedQuestionIndex];

  const handleSelectOption = (qId: string, optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionId }));
    setRevealedExplanations((prev) => ({ ...prev, [qId]: true }));
  };

  const handleResetCurrent = (qId: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setRevealedExplanations((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-white/20 backdrop-blur-md inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRACTICE MODE (অনুশীলন মোড)</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">কোনো চাপ নেই, নিজের গতিতে শিখুন</h1>
            <p className="text-sm opacity-90 max-w-xl">
              প্রতিটি প্রশ্নের সাথে সাথে সঠিক উত্তর ও সহজ বাংলা ব্যাখ্যা দেখে ধারণা স্পষ্ট করে নিন।
            </p>
          </div>

          {/* Quick Counter */}
          <div className="px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
            <div className="text-2xl sm:text-3xl font-black">{filteredQuestions.length}</div>
            <div className="text-xs opacity-90">উপলব্ধ প্রশ্ন</div>
          </div>
        </div>
      </div>

      {/* Filter Row: Class & Subject */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Class Selection Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> শ্রেণি:
          </span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
            <button
              key={cls}
              onClick={() => {
                setSelectedClassId(cls);
                setSelectedQuestionIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedClassId === cls
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Class {cls}
            </button>
          ))}
        </div>

        {/* Subject Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">বিষয়:</label>
          <select
            value={filterSubjectId}
            onChange={(e) => {
              setFilterSubjectId(e.target.value);
              setSelectedQuestionIndex(0);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="all">সব বিষয় (All Subjects)</option>
            {subjects
              .filter((s) => (selectedClassId ? s.classId === selectedClassId : true))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameBn || s.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Main Practice Question Card */}
      {currentQ ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8">
          {/* Question Index & Details */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold text-sm flex items-center justify-center">
                {selectedQuestionIndex + 1}
              </span>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                প্রশ্ন {selectedQuestionIndex + 1} / {filteredQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {currentQ.chapter && (
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-medium">
                  অধ্যায়: {currentQ.chapter}
                </span>
              )}
              <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full font-bold">
                মান: {currentQ.marks || 1}
              </span>
            </div>
          </div>

          {/* Question Content */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed mb-6">
            {currentQ.questionBn || currentQ.questionEn}
          </h2>

          {/* Options */}
          {currentQ.options && (
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt) => {
                const userAns = userAnswers[currentQ.id];
                const isSelected = userAns === opt.id;
                const isCorrect = (currentQ.correctAnswer || '').toLowerCase() === opt.id.toLowerCase();
                const hasAnswered = Boolean(userAns);

                let optionStyles =
                  'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800';

                if (hasAnswered) {
                  if (isCorrect) {
                    optionStyles =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-400';
                  } else if (isSelected && !isCorrect) {
                    optionStyles =
                      'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-400';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${optionStyles}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 ${
                          hasAnswered && isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : hasAnswered && isSelected && !isCorrect
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'border-slate-300 text-slate-500'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {opt.textBn || opt.textEn}
                      </span>
                    </div>

                    {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Instant Feedback & Explanation */}
          {userAnswers[currentQ.id] && (
            <div
              className={`p-5 rounded-2xl border-2 transition-all mb-6 ${
                userAnswers[currentQ.id].toLowerCase() === (currentQ.correctAnswer || '').toLowerCase()
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-1">
                {userAnswers[currentQ.id].toLowerCase() === (currentQ.correctAnswer || '').toLowerCase() ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>চমৎকার! আপনার উত্তরটি সঠিক হয়েছে।</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>
                      উত্তরটি ভুল হয়েছে। সঠিক উত্তর হলো: {currentQ.correctAnswer}
                    </span>
                  </>
                )}
              </div>

              {currentQ.explanationBn && (
                <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-slate-700/60 text-xs sm:text-sm leading-relaxed">
                  <span className="font-extrabold text-indigo-700 dark:text-indigo-300">ব্যাখ্যা: </span>
                  <span>{currentQ.explanationBn}</span>
                </div>
              )}
            </div>
          )}

          {/* Navigation and Reset Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={() => handleResetCurrent(currentQ.id)}
              disabled={!userAnswers[currentQ.id]}
              className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>পুনরায় চেষ্টা করুন</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={selectedQuestionIndex === 0}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী</span>
              </button>

              <button
                onClick={() => setSelectedQuestionIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                disabled={selectedQuestionIndex === filteredQuestions.length - 1}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <span>পরবর্তী</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            নির্বাচিত ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 mt-1">দয়া করে অন্য কোনো শ্রেণি বা বিষয় নির্বাচন করুন।</p>
        </div>
      )}
    </div>
  );
};

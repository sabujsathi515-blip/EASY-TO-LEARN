import React from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Trophy,
  RotateCcw,
  Printer,
  FileText,
  X,
  Share2,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TestResult, Question } from '../../types';

interface Props {
  result: TestResult;
  onClose: () => void;
}

export const TestResultModal: React.FC<Props> = ({ result, onClose }) => {
  const { openCertificate, startMockTest, mockTests, showToast } = useApp();

  const matchingTest = mockTests.find((t) => t.id === result.testId);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} মিনিট ${secs} সেকেন্ড`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRetake = () => {
    if (matchingTest) {
      onClose();
      startMockTest(matchingTest, {
        name: result.studentName,
        rollNo: result.studentId,
      });
    } else {
      showToast('এই টেস্টটি বর্তমানে উপলব্ধ নয়', 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95">
        {/* Header Banner */}
        <div
          className={`p-6 sm:p-8 text-white relative flex flex-col items-center text-center ${
            result.isPassed
              ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-indigo-900'
              : 'bg-gradient-to-br from-rose-600 via-pink-700 to-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner border border-white/20">
            {result.isPassed ? (
              <Trophy className="w-9 h-9 text-amber-300" />
            ) : (
              <AlertCircle className="w-9 h-9 text-rose-200" />
            )}
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/20 backdrop-blur-md mb-2">
            {result.isPassed ? 'অভিনন্দন! আপনি উত্তীর্ণ হয়েছেন' : 'উত্তীর্ণ হতে পারেননি (Needs Improvement)'}
          </span>

          <h2 className="text-xl sm:text-2xl font-black">{result.testTitle}</h2>
          <p className="text-sm opacity-90 mt-1">শিক্ষার্থী: {result.studentName}</p>

          {/* Primary Score Counter */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black">{result.obtainedMarks}</span>
            <span className="text-xl sm:text-2xl font-semibold opacity-75">/ {result.totalMarks}</span>
            <span className="ml-2 text-lg sm:text-xl font-bold px-3 py-0.5 rounded-xl bg-white/20">
              {result.percentage}%
            </span>
          </div>
        </div>

        {/* Quick KPI Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-50 dark:bg-slate-700/40 border-b border-slate-200 dark:border-slate-700 text-center">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span>{result.correct}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">সঠিক উত্তর</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-rose-500 font-bold text-lg">
              <XCircle className="w-5 h-5" />
              <span>{result.wrong}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ভুল উত্তর</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-indigo-600 font-bold text-lg">
              <Clock className="w-5 h-5" />
              <span className="text-sm sm:text-base">{Math.round(result.timeTakenSeconds)}s</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">সময় লেগেছে</div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-amber-500 font-bold text-lg">
              <Award className="w-5 h-5" />
              <span>{result.rank ? `#${result.rank}` : 'শীর্ষ ১০'}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">র‌্যাংক (Rank)</div>
          </div>
        </div>

        {/* Question-by-Question Detailed Analysis */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>বিশদ উত্তরপত্র পর্যালোচনা (Answer Review)</span>
            </h3>
            <span className="text-xs text-slate-500">
              মোট {result.questionReviews?.length || result.totalQuestions} টি প্রশ্ন
            </span>
          </div>

          {result.questionReviews && result.questionReviews.length > 0 ? (
            <div className="space-y-4">
              {result.questionReviews.map((rev, idx) => (
                <div
                  key={rev.questionId || idx}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    rev.isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : !rev.studentAnswer
                      ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                      : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                        {rev.questionText}
                      </span>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                        rev.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                          : !rev.studentAnswer
                          ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                      }`}
                    >
                      {rev.isCorrect
                        ? `+${rev.marksAwarded} নম্বর`
                        : !rev.studentAnswer
                        ? 'উত্তর দেননি'
                        : 'ভুল (০ নম্বর)'}
                    </span>
                  </div>

                  {/* Options if MCQ */}
                  {rev.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
                      {rev.options.map((opt) => {
                        const isStudentChoice = rev.studentAnswer === opt.id;
                        const isCorrectChoice = rev.correctAnswer === opt.id;
                        return (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-lg border flex items-center gap-2 ${
                              isCorrectChoice
                                ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-bold dark:bg-emerald-900/40 dark:text-emerald-200'
                                : isStudentChoice && !rev.isCorrect
                                ? 'bg-rose-100/70 border-rose-400 text-rose-900 font-medium dark:bg-rose-900/40 dark:text-rose-200'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                              {opt.id}
                            </span>
                            <span>{opt.textBn || opt.textEn}</span>
                            {isCorrectChoice && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                            {isStudentChoice && !rev.isCorrect && (
                              <XCircle className="w-3.5 h-3.5 text-rose-600 ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Answers recap */}
                  <div className="text-xs mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                      <span className="text-slate-500 shrink-0">আপনার দেওয়া উত্তর: </span>
                      <span
                        className={`font-medium break-words ${
                          rev.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {rev.studentAnswer || 'দেওয়া হয়নি'}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                      <span className="text-slate-500 shrink-0">আদর্শ/সঠিক উত্তর: </span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300 break-words">
                        {rev.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Explanation in Bengali */}
                  {rev.explanation && (
                    <div className="mt-2.5 p-2.5 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 border border-amber-200/50 dark:border-amber-900/40 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">ব্যাখ্যা: </span>
                        <span>{rev.explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-6">
              বিশদ প্রশ্নোত্তর পর্যালোচনা এই রেজাল্টে সংরক্ষিত নেই।
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-700/40 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {result.isPassed && (
              <button
                onClick={() => openCertificate(result)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>সার্টিফিকেট দেখুন (Certificate)</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট করুন</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {matchingTest && (
              <button
                onClick={handleRetake}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>পুনরায় পরীক্ষা দিন (Retake)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

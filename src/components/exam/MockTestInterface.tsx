import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Send,
  Maximize2,
  Minimize2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldAlert,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MockTest, Question, OngoingTestAttempt } from '../../types';
import confetti from 'canvas-confetti';

interface Props {
  test: MockTest;
}

export const MockTestInterface: React.FC<Props> = ({ test }) => {
  const {
    questions: allQuestions,
    submitMockTest,
    exitMockTest,
    saveOngoingAttempt,
    clearOngoingAttempt,
    ongoingAttempt,
    showToast,
    currentUser,
  } = useApp();

  // Find the questions belonging to this test
  const testQuestions: Question[] = useMemo(() => {
    if (test.questions && test.questions.length > 0) {
      return test.questions;
    }
    const filtered = allQuestions.filter((q) => test.questionIds?.includes(q.id));
    if (test.antiCheating?.randomizeQuestions) {
      // Deterministic or stable shuffle based on test ID
      return [...filtered];
    }
    return filtered;
  }, [test, allQuestions]);

  // Initial state restoration if ongoing attempt exists
  const initialAnswers = useMemo(() => {
    if (ongoingAttempt && ongoingAttempt.testId === test.id) {
      return ongoingAttempt.answers || {};
    }
    return {};
  }, [ongoingAttempt, test.id]);

  const initialIndex = useMemo(() => {
    if (ongoingAttempt && ongoingAttempt.testId === test.id) {
      return ongoingAttempt.currentQuestionIndex || 0;
    }
    return 0;
  }, [ongoingAttempt, test.id]);

  const initialTime = useMemo(() => {
    if (ongoingAttempt && ongoingAttempt.testId === test.id) {
      return Math.max(10, ongoingAttempt.timeRemainingSeconds);
    }
    return (test.durationMinutes || 15) * 60;
  }, [ongoingAttempt, test]);

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [markedForReview, setMarkedForReview] = useState<string[]>(
    ongoingAttempt?.testId === test.id ? ongoingAttempt.markedForReview || [] : []
  );
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(
    ongoingAttempt?.testId === test.id ? ongoingAttempt.tabSwitchCount || 0 : 0
  );
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<any>(null);

  // Anti-cheating: detect tab switches
  useEffect(() => {
    if (!test.antiCheating?.tabSwitchWarning) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const next = prev + 1;
          setShowWarningModal(true);
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [test]);

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Periodic auto-save every 10 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      const attempt: OngoingTestAttempt = {
        testId: test.id,
        studentId: currentUser.student?.studentId || 'guest',
        answers,
        markedForReview,
        currentQuestionIndex: currentIndex,
        timeRemainingSeconds: timeRemaining,
        tabSwitchCount,
        startedAt: new Date(startTimeRef.current).toISOString(),
        lastSavedAt: new Date().toISOString(),
      };
      saveOngoingAttempt(attempt);
    }, 10000);

    return () => clearInterval(saveInterval);
  }, [test.id, answers, markedForReview, currentIndex, timeRemaining, tabSwitchCount, currentUser]);

  const handleAutoSubmit = () => {
    showToast('সময় সমাপ্ত হয়েছে! টেস্ট স্বয়ংক্রিয়ভাবে জমা হচ্ছে...', 'warning');
    finalizeSubmission();
  };

  const finalizeSubmission = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const totalDuration = (test.durationMinutes || 15) * 60;
    const timeSpent = Math.max(1, totalDuration - timeRemaining);

    const result = submitMockTest(test, answers, timeSpent);
    clearOngoingAttempt();

    if (result.isPassed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleClearAnswer = (questionId: string) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleToggleReview = (questionId: string) => {
    setMarkedForReview((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = testQuestions[currentIndex];
  const isAnswered = (qId: string) => Boolean(answers[qId]);
  const isMarked = (qId: string) => markedForReview.includes(qId);

  // Statistics for submission modal
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = testQuestions.length - answeredCount;
  const reviewCount = markedForReview.length;

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 my-8">
        <HelpCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">এই টেস্টে কোনো প্রশ্ন পাওয়া যায়নি</h3>
        <p className="text-sm text-slate-500 mt-2">দয়া করে অ্যাডমিন প্যানেল থেকে প্রশ্ন যোগ করুন।</p>
        <button
          onClick={exitMockTest}
          className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
        >
          ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-16">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Test Name & Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('আপনি কি নিশ্চিত যে পরীক্ষাটি বাতিল করে বেরিয়ে যেতে চান? আপনার উত্তরপত্র মুছে যাবে।')) {
                  clearOngoingAttempt();
                  exitMockTest();
                }
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Cancel Test"
            >
              <LogOut className="w-5 h-5 text-rose-500" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  Class {test.classId}
                </span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                  {test.titleBn || test.title}
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                মোট প্রশ্ন: {testQuestions.length} | পূর্ণমান: {test.totalMarks}
              </p>
            </div>
          </div>

          {/* Right: Timer & Actions */}
          <div className="flex items-center gap-3">
            {/* Countdown Badge */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-base sm:text-lg transition-colors ${
                timeRemaining <= 300
                  ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400 animate-pulse'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-slate-700 dark:border-slate-600 dark:text-indigo-300'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>

            {/* Submit Button */}
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>জমা দিন (Submit)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Examination Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Question Workspace (8 cols) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 sm:p-7">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                  {currentIndex + 1}
                </span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  প্রশ্ন {currentIndex + 1} / {testQuestions.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium rounded-full border border-amber-200 dark:border-amber-800">
                  মান: {currentQ.marks || 1}
                </span>
                {currentQ.chapter && (
                  <span className="hidden sm:inline-block text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium rounded-full">
                    {currentQ.chapter}
                  </span>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white leading-relaxed mb-6">
              {currentQ.questionBn || currentQ.questionEn}
              {currentQ.questionEn && currentQ.questionBn && (
                <p className="text-sm font-normal text-slate-500 dark:text-slate-400 mt-1">
                  {currentQ.questionEn}
                </p>
              )}
            </div>

            {/* Answer Input Section */}
            {currentQ.questionType === 'mcq' && currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((option) => {
                  const isSelected = answers[currentQ.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectAnswer(currentQ.id, option.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 group cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 text-slate-500 group-hover:border-slate-400'
                        }`}
                      >
                        {option.id}
                      </div>
                      <span className="text-base font-medium flex-1">
                        {option.textBn || option.textEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.questionType === 'true_false' && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: 'true', labelBn: 'সত্য (True)', color: 'emerald' },
                  { val: 'false', labelBn: 'মিথ্যা (False)', color: 'rose' },
                ].map((item) => {
                  const isSelected = answers[currentQ.id] === item.val;
                  return (
                    <button
                      key={item.val}
                      onClick={() => handleSelectAnswer(currentQ.id, item.val)}
                      className={`p-5 rounded-xl border-2 font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{item.labelBn}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.questionType === 'fill_blank' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  আপনার উত্তর লিখুন:
                </label>
                <input
                  type="text"
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleSelectAnswer(currentQ.id, e.target.value)}
                  placeholder="শূন্যস্থানের সঠিক শব্দটি এখানে লিখুন..."
                  className="w-full px-4 py-3 text-base rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Bottom Actions for current question */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleReview(currentQ.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isMarked(currentQ.id)
                      ? 'bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900/40 dark:border-purple-700 dark:text-purple-300 font-bold'
                      : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  <span>{isMarked(currentQ.id) ? 'রিভিউ থেকে সরান' : 'পরে দেখার জন্য চিহ্নিত'}</span>
                </button>

                {answers[currentQ.id] && (
                  <button
                    onClick={() => handleClearAnswer(currentQ.id)}
                    className="px-3 py-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>উত্তর মুছুন (Clear)</span>
                  </button>
                )}
              </div>

              {/* Navigation Prev / Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>পূর্ববর্তী</span>
                </button>

                {currentIndex < testQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(testQuestions.length - 1, prev + 1))}
                    className="px-5 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 shadow-sm cursor-pointer"
                  >
                    <span>পরবর্তী</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-5 py-2 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>পরীক্ষা শেষ করুন</span>
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Question Palette & Instructions (4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Question Palette */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              প্রশ্ন তালিকা (Question Palette)
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
                <span className="text-slate-600 dark:text-slate-300">উত্তর দেওয়া ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-200 dark:bg-slate-700" />
                <span className="text-slate-600 dark:text-slate-300">বাকি আছে ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-purple-500" />
                <span className="text-slate-600 dark:text-slate-300">রিভিউ ({reviewCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md border-2 border-indigo-600 bg-white dark:bg-slate-800" />
                <span className="text-slate-600 dark:text-slate-300">বর্তমান প্রশ্ন</span>
              </div>
            </div>

            {/* Question Number Grid */}
            <div className="grid grid-cols-5 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {testQuestions.map((q, idx) => {
                const answered = isAnswered(q.id);
                const reviewed = isMarked(q.id);
                const isCurrent = idx === currentIndex;

                let btnClass = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200';
                if (answered && reviewed) {
                  btnClass = 'bg-purple-600 text-white font-bold';
                } else if (answered) {
                  btnClass = 'bg-emerald-600 text-white font-bold';
                } else if (reviewed) {
                  btnClass = 'bg-purple-500 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl text-sm font-semibold transition-all relative flex items-center justify-center cursor-pointer ${btnClass} ${
                      isCurrent
                        ? 'ring-3 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-800 scale-105 z-10'
                        : 'hover:opacity-85'
                    }`}
                  >
                    {idx + 1}
                    {reviewed && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Instructions & Anti-Cheating Reminder */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 p-4 text-xs text-indigo-900 dark:text-indigo-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-800 dark:text-indigo-300">
              <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>পরীক্ষার নিয়মাবলী ও নির্দেশিকা</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
              <li>কোনো নেগেটিভ মার্কিং নেই। সব প্রশ্নের উত্তর দিন।</li>
              <li>ব্রাউজার বন্ধ করবেন না। উত্তর স্বয়ংক্রিয়ভাবে সেভ হচ্ছে।</li>
              {test.antiCheating?.tabSwitchWarning && (
                <li className="text-amber-700 dark:text-amber-400 font-medium">
                  ট্যাব পরিবর্তন করলে সতর্কবার্তা রেকর্ড হবে।
                </li>
              )}
            </ul>
          </div>
        </aside>
      </main>

      {/* Tab Switch Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 dark:border-rose-900/50 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              সতর্কবার্তা: উইন্ডো বা ট্যাব পরিবর্তন সনাক্ত হয়েছে!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              পরীক্ষা চলাকালীন অন্য উইন্ডো বা ব্রাউজার ট্যাবে যাওয়া কঠোরভাবে নিষিদ্ধ।
              <br />
              ট্যাব পরিবর্তনের সংখ্যা: <span className="font-bold text-rose-600">{tabSwitchCount}</span>
            </p>
            <button
              onClick={() => setShowWarningModal(false)}
              className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
            >
              পরীক্ষায় ফিরে চলুন (Resume Test)
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Submission Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              আপনি কি পরীক্ষাটি চূড়ান্তভাবে জমা দিতে চান?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              সাবমিট করার পর কোনো উত্তর পরিবর্তন করা যাবে না।
            </p>

            {/* Stats summary */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl mb-6 text-center">
              <div>
                <div className="text-xl font-bold text-emerald-600">{answeredCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">উত্তর দেওয়া</div>
              </div>
              <div>
                <div className="text-xl font-bold text-rose-500">{unansweredCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">উত্তর বাকি</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">{reviewCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">রিভিউ রাখা</div>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mb-5 flex items-center gap-1.5 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>আপনার {unansweredCount} টি প্রশ্নের উত্তর দেওয়া এখনও বাকি রয়েছে!</span>
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                পরীক্ষা চালিয়ে যান
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  finalizeSubmission();
                }}
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'জমা হচ্ছে...' : 'হ্যাঁ, সাবমিট করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

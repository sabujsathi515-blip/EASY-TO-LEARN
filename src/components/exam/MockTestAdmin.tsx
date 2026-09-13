import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  FileText,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  Layers,
  Save,
  Clock,
  Shield,
  Upload,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Question, MockTest, QuestionOption } from '../../types';

export const MockTestAdmin: React.FC = () => {
  const {
    questions,
    mockTests,
    classes,
    subjects,
    students,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addMockTest,
    updateMockTest,
    deleteMockTest,
    enterOfflineTestResult,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tests' | 'questions' | 'offline_marks'>('tests');

  // Question Form State
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [qClassId, setQClassId] = useState<number>(10);
  const [qSubjectId, setQSubjectId] = useState<string>('sub_physical_science');
  const [qChapter, setQChapter] = useState<string>('');
  const [qType, setQType] = useState<'mcq' | 'true_false' | 'fill_blank'>('mcq');
  const [qTextBn, setQTextBn] = useState<string>('');
  const [qTextEn, setQTextEn] = useState<string>('');
  const [qMarks, setQMarks] = useState<number>(1);
  const [qCorrectAnswer, setQCorrectAnswer] = useState<string>('B');
  const [qExplanationBn, setQExplanationBn] = useState<string>('');
  const [qOptions, setQOptions] = useState<QuestionOption[]>([
    { id: 'A', textBn: '', textEn: '' },
    { id: 'B', textBn: '', textEn: '' },
    { id: 'C', textBn: '', textEn: '' },
    { id: 'D', textBn: '', textEn: '' },
  ]);

  // Mock Test Form State
  const [showTestModal, setShowTestModal] = useState<boolean>(false);
  const [tTitleBn, setTTitleBn] = useState<string>('');
  const [tTitleEn, setTTitleEn] = useState<string>('');
  const [tClassId, setTClassId] = useState<number>(10);
  const [tSubjectId, setTSubjectId] = useState<string>('sub_physical_science');
  const [tChapter, setTChapter] = useState<string>('');
  const [tDuration, setTDuration] = useState<number>(20);
  const [tTotalMarks, setTTotalMarks] = useState<number>(20);
  const [tPassMarks, setTPassMarks] = useState<number>(8);
  const [tType, setTType] = useState<'online' | 'offline' | 'both'>('both');
  const [tTabSwitch, setTTabSwitch] = useState<boolean>(true);
  const [tRandomize, setTRandomize] = useState<boolean>(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  // Offline Marks Entry State
  const [offTestId, setOffTestId] = useState<string>('');
  const [offStudentId, setOffStudentId] = useState<string>('');
  const [offStudentName, setOffStudentName] = useState<string>('');
  const [offMarks, setOffMarks] = useState<number>(0);
  const [offTotalMarks, setOffTotalMarks] = useState<number>(20);

  // Filters
  const [filterClass, setFilterClass] = useState<number>(0);

  // Handle Question Submit
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTextBn.trim()) {
      showToast('প্রশ্নের বিবরণ বাংলাতে প্রদান করুন', 'error');
      return;
    }

    const questionPayload: Omit<Question, 'id' | 'createdAt'> = {
      classId: qClassId,
      subjectId: qSubjectId,
      chapter: qChapter,
      questionType: qType,
      difficulty: 'medium',
      questionBn: qTextBn,
      questionEn: qTextEn,
      marks: qMarks,
      correctAnswer: qCorrectAnswer,
      explanationBn: qExplanationBn,
      options: qType === 'mcq' ? qOptions : undefined,
    };

    if (editingQuestionId) {
      updateQuestion(editingQuestionId, questionPayload);
      setEditingQuestionId(null);
    } else {
      addQuestion(questionPayload);
    }

    setShowQuestionModal(false);
    resetQuestionForm();
  };

  const resetQuestionForm = () => {
    setQTextBn('');
    setQTextEn('');
    setQChapter('');
    setQMarks(1);
    setQCorrectAnswer('A');
    setQExplanationBn('');
    setQOptions([
      { id: 'A', textBn: '', textEn: '' },
      { id: 'B', textBn: '', textEn: '' },
      { id: 'C', textBn: '', textEn: '' },
      { id: 'D', textBn: '', textEn: '' },
    ]);
  };

  const handleEditQuestion = (q: Question) => {
    setEditingQuestionId(q.id);
    setQClassId(q.classId);
    setQSubjectId(q.subjectId);
    setQChapter(q.chapter || '');
    setQType(q.questionType);
    setQTextBn(q.questionBn);
    setQTextEn(q.questionEn || '');
    setQMarks(q.marks || 1);
    setQCorrectAnswer(q.correctAnswer || 'A');
    setQExplanationBn(q.explanationBn || '');
    if (q.options) {
      setQOptions(q.options);
    }
    setShowQuestionModal(true);
  };

  // Handle Mock Test Submit
  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tTitleBn.trim()) {
      showToast('টেস্টের শিরোনাম প্রদান করুন', 'error');
      return;
    }

    const testPayload: Omit<MockTest, 'id' | 'createdAt'> = {
      title: tTitleEn || tTitleBn,
      titleBn: tTitleBn,
      description: 'West Bengal Board Chapter Mock Test',
      descriptionBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের পাঠ্যসূচি অনুযায়ী প্রস্তুত',
      classId: tClassId,
      subjectId: tSubjectId,
      chapter: tChapter,
      durationMinutes: tDuration,
      totalMarks: tTotalMarks,
      passMarks: tPassMarks,
      totalQuestions: selectedQuestionIds.length || 10,
      testType: tType,
      questionIds: selectedQuestionIds,
      antiCheating: {
        tabSwitchWarning: tTabSwitch,
        randomizeQuestions: tRandomize,
        fullScreen: false,
        randomizeOptions: true,
        timerAutoSubmit: true,
      },
      isPublished: true,
    };

    addMockTest(testPayload);
    setShowTestModal(false);
    resetTestForm();
  };

  const resetTestForm = () => {
    setTTitleBn('');
    setTTitleEn('');
    setTChapter('');
    setSelectedQuestionIds([]);
  };

  // Handle Offline Marks Submit
  const handleOfflineMarksSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const test = mockTests.find((t) => t.id === offTestId);
    if (!test) {
      showToast('মক টেস্ট নির্বাচন করুন', 'error');
      return;
    }

    const percentage = Math.round((offMarks / offTotalMarks) * 100);
    const isPassed = percentage >= 40;

    enterOfflineTestResult({
      testId: test.id,
      testTitle: test.titleBn || test.title,
      studentId: offStudentId || `ETL-OFF-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: offStudentName || 'Offline Student',
      classId: test.classId,
      subjectId: test.subjectId,
      totalQuestions: test.totalQuestions || 20,
      attempted: test.totalQuestions || 20,
      correct: Math.round(offMarks),
      wrong: Math.max(0, offTotalMarks - offMarks),
      unanswered: 0,
      totalMarks: offTotalMarks,
      obtainedMarks: offMarks,
      percentage,
      isPassed,
      timeTakenSeconds: (test.durationMinutes || 30) * 60,
      studentAnswers: {},
    });

    setOffStudentName('');
    setOffStudentId('');
    setOffMarks(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/10 tracking-wide text-indigo-300 inline-block mb-2">
            TEACHER & ADMIN CONTROLS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">মক টেস্ট ও প্রশ্নব্যাংক ব্যবস্থাপনা</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            নতুন পরীক্ষা প্রকাশ করুন, প্রশ্ন ব্যাংকে প্রশ্ন যোগ করুন এবং অফলাইন পরীক্ষার নম্বর এন্ট্রি করুন।
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-white/10 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tests' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            মক টেস্ট সমূহ ({mockTests.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'questions' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            প্রশ্নব্যাংক ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('offline_marks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'offline_marks' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            অফলাইন নম্বর এন্ট্রি
          </button>
        </div>
      </div>

      {/* TAB 1: MOCK TESTS MANAGEMENT */}
      {activeTab === 'tests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>বর্তমান সক্রিয় মক টেস্ট তালিকা</span>
            </h2>

            <button
              onClick={() => {
                resetTestForm();
                setShowTestModal(true);
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন টেস্ট তৈরি করুন (Create Test)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTests.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                      Class {t.classId}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">{t.testType}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                    {t.titleBn || t.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">অধ্যায়: {t.chapter || 'সাধারণ মূল্যায়ন'}</div>

                  <div className="grid grid-cols-3 gap-2 my-4 text-center text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{t.durationMinutes} মি.</div>
                      <div className="text-[10px] text-slate-500">সময়</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{t.totalMarks}</div>
                      <div className="text-[10px] text-slate-500">পূর্ণমান</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{t.attemptsCount || 0}</div>
                      <div className="text-[10px] text-slate-500">অংশগ্রহণ</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-500">পাস মার্ক: {t.passMarks || 8}</span>
                  <button
                    onClick={() => {
                      if (window.confirm(`আপনি কি "${t.titleBn || t.title}" টেস্টটি মুছে ফেলতে চান?`)) {
                        deleteMockTest(t.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete Test"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: QUESTION BANK MANAGEMENT */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>প্রশ্নব্যাংক (Question Bank)</span>
              </h2>

              <select
                value={filterClass}
                onChange={(e) => setFilterClass(Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value={0}>সকল শ্রেণি ({questions.length})</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                resetQuestionForm();
                setEditingQuestionId(null);
                setShowQuestionModal(true);
              }}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>প্রশ্ন যোগ করুন (Add Question)</span>
            </button>
          </div>

          <div className="space-y-4">
            {questions
              .filter((q) => (filterClass ? q.classId === filterClass : true))
              .map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 font-bold">
                        Class {q.classId}
                      </span>
                      {q.chapter && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                          {q.chapter}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold">
                        মান: {q.marks || 1}
                      </span>
                      <span className="text-slate-500 uppercase font-mono">{q.questionType}</span>
                    </div>

                    <div className="font-semibold text-slate-900 dark:text-white text-base">
                      {q.questionBn || q.questionEn}
                    </div>

                    {q.options && (
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-1.5 rounded-lg border flex items-center gap-2 ${
                              (q.correctAnswer || '').toLowerCase() === opt.id.toLowerCase()
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 font-bold'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <span className="font-bold">({opt.id})</span>
                            <span>{opt.textBn || opt.textEn}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.explanationBn && (
                      <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg">
                        <strong>ব্যাখ্যা: </strong>
                        {q.explanationBn}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => handleEditQuestion(q)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title="Edit Question"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('আপনি কি এই প্রশ্নটি মুছে ফেলতে চান?')) {
                          deleteQuestion(q.id);
                        }
                      }}
                      className="p-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 3: OFFLINE EXAM MARKS ENTRY */}
      {activeTab === 'offline_marks' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 flex items-center justify-center font-bold">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                অফলাইন পরীক্ষার খাতার নম্বর এন্ট্রি
              </h2>
              <p className="text-xs text-slate-500">
                শিক্ষার্থীদের অফলাইন লিখিত ও OMR শিটের প্রাপ্ত নম্বর পোর্টালে যুক্ত করুন।
              </p>
            </div>
          </div>

          <form onSubmit={handleOfflineMarksSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                মক টেস্ট নির্বাচন করুন *
              </label>
              <select
                value={offTestId}
                onChange={(e) => {
                  setOffTestId(e.target.value);
                  const t = mockTests.find((x) => x.id === e.target.value);
                  if (t) setOffTotalMarks(t.totalMarks || 20);
                }}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value="">-- টেস্ট নির্বাচন করুন --</option>
                {mockTests.map((t) => (
                  <option key={t.id} value={t.id}>
                    Class {t.classId} - {t.titleBn || t.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  শিক্ষার্থীর নাম *
                </label>
                <input
                  type="text"
                  value={offStudentName}
                  onChange={(e) => setOffStudentName(e.target.value)}
                  placeholder="যেমন: অনির্বাণ চক্রবর্তী"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  রোল নম্বর / স্টুডেন্ট আইডি
                </label>
                <input
                  type="text"
                  value={offStudentId}
                  onChange={(e) => setOffStudentId(e.target.value)}
                  placeholder="যেমন: ETL-2026-101"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  প্রাপ্ত নম্বর *
                </label>
                <input
                  type="number"
                  value={offMarks}
                  onChange={(e) => setOffMarks(Number(e.target.value))}
                  min={0}
                  max={offTotalMarks}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  পূর্ণমান
                </label>
                <input
                  type="number"
                  value={offTotalMarks}
                  onChange={(e) => setOffTotalMarks(Number(e.target.value))}
                  min={1}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              নম্বর রেকর্ড সংরক্ষণ করুন (Save Marks)
            </button>
          </form>
        </div>
      )}

      {/* CREATE / EDIT QUESTION MODAL */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 my-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingQuestionId ? 'প্রশ্ন সম্পাদনা করুন' : 'নতুন প্রশ্ন যোগ করুন (Add Question)'}
            </h3>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শ্রেণি
                  </label>
                  <select
                    value={qClassId}
                    onChange={(e) => setQClassId(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                      <option key={cls} value={cls}>
                        Class {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বিষয়
                  </label>
                  <select
                    value={qSubjectId}
                    onChange={(e) => setQSubjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nameBn || s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    প্রশ্নের ধরন
                  </label>
                  <select
                    value={qType}
                    onChange={(e: any) => setQType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                  >
                    <option value="mcq">বহুনির্বাচনী (MCQ)</option>
                    <option value="true_false">সত্য / মিথ্যা</option>
                    <option value="fill_blank">শূন্যস্থান পূরণ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  অধ্যায় / পরিচ্ছেদ
                </label>
                <input
                  type="text"
                  value={qChapter}
                  onChange={(e) => setQChapter(e.target.value)}
                  placeholder="যেমন: আলো / তড়িৎ / সালোকসংশ্লেষ"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  প্রশ্ন (বাংলায়) *
                </label>
                <textarea
                  value={qTextBn}
                  onChange={(e) => setQTextBn(e.target.value)}
                  required
                  rows={2}
                  placeholder="এখানে স্পষ্ট বাংলায় প্রশ্নটি লিখুন..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                />
              </div>

              {/* Options for MCQ */}
              {qType === 'mcq' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    অপশনসমূহ (A, B, C, D)
                  </label>
                  {qOptions.map((opt, idx) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {opt.id}
                      </span>
                      <input
                        type="text"
                        value={opt.textBn}
                        onChange={(e) => {
                          const updated = [...qOptions];
                          updated[idx].textBn = e.target.value;
                          setQOptions(updated);
                        }}
                        placeholder={`অপশন ${opt.id} এর বিবরণ...`}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সঠিক উত্তর
                  </label>
                  {qType === 'mcq' ? (
                    <select
                      value={qCorrectAnswer}
                      onChange={(e) => setQCorrectAnswer(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold bg-white dark:bg-slate-900"
                    >
                      <option value="A">অপশন A</option>
                      <option value="B">অপশন B</option>
                      <option value="C">অপশন C</option>
                      <option value="D">অপশন D</option>
                    </select>
                  ) : qType === 'true_false' ? (
                    <select
                      value={qCorrectAnswer}
                      onChange={(e) => setQCorrectAnswer(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold bg-white dark:bg-slate-900"
                    >
                      <option value="true">সত্য (True)</option>
                      <option value="false">মিথ্যা (False)</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={qCorrectAnswer}
                      onChange={(e) => setQCorrectAnswer(e.target.value)}
                      placeholder="সঠিক শব্দ লিখুন..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    নম্বর মান
                  </label>
                  <input
                    type="number"
                    value={qMarks}
                    onChange={(e) => setQMarks(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ব্যাখ্যা (Explanation in Bengali)
                </label>
                <textarea
                  value={qExplanationBn}
                  onChange={(e) => setQExplanationBn(e.target.value)}
                  rows={2}
                  placeholder="কেন এই উত্তরটি সঠিক তার সহজ যুক্তি লিখুন..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  সংরক্ষণ করুন (Save)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE MOCK TEST MODAL */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 my-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              নতুন মক টেস্ট প্রকাশ করুন (Create Mock Test)
            </h3>

            <form onSubmit={handleSaveTest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  টেস্টের নাম (বাংলায়) *
                </label>
                <input
                  type="text"
                  value={tTitleBn}
                  onChange={(e) => setTTitleBn(e.target.value)}
                  placeholder="যেমন: মাধ্যমিক ভৌত বিজ্ঞান – আলো ও পরমাণুর নিউক্লিয়াস স্পেশাল"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শ্রেণি
                  </label>
                  <select
                    value={tClassId}
                    onChange={(e) => setTClassId(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                      <option key={cls} value={cls}>
                        Class {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সময় (মিনিট)
                  </label>
                  <input
                    type="number"
                    value={tDuration}
                    onChange={(e) => setTDuration(Number(e.target.value))}
                    min={5}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    পূর্ণমান
                  </label>
                  <input
                    type="number"
                    value={tTotalMarks}
                    onChange={(e) => setTTotalMarks(Number(e.target.value))}
                    min={5}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    পাস মার্ক
                  </label>
                  <input
                    type="number"
                    value={tPassMarks}
                    onChange={(e) => setTPassMarks(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  টেস্টের ধরন (Type)
                </label>
                <select
                  value={tType}
                  onChange={(e: any) => setTType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs bg-white dark:bg-slate-900 font-semibold"
                >
                  <option value="both">অনলাইন + অফলাইন উভয় মাধ্যম (Both)</option>
                  <option value="online">শুধুমাত্র অনলাইন টেস্ট</option>
                  <option value="offline">শুধুমাত্র অফলাইন প্রিন্টযোগ্য পেপার</option>
                </select>
              </div>

              {/* Anti Cheating Toggles */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span>অ্যান্টি-চিটিং ও নিরাপত্তা সেটিংস</span>
                </div>

                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tTabSwitch}
                    onChange={(e) => setTTabSwitch(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                  <span>ট্যাব পরিবর্তনের সতর্কবার্তা সক্রিয় রাখুন (Tab Switch Warning)</span>
                </label>

                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tRandomize}
                    onChange={(e) => setTRandomize(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                  <span>প্রশ্ন ও উত্তরের ক্রম এলোমেলো করুন (Randomize Questions)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  মক টেস্ট প্রকাশ করুন (Publish Test)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

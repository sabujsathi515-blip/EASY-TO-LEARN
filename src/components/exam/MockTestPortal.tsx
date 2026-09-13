import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MockTest } from '../../types';

interface Props {
  onSelectPrintOffline: (test: MockTest) => void;
}

export const MockTestPortal: React.FC<Props> = ({ onSelectPrintOffline }) => {
  const {
    mockTests,
    classes,
    subjects,
    startMockTest,
    setCurrentView,
    selectedClassId,
    setSelectedClassId,
    currentUser,
    testResults,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSubjectId, setFilterSubjectId] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Filtered mock tests
  const filteredTests = useMemo(() => {
    return mockTests.filter((test) => {
      const matchClass = selectedClassId ? test.classId === selectedClassId : true;
      const matchSubject = filterSubjectId === 'all' ? true : test.subjectId === filterSubjectId;
      const matchType = filterType === 'all' ? true : test.testType === filterType || test.testType === 'both';
      const matchSearch =
        !searchQuery.trim() ||
        (test.titleBn || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (test.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (test.chapter || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchClass && matchSubject && matchType && matchSearch;
    });
  }, [mockTests, selectedClassId, filterSubjectId, filterType, searchQuery]);

  // Student specific statistics if logged in
  const studentResults = useMemo(() => {
    if (!currentUser.student) return [];
    return testResults.filter((r) => r.studentId === currentUser.student?.studentId);
  }, [testResults, currentUser.student]);

  const passedTestsCount = studentResults.filter((r) => r.isPassed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md inline-flex items-center gap-1.5 border border-white/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>পশ্চিমবঙ্গ পর্ষদ বিশেষ মূল্যায়ন প্ল্যাটফর্ম</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            অনলাইন মক টেস্ট ও স্ব-মূল্যায়ন পোর্টাল
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
            ১ম থেকে ১০ম শ্রেণি এবং মাধ্যমিক পরীক্ষার জন্য সম্পূর্ণ সিলেবাসভিত্তিক অনলাইন পরীক্ষা, স্বয়ংক্রিয়
            নম্বর গণনা, পূর্ণাঙ্গ উত্তরপত্র ও মেধা সনদপত্র (Certificate)।
          </p>

          {/* Quick Shortcuts */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <button
              onClick={() => setCurrentView('practice')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>অনুশীলন মোড (Practice Mode)</span>
            </button>
            <button
              onClick={() => setCurrentView('results')}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>ফলাফল ও মেধাতালিকা (Leaderboard)</span>
            </button>
          </div>
        </div>

        {/* Floating Student Stats if logged in */}
        {currentUser.student && (
          <div className="mt-6 pt-5 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>
                শিক্ষার্থী: <strong className="text-white">{currentUser.student.name}</strong> (Class{' '}
                {currentUser.student.classId})
              </span>
            </div>
            <div className="flex items-center gap-4 text-indigo-200">
              <span>
                মোট দেওয়া টেস্ট: <strong className="text-white">{studentResults.length}</strong>
              </span>
              <span>
                উত্তীর্ণ: <strong className="text-emerald-400">{passedTestsCount}</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-5 mb-8 shadow-xs space-y-4">
        {/* Class Selection Grid */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>শ্রেণি নির্বাচন করুন (Classes 1 - 10)</span>
            </label>
            {selectedClassId && (
              <button
                onClick={() => setSelectedClassId(0)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                সব শ্রেণি দেখুন
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedClassId(0)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                !selectedClassId
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              সকল শ্রেণি (All)
            </button>
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedClassId === cls.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cls.nameBn || `Class ${cls.id}`}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Subject, Type & Search Input */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="টেস্টের নাম বা অধ্যায় অনুসন্ধান করুন..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Subject Filter */}
          <div className="sm:col-span-3">
            <select
              value={filterSubjectId}
              onChange={(e) => setFilterSubjectId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-medium bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="all">সব বিষয় (All Subjects)</option>
              {subjects
                .filter((s) => (selectedClassId ? s.classId === selectedClassId : true))
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameBn || s.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Test Type Filter */}
          <div className="sm:col-span-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-medium bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="all">সকল মাধ্যম (All Types)</option>
              <option value="online">অনলাইন মক টেস্ট</option>
              <option value="offline">অফলাইন প্রিন্টযোগ্য</option>
              <option value="both">উভয় মাধ্যম (Both)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
          >
            {/* Top Badge Row */}
            <div className="p-5 pb-3 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                Class {test.classId}
              </span>

              <div className="flex items-center gap-1.5">
                {test.testType === 'both' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                    Online + Offline
                  </span>
                ) : test.testType === 'offline' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                    Offline Paper
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                    Online Test
                  </span>
                )}
              </div>
            </div>

            {/* Test Info Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {test.titleBn || test.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {test.descriptionBn || test.description}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {test.totalQuestions || test.questionIds?.length || 0}
                    </div>
                    <div className="text-[10px] text-slate-500">প্রশ্ন</div>
                  </div>

                  <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {test.totalMarks}
                    </div>
                    <div className="text-[10px] text-slate-500">পূর্ণমান</div>
                  </div>

                  <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {test.durationMinutes} মি.
                    </div>
                    <div className="text-[10px] text-slate-500">সময়</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                {test.testType !== 'offline' && (
                  <button
                    onClick={() => startMockTest(test)}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>অনলাইন পরীক্ষা শুরু করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentView('practice')}
                    className="flex-1 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>অনুশীলন</span>
                  </button>

                  {(test.testType === 'offline' || test.testType === 'both') && (
                    <button
                      onClick={() => onSelectPrintOffline(test)}
                      className="flex-1 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-indigo-500" />
                      <span>প্রিন্ট পেপার</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 my-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            কোনো মক টেস্ট খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 mt-1">দয়া করে ফিল্টার পরিবর্তন করুন বা নতুন টেস্ট তৈরি করুন।</p>
        </div>
      )}
    </div>
  );
};

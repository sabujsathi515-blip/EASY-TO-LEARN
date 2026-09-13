import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Award,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  Calendar,
  Clock,
  Filter,
  Trash2,
  Download,
  Printer,
  Sparkles,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TestResult } from '../../types';

export const ResultsPortal: React.FC = () => {
  const { testResults, openTestResult, openCertificate, currentUser, deleteTestResult, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredResults = useMemo(() => {
    return testResults.filter((res) => {
      const matchClass = filterClass === 'all' ? true : res.classId.toString() === filterClass;
      const matchStatus =
        filterStatus === 'all'
          ? true
          : filterStatus === 'passed'
          ? res.isPassed
          : !res.isPassed;
      const matchSearch =
        !searchQuery.trim() ||
        (res.testTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (res.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (res.studentId || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchClass && matchStatus && matchSearch;
    });
  }, [testResults, filterClass, filterStatus, searchQuery]);

  // Top 3 Leaderboard
  const topRankers = useMemo(() => {
    return [...testResults]
      .sort((a, b) => b.obtainedMarks - a.obtainedMarks || a.timeTakenSeconds - b.timeTakenSeconds)
      .slice(0, 3);
  }, [testResults]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('আপনি কি এই ফলাফলটি মুছে ফেলতে চান?')) {
      deleteTestResult(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md inline-flex items-center gap-1.5 border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-amber-200" />
              <span>ফলাফল ও কেন্দ্রীয় মেধা তালিকা</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">মক টেস্ট রেজাল্ট ও মেধা সনদপত্র</h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
              এখানে শিক্ষার্থীদের সাম্প্রতিক পরীক্ষার ফলাফল, বিশদ বিশ্লেষণ, র‌্যাংক এবং ডিজিটাল সার্টিফিকেট
              সংরক্ষিত রয়েছে।
            </p>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <div className="text-2xl sm:text-3xl font-black">{testResults.length}</div>
              <div className="text-[11px] text-amber-100">মোট পরীক্ষা সম্পন্ন</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards if available */}
      {topRankers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>শীর্ষস্থানাধিকারী মেধাবৃন্দ (Top Performers)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topRankers.map((ranker, idx) => (
              <div
                key={ranker.id}
                onClick={() => openTestResult(ranker)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-900/40 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                      idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : 'bg-amber-700'
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                    {ranker.percentage}%
                  </span>
                </div>

                <div className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                  {ranker.studentName}
                </div>
                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{ranker.testTitle}</div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Class {ranker.classId}</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {ranker.obtainedMarks}/{ranker.totalMarks} নম্বর
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পরীক্ষার নাম বা শিক্ষার্থীর নাম খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="all">সকল শ্রেণি</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
              <option key={cls} value={cls.toString()}>
                Class {cls}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="all">সব ফলাফল</option>
            <option value="passed">উত্তীর্ণ (Passed)</option>
            <option value="failed">অকৃতকার্য (Failed)</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">র‌্যাংক</th>
                <th className="p-4">শিক্ষার্থীর নাম</th>
                <th className="p-4">পরীক্ষার নাম ও শ্রেণি</th>
                <th className="p-4">প্রাপ্ত নম্বর</th>
                <th className="p-4">শতকরা ও স্ট্যাটাস</th>
                <th className="p-4">তারিখ</th>
                <th className="p-4 text-right">কার্যক্রম (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
              {filteredResults.map((res, idx) => (
                <tr
                  key={res.id}
                  onClick={() => openTestResult(res)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                >
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-mono">
                      #{res.rank || idx + 1}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {res.studentName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{res.studentId}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-medium line-clamp-1">{res.testTitle}</div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold inline-block mt-0.5">
                      Class {res.classId}
                    </span>
                  </td>

                  <td className="p-4 font-bold">
                    <span className="text-base text-slate-900 dark:text-white">{res.obtainedMarks}</span>
                    <span className="text-slate-400 text-xs"> / {res.totalMarks}</span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      {res.isPassed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{res.percentage}% উত্তীর্ণ</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold text-xs bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{res.percentage}% অকৃতকার্য</span>
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                    {res.submittedAt.split(' ')[0]}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openTestResult(res);
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        title="View Scorecard"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {res.isPassed && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openCertificate(res);
                          }}
                          className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors shadow-xs"
                          title="View Certificate"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                      )}

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={(e) => handleDelete(res.id, e)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Result"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Trophy className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">কোনো ফলাফল পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
};

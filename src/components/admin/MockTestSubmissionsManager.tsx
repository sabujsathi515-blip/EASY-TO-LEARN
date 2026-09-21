import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Eye,
  Download,
  Printer,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Award,
  Cloud,
  CloudOff,
  User,
  BookOpen,
  FileCheck,
  ChevronRight,
  X,
  Sparkles,
  Database,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MockTestSubmission, QuestionAttemptReview } from '../../types';
import { getFirebaseStatus } from '../../services/firebase';

export const MockTestSubmissionsManager: React.FC = () => {
  const {
    mockSubmissions,
    deleteMockSubmission,
    refreshMockSubmissions,
    classes,
    subjects,
    showToast,
  } = useApp();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'passed' | 'failed'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest_score' | 'lowest_score'>('newest');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Modal State for Question-wise Detailed Review
  const [selectedSubmission, setSelectedSubmission] = useState<MockTestSubmission | null>(null);
  const [showFirebaseInfo, setShowFirebaseInfo] = useState<boolean>(false);

  const fbStatus = useMemo(() => getFirebaseStatus(), []);

  // Filter and sort submissions
  const filteredSubmissions = useMemo(() => {
    return mockSubmissions
      .filter((sub) => {
        // Search filter (Student Name, Student ID, Mobile, Test Name)
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          sub.studentName.toLowerCase().includes(q) ||
          sub.studentId.toLowerCase().includes(q) ||
          (sub.studentMobile && sub.studentMobile.toLowerCase().includes(q)) ||
          sub.testName.toLowerCase().includes(q) ||
          sub.subject.toLowerCase().includes(q);

        // Class filter
        const matchesClass =
          selectedClass === 'all' ||
          sub.className.toLowerCase().includes(selectedClass.toLowerCase()) ||
          (sub.classId !== undefined && sub.classId.toString() === selectedClass);

        // Subject filter
        const matchesSubject =
          selectedSubject === 'all' ||
          sub.subject.toLowerCase().includes(selectedSubject.toLowerCase()) ||
          (sub.subjectId !== undefined && sub.subjectId === selectedSubject);

        // Pass/Fail filter
        const matchesStatus =
          selectedStatus === 'all' ||
          (selectedStatus === 'passed' && sub.isPassed) ||
          (selectedStatus === 'failed' && !sub.isPassed);

        return matchesSearch && matchesClass && matchesSubject && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        }
        if (sortBy === 'highest_score') {
          return b.percentage - a.percentage;
        }
        if (sortBy === 'lowest_score') {
          return a.percentage - b.percentage;
        }
        return 0;
      });
  }, [mockSubmissions, searchQuery, selectedClass, selectedSubject, selectedStatus, sortBy]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = mockSubmissions.length;
    if (total === 0) {
      return { total: 0, passed: 0, failed: 0, avgPercentage: 0, passRate: 0 };
    }
    const passed = mockSubmissions.filter((s) => s.isPassed).length;
    const totalPercentage = mockSubmissions.reduce((acc, s) => acc + s.percentage, 0);
    const avgPercentage = Math.round(totalPercentage / total);
    const passRate = Math.round((passed / total) * 100);

    return {
      total,
      passed,
      failed: total - passed,
      avgPercentage,
      passRate,
    };
  }, [mockSubmissions]);

  // Handle Manual Refresh from Firebase
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshMockSubmissions();
      showToast('Firebase Firestore থেকে সর্বশেষ সাবমিশন রিফ্রেশ করা হয়েছে', 'success');
    } catch {
      showToast('রিফ্রেশ করতে সমস্যা হয়েছে', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle Delete Submission
  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`আপনি কি "${name}"-এর এই মক টেস্ট রেজাল্টটি স্থায়ীভাবে মুছে ফেলতে চান?`)) {
      await deleteMockSubmission(id);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) {
      showToast('এক্সপোর্ট করার জন্য কোনো তথ্য নেই', 'warning');
      return;
    }

    const headers = [
      'Student Name',
      'Student ID / Mobile',
      'Class',
      'Subject',
      'Mock Test Name',
      'Total Questions',
      'Attempted Questions',
      'Correct Answers',
      'Wrong Answers',
      'Unanswered Questions',
      'Total Marks',
      'Obtained Marks',
      'Percentage',
      'Result Status',
      'Time Taken',
      'Submission Date',
      'Submission Time',
    ];

    const rows = filteredSubmissions.map((s) => [
      `"${s.studentName.replace(/"/g, '""')}"`,
      `"${s.studentId.replace(/"/g, '""')}"`,
      `"${s.className}"`,
      `"${s.subject}"`,
      `"${s.testName.replace(/"/g, '""')}"`,
      s.totalQuestions,
      s.attemptedQuestions,
      s.correctAnswers,
      s.wrongAnswers,
      s.unansweredQuestions,
      s.totalMarks,
      s.obtainedMarks,
      `${s.percentage}%`,
      s.isPassed ? 'Passed' : 'Failed',
      `"${s.timeTakenFormatted || s.timeTaken + 's'}"`,
      `"${s.submissionDate}"`,
      `"${s.submissionTime}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mock_test_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV ফাইল সফলভাবে ডাউনলোড হয়েছে', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Firebase Status */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <Database className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                মক টেস্ট সাবমিশন পোর্টাল (Mock Test Submissions)
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              শিক্ষার্থীদের দেওয়া সকল মক টেস্টের পূর্ণাঙ্গ মূল্যায়ন ও রেজাল্ট Firebase Firestore ডেটাবেজে সুরক্ষিত রয়েছে।
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* Firebase Status Badge */}
            <button
              onClick={() => setShowFirebaseInfo(!showFirebaseInfo)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
              title="Firebase কানেকশন ও কনফিগারেশন বিবরণ"
            >
              <Cloud className="w-3.5 h-3.5 text-emerald-500" />
              <span>Firebase: Connected ({fbStatus.projectId})</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>রিফ্রেশ (Refresh)</span>
            </button>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV ডাউনলোড</span>
            </button>
          </div>
        </div>

        {/* Quick Firebase Info Banner (Toggled) */}
        {showFirebaseInfo && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800 dark:text-white">
              <span className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-500" />
                Firebase Firestore কনফিগারেশন বিবরণ:
              </span>
              <button
                onClick={() => setShowFirebaseInfo(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-slate-400 font-mono text-[10px]">PROJECT ID</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{fbStatus.projectId}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-slate-400 font-mono text-[10px]">FIRESTORE COLLECTION</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">mockTestSubmissions</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-slate-400 font-mono text-[10px]">SECURITY RULES</span>
                <span className="font-semibold text-emerald-600">Admin Only Access & Validation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="block text-slate-400 font-mono text-[10px]">SYNC MODE</span>
                <span className="font-semibold text-blue-600">Real-time + Offline First</span>
              </div>
            </div>
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">মোট সাবমিশন (Total)</span>
            <p className="text-2xl font-bold text-slate-800 dark:text-white mt-0.5">{metrics.total}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
            <span className="text-xs text-emerald-700 dark:text-emerald-400">উত্তীর্ণ (Passed)</span>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{metrics.passed}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <span className="text-xs text-amber-700 dark:text-amber-400">গড় নম্বর (Avg Score)</span>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-0.5">{metrics.avgPercentage}%</p>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800">
            <span className="text-xs text-indigo-700 dark:text-indigo-400">পাসের হার (Pass Rate)</span>
            <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mt-0.5">{metrics.passRate}%</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="শিক্ষার্থীর নাম, রোল/মোবাইল বা মক টেস্ট খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Class Filter */}
          <div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">সকল শ্রেণি (All Classes)</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id.toString()}>
                  Class {cls.id} ({cls.nameBn})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">সকল ফলাফল (All Results)</option>
              <option value="passed">উত্তীর্ণ (Passed)</option>
              <option value="failed">অনুত্তীর্ণ (Failed)</option>
            </select>
          </div>
        </div>

        {/* Sort and Count Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
          <span>মোট প্রদর্শিত: {filteredSubmissions.length} টি সাবমিশন</span>
          <div className="flex items-center gap-2">
            <span>সাজান:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              <option value="newest">সর্বশেষ আগে (Newest)</option>
              <option value="oldest">পুরনো আগে (Oldest)</option>
              <option value="highest_score">সর্বোচ্চ নম্বর (Highest Score)</option>
              <option value="lowest_score">সর্বনিম্ন নম্বর (Lowest Score)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List / Table */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-400 mb-3">
            <FileCheck className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white">কোনো সাবমিশন পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            শিক্ষার্থী যখন মক টেস্ট সম্পন্ন করে 'Submit Test' চাপবে, তখন স্বয়ংক্রিয়ভাবে তার সকল তথ্য এখানে প্রদর্শিত হবে।
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3.5 px-4">শিক্ষার্থীর নাম ও আইডি</th>
                  <th className="py-3.5 px-3">শ্রেণি ও বিষয়</th>
                  <th className="py-3.5 px-4">মক টেস্টের নাম</th>
                  <th className="py-3.5 px-3 text-center">প্রশ্নের হিসাব (মোট/সঠিক/ভুল)</th>
                  <th className="py-3.5 px-3 text-center">প্রাপ্ত নম্বর</th>
                  <th className="py-3.5 px-3 text-center">শতাংশ (%)</th>
                  <th className="py-3.5 px-3 text-center">সময়</th>
                  <th className="py-3.5 px-4">তারিখ ও সময়</th>
                  <th className="py-3.5 px-3 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                    {/* Student Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {sub.studentName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>ID/Mobile: {sub.studentId}</span>
                      </div>
                    </td>

                    {/* Class & Subject */}
                    <td className="py-3.5 px-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 mr-1.5">
                        {sub.className}
                      </span>
                      <div className="text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                        {sub.subject}
                      </div>
                    </td>

                    {/* Mock Test Name */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                        {sub.testName}
                      </div>
                    </td>

                    {/* Questions Breakdown */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {sub.attemptedQuestions} / {sub.totalQuestions}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-center gap-1.5">
                        <span className="text-emerald-600 font-semibold">{sub.correctAnswers} সঠিক</span>
                        <span>•</span>
                        <span className="text-rose-600 font-semibold">{sub.wrongAnswers} ভুল</span>
                        <span>•</span>
                        <span className="text-slate-400">{sub.unansweredQuestions} বাদ</span>
                      </div>
                    </td>

                    {/* Marks */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {sub.obtainedMarks}
                      </span>
                      <span className="text-slate-400 text-xs"> / {sub.totalMarks}</span>
                    </td>

                    {/* Percentage & Status */}
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          sub.isPassed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}
                      >
                        {sub.isPassed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {sub.percentage}%
                      </span>
                    </td>

                    {/* Time Taken */}
                    <td className="py-3.5 px-3 text-center text-slate-600 dark:text-slate-300">
                      <div className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{sub.timeTakenFormatted || `${sub.timeTaken} সে:`}</span>
                      </div>
                    </td>

                    {/* Submission Date & Time */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 dark:text-slate-200 font-medium">
                        {sub.submissionDate}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {sub.submissionTime}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 dark:text-indigo-400 transition-colors"
                          title="বিস্তারিত প্রশ্নোত্তর মূল্যায়ন দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id, sub.studentName)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:hover:bg-rose-900 dark:text-rose-400 transition-colors"
                          title="এই সাবমিশন মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-700">
            {filteredSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {sub.studentName}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">
                      ID/Mob: {sub.studentId}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      sub.isPassed
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}
                  >
                    {sub.percentage}% ({sub.isPassed ? 'পাস' : 'ফেল'})
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs space-y-1">
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    {sub.testName}
                  </div>
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>{sub.className} • {sub.subject}</span>
                    <span>নম্বর: {sub.obtainedMarks}/{sub.totalMarks}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {sub.submissionDate} ({sub.submissionTime})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {sub.timeTakenFormatted || `${sub.timeTaken}s`}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedSubmission(sub)}
                    className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>বিস্তারিত দেখুন</span>
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id, sub.studentName)}
                    className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>মুছুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION-WISE DETAILED BREAKDOWN MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {selectedSubmission.className}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {selectedSubmission.subject}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      selectedSubmission.isPassed
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {selectedSubmission.isPassed ? 'উত্তীর্ণ (Passed)' : 'অনুত্তীর্ণ (Failed)'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
                  {selectedSubmission.testName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  শিক্ষার্থী: <strong className="text-slate-700 dark:text-slate-200">{selectedSubmission.studentName}</strong> (ID: {selectedSubmission.studentId})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="প্রিন্ট করুন"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scorecard Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-slate-100/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-center">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">প্রাপ্ত নম্বর</span>
                <p className="text-lg font-bold text-slate-800 dark:text-white">
                  {selectedSubmission.obtainedMarks} / {selectedSubmission.totalMarks}
                </p>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">শতাংশ (Percentage)</span>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedSubmission.percentage}%
                </p>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">প্রশ্নের বিবরণ</span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                  <span className="text-emerald-600 font-bold">{selectedSubmission.correctAnswers} সঠিক</span> •{' '}
                  <span className="text-rose-600 font-bold">{selectedSubmission.wrongAnswers} ভুল</span> •{' '}
                  <span className="text-slate-400">{selectedSubmission.unansweredQuestions} বাদ</span>
                </p>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">গৃহীত সময়</span>
                <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">
                  {selectedSubmission.timeTakenFormatted || `${selectedSubmission.timeTaken} সেকেন্ড`}
                </p>
              </div>
            </div>

            {/* Question-wise Breakdown List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>প্রশ্নভিত্তিক পূর্ণাঙ্গ মূল্যায়ন ও উত্তর পর্যালোচনা (Question-wise Breakdown):</span>
              </h4>

              {selectedSubmission.questionReviews && selectedSubmission.questionReviews.length > 0 ? (
                <div className="space-y-3">
                  {selectedSubmission.questionReviews.map((rev, idx) => (
                    <div
                      key={rev.questionId || idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        rev.isCorrect
                          ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                          : rev.studentAnswer
                          ? 'border-rose-200 bg-rose-50/40 dark:border-rose-900/60 dark:bg-rose-950/20'
                          : 'border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200">
                            {idx + 1}
                          </span>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              rev.isCorrect
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-200'
                                : rev.studentAnswer
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-200'
                                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {rev.isCorrect ? '✓ সঠিক উত্তর (+ ' + rev.marksAwarded + ')' : rev.studentAnswer ? '✕ ভুল উত্তর (০)' : '— উত্তর দেওয়া হয়নি'}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">পূর্ণমান: {rev.maxMarks || 1}</span>
                      </div>

                      {/* Question Text */}
                      <p className="font-semibold text-slate-900 dark:text-white text-sm mt-2.5">
                        {rev.questionText}
                      </p>

                      {/* Answers Comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">শিক্ষার্থীর উত্তর (Candidate Answer):</span>
                          <span className={`font-semibold ${rev.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {rev.studentAnswer ? rev.studentAnswer : '(উত্তর দেওয়া হয়নি / Skipped)'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">সঠিক উত্তর (Correct Answer):</span>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {rev.correctAnswer}
                          </span>
                        </div>
                      </div>

                      {/* Explanation */}
                      {rev.explanation && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                          <strong className="text-indigo-600 dark:text-indigo-400">ব্যাখ্যা (Explanation): </strong>
                          {rev.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">
                  এই সাবমিশনে কোনো বিস্তারিত প্রশ্ন পর্যালোচনা সংরক্ষিত নেই।
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                সাবমিশন সময়: {selectedSubmission.submissionDate} at {selectedSubmission.submissionTime}
              </span>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                বন্ধ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

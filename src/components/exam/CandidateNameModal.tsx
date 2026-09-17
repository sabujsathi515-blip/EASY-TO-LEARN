import React, { useState, useEffect } from 'react';
import {
  User,
  School,
  Hash,
  Clock,
  HelpCircle,
  Award,
  ArrowRight,
  X,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { MockTest, CandidateInfo } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  test: MockTest | null;
  isOpen: boolean;
  onClose: () => void;
  onStart: (candidateInfo: CandidateInfo) => void;
}

export const CandidateNameModal: React.FC<Props> = ({
  test,
  isOpen,
  onClose,
  onStart,
}) => {
  const { currentUser, currentCandidate, subjects } = useApp();

  const [name, setName] = useState<string>('');
  const [rollNo, setRollNo] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(true);

  // Initialize form when modal opens
  useEffect(() => {
    if (isOpen) {
      const savedName =
        currentCandidate?.name ||
        currentUser.student?.name ||
        localStorage.getItem('etl_student_candidate_name') ||
        '';
      const savedRoll =
        currentCandidate?.rollNo ||
        (currentUser.student?.rollNumber ? String(currentUser.student.rollNumber) : currentUser.student?.studentId) ||
        '';
      const savedSchool =
        currentCandidate?.school ||
        currentUser.student?.schoolName ||
        '';

      setName(savedName);
      setRollNo(savedRoll);
      setSchool(savedSchool);
      setError('');
    }
  }, [isOpen, currentCandidate, currentUser]);

  if (!isOpen || !test) return null;

  const subject = subjects.find((s) => s.id === test.subjectId);
  const subjectName = subject?.nameBn || subject?.name || 'সাধারণ বিষয়';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('পরীক্ষা শুরু করতে অনুগ্রহ করে আপনার নাম লিখুন।');
      return;
    }

    if (trimmedName.length < 2) {
      setError('নাম অন্তত ২ অক্ষরের হতে হবে।');
      return;
    }

    onStart({
      name: trimmedName,
      rollNo: rollNo.trim() || undefined,
      school: school.trim() || undefined,
    });
  };

  return (
    <div
      id="candidate-name-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="candidate-name-modal-container"
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-5 sm:p-6 text-white relative">
          <button
            id="candidate-modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>পরীক্ষার্থীর তথ্য ও অনলাইন যাচাইকরণ</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            পরীক্ষা শুরুর পূর্বে আপনার নাম লিখুন
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-1">
            মক টেস্টের ফলাফল এবং মেধা সনদপত্রে (Certificate) আপনার এই নামটি প্রদর্শিত হবে।
          </p>
        </div>

        {/* Test Summary Pill Box */}
        <div className="bg-indigo-50/70 dark:bg-slate-800/60 p-4 border-b border-indigo-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px]">
              Class {test.classId}
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {test.titleBn || test.title}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              {test.totalQuestions} টি MCQ
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              {test.totalMarks} নম্বর
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              {test.durationMinutes} মিনিট
            </span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {error && (
            <div
              id="candidate-error-banner"
              className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Student Name Field (Mandatory) */}
          <div>
            <label
              htmlFor="candidate-name-input"
              className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5"
            >
              পরীক্ষার্থীর নাম (Student Full Name) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4 text-indigo-500" />
              </div>
              <input
                id="candidate-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="আপনার পুরো নাম লিখুন (যেমন: রাহুল দাস / Rahul Sen)"
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition placeholder:text-slate-400"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>বাংলা অথবা ইংরেজি যেকোনো ভাষায় আপনার নাম লিখতে পারেন।</span>
            </p>
          </div>

          {/* Optional Fields in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Roll No */}
            <div>
              <label
                htmlFor="candidate-roll-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
              >
                রোল নং / আইডি (Roll / ID - ঐচ্ছিক)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-3.5 h-3.5" />
                </div>
                <input
                  id="candidate-roll-input"
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="যেমন: 12 বা ETL-07"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden transition placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* School / Institution */}
            <div>
              <label
                htmlFor="candidate-school-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
              >
                বিদ্যালয়ের নাম (School - ঐচ্ছিক)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <School className="w-3.5 h-3.5" />
                </div>
                <input
                  id="candidate-school-input"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="যেমন: বর্ধমান মিউনিসিপ্যাল হাই স্কুল"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden transition placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Quick exam instructions */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1 text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>গুরুত্বপূর্ণ নিয়মাবলী:</span>
            </div>
            <p>• প্রতিটি প্রশ্নের জন্য ১ নম্বর নির্ধারিত, কোনো নেতিবাচক মার্কিং (Negative Marking) নেই।</p>
            <p>• সময় শেষ হলে টেস্টটি স্বয়ংক্রিয়ভাবে জমা হবে। পরীক্ষা শেষে পূর্ণাঙ্গ সমাধান দেখতে পাবেন।</p>
          </div>

          {/* Agreement Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400 pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer"
            />
            <span>আমি সমস্ত নিয়মাবলী পড়েছি এবং অনলাইন মক টেস্ট শুরু করতে প্রস্তুত।</span>
          </label>

          {/* Modal Action Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              id="candidate-modal-cancel-btn"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              বাতিল করুন (Cancel)
            </button>
            <button
              type="submit"
              id="candidate-modal-start-btn"
              disabled={!name.trim() || !agreed}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>অনলাইন পরীক্ষা শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

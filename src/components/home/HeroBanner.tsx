import React from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  FileText,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, setSelectedClassId, settings, language, t } = useApp();

  const handleClassQuickSelect = (classId: number) => {
    setSelectedClassId(classId);
    setCurrentView('materials');
  };

  const handleWhatsApp = () => {
    const cleanNumber = (settings.whatsappNumber || '919876543210').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent('Hello EASY TO LEARN, I want information about the tuition classes.');
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 py-10 sm:py-16">
      {/* Decorative background subtle shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Quick Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{settings.academicYear} Academic Session Open • Admissions & Batches</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              {settings.centreName}{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-900 dark:from-indigo-400 dark:to-indigo-200">
                {language === 'bn' && settings.taglineBn ? settings.taglineBn : settings.tagline}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t.welcomeSub}
            </p>

            {/* Teacher Badge Bar */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-4 p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-xs">
                SS
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {settings.teacherName}
                  </span>
                  <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {settings.qualification} • {settings.experience}
                </p>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setCurrentView('materials')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Study Materials</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow-md hover:shadow-green-500/25 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </button>

              <button
                onClick={() => setCurrentView('question_papers')}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition flex items-center gap-2 border border-slate-200 dark:border-slate-700"
              >
                <FileText className="w-4 h-4" />
                <span>Past Papers & Tests</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Feature Cards & Class Pills */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Direct Class Entry (১ম - ১০ম)
                </span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  Click to Browse
                </span>
              </div>

              {/* 1-10 Class Grid */}
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => handleClassQuickSelect(cls)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 text-center transition group shadow-2xs"
                  >
                    <div className="text-base font-extrabold text-slate-800 dark:text-white group-hover:text-indigo-600">
                      C{cls}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      Class {cls}
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Jump Bar */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold">
                <button
                  onClick={() => setCurrentView('notices')}
                  className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 flex items-center gap-2 hover:bg-amber-100 transition"
                >
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Notice Board</span>
                </button>
                <button
                  onClick={() => setCurrentView('homework')}
                  className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-purple-900 dark:text-purple-200 flex items-center gap-2 hover:bg-purple-100 transition"
                >
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Homework Desk</span>
                </button>
              </div>

              {/* Read-Only Guarantee Note */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  All study materials, suggestions, and question papers are optimized for <strong>Read-Only</strong> on phones and PCs with download protection.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

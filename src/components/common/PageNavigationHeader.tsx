import React from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Home,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  HelpCircle,
  User,
  ShieldAlert,
  Book,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PageNavigationHeader: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    goBack,
    selectedClassId,
    selectedSubjectId,
    subjects,
    language,
    t,
  } = useApp();

  // If on home page, do not display universal sub-header
  if (currentView === 'home') {
    return null;
  }

  const getViewDetails = () => {
    switch (currentView) {
      case 'classes':
        return {
          title: language === 'bn' ? 'সকল শ্রেণি' : 'All Classes (1-10)',
          icon: GraduationCap,
          color: 'text-indigo-600 dark:text-indigo-400',
        };
      case 'books':
        return {
          title: language === 'bn' ? 'পশ্চিমবঙ্গ পর্ষদ পাঠ্যপুস্তক' : 'WB Board Text Books',
          icon: Book,
          color: 'text-amber-600 dark:text-amber-400',
        };
      case 'materials': {
        const activeSubj = subjects.find((s) => s.id === selectedSubjectId);
        const subjName = activeSubj
          ? language === 'bn' && activeSubj.nameBn
            ? activeSubj.nameBn
            : activeSubj.name
          : null;
        return {
          title: subjName
            ? `${language === 'bn' ? `${selectedClassId}ম শ্রেণি` : `Class ${selectedClassId}`} • ${subjName}`
            : language === 'bn'
            ? `${selectedClassId}ম শ্রেণির স্টাডি মেটেরিয়াল`
            : `Class ${selectedClassId} Study Materials`,
          icon: BookOpen,
          color: 'text-blue-600 dark:text-blue-400',
        };
      }
      case 'notices':
        return {
          title: language === 'bn' ? 'নোটিশ বোর্ড' : 'Notice Board',
          icon: Calendar,
          color: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'homework':
        return {
          title: language === 'bn' ? 'হোমওয়ার্ক ও অ্যাসাইনমেন্ট' : 'Homework & Tasks',
          icon: FileText,
          color: 'text-rose-600 dark:text-rose-400',
        };
      case 'question_papers':
        return {
          title: language === 'bn' ? 'প্রশ্নপত্র ও সাজেশন' : 'Question Papers & Suggestions',
          icon: HelpCircle,
          color: 'text-purple-600 dark:text-purple-400',
        };
      case 'teacher_profile':
        return {
          title: language === 'bn' ? 'শিক্ষকের পরিচিতি' : 'Teacher Profile & Batches',
          icon: User,
          color: 'text-sky-600 dark:text-sky-400',
        };
      case 'student_portal':
        return {
          title: language === 'bn' ? 'শিক্ষার্থী পোর্টাল' : 'Student Portal',
          icon: GraduationCap,
          color: 'text-teal-600 dark:text-teal-400',
        };
      case 'admin_dashboard':
        return {
          title: language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Management Dashboard',
          icon: ShieldAlert,
          color: 'text-amber-600 dark:text-amber-400',
        };
      default:
        return {
          title: currentView,
          icon: ChevronRight,
          color: 'text-slate-600 dark:text-slate-400',
        };
    }
  };

  const current = getViewDetails();
  const Icon = current.icon;

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200/80 dark:border-slate-800/80 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        {/* Left Side: Prominent Back Button & Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Main Back Button */}
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 transition active:scale-95 shadow-xs shrink-0 group"
            title={language === 'bn' ? 'পূর্ববর্তী পাতায় ফিরে যান' : 'Go back to previous page'}
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'bn' ? 'পেছনে যান' : 'Back'}</span>
          </button>

          {/* Breadcrumb Trail */}
          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'মূল পাতা' : 'Home'}</span>
            </button>

            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />

            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1.5">
              <Icon className={`w-3.5 h-3.5 ${current.color}`} />
              <span className="truncate">{current.title}</span>
            </span>
          </nav>

          {/* Mobile Current View Tag */}
          <div className="sm:hidden flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
            <Icon className={`w-3.5 h-3.5 shrink-0 ${current.color}`} />
            <span className="truncate max-w-[150px]">{current.title}</span>
          </div>
        </div>

        {/* Right Side: Quick Action (Home button shortcut) */}
        <div className="flex items-center gap-2 shrink-0">
          {currentView === 'materials' && (
            <button
              type="button"
              onClick={() => setCurrentView('classes')}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            >
              <GraduationCap className="w-3 h-3 text-indigo-500" />
              <span>{language === 'bn' ? 'শ্রেণি পরিবর্তন' : 'Change Class'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            title={language === 'bn' ? 'মূল পাতায় যান' : 'Go to Home'}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'bn' ? 'হোম' : 'Home'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

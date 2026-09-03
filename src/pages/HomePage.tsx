import React from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  FileCheck,
  FileText,
  GraduationCap,
  Lock,
  Megaphone,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import { HeroBanner } from '../components/home/HeroBanner';
import { ClassSection } from '../components/classes/ClassSection';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const {
    notices,
    studyMaterials,
    subjects,
    setCurrentView,
    setSelectedClassId,
    openDocumentViewer,
    settings,
    language,
    t,
  } = useApp();

  const urgentNotice = notices.find((n) => n.isImportant);
  const recentMaterials = studyMaterials.slice(0, 6);

  const handleWhatsApp = () => {
    const cleanNumber = (settings.whatsappNumber || '919876543210').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      'Hello EASY TO LEARN, I want information about tuition admissions.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Hero Banner with class grid & quick actions */}
      <HeroBanner />

      {/* Urgent Notice Banner if any */}
      {urgentNotice && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => setCurrentView('notices')}
            className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3 cursor-pointer hover:bg-amber-500/20 transition shadow-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-1 rounded-md bg-amber-500 text-slate-950 shrink-0">
                <Megaphone className="w-4 h-4" />
              </span>
              <div className="truncate">
                <strong className="text-xs sm:text-sm uppercase tracking-wide">Notice: </strong>
                <span className="text-xs sm:text-sm font-semibold">
                  {language === 'bn' && urgentNotice.titleBn
                    ? urgentNotice.titleBn
                    : urgentNotice.title}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1 shrink-0">
              Read More <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      )}

      {/* Classes 1 to 10 Structured Section */}
      <ClassSection />

      {/* Highlights & Recent Study Materials Section */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Library Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Study Materials & Notes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Curated chapter notes, solved model questions, and revision suggestions for Classes 1 to 10.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('materials')}
            className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Browse Full Library</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentMaterials.map((mat) => {
            const subject = subjects.find((s) => s.id === mat.subjectId);
            return (
              <div
                key={mat.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                      Class {mat.classId}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {mat.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2">
                    {language === 'bn' && mat.titleBn ? mat.titleBn : mat.title}
                  </h3>

                  {mat.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {mat.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3 text-amber-500" />
                    Read-Only
                  </span>
                  <button
                    onClick={() => openDocumentViewer(mat)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-600 hover:text-white transition flex items-center gap-1"
                  >
                    <span>View Notes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose EASY TO LEARN Coaching Features */}
      <section className="py-10 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Learn with EASY TO LEARN?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Personalized guidance, complete board exam preparation, and organized digital study desks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Structured Syllabus (1 to 10)',
                desc: 'Organized Class -> Subject -> Chapter materials tailored to state and CBSE boards.',
                icon: GraduationCap,
                color: 'text-indigo-600',
              },
              {
                title: 'Read-Only Protected PDFs',
                desc: 'Optimized reading view with zoom, page navigation, and in-document text search.',
                icon: Lock,
                color: 'text-amber-500',
              },
              {
                title: 'Homework & Task Desk',
                desc: 'Daily and weekly assignments, model test papers, and submission date alerts.',
                icon: FileCheck,
                color: 'text-indigo-600',
              },
              {
                title: 'Attendance & Progress Reports',
                desc: 'Parents and students track attendance records, test marks, and fee payment receipts.',
                icon: Award,
                color: 'text-emerald-600',
              },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors shadow-xs space-y-2.5"
                >
                  <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA & Direct WhatsApp Admission Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-indigo-900 border border-indigo-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Enroll Your Child at EASY TO LEARN
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
              Batches are filling fast for Academic Session {settings.academicYear}. Speak directly with {settings.teacherName} for demo class and fee schedules.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admission Query</span>
            </button>
            <button
              onClick={() => setCurrentView('teacher_profile')}
              className="px-5 py-3 rounded-xl bg-indigo-800 hover:bg-indigo-700 border border-indigo-700 text-white font-semibold text-sm transition"
            >
              Teacher Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

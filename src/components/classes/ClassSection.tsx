import React, { useState } from 'react';
import {
  Atom,
  BookOpen,
  Calculator,
  ChevronRight,
  FolderOpen,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ClassSection: React.FC = () => {
  const {
    classes,
    subjects,
    selectedClassId,
    setSelectedClassId,
    setCurrentView,
    setSelectedSubjectId,
    language,
    t,
  } = useApp();

  const [activeTabGroup, setActiveTabGroup] = useState<'all' | 'primary' | 'middle' | 'secondary'>(
    'all'
  );

  const filteredClasses = classes.filter((cls) => {
    if (activeTabGroup === 'primary') return cls.id >= 1 && cls.id <= 4;
    if (activeTabGroup === 'middle') return cls.id >= 5 && cls.id <= 8;
    if (activeTabGroup === 'secondary') return cls.id >= 9 && cls.id <= 10;
    return true;
  });

  const handleSelectClass = (classId: number) => {
    setSelectedClassId(classId);
    setSelectedSubjectId(null);
    setCurrentView('materials');
  };

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Curriculum Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.selectClass}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse structured subject dashboards, chapter notes, and exam papers from Class 1 to 10.
          </p>
        </div>

        {/* Group Filter Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTabGroup('all')}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTabGroup === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.allClasses}
          </button>
          <button
            onClick={() => setActiveTabGroup('primary')}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTabGroup === 'primary'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.primaryClasses}
          </button>
          <button
            onClick={() => setActiveTabGroup('middle')}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTabGroup === 'middle'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.middleClasses}
          </button>
          <button
            onClick={() => setActiveTabGroup('secondary')}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              activeTabGroup === 'secondary'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.secondaryClasses}
          </button>
        </div>
      </div>

      {/* Grid of Class Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredClasses.map((cls) => {
          const classSubjects = subjects.filter((s) => s.classId === cls.id);
          const isCurrentSelected = selectedClassId === cls.id;

          return (
            <div
              key={cls.id}
              onClick={() => handleSelectClass(cls.id)}
              className={`group p-5 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-slate-800/80 hover:shadow-lg flex flex-col justify-between relative overflow-hidden ${
                isCurrentSelected
                  ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              {/* Top Accent Stripe */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cls.color}`}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700/80 flex items-center justify-center font-black text-slate-800 dark:text-white text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-2xs">
                    {cls.shortCode}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {classSubjects.length} Subjects
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {language === 'bn' && cls.nameBn ? cls.nameBn : cls.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {language === 'bn' && cls.descriptionBn ? cls.descriptionBn : cls.description}
                </p>

                {/* Preview sample subjects */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {classSubjects.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      {language === 'bn' && sub.nameBn ? sub.nameBn : sub.name}
                    </span>
                  ))}
                  {classSubjects.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
                      +{classSubjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                <span>Enter Class Desk</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

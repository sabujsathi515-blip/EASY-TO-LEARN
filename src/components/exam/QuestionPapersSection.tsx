import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileQuestion,
  FileText,
  Filter,
  Lock,
  Search,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial } from '../../types';

export const QuestionPapersSection: React.FC = () => {
  const {
    studyMaterials,
    subjects,
    classes,
    openDocumentViewer,
    selectedClassId,
    setSelectedClassId,
    language,
    t,
  } = useApp();

  const [filterClass, setFilterClass] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all question papers, tests, and practice sets
  const examMaterials = useMemo(() => {
    return studyMaterials.filter(
      (m) =>
        m.category === 'question_papers' ||
        m.category === 'class_tests' ||
        m.category === 'practice_sets' ||
        m.category === 'suggestions'
    );
  }, [studyMaterials]);

  const filteredPapers = useMemo(() => {
    return examMaterials.filter((m) => {
      if (filterClass !== 'all' && m.classId !== filterClass) return false;
      if (filterType !== 'all' && m.category !== filterType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle =
          m.title.toLowerCase().includes(q) || (m.titleBn || '').toLowerCase().includes(q);
        if (!matchesTitle) return false;
      }
      return true;
    });
  }, [examMaterials, filterClass, filterType, searchQuery]);

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          <Award className="w-3.5 h-3.5" />
          <span>Evaluation & Test Bank</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t.questionPapers} & Model Tests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Access Unit Tests, Half-Yearly and Annual model questions, previous board papers, and
          chapter-wise mock tests in protected <strong>Read-Only format</strong>.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Exam Type filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              All Tests & Papers
            </button>
            <button
              onClick={() => setFilterType('question_papers')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterType === 'question_papers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Question Papers
            </button>
            <button
              onClick={() => setFilterType('suggestions')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterType === 'suggestions'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Suggestions & Model Papers
            </button>
            <button
              onClick={() => setFilterType('practice_sets')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterType === 'practice_sets'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Practice Sets
            </button>
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search paper..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Class Filter row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Class:</span>
          <button
            onClick={() => setFilterClass('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition shrink-0 ${
              filterClass === 'all'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Classes
          </button>
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((cls) => (
            <button
              key={cls}
              onClick={() => setFilterClass(cls)}
              className={`px-2.5 py-1 rounded-lg font-bold transition shrink-0 ${
                filterClass === cls
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Class {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Papers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.length === 0 ? (
          <div className="col-span-2 bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <FileQuestion className="w-10 h-10 mx-auto mb-2 opacity-40 text-amber-500" />
            <p className="text-sm font-semibold">No question papers matching this filter.</p>
          </div>
        ) : (
          filteredPapers.map((paper) => {
            const subject = subjects.find((s) => s.id === paper.subjectId);

            return (
              <div
                key={paper.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-600 text-white">
                        Class {paper.classId}
                      </span>
                      {subject && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {language === 'bn' && subject.nameBn ? subject.nameBn : subject.name}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                      {paper.year || '2026'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {language === 'bn' && paper.titleBn ? paper.titleBn : paper.title}
                    </h3>
                    {paper.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {paper.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                    <span>Full Marks: {paper.marks || 90}</span>
                    <span>•</span>
                    <span>{paper.totalPages || 2} Pages</span>
                    <span>•</span>
                    <span>{paper.format.toUpperCase()}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-500" />
                    Read-Only Protected
                  </span>
                  <button
                    onClick={() => openDocumentViewer(paper)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                  >
                    <span>View Question Paper</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

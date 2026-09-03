import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Eye,
  FileCheck,
  FileQuestion,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  Layers,
  Lock,
  Plus,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialCategory, StudyMaterial } from '../../types';

export const StudyMaterialsSection: React.FC = () => {
  const {
    classes,
    subjects,
    chapters,
    studyMaterials,
    selectedClassId,
    setSelectedClassId,
    selectedSubjectId,
    setSelectedSubjectId,
    selectedChapterId,
    setSelectedChapterId,
    openDocumentViewer,
    currentUser,
    setCurrentView,
    language,
    t,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<MaterialCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Class subjects
  const currentClassSubjects = useMemo(() => {
    return subjects.filter((s) => s.classId === selectedClassId);
  }, [subjects, selectedClassId]);

  // Set default subject if not selected
  const activeSubject = useMemo(() => {
    if (selectedSubjectId) {
      const found = currentClassSubjects.find((s) => s.id === selectedSubjectId);
      if (found) return found;
    }
    return currentClassSubjects[0] || null;
  }, [currentClassSubjects, selectedSubjectId]);

  // Chapters for active subject
  const currentChapters = useMemo(() => {
    if (!activeSubject) return [];
    return chapters.filter(
      (c) => c.classId === selectedClassId && c.subjectId === activeSubject.id
    );
  }, [chapters, selectedClassId, activeSubject]);

  // Active chapter
  const activeChapter = useMemo(() => {
    if (selectedChapterId) {
      const found = currentChapters.find((c) => c.id === selectedChapterId);
      if (found) return found;
    }
    return null; // all chapters by default
  }, [currentChapters, selectedChapterId]);

  // Categories list with labels and icons
  const categoriesList: { id: MaterialCategory | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Resources', icon: Layers },
    { id: 'chapter_notes', label: t.chapter_notes, icon: BookOpen },
    { id: 'pdf_notes', label: t.pdf_notes, icon: FileText },
    { id: 'question_papers', label: t.question_papers, icon: FileQuestion },
    { id: 'suggestions', label: t.suggestions, icon: Trophy },
    { id: 'worksheets', label: t.worksheets, icon: FileSpreadsheet },
    { id: 'homework', label: t.homework_cat, icon: FileCheck },
    { id: 'class_tests', label: t.class_tests, icon: FileQuestion },
    { id: 'important_questions', label: t.important_questions, icon: Sparkles },
    { id: 'practice_sets', label: t.practice_sets, icon: Layers },
  ];

  // Filtered materials
  const displayedMaterials = useMemo(() => {
    return studyMaterials.filter((mat) => {
      // Must match selected class
      if (mat.classId !== selectedClassId) return false;

      // Match subject if selected
      if (activeSubject && mat.subjectId !== activeSubject.id) return false;

      // Match chapter if selected
      if (activeChapter && mat.chapterId !== activeChapter.id) return false;

      // Category filter
      if (activeCategory !== 'all' && mat.category !== activeCategory) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle =
          mat.title.toLowerCase().includes(q) || (mat.titleBn || '').toLowerCase().includes(q);
        const matchesDesc = (mat.description || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }

      return true;
    });
  }, [
    studyMaterials,
    selectedClassId,
    activeSubject,
    activeChapter,
    activeCategory,
    searchQuery,
  ]);

  const currentClassInfo = classes.find((c) => c.id === selectedClassId);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header: Class Switcher & Info */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                Class {selectedClassId}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'bn' && currentClassInfo?.nameBn
                  ? currentClassInfo.nameBn
                  : currentClassInfo?.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t.studyMaterials} & Document Library
            </h1>
          </div>

          {/* Class Select Dropdown / Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
              <button
                key={cls}
                onClick={() => {
                  setSelectedClassId(cls);
                  setSelectedSubjectId(null);
                  setSelectedChapterId(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition shrink-0 ${
                  selectedClassId === cls
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                C{cls}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Horizontal Bar */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Subjects for Class {selectedClassId}:
            </span>
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin_dashboard')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Manage Subjects & Chapters</span>
              </button>
            )}
          </div>

          {currentClassSubjects.length === 0 ? (
            <p className="text-xs text-slate-400 py-2">No subjects found for this class.</p>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {currentClassSubjects.map((sub) => {
                const isSelected = activeSubject?.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      setSelectedChapterId(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>{language === 'bn' && sub.nameBn ? sub.nameBn : sub.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Chapters Sidebar & Study Materials Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Chapter Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>
                  Chapters (
                  {language === 'bn' && activeSubject?.nameBn
                    ? activeSubject.nameBn
                    : activeSubject?.name}
                  )
                </span>
              </h3>
              <button
                onClick={() => setSelectedChapterId(null)}
                className={`text-xs font-semibold px-2 py-0.5 rounded-lg transition ${
                  selectedChapterId === null
                    ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                All
              </button>
            </div>

            {currentChapters.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                <span>No chapters added yet for this subject.</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                {currentChapters.map((chap) => {
                  const isSelected = selectedChapterId === chap.id;
                  const chapterMatCount = studyMaterials.filter(
                    (m) => m.chapterId === chap.id
                  ).length;

                  return (
                    <button
                      key={chap.id}
                      onClick={() => setSelectedChapterId(chap.id)}
                      className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between text-xs sm:text-sm font-medium ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono text-xs opacity-60 mr-1.5">
                          #{chap.chapterNo}
                        </span>
                        <span>{language === 'bn' && chap.titleBn ? chap.titleBn : chap.title}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                        {chapterMatCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Read-Only Protection Badge Info */}
          <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>Protected Study Environment</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Notes and PDFs are opened in our custom <strong>Read-Only Viewer</strong> with zoom, page navigation, and text search. Direct downloading and saving are disabled.
            </p>
          </div>
        </div>

        {/* Right: Study Materials List & Category Filter */}
        <div className="lg:col-span-8 space-y-4">
          {/* Category Chips Bar */}
          <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2 overflow-x-auto text-xs">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar inside view */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword or title..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 absolute right-3 top-2.5 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Study Material Cards */}
          {displayedMaterials.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
                No Materials Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                No items match your selected subject or category. Try choosing "All Resources" or
                switch chapters.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedMaterials.map((mat) => {
                const chapter = chapters.find((c) => c.id === mat.chapterId);

                return (
                  <div
                    key={mat.id}
                    className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                        {mat.format === 'pdf' ? (
                          <FileText className="w-6 h-6" />
                        ) : (
                          <BookOpen className="w-6 h-6" />
                        )}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 uppercase">
                            {mat.category.replace('_', ' ')}
                          </span>
                          {mat.format === 'pdf' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                              PDF DOCUMENT
                            </span>
                          )}
                          {mat.isSampleContent && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                              Demo
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                          {language === 'bn' && mat.titleBn ? mat.titleBn : mat.title}
                        </h3>

                        {mat.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {mat.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                          {chapter && (
                            <span>
                              Ch {chapter.chapterNo}:{' '}
                              {language === 'bn' && chapter.titleBn
                                ? chapter.titleBn
                                : chapter.title}
                            </span>
                          )}
                          <span>•</span>
                          <span>{mat.totalPages || 1} Pages</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {mat.viewCount} views
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button: READ ONLY */}
                    <div className="shrink-0 flex items-center gap-2 sm:self-center">
                      <button
                        onClick={() => openDocumentViewer(mat)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center justify-center gap-2"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t.viewMaterial}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

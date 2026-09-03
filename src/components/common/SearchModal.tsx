import React, { useMemo, useState } from 'react';
import { BookOpen, FileText, Search, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial } from '../../types';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    studyMaterials,
    subjects,
    chapters,
    classes,
    openDocumentViewer,
    setSelectedClassId,
    setCurrentView,
    language,
    t,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<number | 'all'>('all');

  const filteredResults = useMemo(() => {
    if (!query.trim() && selectedClassFilter === 'all') return [];

    const terms = query.toLowerCase().split(' ').filter(Boolean);

    return studyMaterials.filter((mat) => {
      // Class filter
      if (selectedClassFilter !== 'all' && mat.classId !== selectedClassFilter) {
        return false;
      }

      if (terms.length === 0) return true;

      // Find subject and chapter names
      const subject = subjects.find((s) => s.id === mat.subjectId);
      const chapter = chapters.find((c) => c.id === mat.chapterId);
      const classLevel = classes.find((c) => c.id === mat.classId);

      const searchableText = [
        mat.title,
        mat.titleBn || '',
        mat.description || '',
        mat.category,
        mat.format,
        mat.author,
        ...(mat.tags || []),
        subject?.name || '',
        subject?.nameBn || '',
        chapter?.title || '',
        chapter?.titleBn || '',
        classLevel?.name || '',
        classLevel?.nameBn || '',
        `Class ${mat.classId}`,
        `Class-${mat.classId}`,
        `C${mat.classId}`,
      ]
        .join(' ')
        .toLowerCase();

      return terms.every((t) => searchableText.includes(t));
    });
  }, [query, selectedClassFilter, studyMaterials, subjects, chapters, classes]);

  if (!isSearchOpen) return null;

  const handleOpenMaterial = (mat: StudyMaterial) => {
    setSelectedClassId(mat.classId);
    openDocumentViewer(mat);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mt-6 sm:mt-12 flex flex-col max-h-[85vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden text-sm sm:text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Class Chips */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] font-medium shrink-0 mr-1">Filter Class:</span>
          <button
            onClick={() => setSelectedClassFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition shrink-0 ${
              selectedClassFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Classes
          </button>
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedClassFilter(c)}
              className={`px-2.5 py-1 rounded-lg font-medium transition shrink-0 ${
                selectedClassFilter === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Class {c}
            </button>
          ))}
        </div>

        {/* Suggestions or Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' && selectedClassFilter === 'all' ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-blue-500 opacity-60" />
              <p className="text-sm font-medium">
                Try searching like: <span className="text-blue-600 dark:text-blue-400 font-semibold">“Class 10 Mathematics”</span>, <span className="text-blue-600 dark:text-blue-400 font-semibold">“Gas Laws”</span>, or <span className="text-blue-600 dark:text-blue-400 font-semibold">“Suggestions”</span>
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs">
                {['Class 10 Math', 'Quadratic Equations', 'Boyle’s Law', 'Class 8 Rational', 'Model Paper 2026'].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setQuery(sample)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm font-medium">No study materials found matching "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching with fewer keywords or select All Classes.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                {filteredResults.length} Materials Found
              </p>
              {filteredResults.map((mat) => {
                const subject = subjects.find((s) => s.id === mat.subjectId);
                const chapter = chapters.find((c) => c.id === mat.chapterId);

                return (
                  <div
                    key={mat.id}
                    onClick={() => handleOpenMaterial(mat)}
                    className="group p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-slate-800/70 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all cursor-pointer flex items-start gap-3 shadow-xs"
                  >
                    <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 shrink-0">
                      {mat.format === 'pdf' ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <BookOpen className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white">
                          Class {mat.classId}
                        </span>
                        {subject && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {language === 'bn' && subject.nameBn ? subject.nameBn : subject.name}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                          {mat.category.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {language === 'bn' && mat.titleBn ? mat.titleBn : mat.title}
                      </h4>
                      {chapter && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          Ch {chapter.chapterNo}:{' '}
                          {language === 'bn' && chapter.titleBn ? chapter.titleBn : chapter.title}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0 self-center">
                      <span className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
                        {t.viewMaterial}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Click on any result to open the Read-Only Document Viewer</span>
          <span className="font-mono text-[11px]">ESC to close</span>
        </div>
      </div>
    </div>
  );
};

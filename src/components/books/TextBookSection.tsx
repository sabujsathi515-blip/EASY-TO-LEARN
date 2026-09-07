import React, { useMemo, useState } from 'react';
import {
  Book,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WB_TEXTBOOKS } from '../../data/wbTextBooksData';
import { StudyMaterial, TextBook } from '../../types';
import { BackButton } from '../common/BackButton';

export const TextBookSection: React.FC = () => {
  const { openDocumentViewer, setSelectedClassId, language, t, showToast } = useApp();

  const [selectedClass, setSelectedClass] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBoard, setSelectedBoard] = useState<'all' | 'WBBSE' | 'WBBPE'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBookForChapters, setActiveBookForChapters] = useState<TextBook | null>(null);

  // Filter books based on class, category, board, and search query
  const filteredBooks = useMemo(() => {
    return WB_TEXTBOOKS.filter((book) => {
      if (selectedClass !== 'all' && book.classId !== selectedClass) {
        return false;
      }
      if (selectedCategory !== 'all' && book.category !== selectedCategory) {
        return false;
      }
      if (selectedBoard !== 'all' && book.board !== selectedBoard) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const searchable = [
          book.title,
          book.titleBn,
          book.subject,
          book.subjectBn,
          book.description,
          book.descriptionBn,
          book.publisher,
          book.publisherBn,
          `class ${book.classId}`,
          `c${book.classId}`,
          ...book.chapters.map((c) => `${c.title} ${c.titleBn}`),
        ]
          .join(' ')
          .toLowerCase();

        if (!searchable.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [selectedClass, selectedCategory, selectedBoard, searchQuery]);

  // Open book in the app's protected Read-Only DocumentViewer
  const handleReadBook = (book: TextBook) => {
    setSelectedClassId(book.classId);

    // Convert textbook pages into StudyMaterial format for DocumentViewer
    const materialAdapter: StudyMaterial = {
      id: book.id,
      classId: book.classId,
      subjectId: book.subject.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      title: `${book.titleBn} (${book.title})`,
      titleBn: `${book.titleBn} - ${book.publisherBn}`,
      category: 'chapter_notes',
      format: 'rich_notes',
      description: `${book.descriptionBn} (${book.board} Official Textbook)`,
      totalPages: book.pages && book.pages.length > 0 ? book.pages.length : 1,
      pages: book.pages && book.pages.length > 0 ? book.pages : [
        {
          pageNo: 1,
          title: `${book.titleBn} - অধ্যায় সূচিপত্র`,
          content: `# ${book.titleBn} (${book.title})
### ${book.publisherBn}
**শ্রেণি:** ${book.classId}ম শ্রেণি • **বোর্ড:** ${book.board}
**শিক্ষাবর্ষ:** ${book.academicYear}

---

## 📚 অধ্যায় সূচিপত্র (Syllabus & Chapters):
${book.chapters.map((c) => `### ${c.chapterNo}. ${c.titleBn} (${c.title})`).join('\n\n')}

---
*উৎস: পশ্চিমবঙ্গ সরকার শিক্ষা বিভাগ ও পর্ষদ অনুমোদিত পাঠ্যক্রম। পূর্ণাঙ্গ পাঠ্যপুস্তকের জন্য কোচিং ব্যাচ ও স্টাডি মেটেরিয়াল দেখুন।*`
        }
      ],
      uploadDate: '2026-01-01',
      author: book.publisherBn,
      viewCount: 142,
      tags: ['textbook', 'wb_board', book.board, `class_${book.classId}`],
      year: book.academicYear,
    };

    openDocumentViewer(materialAdapter);
    showToast(`${book.titleBn} খোলা হয়েছে (Read-Only Mode)`, 'success');
  };

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সকল বিষয়' : 'All Subjects' },
    { id: 'language', label: language === 'bn' ? 'ভাষা ও সাহিত্য' : 'Language & Lit' },
    { id: 'mathematics', label: language === 'bn' ? 'গণিত' : 'Mathematics' },
    { id: 'science', label: language === 'bn' ? 'বিজ্ঞান' : 'Science' },
    { id: 'social_science', label: language === 'bn' ? 'ইতিহাস ও ভূগোল' : 'History & Geography' },
    { id: 'general', label: language === 'bn' ? 'সমন্বিত পাঠ' : 'Integrated' },
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Navigation Button */}
        <div className="flex items-center justify-between">
          <BackButton showHomeShortcut />
        </div>

        {/* Header Banner */}
        <div className="bg-indigo-900 border border-indigo-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-800/90 text-indigo-200 border border-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>West Bengal Board (WBBSE & WBBPE) Textbooks</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {language === 'bn'
                ? 'পশ্চিমবঙ্গ পর্ষদ পাঠ্যপুস্তক বিভাগ'
                : 'West Bengal Board Official Text Books'}
            </h1>

            <p className="text-sm sm:text-base text-indigo-100 font-normal leading-relaxed">
              {language === 'bn'
                ? '১ম থেকে ১০ম শ্রেণির পশ্চিমবঙ্গ প্রাথমিক (WBBPE) ও মাধ্যমিক (WBBSE) শিক্ষা পর্ষদ অনুমোদিত সমস্ত পাঠ্যবই, অধ্যায়সূচি এবং সুরক্ষিত অনলাইন রিডার।'
                : 'Complete collection of official West Bengal Board textbooks for Classes 1 to 10 with verified chapter breakdowns, key formulas, and read-only digital reader.'}
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2 text-xs font-semibold">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-indigo-100 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ১০টি শ্রেণির সকল প্রধান বই
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-indigo-100 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                WBBSE মাধ্যমিক ও WBBPE প্রাথমিক
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-indigo-100 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-300" />
                সুরক্ষিত অনলাইন পড়ার সুবিধা
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'বইয়ের নাম, শ্রেণি, বিষয় বা অধ্যায় খুঁজুন (যেমন: সহজ পাঠ, গণিত প্রকাশ, সাহিত্য মেলা, কোনি)...'
                  : 'Search by book title, class, or subject (e.g. Sahaj Path, Ganit Prakash, Sahitya Mela)...'
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Class Selector Pills (1 to 10) */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'bn' ? 'শ্রেণি অনুযায়ী বেছে নিন:' : 'Filter by Class:'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedClass('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedClass === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'bn' ? 'সব শ্রেণি (১ - ১০)' : 'All Classes'}
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    selectedClass === cls
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{language === 'bn' ? `${cls}ম শ্রেণি` : `Class ${cls}`}</span>
                  {cls === 10 && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1 rounded-sm">
                      মাদ্যমিক
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Category & Board Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Board Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium">
                {language === 'bn' ? 'বোর্ড:' : 'Board:'}
              </span>
              <button
                onClick={() => setSelectedBoard('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  selectedBoard === 'all'
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedBoard('WBBPE')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  selectedBoard === 'WBBPE'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-500 hover:text-emerald-600'
                }`}
              >
                WBBPE (Primary 1-5)
              </button>
              <button
                onClick={() => setSelectedBoard('WBBSE')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  selectedBoard === 'WBBSE'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                WBBSE (Secondary 6-10)
              </button>
            </div>
          </div>
        </div>

        {/* Results Count & Current Filter Indicator */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div>
            {language === 'bn' ? (
              <span>
                মোট <strong>{filteredBooks.length}</strong> টি পাঠ্যবই পাওয়া গেছে
                {selectedClass !== 'all' ? ` (${selectedClass}ম শ্রেণির)` : ''}
              </span>
            ) : (
              <span>
                Showing <strong>{filteredBooks.length}</strong> textbooks
                {selectedClass !== 'all' ? ` for Class ${selectedClass}` : ''}
              </span>
            )}
          </div>

          {(selectedClass !== 'all' || selectedCategory !== 'all' || selectedBoard !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedClass('all');
                setSelectedCategory('all');
                setSelectedBoard('all');
                setSearchQuery('');
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Clear all filters'}
            </button>
          )}
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              {language === 'bn' ? 'কোনো পাঠ্যবই পাওয়া যায়নি' : 'No textbooks found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'bn'
                ? 'অনুসন্ধানের শব্দ পরিবর্তন করে বা অন্য শ্রেণি নির্বাচন করে আবার চেষ্টা করুন।'
                : 'Try clearing your search query or selecting a different class filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col overflow-hidden group"
              >
                {/* Book Header Stripe */}
                <div className={`p-4 bg-linear-to-r ${book.coverColor} text-white relative`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-black/25 backdrop-blur-xs border border-white/20">
                      Class {book.classId} • {book.board}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 uppercase tracking-wider">
                      {book.edition}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                      {book.titleBn}
                    </h3>
                    <p className="text-xs text-white/90 font-medium">{book.title}</p>
                  </div>
                </div>

                {/* Book Body Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {book.subjectBn}
                      </span>
                      <span>{book.totalChapters} টি অধ্যায়</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {book.descriptionBn}
                    </p>

                    <div className="text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2.5">
                      <span className="font-medium text-slate-500 dark:text-slate-400">প্রকাশক: </span>
                      <span>{book.publisherBn}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleReadBook(book)}
                      className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'বইটি পড়ুন' : 'Read Book'}</span>
                    </button>

                    <button
                      onClick={() => setActiveBookForChapters(book)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-500" />
                      <span>{language === 'bn' ? 'সূচিপত্র' : 'Chapters'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chapter Modal Drawer */}
        {activeBookForChapters && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div
                className={`p-5 bg-linear-to-r ${activeBookForChapters.coverColor} text-white flex items-start justify-between gap-4`}
              >
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-black/25">
                    Class {activeBookForChapters.classId} • {activeBookForChapters.board}
                  </span>
                  <h2 className="text-xl font-bold mt-1">{activeBookForChapters.titleBn}</h2>
                  <p className="text-xs text-white/90">
                    {activeBookForChapters.title} • {activeBookForChapters.subjectBn}
                  </p>
                </div>
                <button
                  onClick={() => setActiveBookForChapters(null)}
                  className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chapters List */}
              <div className="p-6 overflow-y-auto space-y-3 flex-1">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'bn' ? 'পূর্ণাঙ্গ অধ্যায়সূচি' : 'Complete Chapter Syllabus'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {activeBookForChapters.chapters.length} Chapters
                  </span>
                </div>

                <div className="space-y-2">
                  {activeBookForChapters.chapters.map((chap) => (
                    <div
                      key={chap.chapterNo}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-800/50 flex items-start gap-3 transition"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {chap.chapterNo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {chap.titleBn}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {chap.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={activeBookForChapters.officialPortalUrl || 'https://banglarsiksha.gov.in'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{language === 'bn' ? 'বাংলার শিক্ষা পোর্টাল' : 'Banglar Shiksha Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveBookForChapters(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  >
                    {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>

                  <button
                    onClick={() => {
                      const book = activeBookForChapters;
                      setActiveBookForChapters(null);
                      handleReadBook(book);
                    }}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'অনলাইন পড়ুন' : 'Read Online'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Book,
  BookOpen,
  CheckCircle2,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Filter,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial, TextBook, TextBookChapter } from '../../types';

interface AdminTextBooksProps {
  adminClassId?: number;
  onSelectClass?: (classId: number) => void;
}

const COVER_GRADIENTS = [
  { id: 'from-amber-500 to-orange-600', label: 'Amber Orange' },
  { id: 'from-emerald-600 to-teal-700', label: 'Emerald Teal' },
  { id: 'from-blue-600 to-indigo-700', label: 'Blue Indigo' },
  { id: 'from-violet-600 to-purple-800', label: 'Violet Purple' },
  { id: 'from-rose-600 to-pink-700', label: 'Rose Pink' },
  { id: 'from-cyan-600 to-blue-700', label: 'Cyan Ocean' },
  { id: 'from-slate-700 to-slate-900', label: 'Slate Dark' },
];

export const AdminTextBooks: React.FC<AdminTextBooksProps> = ({
  adminClassId = 10,
  onSelectClass,
}) => {
  const {
    textbooks,
    addTextBook,
    updateTextBook,
    deleteTextBook,
    openDocumentViewer,
    setSelectedClassId,
    language,
    showToast,
  } = useApp();

  // Filters
  const [selectedClassFilter, setSelectedClassFilter] = useState<number | 'all'>('all');
  const [selectedBoardFilter, setSelectedBoardFilter] = useState<'all' | 'WBBSE' | 'WBBPE'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [classId, setClassId] = useState<number>(adminClassId || 10);
  const [board, setBoard] = useState<'WBBSE' | 'WBBPE'>(adminClassId <= 5 ? 'WBBPE' : 'WBBSE');
  const [subject, setSubject] = useState('');
  const [subjectBn, setSubjectBn] = useState('');
  const [category, setCategory] = useState<TextBook['category']>('mathematics');
  const [publisher, setPublisher] = useState('West Bengal Board of Secondary Education');
  const [publisherBn, setPublisherBn] = useState('পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ');
  const [edition, setEdition] = useState('Official Syllabus 2026-2027');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [coverColor, setCoverColor] = useState('from-blue-600 to-indigo-700');
  const [description, setDescription] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [totalChapters, setTotalChapters] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(120);
  const [officialPortalUrl, setOfficialPortalUrl] = useState('https://banglarsiksha.gov.in');

  // File Upload State
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Delete confirmation
  const [bookToDelete, setBookToDelete] = useState<TextBook | null>(null);

  // Update board when class changes
  const handleClassChange = (newClass: number) => {
    setClassId(newClass);
    if (newClass <= 5) {
      setBoard('WBBPE');
      setPublisher('West Bengal Board of Primary Education');
      setPublisherBn('পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ');
    } else {
      setBoard('WBBSE');
      setPublisher('West Bengal Board of Secondary Education');
      setPublisherBn('পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ');
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingBookId(null);
    setTitle('');
    setTitleBn('');
    const targetClass = selectedClassFilter !== 'all' ? selectedClassFilter : adminClassId || 10;
    setClassId(targetClass);
    if (targetClass <= 5) {
      setBoard('WBBPE');
      setPublisher('West Bengal Board of Primary Education');
      setPublisherBn('পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ');
      setCoverColor('from-amber-500 to-orange-600');
    } else {
      setBoard('WBBSE');
      setPublisher('West Bengal Board of Secondary Education');
      setPublisherBn('পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ');
      setCoverColor('from-blue-600 to-indigo-700');
    }
    setSubject('');
    setSubjectBn('');
    setCategory('mathematics');
    setEdition('Official Syllabus 2026-2027');
    setAcademicYear('2026-2027');
    setDescription('');
    setDescriptionBn('');
    setTotalChapters(8);
    setTotalPages(120);
    setOfficialPortalUrl('https://banglarsiksha.gov.in');
    setFileUrl('');
    setFileName('');
    setFileSize('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (book: TextBook) => {
    setEditingBookId(book.id);
    setTitle(book.title);
    setTitleBn(book.titleBn);
    setClassId(book.classId);
    setBoard(book.board);
    setSubject(book.subject);
    setSubjectBn(book.subjectBn);
    setCategory(book.category);
    setPublisher(book.publisher);
    setPublisherBn(book.publisherBn);
    setEdition(book.edition);
    setAcademicYear(book.academicYear);
    setCoverColor(book.coverColor || 'from-blue-600 to-indigo-700');
    setDescription(book.description);
    setDescriptionBn(book.descriptionBn);
    setTotalChapters(book.totalChapters);
    setTotalPages(book.totalPages);
    setOfficialPortalUrl(book.officialPortalUrl || 'https://banglarsiksha.gov.in');
    setFileUrl(book.fileUrl || '');
    setFileName(book.fileName || '');
    setFileSize(book.fileSize || '');
    setIsModalOpen(true);
  };

  // Handle File Selection (PDF or Image)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 25MB for browser memory)
    if (file.size > 25 * 1024 * 1024) {
      showToast('File size exceeds 25MB limit. Please upload a smaller PDF or image.', 'error');
      return;
    }

    setIsUploading(true);
    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;

    setFileName(file.name);
    setFileSize(formattedSize);

    const reader = new FileReader();
    reader.onload = () => {
      setFileUrl(reader.result as string);
      setIsUploading(false);
      showToast(`Selected file: ${file.name} (${formattedSize})`, 'success');
    };
    reader.onerror = () => {
      setIsUploading(false);
      showToast('Failed to read selected file', 'error');
    };
    reader.readAsDataURL(file);
  };

  // Submit Save
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() && !titleBn.trim()) {
      showToast('Please provide a title for the textbook (বইয়ের নাম লিখুন)', 'warning');
      return;
    }

    const finalTitle = title.trim() || titleBn.trim();
    const finalTitleBn = titleBn.trim() || title.trim();
    const finalSubject = subject.trim() || 'General';
    const finalSubjectBn = subjectBn.trim() || finalSubject;

    const bookPayload: Omit<TextBook, 'id'> = {
      classId,
      title: finalTitle,
      titleBn: finalTitleBn,
      subject: finalSubject,
      subjectBn: finalSubjectBn,
      category,
      board,
      publisher: publisher.trim() || (board === 'WBBSE' ? 'West Bengal Board of Secondary Education' : 'West Bengal Board of Primary Education'),
      publisherBn: publisherBn.trim() || (board === 'WBBSE' ? 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ' : 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ'),
      edition: edition.trim() || 'Official Syllabus 2026-2027',
      academicYear: academicYear.trim() || '2026-2027',
      coverColor,
      description: description.trim() || `Official ${board} Curriculum Textbook for Class ${classId}`,
      descriptionBn: descriptionBn.trim() || `${classId}ম শ্রেণির পশ্চিমবঙ্গ পর্ষদ অনুমোদিত পাঠ্যবই (${board})`,
      totalChapters: Number(totalChapters) || 1,
      totalPages: Number(totalPages) || 50,
      officialPortalUrl: officialPortalUrl.trim() || 'https://banglarsiksha.gov.in',
      fileUrl: fileUrl || undefined,
      fileName: fileName || undefined,
      fileSize: fileSize || undefined,
      chapters: [
        { chapterNo: 1, title: `${finalTitle} - Chapter 1`, titleBn: `${finalTitleBn} - প্রথম অধ্যায়` }
      ],
      pages: [
        {
          pageNo: 1,
          title: `${finalTitleBn} - সূচিপত্র ও বিষয়বস্তু`,
          content: `# ${finalTitleBn} (${finalTitle})\n### ${publisherBn}\n**শ্রেণি:** ${classId}ম শ্রেণি • **বোর্ড:** ${board}\n**শিক্ষাবর্ষ:** ${academicYear}\n\n---\n\n## 📚 পাঠ্যক্রম ও অধ্যায় বিবরণ\n- পশ্চিমবঙ্গ শিক্ষা দপ্তর ও পর্ষদ অনুমোদিত পাঠ্যবই।\n${fileName ? `- **সংযুক্ত ফাইল:** ${fileName} (${fileSize})` : '- অনলাইনে পড়ার জন্য উপলব্ধ।'}\n\n*পূর্ণাঙ্গ ব্যাচ ও সমাধানের জন্য কোচিং ক্লাসে যোগাযোগ করুন।*`
        }
      ]
    };

    if (editingBookId) {
      updateTextBook(editingBookId, bookPayload);
      showToast(`বই "${finalTitleBn}" সফলভাবে আপডেট করা হয়েছে`, 'success');
    } else {
      addTextBook(bookPayload);
      showToast(`বই "${finalTitleBn}" সফলভাবে আপলোড ও যোগ করা হয়েছে`, 'success');
    }

    setIsModalOpen(false);
    setEditingBookId(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!bookToDelete) return;
    deleteTextBook(bookToDelete.id);
    showToast(`বই "${bookToDelete.titleBn}" সফলভাবে ডিলিট করা হয়েছে`, 'info');
    setBookToDelete(null);
  };

  // Open Book in DocumentViewer
  const handleReadBook = (book: TextBook) => {
    setSelectedClassId(book.classId);

    const isImage = book.fileUrl?.startsWith('data:image');
    const hasFile = Boolean(book.fileUrl);

    const materialAdapter: StudyMaterial = {
      id: book.id,
      classId: book.classId,
      subjectId: book.subject.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      title: `${book.titleBn} (${book.title})`,
      titleBn: `${book.titleBn} - ${book.publisherBn}`,
      category: 'chapter_notes',
      format: hasFile ? (isImage ? 'image' : 'pdf') : 'rich_notes',
      fileUrl: book.fileUrl,
      fileName: book.fileName,
      fileSize: book.fileSize,
      description: `${book.descriptionBn} (${book.board} Official Textbook)`,
      totalPages: book.pages && book.pages.length > 0 ? book.pages.length : 1,
      pages: book.pages && book.pages.length > 0 ? book.pages : [
        {
          pageNo: 1,
          title: `${book.titleBn} - অধ্যায় সূচিপত্র`,
          content: `# ${book.titleBn} (${book.title})\n### ${book.publisherBn}\n**শ্রেণি:** ${book.classId}ম শ্রেণি • **বোর্ড:** ${book.board}\n**শিক্ষাবর্ষ:** ${book.academicYear}\n\n---\n\n## 📚 অধ্যায় সূচিপত্র (Syllabus & Chapters):\n${book.chapters.map((c) => `### ${c.chapterNo}. ${c.titleBn} (${c.title})`).join('\n\n')}\n\n---\n*উৎস: পশ্চিমবঙ্গ সরকার শিক্ষা বিভাগ ও পর্ষদ অনুমোদিত পাঠ্যক্রম।*`
        }
      ],
      uploadDate: book.uploadDate || '2026-01-01',
      author: book.publisherBn,
      viewCount: 150,
      tags: ['textbook', 'wb_board', book.board, `class_${book.classId}`],
      year: book.academicYear,
    };

    openDocumentViewer(materialAdapter);
    showToast(`${book.titleBn} ভিউয়ারে খোলা হয়েছে`, 'info');
  };

  // Filtered books list
  const filteredBooks = useMemo(() => {
    return textbooks.filter((book) => {
      if (selectedClassFilter !== 'all' && book.classId !== selectedClassFilter) {
        return false;
      }
      if (selectedBoardFilter !== 'all' && book.board !== selectedBoardFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const searchable = [
          book.title,
          book.titleBn,
          book.subject,
          book.subjectBn,
          book.publisher,
          book.publisherBn,
          `class ${book.classId}`,
          book.board,
          book.fileName || '',
        ]
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [textbooks, selectedClassFilter, selectedBoardFilter, searchQuery]);

  // Statistics
  const totalBooksCount = textbooks.length;
  const uploadedFilesCount = textbooks.filter((b) => b.fileUrl).length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 border border-indigo-500/20">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
              Textbook Management Desk
            </span>
            <span className="text-xs text-indigo-300">West Bengal Board (১ম - ১০ম শ্রেণি)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <Book className="w-6 h-6 text-amber-400" />
            <span>WB Board এর সকল বই কন্ট্রোল ও আপলোড</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            WBBSE ও WBBPE সিলেবাসের সকল পাঠ্যবই আপলোড, PDF ফাইল সংযোজন, বিবরণ এডিট এবং প্রয়োজন অনুযায়ী ডিলিট করুন।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পাঠ্যবই আপলোড করুন</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">মোট পাঠ্যবই</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalBooksCount} টি</div>
          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">Classes 1–10</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">PDF/ফাইল সংযুক্ত</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{uploadedFilesCount} টি</div>
          <div className="text-[11px] text-slate-500 mt-0.5">সরাসরি পড়ার উপযোগী</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">WBBSE (মাধ্যমিক)</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {textbooks.filter((b) => b.board === 'WBBSE').length} টি
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Classes 6 to 10</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">WBBPE (প্রাথমিক)</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {textbooks.filter((b) => b.board === 'WBBPE').length} টি
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Classes 1 to 5</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Class Filter Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>শ্রেণি ফিল্টার (Filter by Class):</span>
            </span>
            <span className="text-xs text-slate-400">
              দেখাচ্ছে: {filteredBooks.length} টি বই
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedClassFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedClassFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              সব শ্রেণি (All)
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
              <button
                key={cls}
                onClick={() => {
                  setSelectedClassFilter(cls);
                  if (onSelectClass) onSelectClass(cls);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  selectedClassFilter === cls
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cls}ম শ্রেণি</span>
                {cls === 10 && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1 rounded-sm">
                    মাদ্যমিক
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Board & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Board Selector */}
          <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto">
            <span className="text-slate-400 font-medium">বোর্ড:</span>
            <button
              onClick={() => setSelectedBoardFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedBoardFilter === 'all'
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Boards
            </button>
            <button
              onClick={() => setSelectedBoardFilter('WBBSE')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedBoardFilter === 'WBBSE'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              WBBSE (Class 6–10)
            </button>
            <button
              onClick={() => setSelectedBoardFilter('WBBPE')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedBoardFilter === 'WBBPE'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              WBBPE (Class 1–5)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বইয়ের নাম বা বিষয় খুঁজুন..."
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Books Table / Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            কোনো পাঠ্যবই পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            নির্বাচিত ফিল্টারে কোনো বই নেই। আপনি নতুন বই আপলোড করতে উপরের বাটনে ক্লিক করুন।
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>এই শ্রেণির জন্য বই আপলোড করুন</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              {/* Header Gradient Stripe */}
              <div className={`p-4 bg-gradient-to-r ${book.coverColor || 'from-blue-600 to-indigo-700'} text-white relative`}>
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-black/30 backdrop-blur-xs border border-white/20">
                    Class {book.classId} • {book.board}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 uppercase tracking-wider">
                    {book.edition || 'Official 2026-27'}
                  </span>
                </div>

                <div className="mt-3 space-y-0.5">
                  <h3 className="text-lg font-black tracking-tight leading-snug">
                    {book.titleBn}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">{book.title}</p>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {book.subjectBn || book.subject}
                    </span>
                    <span className="text-slate-500 text-[11px]">{book.totalChapters} টি অধ্যায় • {book.totalPages} পৃষ্ঠা</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {book.descriptionBn || book.description}
                  </p>

                  {/* File Attachment Pill */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    {book.fileUrl ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">{book.fileName || 'PDF Document'}</span>
                        {book.fileSize && <span className="text-slate-400 font-normal">({book.fileSize})</span>}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        <BookOpen className="w-3 h-3" />
                        <span>ডিজিটাল সিলেবাস নোটস</span>
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
                      {book.publisherBn || book.publisher}
                    </span>
                  </div>
                </div>

                {/* Actions: View, Edit, Delete */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2">
                  {/* Read / Preview */}
                  <button
                    onClick={() => handleReadBook(book)}
                    className="py-2 px-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                    title="বইটি প্রিভিউ করুন"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>পড়ুন</span>
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleOpenEdit(book)}
                    className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                    title="বইয়ের তথ্য এডিট করুন"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>এডিট</span>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setBookToDelete(book)}
                    className="py-2 px-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-500 text-red-600 hover:text-white font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                    title="বইটি ডিলিট করুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ডিলিট</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* UPLOAD & EDIT BOOK MODAL */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  <Book className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">
                    {editingBookId ? 'পাঠ্যবইয়ের বিবরণ এডিট করুন' : 'নতুন WB Board পাঠ্যবই আপলোড করুন'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingBookId ? 'Existing textbook details & file replacement' : 'Upload new book with title, subject, PDF attachment & description'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Row 1: Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বইয়ের নাম (বাংলায়) *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="যেমন: গণিত প্রকাশ, সহজ পাঠ, ইতিহাস ও পরিবেশ"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Book Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Ganit Prakash, Bliss, Sahaj Path"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 2: Class & Board */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শ্রেণি (Class) *
                  </label>
                  <select
                    value={classId}
                    onChange={(e) => handleClassChange(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                      <option key={c} value={c}>
                        Class {c} ({c}ম শ্রেণি) {c === 10 ? '• মাধ্যমিক' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বোর্ড (Board) *
                  </label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="WBBSE">WBBSE (পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ • 6-10)</option>
                    <option value="WBBPE">WBBPE (পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ • 1-5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যাটাগরি (Category)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mathematics">Mathematics (গণিত)</option>
                    <option value="science">Science (বিজ্ঞান / ভৌত ও জীবন বিজ্ঞান)</option>
                    <option value="language">Language & Literature (ভাষা ও সাহিত্য)</option>
                    <option value="social_science">Social Science (ইতিহাস ও ভূগোল)</option>
                    <option value="general">Integrated (সমন্বিত পাঠ)</option>
                    <option value="supplementary">Supplementary (সহায়ক পাঠ)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বিষয় (বাংলায়) *
                  </label>
                  <input
                    type="text"
                    required
                    value={subjectBn}
                    onChange={(e) => setSubjectBn(e.target.value)}
                    placeholder="যেমন: গণিত, ভৌতবিজ্ঞান, বাংলা প্রথম ভাষা"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Mathematics, Physical Science, Bengali"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 4: Publisher & Edition */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    প্রকাশক (Publisher)
                  </label>
                  <input
                    type="text"
                    value={publisherBn}
                    onChange={(e) => setPublisherBn(e.target.value)}
                    placeholder="পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সংস্করণ (Edition)
                  </label>
                  <input
                    type="text"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    placeholder="Official Syllabus 2026-2027"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শিক্ষাবর্ষ (Academic Year)
                  </label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="2026-2027"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 5: Chapters count, Pages & Cover Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    মোট অধ্যায় সংখ্যা
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={totalChapters}
                    onChange={(e) => setTotalChapters(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    পৃষ্ঠা সংখ্যা (Pages)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={totalPages}
                    onChange={(e) => setTotalPages(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    কভারের কালার (Theme Gradient)
                  </label>
                  <select
                    value={coverColor}
                    onChange={(e) => setCoverColor(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {COVER_GRADIENTS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 6: Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বইয়ের সংক্ষিপ্ত বিবরণ (Description in Bengali)
                </label>
                <textarea
                  rows={2}
                  value={descriptionBn}
                  onChange={(e) => setDescriptionBn(e.target.value)}
                  placeholder="পাঠ্যক্রমের বিষয়বস্তু ও বোর্ড নির্দেশিকার বিবরণ..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Row 7: PDF / File Upload Area */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        পাঠ্যবইয়ের PDF / ডকুমেন্ট ফাইল সংযোজন
                      </span>
                      <p className="text-[11px] text-slate-500">
                        শিক্ষার্থীরা সরাসরি অ্যাপে পড়তে পারবে (Supports .pdf, .jpg, .png)
                      </p>
                    </div>
                  </div>

                  {fileUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setFileUrl('');
                        setFileName('');
                        setFileSize('');
                      }}
                      className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ফাইল বাতিল</span>
                    </button>
                  )}
                </div>

                {fileUrl ? (
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                          {fileName || 'Book-Document.pdf'}
                        </div>
                        <div className="text-[11px] text-slate-500">সাইজ: {fileSize || 'Attached'}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                      Ready to Read
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs text-slate-600 dark:text-slate-300">
                        {isUploading ? 'ফাইল আপলোড হচ্ছে...' : 'আপনার কম্পিউটার বা মোবাইল থেকে PDF নির্বাচন করুন'}
                      </span>
                    </div>

                    <label className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer transition shadow-xs">
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span>PDF / ছবি নির্বাচন করুন</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition cursor-pointer"
                >
                  বাতিল (Cancel)
                </button>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingBookId ? 'আপডেট সংরক্ষণ করুন' : 'বই আপলোড ও সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {bookToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-red-200 dark:border-red-900/50 p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                আপনি কি এই পাঠ্যবইটি ডিলিট করতে চান?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200">{bookToDelete.titleBn} ({bookToDelete.title})</strong> - Class {bookToDelete.classId}
                <br />
                এটি ডিলিট করলে ছাত্রছাত্রীরা আর এই বই দেখতে পারবে না।
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setBookToDelete(null)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                না, বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, ডিলিট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

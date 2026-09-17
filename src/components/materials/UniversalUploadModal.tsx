import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileCheck,
  FileQuestion,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Download,
  Lock,
  Layers,
  Presentation,
  File,
  Eye,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialCategory, StudyMaterial } from '../../types';

interface UniversalUploadModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultClassId?: number;
  defaultSubjectId?: string;
  defaultChapterId?: string;
}

export const UniversalUploadModal: React.FC<UniversalUploadModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  defaultClassId,
  defaultSubjectId,
  defaultChapterId,
}) => {
  const {
    isUploadOpen,
    setIsUploadOpen,
    classes,
    subjects,
    chapters,
    selectedClassId,
    setSelectedClassId,
    selectedSubjectId,
    setSelectedSubjectId,
    selectedChapterId,
    setSelectedChapterId,
    addStudyMaterial,
    currentUser,
    setCurrentView,
    showToast,
    language,
  } = useApp();

  const isModalOpen = propIsOpen !== undefined ? propIsOpen : isUploadOpen;
  const handleClose = propOnClose || (() => setIsUploadOpen(false));

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [fileSizeFormatted, setFileSizeFormatted] = useState<string>('');
  const [fileTypeDetected, setFileTypeDetected] = useState<
    'pdf' | 'image' | 'document' | 'spreadsheet' | 'presentation' | 'text' | 'other'
  >('pdf');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Form states
  const [classId, setClassId] = useState<number>(defaultClassId || selectedClassId || 7);
  const [subjectId, setSubjectId] = useState<string>('');
  const [chapterId, setChapterId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [titleBn, setTitleBn] = useState<string>('');
  const [category, setCategory] = useState<MaterialCategory>('pdf_notes');
  const [description, setDescription] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [allowDownload, setAllowDownload] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [authorName, setAuthorName] = useState<string>('Milton Sir (EASY TO LEARN)');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Class subjects
  const availableSubjects = subjects.filter((s) => s.classId === classId);

  // Subject chapters
  const availableChapters = chapters.filter(
    (c) => c.classId === classId && (!subjectId || c.subjectId === subjectId)
  );

  // Initialize defaults when modal opens or class changes
  useEffect(() => {
    if (isModalOpen) {
      const initialClass = defaultClassId || selectedClassId || 7;
      setClassId(initialClass);

      const subjs = subjects.filter((s) => s.classId === initialClass);
      const chosenSub =
        defaultSubjectId ||
        (selectedSubjectId && subjs.some((s) => s.id === selectedSubjectId)
          ? selectedSubjectId
          : subjs[0]?.id || '');
      setSubjectId(chosenSub);

      if (defaultChapterId) {
        setChapterId(defaultChapterId);
      } else {
        setChapterId('');
      }

      const author = currentUser.adminName || currentUser.student?.name;
      if (author) {
        setAuthorName(`${author} (EASY TO LEARN)`);
      }
    }
  }, [isModalOpen, defaultClassId, defaultSubjectId, defaultChapterId, selectedClassId, subjects]);

  // When class changes, update subject
  const handleClassChange = (newClassId: number) => {
    setClassId(newClassId);
    const subjs = subjects.filter((s) => s.classId === newClassId);
    if (subjs.length > 0) {
      setSubjectId(subjs[0].id);
    } else {
      setSubjectId('');
    }
    setChapterId('');
  };

  // Detect file type and auto-populate
  const processSelectedFile = (file: File) => {
    if (file.size > 30 * 1024 * 1024) {
      showToast(
        language === 'bn'
          ? 'ফাইলের সাইজ ৩০ এমবি-এর বেশি। অনুগ্রহ করে ছোট ফাইল নির্বাচন করুন।'
          : 'File size exceeds 30MB limit. Please upload a smaller file.',
        'error'
      );
      return;
    }

    setSelectedFile(file);
    setIsProcessing(true);
    setUploadProgress(20);

    // Format size
    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;
    setFileSizeFormatted(sizeStr);

    // Clean title from filename
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const cleanTitle = baseName
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!title) {
      setTitle(cleanTitle);
      setTitleBn(cleanTitle);
    }

    const mime = file.type.toLowerCase();
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    // Classify
    if (mime === 'application/pdf' || ext === 'pdf') {
      setFileTypeDetected('pdf');
      setCategory('pdf_notes');
      setTotalPages(4);
    } else if (mime.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'bmp'].includes(ext)) {
      setFileTypeDetected('image');
      setCategory('chapter_notes');
      setTotalPages(1);
    } else if (
      mime.includes('word') ||
      mime.includes('document') ||
      ['doc', 'docx', 'rtf', 'odt'].includes(ext)
    ) {
      setFileTypeDetected('document');
      setCategory('documents');
      setTotalPages(3);
    } else if (
      mime.includes('spreadsheet') ||
      mime.includes('excel') ||
      ['xls', 'xlsx', 'csv'].includes(ext)
    ) {
      setFileTypeDetected('spreadsheet');
      setCategory('worksheets');
      setTotalPages(2);
    } else if (
      mime.includes('presentation') ||
      mime.includes('powerpoint') ||
      ['ppt', 'pptx'].includes(ext)
    ) {
      setFileTypeDetected('presentation');
      setCategory('chapter_notes');
      setTotalPages(10);
    } else if (mime.startsWith('text/') || ext === 'txt' || ext === 'md') {
      setFileTypeDetected('text');
      setCategory('chapter_notes');
      setTotalPages(1);
      // Read text snippet
      const textReader = new FileReader();
      textReader.onload = (ev) => {
        const text = ev.target?.result as string;
        if (text && !textContent) {
          setTextContent(text);
        }
      };
      textReader.readAsText(file);
    } else {
      setFileTypeDetected('other');
      setCategory('documents');
      setTotalPages(1);
    }

    // Read Data URL for preview and base64 storage
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 70) + 20;
        setUploadProgress(percent);
      }
    };
    reader.onload = () => {
      setFilePreviewUrl(reader.result as string);
      setUploadProgress(100);
      setIsProcessing(false);
      showToast(
        language === 'bn'
          ? `ফাইল প্রস্তুত: ${file.name} (${sizeStr})`
          : `File loaded: ${file.name} (${sizeStr})`,
        'success'
      );
    };
    reader.onerror = () => {
      setIsProcessing(false);
      showToast(
        language === 'bn' ? 'ফাইল পড়তে সমস্যা হয়েছে।' : 'Failed to read file.',
        'error'
      );
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreviewUrl('');
    setFileSizeFormatted('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast(
        language === 'bn' ? 'দয়া করে মেটেরিয়ালের শিরোনাম দিন।' : 'Please provide a title for the material.',
        'warning'
      );
      return;
    }

    if (!subjectId) {
      showToast(
        language === 'bn' ? 'দয়া করে একটি বিষয় নির্বাচন করুন।' : 'Please select a subject.',
        'warning'
      );
      return;
    }

    // Determine format
    let finalFormat: 'pdf' | 'image' | 'document' | 'notes' | 'worksheet' = 'pdf';
    if (fileTypeDetected === 'image') finalFormat = 'image';
    else if (fileTypeDetected === 'pdf') finalFormat = 'pdf';
    else if (fileTypeDetected === 'document' || fileTypeDetected === 'other') finalFormat = 'document';
    else if (fileTypeDetected === 'spreadsheet') finalFormat = 'worksheet';
    else if (fileTypeDetected === 'text') finalFormat = 'notes';

    const selectedSub = subjects.find((s) => s.id === subjectId);
    const selectedChap = chapters.find((c) => c.id === chapterId);

    const newMaterial: Omit<StudyMaterial, 'id' | 'viewCount' | 'uploadDate'> = {
      classId,
      subjectId,
      chapterId: chapterId || undefined,
      chapter: selectedChap ? selectedChap.title : undefined,
      topic: selectedChap ? selectedChap.title : selectedSub?.name || 'General',
      title: title.trim(),
      titleBn: (titleBn.trim() || title.trim()),
      category,
      format: finalFormat,
      description: description.trim() || (selectedFile ? `Uploaded ${selectedFile.name}` : undefined),
      totalPages: Math.max(1, totalPages),
      fileUrl: filePreviewUrl || undefined,
      fileName: selectedFile?.name || undefined,
      fileSize: fileSizeFormatted || undefined,
      fileType: selectedFile?.type || undefined,
      allowDownload,
      isReadOnly: !allowDownload,
      author: authorName.trim() || 'Milton Sir (EASY TO LEARN)',
      isPublished: true,
      isSampleContent: false,
      pages: [
        {
          pageNo: 1,
          title: title.trim(),
          content:
            textContent.trim() ||
            (fileTypeDetected === 'image'
              ? `[Image Document: ${selectedFile?.name || title}]`
              : fileTypeDetected === 'pdf'
              ? `[PDF Document: ${selectedFile?.name || title}]`
              : description || 'Study resource uploaded in EASY TO LEARN portal.'),
        },
      ],
    };

    addStudyMaterial(newMaterial);

    // Automatically navigate and focus on the newly uploaded content
    setSelectedClassId(classId);
    setSelectedSubjectId(subjectId);
    if (chapterId) {
      setSelectedChapterId(chapterId);
    }
    setCurrentView('materials');

    showToast(
      language === 'bn'
        ? `"${title}" সফলভাবে আপলোড ও প্রকাশিত হয়েছে!`
        : `"${title}" uploaded and published successfully!`,
      'success'
    );

    handleClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-amber-300 shadow-sm shrink-0">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>
                  {language === 'bn'
                    ? 'যেকোনো মেটেরিয়াল বা ফাইল আপলোড করুন'
                    : 'Upload Study Material & Document'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950">
                  Easy Upload
                </span>
              </h2>
              <p className="text-xs text-indigo-200 mt-0.5">
                {language === 'bn'
                  ? 'PDF, ছবি, Word ডকুমেন্টস, ওয়ার্কশীট ও নোটস আপলোড করে সরাসরি পোর্টালে যুক্ত করুন।'
                  : 'Upload PDFs, Images, Word docs, Worksheets or Handwritten Notes instantly.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-800 dark:text-slate-200">
          {/* File Drag and Drop Zone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {language === 'bn' ? 'ফাইল নির্বাচন বা ড্রপ করুন (PDF, ইমেজ, ডকুমেন্ট)' : 'Select or Drop File (PDF, Image, Document)'}
            </label>

            {!selectedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                  isDragOver
                    ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 scale-[1.01]'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-indigo-400'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Upload className="w-7 h-7 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {language === 'bn'
                      ? 'এখানে ফাইল ড্র্যাগ ও ড্রপ করুন, অথবা ক্লিক করে ফাইল বেছে নিন'
                      : 'Drag & Drop file here, or browse from device'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                    {language === 'bn'
                      ? 'সমর্থিত ফরম্যাট: PDF, JPG, PNG, WEBP, DOCX, DOC, TXT, XLSX (সর্বোচ্চ ৩০ MB)'
                      : 'Supported formats: PDF, JPG, PNG, WEBP, DOCX, DOC, TXT, XLSX (Max 30 MB)'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">
                    PDF
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                    IMAGE (PNG/JPG)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                    WORD / DOC
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    EXCEL / SHEET
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    TXT / NOTES
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,image/*,.doc,.docx,.txt,.rtf,.odt,.ppt,.pptx,.xls,.xlsx,.csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              /* Selected File Card */
              <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* File Format Icon / Thumbnail */}
                  {fileTypeDetected === 'image' && filePreviewUrl ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-indigo-200 dark:border-indigo-800 bg-white shrink-0 shadow-xs">
                      <img
                        src={filePreviewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        fileTypeDetected === 'pdf'
                          ? 'bg-red-100 dark:bg-red-950/70 text-red-600'
                          : fileTypeDetected === 'document'
                          ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-600'
                          : fileTypeDetected === 'spreadsheet'
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600'
                          : 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600'
                      }`}
                    >
                      {fileTypeDetected === 'pdf' && <FileText className="w-6 h-6" />}
                      {fileTypeDetected === 'image' && <ImageIcon className="w-6 h-6" />}
                      {fileTypeDetected === 'document' && <File className="w-6 h-6" />}
                      {fileTypeDetected === 'spreadsheet' && <FileSpreadsheet className="w-6 h-6" />}
                      {fileTypeDetected === 'presentation' && <Presentation className="w-6 h-6" />}
                      {fileTypeDetected === 'text' && <FileText className="w-6 h-6" />}
                      {fileTypeDetected === 'other' && <File className="w-6 h-6" />}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
                        {fileTypeDetected.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {fileSizeFormatted}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-sm mt-0.5">
                      {selectedFile.name}
                    </p>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      {language === 'bn' ? 'ফাইল সফলভাবে লোড হয়েছে' : 'Ready for publishing'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition"
                  >
                    {language === 'bn' ? 'অন্য ফাইল' : 'Change File'}
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,image/*,.doc,.docx,.txt,.rtf,.odt,.ppt,.pptx,.xls,.xlsx,.csv"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Class, Subject, Chapter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Class */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'শ্রেণি (Class)' : 'Class'} *
              </label>
              <select
                value={classId}
                onChange={(e) => handleClassChange(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls} {language === 'bn' ? `(শ্রেণি ${cls})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'বিষয় (Subject)' : 'Subject'} *
              </label>
              <select
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                  setChapterId('');
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                {availableSubjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {language === 'bn' && sub.nameBn ? sub.nameBn : sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'অধ্যায় (Chapter)' : 'Chapter'}
              </label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">
                  {language === 'bn' ? 'সামগ্রিক / সাধারণ মেটেরিয়াল' : 'General / All Chapters'}
                </option>
                {availableChapters.map((chap) => (
                  <option key={chap.id} value={chap.id}>
                    Ch {chap.chapterNo}:{' '}
                    {language === 'bn' && chap.titleBn ? chap.titleBn : chap.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title & Bengali Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'মেটেরিয়ালের নাম (Title)' : 'Material Title'} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Class 7 English Grammar Rules"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'বাংলা শিরোনাম (Title in Bengali)' : 'Title in Bengali (Optional)'}
              </label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder="যেমন: সপ্তম শ্রেণি ব্যাকরণ নিয়মাবলী"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category & Page Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'ক্যাটাগরি (Category)' : 'Category'} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MaterialCategory)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="pdf_notes">📄 PDF Notes (পিডিএফ নোট)</option>
                <option value="chapter_notes">📖 Chapter Notes (অধ্যায়ভিত্তিক নোট)</option>
                <option value="documents">📑 Documents / Word / Text (ডকুমেন্ট / ফাইল)</option>
                <option value="question_papers">❓ Question Paper (প্রশ্নপত্র)</option>
                <option value="worksheets">📝 Worksheet (ওয়ার্কশীট)</option>
                <option value="suggestions">🏆 Suggestion (সাজেশন)</option>
                <option value="homework">✏️ Homework (বাড়ির কাজ)</option>
                <option value="class_tests">📋 Class Test (ক্লাস টেস্ট)</option>
                <option value="practice_sets">🎯 Practice Set (অনুশীলন সেট)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'পৃষ্ঠা সংখ্যা (Estimated Pages)' : 'Estimated Pages'}
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={totalPages}
                onChange={(e) => setTotalPages(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'বিবরণ বা বিষয়সংক্ষেপ (Description)' : 'Description (Optional)'}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'এই ডকুমেন্টে কী কী বিষয় বা সূত্র আলোচনা করা হয়েছে তার সংক্ষিপ্ত বিবরণ...'
                  : 'Brief overview or instructions for students regarding this document...'
              }
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Download Permission Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'শিক্ষার্থীদের ডাউনলোড করার অনুমতি দিন' : 'Allow Student Download'}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {allowDownload
                  ? language === 'bn'
                    ? 'হ্যাঁ, শিক্ষার্থীরা এই ফাইলটি সরাসরি PDF / ইমেজ আকারে ডাউনলোড করতে পারবে।'
                    : 'Students can download this PDF/Image file to their phone/computer.'
                  : language === 'bn'
                    ? 'সংরক্ষিত মোড: শিক্ষার্থীরা শুধুমাত্র আমাদের রিডারে পড়তে পারবে।'
                    : 'Protected mode: Students can only read inside the built-in protected viewer.'}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={allowDownload}
                onChange={(e) => setAllowDownload(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>
                {isProcessing
                  ? language === 'bn'
                    ? 'ফাইল প্রক্রিয়াকরণ হচ্ছে...'
                    : 'Processing File...'
                  : language === 'bn'
                  ? 'পোর্টালে আপলোড ও প্রকাশ করুন'
                  : 'Upload & Publish to Portal'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

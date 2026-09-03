import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Edit2,
  Eye,
  FileCheck,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Lock,
  LogOut,
  Megaphone,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  AttendanceRecord,
  Chapter,
  Exam,
  FeeRecord,
  MaterialCategory,
  StudentProfile,
  StudyMaterial,
  Subject,
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    logout,
    classes,
    subjects,
    chapters,
    studyMaterials,
    notices,
    homeworkList,
    students,
    attendance,
    fees,
    exams,
    marks,
    settings,
    updateSettings,
    resetAllData,
    addStudyMaterial,
    deleteStudyMaterial,
    addSubject,
    deleteSubject,
    addChapter,
    deleteChapter,
    addStudent,
    deleteStudent,
    recordAttendance,
    recordFeePayment,
    addExam,
    enterStudentMark,
    openDocumentViewer,
    language,
    t,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'materials'
    | 'curriculum'
    | 'students'
    | 'attendance'
    | 'fees'
    | 'exams'
    | 'settings'
  >('materials');

  // Selected class in Admin
  const [adminClassId, setAdminClassId] = useState<number>(10);

  // 1. Material Upload Form State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSubjectId, setUploadSubjectId] = useState<string>('sub-c10-math');
  const [uploadChapterId, setUploadChapterId] = useState<string>('ch-c10-m1');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadTitleBn, setUploadTitleBn] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MaterialCategory>('chapter_notes');
  const [uploadFormat, setUploadFormat] = useState<'pdf' | 'notes'>('pdf');
  const [uploadPagesCount, setUploadPagesCount] = useState<number>(3);
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadPageContent, setUploadPageContent] = useState('');

  // 2. New Subject / Chapter State
  const [newSubjName, setNewSubjName] = useState('');
  const [newSubjNameBn, setNewSubjNameBn] = useState('');
  const [newChapTitle, setNewChapTitle] = useState('');
  const [newChapTitleBn, setNewChapTitleBn] = useState('');
  const [newChapNo, setNewChapNo] = useState<number>(1);
  const [targetSubjForChap, setTargetSubjForChap] = useState<string>('');

  // 3. New Student State
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [stdName, setStdName] = useState('');
  const [stdClassId, setStdClassId] = useState<number>(10);
  const [stdRoll, setStdRoll] = useState<number>(1);
  const [stdPhone, setStdPhone] = useState('');
  const [stdGuardian, setStdGuardian] = useState('');

  // 4. Attendance Marking State
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedStudentForAttendance, setSelectedStudentForAttendance] = useState<string>('');
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceRecord['status']>('present');
  const [attendanceRemark, setAttendanceRemark] = useState('');

  // 5. Fee Collection State
  const [feeStudentId, setFeeStudentId] = useState<string>('');
  const [feeMonth, setFeeMonth] = useState('October 2026');
  const [feeAmount, setFeeAmount] = useState<number>(800);
  const [feeStatus, setFeeStatus] = useState<FeeRecord['status']>('paid');

  // 6. Exam & Mark State
  const [examName, setExamName] = useState('');
  const [examTotalMarks, setExamTotalMarks] = useState<number>(50);
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [markStudentId, setMarkStudentId] = useState<string>('');
  const [markObtained, setMarkObtained] = useState<number>(45);
  const [markFeedback, setMarkFeedback] = useState('Good conceptual clarity');

  // 7. Settings State
  const [centreName, setCentreName] = useState(settings.centreName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [teacherName, setTeacherName] = useState(settings.teacherName);
  const [qualification, setQualification] = useState(settings.qualification);
  const [phone, setPhone] = useState(settings.contactPhone || settings.contactNumber);
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [address, setAddress] = useState(settings.address);

  // Filtered helpers
  const classSubjects = useMemo(() => {
    return subjects.filter((s) => s.classId === adminClassId);
  }, [subjects, adminClassId]);

  const classChapters = useMemo(() => {
    return chapters.filter(
      (c) => c.classId === adminClassId && (!uploadSubjectId || c.subjectId === uploadSubjectId)
    );
  }, [chapters, adminClassId, uploadSubjectId]);

  const classStudents = useMemo(() => {
    return students.filter((s) => s.classId === adminClassId);
  }, [students, adminClassId]);

  const classMaterials = useMemo(() => {
    return studyMaterials.filter((m) => m.classId === adminClassId);
  }, [studyMaterials, adminClassId]);

  // Handle uploading study material
  const handleMaterialUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    addStudyMaterial({
      classId: adminClassId,
      subjectId: uploadSubjectId || classSubjects[0]?.id || 'sub-1',
      chapterId: uploadChapterId || undefined,
      title: uploadTitle,
      titleBn: uploadTitleBn || undefined,
      category: uploadCategory,
      format: uploadFormat,
      description: uploadDesc,
      totalPages: uploadPagesCount,
      author: settings.teacherName,
      pages: [
        {
          pageNumber: 1,
          pageNo: 1,
          title: uploadTitle + ' (Section 1)',
          content:
            uploadPageContent ||
            `EASY TO LEARN • Complete Study Module for Class ${adminClassId}.\n\nThis material has been compiled and reviewed by ${settings.teacherName}.\n\nTopics covered in this lesson:\n1. Core definitions & axioms\n2. Key formulas and derivations\n3. Solved examples with board marking schemes\n4. Practice exercises for home study.\n\nRead-only mode is active. Download disabled.`,
        },
      ],
    });

    setUploadTitle('');
    setUploadTitleBn('');
    setUploadDesc('');
    setUploadPageContent('');
    setShowUploadModal(false);
  };

  // Handle creating subject
  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjName.trim()) return;
    addSubject({
      classId: adminClassId,
      name: newSubjName,
      nameBn: newSubjNameBn || undefined,
      code: newSubjName.toLowerCase().replace(/\s+/g, '-'),
      icon: 'book',
      color: '#2563eb',
    });
    setNewSubjName('');
    setNewSubjNameBn('');
  };

  // Handle creating chapter
  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapTitle.trim() || !targetSubjForChap) {
      showToast('Please select a subject and enter chapter title', 'warning');
      return;
    }
    addChapter({
      classId: adminClassId,
      subjectId: targetSubjForChap,
      chapterNo: newChapNo,
      title: newChapTitle,
      titleBn: newChapTitleBn || undefined,
    });
    setNewChapTitle('');
    setNewChapTitleBn('');
    setNewChapNo((n) => n + 1);
  };

  // Handle registering student
  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stdName.trim()) return;
    const stdId = `STD-${stdClassId}${Math.floor(100 + Math.random() * 900)}`;
    addStudent({
      studentId: stdId,
      name: stdName,
      classId: stdClassId,
      rollNumber: stdRoll,
      mobileNumber: stdPhone || '9876543210',
      guardianName: stdGuardian || 'Parent / Guardian',
      joinDate: new Date().toISOString().split('T')[0],
      admissionDate: new Date().toISOString().split('T')[0],
      password: 'student123',
    });
    setStdName('');
    setStdPhone('');
    setStdGuardian('');
    setShowAddStudentModal(false);
  };

  // Handle saving settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      centreName,
      tagline,
      teacherName,
      qualification,
      contactNumber: phone,
      contactPhone: phone,
      whatsappNumber: whatsapp,
      address,
    });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Banner / Master Admin Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wide">
                Teacher Admin Portal
              </span>
              <span className="text-xs text-slate-400">Sabuj Sathi Sir</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
              EASY TO LEARN Management Console
            </h1>
            <p className="text-xs text-slate-400">
              Classes 1–10 • Materials, Homework, Notices, Attendance, Fees & Marksheet Control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={resetAllData}
            title="Reset to initial sample demo data"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Class Level Selector for Admin Context */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Class Context:
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
            <button
              key={cls}
              onClick={() => {
                setAdminClassId(cls);
                const sub = subjects.find((s) => s.classId === cls);
                if (sub) setUploadSubjectId(sub.id);
              }}
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition ${
                adminClassId === cls
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Class {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl text-xs font-bold">
        {[
          { id: 'materials', label: 'Study Materials & Upload', icon: BookOpen },
          { id: 'curriculum', label: 'Subjects & Chapters', icon: Layers },
          { id: 'students', label: 'Student Directory', icon: Users },
          { id: 'attendance', label: 'Attendance Register', icon: UserCheck },
          { id: 'fees', label: 'Fee Management', icon: DollarSign },
          { id: 'exams', label: 'Exams & Marks', icon: Award },
          { id: 'settings', label: 'Centre Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. STUDY MATERIALS TAB */}
      {/* ========================================================= */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Class {adminClassId} Study Materials ({classMaterials.length})
            </h3>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Material / PDF</span>
            </button>
          </div>

          {/* Upload Modal */}
          {showUploadModal && (
            <form
              onSubmit={handleMaterialUpload}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4 animate-in fade-in"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Publish Study Material (Class {adminClassId})</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject *
                  </label>
                  <select
                    value={uploadSubjectId}
                    onChange={(e) => setUploadSubjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  >
                    {classSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Chapter
                  </label>
                  <select
                    value={uploadChapterId}
                    onChange={(e) => setUploadChapterId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  >
                    <option value="">No Specific Chapter (General)</option>
                    {classChapters.map((c) => (
                      <option key={c.id} value={c.id}>
                        Ch {c.chapterNo}: {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  >
                    <option value="chapter_notes">Chapter Notes</option>
                    <option value="pdf_notes">PDF Notes</option>
                    <option value="question_papers">Question Papers</option>
                    <option value="suggestions">Suggestions</option>
                    <option value="worksheets">Worksheets</option>
                    <option value="homework">Homework</option>
                    <option value="class_tests">Class Tests</option>
                    <option value="important_questions">Important Questions</option>
                    <option value="practice_sets">Practice Sets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Material Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Chapter 3 Complete Notes with Solved Examples"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Title (Bengali - Optional)
                  </label>
                  <input
                    type="text"
                    value={uploadTitleBn}
                    onChange={(e) => setUploadTitleBn(e.target.value)}
                    placeholder="যেমন: ৩য় অধ্যায়ের সম্পূর্ণ নোট ও উদাহরণমালা"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Format
                  </label>
                  <select
                    value={uploadFormat}
                    onChange={(e) => setUploadFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  >
                    <option value="pdf">PDF Document (Protected)</option>
                    <option value="notes">Lecture Notes (Protected)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Total Pages Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={uploadPagesCount}
                    onChange={(e) => setUploadPagesCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Description / Sub-topic
                  </label>
                  <input
                    type="text"
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    placeholder="Short description..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Document Content (Page 1 Text)
                </label>
                <textarea
                  rows={4}
                  value={uploadPageContent}
                  onChange={(e) => setUploadPageContent(e.target.value)}
                  placeholder="Enter lesson notes, formulas, or question text here for student reading..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
                >
                  Publish & Enable Read-Only
                </button>
              </div>
            </form>
          )}

          {/* List of Materials */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {classMaterials.map((mat) => {
                const sub = subjects.find((s) => s.id === mat.subjectId);
                return (
                  <div
                    key={mat.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                            {sub?.name || 'Subject'}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase">
                            {mat.category.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {mat.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {mat.totalPages || 1} Pages • {mat.viewCount} views • Uploaded:{' '}
                          {mat.uploadDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => openDocumentViewer(mat)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 text-xs font-bold hover:bg-blue-100 transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => deleteStudyMaterial(mat.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SUBJECTS & CHAPTERS TAB */}
      {/* ========================================================= */}
      {activeTab === 'curriculum' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Subject Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Subjects in Class {adminClassId}</span>
            </h3>

            <form onSubmit={handleCreateSubject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Name (English)
                </label>
                <input
                  type="text"
                  required
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  placeholder="e.g. Computer Application"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Name (Bengali - Optional)
                </label>
                <input
                  type="text"
                  value={newSubjNameBn}
                  onChange={(e) => setNewSubjNameBn(e.target.value)}
                  placeholder="যেমন: কম্পিউটার অ্যাপ্লিকেশন"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Add Subject to Class {adminClassId}
              </button>
            </form>

            <div className="pt-2 divide-y divide-slate-100 dark:divide-slate-800">
              {classSubjects.map((s) => (
                <div key={s.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      {s.name}
                    </div>
                    {s.nameBn && <div className="text-xs text-slate-400">{s.nameBn}</div>}
                  </div>
                  <button
                    onClick={() => deleteSubject(s.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Chapter Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Chapters in Class {adminClassId}</span>
            </h3>

            <form onSubmit={handleCreateChapter} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Subject
                </label>
                <select
                  value={targetSubjForChap}
                  onChange={(e) => setTargetSubjForChap(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                >
                  <option value="">-- Choose Subject --</option>
                  {classSubjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ch #
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newChapNo}
                    onChange={(e) => setNewChapNo(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Chapter Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newChapTitle}
                    onChange={(e) => setNewChapTitle(e.target.value)}
                    placeholder="e.g. Light & Optics"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Add Chapter
              </button>
            </form>

            <div className="pt-2 max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {classChapters.map((c) => {
                const sub = subjects.find((s) => s.id === c.subjectId);
                return (
                  <div key={c.id} className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        Ch {c.chapterNo}: {c.title}
                      </span>
                      <span className="text-slate-400 block text-[10px]">({sub?.name})</span>
                    </div>
                    <button
                      onClick={() => deleteChapter(c.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. STUDENT DIRECTORY TAB */}
      {/* ========================================================= */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Class {adminClassId} Enrolled Students ({classStudents.length})
            </h3>
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll New Student</span>
            </button>
          </div>

          {/* Add Student Modal */}
          {showAddStudentModal && (
            <form
              onSubmit={handleRegisterStudent}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4 animate-in fade-in"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Student Registration Form
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={stdName}
                    onChange={(e) => setStdName(e.target.value)}
                    placeholder="e.g. Souvik Mukherjee"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class *
                  </label>
                  <select
                    value={stdClassId}
                    onChange={(e) => setStdClassId(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={stdRoll}
                    onChange={(e) => setStdRoll(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contact / WhatsApp Mobile
                  </label>
                  <input
                    type="text"
                    value={stdPhone}
                    onChange={(e) => setStdPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={stdGuardian}
                    onChange={(e) => setStdGuardian(e.target.value)}
                    placeholder="e.g. B. Mukherjee"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          )}

          {/* Student Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Roll</th>
                  <th className="p-3.5">Student ID</th>
                  <th className="p-3.5">Full Name</th>
                  <th className="p-3.5">Guardian</th>
                  <th className="p-3.5">Mobile Number</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {classStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold font-mono">#{std.rollNumber}</td>
                    <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400">
                      {std.studentId}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                      {std.name}
                    </td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400">{std.guardianName}</td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                      {std.mobileNumber}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteStudent(std.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. ATTENDANCE TAB */}
      {/* ========================================================= */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mark Attendance Form */}
          <div className="md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <span>Mark Session Attendance</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Session Date
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student
                </label>
                <select
                  value={selectedStudentForAttendance}
                  onChange={(e) => setSelectedStudentForAttendance(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="">-- Choose Student --</option>
                  {classStudents.map((std) => (
                    <option key={std.id} value={std.id}>
                      Roll #{std.rollNumber} - {std.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Attendance Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['present', 'absent', 'late'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setAttendanceStatus(status)}
                      className={`py-2 rounded-xl font-bold capitalize text-xs transition ${
                        attendanceStatus === status
                          ? status === 'present'
                            ? 'bg-emerald-600 text-white'
                            : status === 'absent'
                            ? 'bg-red-600 text-white'
                            : 'bg-amber-500 text-slate-950'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Remarks (Optional)
                </label>
                <input
                  type="text"
                  value={attendanceRemark}
                  onChange={(e) => setAttendanceRemark(e.target.value)}
                  placeholder="e.g. Informed absence"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!selectedStudentForAttendance) {
                    showToast('Please select a student', 'warning');
                    return;
                  }
                  const std = classStudents.find((s) => s.id === selectedStudentForAttendance);
                  recordAttendance({
                    studentId: selectedStudentForAttendance,
                    studentName: std?.name || 'Student',
                    classId: adminClassId,
                    date: attendanceDate,
                    status: attendanceStatus,
                    remark: attendanceRemark,
                  });
                  setAttendanceRemark('');
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition"
              >
                Record Attendance
              </button>
            </div>
          </div>

          {/* Attendance History Table */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recent Attendance Log for Class {adminClassId}
            </h3>

            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Student</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Remark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {attendance
                    .filter((a) => a.classId === adminClassId)
                    .slice(0, 15)
                    .map((rec) => {
                      const std = students.find((s) => s.id === rec.studentId);
                      return (
                        <tr key={rec.id}>
                          <td className="p-3 font-mono">{rec.date}</td>
                          <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                            {std?.name || 'Student'}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                rec.status === 'present'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : rec.status === 'absent'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                            >
                              {rec.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">{rec.remark || '-'}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. FEES TAB */}
      {/* ========================================================= */}
      {activeTab === 'fees' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>Record Fee Payment</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student
                </label>
                <select
                  value={feeStudentId}
                  onChange={(e) => setFeeStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="">-- Choose Student --</option>
                  {classStudents.map((std) => (
                    <option key={std.id} value={std.id}>
                      {std.name} (Class {std.classId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Fee Month
                </label>
                <input
                  type="text"
                  value={feeMonth}
                  onChange={(e) => setFeeMonth(e.target.value)}
                  placeholder="e.g. October 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Payment Status
                </label>
                <select
                  value={feeStatus}
                  onChange={(e) => setFeeStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!feeStudentId) {
                    showToast('Please select a student', 'warning');
                    return;
                  }
                  const std = classStudents.find((s) => s.id === feeStudentId);
                  recordFeePayment({
                    studentId: feeStudentId,
                    studentName: std?.name || 'Student',
                    classId: adminClassId,
                    month: feeMonth,
                    amount: feeAmount,
                    monthlyFee: feeAmount,
                    paidAmount: feeStatus === 'paid' ? feeAmount : 0,
                    status: feeStatus,
                    paymentDate: new Date().toISOString().split('T')[0],
                    receiptNo: `REC-${Date.now().toString().slice(-4)}`,
                    receiptNumber: `REC-${Date.now().toString().slice(-4)}`,
                  });
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs"
              >
                Save Payment Receipt
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Fee Records Log
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3">Receipt</th>
                    <th className="p-3">Student</th>
                    <th className="p-3">Month</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {fees.map((f) => {
                    const std = students.find((s) => s.id === f.studentId);
                    return (
                      <tr key={f.id}>
                        <td className="p-3 font-mono text-xs">{f.receiptNumber || f.receiptNo || 'REC'}</td>
                        <td className="p-3 font-semibold">{std?.name || 'Student'}</td>
                        <td className="p-3">{f.month}</td>
                        <td className="p-3 font-mono font-bold">₹{f.paidAmount}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              f.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. EXAMS & MARKS TAB */}
      {/* ========================================================= */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Exam */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Schedule New Exam</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1">Exam Name</label>
                <input
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g. Unit Test 2 - Mathematics"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Total Marks</label>
                <input
                  type="number"
                  value={examTotalMarks}
                  onChange={(e) => setExamTotalMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!examName.trim()) return;
                  addExam({
                    classId: adminClassId,
                    subjectId: classSubjects[0]?.id || 'sub-1',
                    name: examName,
                    date: new Date().toISOString().split('T')[0],
                    maxMarks: examTotalMarks,
                    totalMarks: examTotalMarks,
                    examType: 'unit_test',
                  });
                  setExamName('');
                }}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
              >
                Create Exam Schedule
              </button>
            </div>
          </div>

          {/* Enter Marks */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <span>Enter Student Marks</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1">Select Exam</label>
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="">-- Choose Exam --</option>
                  {exams
                    .filter((e) => e.classId === adminClassId)
                    .map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name} ({ex.totalMarks || ex.maxMarks || 50} Marks)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Select Student</label>
                <select
                  value={markStudentId}
                  onChange={(e) => setMarkStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="">-- Choose Student --</option>
                  {classStudents.map((std) => (
                    <option key={std.id} value={std.id}>
                      {std.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Obtained Marks</label>
                <input
                  type="number"
                  value={markObtained}
                  onChange={(e) => setMarkObtained(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!selectedExamId || !markStudentId) {
                    showToast('Select both exam and student', 'warning');
                    return;
                  }
                  const std = students.find((s) => s.id === markStudentId);
                  const ex = exams.find((e) => e.id === selectedExamId);
                  const total = ex?.totalMarks || ex?.maxMarks || 50;
                  const pct = Math.round((markObtained / total) * 100);
                  const grade = pct >= 90 ? 'AA' : pct >= 80 ? 'A+' : pct >= 70 ? 'A' : 'B';

                  enterStudentMark({
                    examId: selectedExamId,
                    studentId: markStudentId,
                    studentName: std?.name || 'Student',
                    obtainedMarks: markObtained,
                    maxMarks: total,
                    totalMarks: total,
                    percentage: pct,
                    grade,
                    feedback: markFeedback,
                  });
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Record Marks & Generate Grade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. SETTINGS TAB */}
      {/* ========================================================= */}
      {activeTab === 'settings' && (
        <form
          onSubmit={handleSaveSettings}
          className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 max-w-3xl"
        >
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Website & Coaching Centre Settings
            </h3>
            <p className="text-xs text-slate-400">
              Update branding, lead teacher credentials, phone numbers, and WhatsApp numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Coaching Centre Name</label>
              <input
                type="text"
                value={centreName}
                onChange={(e) => setCentreName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Teacher / Admin Name</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Teacher Qualifications</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">WhatsApp Number (with country code)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Tuition Centre Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Centre Settings</span>
          </button>
        </form>
      )}
    </div>
  );
};

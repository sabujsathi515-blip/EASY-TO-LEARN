import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  Award,
  Book,
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
  Image as ImageIcon,
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
  Upload,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BackButton } from '../common/BackButton';
import { AdminTextBooks } from './AdminTextBooks';
import { MockTestAdmin } from '../exam/MockTestAdmin';
import {
  AttendanceRecord,
  Chapter,
  Exam,
  FeeRecord,
  MaterialCategory,
  Notice,
  StudentMark,
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
    updateStudyMaterial,
    deleteStudyMaterial,
    addSubject,
    updateSubject,
    deleteSubject,
    addChapter,
    updateChapter,
    deleteChapter,
    addStudent,
    updateStudent,
    deleteStudent,
    recordAttendance,
    updateAttendance,
    deleteAttendance,
    recordFeePayment,
    updateFeeRecord,
    deleteFeeRecord,
    addExam,
    updateExam,
    deleteExam,
    enterStudentMark,
    updateMark,
    deleteMark,
    addNotice,
    updateNotice,
    deleteNotice,
    openDocumentViewer,
    language,
    t,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'materials'
    | 'books'
    | 'mock_tests'
    | 'curriculum'
    | 'students'
    | 'attendance'
    | 'fees'
    | 'exams'
    | 'notices'
    | 'settings'
  >('mock_tests');

  // Selected class in Admin
  const [adminClassId, setAdminClassId] = useState<number>(10);

  // 1. Material Upload Form State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSubjectId, setUploadSubjectId] = useState<string>('sub-c10-math');
  const [uploadChapterId, setUploadChapterId] = useState<string>('ch-c10-m1');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadTitleBn, setUploadTitleBn] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MaterialCategory>('chapter_notes');
  const [uploadFormat, setUploadFormat] = useState<'pdf' | 'notes' | 'image'>('pdf');
  const [uploadPagesCount, setUploadPagesCount] = useState<number>(3);
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadPageContent, setUploadPageContent] = useState('');
  const [uploadFileUrl, setUploadFileUrl] = useState<string>('');
  const [uploadFileName, setUploadFileName] = useState<string>('');

  // Edit states for all models
  const [editingMaterial, setEditingMaterial] = useState<StudyMaterial | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [editingAttendance, setEditingAttendance] = useState<AttendanceRecord | null>(null);
  const [editingFee, setEditingFee] = useState<FeeRecord | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [editingMark, setEditingMark] = useState<StudentMark | null>(null);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  // Notice creation modal state
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeTitleBn, setNewNoticeTitleBn] = useState('');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<Notice['category']>('announcement');
  const [newNoticeClass, setNewNoticeClass] = useState<number | 'all'>('all');
  const [newNoticeImportant, setNewNoticeImportant] = useState(false);

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

  // Handle file selection (PDF or Image)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (isEdit && editingMaterial) {
        setEditingMaterial({
          ...editingMaterial,
          fileUrl: dataUrl,
          fileName: file.name,
          fileSize: sizeInMb,
          format: isImage ? 'image' : 'pdf',
        });
      } else {
        setUploadFileUrl(dataUrl);
        setUploadFileName(file.name);
        setUploadFormat(isImage ? 'image' : 'pdf');
        if (!uploadTitle.trim()) {
          const autoTitle = file.name.replace(/\.[^/.]+$/, '');
          setUploadTitle(autoTitle);
        }
      }
      showToast(`Selected ${isImage ? 'Image' : 'PDF'}: ${file.name} (${sizeInMb})`, 'info');
    };
    reader.readAsDataURL(file);
  };

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
      fileUrl: uploadFileUrl || undefined,
      fileName: uploadFileName || undefined,
      fileSize: uploadFileUrl ? (uploadFormat === 'image' ? '1.4 MB' : '2.8 MB') : undefined,
      description: uploadDesc,
      totalPages: uploadFormat === 'image' ? 1 : uploadPagesCount,
      author: settings.teacherName,
      pages: [
        {
          pageNumber: 1,
          pageNo: 1,
          title: uploadTitle + ' (Section 1)',
          content:
            uploadPageContent ||
            (uploadFormat === 'image'
              ? `EASY TO LEARN • Diagram / Formula Chart for Class ${adminClassId}.\nPrepared by ${settings.teacherName}.`
              : `EASY TO LEARN • Complete Study Module for Class ${adminClassId}.\n\nThis material has been compiled and reviewed by ${settings.teacherName}.\n\nTopics covered in this lesson:\n1. Core definitions & axioms\n2. Key formulas and derivations\n3. Solved examples with board marking schemes\n4. Practice exercises for home study.\n\nRead-only mode is active. Download disabled.`),
        },
      ],
    });

    setUploadTitle('');
    setUploadTitleBn('');
    setUploadDesc('');
    setUploadPageContent('');
    setUploadFileUrl('');
    setUploadFileName('');
    setShowUploadModal(false);
  };

  // Save edited material
  const handleSaveEditedMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial) return;
    updateStudyMaterial(editingMaterial.id, {
      title: editingMaterial.title,
      titleBn: editingMaterial.titleBn || undefined,
      subjectId: editingMaterial.subjectId,
      chapterId: editingMaterial.chapterId || undefined,
      category: editingMaterial.category,
      format: editingMaterial.format,
      fileUrl: editingMaterial.fileUrl,
      fileName: editingMaterial.fileName,
      fileSize: editingMaterial.fileSize,
      description: editingMaterial.description,
      totalPages: editingMaterial.totalPages,
    });
    setEditingMaterial(null);
  };

  // Save edited subject
  const handleSaveEditedSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject || !editingSubject.name.trim()) return;
    updateSubject(editingSubject.id, {
      name: editingSubject.name,
      nameBn: editingSubject.nameBn || undefined,
      color: editingSubject.color,
    });
    setEditingSubject(null);
  };

  // Save edited chapter
  const handleSaveEditedChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter || !editingChapter.title.trim()) return;
    updateChapter(editingChapter.id, {
      chapterNo: editingChapter.chapterNo,
      title: editingChapter.title,
      titleBn: editingChapter.titleBn || undefined,
      subjectId: editingChapter.subjectId,
    });
    setEditingChapter(null);
  };

  // Save edited student
  const handleSaveEditedStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editingStudent.name.trim()) return;
    updateStudent(editingStudent.id, {
      name: editingStudent.name,
      rollNumber: editingStudent.rollNumber,
      mobileNumber: editingStudent.mobileNumber,
      guardianName: editingStudent.guardianName,
      classId: editingStudent.classId,
    });
    setEditingStudent(null);
  };

  // Save edited attendance
  const handleSaveEditedAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAttendance) return;
    updateAttendance(editingAttendance.id, {
      status: editingAttendance.status,
      remark: editingAttendance.remark,
      date: editingAttendance.date,
    });
    setEditingAttendance(null);
  };

  // Save edited fee
  const handleSaveEditedFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFee) return;
    updateFeeRecord(editingFee.id, {
      month: editingFee.month,
      paidAmount: editingFee.paidAmount,
      amount: editingFee.amount,
      monthlyFee: editingFee.amount,
      status: editingFee.status,
    });
    setEditingFee(null);
  };

  // Save edited exam
  const handleSaveEditedExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExam || !editingExam.name.trim()) return;
    updateExam(editingExam.id, {
      name: editingExam.name,
      maxMarks: editingExam.maxMarks || editingExam.totalMarks || 50,
      totalMarks: editingExam.maxMarks || editingExam.totalMarks || 50,
      date: editingExam.date,
    });
    setEditingExam(null);
  };

  // Save edited mark
  const handleSaveEditedMark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMark) return;
    const total = editingMark.maxMarks || editingMark.totalMarks || 50;
    const pct = Math.round((editingMark.obtainedMarks / total) * 100);
    const grade = pct >= 90 ? 'AA' : pct >= 80 ? 'A+' : pct >= 70 ? 'A' : 'B';
    updateMark(editingMark.id, {
      obtainedMarks: editingMark.obtainedMarks,
      percentage: pct,
      grade,
      feedback: editingMark.feedback,
    });
    setEditingMark(null);
  };

  // Create notice
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    addNotice({
      title: newNoticeTitle,
      titleBn: newNoticeTitleBn || undefined,
      description: newNoticeDesc,
      category: newNoticeCategory,
      targetClass: newNoticeClass,
      isImportant: newNoticeImportant,
      isPinned: newNoticeImportant,
    });
    setNewNoticeTitle('');
    setNewNoticeTitleBn('');
    setNewNoticeDesc('');
    setShowAddNoticeModal(false);
  };

  // Save edited notice
  const handleSaveEditedNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice || !editingNotice.title.trim()) return;
    updateNotice(editingNotice.id, {
      title: editingNotice.title,
      titleBn: editingNotice.titleBn || undefined,
      description: editingNotice.description,
      category: editingNotice.category,
      targetClass: editingNotice.targetClass,
      isImportant: editingNotice.isImportant,
    });
    setEditingNotice(null);
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
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <BackButton showHomeShortcut />
      </div>

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
              <span className="text-xs text-slate-400">{settings.teacherName || 'Milton Sir'}</span>
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
          { id: 'mock_tests', label: 'মক টেস্ট ও প্রশ্নব্যাংক (Mock Tests & Question Bank)', icon: Award },
          { id: 'materials', label: 'Study Materials & Upload', icon: BookOpen },
          { id: 'books', label: 'WB Board Books (সকল বই)', icon: Book },
          { id: 'curriculum', label: 'Subjects & Chapters', icon: Layers },
          { id: 'students', label: 'Student Directory', icon: Users },
          { id: 'attendance', label: 'Attendance Register', icon: UserCheck },
          { id: 'fees', label: 'Fee Management', icon: DollarSign },
          { id: 'exams', label: 'Exams & Marks', icon: Award },
          { id: 'notices', label: 'Notices Board', icon: Megaphone },
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold"
                  >
                    <option value="pdf">PDF Document (Protected)</option>
                    <option value="image">Image / Diagram / Photo (Protected)</option>
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

              {/* Upload PDF or Image File */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700/60 bg-blue-50/50 dark:bg-blue-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Upload PDF Document or Image File (Optional)</span>
                  </span>
                  {uploadFileName && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {uploadFileName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Choose PDF or Image File</span>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => handleFileSelect(e, false)}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-500">Supports .pdf, .png, .jpg, .jpeg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Document Content (Page 1 Text or Notes)
                </label>
                <textarea
                  rows={3}
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
                        {mat.format === 'image' ? (
                          <ImageIcon className="w-5 h-5" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                            {sub?.name || 'Subject'}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase">
                            {mat.category.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                            {mat.format}
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
                        onClick={() => setEditingMaterial(mat)}
                        title="Edit Study Material"
                        className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-100 transition flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteStudyMaterial(mat.id)}
                        title="Delete Material"
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
      {/* WB BOARD TEXTBOOKS TAB (সকল বই আপলোড ও ডিলিট) */}
      {/* ========================================================= */}
      {activeTab === 'books' && (
        <AdminTextBooks
          adminClassId={adminClassId}
          onSelectClass={setAdminClassId}
        />
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
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingSubject(s)}
                      title="Edit Subject"
                      className="p-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteSubject(s.id)}
                      title="Delete Subject"
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditingChapter(c)}
                        title="Edit Chapter"
                        className="p-1 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteChapter(c.id)}
                        title="Delete Chapter"
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingStudent(std)}
                          title="Edit Student Profile"
                          className="p-1 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteStudent(std.id)}
                          title="Delete Student"
                          className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {attendance
                    .filter((a) => a.classId === adminClassId)
                    .slice(0, 20)
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
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingAttendance(rec)}
                                title="Edit Attendance Record"
                                className="p-1 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteAttendance(rec.id)}
                                title="Delete Attendance Record"
                                className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
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
                    <th className="p-3 text-right">Actions</th>
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
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingFee(f)}
                              title="Edit Fee Record"
                              className="p-1 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteFeeRecord(f.id)}
                              title="Delete Fee Record"
                              className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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

          {/* Scheduled Exams List with Edit/Delete */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Scheduled Exams (Class {adminClassId})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3">Exam Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Total Marks</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {exams
                    .filter((e) => e.classId === adminClassId)
                    .map((ex) => (
                      <tr key={ex.id}>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">{ex.name}</td>
                        <td className="p-3 font-mono text-slate-500">{ex.date}</td>
                        <td className="p-3 font-mono font-bold text-amber-600">
                          {ex.totalMarks || ex.maxMarks || 50}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingExam(ex)}
                              title="Edit Exam Schedule"
                              className="p-1 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteExam(ex.id)}
                              title="Delete Exam"
                              className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {exams.filter((e) => e.classId === adminClassId).length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-slate-400">
                        No scheduled exams for Class {adminClassId}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Marks List with Edit/Delete */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recorded Student Marks (Class {adminClassId})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3">Student</th>
                    <th className="p-3">Exam</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {marks
                    .filter((m) => {
                      const std = students.find((s) => s.id === m.studentId);
                      return std?.classId === adminClassId;
                    })
                    .map((mk) => {
                      const std = students.find((s) => s.id === mk.studentId);
                      const ex = exams.find((e) => e.id === mk.examId);
                      return (
                        <tr key={mk.id}>
                          <td className="p-3 font-semibold">{std?.name || mk.studentName || 'Student'}</td>
                          <td className="p-3 text-slate-500">{ex?.name || 'Exam'}</td>
                          <td className="p-3 font-mono font-bold">
                            {mk.obtainedMarks} / {mk.totalMarks || mk.maxMarks || 50} ({mk.percentage || Math.round(((mk.obtainedMarks || 0)/(mk.totalMarks || 50))*100)}%)
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                              {mk.grade}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingMark(mk)}
                                title="Edit Mark"
                                className="p-1 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteMark(mk.id)}
                                title="Delete Mark"
                                className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
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
      {/* 7. NOTICES BOARD TAB */}
      {/* ========================================================= */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-600" />
                <span>Notice Board Management</span>
              </h3>
              <p className="text-xs text-slate-400">Broadcast updates, holiday announcements, and exam schedules</p>
            </div>
            <button
              onClick={() => setShowAddNoticeModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Notice</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3.5">Notice Title</th>
                    <th className="p-3.5">Target</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Important</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {notices.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{n.title}</div>
                        {n.titleBn && <div className="text-xs text-slate-400">{n.titleBn}</div>}
                        <div className="text-xs text-slate-500 line-clamp-1">{n.description}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {n.targetClass === 'all' ? 'All Classes' : `Class ${n.targetClass}`}
                        </span>
                      </td>
                      <td className="p-3.5 capitalize text-slate-600 dark:text-slate-300">
                        {n.category || 'General'}
                      </td>
                      <td className="p-3.5 font-mono text-slate-500 text-xs">{n.date}</td>
                      <td className="p-3.5">
                        {n.isImportant ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                            Urgent
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">Standard</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingNotice(n)}
                            title="Edit Notice"
                            className="p-1 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteNotice(n.id)}
                            title="Delete Notice"
                            className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. SETTINGS TAB */}
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

      {/* ========================================================= */}
      {/* 10. MOCK TESTS & QUESTION BANK MANAGEMENT TAB */}
      {/* ========================================================= */}
      {activeTab === 'mock_tests' && <MockTestAdmin />}

      {/* ========================================================= */}
      {/* MODAL: EDIT STUDY MATERIAL */}
      {/* ========================================================= */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <form
            onSubmit={handleSaveEditedMaterial}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 my-8"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-500" />
                <span>Edit Study Material</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingMaterial(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={editingMaterial.title}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Title (Bengali)</label>
                <input
                  type="text"
                  value={editingMaterial.titleBn || ''}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, titleBn: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Subject</label>
                <select
                  value={editingMaterial.subjectId}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, subjectId: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      Class {s.classId} - {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Category</label>
                <select
                  value={editingMaterial.category}
                  onChange={(e) =>
                    setEditingMaterial({
                      ...editingMaterial,
                      category: e.target.value as MaterialCategory,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
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
              <div>
                <label className="block text-xs font-bold mb-1">Format</label>
                <select
                  value={editingMaterial.format}
                  onChange={(e) =>
                    setEditingMaterial({
                      ...editingMaterial,
                      format: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="image">Image / Diagram</option>
                  <option value="notes">Lecture Notes</option>
                </select>
              </div>
            </div>

            {/* Replace / Upload New File in Edit Mode */}
            <div className="p-3.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>Update Attached File (PDF or Image)</span>
                </span>
                {editingMaterial.fileName && (
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Current: {editingMaterial.fileName}
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => handleFileSelect(e, true)}
                className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Description</label>
              <input
                type="text"
                value={editingMaterial.description || ''}
                onChange={(e) =>
                  setEditingMaterial({ ...editingMaterial, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingMaterial(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT SUBJECT */}
      {/* ========================================================= */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedSubject}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-600" />
                <span>Edit Subject</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Subject Name (English) *</label>
              <input
                type="text"
                required
                value={editingSubject.name}
                onChange={(e) =>
                  setEditingSubject({ ...editingSubject, name: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Subject Name (Bengali)</label>
              <input
                type="text"
                value={editingSubject.nameBn || ''}
                onChange={(e) =>
                  setEditingSubject({ ...editingSubject, nameBn: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
              >
                Save Subject
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT CHAPTER */}
      {/* ========================================================= */}
      {editingChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedChapter}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-purple-600" />
                <span>Edit Chapter</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingChapter(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-bold mb-1">Chapter #</label>
                <input
                  type="number"
                  min={1}
                  value={editingChapter.chapterNo}
                  onChange={(e) =>
                    setEditingChapter({
                      ...editingChapter,
                      chapterNo: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold mb-1">Chapter Title *</label>
                <input
                  type="text"
                  required
                  value={editingChapter.title}
                  onChange={(e) =>
                    setEditingChapter({ ...editingChapter, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Title (Bengali)</label>
              <input
                type="text"
                value={editingChapter.titleBn || ''}
                onChange={(e) =>
                  setEditingChapter({ ...editingChapter, titleBn: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingChapter(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white shadow-sm"
              >
                Save Chapter
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT STUDENT */}
      {/* ========================================================= */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedStudent}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-600" />
                <span>Edit Student Profile</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Class Level</label>
                <select
                  value={editingStudent.classId}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      classId: Number(e.target.value),
                    })
                  }
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
                <label className="block text-xs font-bold mb-1">Roll Number</label>
                <input
                  type="number"
                  value={editingStudent.rollNumber}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      rollNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Mobile / WhatsApp</label>
                <input
                  type="text"
                  value={editingStudent.mobileNumber}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      mobileNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Guardian Name</label>
                <input
                  type="text"
                  value={editingStudent.guardianName || ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      guardianName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT ATTENDANCE */}
      {/* ========================================================= */}
      {editingAttendance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedAttendance}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-emerald-600" />
                <span>Edit Attendance Record</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingAttendance(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Date</label>
              <input
                type="date"
                value={editingAttendance.date}
                onChange={(e) =>
                  setEditingAttendance({
                    ...editingAttendance,
                    date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Status</label>
              <select
                value={editingAttendance.status}
                onChange={(e) =>
                  setEditingAttendance({
                    ...editingAttendance,
                    status: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="leave">Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Teacher Remark</label>
              <input
                type="text"
                value={editingAttendance.remark || ''}
                onChange={(e) =>
                  setEditingAttendance({
                    ...editingAttendance,
                    remark: e.target.value,
                  })
                }
                placeholder="Optional remark..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingAttendance(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm"
              >
                Save Attendance
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT FEE */}
      {/* ========================================================= */}
      {editingFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedFee}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-emerald-600" />
                <span>Edit Fee Record</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingFee(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Fee Month</label>
              <input
                type="text"
                value={editingFee.month}
                onChange={(e) =>
                  setEditingFee({ ...editingFee, month: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Paid Amount (₹)</label>
                <input
                  type="number"
                  value={editingFee.paidAmount}
                  onChange={(e) =>
                    setEditingFee({
                      ...editingFee,
                      paidAmount: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Status</label>
                <select
                  value={editingFee.status}
                  onChange={(e) =>
                    setEditingFee({
                      ...editingFee,
                      status: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingFee(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT EXAM */}
      {/* ========================================================= */}
      {editingExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedExam}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-500" />
                <span>Edit Exam Schedule</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingExam(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Exam Name *</label>
              <input
                type="text"
                required
                value={editingExam.name}
                onChange={(e) =>
                  setEditingExam({ ...editingExam, name: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Total Marks</label>
                <input
                  type="number"
                  value={editingExam.totalMarks || editingExam.maxMarks || 50}
                  onChange={(e) =>
                    setEditingExam({
                      ...editingExam,
                      maxMarks: Number(e.target.value),
                      totalMarks: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Exam Date</label>
                <input
                  type="date"
                  value={editingExam.date}
                  onChange={(e) =>
                    setEditingExam({ ...editingExam, date: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingExam(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm"
              >
                Update Exam
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT STUDENT MARK */}
      {/* ========================================================= */}
      {editingMark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedMark}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-600" />
                <span>Edit Student Score</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingMark(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Editing marks for:{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {editingMark.studentName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Obtained Marks</label>
                <input
                  type="number"
                  value={editingMark.obtainedMarks}
                  onChange={(e) =>
                    setEditingMark({
                      ...editingMark,
                      obtainedMarks: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Total Marks</label>
                <input
                  type="number"
                  value={editingMark.maxMarks || editingMark.totalMarks || 50}
                  onChange={(e) =>
                    setEditingMark({
                      ...editingMark,
                      maxMarks: Number(e.target.value),
                      totalMarks: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Teacher Feedback</label>
              <input
                type="text"
                value={editingMark.feedback || ''}
                onChange={(e) =>
                  setEditingMark({ ...editingMark, feedback: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingMark(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
              >
                Save Score
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: POST NEW NOTICE */}
      {/* ========================================================= */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateNotice}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-600" />
                <span>Post New Notice</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddNoticeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Notice Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  placeholder="e.g. Special Revision Class on Sunday"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Notice Title (Bengali)</label>
                <input
                  type="text"
                  value={newNoticeTitleBn}
                  onChange={(e) => setNewNoticeTitleBn(e.target.value)}
                  placeholder="যেমন: রবিবার বিশেষ রিভিশন ক্লাস"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Target Class</label>
                <select
                  value={newNoticeClass}
                  onChange={(e) =>
                    setNewNoticeClass(
                      e.target.value === 'all' ? 'all' : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                >
                  <option value="all">All Classes (1 to 10)</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Category</label>
                <select
                  value={newNoticeCategory}
                  onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                >
                  <option value="announcement">Announcement</option>
                  <option value="exam">Exam / Test</option>
                  <option value="holiday">Holiday</option>
                  <option value="fees">Fees</option>
                  <option value="admission">Admission</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Notice Content</label>
              <textarea
                rows={3}
                value={newNoticeDesc}
                onChange={(e) => setNewNoticeDesc(e.target.value)}
                placeholder="Details of the announcement..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notice-important"
                checked={newNoticeImportant}
                onChange={(e) => setNewNoticeImportant(e.target.checked)}
                className="rounded text-blue-600"
              />
              <label htmlFor="notice-important" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Mark as High Priority / Urgent Notice
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddNoticeModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
              >
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT NOTICE */}
      {/* ========================================================= */}
      {editingNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedNotice}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-600" />
                <span>Edit Notice</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingNotice(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Notice Title (English) *</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title}
                  onChange={(e) =>
                    setEditingNotice({ ...editingNotice, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Notice Title (Bengali)</label>
                <input
                  type="text"
                  value={editingNotice.titleBn || ''}
                  onChange={(e) =>
                    setEditingNotice({ ...editingNotice, titleBn: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Target Class</label>
                <select
                  value={editingNotice.targetClass}
                  onChange={(e) =>
                    setEditingNotice({
                      ...editingNotice,
                      targetClass:
                        e.target.value === 'all' ? 'all' : Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                >
                  <option value="all">All Classes</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Category</label>
                <select
                  value={editingNotice.category}
                  onChange={(e) =>
                    setEditingNotice({
                      ...editingNotice,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                >
                  <option value="announcement">Announcement</option>
                  <option value="exam">Exam / Test</option>
                  <option value="holiday">Holiday</option>
                  <option value="fees">Fees</option>
                  <option value="admission">Admission</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Notice Content</label>
              <textarea
                rows={3}
                value={editingNotice.description}
                onChange={(e) =>
                  setEditingNotice({
                    ...editingNotice,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="edit-notice-important"
                checked={!!editingNotice.isImportant}
                onChange={(e) =>
                  setEditingNotice({
                    ...editingNotice,
                    isImportant: e.target.checked,
                  })
                }
                className="rounded text-blue-600"
              />
              <label htmlFor="edit-notice-important" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Mark as High Priority / Urgent Notice
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingNotice(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
              >
                Save Notice
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

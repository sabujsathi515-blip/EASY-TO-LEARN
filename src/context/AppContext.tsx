import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AppSettings,
  AttendanceRecord,
  Chapter,
  ClassLevel,
  Exam,
  FeeRecord,
  HomeworkItem,
  Language,
  Notice,
  StudentMark,
  StudentProfile,
  StudyMaterial,
  Subject,
  Theme,
  UserRole,
} from '../types';
import {
  INITIAL_ATTENDANCE,
  INITIAL_CHAPTERS,
  INITIAL_CLASSES,
  INITIAL_EXAMS,
  INITIAL_FEES,
  INITIAL_HOMEWORK,
  INITIAL_MARKS,
  INITIAL_NOTICES,
  INITIAL_SETTINGS,
  INITIAL_STUDENTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_SUBJECTS,
} from '../data/initialData';
import { translations } from '../utils/translations';

export interface CurrentUser {
  role: UserRole;
  student?: StudentProfile;
  adminName?: string;
}

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Config & Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  theme: Theme;
  toggleTheme: () => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetAllData: () => void;

  // Navigation & State
  currentView: string;
  setCurrentView: (view: string) => void;
  goBack: () => void;
  canGoBack: boolean;
  navigationHistory: string[];
  selectedClassId: number;
  setSelectedClassId: (id: number) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (id: string | null) => void;
  selectedChapterId: string | null;
  setSelectedChapterId: (id: string | null) => void;
  activeDocument: StudyMaterial | null;
  openDocumentViewer: (doc: StudyMaterial) => void;
  closeDocumentViewer: () => void;

  // Search & Auth Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;

  // Auth
  currentUser: CurrentUser;
  loginAsAdmin: (password: string, username?: string) => boolean;
  loginAsStudent: (studentIdOrMobile: string, password: string) => boolean;
  loginQuickStudent: (student: StudentProfile) => void;
  logout: () => void;

  // Data Collections & Operations
  classes: ClassLevel[];
  subjects: Subject[];
  chapters: Chapter[];
  studyMaterials: StudyMaterial[];
  notices: Notice[];
  homeworkList: HomeworkItem[];
  students: StudentProfile[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  exams: Exam[];
  marks: StudentMark[];

  // Study Material Management
  addStudyMaterial: (mat: Omit<StudyMaterial, 'id' | 'viewCount' | 'uploadDate'>) => void;
  updateStudyMaterial: (id: string, mat: Partial<StudyMaterial>) => void;
  deleteStudyMaterial: (id: string) => void;

  // Subject & Chapter Management
  addSubject: (subj: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subj: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addChapter: (chap: Omit<Chapter, 'id'>) => void;
  updateChapter: (id: string, chap: Partial<Chapter>) => void;
  deleteChapter: (id: string) => void;

  // Notice Management
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;

  // Homework Management
  addHomework: (hw: Omit<HomeworkItem, 'id' | 'assignedDate'>) => void;
  updateHomework: (id: string, hw: Partial<HomeworkItem>) => void;
  deleteHomework: (id: string) => void;

  // Student Management
  addStudent: (std: Omit<StudentProfile, 'id'>) => void;
  updateStudent: (id: string, std: Partial<StudentProfile>) => void;
  deleteStudent: (id: string) => void;

  // Attendance & Fees & Marks
  recordAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  updateAttendance: (id: string, record: Partial<AttendanceRecord>) => void;
  deleteAttendance: (id: string) => void;

  recordFeePayment: (fee: Omit<FeeRecord, 'id'>) => void;
  updateFeeRecord: (id: string, fee: Partial<FeeRecord>) => void;
  deleteFeeRecord: (id: string) => void;

  addExam: (exam: Omit<Exam, 'id'>) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;

  enterStudentMark: (mark: Omit<StudentMark, 'id'>) => void;
  updateMark: (id: string, mark: Partial<StudentMark>) => void;
  deleteMark: (id: string) => void;

  // Feedback Toast
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  toasts: Toast[];
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  SETTINGS: 'e2l_settings_v1',
  SUBJECTS: 'e2l_subjects_v1',
  CHAPTERS: 'e2l_chapters_v1',
  MATERIALS: 'e2l_materials_v1',
  NOTICES: 'e2l_notices_v1',
  HOMEWORK: 'e2l_homework_v1',
  STUDENTS: 'e2l_students_v1',
  ATTENDANCE: 'e2l_attendance_v1',
  FEES: 'e2l_fees_v1',
  EXAMS: 'e2l_exams_v1',
  MARKS: 'e2l_marks_v1',
  USER: 'e2l_user_v1',
  THEME: 'e2l_theme_v1',
  LANG: 'e2l_lang_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language & Theme
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) || 'light';
  });

  // Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!saved) return INITIAL_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.teacherName === 'Sabuj Sathi Sir' || !parsed.teacherName) {
        parsed.teacherName = 'Milton Sir';
      }
      if (parsed.whatsappNumber === '+919876543210' || !parsed.whatsappNumber) {
        parsed.whatsappNumber = '+917384491269';
      }
      if (parsed.contactNumber === '+91 98765 43210' || !parsed.contactNumber) {
        parsed.contactNumber = '+91 73844 91269';
      }
      return { ...INITIAL_SETTINGS, ...parsed };
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Navigation states
  const [currentView, setCurrentViewState] = useState<string>('home');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);

  const setCurrentView = (view: string) => {
    if (view === currentView) return;
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ view }, '', `#${view}`);
      }
    } catch {
      // In sandboxed iframes pushState might be restricted
    }
    setNavigationHistory((prev) => {
      if (prev[prev.length - 1] === view) return prev;
      return [...prev, view];
    });
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (activeDocument) {
      setActiveDocument(null);
      return;
    }
    setNavigationHistory((prev) => {
      if (prev.length > 1) {
        const nextHistory = prev.slice(0, -1);
        const previousView = nextHistory[nextHistory.length - 1] || 'home';
        setCurrentViewState(previousView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return nextHistory;
      } else {
        setCurrentViewState('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return ['home'];
      }
    });
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentViewState(event.state.view);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const canGoBack = currentView !== 'home' || navigationHistory.length > 1;

  const [selectedClassId, setSelectedClassId] = useState<number>(10);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [activeDocument, setActiveDocument] = useState<StudyMaterial | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // Auth
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : { role: 'guest' };
  });

  // Data
  const [classes] = useState<ClassLevel[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
    return saved ? JSON.parse(saved) : INITIAL_CHAPTERS;
  });
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    return saved ? JSON.parse(saved) : INITIAL_STUDY_MATERIALS;
  });
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOMEWORK);
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORK;
  });
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });
  const [fees, setFees] = useState<FeeRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEES);
    return saved ? JSON.parse(saved) : INITIAL_FEES;
  });
  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXAMS);
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });
  const [marks, setMarks] = useState<StudentMark[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MARKS);
    return saved ? JSON.parse(saved) : INITIAL_MARKS;
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(studyMaterials));
  }, [studyMaterials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOMEWORK, JSON.stringify(homeworkList));
  }, [homeworkList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARKS, JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings saved successfully', 'success');
  };

  const resetAllData = () => {
    localStorage.clear();
    setSettings(INITIAL_SETTINGS);
    setSubjects(INITIAL_SUBJECTS);
    setChapters(INITIAL_CHAPTERS);
    setStudyMaterials(INITIAL_STUDY_MATERIALS);
    setNotices(INITIAL_NOTICES);
    setHomeworkList(INITIAL_HOMEWORK);
    setStudents(INITIAL_STUDENTS);
    setAttendance(INITIAL_ATTENDANCE);
    setFees(INITIAL_FEES);
    setExams(INITIAL_EXAMS);
    setMarks(INITIAL_MARKS);
    setCurrentUser({ role: 'guest' });
    showToast('Sample data reset to defaults', 'info');
  };

  // Auth methods
  const loginAsAdmin = (password: string, username: string = 'EASY TO LEARN'): boolean => {
    const cleanUser = (username || '').trim().toUpperCase();
    const cleanPass = (password || '').trim();
    const validUsers = ['EASY TO LEARN', 'ADMIN', 'EASYTOLEARN', 'TEACHER'];
    const validPass = ['909311', 'ADMIN123', 'ADMIN'];

    if (validUsers.includes(cleanUser) && (validPass.includes(cleanPass) || validPass.includes(cleanPass.toUpperCase()))) {
      const user: CurrentUser = { role: 'admin', adminName: settings.teacherName };
      setCurrentUser(user);
      setIsLoginOpen(false);
      setCurrentView('admin_dashboard');
      showToast(`Welcome back, ${settings.teacherName} (Admin)`, 'success');
      return true;
    }
    showToast('Invalid credentials. Default User ID: EASY TO LEARN, Password: 6-digit PIN', 'error');
    return false;
  };

  const loginAsStudent = (studentIdOrMobile: string, pass: string): boolean => {
    const query = studentIdOrMobile.trim().toLowerCase();
    const found = students.find(
      (s) =>
        (s.studentId.toLowerCase() === query || s.mobileNumber === query) &&
        (s.password === pass || pass === 'student123')
    );
    if (found) {
      setCurrentUser({ role: 'student', student: found });
      setSelectedClassId(found.classId);
      setIsLoginOpen(false);
      setCurrentView('student_portal');
      showToast(`Welcome, ${found.name}! Showing Class ${found.classId} study desk.`, 'success');
      return true;
    }
    showToast('Student credentials not found. Use Demo 1-Click login or register.', 'error');
    return false;
  };

  const loginQuickStudent = (student: StudentProfile) => {
    setCurrentUser({ role: 'student', student });
    setSelectedClassId(student.classId);
    setIsLoginOpen(false);
    setCurrentView('student_portal');
    showToast(`Logged in as ${student.name} (Class ${student.classId})`, 'success');
  };

  const logout = () => {
    setCurrentUser({ role: 'guest' });
    setCurrentView('home');
    showToast('Logged out successfully', 'info');
  };

  // Viewer
  const openDocumentViewer = (doc: StudyMaterial) => {
    // Increment view count
    setStudyMaterials((prev) =>
      prev.map((m) => (m.id === doc.id ? { ...m, viewCount: m.viewCount + 1 } : m))
    );
    setActiveDocument(doc);
  };

  const closeDocumentViewer = () => {
    setActiveDocument(null);
  };

  // Operations
  const addStudyMaterial = (mat: Omit<StudyMaterial, 'id' | 'viewCount' | 'uploadDate'>) => {
    const newDoc: StudyMaterial = {
      ...mat,
      id: 'mat-' + Date.now(),
      viewCount: 1,
      uploadDate: new Date().toISOString().split('T')[0],
      isSampleContent: false,
    };
    setStudyMaterials((prev) => [newDoc, ...prev]);
    showToast('New study material published successfully', 'success');
  };

  const updateStudyMaterial = (id: string, mat: Partial<StudyMaterial>) => {
    setStudyMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, ...mat } : m)));
    showToast('Study material updated', 'success');
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterials((prev) => prev.filter((m) => m.id !== id));
    showToast('Study material deleted', 'info');
  };

  const addSubject = (subj: Omit<Subject, 'id'>) => {
    const id = `sub-c${subj.classId}-${Date.now().toString().slice(-4)}`;
    setSubjects((prev) => [...prev, { ...subj, id }]);
    showToast(`Subject ${subj.name} added`, 'success');
  };

  const updateSubject = (id: string, subj: Partial<Subject>) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...subj } : s)));
    showToast('Subject updated successfully', 'success');
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    showToast('Subject deleted', 'info');
  };

  const addChapter = (chap: Omit<Chapter, 'id'>) => {
    const id = `ch-${Date.now().toString().slice(-6)}`;
    setChapters((prev) => [...prev, { ...chap, id }]);
    showToast(`Chapter ${chap.chapterNo} added`, 'success');
  };

  const updateChapter = (id: string, chap: Partial<Chapter>) => {
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, ...chap } : c)));
    showToast('Chapter updated successfully', 'success');
  };

  const deleteChapter = (id: string) => {
    setChapters((prev) => prev.filter((c) => c.id !== id));
    showToast('Chapter deleted', 'info');
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...notice,
      id: 'not-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
    showToast('Notice published on board', 'success');
  };

  const updateNotice = (id: string, notice: Partial<Notice>) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, ...notice } : n)));
    showToast('Notice updated successfully', 'success');
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    showToast('Notice removed', 'info');
  };

  const addHomework = (hw: Omit<HomeworkItem, 'id' | 'assignedDate'>) => {
    const newHw: HomeworkItem = {
      ...hw,
      id: 'hw-' + Date.now(),
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setHomeworkList((prev) => [newHw, ...prev]);
    showToast('Homework assigned to class', 'success');
  };

  const updateHomework = (id: string, hw: Partial<HomeworkItem>) => {
    setHomeworkList((prev) => prev.map((h) => (h.id === id ? { ...h, ...hw } : h)));
    showToast('Homework updated successfully', 'success');
  };

  const deleteHomework = (id: string) => {
    setHomeworkList((prev) => prev.filter((h) => h.id !== id));
    showToast('Homework deleted', 'info');
  };

  const addStudent = (std: Omit<StudentProfile, 'id'>) => {
    const newStudent: StudentProfile = {
      ...std,
      id: 'std-' + Date.now(),
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student ${std.name} registered`, 'success');
  };

  const updateStudent = (id: string, std: Partial<StudentProfile>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...std } : s)));
    showToast('Student information updated', 'success');
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('Student removed', 'info');
  };

  const recordAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    const id = `att-${Date.now()}`;
    setAttendance((prev) => [{ ...record, id }, ...prev]);
    showToast(`Attendance marked as ${record.status}`, 'success');
  };

  const updateAttendance = (id: string, record: Partial<AttendanceRecord>) => {
    setAttendance((prev) => prev.map((a) => (a.id === id ? { ...a, ...record } : a)));
    showToast('Attendance record updated', 'success');
  };

  const deleteAttendance = (id: string) => {
    setAttendance((prev) => prev.filter((a) => a.id !== id));
    showToast('Attendance record deleted', 'info');
  };

  const recordFeePayment = (fee: Omit<FeeRecord, 'id'>) => {
    const id = `fee-${Date.now()}`;
    setFees((prev) => [{ ...fee, id }, ...prev]);
    showToast(`Payment of ₹${fee.paidAmount} recorded`, 'success');
  };

  const updateFeeRecord = (id: string, fee: Partial<FeeRecord>) => {
    setFees((prev) => prev.map((f) => (f.id === id ? { ...f, ...fee } : f)));
    showToast('Fee payment record updated', 'success');
  };

  const deleteFeeRecord = (id: string) => {
    setFees((prev) => prev.filter((f) => f.id !== id));
    showToast('Fee record deleted', 'info');
  };

  const addExam = (exam: Omit<Exam, 'id'>) => {
    const id = `ex-${Date.now()}`;
    setExams((prev) => [{ ...exam, id }, ...prev]);
    showToast(`Exam ${exam.name} scheduled`, 'success');
  };

  const updateExam = (id: string, exam: Partial<Exam>) => {
    setExams((prev) => prev.map((e) => (e.id === id ? { ...e, ...exam } : e)));
    showToast('Exam schedule updated', 'success');
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    showToast('Exam deleted', 'info');
  };

  const enterStudentMark = (mark: Omit<StudentMark, 'id'>) => {
    const id = `mrk-${Date.now()}`;
    setMarks((prev) => [{ ...mark, id }, ...prev]);
    showToast(`Marks recorded for ${mark.studentName}`, 'success');
  };

  const updateMark = (id: string, mark: Partial<StudentMark>) => {
    setMarks((prev) => prev.map((m) => (m.id === id ? { ...m, ...mark } : m)));
    showToast('Student marks updated', 'success');
  };

  const deleteMark = (id: string) => {
    setMarks((prev) => prev.filter((m) => m.id !== id));
    showToast('Student mark entry deleted', 'info');
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        settings,
        updateSettings,
        resetAllData,
        currentView,
        setCurrentView,
        goBack,
        canGoBack,
        navigationHistory,
        selectedClassId,
        setSelectedClassId,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedChapterId,
        setSelectedChapterId,
        activeDocument,
        openDocumentViewer,
        closeDocumentViewer,
        isSearchOpen,
        setIsSearchOpen,
        isLoginOpen,
        setIsLoginOpen,
        currentUser,
        loginAsAdmin,
        loginAsStudent,
        loginQuickStudent,
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
        addStudyMaterial,
        updateStudyMaterial,
        deleteStudyMaterial,
        addSubject,
        updateSubject,
        deleteSubject,
        addChapter,
        updateChapter,
        deleteChapter,
        addNotice,
        updateNotice,
        deleteNotice,
        addHomework,
        updateHomework,
        deleteHomework,
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
        showToast,
        toasts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

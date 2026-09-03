export type UserRole = 'guest' | 'student' | 'admin';

export type Language = 'en' | 'bn';

export type Theme = 'light' | 'dark';

export type MaterialCategory =
  | 'chapter_notes'
  | 'pdf_notes'
  | 'question_papers'
  | 'suggestions'
  | 'worksheets'
  | 'homework'
  | 'class_tests'
  | 'important_questions'
  | 'practice_sets'
  | 'notices';

export type ExamType =
  | 'class_test'
  | 'unit_test'
  | 'half_yearly'
  | 'annual'
  | 'pyq'
  | 'model';

export interface StudentProfile {
  id: string;
  studentId: string;
  name: string;
  classId: number; // 1 to 10
  rollNumber: string | number;
  mobileNumber: string;
  password?: string;
  joinDate?: string;
  admissionDate?: string;
  avatarUrl?: string;
  guardianName?: string;
}

export interface AdminProfile {
  id: string;
  username: string;
  name: string;
  qualification: string;
  experience: string;
  subjectsTaught: string[];
  classesTaught: string;
  mobileNumber: string;
  whatsappNumber: string;
  address: string;
  centreName: string;
  tagline: string;
  academicYear: string;
}

export interface ClassLevel {
  id: number;
  name: string;
  nameBn: string;
  shortCode: string;
  color: string;
  icon: string;
  description: string;
  descriptionBn: string;
}

export interface Subject {
  id: string;
  classId: number;
  name: string;
  nameBn?: string;
  code: string;
  icon?: string;
  color?: string;
}

export interface Chapter {
  id: string;
  classId: number;
  subjectId: string;
  chapterNo: number;
  title: string;
  titleBn?: string;
  description?: string;
}

export interface MaterialPage {
  pageNumber?: number;
  pageNo?: number;
  title?: string;
  content: string; // rich text or formatted markdown notes
  subheadings?: string[];
  keyFormulas?: string[];
  sampleQuestions?: {
    q: string;
    a: string;
    marks?: number;
  }[];
}

export interface StudyMaterial {
  id: string;
  classId: number;
  subjectId: string;
  chapterId?: string;
  title: string;
  titleBn?: string;
  category: MaterialCategory;
  format: 'pdf' | 'rich_notes' | 'worksheet' | 'notes';
  description?: string;
  totalPages?: number;
  pages?: MaterialPage[];
  fileUrl?: string; // base64 or blob if uploaded
  fileName?: string;
  fileSize?: string;
  uploadDate: string;
  author: string;
  isSampleContent?: boolean;
  viewCount: number;
  tags?: string[];
  year?: string;
  marks?: number;
}

export interface Notice {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  category:
    | 'announcement'
    | 'exam'
    | 'test'
    | 'holiday'
    | 'homework'
    | 'instruction'
    | 'general'
    | 'fees'
    | 'admission';
  targetClass: number | 'all';
  date: string;
  dueDate?: string;
  isPinned?: boolean;
  isImportant?: boolean;
  priority?: 'normal' | 'urgent';
}

export interface HomeworkItem {
  id: string;
  classId: number;
  subjectId: string;
  chapterId?: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  assignedDate: string;
  dueDate: string;
  attachedMaterialId?: string;
  submissionNote?: string;
  status?: 'pending' | 'completed';
  instructions?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName?: string;
  classId: number;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'leave' | 'late';
  remark?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName?: string;
  classId: number;
  month: string;
  year?: number;
  amount?: number;
  monthlyFee?: number;
  paidAmount: number;
  dueAmount?: number;
  status: 'paid' | 'unpaid' | 'partial' | 'pending';
  paymentDate?: string;
  receiptNumber?: string;
  receiptNo?: string;
  notes?: string;
}

export interface Exam {
  id: string;
  name: string;
  nameBn?: string;
  classId: number;
  subjectId: string;
  examType: ExamType;
  maxMarks?: number;
  totalMarks?: number;
  date: string;
  academicYear?: string;
}

export interface StudentMark {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  classId?: number;
  subjectId?: string;
  obtainedMarks: number;
  maxMarks?: number;
  totalMarks?: number;
  percentage?: number;
  grade: string;
  remarks?: string;
  feedback?: string;
}

export interface AppSettings {
  centreName: string;
  centreNameBn?: string;
  tagline: string;
  taglineBn?: string;
  teacherName: string;
  qualification: string;
  experience: string;
  subjectsTaught: string;
  classesTaught: string;
  contactNumber: string;
  contactPhone?: string;
  whatsappNumber: string;
  address: string;
  addressBn?: string;
  academicYear: string;
  theme?: Theme;
  language?: Language;
  philosophy?: string;
  messageToStudents?: string;
}

export type UserRole = 'guest' | 'student' | 'teacher' | 'admin';

export type Language = 'en' | 'bn';

export type Theme = 'light' | 'dark';

export type MaterialType =
  | 'notes'
  | 'book'
  | 'pdf'
  | 'question_paper'
  | 'worksheet'
  | 'suggestion'
  | 'study_material'
  | 'pyq'
  | 'other';

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
  studentId: string; // e.g. ETL-2026-1001
  name: string;
  classId: number; // 1 to 10
  section?: string;
  rollNumber: string | number;
  schoolName?: string;
  guardianName?: string;
  mobileNumber: string;
  email?: string;
  password?: string;
  joinDate?: string;
  admissionDate?: string;
  avatarUrl?: string;
}

export type QuestionType =
  | 'mcq'
  | 'true_false'
  | 'fill_blank'
  | 'short_answer'
  | 'match';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface QuestionOption {
  id: string;
  textBn: string;
  textEn?: string;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface Question {
  id: string;
  classId: number; // 1 to 10
  subjectId: string;
  chapter?: string;
  topic?: string;
  difficulty: QuestionDifficulty;
  questionType: QuestionType;
  questionBn: string;
  questionEn?: string;
  options?: QuestionOption[];
  correctAnswer?: string; // option id (e.g. 'A', 'B', 'C', 'D' or true/false or exact string)
  matchPairs?: MatchPair[];
  marks: number;
  explanationBn?: string;
  explanationEn?: string;
  imageUrl?: string;
  tags?: string[];
  createdAt?: string;
}

export type TestType = 'online' | 'offline' | 'both';

export interface AntiCheatingSettings {
  fullScreen: boolean;
  tabSwitchWarning: boolean;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  timerAutoSubmit: boolean;
  preventMultipleSubmissions?: boolean;
}

export interface MockTest {
  id: string;
  title: string;
  titleBn: string;
  classId: number; // 1 to 10
  subjectId: string;
  chapter?: string;
  description?: string;
  descriptionBn?: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number; // e.g. 30
  passMarks: number; // e.g. 12
  testType: TestType;
  startDate?: string;
  endDate?: string;
  isPractice?: boolean;
  isPublished?: boolean;
  questionIds: string[];
  questions?: Question[];
  antiCheating: AntiCheatingSettings;
  instructionsBn?: string[];
  instructionsEn?: string[];
  createdAt: string;
  attemptsCount?: number;
}

export interface QuestionAttemptReview {
  questionId: string;
  questionText: string;
  studentAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  marksAwarded: number;
  maxMarks: number;
  explanation?: string;
  options?: QuestionOption[];
  questionType: QuestionType;
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  studentId: string;
  studentName: string;
  classId: number;
  subjectId: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unanswered: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  isPassed: boolean;
  timeTakenSeconds: number;
  submittedAt: string;
  isOffline?: boolean;
  remarks?: string;
  studentAnswers: Record<string, string>; // questionId -> selected answer
  questionReviews?: QuestionAttemptReview[];
  rank?: number;
  certificateId?: string;
}

export interface OngoingTestAttempt {
  testId: string;
  studentId: string;
  answers: Record<string, string>;
  markedForReview: string[];
  currentQuestionIndex: number;
  timeRemainingSeconds: number;
  tabSwitchCount: number;
  startedAt: string;
  lastSavedAt: string;
}

export type NetworkSyncStatus = 'online' | 'offline' | 'syncing' | 'synced';

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
  chapter?: string;
  topic?: string;
  title: string;
  titleBn?: string;
  type?: MaterialType;
  category: MaterialCategory;
  format: 'pdf' | 'rich_notes' | 'worksheet' | 'notes' | 'image';
  description?: string;
  totalPages?: number;
  pages?: MaterialPage[];
  fileUrl?: string; // base64, blob or direct url for PDF/Image
  fileName?: string;
  fileSize?: string;
  storagePath?: string;
  coverImageUrl?: string;
  uploadDate: string;
  uploadedAt?: string;
  uploadedBy?: string;
  author: string;
  isPublished?: boolean;
  allowDownload?: boolean;
  isReadOnly?: boolean;
  visibleTo?: 'all' | 'class' | 'subject';
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
  subtitle: string;
  subtitleBn?: string;
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
  email?: string;
  website?: string;
  address: string;
  addressBn?: string;
  academicYear: string;
  theme?: Theme;
  language?: Language;
  philosophy?: string;
  messageToStudents?: string;
  rankingEnabled: boolean;
  certificateEnabled: boolean;
  offlineModeEnabled: boolean;
  defaultPassPercentage: number;
  examInstructionsBn: string[];
}

export interface TextBookChapter {
  chapterNo: number;
  title: string;
  titleBn: string;
  pageRange?: string;
  summary?: string;
  summaryBn?: string;
}

export interface TextBook {
  id: string;
  classId: number; // 1 to 10
  title: string;
  titleBn: string;
  subject: string;
  subjectBn: string;
  category: 'language' | 'science' | 'mathematics' | 'social_science' | 'supplementary' | 'general';
  board: 'WBBSE' | 'WBBPE';
  publisher: string;
  publisherBn: string;
  edition: string;
  academicYear: string;
  coverColor: string;
  description: string;
  descriptionBn: string;
  totalChapters: number;
  totalPages: number;
  officialPortalUrl?: string;
  chapters: TextBookChapter[];
  pages: MaterialPage[];
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
}

import {
  AppSettings,
  AttendanceRecord,
  Chapter,
  ClassLevel,
  Exam,
  FeeRecord,
  HomeworkItem,
  Notice,
  StudentMark,
  StudentProfile,
  StudyMaterial,
  Subject,
} from '../types';

export const INITIAL_SETTINGS: AppSettings = {
  centreName: 'EASY TO LEARN',
  centreNameBn: 'ইজি টু লার্ন (EASY TO LEARN)',
  tagline: 'Learn Easily, Learn Smartly',
  taglineBn: 'সহজে শিখুন, স্মার্টলি শিখুন',
  teacherName: 'Sabuj Sathi Sir',
  qualification: 'M.Sc (Mathematics), B.Ed (First Class)',
  experience: '9+ Years of Teaching Excellence in Board & School Curricula',
  subjectsTaught: 'Mathematics, Physical Science, Life Science, English & Computer',
  classesTaught: 'Class 1 to Class 10 (Specialized Batches for Madhyamik)',
  contactNumber: '+91 98765 43210',
  whatsappNumber: '+919876543210',
  address: '32/A Rabindra Sarani, College Road, Kolkata, West Bengal - 700029',
  addressBn: '৩২/এ রবীন্দ্র সরণি, কলেজ রোড, কলকাতা, পশ্চিমবঙ্গ - ৭০০০২৯',
  academicYear: '2026-2027',
  theme: 'light',
  language: 'en',
};

export const INITIAL_CLASSES: ClassLevel[] = [
  {
    id: 1,
    name: 'Class 1',
    nameBn: '১ম শ্রেণি',
    shortCode: 'C1',
    color: 'from-amber-500 to-orange-500',
    icon: 'Sparkles',
    description: 'Foundational literacy, basic arithmetic & nature exploration',
    descriptionBn: 'বর্ণমালা, সহজ যোগ-বিয়োগ ও চারপাশের পরিবেশ শিক্ষা',
  },
  {
    id: 2,
    name: 'Class 2',
    nameBn: '২য় শ্রেণি',
    shortCode: 'C2',
    color: 'from-yellow-500 to-amber-600',
    icon: 'BookOpen',
    description: 'Vocabulary building, tables, reading habits & storytelling',
    descriptionBn: 'শব্দার্থ, নামতা, পড়ার অভ্যাস ও সহজ গল্প',
  },
  {
    id: 3,
    name: 'Class 3',
    nameBn: '৩য় শ্রেণি',
    shortCode: 'C3',
    color: 'from-emerald-500 to-teal-600',
    icon: 'GraduationCap',
    description: 'Sentence formation, multiplication, division & science basics',
    descriptionBn: 'বাক্য গঠন, গুণ-ভাগ ও বিজ্ঞান ভাবনা',
  },
  {
    id: 4,
    name: 'Class 4',
    nameBn: '৪র্থ শ্রেণি',
    shortCode: 'C4',
    color: 'from-teal-500 to-cyan-600',
    icon: 'Compass',
    description: 'Grammar concepts, fractions, environmental studies & GK',
    descriptionBn: 'ব্যাকরণ, ভগ্নাংশ, আমাদের পরিবেশ ও সাধারণ জ্ঞান',
  },
  {
    id: 5,
    name: 'Class 5',
    nameBn: '৫ম শ্রেণি',
    shortCode: 'C5',
    color: 'from-blue-500 to-indigo-600',
    icon: 'Layers',
    description: 'Transition to upper primary, structured science & mathematics',
    descriptionBn: 'উচ্চ প্রাথমিক স্তরে প্রবেশ, সুসংহত বিজ্ঞান ও গণিত',
  },
  {
    id: 6,
    name: 'Class 6',
    nameBn: '৬ষ্ঠ শ্রেণি',
    shortCode: 'C6',
    color: 'from-indigo-500 to-violet-600',
    icon: 'Target',
    description: 'Algebra fundamentals, world geography & biological concepts',
    descriptionBn: 'বীজগণিতের প্রাথমিক ধারণা, ভূগোল ও জীবনবিজ্ঞান',
  },
  {
    id: 7,
    name: 'Class 7',
    nameBn: '৭ম শ্রেণি',
    shortCode: 'C7',
    color: 'from-purple-500 to-fuchsia-600',
    icon: 'Brain',
    description: 'Equations, physical measurements, Indian history & grammar mastery',
    descriptionBn: 'সরল সমীকরণ, ভৌত মাপজোখ, ইতিহাস ও ইংরেজি গ্রামার',
  },
  {
    id: 8,
    name: 'Class 8',
    nameBn: '৮ম শ্রেণি',
    shortCode: 'C8',
    color: 'from-rose-500 to-pink-600',
    icon: 'Lightbulb',
    description: 'Pre-board foundation, chemical formulas, geometry & literature',
    descriptionBn: 'মাধ্যমিকের ভিত্তিপ্রস্তর, রসায়ন, জ্যামিতি ও সাহিত্য',
  },
  {
    id: 9,
    name: 'Class 9',
    nameBn: '৯ম শ্রেণি',
    shortCode: 'C9',
    color: 'from-cyan-600 to-blue-700',
    icon: 'Award',
    description: 'Rigorous Secondary Syllabus, Newton laws, cell biology & proofs',
    descriptionBn: 'মাধ্যমিক পাঠক্রমের গভীর প্রস্তুতি, পদার্থবিজ্ঞান ও উপপাদ্য',
  },
  {
    id: 10,
    name: 'Class 10',
    nameBn: '১০ম শ্রেণি (Madhyamik / Board)',
    shortCode: 'C10',
    color: 'from-blue-600 to-emerald-600',
    icon: 'Trophy',
    description: 'Final Board Exam preparation, model tests, suggestions & mock papers',
    descriptionBn: 'মাধ্যমিক বোর্ড পরীক্ষার সম্পূর্ণ প্রস্তুতি, টেস্ট পেপার ও সাজেশন',
  },
];

// Helper to generate subjects per class level
export const INITIAL_SUBJECTS: Subject[] = [
  // Class 10 Subjects
  { id: 'sub-c10-math', classId: 10, name: 'Mathematics', nameBn: 'গণিত', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c10-psci', classId: 10, name: 'Physical Science', nameBn: 'ভৌতবিজ্ঞান', code: 'PSCI', icon: 'Atom', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'sub-c10-lsci', classId: 10, name: 'Life Science', nameBn: 'জীবনবিজ্ঞান', code: 'LSCI', icon: 'Dna', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'sub-c10-beng', classId: 10, name: 'Bengali', nameBn: 'বাংলা (প্রথম ভাষা)', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c10-eng', classId: 10, name: 'English', nameBn: 'ইংরেজি (Second Language)', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sub-c10-hist', classId: 10, name: 'History', nameBn: 'ইতিহাস', code: 'HIST', icon: 'Scroll', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'sub-c10-geog', classId: 10, name: 'Geography', nameBn: 'ভূগোল', code: 'GEOG', icon: 'Globe', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'sub-c10-comp', classId: 10, name: 'Computer / IT', nameBn: 'কম্পিউটার অ্যাপ্লিকেশন', code: 'COMP', icon: 'Laptop', color: 'bg-slate-50 text-slate-700 border-slate-200' },

  // Class 9 Subjects
  { id: 'sub-c9-math', classId: 9, name: 'Mathematics', nameBn: 'গণিত', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c9-psci', classId: 9, name: 'Physical Science', nameBn: 'ভৌতবিজ্ঞান', code: 'PSCI', icon: 'Atom', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'sub-c9-lsci', classId: 9, name: 'Life Science', nameBn: 'জীবনবিজ্ঞান', code: 'LSCI', icon: 'Dna', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'sub-c9-beng', classId: 9, name: 'Bengali', nameBn: 'বাংলা', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c9-eng', classId: 9, name: 'English', nameBn: 'ইংরেজি', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sub-c9-hist', classId: 9, name: 'History', nameBn: 'ইতিহাস', code: 'HIST', icon: 'Scroll', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'sub-c9-geog', classId: 9, name: 'Geography', nameBn: 'ভূগোল', code: 'GEOG', icon: 'Globe', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'sub-c9-comp', classId: 9, name: 'Computer', nameBn: 'কম্পিউটার', code: 'COMP', icon: 'Laptop', color: 'bg-slate-50 text-slate-700 border-slate-200' },

  // Class 8 Subjects
  { id: 'sub-c8-math', classId: 8, name: 'Mathematics', nameBn: 'গণিত', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c8-sci', classId: 8, name: 'Physical & Life Science', nameBn: 'পরিবেশ ও বিজ্ঞান', code: 'SCI', icon: 'Atom', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'sub-c8-beng', classId: 8, name: 'Bengali', nameBn: 'বাংলা সাহিত্যমেলা', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c8-eng', classId: 8, name: 'English', nameBn: 'ইংরেজি Blossoms', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sub-c8-hist', classId: 8, name: 'History', nameBn: 'ইতিহাস ও অতীত', code: 'HIST', icon: 'Scroll', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'sub-c8-geog', classId: 8, name: 'Geography', nameBn: 'ভূগোল ও আমাদের পৃথিবী', code: 'GEOG', icon: 'Globe', color: 'bg-teal-50 text-teal-700 border-teal-200' },

  // Class 7 Subjects
  { id: 'sub-c7-math', classId: 7, name: 'Mathematics', nameBn: 'গণিতপ্রভা', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c7-sci', classId: 7, name: 'Science', nameBn: 'পরিবেশ ও বিজ্ঞান', code: 'SCI', icon: 'Atom', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'sub-c7-beng', classId: 7, name: 'Bengali', nameBn: 'বাংলা', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c7-eng', classId: 7, name: 'English', nameBn: 'ইংরেজি', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sub-c7-hist', classId: 7, name: 'History', nameBn: 'ইতিহাস', code: 'HIST', icon: 'Scroll', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'sub-c7-geog', classId: 7, name: 'Geography', nameBn: 'ভূগোল', code: 'GEOG', icon: 'Globe', color: 'bg-teal-50 text-teal-700 border-teal-200' },

  // Class 6 Subjects
  { id: 'sub-c6-math', classId: 6, name: 'Mathematics', nameBn: 'গণিত', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c6-sci', classId: 6, name: 'Science', nameBn: 'বিজ্ঞান', code: 'SCI', icon: 'Atom', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'sub-c6-beng', classId: 6, name: 'Bengali', nameBn: 'বাংলা', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c6-eng', classId: 6, name: 'English', nameBn: 'ইংরেজি', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },

  // Class 5 Subjects
  { id: 'sub-c5-math', classId: 5, name: 'Mathematics', nameBn: 'আমার গণিত', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c5-evs', classId: 5, name: 'Environmental Studies', nameBn: 'আমাদের পরিবেশ', code: 'EVS', icon: 'Leaf', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'sub-c5-beng', classId: 5, name: 'Bengali', nameBn: 'পাতাবাহার (বাংলা)', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c5-eng', classId: 5, name: 'English', nameBn: 'Butterfly (English)', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },

  // Class 4 Subjects
  { id: 'sub-c4-math', classId: 4, name: 'Mathematics', nameBn: 'আমার গণিত', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c4-beng', classId: 4, name: 'Bengali', nameBn: 'পাতাবাহার', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c4-eng', classId: 4, name: 'English', nameBn: 'Butterfly', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sub-c4-evs', classId: 4, name: 'Environmental Studies', nameBn: 'আমাদের পরিবেশ', code: 'EVS', icon: 'Leaf', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },

  // Class 3 Subjects
  { id: 'sub-c3-math', classId: 3, name: 'Mathematics', nameBn: 'গণিত', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c3-beng', classId: 3, name: 'Bengali', nameBn: 'বাংলা', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c3-eng', classId: 3, name: 'English', nameBn: 'ইংরেজি', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sub-c3-evs', classId: 3, name: 'EVS & GK', nameBn: 'পরিবেশ ও সাধারণ জ্ঞান', code: 'EVS', icon: 'Compass', color: 'bg-teal-50 text-teal-700 border-teal-200' },

  // Class 2 Subjects
  { id: 'sub-c2-math', classId: 2, name: 'Mathematics', nameBn: 'সহজ গণিত ও নামতা', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c2-beng', classId: 2, name: 'Bengali', nameBn: 'সহজ পাঠ (বাংলা)', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c2-eng', classId: 2, name: 'English & Phonics', nameBn: 'ইংরেজি রিডিং', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },

  // Class 1 Subjects
  { id: 'sub-c1-beng', classId: 1, name: 'Bengali', nameBn: 'সহজ পাঠ ও বর্ণপরিচয়', code: 'BENG', icon: 'BookOpen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'sub-c1-math', classId: 1, name: 'Basic Math & Counting', nameBn: 'সংখ্যা ও গণনা', code: 'MATH', icon: 'Calculator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'sub-c1-eng', classId: 1, name: 'English Alphabet & Words', nameBn: 'ইংরেজি অক্ষর ও শব্দ', code: 'ENG', icon: 'Languages', color: 'bg-purple-50 text-purple-700 border-purple-200' },
];

export const INITIAL_CHAPTERS: Chapter[] = [
  // Class 10 Math
  { id: 'ch-c10-m-1', classId: 10, subjectId: 'sub-c10-math', chapterNo: 1, title: 'Quadratic Equations in One Variable', titleBn: 'একচল বিশিষ্ট দ্বিঘাত সমীকরণ' },
  { id: 'ch-c10-m-2', classId: 10, subjectId: 'sub-c10-math', chapterNo: 2, title: 'Simple Interest', titleBn: 'সরল সুদকষা' },
  { id: 'ch-c10-m-3', classId: 10, subjectId: 'sub-c10-math', chapterNo: 3, title: 'Theorems Related to Circle', titleBn: 'বৃত্ত সম্পর্কিত উপপাদ্য' },
  { id: 'ch-c10-m-4', classId: 10, subjectId: 'sub-c10-math', chapterNo: 4, title: 'Rectangular Parallelopiped / Cuboid', titleBn: 'আয়তঘন' },
  { id: 'ch-c10-m-5', classId: 10, subjectId: 'sub-c10-math', chapterNo: 5, title: 'Ratio and Proportion', titleBn: 'অনুপাত ও সমানুপাত' },
  { id: 'ch-c10-m-6', classId: 10, subjectId: 'sub-c10-math', chapterNo: 6, title: 'Compound Interest & Uniform Rate', titleBn: 'চক্রবৃদ্ধি সুদ ও সমহার বৃদ্ধি বা হ্রাস' },
  { id: 'ch-c10-m-7', classId: 10, subjectId: 'sub-c10-math', chapterNo: 7, title: 'Right Circular Cylinder & Cone', titleBn: 'লম্ব বৃত্তাকার চোঙ ও শঙ্কু' },
  { id: 'ch-c10-m-8', classId: 10, subjectId: 'sub-c10-math', chapterNo: 8, title: 'Trigonometric Ratios & Heights', titleBn: 'ত্রিকোণমিতিক অনুপাত ও উচ্চতা-দূরত্ব' },

  // Class 10 Physical Science
  { id: 'ch-c10-ps-1', classId: 10, subjectId: 'sub-c10-psci', chapterNo: 1, title: 'Concerns About Our Environment', titleBn: 'পরিবেশের জন্য ভাবনা' },
  { id: 'ch-c10-ps-2', classId: 10, subjectId: 'sub-c10-psci', chapterNo: 2, title: 'Behavior of Gases', titleBn: 'গ্যাসের আচরণ (বয়েল ও চার্লসের সূত্র)' },
  { id: 'ch-c10-ps-3', classId: 10, subjectId: 'sub-c10-psci', chapterNo: 3, title: 'Chemical Calculations', titleBn: 'রাসায়নিক গণনা' },
  { id: 'ch-c10-ps-4', classId: 10, subjectId: 'sub-c10-psci', chapterNo: 4, title: 'Light: Reflection & Refraction', titleBn: 'আলো: প্রতিফলন, প্রতিসরণ ও লেন্স' },
  { id: 'ch-c10-ps-5', classId: 10, subjectId: 'sub-c10-psci', chapterNo: 5, title: 'Current Electricity & Ohm’s Law', titleBn: 'চলতড়িৎ ও ওহমের সূত্র' },

  // Class 10 Life Science
  { id: 'ch-c10-ls-1', classId: 10, subjectId: 'sub-c10-lsci', chapterNo: 1, title: 'Control and Coordination in Living Organisms', titleBn: 'জীবজগতের নিয়ন্ত্রণ ও সমন্বয় (হরমোন ও স্নায়ুতন্ত্র)' },
  { id: 'ch-c10-ls-2', classId: 10, subjectId: 'sub-c10-lsci', chapterNo: 2, title: 'Continuity of Life & Cell Division', titleBn: 'জীবনের প্রবাহমানতা ও কোশ বিভাজন' },
  { id: 'ch-c10-ls-3', classId: 10, subjectId: 'sub-c10-lsci', chapterNo: 3, title: 'Heredity and Common Genetic Diseases', titleBn: 'বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ' },

  // Class 8 Math
  { id: 'ch-c8-m-1', classId: 8, subjectId: 'sub-c8-math', chapterNo: 1, title: 'Rational Numbers', titleBn: 'মূলদ সংখ্যার ধারণা' },
  { id: 'ch-c8-m-2', classId: 8, subjectId: 'sub-c8-math', chapterNo: 2, title: 'Pie Chart and Data Handling', titleBn: 'পাই-চিত্র ও তথ্য বিশ্লেষণ' },
  { id: 'ch-c8-m-3', classId: 8, subjectId: 'sub-c8-math', chapterNo: 3, title: 'Algebraic Product & Division', titleBn: 'বীজগাণিতিক সংখ্যামালার গুণ ও ভাগ' },
  { id: 'ch-c8-m-4', classId: 8, subjectId: 'sub-c8-math', chapterNo: 4, title: 'Properties of Parallel Lines & Angles', titleBn: 'সমান্তরাল সরলরেখা ও ছেদকের ধর্ম' },

  // Class 8 Science
  { id: 'ch-c8-s-1', classId: 8, subjectId: 'sub-c8-sci', chapterNo: 1, title: 'Force and Pressure', titleBn: 'বল ও চাপ' },
  { id: 'ch-c8-s-2', classId: 8, subjectId: 'sub-c8-sci', chapterNo: 2, title: 'Structure of Matter & Atom', titleBn: 'পদার্থের গঠন ও পরমাণু' },

  // Class 5 Math
  { id: 'ch-c5-m-1', classId: 5, subjectId: 'sub-c5-math', chapterNo: 1, title: 'Review of Numbers & Place Value', titleBn: 'স্থানীয় মান ও মৌলিক গণনা' },
  { id: 'ch-c5-m-2', classId: 5, subjectId: 'sub-c5-math', chapterNo: 2, title: 'Fractions & Simplification', titleBn: 'ভগ্নাংশ ও সরলীকরণ (BODMAS)' },

  // Class 1 Bengali
  { id: 'ch-c1-b-1', classId: 1, subjectId: 'sub-c1-beng', chapterNo: 1, title: 'Borno Parichoy: Swaroborno & Byanjanborno', titleBn: 'স্বরবর্ণ ও ব্যঞ্জনবর্ণ চেনা' },
  { id: 'ch-c1-b-2', classId: 1, subjectId: 'sub-c1-beng', chapterNo: 2, title: 'Sahaj Path Part 1: Choto Khoka', titleBn: 'ছোট খোকা বলে অ আ - প্রথম পাঠ' },
];

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-c10-m-1',
    classId: 10,
    subjectId: 'sub-c10-math',
    chapterId: 'ch-c10-m-1',
    title: 'Quadratic Equations: Complete Master Notes & Sreedhar Acharya Formula',
    titleBn: 'একচল বিশিষ্ট দ্বিঘাত সমীকরণ: শ্রীধর আচার্যের সূত্র ও সম্পূর্ণ নোটস',
    category: 'chapter_notes',
    format: 'rich_notes',
    description: 'Comprehensive step-by-step concepts, discriminant conditions (D > 0, D = 0, D < 0), formation of equations from roots, and solved textbook problems.',
    totalPages: 3,
    uploadDate: '2026-08-28',
    author: 'Sabuj Sathi Sir',
    isSampleContent: true,
    viewCount: 142,
    fileSize: '1.4 MB',
    tags: ['Class 10', 'Math', 'Madhyamik', 'Algebra'],
    pages: [
      {
        pageNumber: 1,
        title: 'Section 1: General Form & Core Definitions',
        content: `A quadratic equation in one variable x is an equation of the standard form:
ax² + bx + c = 0
where a, b, c are real numbers and a ≠ 0.

Key Points:
1. Degree of the variable x must be 2.
2. If a = 0, the equation reduces to bx + c = 0, which is a linear equation, not quadratic!
3. The values of x which satisfy the equation are called the 'roots' or 'solutions' (বীজ).
4. Every quadratic equation has exactly two roots (real or complex).

Example 1:
(x - 2)(x + 3) = 0 => x² + x - 6 = 0 (Quadratic)
Example 2:
x² - 9 = 0 => Pure quadratic equation with b = 0.`,
        keyFormulas: [
          'Standard Form: ax² + bx + c = 0 (a ≠ 0)',
          'Sreedhar Acharya’s Formula: x = [-b ± √(b² - 4ac)] / 2a',
          'Discriminant (নির্ণায়ক): D = b² - 4ac',
        ],
        sampleQuestions: [
          {
            q: 'If (a - 2)x² + 3x + 5 = 0 is a quadratic equation, find the condition for a.',
            a: 'For this equation to be quadratic, the coefficient of x² cannot be 0. Thus, a - 2 ≠ 0 => a ≠ 2. Answer: a ≠ 2.',
            marks: 2,
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Section 2: Nature of Roots & Discriminant Analysis',
        content: `The nature of the roots of ax² + bx + c = 0 depends completely on the Discriminant D = b² - 4ac:

Case 1: If b² - 4ac > 0
-> The roots are Real and Unequal (বাস্তব ও অসমান).
-> If b² - 4ac is a perfect square, the roots are rational (মূলদ); otherwise irrational surds.

Case 2: If b² - 4ac = 0
-> The roots are Real and Equal (বাস্তব ও সমান).
-> Each root is given by x = -b / 2a.

Case 3: If b² - 4ac < 0
-> No real roots exist (বীজদ্বয় অবাস্তব / কাল্পনিক).

Relation Between Roots and Coefficients:
Let α and β be the two roots of ax² + bx + c = 0.
1. Sum of roots (বীজদ্বয়ের সমষ্টি): α + β = -b / a
2. Product of roots (বীজদ্বয়ের গুণফল): α · β = c / a
3. Equation with given roots: x² - (α + β)x + αβ = 0`,
        keyFormulas: [
          'Sum of roots: α + β = -b/a',
          'Product of roots: αβ = c/a',
          'Equation: x² - (Sum)x + Product = 0',
        ],
        sampleQuestions: [
          {
            q: 'If the roots of 2x² - 8x + k = 0 are real and equal, find the value of k.',
            a: 'Here a = 2, b = -8, c = k. For real and equal roots, D = 0 => (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => 8k = 64 => k = 8.',
            marks: 3,
          },
        ],
      },
      {
        pageNumber: 3,
        title: 'Section 3: Important Board Exam Problems & Tricks',
        content: `Madhyamik Special Word Problems:
Problem Type 1: Age & Digit Problems
Rule: Always declare the unknown variable clearly. Check that the final answer is physically meaningful (e.g. speed, time or age cannot be negative).

Problem Type 2: Time & Work / Tap and Cistern
Rule: Compute the rate of work done per unit time (hour/minute).
If Tap A fills a cistern in x hours, in 1 hour it fills 1/x part.

Practice Checklist for Students:
- [x] Sreedhar Acharya derivation
- [x] Factorization method by splitting middle term
- [x] Solving word problems on speed, distance and time`,
        sampleQuestions: [
          {
            q: 'Solve: 1/(x - 3) - 1/(x + 5) = 1/6 (where x ≠ 3, -5)',
            a: 'Taking LCM: [(x + 5) - (x - 3)] / [(x - 3)(x + 5)] = 1/6 => 8 / (x² + 2x - 15) = 1/6 => x² + 2x - 15 = 48 => x² + 2x - 63 = 0 => (x + 9)(x - 7) = 0 => x = -9 or x = 7.',
            marks: 4,
          },
        ],
      },
    ],
  },
  {
    id: 'mat-c10-ps-1',
    classId: 10,
    subjectId: 'sub-c10-psci',
    chapterId: 'ch-c10-ps-2',
    title: 'Behavior of Gases: Boyle’s Law, Charles’s Law & Ideal Gas Equation (PDF Notes)',
    titleBn: 'গ্যাসের আচরণ: বয়েল ও চার্লসের সূত্র ও আদর্শ গ্যাস সমীকরণ (পিডিএফ নোটস)',
    category: 'pdf_notes',
    format: 'pdf',
    description: 'Detailed lecture notes with graphical representations (P vs V, PV vs P, V vs T in Kelvin), kinetic theory postulates, and numerical problems.',
    totalPages: 2,
    uploadDate: '2026-08-29',
    author: 'Sabuj Sathi Sir',
    isSampleContent: true,
    viewCount: 189,
    fileSize: '2.1 MB',
    tags: ['Class 10', 'Physical Science', 'Physics', 'Madhyamik'],
    pages: [
      {
        pageNumber: 1,
        title: 'Boyle’s Law & Charles’s Law Deep Dive',
        content: `1. Boyle’s Law (বয়েলের সূত্র):
Statement: At constant temperature (T = constant), the volume (V) of a given mass of gas is inversely proportional to its pressure (P).
Mathematical Form:
V ∝ 1/P  =>  P · V = constant (k)
If P1, V1 and P2, V2 are initial and final states:
P1 · V1 = P2 · V2

2. Charles’s Law (চার্লসের সূত্র):
Statement: At constant pressure (P = constant), the volume of a given mass of gas increases or decreases by 1/273 part of its volume at 0°C for each 1°C rise or fall in temperature.
Vt = V0(1 + t/273)
Concept of Absolute Zero (পরম শূন্য তাপমাত্রা):
At t = -273°C, Vt = V0[1 + (-273)/273] = 0.
Theoretically, volume becomes zero. Absolute temperature scale T = 273 + t(°C).
Revised Statement: V ∝ T (at constant P).
V1 / T1 = V2 / T2`,
        keyFormulas: [
          'P1·V1 = P2·V2 (T = constant)',
          'V1 / T1 = V2 / T2 (P = constant)',
          'Absolute Temperature: T (Kelvin) = t(°C) + 273',
        ],
      },
      {
        pageNumber: 2,
        title: 'Combined Gas Law & Ideal Gas Equation',
        content: `Combining Boyle’s and Charles’s Laws:
V ∝ T / P  =>  PV / T = constant
For initial and final states:
(P1 · V1) / T1 = (P2 · V2) / T2

Ideal Gas Equation (আদর্শ গ্যাস সমীকরণ):
For 1 mole of gas: PV = RT
For n moles of gas: PV = nRT = (w / M) · RT
where:
P = Pressure
V = Volume
n = number of moles = w / M
R = Universal Gas Constant = 8.314 J·mol⁻¹·K⁻¹ = 0.0821 L·atm·mol⁻¹·K⁻¹
T = Absolute Temperature in Kelvin

Avogadro’s Hypothesis:
Equal volumes of all gases under the same conditions of temperature and pressure contain equal number of molecules (N_A = 6.022 × 10²³).`,
        keyFormulas: [
          'Ideal Gas Equation: PV = nRT',
          'Molar Mass relation: M = (w·R·T) / (P·V)',
          'Density relation: d = PM / RT',
        ],
        sampleQuestions: [
          {
            q: 'At 27°C and 760 mmHg pressure, a gas occupies 300 ml. What will be its volume at 127°C at the same pressure?',
            a: 'Since pressure is constant, use Charles’s Law: V1/T1 = V2/T2. T1 = 27 + 273 = 300 K; T2 = 127 + 273 = 400 K. V2 = V1 * (T2 / T1) = 300 * (400 / 300) = 400 ml. Answer: 400 ml.',
            marks: 3,
          },
        ],
      },
    ],
  },
  {
    id: 'mat-c10-qp-1',
    classId: 10,
    subjectId: 'sub-c10-math',
    chapterId: 'ch-c10-m-1',
    title: 'Class 10 Madhyamik Model Question Paper 2026 (Full Marks: 90)',
    titleBn: '১০ম শ্রেণি মাধ্যমিক মডেল প্রশ্নপত্র ২০২৬ (পূর্ণমান: ৯০)',
    category: 'question_papers',
    format: 'pdf',
    description: 'Official test format paper covering Arithmetic, Algebra, Geometry, Mensuration & Trigonometry. Verified for self-assessment.',
    totalPages: 2,
    uploadDate: '2026-08-30',
    author: 'Sabuj Sathi Sir',
    isSampleContent: true,
    viewCount: 310,
    fileSize: '3.2 MB',
    tags: ['Model Paper', 'Board Exam', 'Math', 'Class 10'],
    pages: [
      {
        pageNumber: 1,
        title: 'Group A & Group B (Multiple Choice & Short Answer)',
        content: `EASY TO LEARN COACHING CENTRE
MADHYAMIK MOCK TEST - 2026
SUBJECT: MATHEMATICS | TIME: 3 HOURS 15 MINUTES | FULL MARKS: 90

GROUP - A (All questions are compulsory)
1. Choose the correct answer: (1 x 6 = 6)
(i) If a principal becomes double in 10 years at simple interest, the rate of interest per annum is:
(a) 5%  (b) 10%  (c) 15%  (d) 20%
(ii) If x ∝ y and y ∝ z, then:
(a) x ∝ z  (b) x ∝ 1/z  (c) x + y ∝ z  (d) none
(iii) The degree of the polynomial 5x³ - 2x² + 7 is:
(a) 1  (b) 2  (c) 3  (d) 0

2. Fill in the blanks: (1 x 5 = 5)
(i) Sreedhar Acharya’s formula can be applied only to ________ equations.
(ii) The ratio of the surface area of two spheres is 4:9, the ratio of their volumes is ________.
(iii) The value of sin²30° + cos²30° is ________.`,
        sampleQuestions: [
          {
            q: 'Group C - Algebra (Answer any two):',
            a: '(a) Solve: x/(x+1) + (x+1)/x = 2 1/12\n(b) If the roots of ax² + bx + c = 0 are in the ratio 1:r, prove that (r + 1)²ac = rb².',
            marks: 6,
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Group C & Group D (Geometry Theorems & Word Problems)',
        content: `GROUP - D (Geometry & Mensuration)
4. Prove that: (5 marks)
The tangent at any point of a circle is perpendicular to the radius through the point of contact.
OR
If two circles touch each other externally, prove that the point of contact lies on the straight line joining the centres of the circles.

5. Mensuration (Answer any two): (4 x 2 = 8)
(i) If the diameter of the base of a right circular cone is 21 cm and its slant height is 17.5 cm, calculate its volume and curved surface area.
(ii) A solid copper sphere of radius 6 cm is melted and drawn into a wire of uniform diameter 0.4 cm. Find the length of the wire in metres.

INSTRUCTIONS:
1. Show all rough calculations clearly on the right-hand margin.
2. Read all questions carefully before writing answers.`,
      },
    ],
  },
  {
    id: 'mat-c8-m-1',
    classId: 8,
    subjectId: 'sub-c8-math',
    chapterId: 'ch-c8-m-1',
    title: 'Rational Numbers: Properties, Number Line & Operations',
    titleBn: 'মূলদ সংখ্যা: বৈশিষ্ট্য, সংখ্যারেখায় স্থাপন ও নিয়মাবলী',
    category: 'chapter_notes',
    format: 'rich_notes',
    description: 'Introduction to rational numbers, closure, commutative, associative properties, and inserting rational numbers between two numbers.',
    totalPages: 2,
    uploadDate: '2026-08-25',
    author: 'Sabuj Sathi Sir',
    isSampleContent: true,
    viewCount: 98,
    fileSize: '1.2 MB',
    tags: ['Class 8', 'Math', 'Number System'],
    pages: [
      {
        pageNumber: 1,
        title: 'Definition & Core Properties',
        content: `What is a Rational Number?
A number that can be expressed in the form p/q, where p and q are integers and q ≠ 0, is called a rational number (মূলদ সংখ্যা).

Examples:
3/4, -7/5, 0 (since 0 = 0/1), 5 (since 5 = 5/1).
Note: Division by zero is undefined, so q cannot be 0.

Properties of Rational Numbers:
1. Closure Property:
Addition, subtraction, and multiplication of rational numbers always yield a rational number.
(Division is closed for all non-zero rational numbers).

2. Commutative Property:
a + b = b + a  and  a · b = b · a
(Subtraction and division are NOT commutative!)

3. Associative Property:
(a + b) + c = a + (b + c)
(a · b) · c = a · (b · c)`,
        keyFormulas: [
          'Form: p/q where p, q ∈ Z and q ≠ 0',
          'Additive Identity: 0',
          'Multiplicative Identity: 1',
          'Reciprocal of p/q: q/p (p ≠ 0)',
        ],
      },
      {
        pageNumber: 2,
        title: 'Finding Rational Numbers Between Two Numbers',
        content: `Method 1: Mean Method
To find a rational number between x and y:
Mean = (x + y) / 2

Method 2: Common Denominator Method
Find 5 rational numbers between 1/3 and 1/2:
1. Make denominators equal by LCM (LCM of 3 and 2 is 6):
1/3 = 2/6, 1/2 = 3/6
2. Multiply numerator and denominator by (5 + 1) = 6:
2/6 = 12/36
3/6 = 18/36
3. Required numbers: 13/36, 14/36, 15/36, 16/36, 17/36.

Practice Questions:
1. Find three rational numbers between -2 and 0.
2. Represent -5/8 on the number line.`,
      },
    ],
  },
  {
    id: 'mat-c8-hw-1',
    classId: 8,
    subjectId: 'sub-c8-math',
    chapterId: 'ch-c8-m-1',
    title: 'Homework Worksheet: Rational Numbers Operations (Due: Tomorrow)',
    titleBn: 'হোমওয়ার্ক ওয়ার্কশিট: মূলদ সংখ্যার গুণ ও ভাগ',
    category: 'homework',
    format: 'worksheet',
    description: 'Solve the 8 assigned problems in your tuition exercise book before the next class session.',
    totalPages: 1,
    uploadDate: '2026-09-02',
    author: 'Sabuj Sathi Sir',
    isSampleContent: true,
    viewCount: 65,
    fileSize: '850 KB',
    tags: ['Class 8', 'Homework', 'Worksheet'],
    pages: [
      {
        pageNumber: 1,
        title: 'Exercise Assignment - 1.2',
        content: `EASY TO LEARN HOME TUITION
HOMEWORK SHEET #04 | CLASS 8 MATHEMATICS
DUE DATE: Next Tuition Class

Instructions:
Write clean steps with proper signs. Do not skip intermediate steps.

Questions:
1. Evaluate using appropriate properties:
   (a) -2/3 × 3/5 + 5/2 - 3/5 × 1/6
   (b) 2/5 × (-3/7) - 1/6 × 3/2 + 1/14 × 2/5

2. Write the additive inverse of:
   (i) 2/8    (ii) -5/9    (iii) -6/-5

3. Verify that -(-x) = x for:
   (a) x = 11/15
   (b) x = -13/17

4. Find the multiplicative inverse of -13/19 and -1 × (-2/5).
5. The product of two rational numbers is -9/16. If one of the numbers is -4/3, find the other number.`,
      },
    ],
  },
  {
    id: 'mat-c5-m-1',
    classId: 5,
    subjectId: 'sub-c5-math',
    chapterId: 'ch-c5-m-1',
    title: 'Class 5 Mathematics: Place Value, Face Value & Roman Numerals',
    titleBn: '৫ম শ্রেণি গণিত: স্থানীয় মান, প্রকৃত মান ও রোমান সংখ্যা',
    category: 'chapter_notes',
    format: 'rich_notes',
    description: 'Clear illustrated guide with charts, tables and practice examples for Class 5 pupils.',
    totalPages: 1,
    uploadDate: '2026-08-20',
    author: 'Sabuj Sathi Sir',
    isSampleContent: true,
    viewCount: 84,
    fileSize: '950 KB',
    tags: ['Class 5', 'Math', 'Primary'],
    pages: [
      {
        pageNumber: 1,
        title: 'Number Concepts & Roman Numerals',
        content: `1. Place Value vs Face Value (স্থানীয় মান ও প্রকৃত মান):
Consider number: 7,42,519
Digit 4:
- Face value is simply 4.
- Place value is 4 × 10,000 = 40,000 (চল্লিশ হাজার).

2. Roman Numerals Key Chart:
I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.
Rules:
- A symbol cannot be repeated more than 3 times (e.g. XXX = 30, but 40 is XL, not XXXX).
- V, L, D are never subtracted or repeated.
- If smaller symbol is to left, subtract: IV = 5 - 1 = 4, IX = 10 - 1 = 9.

3. BODMAS Rule:
B = Bracket, O = Of (এর), D = Division (ভাগ), M = Multiplication (গুণ), A = Addition (যোগ), S = Subtraction (বিয়োগ).`,
      },
    ],
  },
  {
    id: 'mat-c10-sugg-1',
    classId: 10,
    subjectId: 'sub-c10-math',
    chapterId: 'ch-c10-m-3',
    title: 'Madhyamik 2026 Final Geometry Suggestions & Sure Theorems (5 Marks)',
    titleBn: 'মাধ্যমিক ২০২৬ জ্যামিতি ফাইনাল সাজেশন ও ১০০% কমন উপপাদ্য',
    category: 'suggestions',
    format: 'pdf',
    description: 'Curated list of 5 high-probability geometry theorems, riders, and constructions by Sabuj Sir.',
    totalPages: 1,
    uploadDate: '2026-08-31',
    author: 'Sabuj Sathi Sir',
    isSampleContent: true,
    viewCount: 420,
    fileSize: '1.1 MB',
    tags: ['Suggestions', 'Madhyamik', 'Geometry', 'Important'],
    pages: [
      {
        pageNumber: 1,
        title: 'Top 4 Golden Theorems for Madhyamik 2026',
        content: `EASY TO LEARN - MADHYAMIK GEOMETRY SUGGESTIONS 2026
Prepared by: Sabuj Sathi Sir

★ TOP PRIORITY THEOREMS (5 Marks):
1. Theorem 34: Any straight line passing through the centre of a circle to bisect a chord (which is not a diameter) is perpendicular to that chord.
2. Theorem 41: The angle subtended by an arc at the centre is double the angle subtended by it at any point on the remaining part of the circle.
3. Theorem 49 (Pythagoras Theorem): In any right-angled triangle, the area of the square drawn on the hypotenuse is equal to the sum of the areas of the squares drawn on the other two sides.
4. Theorem 48: If two circles touch each other externally, the point of contact lies on the line segment joining their centres.

★ RIDERS & APPLICATION (3 Marks):
- If ABCD is a cyclic quadrilateral and AB = AD, prove that AC bisects ∠BCD.
- In a right-angled triangle ABC, ∠B = 90° and BD ⊥ AC. Prove that BD² = AD · DC.`,
      },
    ],
  },
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Madhyamik 2026 Special Revision & Mock Test Schedule Announced',
    titleBn: 'মাধ্যমিক ২০২৬ স্পেশাল রিভিশন ও মক টেস্টের রুটিন প্রকাশিত',
    description: 'Special weekend marathon classes for Class 10 students starting this Sunday from 9:00 AM to 1:00 PM. Full syllabus mock tests with OMR sheets and step-by-step marking.',
    descriptionBn: 'আগামী রবিবার থেকে সকাল ৯টা থেকে দুপুর ১টা পর্যন্ত ১০ম শ্রেণির জন্য স্পেশাল রিভিশন ব্যাচ শুরু হচ্ছে। প্রতিটি বিষয়ের সম্পূর্ণ সিলেবাসে টেস্ট নেওয়া হবে।',
    category: 'exam',
    targetClass: 10,
    date: '2026-09-01',
    isPinned: true,
    priority: 'urgent',
  },
  {
    id: 'not-2',
    title: 'Monthly Parents-Teacher Meeting (PTM) for All Batches',
    titleBn: 'সকল ব্যাচের জন্য অভিভাবক-শিক্ষক মিটিং (PTM)',
    description: 'We will be conducting the monthly PTM this Saturday afternoon to discuss student attendance, monthly test performance, and individual progress reports.',
    descriptionBn: 'ছাত্র-ছাত্রীদের মাসিক উপস্থিতি, টেস্টের মূল্যায়ন এবং সার্বিক অগ্রগতি পর্যালোচনার জন্য আগামী শনিবার অভিভাবক মিটিং অনুষ্ঠিত হবে।',
    category: 'announcement',
    targetClass: 'all',
    date: '2026-08-30',
    isPinned: true,
    priority: 'normal',
  },
  {
    id: 'not-3',
    title: 'Durga Puja & Festive Vacation Notice',
    titleBn: 'শারদীয়া দুর্গোৎসব ও উৎসবের ছুটির বিজ্ঞপ্তি',
    description: 'Coaching centre will remain closed from Sasthi to Lakshmi Puja. Special festival homework sheets are uploaded in the study material section.',
    descriptionBn: 'মহাষষ্ঠী থেকে কোজাগরী লক্ষ্মীপূজা পর্যন্ত কোচিং বন্ধ থাকবে। উৎসবের বিশেষ স্টাডি মেটেরিয়াল পোর্টাল থেকে পড়ে প্রস্তুত থাকার নির্দেশ দেওয়া হচ্ছে।',
    category: 'holiday',
    targetClass: 'all',
    date: '2026-08-27',
    isPinned: false,
    priority: 'normal',
  },
  {
    id: 'not-4',
    title: 'Class 8 Science Project & Unit Test on Monday',
    titleBn: '৮ম শ্রেণির বিজ্ঞান প্রজেক্ট ও আগামী সোমবার ইউনিট টেস্ট',
    description: 'Class 8 students must submit their chart on Force & Pressure and be prepared for the 25-marks Unit Test on Monday afternoon.',
    descriptionBn: '৮ম শ্রেণির ছাত্র-ছাত্রীদের বল ও চাপ অধ্যায়ের উপর প্রজেক্ট খাতা জমা এবং ২৫ নম্বরের ইউনিট টেস্টের জন্য প্রস্তুত থাকতে বলা হচ্ছে।',
    category: 'test',
    targetClass: 8,
    date: '2026-08-29',
    isPinned: false,
    priority: 'urgent',
  },
];

export const INITIAL_HOMEWORK: HomeworkItem[] = [
  {
    id: 'hw-1',
    classId: 10,
    subjectId: 'sub-c10-math',
    chapterId: 'ch-c10-m-1',
    title: 'Quadratic Equation: Ex 1.2 Problems 4(i) to 4(xv)',
    titleBn: 'একচল বিশিষ্ট দ্বিঘাত সমীকরণ: অনুশীলনী ১.২ এর সমাধান',
    description: 'Complete all 15 sub-questions of Problem 4 using Sreedhar Acharya’s method. Mark any doubt with a pencil.',
    descriptionBn: 'অনুশীলনী ১.২ এর ৪ দাগের সবগুলি সমাধান শ্রীধর আচার্যের সূত্রে নিজের খাতায় সমাধান করে আনবে।',
    assignedDate: '2026-09-01',
    dueDate: '2026-09-05',
    attachedMaterialId: 'mat-c10-m-1',
    status: 'pending',
  },
  {
    id: 'hw-2',
    classId: 8,
    subjectId: 'sub-c8-math',
    chapterId: 'ch-c8-m-1',
    title: 'Rational Numbers: Word Problems Worksheet',
    titleBn: 'মূলদ সংখ্যা: অনুশীলনী ১.২ প্রশ্নাবলী',
    description: 'Solve the 5 questions listed in the Rational Numbers Homework Sheet and calculate reciprocals.',
    descriptionBn: 'হোমওয়ার্ক শিটে দেওয়া ৫টি প্রশ্ন সমাধান করে কোচিং খাতায় আনবে।',
    assignedDate: '2026-09-02',
    dueDate: '2026-09-04',
    attachedMaterialId: 'mat-c8-hw-1',
    status: 'pending',
  },
  {
    id: 'hw-3',
    classId: 10,
    subjectId: 'sub-c10-psci',
    chapterId: 'ch-c10-ps-2',
    title: 'Gas Laws Numerical Sheet: Charles & Boyle Mixed Numericals',
    titleBn: 'গ্যাসের আচরণ: বয়েল ও চার্লসের অঙ্কের শিট',
    description: 'Solve 6 numerical problems from Chapter 2 Notes Page 2.',
    descriptionBn: 'নোটসের ২য় পৃষ্ঠায় দেওয়া অঙ্কের সমস্যাগুলি সমাধান করতে হবে।',
    assignedDate: '2026-09-02',
    dueDate: '2026-09-06',
    attachedMaterialId: 'mat-c10-ps-1',
    status: 'pending',
  },
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std-1',
    studentId: 'STD-1001',
    name: 'Rahul Sharma',
    classId: 10,
    rollNumber: '01',
    mobileNumber: '9876543210',
    password: 'student123',
    joinDate: '2025-04-10',
    guardianName: 'Bikas Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'std-2',
    studentId: 'STD-8004',
    name: 'Ananya Sen',
    classId: 8,
    rollNumber: '04',
    mobileNumber: '9876543211',
    password: 'student123',
    joinDate: '2025-05-12',
    guardianName: 'Debabrata Sen',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'std-3',
    studentId: 'STD-7007',
    name: 'Sourav Das',
    classId: 7,
    rollNumber: '07',
    mobileNumber: '9876543212',
    password: 'student123',
    joinDate: '2025-06-01',
    guardianName: 'Subir Das',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'std-4',
    studentId: 'STD-5003',
    name: 'Priya Mukherjee',
    classId: 5,
    rollNumber: '03',
    mobileNumber: '9876543213',
    password: 'student123',
    joinDate: '2025-07-15',
    guardianName: 'Alok Mukherjee',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'std-5',
    studentId: 'STD-1002',
    name: 'Rohit Ghosh',
    classId: 10,
    rollNumber: '02',
    mobileNumber: '9876543214',
    password: 'student123',
    joinDate: '2025-04-12',
    guardianName: 'Sanjay Ghosh',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'STD-1001', studentName: 'Rahul Sharma', classId: 10, date: '2026-09-01', status: 'present' },
  { id: 'att-2', studentId: 'STD-1001', studentName: 'Rahul Sharma', classId: 10, date: '2026-08-30', status: 'present' },
  { id: 'att-3', studentId: 'STD-1001', studentName: 'Rahul Sharma', classId: 10, date: '2026-08-28', status: 'present' },
  { id: 'att-4', studentId: 'STD-1001', studentName: 'Rahul Sharma', classId: 10, date: '2026-08-25', status: 'absent', remark: 'Fever' },
  { id: 'att-5', studentId: 'STD-1001', studentName: 'Rahul Sharma', classId: 10, date: '2026-08-23', status: 'present' },
  { id: 'att-6', studentId: 'STD-1001', studentName: 'Rahul Sharma', classId: 10, date: '2026-08-20', status: 'present' },
  { id: 'att-7', studentId: 'STD-1001', studentName: 'Rahul Sharma', classId: 10, date: '2026-08-18', status: 'present' },
  { id: 'att-8', studentId: 'STD-8004', studentName: 'Ananya Sen', classId: 8, date: '2026-09-01', status: 'present' },
  { id: 'att-9', studentId: 'STD-8004', studentName: 'Ananya Sen', classId: 8, date: '2026-08-30', status: 'present' },
  { id: 'att-10', studentId: 'STD-8004', studentName: 'Ananya Sen', classId: 8, date: '2026-08-27', status: 'leave', remark: 'Family function' },
  { id: 'att-11', studentId: 'STD-7007', studentName: 'Sourav Das', classId: 7, date: '2026-09-01', status: 'present' },
  { id: 'att-12', studentId: 'STD-5003', studentName: 'Priya Mukherjee', classId: 5, date: '2026-09-01', status: 'present' },
];

export const INITIAL_FEES: FeeRecord[] = [
  {
    id: 'fee-1',
    studentId: 'STD-1001',
    studentName: 'Rahul Sharma',
    classId: 10,
    month: 'August',
    year: 2026,
    monthlyFee: 1200,
    paidAmount: 1200,
    dueAmount: 0,
    status: 'paid',
    paymentDate: '2026-08-05',
    receiptNumber: 'REC-2026-0811',
    notes: 'Paid via UPI',
  },
  {
    id: 'fee-2',
    studentId: 'STD-1001',
    studentName: 'Rahul Sharma',
    classId: 10,
    month: 'September',
    year: 2026,
    monthlyFee: 1200,
    paidAmount: 1200,
    dueAmount: 0,
    status: 'paid',
    paymentDate: '2026-09-02',
    receiptNumber: 'REC-2026-0902',
    notes: 'Cash payment received',
  },
  {
    id: 'fee-3',
    studentId: 'STD-8004',
    studentName: 'Ananya Sen',
    classId: 8,
    month: 'September',
    year: 2026,
    monthlyFee: 900,
    paidAmount: 900,
    dueAmount: 0,
    status: 'paid',
    paymentDate: '2026-09-01',
    receiptNumber: 'REC-2026-0901',
    notes: 'Google Pay',
  },
  {
    id: 'fee-4',
    studentId: 'STD-7007',
    studentName: 'Sourav Das',
    classId: 7,
    month: 'September',
    year: 2026,
    monthlyFee: 800,
    paidAmount: 0,
    dueAmount: 800,
    status: 'unpaid',
    notes: 'Due by 10th September',
  },
  {
    id: 'fee-5',
    studentId: 'STD-5003',
    studentName: 'Priya Mukherjee',
    classId: 5,
    month: 'September',
    year: 2026,
    monthlyFee: 700,
    paidAmount: 700,
    dueAmount: 0,
    status: 'paid',
    paymentDate: '2026-09-01',
    receiptNumber: 'REC-2026-0905',
  },
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'ex-1',
    name: 'Class 10 Monthly Math Assessment Test',
    nameBn: '১০ম শ্রেণি মাসিক গণিত মূল্যায়ন পরীক্ষা',
    classId: 10,
    subjectId: 'sub-c10-math',
    examType: 'class_test',
    maxMarks: 50,
    date: '2026-08-25',
    academicYear: '2026-2027',
  },
  {
    id: 'ex-2',
    name: 'Class 10 Pre-Test Physical Science Exam',
    nameBn: '১০ম শ্রেণি ভৌতবিজ্ঞান প্রাক-নির্বাচনী পরীক্ষা',
    classId: 10,
    subjectId: 'sub-c10-psci',
    examType: 'unit_test',
    maxMarks: 40,
    date: '2026-08-20',
    academicYear: '2026-2027',
  },
  {
    id: 'ex-3',
    name: 'Class 8 Unit Test - 2 (Mathematics)',
    nameBn: '৮ম শ্রেণি ২য় পর্যায়ক্রমিক মূল্যায়ন (গণিত)',
    classId: 8,
    subjectId: 'sub-c8-math',
    examType: 'unit_test',
    maxMarks: 25,
    date: '2026-08-22',
    academicYear: '2026-2027',
  },
];

export const INITIAL_MARKS: StudentMark[] = [
  {
    id: 'mrk-1',
    examId: 'ex-1',
    studentId: 'STD-1001',
    studentName: 'Rahul Sharma',
    classId: 10,
    subjectId: 'sub-c10-math',
    obtainedMarks: 46,
    maxMarks: 50,
    percentage: 92,
    grade: 'AA (Outstanding)',
    remarks: 'Excellent clarity on Sreedhar Acharya method! Keep maintaining speed.',
  },
  {
    id: 'mrk-2',
    examId: 'ex-2',
    studentId: 'STD-1001',
    studentName: 'Rahul Sharma',
    classId: 10,
    subjectId: 'sub-c10-psci',
    obtainedMarks: 36,
    maxMarks: 40,
    percentage: 90,
    grade: 'A+ (Excellent)',
    remarks: 'Very neat graph sketches. Revise gas density formulas once.',
  },
  {
    id: 'mrk-3',
    examId: 'ex-3',
    studentId: 'STD-8004',
    studentName: 'Ananya Sen',
    classId: 8,
    subjectId: 'sub-c8-math',
    obtainedMarks: 24,
    maxMarks: 25,
    percentage: 96,
    grade: 'AA (Outstanding)',
    remarks: 'Superb score! Top mark in the batch.',
  },
];

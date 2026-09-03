import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  FileText,
  GraduationCap,
  Layers,
  Lock,
  LogOut,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentPortal: React.FC = () => {
  const {
    currentUser,
    logout,
    studyMaterials,
    homeworkList,
    notices,
    attendance,
    fees,
    marks,
    exams,
    subjects,
    openDocumentViewer,
    setCurrentView,
    language,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'materials' | 'homework' | 'notices' | 'attendance' | 'results' | 'fees'
  >('materials');

  const student = currentUser.student;

  if (!student) {
    return (
      <div className="py-16 text-center max-w-md mx-auto px-4 space-y-4">
        <GraduationCap className="w-16 h-16 mx-auto text-blue-500 opacity-60" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Login Required</h2>
        <p className="text-xs text-slate-500">
          Please log in using your Student ID or select one of our demo accounts from the login
          modal.
        </p>
      </div>
    );
  }

  // Student specific data
  const studentMaterials = useMemo(
    () => studyMaterials.filter((m) => m.classId === student.classId),
    [studyMaterials, student.classId]
  );

  const studentHomework = useMemo(
    () => homeworkList.filter((h) => h.classId === student.classId),
    [homeworkList, student.classId]
  );

  const studentNotices = useMemo(
    () =>
      notices.filter((n) => n.targetClass === 'all' || n.targetClass === student.classId),
    [notices, student.classId]
  );

  const studentAttendance = useMemo(
    () => attendance.filter((a) => a.studentId === student.id),
    [attendance, student.id]
  );

  const studentFees = useMemo(
    () => fees.filter((f) => f.studentId === student.id),
    [fees, student.id]
  );

  const studentMarks = useMemo(
    () => marks.filter((m) => m.studentId === student.id),
    [marks, student.id]
  );

  // Attendance metrics
  const totalDays = studentAttendance.length;
  const presentDays = studentAttendance.filter((a) => a.status === 'present').length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Student Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {student.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Active Student
                </span>
                <span className="text-xs font-mono text-slate-400">ID: {student.studentId}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Class {student.classId} • Roll #{student.rollNumber} • Guardian: {student.guardianName}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900 transition flex items-center gap-1.5 self-center sm:self-start"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
              {studentMaterials.length}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Class Notes
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
              {studentHomework.length}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Homework
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {attendanceRate}%
            </div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Attendance
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
              {studentMarks.length}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Evaluations
            </div>
          </div>
        </div>
      </div>

      {/* Desk Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
        {[
          { id: 'materials', label: 'My Class Study Notes', icon: BookOpen, count: studentMaterials.length },
          { id: 'homework', label: 'Assigned Homework', icon: FileCheck, count: studentHomework.length },
          { id: 'notices', label: 'Class Notices', icon: Calendar, count: studentNotices.length },
          { id: 'attendance', label: 'Attendance Record', icon: UserCheck, count: totalDays },
          { id: 'results', label: 'Exam Results & Marks', icon: Award, count: studentMarks.length },
          { id: 'fees', label: 'Fee Invoices', icon: DollarSign, count: studentFees.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {/* 1. Study Materials */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Syllabus Study Materials for Class {student.classId}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {studentMaterials.length} Documents Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentMaterials.map((mat) => {
              const sub = subjects.find((s) => s.id === mat.subjectId);
              return (
                <div
                  key={mat.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                        {sub?.name || 'Subject'}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {mat.category.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                      {language === 'bn' && mat.titleBn ? mat.titleBn : mat.title}
                    </h4>

                    {mat.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {mat.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {mat.totalPages || 1} Pages • Read Only
                    </span>
                    <button
                      onClick={() => openDocumentViewer(mat)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Open Notes</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Homework */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Assigned Tasks & Homework
            </h3>
          </div>

          <div className="space-y-3">
            {studentHomework.map((hw) => {
              const sub = subjects.find((s) => s.id === hw.subjectId);
              return (
                <div
                  key={hw.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {sub?.name || 'Subject'}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                      Due: {hw.dueDate}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {language === 'bn' && hw.titleBn ? hw.titleBn : hw.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {hw.description}
                  </p>
                  {hw.instructions && (
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      Note: {hw.instructions}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-3">
          {studentNotices.map((n) => (
            <div
              key={n.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {n.category}
                </span>
                <span className="text-xs text-slate-400">{n.date}</span>
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'bn' && n.titleBn ? n.titleBn : n.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {language === 'bn' && n.descriptionBn ? n.descriptionBn : n.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 4. Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Daily Attendance History
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
              {presentDays} of {totalDays} Sessions Attended ({attendanceRate}%)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3">Session Date</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {studentAttendance.map((rec) => (
                  <tr key={rec.id}>
                    <td className="p-3 font-mono font-medium text-slate-800 dark:text-slate-200">
                      {rec.date}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      Class {rec.classId}
                    </td>
                    <td className="p-3">
                      {rec.status === 'present' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Present
                        </span>
                      ) : rec.status === 'late' ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                          <Clock className="w-3.5 h-3.5" /> Late
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Absent
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">
                      {rec.remark || 'Regular Batch Session'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Exam Results */}
      {activeTab === 'results' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Term Evaluations & Test Scores
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {studentMarks.map((mark) => {
              const exam = exams.find((e) => e.id === mark.examId);
              const percentage = Math.round((mark.obtainedMarks / mark.totalMarks) * 100);

              return (
                <div
                  key={mark.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {exam?.name || 'Class Evaluation'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Grade {mark.grade || 'A'}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {mark.obtainedMarks}{' '}
                      <span className="text-xs font-normal text-slate-400">/ {mark.totalMarks}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {percentage}%
                    </span>
                  </div>

                  {mark.feedback && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
                      "{mark.feedback}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Fees */}
      {activeTab === 'fees' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Tuition Fee Payment History
            </h3>
          </div>

          <div className="space-y-3">
            {studentFees.map((fee) => (
              <div
                key={fee.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {fee.month}
                  </div>
                  <div className="text-xs text-slate-400">
                    Paid on {fee.paymentDate || 'N/A'} • Receipt #{fee.receiptNo || 'REC-100'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-base text-slate-900 dark:text-white">
                    ₹{fee.paidAmount}
                  </div>
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                    {fee.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

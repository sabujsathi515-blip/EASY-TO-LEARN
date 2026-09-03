import React, { useState } from 'react';
import { KeyRound, Lock, ShieldCheck, UserCheck, Users, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginModal: React.FC = () => {
  const {
    isLoginOpen,
    setIsLoginOpen,
    loginAsAdmin,
    loginAsStudent,
    loginQuickStudent,
    students,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');

  // Student credentials
  const [studentId, setStudentId] = useState('');
  const [studentPass, setStudentPass] = useState('');

  // Admin credentials
  const [adminPass, setAdminPass] = useState('');

  if (!isLoginOpen) return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsStudent(studentId, studentPass);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin(adminPass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              E2L
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Portal Authentication
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                EASY TO LEARN Education Management
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-slate-800 m-4 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('student')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition ${
              activeTab === 'student'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Login</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition ${
              activeTab === 'admin'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Teacher / Admin</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-4 sm:p-6 pt-0">
          {activeTab === 'student' ? (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student ID or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STD-1001 or 9876543210"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Student Password"
                  value={studentPass}
                  onChange={(e) => setStudentPass(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition"
              >
                Sign In to Student Desk
              </button>

              {/* 1-Click Demo Accounts */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  1-Click Quick Demo Student Sign In:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {students.slice(0, 4).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => loginQuickStudent(s)}
                      className="text-left p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950 transition"
                    >
                      <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">
                        {s.name}
                      </div>
                      <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                        Class {s.classId} • Roll {s.rollNumber}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Admin dashboard allows full management of materials, classes, subjects, fees,
                  attendance, and notices.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  disabled
                  value="admin (Teacher: Sabuj Sathi Sir)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Master Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Enter Admin Password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Demo Master Password: <strong>admin123</strong></span>
                  <button
                    type="button"
                    onClick={() => setAdminPass('admin123')}
                    className="text-blue-600 dark:text-blue-400 font-semibold underline"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                Access Teacher Admin Dashboard
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

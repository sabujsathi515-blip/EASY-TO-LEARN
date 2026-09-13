import React, { useState } from 'react';
import { UserPlus, X, School, User, Phone, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';

interface Props {
  onClose: () => void;
}

export const StudentRegisterModal: React.FC<Props> = ({ onClose }) => {
  const { registerStudent, classes } = useApp();

  const [name, setName] = useState('');
  const [classId, setClassId] = useState(10);
  const [section, setSection] = useState('A');
  const [rollNumber, setRollNumber] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rollNumber.trim() || !mobileNumber.trim()) {
      return;
    }

    registerStudent({
      name,
      classId,
      section,
      rollNumber,
      schoolName,
      guardianName,
      mobileNumber,
      email,
      password,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 my-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" showText={false} />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                শিক্ষার্থী নিবন্ধন (Student Registration)
              </h3>
              <p className="text-xs text-slate-500">EASY TO LEARN Mock Test Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
              শিক্ষার্থীর পুরো নাম (Student Full Name) *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: অনির্বাণ চক্রবর্তী"
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                শ্রেণি (Class) *
              </label>
              <select
                value={classId}
                onChange={(e) => setClassId(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                রোল নম্বর (Roll No) *
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="যেমন: 12"
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
              বিদ্যালয়ের নাম (School Name)
            </label>
            <div className="relative">
              <School className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="যেমন: বারাসাত প্যারিচরণ সরকার গভর্নমেন্ট হাই স্কুল"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                অভিভাবকের নাম (Guardian)
              </label>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="অভিভাবকের নাম"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                মোবাইল নম্বর (Mobile) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="9876543210"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                ইমেইল (ঐচ্ছিক)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>নিবন্ধনের সাথে সাথে একটি অনন্য স্টুডেন্ট আইডি (ID) তৈরি হবে।</span>
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
            >
              নিবন্ধন সম্পন্ন করুন (Register)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

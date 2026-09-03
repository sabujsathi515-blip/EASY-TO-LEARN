import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  Bell,
  Calendar,
  Clock,
  GraduationCap,
  Megaphone,
  Pin,
  Plus,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Notice } from '../../types';

export const NoticeBoardSection: React.FC = () => {
  const { notices, addNotice, deleteNotice, currentUser, language, t } = useApp();

  const [filterClass, setFilterClass] = useState<number | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New notice form state
  const [newTitle, setNewTitle] = useState('');
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDescBn, setNewDescBn] = useState('');
  const [newTargetClass, setNewTargetClass] = useState<number | 'all'>('all');
  const [newCategory, setNewCategory] = useState<Notice['category']>('general');
  const [newImportant, setNewImportant] = useState(false);

  const filteredNotices = useMemo(() => {
    return notices
      .filter((n) => {
        if (filterClass === 'all') return true;
        if (n.targetClass === 'all') return true;
        return n.targetClass === filterClass;
      })
      .sort((a, b) => {
        if (a.isImportant && !b.isImportant) return -1;
        if (!a.isImportant && b.isImportant) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [notices, filterClass]);

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    addNotice({
      title: newTitle,
      titleBn: newTitleBn || undefined,
      description: newDesc,
      descriptionBn: newDescBn || undefined,
      targetClass: newTargetClass,
      category: newCategory,
      isImportant: newImportant,
    });

    setNewTitle('');
    setNewTitleBn('');
    setNewDesc('');
    setNewDescBn('');
    setShowAddForm(false);
  };

  const getCategoryBadge = (cat: Notice['category']) => {
    switch (cat) {
      case 'exam':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'holiday':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'fees':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      case 'admission':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
      case 'general':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
    }
  };

  const getCategoryCardBorder = (notice: Notice) => {
    if (notice.isImportant || notice.category === 'exam') {
      return 'border-l-4 border-amber-400 bg-amber-50/30 dark:bg-amber-950/20';
    }
    if (notice.category === 'holiday') {
      return 'border-l-4 border-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20';
    }
    if (notice.category === 'admission') {
      return 'border-l-4 border-purple-400 bg-purple-50/30 dark:bg-purple-950/20';
    }
    return 'border-l-4 border-slate-400 bg-white dark:bg-slate-900';
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 mb-2">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Digital Bulletin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.notices}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exam dates, holiday calendar, schedule adjustments, and tuition alerts.
          </p>
        </div>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Notice</span>
          </button>
        )}
      </div>

      {/* Admin Post Notice Form */}
      {showAddForm && currentUser.role === 'admin' && (
        <form
          onSubmit={handleCreateNotice}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-blue-500/50 shadow-lg space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-blue-600" />
              <span>Create Announcement</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Notice Title (English) *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Unit Test Exam Schedule Announced"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Notice Title (Bengali - Optional)
              </label>
              <input
                type="text"
                value={newTitleBn}
                onChange={(e) => setNewTitleBn(e.target.value)}
                placeholder="যেমন: ইউনিট টেস্ট পরীক্ষার সময়সূচি প্রকাশিত"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              >
                <option value="general">General Notification</option>
                <option value="exam">Exam Routine / Test</option>
                <option value="holiday">Holiday Announcement</option>
                <option value="fees">Tuition Fee Reminder</option>
                <option value="admission">New Batch Admission</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Class
              </label>
              <select
                value={newTargetClass}
                onChange={(e) =>
                  setNewTargetClass(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              >
                <option value="all">All Classes (1 to 10)</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls} Only
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newImportant}
                  onChange={(e) => setNewImportant(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  Mark as High Priority (Pin to Top)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Notice Details (English) *
            </label>
            <textarea
              required
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Write full announcement details..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Notice Details (Bengali - Optional)
            </label>
            <textarea
              rows={2}
              value={newDescBn}
              onChange={(e) => setNewDescBn(e.target.value)}
              placeholder="বাংলায় বিবরণ..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
            >
              Publish Notice Now
            </button>
          </div>
        </form>
      )}

      {/* Class Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold shrink-0 mr-1">Filter:</span>
        <button
          onClick={() => setFilterClass('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
            filterClass === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Notices
        </button>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((cls) => (
          <button
            key={cls}
            onClick={() => setFilterClass(cls)}
            className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
              filterClass === cls
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Class {cls}
          </button>
        ))}
      </div>

      {/* Notice Cards */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-40 text-indigo-500" />
            <p className="text-sm font-semibold">No notices found for this class.</p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`p-5 rounded-2xl border transition-all shadow-xs relative ${getCategoryCardBorder(
                notice
              )}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {notice.isImportant && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                        <Pin className="w-3 h-3" />
                        URGENT / PINNED
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${getCategoryBadge(
                        notice.category
                      )}`}
                    >
                      {notice.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {notice.targetClass === 'all' ? 'All Classes' : `Class ${notice.targetClass}`}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {language === 'bn' && notice.titleBn ? notice.titleBn : notice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {language === 'bn' && notice.descriptionBn
                      ? notice.descriptionBn
                      : notice.description}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{notice.date}</span>
                  </div>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => deleteNotice(notice.id)}
                      title="Delete Notice"
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

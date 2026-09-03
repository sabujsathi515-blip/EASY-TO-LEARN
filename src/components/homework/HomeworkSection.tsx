import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  Filter,
  Plus,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HomeworkItem } from '../../types';

export const HomeworkSection: React.FC = () => {
  const {
    homeworkList,
    addHomework,
    deleteHomework,
    subjects,
    selectedClassId,
    setSelectedClassId,
    currentUser,
    language,
    t,
  } = useApp();

  const [filterClass, setFilterClass] = useState<number | 'all'>(selectedClassId || 10);
  const [showAddModal, setShowAddModal] = useState(false);

  // New homework state
  const [hwClassId, setHwClassId] = useState<number>(10);
  const [hwSubjectId, setHwSubjectId] = useState<string>('sub-c10-math');
  const [hwTitle, setHwTitle] = useState('');
  const [hwTitleBn, setHwTitleBn] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDueDate, setHwDueDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [hwInstructions, setHwInstructions] = useState('');

  const classSubjects = useMemo(() => {
    return subjects.filter((s) => s.classId === hwClassId);
  }, [subjects, hwClassId]);

  const filteredList = useMemo(() => {
    return homeworkList
      .filter((h) => (filterClass === 'all' ? true : h.classId === filterClass))
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [homeworkList, filterClass]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim() || !hwDesc.trim()) return;

    addHomework({
      classId: hwClassId,
      subjectId: hwSubjectId,
      title: hwTitle,
      titleBn: hwTitleBn || undefined,
      description: hwDesc,
      dueDate: hwDueDate,
      instructions: hwInstructions || undefined,
    });

    setHwTitle('');
    setHwTitleBn('');
    setHwDesc('');
    setHwInstructions('');
    setShowAddModal(false);
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 mb-2">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Academic Tasks & Submissions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.homework}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review assigned chapter exercises, practice worksheets, and submission deadlines.
          </p>
        </div>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => setShowAddModal((v) => !v)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Assign New Task</span>
          </button>
        )}
      </div>

      {/* Admin Assign Modal/Form */}
      {showAddModal && currentUser.role === 'admin' && (
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-purple-500/50 shadow-lg space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-purple-600" />
              <span>Assign Homework to Students</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Class *
              </label>
              <select
                value={hwClassId}
                onChange={(e) => {
                  const c = Number(e.target.value);
                  setHwClassId(c);
                  const firstSub = subjects.find((s) => s.classId === c);
                  if (firstSub) setHwSubjectId(firstSub.id);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subject *
              </label>
              <select
                value={hwSubjectId}
                onChange={(e) => setHwSubjectId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              >
                {classSubjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                required
                value={hwDueDate}
                onChange={(e) => setHwDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Homework Title (English) *
              </label>
              <input
                type="text"
                required
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                placeholder="e.g. Exercise 1.2 Problems 1 to 10"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Title (Bengali - Optional)
              </label>
              <input
                type="text"
                value={hwTitleBn}
                onChange={(e) => setHwTitleBn(e.target.value)}
                placeholder="যেমন: অনুশীলনী ১.২ এর ১ থেকে ১০ দাগের অঙ্ক"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Task Details / Questions *
            </label>
            <textarea
              required
              rows={3}
              value={hwDesc}
              onChange={(e) => setHwDesc(e.target.value)}
              placeholder="List specific question numbers, page numbers or tasks..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Instructions for Students (Optional)
            </label>
            <input
              type="text"
              value={hwInstructions}
              onChange={(e) => setHwInstructions(e.target.value)}
              placeholder="e.g. Solve in homework notebook. Will be checked next Tuesday."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white shadow-sm"
            >
              Assign Homework
            </button>
          </div>
        </form>
      )}

      {/* Filter by class */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold shrink-0 mr-1">Select Class:</span>
        <button
          onClick={() => setFilterClass('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
            filterClass === 'all'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Classes
        </button>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((cls) => (
          <button
            key={cls}
            onClick={() => setFilterClass(cls)}
            className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
              filterClass === cls
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Class {cls}
          </button>
        ))}
      </div>

      {/* Homework Cards */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <FileCheck className="w-10 h-10 mx-auto mb-2 opacity-40 text-purple-500" />
            <p className="text-sm font-semibold">No homework assigned for this class currently.</p>
          </div>
        ) : (
          filteredList.map((hw) => {
            const subject = subjects.find((s) => s.id === hw.subjectId);

            return (
              <div
                key={hw.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      Class {hw.classId}
                    </span>
                    {subject && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {language === 'bn' && subject.nameBn ? subject.nameBn : subject.name}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">Assigned: {hw.assignedDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200 dark:border-amber-900 self-start sm:self-auto">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Due Date: {hw.dueDate}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {language === 'bn' && hw.titleBn ? hw.titleBn : hw.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line leading-relaxed">
                    {hw.description}
                  </p>
                </div>

                {hw.instructions && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Teacher's Instruction:</strong> {hw.instructions}
                    </span>
                  </div>
                )}

                {currentUser.role === 'admin' && (
                  <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => deleteHomework(hw.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Task</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

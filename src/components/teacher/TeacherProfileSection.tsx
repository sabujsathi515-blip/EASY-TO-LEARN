import React from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherProfileSection: React.FC = () => {
  const { settings, setCurrentView, language, t } = useApp();

  const handleWhatsApp = () => {
    const cleanNumber = (settings.whatsappNumber || '919876543210').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      'Hello Sabuj Sathi Sir, I want information about EASY TO LEARN tuition classes.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner Card */}
      <div className="bg-indigo-900 border border-indigo-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 relative z-10 text-center md:text-left">
          {/* Avatar Box */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white/10 border-2 border-white/20 p-2 shadow-xl flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-xl bg-linear-to-tr from-amber-400 to-amber-300 flex items-center justify-center text-slate-950 font-black text-3xl sm:text-4xl shadow-inner">
              SS
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Founder & Lead Faculty</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
              <span>{settings.teacherName}</span>
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </h1>

            <p className="text-sm sm:text-base text-indigo-100 font-medium">
              {settings.qualification}
            </p>

            <p className="text-xs sm:text-sm text-indigo-200/90 flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-amber-300" />
                {settings.experience}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                {settings.centreName}
              </span>
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={handleWhatsApp}
                className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </button>
              <a
                href={`tel:${settings.contactPhone || settings.contactNumber}`}
                className="px-5 py-2.5 rounded-xl bg-indigo-800 hover:bg-indigo-700 border border-indigo-700 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Philosophy & Message to Parents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Philosophy Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Teaching Philosophy (শিক্ষাদর্শ)
            </h3>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
            "{settings.philosophy || 'Concept-first learning with personal attention for every student.'}"
          </p>

          <div className="pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
              Key Specializations:
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Concept-Clear Mathematics',
                'Diagrammatic Physical Science',
                'Step-by-Step Problem Solving',
                'Board Exam Pattern Prep',
                'Personal Care for Every Student',
              ].map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Message to Parents & Students */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Message to Students & Parents
            </h3>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {settings.messageToStudents ||
              'Consistency, honest practice, and deep conceptual clarity unlock exceptional results in board examinations.'}
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
            <p className="font-bold">Admission & Guidance Consultation:</p>
            <p>
              Parents are warmly invited to visit the tuition centre or call for personal guidance
              regarding batch timings and syllabus planning.
            </p>
          </div>
        </div>
      </div>

      {/* Centre Details & Location */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-4">
          Tuition Centre Coordinates & Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Location / Address</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {settings.address}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>Direct Phone</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {settings.contactPhone || settings.contactNumber}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp Helpline</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              +{settings.whatsappNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

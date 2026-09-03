import React from 'react';
import {
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { settings, setCurrentView, setSelectedClassId, language, t } = useApp();

  const handleClassClick = (cls: number) => {
    setSelectedClassId(cls);
    setCurrentView('materials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800 text-xs sm:text-sm">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight">
                  {settings.centreName}
                </span>
                <p className="text-xs text-slate-400">
                  {language === 'bn' && settings.taglineBn ? settings.taglineBn : settings.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A dedicated educational coaching and tuition ecosystem catering to students from
              Class 1 to Class 10. Providing structured notes, chapter practice sets, model papers,
              and digital task tracking with protected read-only materials.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>{settings.contactPhone || settings.contactNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>WhatsApp: +{settings.whatsappNumber}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Classes (1-10) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Curriculum (Classes 1–10)
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleClassClick(cls)}
                  className="text-left text-slate-400 hover:text-white transition py-0.5"
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Quick Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Portals & Study Desk
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNavClick('materials')}
                  className="hover:text-white transition"
                >
                  Study Materials Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('notices')}
                  className="hover:text-white transition"
                >
                  Notice & Exam Routine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('homework')}
                  className="hover:text-white transition"
                >
                  Homework Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('question_papers')}
                  className="hover:text-white transition"
                >
                  Exam Papers & Tests
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('teacher_profile')}
                  className="hover:text-white transition"
                >
                  Teacher Profile (Sabuj Sathi Sir)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Teacher & Protection */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Lead Faculty
            </h4>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1">
              <p className="font-bold text-white">{settings.teacherName}</p>
              <p className="text-slate-400">{settings.qualification}</p>
              <p className="text-[11px] text-blue-400">{settings.experience}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Protected Read-Only System</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {settings.centreName}. All rights reserved. Designed for
            educational coaching & study support.
          </p>
          <p className="text-center sm:text-right">
            Notice: Study materials are restricted to online read-only study for enrolled students.
          </p>
        </div>
      </div>
    </footer>
  );
};

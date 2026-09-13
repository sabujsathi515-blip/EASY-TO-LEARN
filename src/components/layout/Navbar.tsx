import React, { useState } from 'react';
import {
  Award,
  Book,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { PWAInstallButton } from '../common/PWAInstallButton';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    logout,
    setIsLoginOpen,
    setIsSearchOpen,
    language,
    setLanguage,
    theme,
    toggleTheme,
    settings,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const handleWhatsAppTeacher = () => {
    const cleanNumber = (settings.whatsappNumber || '917384491269').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent('Hello EASY TO LEARN, I would like guidance on West Bengal Board mock tests & admissions.');
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'mock_tests', label: language === 'bn' ? 'মক টেস্ট' : 'Mock Tests', icon: Award, highlight: true },
    { id: 'practice', label: language === 'bn' ? 'অনুশীলন' : 'Practice', icon: Sparkles },
    { id: 'results', label: language === 'bn' ? 'ফলাফল' : 'Results', icon: Trophy },
    { id: 'classes', label: t.classes, icon: GraduationCap },
    { id: 'books', label: t.books, icon: Book },
    { id: 'materials', label: t.studyMaterials, icon: BookOpen },
    { id: 'homework', label: t.homework, icon: FileText },
    { id: 'teacher_profile', label: t.teacherProfile, icon: User },
  ];

  return (
    <header className="sticky top-0 z-30 bg-indigo-900 text-white border-b border-indigo-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group shrink-0"
          >
            <Logo size="md" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-2xl tracking-tight text-white group-hover:text-amber-300 transition">
                  {settings.centreName || 'EASY TO LEARN'}
                </span>
                <span className="hidden xl:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                  Classes 1–10
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-200 font-medium truncate max-w-[190px] sm:max-w-none">
                {settings.subtitle || 'West Bengal Board Mock Test Portal'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-700 text-white shadow-xs font-bold ring-1 ring-white/20'
                      : item.highlight
                      ? 'bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 border border-amber-400/30 font-bold'
                      : 'text-indigo-100 hover:text-white hover:bg-indigo-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-amber-300' : 'opacity-80'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Student Portal Shortcut */}
            {currentUser.role === 'student' && (
              <button
                onClick={() => handleNav('student_portal')}
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  currentView === 'student_portal'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-indigo-100 hover:bg-indigo-800/80 border border-indigo-700/60'
                }`}
              >
                <span>{t.studentPortal}</span>
              </button>
            )}

            {/* Admin Panel Shortcut */}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => handleNav('admin_dashboard')}
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  currentView === 'admin_dashboard'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-indigo-100 hover:bg-indigo-800/80 border border-indigo-700/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.adminPanel}</span>
              </button>
            )}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              title="Search study materials"
              className="px-3 py-1.5 rounded-full bg-indigo-950/60 hover:bg-indigo-950 border border-indigo-700 text-indigo-200 hover:border-indigo-500 transition flex items-center gap-2 text-xs"
            >
              <Search className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden xl:inline text-indigo-300">Search notes...</span>
            </button>

            {/* Direct WhatsApp Teacher Button */}
            <button
              onClick={handleWhatsAppTeacher}
              title="WhatsApp Teacher"
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">WhatsApp Teacher</span>
            </button>

            {/* PWA Install Button */}
            <div className="hidden sm:block">
              <PWAInstallButton variant="compact" />
            </div>

            {/* Language Switch: English | বাংলা with professional indicator */}
            <div className="flex items-center space-x-1.5 text-xs font-semibold px-2 py-1 bg-indigo-950/50 rounded-lg border border-indigo-800">
              <button
                onClick={() => setLanguage('en')}
                className={`transition ${
                  language === 'en'
                    ? 'text-white border-b-2 border-indigo-400 font-bold'
                    : 'text-indigo-300 hover:text-white'
                }`}
              >
                English
              </button>
              <span className="text-indigo-400/50">|</span>
              <button
                onClick={() => setLanguage('bn')}
                className={`transition ${
                  language === 'bn'
                    ? 'text-white border-b-2 border-indigo-400 font-bold'
                    : 'text-indigo-300 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="p-2 rounded-lg text-indigo-200 hover:bg-indigo-800 border border-indigo-800 transition"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-200" />
              )}
            </button>

            {/* Auth Button or User Badge */}
            {currentUser.role === 'guest' ? (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm flex items-center gap-1.5 border border-indigo-500"
              >
                <User className="w-4 h-4" />
                <span>{t.login}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleNav(currentUser.role === 'admin' ? 'admin_dashboard' : 'student_portal')
                  }
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg border border-indigo-700 bg-indigo-800/80 hover:bg-indigo-800 text-left transition"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-xs">
                    {currentUser.role === 'admin'
                      ? 'AD'
                      : currentUser.student?.name
                          ? currentUser.student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                          : 'ST'}
                  </div>
                  <div className="hidden sm:block leading-tight">
                    <div className="text-xs font-semibold text-white max-w-[90px] truncate">
                      {currentUser.role === 'admin' ? 'Admin' : currentUser.student?.name}
                    </div>
                    <div className="text-[10px] text-indigo-300">
                      {currentUser.role === 'admin'
                        ? 'Master Console'
                        : `Class ${currentUser.student?.classId || 8} • Roll ${currentUser.student?.rollNumber || 1}`}
                    </div>
                  </div>
                </button>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-2 rounded-lg text-indigo-300 hover:text-red-300 hover:bg-indigo-800 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-indigo-200 hover:bg-indigo-800 lg:hidden border border-indigo-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-indigo-800 bg-indigo-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <PWAInstallButton variant="compact" />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-800 text-white font-semibold'
                      : 'text-indigo-100 hover:bg-indigo-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {currentUser.role === 'student' && (
              <button
                onClick={() => handleNav('student_portal')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-indigo-800 text-white"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.studentPortal}</span>
              </button>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => handleNav('admin_dashboard')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-indigo-800 text-white"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.adminPanel}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

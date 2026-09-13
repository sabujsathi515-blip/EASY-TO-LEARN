import React from 'react';
import { Home, Layers, FileCheck, Award, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, currentUser, setIsLoginOpen, language } = useApp();

  const handleProfileClick = () => {
    if (currentUser.role === 'admin' || currentUser.role === 'teacher') {
      setCurrentView('admin_dashboard');
    } else if (currentUser.role === 'student') {
      setCurrentView('student_portal');
    } else {
      setIsLoginOpen(true);
    }
  };

  const navItems = [
    {
      id: 'home',
      label: language === 'bn' ? 'হোম' : 'Home',
      icon: Home,
      onClick: () => setCurrentView('home'),
      isActive: currentView === 'home',
    },
    {
      id: 'classes',
      label: language === 'bn' ? 'শ্রেণি' : 'Classes',
      icon: Layers,
      onClick: () => setCurrentView('classes'),
      isActive: currentView === 'classes' || currentView === 'class_detail',
    },
    {
      id: 'tests',
      label: language === 'bn' ? 'মক টেস্ট' : 'Tests',
      icon: FileCheck,
      onClick: () => setCurrentView('mock_tests'),
      isActive: currentView === 'mock_tests' || currentView === 'tests' || currentView === 'active_mock_test',
      badge: true,
    },
    {
      id: 'results',
      label: language === 'bn' ? 'ফলাফল' : 'Results',
      icon: Award,
      onClick: () => setCurrentView('results'),
      isActive: currentView === 'results',
    },
    {
      id: 'profile',
      label:
        currentUser.role === 'admin'
          ? language === 'bn' ? 'অ্যাডমিন' : 'Admin'
          : currentUser.role === 'teacher'
          ? language === 'bn' ? 'শিক্ষক' : 'Teacher'
          : currentUser.role === 'student'
          ? language === 'bn' ? 'প্রোফাইল' : 'Profile'
          : language === 'bn' ? 'লগইন' : 'Login',
      icon: currentUser.role === 'admin' || currentUser.role === 'teacher' ? ShieldCheck : User,
      onClick: handleProfileClick,
      isActive: currentView === 'student_portal' || currentView === 'admin_dashboard',
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                item.isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none whitespace-nowrap">
                {item.label}
              </span>
              {item.isActive && (
                <span className="w-4 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BackButtonProps {
  label?: string;
  onClick?: () => void;
  showHomeShortcut?: boolean;
  className?: string;
  variant?: 'default' | 'pill' | 'subtle' | 'floating';
}

export const BackButton: React.FC<BackButtonProps> = ({
  label,
  onClick,
  showHomeShortcut = false,
  className = '',
  variant = 'default',
}) => {
  const { goBack, setCurrentView, language, t } = useApp();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      goBack();
    }
  };

  const displayText = label || t.goBack || (language === 'bn' ? 'পেছনে যান' : 'Go Back');

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs transition active:scale-95 group"
          title={displayText}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
          <span>{displayText}</span>
        </button>

        {showHomeShortcut && (
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="p-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-xs transition"
            title={language === 'bn' ? 'মূল পাতা' : 'Home'}
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>{displayText}</span>
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs transition active:scale-95 group"
        title={displayText}
      >
        <ArrowLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:-translate-x-1 transition-transform" />
        <span>{displayText}</span>
      </button>

      {showHomeShortcut && (
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          title={language === 'bn' ? 'মূল পাতা' : 'Home'}
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'bn' ? 'হোম' : 'Home'}</span>
        </button>
      )}
    </div>
  );
};

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  subtitle,
  variant = 'auto',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textMap = {
    sm: 'text-sm font-bold',
    md: 'text-lg sm:text-xl font-extrabold',
    lg: 'text-2xl font-black',
    xl: 'text-3xl font-black',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon: Book + Pencil + Graduation Cap */}
      <div
        className={`${sizeMap[size]} relative rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 shadow-md flex items-center justify-center p-1.5 border border-indigo-400/40 text-white shrink-0`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Graduation Cap at Top */}
          <path
            d="M50 16 L84 32 L50 48 L16 32 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M28 38 V54 C28 62 72 62 72 54 V38"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Tassel */}
          <path d="M76 36 V58" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="76" cy="60" r="3" fill="#FDE68A" />

          {/* Open Book Base */}
          {/* Left Page */}
          <path
            d="M50 68 C40 64 24 64 12 68 V86 C24 82 40 82 50 86 Z"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Right Page */}
          <path
            d="M50 68 C60 64 76 64 88 68 V86 C76 82 60 82 50 86 Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Book Spine */}
          <path d="M50 68 V86" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />

          {/* Diagonal Pencil Crossing Book */}
          <g transform="rotate(-32 50 62)">
            {/* Pencil Body */}
            <rect x="47" y="32" width="6" height="30" rx="1" fill="#FB7185" stroke="#E11D48" strokeWidth="1" />
            {/* Eraser */}
            <rect x="47" y="28" width="6" height="4" rx="1" fill="#38BDF8" />
            {/* Pencil Tip */}
            <polygon points="47,62 53,62 50,69" fill="#FCD34D" stroke="#B45309" strokeWidth="0.8" />
            <polygon points="49,67 51,67 50,69" fill="#1E293B" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`tracking-tight ${textMap[size]} ${
                variant === 'light'
                  ? 'text-white'
                  : variant === 'dark'
                  ? 'text-slate-900'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              EASY TO LEARN
            </span>
          </div>
          <span
            className={`text-[11px] leading-tight font-medium ${
              variant === 'light'
                ? 'text-indigo-200'
                : variant === 'dark'
                ? 'text-slate-500'
                : 'text-indigo-600 dark:text-indigo-400'
            }`}
          >
            {subtitle || 'West Bengal Board Mock Test Portal'}
          </span>
        </div>
      )}
    </div>
  );
};

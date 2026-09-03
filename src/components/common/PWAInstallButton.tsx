import React, { useState } from 'react';
import { Download, HelpCircle, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useApp } from '../../context/AppContext';

export const PWAInstallButton: React.FC<{ variant?: 'compact' | 'full' | 'banner' }> = ({
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useApp();
  const [showGuide, setShowGuide] = useState(false);

  // If running in standalone mode, app is already installed
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-white/20 rounded-lg flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-white" />
          </span>
          <span>
            <strong>Install EASY TO LEARN:</strong> Access offline notes & homework fast on your phone!
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Install App
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        title={t.installApp}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 transition-colors shadow-xs"
      >
        <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="hidden sm:inline">{t.installApp}</span>
        <span className="sm:hidden">Install</span>
      </button>

      {/* Installation Guide Modal (for iOS or browsers where prompt event is not fired) */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  E2L
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Install EASY TO LEARN App
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add to Home Screen for fast student access
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {isIOS ? (
                <div className="space-y-2.5 bg-blue-50 dark:bg-blue-950/50 p-3.5 rounded-xl border border-blue-100 dark:border-blue-900 text-xs sm:text-sm">
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    How to install on iPhone / iPad (Safari):
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li>
                      Tap the <strong>Share</strong> button (box with an upward arrow) in the Safari
                      bottom toolbar.
                    </li>
                    <li>
                      Scroll down and tap <strong>Add to Home Screen</strong>.
                    </li>
                    <li>
                      Confirm by tapping <strong>Add</strong> in the top-right corner.
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    How to install on Android / Chrome:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li>
                      Tap the <strong>three dots (⋮)</strong> menu in the top-right of your browser.
                    </li>
                    <li>
                      Select <strong>Install App</strong> or <strong>Add to Home Screen</strong>.
                    </li>
                    <li>
                      The <strong>EASY TO LEARN</strong> icon will appear on your phone screen!
                    </li>
                  </ol>
                </div>
              )}

              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Works smoothly offline and loads your syllabus instantly.</span>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-sm font-semibold text-white shadow-sm transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Download, HelpCircle, Smartphone, CheckCircle, ExternalLink, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useApp } from '../../context/AppContext';

export const PWAInstallButton: React.FC<{ variant?: 'compact' | 'full' | 'banner' | 'hero' }> = ({
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language, showToast } = useApp();
  const [showGuide, setShowGuide] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        showToast('Thank you! EASY TO LEARN app is being installed.', 'success');
      }
    } else {
      setShowGuide(true);
    }
  };

  const handleDownloadApk = () => {
    const link = document.createElement('a');
    link.href = '/easy-to-learn.apk';
    link.download = 'EasyToLearn-App.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Easy To Learn Android App package download started', 'success');
  };

  if (variant === 'hero') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2.5 border border-emerald-500"
        >
          <Smartphone className="w-5 h-5" />
          <span>{language === 'bn' ? 'অ্যান্ড্রয়েড অ্যাপ ডাউনলোড' : 'Download Android App'}</span>
          <Download className="w-4 h-4 bg-white/20 p-0.5 rounded-md" />
        </button>

        {showGuide && renderModal()}
      </>
    );
  }

  if (variant === 'banner') {
    return (
      <>
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white px-4 py-2.5 shadow-md flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/20 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </span>
            <span>
              <strong>EASY TO LEARN Android App:</strong>{' '}
              {language === 'bn'
                ? 'মোবাইলে দ্রুত ক্লাস নোট ও পড়াশোনার জন্য অ্যাপটি ইনস্টল বা ডাউনলোড করুন!'
                : 'Install or Download Android App for instant offline study desk access!'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ইনস্টল / ডাউনলোড' : 'Download App'}</span>
            </button>
          </div>
        </div>

        {showGuide && renderModal()}
      </>
    );
  }

  function renderModal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                E2L
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  EASY TO LEARN Android App
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === 'bn' ? 'অফিসিয়াল অ্যান্ড্রয়েড অ্যাপ ডাউনলোড' : 'Official Android App Download'}
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

          <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
              <p className="font-bold text-emerald-900 dark:text-emerald-200 mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'অ্যান্ড্রয়েড ইনস্টলেশন পদ্ধতি:' : 'Android 1-Tap Installation:'}</span>
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                <li>
                  {language === 'bn'
                    ? 'ব্রাউজারের উপরের ডানদিকের ৩টি ডট (⋮) মেনু বোতামে ট্যাপ করুন।'
                    : 'Tap the three dots (⋮) menu at the top-right of your Chrome browser.'}
                </li>
                <li>
                  {language === 'bn'
                    ? '"Install App" বা "Add to Home Screen" অপশনে ক্লিক করুন।'
                    : 'Select "Install App" or "Add to Home Screen".'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'নিশ্চিত করুন—আপনার ফোনের স্ক্রিনে EASY TO LEARN অ্যাপ চলে আসবে!'
                    : 'Confirm, and the EASY TO LEARN app icon is placed on your home screen!'}
                </li>
              </ol>
            </div>

            {/* Direct APK Download Button */}
            <div className="pt-1">
              <button
                onClick={handleDownloadApk}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                <span>
                  {language === 'bn'
                    ? 'সরাসরি প্যাকেজ (.apk) ডাউনলোড করুন'
                    : 'Download APK Package Directly'}
                </span>
              </button>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
              <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                {language === 'bn'
                  ? 'অ্যাপটি খুব হালকা এবং অফলাইনেও সহজে খোলে।'
                  : 'Fast, lightweight, and works seamlessly for students on all Android devices.'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowGuide(false)}
            className="mt-4 w-full rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="EASY TO LEARN Android App Download"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 transition shadow-xs"
      >
        <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="hidden sm:inline">
          {language === 'bn' ? 'অ্যান্ড্রয়েড অ্যাপ' : 'Android App'}
        </span>
        <Download className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
      </button>

      {showGuide && renderModal()}
    </>
  );
};

import React from 'react';
import { Award, Printer, X, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TestResult } from '../../types';
import { Logo } from '../common/Logo';

interface Props {
  result: TestResult;
  onClose: () => void;
}

export const TestCertificateModal: React.FC<Props> = ({ result, onClose }) => {
  const { settings } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto print:shadow-none print:border-none print:m-0 animate-in zoom-in-95">
        {/* Action Header - Hidden during print */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">মেধা সনদপত্র (Certificate of Excellence)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF সংরক্ষণ করুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Certificate Canvas */}
        <div className="p-8 sm:p-12 relative bg-[#fdfbf7] text-slate-900 border-12 border-[#1e293b] select-none m-4 rounded-2xl shadow-inner">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-amber-500" />
          <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-amber-500" />
          <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-amber-500" />
          <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-amber-500" />

          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <div className="w-96 h-96 rounded-full border-16 border-slate-900 flex items-center justify-center">
              <span className="text-6xl font-black">EASY TO LEARN</span>
            </div>
          </div>

          <div className="relative z-10 text-center space-y-6">
            {/* Header / Logo */}
            <div className="flex flex-col items-center justify-center">
              <Logo size="lg" showText={false} />
              <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-slate-900 mt-2 font-serif">
                {settings.centreName || 'EASY TO LEARN'}
              </h1>
              <p className="text-xs sm:text-sm tracking-widest text-indigo-800 font-bold uppercase mt-0.5">
                {settings.subtitle || 'West Bengal Board Mock Test Portal'}
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
            </div>

            {/* Certificate Title */}
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-amber-600 bg-amber-50 px-4 py-1 rounded-full border border-amber-200">
                OFFICIAL CERTIFICATE OF ACHIEVEMENT
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 mt-3">
                মেধা ও কৃতিত্বের প্রশংসাপত্র
              </h2>
            </div>

            {/* Body Text */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto italic">
              এই মর্মে শংসাপত্র প্রদান করা হচ্ছে যে, পশ্চিমবঙ্গ পর্ষদ অনলাইন মূল্যায়ন পরীক্ষায় কৃতিত্বের সঙ্গে
              উত্তীর্ণ হয়েছেন:
            </p>

            {/* Student Name */}
            <div className="py-2">
              <div className="inline-block border-b-2 border-slate-800 pb-1 px-8 sm:px-14">
                <span className="text-2xl sm:text-3xl font-bold text-indigo-900 tracking-wide">
                  {result.studentName}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                শ্রেণি: Class {result.classId} | Student ID: {result.studentId}
              </div>
            </div>

            {/* Test Details and Score */}
            <div className="max-w-xl mx-auto bg-white/80 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-slate-500 font-medium">পরীক্ষার নাম</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
                  {result.testTitle}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium">প্রাপ্ত নম্বর ও শতকরা</div>
                <div className="text-sm sm:text-base font-black text-emerald-600 mt-0.5">
                  {result.obtainedMarks} / {result.totalMarks} ({result.percentage}%)
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium">র‌্যাংক ও ফলাফল</div>
                <div className="text-xs sm:text-sm font-bold text-indigo-600 mt-0.5">
                  {result.rank ? `র‌্যাংক #${result.rank}` : 'উত্তীর্ণ (Passed)'}
                </div>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 sm:pt-8 flex items-end justify-between max-w-2xl mx-auto text-xs text-slate-600">
              {/* Left: Issue Date & Verification */}
              <div className="text-left space-y-1">
                <div className="font-semibold text-slate-700">তারিখ: {result.submittedAt.split(' ')[0]}</div>
                <div className="text-[11px] font-mono text-slate-500">
                  ID: {result.certificateId || 'CERT-WB-2026'}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ডিজিটাল যাচাইকৃত কপি</span>
                </div>
              </div>

              {/* Center Seal */}
              <div className="w-20 h-20 rounded-full border-4 border-double border-amber-500 bg-amber-50 flex flex-col items-center justify-center text-amber-800 shadow-sm p-1">
                <Award className="w-6 h-6 text-amber-600 mb-0.5" />
                <span className="text-[9px] font-extrabold uppercase tracking-tight">EASY TO LEARN</span>
                <span className="text-[8px] font-bold">SEAL 2026</span>
              </div>

              {/* Right: Signature */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-base sm:text-lg font-bold text-slate-800">
                  {settings.teacherName || 'Milton Sir'}
                </div>
                <div className="w-32 border-t border-slate-400 ml-auto" />
                <div className="font-bold text-slate-700">পরিচালক ও প্রধান শিক্ষক</div>
                <div className="text-[10px] text-slate-500">EASY TO LEARN Portal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, language } = useApp();

  const handleWhatsAppClick = () => {
    // Format phone number by removing spaces, plus, dashes
    const cleanNumber = (settings.whatsappNumber || '919876543210').replace(/[^0-9]/g, '');
    const prefilledMessage =
      language === 'bn'
        ? 'নমস্কার EASY TO LEARN, আমি টিউশন ক্লাস ও ভর্তি সংক্রান্ত তথ্য জানতে চাই।'
        : 'Hello EASY TO LEARN, I want information about the tuition classes and admission.';

    const encodedMessage = encodeURIComponent(prefilledMessage);
    const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Floating tooltip badge */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg whitespace-nowrap pointer-events-none">
        Chat with Teacher on WhatsApp
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="Contact on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
      </button>
    </div>
  );
};

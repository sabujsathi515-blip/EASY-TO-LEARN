import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { flushOfflineSyncQueue, getOfflineSyncQueue, isFirebaseConfigured } from '../../services/firebase';

export const NetworkStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed'>('idle');
  const [pendingCount, setPendingCount] = useState<number>(() => getOfflineSyncQueue().length);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      setShowBanner(true);
      const queue = getOfflineSyncQueue();
      if (queue.length > 0 && isFirebaseConfigured) {
        setSyncStatus('syncing');
        const res = await flushOfflineSyncQueue();
        if (res.totalSynced > 0) {
          setSyncStatus('completed');
          setTimeout(() => {
            setSyncStatus('idle');
            setPendingCount(0);
          }, 3000);
        } else {
          setSyncStatus('idle');
        }
      } else {
        setTimeout(() => setShowBanner(false), 2500);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setShowBanner(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerManualSync = async () => {
    setSyncStatus('syncing');
    const res = await flushOfflineSyncQueue();
    setSyncStatus(res.totalSynced > 0 ? 'completed' : 'idle');
    setPendingCount(getOfflineSyncQueue().length);
    setTimeout(() => {
      setSyncStatus('idle');
    }, 2500);
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs px-3 py-1.5 flex items-center justify-between gap-2 transition-all">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE (অনলাইন)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[11px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <WifiOff className="w-3 h-3 text-rose-400" />
              OFFLINE (অফলাইন মোড)
            </span>
          )}

          {syncStatus === 'syncing' && (
            <span className="inline-flex items-center gap-1 text-amber-300 font-medium">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>SYNCING (সিঙ্ক হচ্ছে...)</span>
            </span>
          )}

          {syncStatus === 'completed' && (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SYNC COMPLETED (সিঙ্ক সম্পন্ন)</span>
            </span>
          )}

          {!isOnline && (
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              ইন্টারনেট ছাড়াও মক টেস্ট দেওয়া ও সংরক্ষিত রেজাল্ট দেখা যাবে।
            </span>
          )}
        </div>

        {pendingCount > 0 && isOnline && (
          <button
            onClick={triggerManualSync}
            disabled={syncStatus === 'syncing'}
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>{pendingCount} টি অফলাইন রেজাল্ট সিঙ্ক করুন</span>
          </button>
        )}
      </div>
    </div>
  );
};

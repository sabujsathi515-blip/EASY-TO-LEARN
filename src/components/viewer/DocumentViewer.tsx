import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Lock,
  Maximize2,
  Minimize2,
  Moon,
  Search,
  ShieldAlert,
  Sun,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial } from '../../types';

export const DocumentViewer: React.FC = () => {
  const { activeDocument, closeDocumentViewer, language, t, showToast } = useApp();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [paperTheme, setPaperTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  // Reset page when document changes
  useEffect(() => {
    setCurrentPage(1);
    setZoomLevel(100);
    setSearchTerm('');
  }, [activeDocument?.id]);

  // Anti-download security listeners: block Ctrl+S, Ctrl+P, Right-Click
  useEffect(() => {
    if (!activeDocument) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        showToast('Printing is restricted for protected study materials.', 'warning');
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showToast('Direct saving is disabled. Read-only study mode active.', 'warning');
      }
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast('Right-click context menu is disabled for study materials.', 'info');
    };

    window.addEventListener('keydown', handleKeyDown);
    const elem = viewerContainerRef.current;
    if (elem) {
      elem.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (elem) {
        elem.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [activeDocument, isFullscreen, showToast]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!viewerContainerRef.current) return;
    if (!isFullscreen) {
      if (viewerContainerRef.current.requestFullscreen) {
        viewerContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  if (!activeDocument) return null;

  const totalPages = activeDocument.pages?.length || activeDocument.totalPages || 1;
  const currentPageData = activeDocument.pages?.[currentPage - 1];

  // In-document text search matching
  const searchMatches = useMemo(() => {
    if (!searchTerm.trim() || !currentPageData) return 0;
    const term = searchTerm.toLowerCase();
    const content = (currentPageData.content || '').toLowerCase();
    const title = (currentPageData.title || '').toLowerCase();
    const regex = new RegExp(term, 'gi');
    const matches1 = (content.match(regex) || []).length;
    const matches2 = (title.match(regex) || []).length;
    return matches1 + matches2;
  }, [searchTerm, currentPageData]);

  // Highlight helper
  const renderHighlightedText = (text: string) => {
    if (!searchTerm.trim()) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 text-slate-900 rounded-xs px-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getPaperClasses = () => {
    switch (paperTheme) {
      case 'dark':
        return 'bg-slate-900 text-slate-100 border-slate-700 shadow-2xl';
      case 'sepia':
        return 'bg-[#fbf0d9] text-[#433422] border-[#e2d5bc] shadow-xl';
      case 'light':
      default:
        return 'bg-white text-slate-900 border-slate-200 shadow-xl';
    }
  };

  return (
    <div
      ref={viewerContainerRef}
      id="protected-document-viewer"
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md transition-all select-none no-select ${
        isFullscreen ? 'w-screen h-screen' : ''
      }`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Top Header / Toolbar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Left info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            {activeDocument.format === 'pdf' ? (
              <FileText className="w-5 h-5" />
            ) : (
              <BookOpen className="w-5 h-5" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Lock className="w-3 h-3" />
                READ ONLY
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Class {activeDocument.classId}
              </span>
            </div>
            <h2 className="font-semibold text-sm sm:text-base text-white truncate max-w-[280px] sm:max-w-md">
              {language === 'bn' && activeDocument.titleBn
                ? activeDocument.titleBn
                : activeDocument.title}
            </h2>
          </div>
        </div>

        {/* Central Controls: Page Navigation & Zoom */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700/60 text-xs font-medium">
          {/* Page nav */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            title="Previous Page"
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-1.5 font-mono text-slate-200">
            {currentPage} <span className="text-slate-500">/</span> {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            title="Next Page"
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={() => setZoomLevel((z) => Math.max(60, z - 15))}
            disabled={zoomLevel <= 60}
            title="Zoom Out"
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="w-11 text-center font-mono text-slate-200 text-[11px]">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(180, z + 15))}
            disabled={zoomLevel >= 180}
            title="Zoom In"
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Paper theme */}
          <button
            onClick={() =>
              setPaperTheme((curr) =>
                curr === 'light' ? 'sepia' : curr === 'sepia' ? 'dark' : 'light'
              )
            }
            title="Toggle Reading Background"
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 transition hidden sm:flex items-center gap-1"
          >
            {paperTheme === 'dark' ? (
              <Moon className="w-3.5 h-3.5 text-blue-400" />
            ) : paperTheme === 'sepia' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Sun className="w-3.5 h-3.5" />
            )}
            <span className="text-[10px] capitalize">{paperTheme}</span>
          </button>
        </div>

        {/* Right Tools & Close */}
        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={() => setShowSearchInput((prev) => !prev)}
            title="Search in Document"
            className={`p-2 rounded-lg transition ${
              showSearchInput
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close button */}
          <button
            onClick={closeDocumentViewer}
            title="Close Viewer"
            className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Security Warning Ribbon & Search Sub-bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-red-600 text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow-xs">
            READ ONLY STUDY MATERIAL
          </span>
          <span className="hidden md:inline text-slate-300">
            • Download Disabled • Protected viewing mode for enrolled students
          </span>
        </div>

        {/* Search Input inline */}
        {showSearchInput && (
          <div className="flex items-center gap-1.5 bg-slate-900 border border-amber-500/40 px-2.5 py-1 rounded-lg">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search keyword in this page..."
              className="bg-transparent text-white text-xs placeholder-slate-400 focus:outline-hidden w-40 sm:w-56"
              autoFocus
            />
            {searchTerm && (
              <span className="text-[10px] font-mono text-amber-300 px-1">
                {searchMatches} {t.matchesFound}
              </span>
            )}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Document Reading Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start relative">
        {/* Document Sheet */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className={`w-full max-w-3xl min-h-[750px] p-6 sm:p-12 rounded-xl transition-all relative overflow-hidden border ${getPaperClasses()}`}
        >
          {/* Security Diagonal Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none select-none z-10 flex items-center justify-center overflow-hidden opacity-5 dark:opacity-10">
            <div className="transform -rotate-35 text-center leading-loose">
              <p className="text-4xl sm:text-5xl font-black text-slate-800 tracking-widest uppercase">
                EASY TO LEARN
              </p>
              <p className="text-lg sm:text-xl font-bold tracking-wider text-slate-700">
                STUDENT READ ONLY • COPY PROHIBITED
              </p>
              <p className="text-sm font-semibold tracking-wider text-slate-600">
                {activeDocument.id} • {activeDocument.author}
              </p>
            </div>
          </div>

          {/* Document Header */}
          <div className="border-b pb-4 mb-6 border-current/20 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold opacity-70">
                <span>EASY TO LEARN TUITION CENTRE</span>
                <span>•</span>
                <span>CLASS {activeDocument.classId}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">
                {language === 'bn' && activeDocument.titleBn
                  ? activeDocument.titleBn
                  : activeDocument.title}
              </h1>
              {currentPageData?.title && (
                <h3 className="text-sm font-semibold opacity-85 mt-1 text-blue-600 dark:text-blue-400">
                  {currentPageData.title}
                </h3>
              )}
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs opacity-60 font-mono">
                Page {currentPage} of {totalPages}
              </span>
              <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end mt-1">
                <Eye className="w-3 h-3" />
                <span>{activeDocument.viewCount} views</span>
              </div>
            </div>
          </div>

          {/* Document Body Content */}
          <div className="space-y-6 text-sm sm:text-base leading-relaxed font-sans">
            {currentPageData?.content ? (
              <div className="whitespace-pre-wrap font-sans">
                {renderHighlightedText(currentPageData.content)}
              </div>
            ) : (
              <div className="py-12 text-center opacity-60">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Protected document page rendered for student study session.</p>
              </div>
            )}

            {/* Key Formulas or Equations Box if available */}
            {currentPageData?.keyFormulas && currentPageData.keyFormulas.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  Key Formulas & Identities (স্মরণীয় সূত্রাবলী)
                </h4>
                <div className="space-y-1.5 font-mono text-xs sm:text-sm text-blue-900 dark:text-blue-200">
                  {currentPageData.keyFormulas.map((formula, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 dark:bg-slate-900/60 p-2 rounded-lg border border-blue-100 dark:border-blue-800/80 font-semibold"
                    >
                      {formula}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Solved Sample Questions if available */}
            {currentPageData?.sampleQuestions && currentPageData.sampleQuestions.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-bold text-sm tracking-wide border-b pb-2 border-current/15 flex items-center justify-between">
                  <span>Solved Board Questions & Model Answers</span>
                  <span className="text-xs opacity-60 font-normal">Step-by-step solutions</span>
                </h4>
                {currentPageData.sampleQuestions.map((qa, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-current/10 space-y-2"
                  >
                    <div className="font-semibold text-xs sm:text-sm flex items-start justify-between gap-2">
                      <span>
                        Q{idx + 1}: {renderHighlightedText(qa.q)}
                      </span>
                      {qa.marks && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 shrink-0">
                          [{qa.marks} Marks]
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm pl-3 border-l-2 border-emerald-500 whitespace-pre-wrap opacity-90">
                      <strong>Answer: </strong>
                      {renderHighlightedText(qa.a)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Document Footer */}
          <div className="mt-12 pt-4 border-t border-current/15 flex flex-wrap items-center justify-between text-xs opacity-60">
            <div>
              <span>Faculty: {activeDocument.author || 'Sabuj Sathi Sir'}</span>
              <span className="mx-2">•</span>
              <span>Updated: {activeDocument.uploadDate}</span>
            </div>
            <div className="font-mono">
              EASY TO LEARN • Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Page Bar */}
      <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">Protected View Session Active</span>
          <span className="text-slate-500">|</span>
          <span className="text-[11px] text-slate-400">
            Browser download button removed by security directive
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="font-medium text-slate-200">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

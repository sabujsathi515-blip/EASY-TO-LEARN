import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ClassSection } from './components/classes/ClassSection';
import { TextBookSection } from './components/books/TextBookSection';
import { StudyMaterialsSection } from './components/materials/StudyMaterialsSection';
import { NoticeBoardSection } from './components/notices/NoticeBoardSection';
import { HomeworkSection } from './components/homework/HomeworkSection';
import { QuestionPapersSection } from './components/exam/QuestionPapersSection';
import { TeacherProfileSection } from './components/teacher/TeacherProfileSection';
import { StudentPortal } from './components/student/StudentPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DocumentViewer } from './components/viewer/DocumentViewer';
import { PageNavigationHeader } from './components/common/PageNavigationHeader';
import { SearchModal } from './components/common/SearchModal';
import { LoginModal } from './components/common/LoginModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ToastContainer } from './components/common/ToastContainer';
import { NetworkStatusBanner } from './components/common/NetworkStatusBanner';
import { MockTestPortal } from './components/exam/MockTestPortal';
import { MockTestInterface } from './components/exam/MockTestInterface';
import { PracticeMode } from './components/exam/PracticeMode';
import { ResultsPortal } from './components/exam/ResultsPortal';
import { OfflineExamPaper } from './components/exam/OfflineExamPaper';
import { TestResultModal } from './components/exam/TestResultModal';
import { TestCertificateModal } from './components/exam/TestCertificateModal';
import { StudentRegisterModal } from './components/auth/StudentRegisterModal';
import { MockTest } from './types';

const MainLayout: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    activeDocument,
    activeTest,
    activeResult,
    closeTestResult,
    activeCertificate,
    closeCertificate,
    isRegisterOpen,
    setIsRegisterOpen,
  } = useApp();

  const [offlinePrintTest, setOfflinePrintTest] = useState<MockTest | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Network Connectivity & Firebase Sync Status */}
      <NetworkStatusBanner />

      {/* Navigation Bar */}
      <Navbar />

      {/* Universal Back Navigation Bar across all pages */}
      <PageNavigationHeader />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'classes' && <ClassSection />}
        {currentView === 'mock_tests' && (
          <MockTestPortal
            onSelectPrintOffline={(test) => {
              setOfflinePrintTest(test);
              setCurrentView('offline_exam_paper');
            }}
          />
        )}
        {currentView === 'active_mock_test' && activeTest && (
          <MockTestInterface test={activeTest} />
        )}
        {currentView === 'practice' && <PracticeMode />}
        {currentView === 'results' && <ResultsPortal />}
        {currentView === 'offline_exam_paper' && offlinePrintTest && (
          <OfflineExamPaper
            test={offlinePrintTest}
            onBack={() => {
              setOfflinePrintTest(null);
              setCurrentView('mock_tests');
            }}
          />
        )}
        {currentView === 'books' && <TextBookSection />}
        {currentView === 'materials' && <StudyMaterialsSection />}
        {currentView === 'notices' && <NoticeBoardSection />}
        {currentView === 'homework' && <HomeworkSection />}
        {currentView === 'question_papers' && <QuestionPapersSection />}
        {currentView === 'teacher_profile' && <TeacherProfileSection />}
        {currentView === 'student_portal' && <StudentPortal />}
        {currentView === 'admin_dashboard' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Protected Read-Only Document Viewer */}
      {activeDocument && <DocumentViewer />}

      {/* Instant Search Across All Classes & Notes */}
      <SearchModal />

      {/* Authentication Modal */}
      <LoginModal />

      {/* Student Self-Registration Modal */}
      {isRegisterOpen && (
        <StudentRegisterModal onClose={() => setIsRegisterOpen(false)} />
      )}

      {/* Test Result Analysis Modal */}
      {activeResult && (
        <TestResultModal result={activeResult} onClose={closeTestResult} />
      )}

      {/* Certificate Modal */}
      {activeCertificate && (
        <TestCertificateModal
          result={activeCertificate}
          onClose={closeCertificate}
        />
      )}

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp />

      {/* Global Notifications & Feedback */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

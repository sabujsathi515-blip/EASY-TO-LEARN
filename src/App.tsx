import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ClassSection } from './components/classes/ClassSection';
import { StudyMaterialsSection } from './components/materials/StudyMaterialsSection';
import { NoticeBoardSection } from './components/notices/NoticeBoardSection';
import { HomeworkSection } from './components/homework/HomeworkSection';
import { QuestionPapersSection } from './components/exam/QuestionPapersSection';
import { TeacherProfileSection } from './components/teacher/TeacherProfileSection';
import { StudentPortal } from './components/student/StudentPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DocumentViewer } from './components/viewer/DocumentViewer';
import { SearchModal } from './components/common/SearchModal';
import { LoginModal } from './components/common/LoginModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ToastContainer } from './components/common/ToastContainer';

const MainLayout: React.FC = () => {
  const { currentView, activeDocument } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'classes' && <ClassSection />}
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

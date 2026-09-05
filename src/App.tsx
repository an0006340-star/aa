import React, { useState } from 'react';
import {
  ScreenTab,
  UserRole,
  UserProfile,
  Course,
  Assessment,
  AssessmentResult,
  KnowledgeResource,
  SkillGap,
  AdminStats,
} from './types';
import {
  INITIAL_USER,
  MOCK_COURSES,
  MOCK_ASSESSMENT_DATA,
  INITIAL_ASSESSMENT_RESULT,
  MOCK_SKILL_GAPS,
  MOCK_KNOWLEDGE_RESOURCES,
  MOCK_ADMIN_STATS,
} from './data/mockData';

// Layout Components
import { HeaderNavbar } from './components/HeaderNavbar';
import { Sidebar } from './components/Sidebar';
import { DemoFlowBar } from './components/DemoFlowBar';

// Screen Components
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ProfileSkillsScreen } from './screens/ProfileSkillsScreen';
import { SkillAnalysisScreen } from './screens/SkillAnalysisScreen';
import { RecommendedTrainingScreen } from './screens/RecommendedTrainingScreen';
import { CourseLearningScreen } from './screens/CourseLearningScreen';
import { AssessmentScreen } from './screens/AssessmentScreen';
import { AssessmentResultScreen } from './screens/AssessmentResultScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { KnowledgeScreen } from './screens/KnowledgeScreen';
import { AdminScreen } from './screens/AdminScreen';

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<ScreenTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('learner');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Application Data State
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course>(MOCK_COURSES[0]);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment>(MOCK_ASSESSMENT_DATA);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(
    INITIAL_ASSESSMENT_RESULT
  );
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>(MOCK_SKILL_GAPS);
  const [knowledgeResources, setKnowledgeResources] = useState<KnowledgeResource[]>(
    MOCK_KNOWLEDGE_RESOURCES
  );
  const [adminStats, setAdminStats] = useState<AdminStats>(MOCK_ADMIN_STATS);

  // Feedback toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Auth Handlers
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setUser((prev) => ({
      ...prev,
      role,
      name: role === 'admin' ? 'Dr. Arthur Vance' : 'Sarah Jenkins',
      title: role === 'admin' ? 'Director of Workforce Modernization' : 'Senior Policy Analyst',
    }));
    setCurrentTab(role === 'admin' ? 'admin' : 'dashboard');
    showToast(`Logged in successfully as ${role === 'admin' ? 'Agency Administrator' : 'Sarah Jenkins (Learner)'}`);
  };

  const handleLogout = () => {
    setCurrentTab('login');
    showToast('Logged out of Capacity Connect session.');
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setUser((prev) => ({
      ...prev,
      role,
      name: role === 'admin' ? 'Dr. Arthur Vance' : 'Sarah Jenkins',
      title: role === 'admin' ? 'Director of Workforce Modernization' : 'Senior Policy Analyst',
    }));
    if (role === 'admin' && currentTab !== 'admin') {
      setCurrentTab('admin');
    } else if (role !== 'admin' && currentTab === 'admin') {
      setCurrentTab('dashboard');
    }
    showToast(`Switched active profile role to ${role.toUpperCase()}`);
  };

  // Course & Assessment Handlers
  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentTab('course-learning');
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    if (selectedCourse.id === updatedCourse.id) {
      setSelectedCourse(updatedCourse);
    }
  };

  const handleStartAssessment = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId) || selectedCourse;
    setSelectedCourse(course);
    // Bind assessment to selected course
    setCurrentAssessment({
      ...MOCK_ASSESSMENT_DATA,
      courseId: course.id,
      courseTitle: course.title,
    });
    setCurrentTab('assessment');
  };

  const handleSubmitAssessment = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentTab('assessment-result');
  };

  const handleApplyCompetencyUpdate = () => {
    if (!assessmentResult) return;

    // Update user competency index and progress
    const newScore = Math.min(96, user.competencyScore + 4);
    const updatedUser: UserProfile = {
      ...user,
      competencyScore: newScore,
      competencyLevel: newScore >= 80 ? 'Advanced' : 'Proficient',
      completedCoursesCount: user.completedCoursesCount + 1,
      learningHours: user.learningHours + 4.5,
    };
    setUser(updatedUser);

    // Mark current course as 100% completed
    if (selectedCourse) {
      const completedCourse: Course = {
        ...selectedCourse,
        progress: 100,
        completedModules: selectedCourse.totalModules,
        modules: selectedCourse.modules.map((m) => ({ ...m, completed: true })),
      };
      handleUpdateCourse(completedCourse);
    }

    // Resolve or reduce corresponding skill gap
    setSkillGaps((prev) =>
      prev.map((gap) => {
        if (gap.recommendedCourseId === selectedCourse?.id) {
          return {
            ...gap,
            currentLevel: Math.min(gap.requiredLevel, gap.currentLevel + 1),
            gapSeverity: 'Moderate',
          };
        }
        return gap;
      })
    );

    setCurrentTab('dashboard');
    showToast('Success! Competency score updated (+4%) and learning hours recorded to your official transcript.');
  };

  const handleRetakeAssessment = () => {
    setCurrentTab('assessment');
  };

  const handleAddKnowledgeResource = (newResource: KnowledgeResource) => {
    setKnowledgeResources([newResource, ...knowledgeResources]);
  };

  const handleApplyAIPathway = () => {
    showToast('Applied AI Diagnostic Learning Pathway to your active training curriculum!');
  };

  // Full Screen Login Mode
  if (currentTab === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Global Top Navbar */}
      <HeaderNavbar
        user={user}
        userRole={userRole}
        currentRole={userRole}
        currentTab={currentTab}
        onRoleChange={handleRoleChange}
        onNavigate={setCurrentTab}
        onLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Interactive Demo Flow Guided Helper Bar */}
      <DemoFlowBar currentTab={currentTab} onNavigate={setCurrentTab} />

      {/* Main Two-Column Structure */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Persistent Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          userRole={userRole}
          user={user}
          onNavigate={setCurrentTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
          activeCourseTitle={selectedCourse?.title}
          onResumeCourse={() => setCurrentTab('course-learning')}
        />

        {/* Mobile Navigation Drawer Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-72 bg-white border-r border-slate-200 h-full p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 px-2">
                Portal Menu
              </div>
              <Sidebar
                currentTab={currentTab}
                userRole={userRole}
                user={user}
                onNavigate={(tab) => {
                  setCurrentTab(tab);
                  setMobileMenuOpen(false);
                }}
                collapsed={false}
                onToggleCollapse={() => {}}
                mobileOpen={mobileMenuOpen}
                setMobileOpen={setMobileMenuOpen}
                activeCourseTitle={selectedCourse?.title}
                onResumeCourse={() => {
                  setCurrentTab('course-learning');
                  setMobileMenuOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Screen View Container */}
        <main className="flex-1 min-w-0">
          {currentTab === 'dashboard' && (
            <DashboardScreen
              user={user}
              courses={courses}
              activeCourses={courses}
              skillGaps={skillGaps}
              onNavigate={setCurrentTab}
              onSelectCourse={handleSelectCourse}
              onStartAssessment={handleStartAssessment}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileSkillsScreen
              user={user}
              onUpdateUser={setUser}
              onUpdateProfile={setUser}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'skill-analysis' && (
            <SkillAnalysisScreen
              user={user}
              onNavigate={setCurrentTab}
              onApplyAIPathway={handleApplyAIPathway}
            />
          )}

          {(currentTab === 'learning-path' || currentTab === 'courses') && (
            <RecommendedTrainingScreen
              courses={courses}
              onSelectCourse={handleSelectCourse}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'course-learning' && (
            <CourseLearningScreen
              course={selectedCourse}
              onUpdateCourse={handleUpdateCourse}
              onStartAssessment={handleStartAssessment}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'assessment' && (
            <AssessmentScreen
              assessment={currentAssessment}
              onSubmitAssessment={handleSubmitAssessment}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'assessment-result' && assessmentResult && (
            <AssessmentResultScreen
              result={assessmentResult}
              assessment={currentAssessment}
              onApplyCompetencyUpdate={handleApplyCompetencyUpdate}
              onRetakeAssessment={handleRetakeAssessment}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'progress' && (
            <ProgressScreen
              user={user}
              courses={courses}
              skillGaps={skillGaps}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'knowledge' && (
            <KnowledgeScreen
              resources={knowledgeResources}
              onAddResource={handleAddKnowledgeResource}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'admin' && (
            <AdminScreen
              stats={adminStats}
              courses={courses}
              onNavigate={setCurrentTab}
            />
          )}
        </main>
      </div>

      {/* Floating System Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-teal-950 border border-teal-500/60 text-teal-200 px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

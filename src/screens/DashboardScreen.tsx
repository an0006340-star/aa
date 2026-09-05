import React from 'react';
import {
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  PlayCircle,
  CheckCircle2,
  Compass,
  Star,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { UserProfile, Course, SkillGap, ScreenTab } from '../types';
import { MOCK_COURSES, MOCK_SKILL_GAPS } from '../data/mockData';

interface DashboardScreenProps {
  user: UserProfile;
  courses?: Course[];
  activeCourses?: Course[];
  skillGaps?: SkillGap[];
  onNavigate: (tab: ScreenTab) => void;
  onSelectCourse: (course: Course) => void;
  onStartAssessment?: (courseId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  courses: propCourses,
  activeCourses,
  skillGaps: propSkillGaps,
  onNavigate,
  onSelectCourse,
  onStartAssessment,
}) => {
  const courses = (propCourses && propCourses.length > 0 ? propCourses : activeCourses) || MOCK_COURSES || [];
  const skillGaps = propSkillGaps || MOCK_SKILL_GAPS || [];

  // Find current in-progress course
  const activeCourse = courses.find((c) => c.progress > 0 && c.progress < 100) || courses[0];
  const recommendedCourses = courses.slice(0, 3);

  return (
    <div id="user-dashboard-screen" className="space-y-6 pb-12">
      {/* Bento Top Section: Welcome Banner & Quick Action Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Welcome Hero Tile (8 cols) */}
        <div
          id="dashboard-welcome-banner"
          className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 border border-slate-800 shadow-sm text-white flex flex-col justify-between"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Personalized Civil Service Learning Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {user.name}
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
              {user.role} &bull; <span className="text-slate-400">{user.department}</span>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Target Milestone: <span className="text-teal-300 font-medium">{user.careerGoals}</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
            <button
              id="dash-continue-active-btn"
              type="button"
              onClick={() => {
                onSelectCourse(activeCourse);
                onNavigate('course-learning');
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-slate-950" />
              <span>Continue Learning</span>
            </button>
            <button
              id="dash-quick-skill-analysis-btn"
              type="button"
              onClick={() => onNavigate('skill-analysis')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all hover:text-white"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Run AI Diagnostic</span>
            </button>
          </div>

          {/* Decorative corner glow */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Quick Bento Summary Tile (4 cols) */}
        <div
          id="dashboard-quick-summary-tile"
          className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Agency Standing
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold border border-teal-200">
                Active Cohort
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Top 15% in Department
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              You are on pace to earn your Senior Digital Governance credential 2 weeks ahead of schedule.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Weekly Streak</span>
              <span className="text-base font-bold text-slate-900">4 Weeks Active</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('progress')}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>View Transcript</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards: 4 Bento Metrics */}
      <div id="dashboard-kpi-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Current Competency Level */}
        <div
          id="kpi-competency-level"
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-500/50 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Competency Level
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {user.competencyLevel}
            </span>
            <span className="text-xs font-semibold text-teal-600">
              {user.competencyScore}% Index
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${user.competencyScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Tier 3 of 4 &bull; Next: <span className="text-slate-700 font-medium">Mastery (85%+)</span>
          </p>
        </div>

        {/* Metric 2: Overall Learning Progress */}
        <div
          id="kpi-learning-progress"
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-500/50 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overall Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {user.overallProgress}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              +12% this month
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${user.overallProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            3 of 6 core capacity modules certified
          </p>
        </div>

        {/* Metric 3: Learning Hours */}
        <div
          id="kpi-learning-hours"
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-500/50 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Learning Hours
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {user.learningHours} hrs
            </span>
            <span className="text-xs text-slate-500">of 40 hr target</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (user.learningHours / 40) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            81% of annual agency capacity requirement
          </p>
        </div>

        {/* Metric 4: Recent Assessment Score */}
        <div
          id="kpi-recent-assessment"
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-500/50 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Recent Assessment
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {user.recentAssessmentScore}%
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Certified Pass
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${user.recentAssessmentScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Digital Governance &amp; Ethics (GOV-310)
          </p>
        </div>
      </div>

      {/* Active In-Progress Course Feature Box */}
      <div
        id="dashboard-active-course-card"
        className="bg-white border border-teal-200 rounded-2xl p-6 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
                In-Progress Capacity Module
              </span>
              <span className="text-xs text-slate-500 font-mono font-semibold">{activeCourse.code}</span>
            </div>
            <h2
              className="text-xl font-bold text-slate-900 hover:text-teal-600 transition-colors cursor-pointer"
              onClick={() => {
                onSelectCourse(activeCourse);
                onNavigate('course-learning');
              }}
            >
              {activeCourse.title}
            </h2>
            <p className="text-xs text-slate-600 line-clamp-2 max-w-3xl leading-relaxed">
              {activeCourse.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span>{activeCourse.duration} total</span>
              <span>&bull;</span>
              <span>{activeCourse.completedModules} of {activeCourse.totalModules} modules completed</span>
              <span>&bull;</span>
              <span className="text-teal-700 font-medium">Lead Instructor: {activeCourse.instructor.name}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-2xl font-black text-teal-600">{activeCourse.progress}%</div>
              <div className="text-[11px] text-slate-400 font-medium">Completed</div>
            </div>
            <button
              id="dash-resume-course-btn"
              type="button"
              onClick={() => {
                onSelectCourse(activeCourse);
                onNavigate('course-learning');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Resume Module 4</span>
            </button>
            <button
              id="dash-take-quiz-btn"
              type="button"
              onClick={() => {
                if (activeCourse) {
                  if (onStartAssessment) {
                    onStartAssessment(activeCourse.id);
                  } else {
                    onNavigate('assessment');
                  }
                }
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Take Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${activeCourse.progress}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout: Current Skill Gaps & AI Recommended Pathway */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Current Skill Gaps */}
        <div
          id="dashboard-skill-gaps-container"
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">Identified Skill Gaps</h3>
              </div>
              <button
                onClick={() => onNavigate('skill-analysis')}
                className="text-xs text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
              >
                <span>Diagnostic Report</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Priority competency deficits identified against your target role of{' '}
              <span className="text-slate-800 font-medium">Director of Digital Strategy</span>.
            </p>

            <div className="space-y-3">
              {skillGaps.map((gap) => (
                <div
                  key={gap.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{gap.skillName}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        gap.gapSeverity === 'High'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {gap.gapSeverity} Gap
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                    <span>Current: Level {gap.currentLevel}/5</span>
                    <span>&bull;</span>
                    <span className="text-teal-700 font-semibold">Required: Level {gap.requiredLevel}/5</span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 truncate max-w-[220px]">
                      Bridged by: <span className="text-slate-800 font-medium">{gap.recommendedCourseTitle}</span>
                    </span>
                    <button
                      onClick={() => {
                        const target = courses.find((c) => c.id === gap.recommendedCourseId) || courses[0];
                        onSelectCourse(target);
                        onNavigate('course-learning');
                      }}
                      className="text-teal-600 hover:text-teal-700 font-bold text-[11px] flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      Enroll &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>3 Critical Gaps tracked</span>
            <button
              onClick={() => onNavigate('profile')}
              className="text-teal-600 font-medium hover:underline cursor-pointer"
            >
              Update Profile Skills
            </button>
          </div>
        </div>

        {/* Right: AI Recommended Learning Pathway Card */}
        <div
          id="dashboard-ai-pathway-container"
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">AI-Recommended Pathway</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-semibold font-mono">
                Simulated AI Diagnostic
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Generated roadmap optimized for executive digital governance and cross-agency transformation.
            </p>

            <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-5 top-0.5 w-3 h-3 rounded-full bg-teal-500 ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-teal-700">
                    Phase 1: Evidence &amp; Quantitative Literacy
                  </h4>
                  <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">Active &bull; 60%</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  DAT-401: Data Literacy &amp; Evidence-Based Policy
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-5 top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">
                    Phase 2: Digital Governance &amp; Ethics Guardrails
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">Certified</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  GOV-310: Algorithmic Oversight &amp; Citizen Privacy
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-5 top-0.5 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-600">
                    Phase 3: Agile Change Architecture &amp; Adoption
                  </h4>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Queued</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  CHG-502: Overcoming Bureaucratic Inertia in Gov
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Total Pathway Duration: 24.5 Hours</span>
            <button
              id="dash-view-full-path-btn"
              onClick={() => onNavigate('learning-path')}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Full Pathway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Courses Section */}
      <div id="dashboard-recommended-courses" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recommended Courses For Your Role</h3>
            <p className="text-xs text-slate-500">
              Curated by organizational learning algorithms to address priority skill gaps
            </p>
          </div>
          <button
            id="dash-browse-all-courses-btn"
            onClick={() => onNavigate('courses')}
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({courses.length}) Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-400 hover:shadow-sm flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {course.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {course.difficulty}
                  </span>
                </div>

                <h4
                  onClick={() => {
                    onSelectCourse(course);
                    onNavigate('course-learning');
                  }}
                  className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors cursor-pointer leading-snug"
                >
                  {course.title}
                </h4>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    {course.totalModules} modules
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold text-slate-700">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        course.progress === 100
                          ? 'bg-emerald-500'
                          : course.progress > 0
                          ? 'bg-teal-500'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 truncate max-w-[130px]">
                  {course.instructor.name}
                </span>
                <button
                  onClick={() => {
                    onSelectCourse(course);
                    onNavigate('course-learning');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{course.progress > 0 ? (course.progress === 100 ? 'Review' : 'Continue') : 'Start'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

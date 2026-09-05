import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  BrainCircuit,
  Compass,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Share2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  HelpCircle,
} from 'lucide-react';
import { ScreenTab, UserRole, UserProfile } from '../types';

export interface SidebarProps {
  currentTab: ScreenTab;
  userRole?: UserRole;
  user?: UserProfile;
  onNavigate: (tab: ScreenTab) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  activeCourseTitle?: string;
  onResumeCourse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  userRole = 'learner',
  user,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  setMobileOpen,
  activeCourseTitle = 'Data Literacy & Evidence-Based Policy',
  onResumeCourse,
}) => {
  const skillCount = user?.currentSkills?.length ?? 5;
  const overallProgress = user?.overallProgress ?? 68;

  const navItems = [
    {
      id: 'dashboard' as ScreenTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      id: 'profile' as ScreenTab,
      label: 'My Profile & Skills',
      icon: UserCheck,
      badge: `${skillCount} skills`,
    },
    {
      id: 'skill-analysis' as ScreenTab,
      label: 'AI Skill Analysis',
      icon: BrainCircuit,
      badge: 'AI Diagnostic',
      badgeColor: 'bg-teal-50 text-teal-800 border border-teal-200',
    },
    {
      id: 'learning-path' as ScreenTab,
      label: 'Recommended Path',
      icon: Compass,
      badge: '3 Gaps',
      badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200',
    },
    {
      id: 'courses' as ScreenTab,
      label: 'Courses Catalog',
      icon: BookOpen,
      badge: '6 Courses',
    },
    {
      id: 'assessment' as ScreenTab,
      label: 'Assessments & Quizzes',
      icon: ClipboardCheck,
      badge: 'Certified',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    },
    {
      id: 'progress' as ScreenTab,
      label: 'Competency & Progress',
      icon: TrendingUp,
      badge: undefined,
    },
    {
      id: 'knowledge' as ScreenTab,
      label: 'Knowledge Sharing',
      icon: Share2,
      badge: 'Resources',
    },
  ];

  const handleNavClick = (tab: ScreenTab) => {
    onNavigate(tab);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white border border-slate-200 text-slate-700 select-none rounded-3xl shadow-xs overflow-hidden p-2 sm:p-3">
      {/* Portal Category Header */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        {!collapsed && (
          <>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Capacity Portal
            </p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-200">
              Gov-Core
            </span>
          </>
        )}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto cursor-pointer"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentTab === item.id ||
            (item.id === 'courses' && currentTab === 'course-learning') ||
            (item.id === 'assessment' && currentTab === 'assessment-result') ||
            (item.id === 'learning-path' && currentTab === 'learning-path');

          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              type="button"
              onClick={() => handleNavClick(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full group flex items-center ${
                collapsed ? 'justify-center px-2' : 'justify-between px-3'
              } py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-600'
                  }`}
                />
                {!collapsed && <span className="truncate text-left">{item.label}</span>}
              </div>
              {!collapsed && item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeColor || 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Administration Section */}
        <div className="pt-3 pb-1 px-2">
          {!collapsed && (
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Agency Governance
            </p>
          )}
        </div>

        <button
          id="nav-link-admin"
          type="button"
          onClick={() => handleNavClick('admin')}
          title={collapsed ? 'Executive Console' : undefined}
          className={`w-full group flex items-center ${
            collapsed ? 'justify-center px-2' : 'justify-between px-3'
          } py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
            currentTab === 'admin'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <ShieldAlert
              className={`w-4 h-4 shrink-0 ${
                currentTab === 'admin' ? 'text-teal-400' : 'text-slate-400 group-hover:text-teal-600'
              }`}
            />
            {!collapsed && <span className="truncate">Executive Console</span>}
          </div>
          {!collapsed && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                currentTab === 'admin'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-400/40'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Director
            </span>
          )}
        </button>
      </nav>

      {/* Bento Grid Support Box (when expanded) */}
      {!collapsed && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl mb-2">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Capacity Support</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Need guidance with your competency assessment or curriculum?
          </p>
          <button
            type="button"
            onClick={() => handleNavClick('knowledge')}
            className="w-full mt-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Access Resources
          </button>
        </div>
      )}

      {/* Mini Active Course Card in bottom sidebar (when expanded) */}
      {!collapsed && (
        <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200/60">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="font-bold text-teal-900">Enrolled Track</span>
            <span className="text-teal-700 font-extrabold">{overallProgress}%</span>
          </div>
          <p className="text-xs font-bold text-slate-900 truncate" title={activeCourseTitle}>
            {activeCourseTitle}
          </p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden my-2">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <button
            id="sidebar-resume-course-btn"
            type="button"
            onClick={() => {
              if (onResumeCourse) onResumeCourse();
              else handleNavClick('course-learning');
            }}
            className="w-full py-1.5 px-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Continue Course</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside
        id="desktop-sidebar"
        className={`hidden lg:block ${
          collapsed ? 'w-20' : 'w-64'
        } h-[calc(100vh-4.5rem)] sticky top-20 shrink-0 transition-all duration-300`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer (Overlay) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen && setMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-50 p-2 shadow-2xl animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};

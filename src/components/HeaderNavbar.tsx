import React, { useState } from 'react';
import {
  Bell,
  Search,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react';
import { UserProfile, UserRole, ScreenTab } from '../types';

interface HeaderNavbarProps {
  user: UserProfile;
  userRole: UserRole;
  currentTab: ScreenTab;
  onNavigate: (tab: ScreenTab) => void;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  user,
  userRole,
  currentTab,
  onNavigate,
  onRoleChange,
  onLogout,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Module Available',
      text: 'Module 4: Predictive Modeling & Algorithmic Guardrails is now ready.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Quarterly Competency Audit',
      text: 'Your updated skill gap diagnostic has been saved to your profile.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 3,
      title: 'Certification Ready',
      text: 'Digital Governance & Public Sector Ethics certificate is available for export.',
      time: '3 days ago',
      unread: false,
    },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 bg-white border-b border-slate-200 text-slate-900 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile menu button & Brand */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo & Name */}
            <div
              id="brand-logo-container"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-sm shadow-teal-500/30">
                <span>C</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                    CapacityConnect
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 rounded-full">
                    Enterprise Gov
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 hidden sm:block">
                  Digital Capacity Building &amp; Learning Portal
                </span>
              </div>
            </div>
          </div>

          {/* Center: Bento Search input */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-150 px-4 py-2 rounded-full w-full border border-slate-200/80 focus-within:border-teal-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                id="global-portal-search"
                type="text"
                placeholder="Search courses, competencies, or resources..."
                className="w-full bg-transparent border-none text-xs text-slate-800 placeholder-slate-400 outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigate('courses');
                  }
                }}
              />
            </div>
          </div>

          {/* Right: Role Switcher, Notifications, User Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Demo Role Switcher */}
            <div
              id="role-switcher-container"
              className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs"
            >
              <button
                id="switch-learner-role-btn"
                type="button"
                onClick={() => {
                  onRoleChange('learner');
                  if (currentTab === 'admin') onNavigate('dashboard');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  userRole === 'learner'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View portal as Learner"
              >
                Learner
              </button>
              <button
                id="switch-admin-role-btn"
                type="button"
                onClick={() => {
                  onRoleChange('admin');
                  onNavigate('admin');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  userRole === 'admin'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View portal as Organizational Admin"
              >
                <ShieldCheck className="w-3 h-3" />
                Admin
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notifications-toggle-btn"
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <div
                  id="notifications-dropdown-menu"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Agency Notifications
                    </span>
                    <span className="text-[11px] text-teal-600 font-semibold cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 text-xs hover:bg-slate-50 transition-colors cursor-pointer ${
                          item.unread ? 'bg-teal-50/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-slate-800 font-medium">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-slate-400">{item.time}</span>
                        </div>
                        <p className="text-slate-500 mt-1 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate('progress');
                      }}
                      className="text-xs text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      View All Learning Activity &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar & Dropdown */}
            <div className="relative pl-3 border-l border-slate-200">
              <button
                id="user-profile-menu-btn"
                type="button"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-teal-100 border-2 border-teal-500 flex items-center justify-center text-teal-700 font-bold text-xs">
                  {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-slate-500 italic">
                    {userRole === 'admin' ? 'System Administrator' : user.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
              </button>

              {showUserMenu && (
                <div
                  id="user-dropdown-menu"
                  className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-slate-800"
                >
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] font-semibold text-teal-700">
                      <span>Level: {user.competencyLevel}</span>
                      <span>({user.competencyScore}%)</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-600 flex items-center gap-2 font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      View Profile &amp; Skills
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('skill-analysis');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-600 flex items-center gap-2 font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                      AI Skill Analysis
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('progress');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-600 flex items-center gap-2 font-medium"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Certificates &amp; Transcripts
                    </button>
                    {userRole === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-900 hover:bg-slate-50 flex items-center gap-2 font-bold"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                        Admin Management Console
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out / Switch Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  BookOpen,
  Calendar,
  Download,
  AlertTriangle,
  Layers,
  Sparkles,
  BarChart3,
  Compass,
} from 'lucide-react';
import { UserProfile, Course, SkillGap, ScreenTab } from '../types';

interface ProgressScreenProps {
  user: UserProfile;
  courses?: Course[];
  skillGaps?: SkillGap[];
  onNavigate: (tab: ScreenTab) => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  user,
  courses = [],
  skillGaps = [],
  onNavigate,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Quarter' | 'Year'>('Quarter');

  const completedCourses = courses.filter((c) => c.progress === 100);
  const inProgressCourses = courses.filter((c) => c.progress > 0 && c.progress < 100);

  // Monthly Learning Hours Data for custom SVG Bar Chart
  const monthlyHours = [
    { month: 'Apr', hours: 5.5, target: 6.0 },
    { month: 'May', hours: 8.0, target: 6.0 },
    { month: 'Jun', hours: 6.0, target: 6.0 },
    { month: 'Jul', hours: 9.5, target: 6.0 },
    { month: 'Aug', hours: 7.0, target: 6.0 },
    { month: 'Sep', hours: 6.5, target: 6.0 },
  ];

  const maxHours = 12;

  // Domain competency averages
  const domainAverages = [
    { domain: 'Data Literacy & Analytics', score: 76, color: 'bg-teal-600' },
    { domain: 'Digital Governance & Law', score: 92, color: 'bg-emerald-600' },
    { domain: 'Agile Operations & Change', score: 72, color: 'bg-cyan-600' },
    { domain: 'Strategic Communication', score: 88, color: 'bg-indigo-600' },
    { domain: 'Security & Risk Resilience', score: 64, color: 'bg-amber-500' },
  ];

  return (
    <div id="progress-competency-screen" className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
              <span>Accredited Civil Service Competency Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Progress &amp; Competency Intelligence
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Track longitudinal capability development, statutory learning credits, and verified assessment scores.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert('Official Competency Transcript (PDF) generated with cryptographic agency signature.')}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal-600" />
            <span>Export Official Transcript</span>
          </button>
        </div>
      </div>

      {/* KPI Top Row: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Overall Competency
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{user.competencyScore}%</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {user.competencyLevel}
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full" style={{ width: `${user.competencyScore}%` }} />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Level 3 of 4 in Senior Civil Rank</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Completed Modules
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">
              {completedCourses.length} <span className="text-sm font-normal text-slate-400">/ {courses.length}</span>
            </span>
            <span className="text-xs text-emerald-700 font-bold">1 In Progress</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${(completedCourses.length / courses.length) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">12 Modules Completed Overall</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Accredited Hours
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{user.learningHours}</span>
            <span className="text-xs text-slate-500 font-medium">Hours</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (user.learningHours / 40) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target: 40.0 Annual Mandate</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Assessment Avg.
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">88%</span>
            <span className="text-xs font-bold text-emerald-700">100% Pass Rate</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-600 h-full rounded-full" style={{ width: '88%' }} />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Top 15% across Agency Cohort</p>
        </div>
      </div>

      {/* Two Column Layout: Charts & Domain Skill Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Custom SVG Bar Chart of Learning Hours */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Monthly Capacity Hours Log
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Past 6 Months</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Statutory time spent across interactive lectures, workshops, and certified assessments.
          </p>

          {/* SVG Bar Chart */}
          <div className="pt-6">
            <div className="h-48 flex items-end justify-between gap-3 px-2 border-b border-slate-100 pb-2">
              {monthlyHours.map((item, idx) => {
                const barHeightPercent = (item.hours / maxHours) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] text-teal-700 font-bold opacity-80 group-hover:opacity-100">
                      {item.hours}h
                    </span>
                    <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl h-36 flex items-end overflow-hidden p-0.5">
                      <div
                        className="w-full bg-teal-600 rounded-t-lg transition-all duration-500 group-hover:bg-teal-700"
                        style={{ height: `${barHeightPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" />
                Actual Dedicated Hours
              </span>
              <span className="text-teal-700 font-bold">Monthly Target: 6.0 hrs</span>
            </div>
          </div>
        </div>

        {/* Right: Skill-wise Domain Proficiency Breakdown */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Competency Domain Index
              </h3>
            </div>
            <span className="text-xs text-teal-700 font-bold">5 Core Domains</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Composite rating calculated from multiple-choice testing, rubric evaluations, and completed modules.
          </p>

          <div className="space-y-4 pt-2">
            {domainAverages.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{item.domain}</span>
                  <span className="font-mono font-bold text-slate-900">{item.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Gaps Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Active Capability Gaps Tracking
            </h3>
          </div>
          <button
            onClick={() => onNavigate('skill-analysis')}
            className="text-xs text-teal-700 hover:text-teal-800 font-bold cursor-pointer"
          >
            Re-run Diagnostic &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Competency Skill</th>
                <th className="pb-3 font-bold">Category</th>
                <th className="pb-3 font-bold">Current Level</th>
                <th className="pb-3 font-bold">Required Level</th>
                <th className="pb-3 font-bold">Gap Severity</th>
                <th className="pb-3 font-bold">Curricular Remedy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skillGaps.map((gap) => (
                <tr key={gap.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900">{gap.skillName}</td>
                  <td className="py-3.5 text-slate-500">{gap.category}</td>
                  <td className="py-3.5 text-slate-700 font-mono font-medium">Level {gap.currentLevel}/5</td>
                  <td className="py-3.5 text-teal-800 font-mono font-bold">Level {gap.requiredLevel}/5</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        gap.gapSeverity === 'High'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {gap.gapSeverity}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <button
                      onClick={() => {
                        const target = courses.find((c) => c.id === gap.recommendedCourseId) || courses[0];
                        onNavigate('courses');
                      }}
                      className="text-teal-700 hover:text-teal-800 hover:underline font-semibold text-left truncate max-w-[220px] block cursor-pointer"
                    >
                      {gap.recommendedCourseTitle}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Learning Pathway Stage Tracker */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Learning Pathway Milestone Tracker
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Target Role: Director of Digital Strategy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-teal-800">
              <span>Phase 1: Foundations</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                80% Done
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium">Data Literacy &amp; Evidence-Based Policy</p>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full w-4/5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Phase 2: Governance &amp; Trust</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                100% Done
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Algorithmic Oversight &amp; Public Trust</p>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full w-full" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Phase 3: Executive Leadership</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-bold">
                Queued
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Agile Change Management in Public Orgs</p>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-slate-300 h-full rounded-full w-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

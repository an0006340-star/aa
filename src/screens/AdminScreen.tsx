import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Award,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Plus,
  Edit2,
  Search,
  Filter,
  BarChart3,
  Layers,
  Settings,
  Download,
  Building,
} from 'lucide-react';
import { AdminStats, Course, ScreenTab } from '../types';

interface AdminScreenProps {
  stats: AdminStats;
  courses: Course[];
  onNavigate: (tab: ScreenTab) => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  stats,
  courses,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'assessments'>('overview');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [addCourseSuccess, setAddCourseSuccess] = useState(false);

  return (
    <div id="admin-dashboard-screen" className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs text-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
              <span>Executive Administration Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Workforce Capacity &amp; Agency Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Real-time oversight of civil service competency baselines, cross-departmental skill deficits,
              curriculum deployment, and credential issuance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert('Exporting Comprehensive Agency Competency Report (CSV/PDF)...')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-teal-600" />
              <span>Export Workforce Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex max-w-md shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Workforce Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('courses')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Course Management
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('assessments')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'assessments'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Assessment Audits
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* 4 Core Organizational KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Total Learners</span>
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  {stats.totalLearners.toLocaleString()}
                </span>
                <span className="text-xs text-teal-700 font-bold">14 Bureaus</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Enrolled civil servants in portal</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Active Learners</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  {stats.activeLearners.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-700 font-bold">
                  {Math.round((stats.activeLearners / stats.totalLearners) * 100)}% Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Active in last 30 days</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Course Completion</span>
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  {stats.courseCompletionRate}%
                </span>
                <span className="text-xs text-emerald-700 font-bold">+4.2% vs Q1</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Exceeds federal benchmark (75%)</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Average Assessment</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  {stats.averageAssessmentScore}%
                </span>
                <span className="text-xs text-amber-700 font-bold">100% Pass Metric</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Across 3,240 completed quizzes</p>
            </div>
          </div>

          {/* Competency Distribution & Skill Gaps Across Org */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Competency Distribution */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                  Workforce Competency Distribution
                </h3>
                <span className="text-xs text-slate-500 font-medium">{stats.totalLearners} Evaluated</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Distribution of agency staff across standardized competency tiers.
              </p>

              <div className="space-y-4 pt-2">
                {stats.competencyDistribution.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">
                        {item.level} ({item.count} staff)
                      </span>
                      <span className="font-mono font-bold text-slate-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.level === 'Mastery'
                            ? 'bg-amber-500'
                            : item.level === 'Advanced'
                            ? 'bg-emerald-600'
                            : item.level === 'Proficient'
                            ? 'bg-teal-600'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Performance */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-4 h-4 text-teal-600" />
                  Department Capacity Rankings
                </h3>
                <span className="text-xs text-teal-700 font-bold">Q2 Benchmark</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {stats.departmentPerformance.map((dept, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{dept.department}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {dept.learners} learners &bull; Avg Score: {dept.avgScore}%
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                        {dept.completionRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Critical Skill Gaps Across Organization */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Cross-Organizational Skill Gaps Heatmap
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-risk deficit areas requiring targeted cohort learning pathways
                </p>
              </div>
              <button
                onClick={() => alert('Cohort upskilling campaign scheduled for next sprint.')}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer shadow-xs"
              >
                Schedule Cohort Training
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-bold">Identified Skill Deficit</th>
                    <th className="pb-3 font-bold">Impacted Directorate</th>
                    <th className="pb-3 font-bold">Deficit Gap %</th>
                    <th className="pb-3 font-bold">Urgency Level</th>
                    <th className="pb-3 font-bold">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.skillGapsAcrossOrg.map((gap, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 font-bold text-slate-900">{gap.skill}</td>
                      <td className="py-3.5 text-slate-600">{gap.department}</td>
                      <td className="py-3.5 font-mono text-rose-600 font-bold">{gap.gapPercentage}% Gap</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            gap.urgency === 'Critical'
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : gap.urgency === 'Moderate'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-teal-50 text-teal-800 border border-teal-200'
                          }`}
                        >
                          {gap.urgency}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="text-teal-700 hover:text-teal-800 hover:underline font-bold cursor-pointer">
                          Deploy Module Track &rarr;
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Tab: Course Content Management */}
      {activeTab === 'courses' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                Curriculum &amp; Course Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Maintain agency training modules, syllabus standards, and accredited instructors
              </p>
            </div>

            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Code</th>
                  <th className="pb-3 font-bold">Course Title</th>
                  <th className="pb-3 font-bold">Domain</th>
                  <th className="pb-3 font-bold">Modules</th>
                  <th className="pb-3 font-bold">Enrolled</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 font-mono text-teal-700 font-bold">{c.code}</td>
                    <td className="py-3.5 font-bold text-slate-900">{c.title}</td>
                    <td className="py-3.5 text-slate-500">{c.category}</td>
                    <td className="py-3.5 text-slate-600">{c.totalModules} Units</td>
                    <td className="py-3.5 font-mono text-slate-600">{c.enrolledCount} learners</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        Published Active
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => alert(`Editing curriculum settings for ${c.title}`)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-slate-500" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Assessment Management */}
      {activeTab === 'assessments' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                Standardized Certification Assessments
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure pass marks, test banks, and randomized time limits
              </p>
            </div>
            <button
              onClick={() => alert('New assessment questionnaire created in draft mode.')}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Assessment</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Assessment Name</th>
                  <th className="pb-3 font-bold">Course Ref</th>
                  <th className="pb-3 font-bold">Questions</th>
                  <th className="pb-3 font-bold">Duration</th>
                  <th className="pb-3 font-bold">Pass Standard</th>
                  <th className="pb-3 font-bold">Avg Score</th>
                  <th className="pb-3 font-bold text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900">
                    Data Literacy &amp; Quantitative Analysis Certification
                  </td>
                  <td className="py-3.5 text-slate-500 font-mono">DAT-401</td>
                  <td className="py-3.5 text-slate-600">10 Questions (MCQ)</td>
                  <td className="py-3.5 text-slate-600 font-mono">15 Mins</td>
                  <td className="py-3.5 text-teal-700 font-bold">70%</td>
                  <td className="py-3.5 text-emerald-700 font-bold">84.2%</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onNavigate('assessment')}
                      className="text-teal-700 hover:text-teal-800 hover:underline font-bold cursor-pointer"
                    >
                      Inspect Quiz &rarr;
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900">
                    Digital Governance &amp; Public Sector Ethics Examination
                  </td>
                  <td className="py-3.5 text-slate-500 font-mono">GOV-310</td>
                  <td className="py-3.5 text-slate-600">10 Questions (MCQ)</td>
                  <td className="py-3.5 text-slate-600 font-mono">20 Mins</td>
                  <td className="py-3.5 text-teal-700 font-bold">75%</td>
                  <td className="py-3.5 text-emerald-700 font-bold">89.6%</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onNavigate('assessment')}
                      className="text-teal-700 hover:text-teal-800 hover:underline font-bold cursor-pointer"
                    >
                      Inspect Quiz &rarr;
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-black text-base text-slate-900">Deploy New Capacity Module</h3>
            <p className="text-xs text-slate-500">
              Configure curriculum metadata for organizational broadcast.
            </p>
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Course Code &amp; Title</label>
                <input
                  type="text"
                  placeholder="e.g. POL-550: Municipal Policy Innovation"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Competency Domain</label>
                <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500">
                  <option>Data Literacy &amp; Analytics</option>
                  <option>Digital Governance &amp; Ethics</option>
                  <option>Agile Change Management</option>
                  <option>Public Leadership</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Duration &amp; Total Modules</label>
                <input
                  type="text"
                  placeholder="e.g. 4.0 Hours &bull; 4 Modules"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddCourseModal(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddCourseModal(false);
                  alert('Course published to staging curriculum registry!');
                }}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Publish Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

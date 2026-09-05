import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Course, CourseModule, ScreenTab } from '../types';

interface CourseLearningScreenProps {
  course: Course;
  onUpdateCourse: (updatedCourse: Course) => void;
  onStartAssessment: (courseId: string) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const CourseLearningScreen: React.FC<CourseLearningScreenProps> = ({
  course,
  onUpdateCourse,
  onStartAssessment,
  onNavigate,
}) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'modules' | 'notes' | 'resources'>('modules');
  const [userNotes, setUserNotes] = useState<string>(
    'Key takeaway: When drafting executive memos, ensure statistical confidence intervals are cited rather than single-point estimates. Always audit proxy variables for disparate impact.'
  );
  const [notesSaved, setNotesSaved] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');

  const currentModule = course.modules[activeModuleIndex] || course.modules[0];

  const handleToggleModuleComplete = (moduleIndex: number) => {
    const updatedModules = [...course.modules];
    const isNowCompleted = !updatedModules[moduleIndex].completed;
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      completed: isNowCompleted,
    };

    const completedCount = updatedModules.filter((m) => m.completed).length;
    const newProgress = Math.round((completedCount / updatedModules.length) * 100);

    const updatedCourse: Course = {
      ...course,
      modules: updatedModules,
      completedModules: completedCount,
      progress: newProgress,
    };

    onUpdateCourse(updatedCourse);
  };

  const handleSaveNotes = () => {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownloadResource = (resTitle: string) => {
    setDownloadToast(`Downloaded: ${resTitle}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div id="course-learning-screen" className="space-y-6 pb-12">
      {/* Top Breadcrumb and Course Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button
                onClick={() => onNavigate('courses')}
                className="hover:text-teal-600 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>All Courses</span>
              </button>
              <span>/</span>
              <span className="text-teal-700 font-mono font-bold">{course.code}</span>
              <span>/</span>
              <span className="text-slate-700 truncate max-w-xs">{course.title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {course.title}
            </h1>
            <p className="text-xs text-slate-500">
              Instructor: <span className="text-slate-800 font-semibold">{course.instructor.name}</span> &bull;{' '}
              {course.instructor.title}, {course.instructor.organization}
            </p>
          </div>

          {/* Right Action: Take Assessment */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Course Progress</div>
              <div className="text-lg font-black text-teal-600">{course.progress}%</div>
            </div>
            <button
              id="learning-take-assessment-top-btn"
              type="button"
              onClick={() => onStartAssessment(course.id)}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-white" />
              <span>Take Competency Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {downloadToast && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Main Two-Column Learning Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3: Video Player Placeholder & Module Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Video Player Placeholder */}
          <div
            id="video-player-container"
            className="relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-md aspect-video flex flex-col justify-between group"
          >
            {/* Simulated Video Canvas / Visual Area */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-950/40 flex items-center justify-center p-6 text-center">
              {/* Abstract decorative grid */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 max-w-lg space-y-3">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-500/20 border-2 border-teal-400 text-teal-300 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-teal-300" />
                  ) : (
                    <Play className="w-8 h-8 text-teal-300 fill-teal-300 ml-1" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-500/30">
                    Video Learning Area (Simulated Stream)
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-2">
                    {currentModule.videoPlaceholderTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Duration: {currentModule.duration} &bull; 1080p Public Sector GovCloud Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="relative z-20 mt-auto bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 space-y-2">
              {/* Scrub bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div className="bg-teal-400 h-full rounded-full w-2/5 transition-all" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">
                    18:42 / {currentModule.duration}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer">
                    <Volume2 className="w-4 h-4" />
                    <div className="w-12 bg-slate-700 h-1 rounded-full hidden sm:block">
                      <div className="bg-teal-400 h-full rounded-full w-3/4" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
                      const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(next);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-teal-300 hover:bg-slate-700 cursor-pointer"
                  >
                    {playbackSpeed}
                  </button>
                  <button type="button" className="p-1 hover:text-teal-400 cursor-pointer" title="Full Screen">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Module Information & Action Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Current Active Module
                </span>
                <h2 className="text-lg font-bold text-slate-900">{currentModule.title}</h2>
              </div>

              {/* Mark Complete Button */}
              <button
                id="toggle-module-complete-btn"
                type="button"
                onClick={() => handleToggleModuleComplete(activeModuleIndex)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  currentModule.completed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{currentModule.completed ? 'Module Completed' : 'Mark as Completed'}</span>
              </button>
            </div>

            {/* Summary */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentModule.summary}
            </p>

            {/* Key Takeaways */}
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Key Competency Takeaways
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentModule.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Module Pagination */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={activeModuleIndex === 0}
                onClick={() => setActiveModuleIndex(activeModuleIndex - 1)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Module</span>
              </button>

              <span className="text-xs text-slate-500 font-medium">
                Module {activeModuleIndex + 1} of {course.modules.length}
              </span>

              <button
                type="button"
                disabled={activeModuleIndex === course.modules.length - 1}
                onClick={() => setActiveModuleIndex(activeModuleIndex + 1)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Next Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1/3: Sidebar Tabs (Modules, Notes, Resources) */}
        <div className="space-y-4">
          {/* Tab Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('modules')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'modules'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Modules ({course.completedModules}/{course.totalModules})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              My Notes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('resources')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Resources ({course.resources.length})
            </button>
          </div>

          {/* Tab Content: Modules Checklist */}
          {activeTab === 'modules' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Course Syllabus
                </span>
                <span className="text-xs text-teal-700 font-bold">{course.progress}% Complete</span>
              </div>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {course.modules.map((mod, idx) => {
                  const isCurrent = idx === activeModuleIndex;

                  return (
                    <div
                      key={mod.id}
                      onClick={() => setActiveModuleIndex(idx)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-teal-50 border-teal-300 shadow-xs ring-1 ring-teal-400/40'
                          : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleModuleComplete(idx);
                          }}
                          className="mt-0.5 text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
                        >
                          {mod.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-semibold line-clamp-2 ${
                              isCurrent ? 'text-teal-950 font-bold' : 'text-slate-700'
                            }`}
                          >
                            {mod.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                            <span>{mod.duration}</span>
                            {mod.completed && (
                              <span className="text-emerald-700 font-semibold">&bull; Completed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Assessment CTA inside modules panel */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  id="learning-take-assessment-sidebar-btn"
                  type="button"
                  onClick={() => onStartAssessment(course.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Take Competency Assessment</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab Content: Personal Notes */}
          {activeTab === 'notes' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Personal Study Notes
                </span>
                <span className="text-[11px] text-slate-400">Auto-saved to profile</span>
              </div>
              <textarea
                rows={12}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Take lecture notes, quote statutory references, or record questions..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 leading-relaxed"
              />
              <div className="flex items-center justify-between pt-1">
                {notesSaved ? (
                  <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Notes Saved!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Press Save to commit to file</span>
                )}
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {/* Tab Content: Course Resources */}
          {activeTab === 'resources' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Accompanying Downloads
                </span>
                <span className="text-xs text-teal-700 font-semibold">{course.resources.length} files</span>
              </div>

              <div className="space-y-2.5">
                {course.resources.map((res) => (
                  <div
                    key={res.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-semibold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate" title={res.title}>
                          {res.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {res.type} &bull; {res.size}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadResource(res.title)}
                      className="p-2 rounded-xl bg-slate-200 hover:bg-teal-600 hover:text-white text-slate-700 transition-colors shrink-0 cursor-pointer"
                      title="Download Resource"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

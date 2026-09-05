import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Star,
  Users,
} from 'lucide-react';
import { Course, ScreenTab } from '../types';

interface RecommendedTrainingScreenProps {
  courses?: Course[];
  onSelectCourse: (course: Course) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const RecommendedTrainingScreen: React.FC<RecommendedTrainingScreenProps> = ({
  courses = [],
  onSelectCourse,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Data Literacy',
    'Digital Governance',
    'Change Management',
    'Leadership',
    'Communication',
    'Security & Risk',
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skillCompetency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="recommended-training-screen" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Tailored To Identified Skill Gaps</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Personalized Capacity Training Courses
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Curriculum dynamically sequenced to bridge your verified capability deficits in Data Literacy,
              Governance, and Change Leadership.
            </p>
          </div>

          <button
            onClick={() => onNavigate('skill-analysis')}
            className="self-start sm:self-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Update AI Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isCompleted = course.progress === 100;
          const isInProgress = course.progress > 0 && course.progress < 100;

          return (
            <div
              key={course.id}
              id={`training-card-${course.id}`}
              className="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-5 shadow-xs hover:shadow-md flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {course.category}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      course.difficulty === 'Beginner'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : course.difficulty === 'Intermediate'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {course.difficulty}
                  </span>
                </div>

                {/* Course Title */}
                <h3
                  onClick={() => {
                    onSelectCourse(course);
                    onNavigate('course-learning');
                  }}
                  className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors cursor-pointer leading-snug"
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Targeted Competency Tag */}
                <div className="mt-3 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-1.5">
                  <span className="font-semibold text-teal-700">Competency:</span>
                  <span className="truncate">{course.skillCompetency}</span>
                </div>

                {/* Recommendation Reason */}
                {course.recommendedReason && (
                  <div className="mt-2 p-1.5 rounded-lg bg-amber-50 border border-amber-200/70 text-[10px] text-amber-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">{course.recommendedReason}</span>
                  </div>
                )}

                {/* Metadata Row */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    {course.totalModules} modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    {course.rating}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Progress</span>
                    <span className="font-bold text-slate-700">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isInProgress
                          ? 'bg-teal-500'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  <span className="block truncate max-w-[120px] font-semibold text-slate-700">
                    {course.instructor.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {course.enrolledCount} enrolled
                  </span>
                </div>

                <button
                  id={`btn-open-course-${course.id}`}
                  onClick={() => {
                    onSelectCourse(course);
                    onNavigate('course-learning');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : isInProgress
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                      : 'bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 border border-teal-200'
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Review Modules' : isInProgress ? 'Continue' : 'Start Course'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

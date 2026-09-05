import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Share2,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  FileBadge,
} from 'lucide-react';
import { AssessmentResult, Assessment, ScreenTab } from '../types';

interface AssessmentResultScreenProps {
  result: AssessmentResult;
  assessment: Assessment;
  onApplyCompetencyUpdate: () => void;
  onRetakeAssessment: () => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const AssessmentResultScreen: React.FC<AssessmentResultScreenProps> = ({
  result,
  assessment,
  onApplyCompetencyUpdate,
  onRetakeAssessment,
  onNavigate,
}) => {
  const [showQuestionBreakdown, setShowQuestionBreakdown] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCertificate = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div id="assessment-result-screen" className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Hero Banner with Score */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <FileBadge className="w-3.5 h-3.5 text-teal-600" />
              <span>Assessment Completed &bull; {result.submittedAt}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Evaluation Results &amp; Competency Audit
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Course: <span className="text-slate-800 font-semibold">{result.courseTitle}</span>
            </p>
          </div>

          {/* Radial Score Gauge Badge */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={result.passed ? 'text-teal-600' : 'text-rose-600'}
                  strokeDasharray={`${result.score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-black text-slate-900">{result.score}%</span>
              </div>
            </div>

            <div>
              <div
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block ${
                  result.passed
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {result.passed ? 'Accredited Pass' : 'Not Certified'}
              </div>
              <div className="text-xs text-slate-700 mt-1 font-semibold">
                Status: {result.competencyAttainment}
              </div>
              <div className="text-[11px] text-slate-400">
                Min 70% threshold required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Metric Summary Boxes: Correct, Incorrect, Time Spent */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px]">
              Correct Answers
            </span>
            <div className="text-2xl font-black text-emerald-600">
              {result.correctAnswers} <span className="text-xs font-normal text-slate-400">/ {result.totalQuestions}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px]">
              Incorrect Answers
            </span>
            <div className="text-2xl font-black text-rose-600">
              {result.incorrectAnswers} <span className="text-xs font-normal text-slate-400">/ {result.totalQuestions}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px]">
              Time Elapsed
            </span>
            <div className="text-2xl font-black text-teal-700">
              {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Personalized Feedback & Analysis Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Feedback block */}
        <div>
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            Evaluator Feedback &amp; Performance Review
          </h2>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
            {result.personalizedFeedback}
          </div>
        </div>

        {/* Strengths & Improvement Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Demonstrated Strengths
              </h3>
            </div>
            <div className="space-y-2">
              {result.strengths.map((str, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Target Areas for Improvement
              </h3>
            </div>
            <div className="space-y-2">
              {result.areasForImprovement.map((gap, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Next Learning Step */}
        <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-teal-800">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>Recommended Next Pathway Step</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{result.recommendedNextStep.title}</h4>
            <p className="text-xs text-slate-600 max-w-xl">
              {result.recommendedNextStep.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('learning-path')}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
          >
            <span>Launch Next Course</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Question-by-Question Review */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Question-by-Question Audit
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review rationale and statutory explanations for all 10 evaluation questions
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowQuestionBreakdown(!showQuestionBreakdown)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span>{showQuestionBreakdown ? 'Hide Review' : 'Inspect All Questions'}</span>
            {showQuestionBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showQuestionBreakdown && (
          <div className="mt-5 space-y-4 divide-y divide-slate-100 pt-2">
            {assessment.questions.map((q, idx) => {
              const userAnswer = result.userAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={q.id} className="pt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Q{idx + 1}.</span>
                      <span className="text-slate-500">{q.competencyDomain}</span>
                    </div>
                    {isCorrect ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Correct
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-bold flex items-center gap-1 text-[11px]">
                        <XCircle className="w-3 h-3 text-rose-600" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-slate-800 font-semibold">{q.question}</p>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-[11px]">
                    <div className="text-slate-500">
                      Your answer:{' '}
                      <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                        {userAnswer !== undefined ? q.options[userAnswer] : 'No answer selected'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-slate-500">
                        Correct answer:{' '}
                        <span className="text-emerald-700 font-semibold">
                          {q.options[q.correctAnswer]}
                        </span>
                      </div>
                    )}
                    <div className="text-slate-600 mt-1.5 pt-1.5 border-t border-slate-200 leading-relaxed">
                      <strong className="text-teal-700 font-semibold">Explanation: </strong>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Flow Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadCertificate}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal-600" />
            <span>{downloadSuccess ? 'Transcript Downloaded!' : 'Export Credential (PDF)'}</span>
          </button>
          <button
            type="button"
            onClick={onRetakeAssessment}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Retake Assessment</span>
          </button>
        </div>

        {/* Primary Completion Button */}
        <button
          id="update-competency-and-dashboard-btn"
          type="button"
          onClick={onApplyCompetencyUpdate}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Update Competency Index &amp; Return to Dashboard</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

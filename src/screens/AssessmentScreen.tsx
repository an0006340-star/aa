import React, { useState, useEffect } from 'react';
import {
  Timer,
  Award,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { Assessment, AssessmentResult, ScreenTab } from '../types';

interface AssessmentScreenProps {
  assessment: Assessment;
  onSubmitAssessment: (result: AssessmentResult) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  assessment,
  onSubmitAssessment,
  onNavigate,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(assessment.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitFinal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalQuestions = assessment.questions.length;
  const currentQuestion = assessment.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions({
      ...flaggedQuestions,
      [currentQuestion.id]: !flaggedQuestions[currentQuestion.id],
    });
  };

  const handleSubmitFinal = () => {
    let correctCount = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= assessment.passPercentage;

    let competencyStatus: AssessmentResult['competencyAttainment'] = 'Needs Improvement';
    if (score >= 90) competencyStatus = 'Exemplary';
    else if (score >= 80) competencyStatus = 'Proficient';
    else if (score >= 70) competencyStatus = 'Competent';

    const result: AssessmentResult = {
      assessmentId: assessment.id,
      courseId: assessment.courseId,
      courseTitle: assessment.courseTitle,
      score,
      totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: totalQuestions - correctCount,
      timeSpentSeconds: assessment.durationMinutes * 60 - secondsRemaining,
      passed,
      competencyAttainment: competencyStatus,
      strengths: [
        'Distinguished statistical correlation from causal inference in policy datasets',
        'Demonstrated strong mastery of Open Data FAIR standards & DCAT-US cataloging',
        'Exemplary comprehension of WCAG AA data visualization clarity in executive briefs',
      ],
      areasForImprovement: [
        'Algorithmic bias mitigation when proxy variables produce disparate impact',
        'Synthesizing quasi-identifier differential privacy prior to open portal ingestion',
      ],
      personalizedFeedback:
        score >= 70
          ? `Outstanding work! You achieved ${score}%, successfully validating your competency in ${assessment.courseTitle}. You are eligible for official credential accreditation and can advance to the next recommended pathway phase.`
          : `You scored ${score}%. The benchmark threshold is ${assessment.passPercentage}%. Review Modules 2 and 4 to reinforce econometric modeling standards and re-take the certification assessment.`,
      recommendedNextStep: {
        title: 'Advance to Digital Governance & Algorithmic Ethics (GOV-310)',
        courseId: 'course-gov-ethics',
        actionType: 'Take Course',
        description:
          'Build on your quantitative policy skills by mastering legal guardrails and algorithmic compliance frameworks.',
      },
      userAnswers: answers,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onSubmitAssessment(result);
  };

  return (
    <div id="assessment-quiz-screen" className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Assessment Top Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-700 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Official Civil Service Competency Evaluation</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {assessment.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Course: <span className="text-slate-800 font-semibold">{assessment.courseTitle}</span> &bull;{' '}
              Passing standard: {assessment.passPercentage}%
            </p>
          </div>

          {/* Timer Display */}
          <div
            id="assessment-timer-display"
            className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 shrink-0 shadow-xs ${
              secondsRemaining < 180
                ? 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <Timer className="w-5 h-5 text-teal-600" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Time Remaining
              </div>
              <div className="text-base font-mono font-bold text-slate-900">
                {formatTime(secondsRemaining)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Question {currentQuestionIndex + 1} of {totalQuestions} &bull; Answered:{' '}
            <strong className="text-teal-700 font-bold">{answeredCount}</strong> / {totalQuestions}
          </span>
          <span className="font-bold text-teal-700">{progressPercent}% complete</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
          <div
            className="bg-teal-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Navigation Quick-Jump Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
          Question Navigator:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {assessment.questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentQuestionIndex;
            const isFlagged = flaggedQuestions[q.id];

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'bg-teal-600 text-white ring-2 ring-teal-300 shadow-xs'
                    : isAnswered
                    ? 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
                title={`Question ${idx + 1}`}
              >
                <span>{idx + 1}</span>
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-1 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div
        id="current-question-card"
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        {/* Question Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-teal-800 border border-slate-200">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Domain: {currentQuestion.competencyDomain}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleFlag}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              flaggedQuestions[currentQuestion.id]
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{flaggedQuestions[currentQuestion.id] ? 'Flagged for Review' : 'Flag Question'}</span>
          </button>
        </div>

        {/* Question Statement */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentQuestion.question}
        </h2>

        {/* 4 Multiple Choice Options */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = answers[currentQuestion.id] === optIdx;
            const letterLabel = ['A', 'B', 'C', 'D'][optIdx];

            return (
              <div
                key={optIdx}
                id={`question-option-${optIdx}`}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-teal-50 border-teal-400 text-slate-900 shadow-xs ring-1 ring-teal-400/50'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {letterLabel}
                </div>
                <div className="flex-1 leading-relaxed font-medium">{option}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination & Submit */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-teal-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="assessment-ready-submit-btn"
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>
            )}

            {currentQuestionIndex < totalQuestions - 1 && (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-2 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Finish &amp; Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl space-y-5 animate-in fade-in">
            <div className="flex items-center gap-3 text-teal-700">
              <ShieldCheck className="w-6 h-6 text-teal-600" />
              <h3 className="font-black text-lg text-slate-900">Submit Certification Assessment?</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              You have recorded answers for <strong className="text-slate-900 font-bold">{answeredCount}</strong> of{' '}
              <strong className="text-slate-900 font-bold">{totalQuestions}</strong> questions.
              {answeredCount < totalQuestions && (
                <span className="block mt-1 text-amber-700 font-semibold">
                  Warning: You have {totalQuestions - answeredCount} unanswered questions remaining.
                </span>
              )}
            </p>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div>Time Elapsed: <span className="font-semibold text-slate-800">{formatTime(assessment.durationMinutes * 60 - secondsRemaining)}</span></div>
              <div>Passing Threshold: <span className="font-semibold text-slate-800">{assessment.passPercentage}% Required</span></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Return to Review
              </button>
              <button
                id="confirm-assessment-submission-btn"
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  handleSubmitFinal();
                }}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Confirm &amp; Compute Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

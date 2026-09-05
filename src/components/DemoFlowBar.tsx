import React, { useState } from 'react';
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Minimize2,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import { ScreenTab } from '../types';

interface DemoFlowBarProps {
  currentTab: ScreenTab;
  onNavigate: (tab: ScreenTab) => void;
  onResetDemo: () => void;
}

export const DemoFlowBar: React.FC<DemoFlowBarProps> = ({
  currentTab,
  onNavigate,
  onResetDemo,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const steps: { id: ScreenTab; stepNumber: number; label: string; shortLabel: string }[] = [
    { id: 'login', stepNumber: 1, label: 'Login / Register', shortLabel: '1. Login' },
    { id: 'profile', stepNumber: 2, label: 'Profile & Skills', shortLabel: '2. Profile' },
    { id: 'skill-analysis', stepNumber: 3, label: 'AI Skill Analysis', shortLabel: '3. AI Analysis' },
    { id: 'learning-path', stepNumber: 4, label: 'Recommended Training', shortLabel: '4. Recommendations' },
    { id: 'courses', stepNumber: 5, label: 'Courses Catalog', shortLabel: '5. Courses' },
    { id: 'course-learning', stepNumber: 6, label: 'Course Learning Area', shortLabel: '6. Learning' },
    { id: 'assessment', stepNumber: 7, label: '10-Q Assessment', shortLabel: '7. Quiz' },
    { id: 'assessment-result', stepNumber: 8, label: 'Result & Feedback', shortLabel: '8. Results' },
    { id: 'progress', stepNumber: 9, label: 'Progress & Competency', shortLabel: '9. Progress' },
    { id: 'knowledge', stepNumber: 10, label: 'Knowledge Sharing', shortLabel: '10. Knowledge' },
    { id: 'admin', stepNumber: 11, label: 'Admin Dashboard', shortLabel: '11. Admin' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentTab);
  const nextStep = currentStepIndex >= 0 && currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;

  if (collapsed) {
    return (
      <div
        id="demo-flow-bar-collapsed"
        className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-700 shadow-xs"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Prototype Flow:
          </span>
          <span className="font-semibold text-slate-900">
            {steps[currentStepIndex]?.label || currentTab}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {nextStep && (
            <button
              onClick={() => onNavigate(nextStep.id)}
              className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-[11px] flex items-center gap-1 transition-all shadow-xs"
            >
              Next: {nextStep.shortLabel}
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => setCollapsed(false)}
            className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-[11px]"
            title="Expand demo flow navigation"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Show Guide</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="demo-flow-bar-expanded"
      className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Left Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Interactive Guided Journey
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-500">
            (Select any stage to jump directly into the prototype screen)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {nextStep && (
            <button
              id="demo-flow-next-btn"
              onClick={() => onNavigate(nextStep.id)}
              className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-all"
            >
              <span>Next Stage:</span>
              <span className="underline underline-offset-2">{nextStep.shortLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onResetDemo}
            className="p-1.5 text-slate-500 hover:text-slate-900 text-xs rounded-lg hover:bg-slate-100 transition-colors"
            title="Reset Mock State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 text-slate-500 hover:text-slate-900 text-xs rounded-lg hover:bg-slate-100 transition-colors"
            title="Collapse Demo Bar"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Steps Pill Strip */}
      <div className="mt-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {steps.map((step, idx) => {
            const isCurrent = currentTab === step.id;
            const isPast = currentStepIndex > idx;

            return (
              <React.Fragment key={step.id}>
                <button
                  id={`demo-step-${step.id}`}
                  onClick={() => onNavigate(step.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-teal-600 text-white font-bold shadow-sm shadow-teal-600/30 ring-1 ring-teal-500'
                      : isPast
                      ? 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                  ) : (
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isCurrent ? 'bg-white text-teal-700 font-bold' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                  )}
                  <span>{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

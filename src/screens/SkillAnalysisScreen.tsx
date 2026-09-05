import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Award,
  Clock,
  RefreshCw,
  Plus,
  X,
  Compass,
  FileCheck,
  Zap,
  BookOpen,
} from 'lucide-react';
import { UserProfile, AIAnalysisResult, ScreenTab } from '../types';
import { INITIAL_AI_ANALYSIS } from '../data/mockData';

interface SkillAnalysisScreenProps {
  user: UserProfile;
  onNavigate: (tab: ScreenTab) => void;
  onApplyAIPathway?: () => void;
}

export const SkillAnalysisScreen: React.FC<SkillAnalysisScreenProps> = ({
  user,
  onNavigate,
  onApplyAIPathway,
}) => {
  // Input fields
  const [currentSkillsList, setCurrentSkillsList] = useState<string[]>([
    'Digital Governance & Compliance',
    'Data-Informed Decision Making',
    'Agile Change Management',
    'Stakeholder & Citizen Engagement',
    'Cloud Infrastructure & Privacy Law',
    'AI Ethics & Algorithmic Oversight',
  ]);
  const [newSkillText, setNewSkillText] = useState('');
  const [experience, setExperience] = useState('8+ Years (Senior Specialist / Program Lead)');
  const [careerGoal, setCareerGoal] = useState(
    'Director of Digital Strategy & Public Service Modernization within 18 months.'
  );
  const [requiredSkills, setRequiredSkills] = useState(
    'Executive econometric modeling, multi-agency algorithmic audit, civil service change architecture, and crisis stakeholder communications.'
  );

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStepText, setAnalysisStepText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(INITIAL_AI_ANALYSIS);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillText.trim() && !currentSkillsList.includes(newSkillText.trim())) {
      setCurrentSkillsList([...currentSkillsList, newSkillText.trim()]);
      setNewSkillText('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setCurrentSkillsList(currentSkillsList.filter((s) => s !== skill));
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStepText('Indexing civil service competency frameworks & job role archetypes...');

    setTimeout(() => {
      setAnalysisStepText('Comparing current skill matrix against target director-level benchmarks...');
    }, 800);

    setTimeout(() => {
      setAnalysisStepText('Synthesizing high-impact skill gaps and optimal curricular sequencing...');
    }, 1600);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Generate updated fresh result
      setAnalysisResult({
        ...INITIAL_AI_ANALYSIS,
        generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 2400);
  };

  return (
    <div id="skill-analysis-screen" className="space-y-8 pb-12">
      {/* Banner & Simulated Notice */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold mb-2">
              <BrainCircuit className="w-4 h-4 text-teal-600" />
              <span>AI Diagnostic Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              AI-Powered Skill Gap Analysis
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Synthesizes your experience, self-reported competencies, and target career horizon to
              diagnose critical capacity deficits and engineer an optimal learning roadmap.
            </p>
          </div>

          <div className="px-3.5 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs max-w-xs shrink-0 shadow-xs">
            <div className="font-bold flex items-center gap-1.5 mb-0.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Simulated Prototype Engine</span>
            </div>
            <p className="text-[11px] text-amber-700 leading-tight">
              Demonstrates intelligent diagnostic workflows using deterministic mock capacity models.
            </p>
          </div>
        </div>
      </div>

      {/* Input Configuration Panel */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          Step 1: Input Career Parameters &amp; Baseline Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Skills Tags */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Current Competency Inventory ({currentSkillsList.length} skills)
            </label>
            <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-2xl min-h-[110px]">
              {currentSkillsList.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs bg-white text-teal-800 border border-teal-200 shadow-xs font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                placeholder="Type additional skill and press Enter..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-teal-700 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Experience & Career Goals */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Civil Service Seniority &amp; Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="1-3 Years (Associate / Entry Analyst)">
                  1-3 Years (Associate / Entry Analyst)
                </option>
                <option value="4-7 Years (Specialist / Program Officer)">
                  4-7 Years (Specialist / Program Officer)
                </option>
                <option value="8+ Years (Senior Specialist / Program Lead)">
                  8+ Years (Senior Specialist / Program Lead)
                </option>
                <option value="12+ Years (Executive / Assistant Director)">
                  12+ Years (Executive / Assistant Director)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Target Career Goal / Next Promotion Objective
              </label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Required / Target Future Competencies
              </label>
              <textarea
                rows={2}
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Trigger Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Analysis incorporates target standards from the Office of Personnel Modernization.
          </p>
          <button
            id="run-ai-diagnostic-btn"
            type="button"
            disabled={isAnalyzing}
            onClick={handleRunAnalysis}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Running Diagnostic Simulation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Generate AI Competency Diagnostic</span>
              </>
            )}
          </button>
        </div>

        {/* Loading status text */}
        {isAnalyzing && (
          <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-800 flex items-center gap-3 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-teal-600" />
            <span>{analysisStepText}</span>
          </div>
        )}
      </div>

      {/* Analysis Result Display */}
      {analysisResult && (
        <div
          id="ai-analysis-results-section"
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-500"
        >
          {/* Header of results */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
                  AI Diagnostic Complete
                </span>
                <span className="text-xs text-slate-400">Generated: {analysisResult.generatedAt}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Executive Competency &amp; Pathway Assessment
              </h3>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
              <div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Target Readiness
                </div>
                <div className="text-xl font-black text-teal-600">
                  {analysisResult.competencyScore}%
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Assessed Grade
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {analysisResult.evaluatedCompetency}
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200/80 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-teal-800 mr-2">Diagnostic Summary:</span>
            {analysisResult.executiveSummary}
          </div>

          {/* Two Columns: Identified Gaps vs Verified Strengths */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Identified Gaps */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-4 h-4" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Identified Skill Gaps
                </h4>
              </div>
              <div className="space-y-2.5">
                {analysisResult.identifiedGaps.map((gap) => (
                  <div
                    key={gap.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{gap.skillName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          gap.gapSeverity === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {gap.gapSeverity} Gap
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{gap.impactArea}</p>
                    <div className="pt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        Current: Level {gap.currentLevel}/5 &rarr; Required: Level {gap.requiredLevel}/5
                      </span>
                      <span className="text-teal-700 font-medium truncate max-w-[170px]">
                        {gap.recommendedCourseTitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Identified Organizational Strengths
                </h4>
              </div>
              <div className="space-y-2.5">
                {analysisResult.strengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">{str}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Competencies Cards */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-teal-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recommended Strategic Competencies
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {analysisResult.recommendedCompetencies.map((rec, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rec.priority === 'Urgent'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : rec.priority === 'Recommended'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900">{rec.name}</h5>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{rec.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Learning Pathway */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Personalized Civil Service Learning Pathway
                </h4>
              </div>
              <span className="text-xs text-slate-400">Total Duration: 24.5 Hours</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysisResult.personalizedPathway.map((stage, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500" />
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-teal-700 font-semibold mb-1">
                      <span>{stage.phase}</span>
                      <span>{stage.duration}</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900 mb-2">{stage.focus}</h5>
                    <div className="space-y-1.5">
                      {stage.courses.map((cName, cIdx) => (
                        <div
                          key={cIdx}
                          className="text-[11px] text-slate-700 p-2 rounded-xl bg-white border border-slate-200 flex items-center gap-1.5 shadow-2xs"
                        >
                          <BookOpen className="w-3 h-3 text-teal-600 shrink-0" />
                          <span className="truncate">{cName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Next Step Link */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Pathway ready &bull; All 6 curriculum modules cross-referenced
            </span>
            <button
              id="proceed-to-recommended-training-btn"
              type="button"
              onClick={() => {
                if (onApplyAIPathway) onApplyAIPathway();
                onNavigate('learning-path');
              }}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>View Personalized Recommended Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

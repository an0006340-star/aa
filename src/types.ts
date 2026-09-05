export type UserRole = 'learner' | 'admin';

export type ScreenTab =
  | 'login'
  | 'dashboard'
  | 'profile'
  | 'skill-analysis'
  | 'learning-path'
  | 'courses'
  | 'course-learning'
  | 'assessment'
  | 'assessment-result'
  | 'progress'
  | 'knowledge'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl: string;
  competencyLevel: 'Foundational' | 'Proficient' | 'Advanced' | 'Mastery';
  competencyScore: number; // 0 - 100
  overallProgress: number; // percentage
  learningHours: number;
  recentAssessmentScore: number;
  careerGoals: string;
  futureJobInterests: string[];
  currentSkills: UserSkill[];
  learningHistory: LearningHistoryItem[];
}

export interface UserSkill {
  id: string;
  name: string;
  category: 'Digital' | 'Governance' | 'Leadership' | 'Data' | 'Operations';
  level: number; // 1 to 5
  status: 'Proficient' | 'Developing' | 'Gap' | 'Advanced';
}

export interface LearningHistoryItem {
  id: string;
  title: string;
  type: 'Course' | 'Assessment' | 'Workshop' | 'Certification';
  completedDate: string;
  score?: number;
  hours: number;
  status: 'Completed' | 'In Progress';
  credentialId?: string;
}

export interface SkillGap {
  id: string;
  skillName: string;
  category: string;
  currentLevel: number; // 1-5
  requiredLevel: number; // 1-5
  gapSeverity: 'Low' | 'Moderate' | 'High';
  recommendedCourseId: string;
  recommendedCourseTitle: string;
  impactArea: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  summary: string;
  videoPlaceholderTitle: string;
  keyTakeaways: string[];
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'Spreadsheet' | 'Link';
  size: string;
  url: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  category: 'Data Literacy' | 'Digital Governance' | 'Change Management' | 'Leadership' | 'Communication' | 'Security & Risk';
  description: string;
  longOverview: string;
  skillCompetency: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  totalModules: number;
  completedModules: number;
  progress: number;
  instructor: {
    name: string;
    title: string;
    organization: string;
  };
  rating: number;
  enrolledCount: number;
  badgeEarned?: string;
  modules: CourseModule[];
  resources: CourseResource[];
  recommendedReason?: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  competencyDomain: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  instructions: string;
  durationMinutes: number;
  passPercentage: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  assessmentId: string;
  courseId: string;
  courseTitle: string;
  score: number; // 0 - 100
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpentSeconds: number;
  passed: boolean;
  competencyAttainment: 'Needs Improvement' | 'Competent' | 'Proficient' | 'Exemplary';
  strengths: string[];
  areasForImprovement: string[];
  personalizedFeedback: string;
  recommendedNextStep: {
    title: string;
    courseId: string;
    actionType: 'Take Course' | 'Advance Module' | 'Certification';
    description: string;
  };
  userAnswers: Record<number, number>;
  submittedAt: string;
}

export interface AIAnalysisResult {
  evaluatedCompetency: 'Foundational' | 'Proficient' | 'Advanced';
  competencyScore: number;
  identifiedGaps: SkillGap[];
  strengths: string[];
  recommendedCompetencies: {
    name: string;
    reason: string;
    priority: 'Urgent' | 'Recommended' | 'Future Growth';
  }[];
  personalizedPathway: {
    phase: string;
    duration: string;
    focus: string;
    courses: string[];
  }[];
  executiveSummary: string;
  generatedAt: string;
}

export interface KnowledgeResource {
  id: string;
  title: string;
  summary: string;
  category: 'Policy Briefs' | 'Framework Toolkits' | 'Case Studies' | 'Executive Templates' | 'Best Practices';
  author: {
    name: string;
    role: string;
    agency: string;
  };
  uploadedAt: string;
  downloads: number;
  likes: number;
  tags: string[];
  format: 'PDF' | 'DOCX' | 'PPTX' | 'Toolkit';
}

export interface AdminStats {
  totalLearners: number;
  activeLearners: number;
  courseCompletionRate: number;
  averageAssessmentScore: number;
  competencyDistribution: {
    level: string;
    count: number;
    percentage: number;
  }[];
  skillGapsAcrossOrg: {
    skill: string;
    department: string;
    gapPercentage: number;
    urgency: 'Critical' | 'Moderate' | 'Low';
  }[];
  departmentPerformance: {
    department: string;
    learners: number;
    avgScore: number;
    completionRate: number;
  }[];
}

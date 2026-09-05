import React, { useState } from 'react';
import {
  User,
  Building,
  Briefcase,
  Target,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  Award,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { UserProfile, UserSkill, LearningHistoryItem, ScreenTab } from '../types';

interface ProfileSkillsScreenProps {
  user: UserProfile;
  onUpdateUser?: (updated: UserProfile) => void;
  onUpdateProfile?: (updated: UserProfile) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const ProfileSkillsScreen: React.FC<ProfileSkillsScreenProps> = ({
  user,
  onUpdateUser,
  onUpdateProfile,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable local state
  const [name, setName] = useState(user?.name ?? '');
  const [department, setDepartment] = useState(user?.department ?? '');
  const [role, setRole] = useState(user?.role ?? 'learner');
  const [careerGoals, setCareerGoals] = useState(user?.careerGoals ?? '');
  const [futureInterests, setFutureInterests] = useState<string[]>(user?.futureJobInterests ?? []);
  const [newInterestInput, setNewInterestInput] = useState('');
  const [skills, setSkills] = useState<UserSkill[]>(user?.currentSkills ?? []);

  // Add skill modal/inline state
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<UserSkill['category']>('Digital');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(3);

  const handleSave = () => {
    const updatedUser: UserProfile = {
      ...user,
      name,
      department,
      role,
      careerGoals,
      futureJobInterests: futureInterests,
      currentSkills: skills,
    };
    if (onUpdateUser) onUpdateUser(updatedUser);
    if (onUpdateProfile) onUpdateProfile(updatedUser);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterestInput.trim() && !futureInterests.includes(newInterestInput.trim())) {
      setFutureInterests([...futureInterests, newInterestInput.trim()]);
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setFutureInterests(futureInterests.filter((i) => i !== item));
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: UserSkill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      status: newSkillLevel >= 4 ? 'Proficient' : newSkillLevel === 3 ? 'Developing' : 'Gap',
    };

    setSkills([...skills, newSkill]);
    setNewSkillName('');
    setShowAddSkill(false);
  };

  const handleSkillLevelChange = (skillId: string, level: number) => {
    setSkills(
      skills.map((s) => {
        if (s.id === skillId) {
          return {
            ...s,
            level,
            status: level >= 4 ? 'Proficient' : level === 3 ? 'Developing' : 'Gap',
          };
        }
        return s;
      })
    );
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills(skills.filter((s) => s.id !== skillId));
  };

  return (
    <div id="user-profile-screen" className="space-y-6 pb-12">
      {/* Header with Title & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/40"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-teal-500 ring-2 ring-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{name}</h1>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                Level: {user.competencyLevel} ({user.competencyScore}%)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{role} &bull; {department}</p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">Agency ID: CC-GOV-98214</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="save-profile-btn"
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </>
          ) : (
            <>
              <button
                id="run-analysis-from-profile-btn"
                type="button"
                onClick={() => onNavigate('skill-analysis')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Run AI Analysis</span>
              </button>
              <button
                id="edit-profile-btn"
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Profile records successfully updated in organizational learning directory.</span>
        </div>
      )}

      {/* Two Column Section: Personal & Organizational Attributes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1/3: Position & Career Goals */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-teal-600" />
              Role &amp; Directorate
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Official Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                ) : (
                  <p className="font-semibold text-slate-800">{name}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Department / Bureau</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                ) : (
                  <p className="font-semibold text-slate-800">{department}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Current Job Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                ) : (
                  <p className="font-semibold text-slate-800">{role}</p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block text-slate-400 mb-1 font-medium">Total Accredited Hours</label>
                <p className="font-bold text-teal-700 text-sm">{user.learningHours} Hours Completed</p>
              </div>
            </div>
          </div>

          {/* Career Target & Future Interests */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-600" />
              Career Goals &amp; Aspirations
            </h2>

            <div className="text-xs space-y-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Target Professional Goal</label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 leading-relaxed"
                  />
                ) : (
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    {careerGoals}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 mb-2 font-medium">Future Job Interests</label>
                <div className="flex flex-wrap gap-1.5">
                  {futureInterests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-teal-50 text-teal-800 border border-teal-200"
                    >
                      <span>{interest}</span>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(interest)}
                          className="text-teal-500 hover:text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {isEditing && (
                  <form onSubmit={handleAddInterest} className="mt-2.5 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add interest role..."
                      value={newInterestInput}
                      onChange={(e) => setNewInterestInput(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right 2/3: Current Skills & Competency Levels */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-600" />
                  Current Competency Map &amp; Skill Inventory
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Measured against the Federal Civil Service Capability Framework (Scale 1–5)
                </p>
              </div>

              <button
                type="button"
                id="add-skill-modal-btn"
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-teal-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Add Skill Form */}
            {showAddSkill && (
              <form
                onSubmit={handleAddSkillSubmit}
                className="mb-5 p-4 bg-slate-50 border border-teal-200 rounded-2xl space-y-3"
              >
                <div className="text-xs font-bold text-slate-900">Add New Competency Item</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Competency Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Algorithmic Impact Assessment"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Domain</label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value as UserSkill['category'])}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs"
                    >
                      <option value="Digital">Digital</option>
                      <option value="Governance">Governance</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Data">Data</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">
                      Proficiency Level (1-5)
                    </label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs"
                    >
                      <option value={1}>1 - Novice</option>
                      <option value={2}>2 - Foundational</option>
                      <option value={3}>3 - Developing</option>
                      <option value={4}>4 - Proficient</option>
                      <option value={5}>5 - Advanced / Master</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddSkill(false)}
                    className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Save Competency
                  </button>
                </div>
              </form>
            )}

            {/* Skill Inventory Table */}
            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 font-medium">
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>Status:</span>
                      <span
                        className={`font-semibold ${
                          skill.status === 'Proficient' || skill.status === 'Advanced'
                            ? 'text-emerald-700'
                            : skill.status === 'Developing'
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {skill.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {/* Level Rating (1 to 5) */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          disabled={!isEditing}
                          onClick={() => handleSkillLevelChange(skill.id, lvl)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                            lvl <= skill.level
                              ? 'bg-teal-600 text-white shadow-xs'
                              : 'bg-slate-200/80 text-slate-400'
                          } ${isEditing ? 'cursor-pointer hover:ring-2 hover:ring-teal-400' : 'cursor-default'}`}
                          title={`Level ${lvl}`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning History & Credentials */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  Official Learning History &amp; Credentials
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified agency completions and accreditation log
                </p>
              </div>
              <button
                onClick={() => onNavigate('progress')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
              >
                View Full Transcript &rarr;
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {user.learningHistory.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{item.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.completedDate}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.hours} hrs
                      </span>
                      {item.credentialId && (
                        <>
                          <span>&bull;</span>
                          <span className="font-mono text-teal-700 font-medium">{item.credentialId}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {item.score ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                        Score: {item.score}%
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-medium">
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

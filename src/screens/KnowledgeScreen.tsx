import React, { useState } from 'react';
import {
  Share2,
  Search,
  Filter,
  Plus,
  Download,
  ThumbsUp,
  FileText,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  Tag,
  Building,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';
import { KnowledgeResource, ScreenTab } from '../types';

interface KnowledgeScreenProps {
  resources: KnowledgeResource[];
  onAddResource: (newResource: KnowledgeResource) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const KnowledgeScreen: React.FC<KnowledgeScreenProps> = ({
  resources,
  onAddResource,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // New resource modal form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<KnowledgeResource['category']>('Policy Briefs');
  const [formSummary, setFormSummary] = useState('');
  const [formFormat, setFormFormat] = useState<KnowledgeResource['format']>('PDF');
  const [formTags, setFormTags] = useState('Data Governance, Public Sector, AI');

  const categories = [
    'All',
    'Framework Toolkits',
    'Case Studies',
    'Policy Briefs',
    'Executive Templates',
    'Best Practices',
  ];

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim()) return;

    const newResource: KnowledgeResource = {
      id: `kr-${Date.now()}`,
      title: formTitle.trim(),
      summary: formSummary.trim(),
      category: formCategory,
      author: {
        name: 'Sarah Jenkins',
        role: 'Senior Digital Transformation Specialist',
        agency: 'Bureau of Public Innovation & Digital Services',
      },
      uploadedAt: 'Just now',
      downloads: 1,
      likes: 1,
      tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
      format: formFormat,
    };

    onAddResource(newResource);
    setShowShareModal(false);
    setFormTitle('');
    setFormSummary('');
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      res.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="knowledge-sharing-screen" className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold mb-2">
              <Share2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Inter-Agency Knowledge Exchange</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Knowledge Sharing &amp; Public Assets Hub
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Explore peer-reviewed artifacts, policy memos, transformation toolkits, and civic playbooks
              authored by civil servants across municipal, state, and federal agencies.
            </p>
          </div>

          <button
            id="open-share-resource-modal-btn"
            type="button"
            onClick={() => setShowShareModal(true)}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Share a Resource</span>
          </button>
        </div>
      </div>

      {shareSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-semibold animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Your agency resource has been published to the Knowledge Commons!</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources, tags, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 shadow-xs"
          />
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item) => {
          const isLiked = likedMap[item.id];
          const currentLikes = item.likes + (isLiked ? 1 : 0);

          return (
            <div
              key={item.id}
              id={`resource-card-${item.id}`}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 shadow-xs flex flex-col justify-between transition-all group hover:shadow-sm"
            >
              <div>
                {/* Top Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    {item.format}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed font-medium">
                  {item.summary}
                </p>

                {/* Author Info */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-800 shrink-0">
                    {item.author.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.author.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{item.author.agency}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(item.id)}
                    className={`flex items-center gap-1 transition-colors cursor-pointer ${
                      isLiked ? 'text-teal-700 font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-teal-600 text-teal-600' : ''}`} />
                    <span>{currentLikes}</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.downloads}</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Downloading "${item.title}" (${item.format})`)}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-teal-600" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share Resource Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-black text-base text-slate-900">Share a Knowledge Resource</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleShareSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Municipal Cloud Procurement Compliance Checklist"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as KnowledgeResource['category'])}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  >
                    <option value="Policy Briefs">Policy Briefs</option>
                    <option value="Framework Toolkits">Framework Toolkits</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Executive Templates">Executive Templates</option>
                    <option value="Best Practices">Best Practices</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Format</label>
                  <select
                    value={formFormat}
                    onChange={(e) => setFormFormat(e.target.value as KnowledgeResource['format'])}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word Document (.docx)</option>
                    <option value="PPTX">PowerPoint Deck (.pptx)</option>
                    <option value="Toolkit">Interactive Toolkit / ZIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Executive Abstract / Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the core takeaways, institutional relevance, and applicability..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Cloud, Privacy, FOIA, Digital Strategy"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Publish to Commons
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

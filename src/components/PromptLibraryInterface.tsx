'use client';

import { useState, useEffect, useCallback } from 'react';
import { promptEngine } from '@/lib/promptEngine';
import { initializePromptLibrary } from '@/prompts/promptLibrary';
import type { PromptTemplate, PromptCategory } from '@/lib/types';

interface PromptLibraryInterfaceProps {
  onPromptSelect?: (template: PromptTemplate) => void;
}

export function PromptLibraryInterface({ onPromptSelect }: PromptLibraryInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | 'all'>('all');
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const categories: { id: PromptCategory | 'all'; name: string; icon: string; color: string }[] = [
    { id: 'all', name: 'All Templates', icon: '📚', color: 'from-gray-500 to-gray-600' },
    { id: 'strategic', name: 'Strategic', icon: '🎯', color: 'from-amber-500 to-orange-600' },
    { id: 'emotional', name: 'Emotional', icon: '💙', color: 'from-blue-500 to-purple-600' },
    { id: 'crisis', name: 'Crisis', icon: '🚨', color: 'from-red-500 to-pink-600' },
    { id: 'research', name: 'Research', icon: '🔬', color: 'from-indigo-500 to-purple-600' },
    { id: 'communication', name: 'Communication', icon: '💬', color: 'from-cyan-500 to-blue-600' },
    { id: 'creative', name: 'Creative', icon: '✨', color: 'from-yellow-500 to-orange-600' },
    { id: 'analytical', name: 'Analytical', icon: '📊', color: 'from-emerald-500 to-teal-600' }
  ];

  const loadTemplates = useCallback(() => {
    if (selectedCategory === 'all') {
      setTemplates(promptEngine.getAllTemplates());
    } else {
      setTemplates(promptEngine.getTemplatesByCategory(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!isInitialized) {
      initializePromptLibrary();
      setIsInitialized(true);
    }
    
    if (isInitialized) {
      loadTemplates();
    }
  }, [selectedCategory, isInitialized, loadTemplates]);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Celestial Prompt Library
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A comprehensive collection of specialized prompts for each constellation agent, 
          designed to unlock their full potential and provide structured guidance.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white stellar-glow`
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-gray-600'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <PromptTemplateCard
            key={template.id}
            template={template}
            onSelect={() => onPromptSelect?.(template)}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No templates found</h3>
          <p className="text-gray-400">
            {searchTerm ? 'Try adjusting your search terms' : 'Select a different category or check back later'}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/20 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{templates.length}</div>
          <div className="text-gray-300">Available Templates</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/20 text-center">
          <div className="text-3xl font-bold text-cyan-400 mb-2">7</div>
          <div className="text-gray-300">Specialized Agents</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/20 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{categories.length - 1}</div>
          <div className="text-gray-300">Prompt Categories</div>
        </div>
      </div>
    </div>
  );
}

interface PromptTemplateCardProps {
  template: PromptTemplate;
  onSelect: () => void;
}

function PromptTemplateCard({ template, onSelect }: PromptTemplateCardProps) {
  const categoryColors = {
    strategic: 'from-amber-500 to-orange-600',
    emotional: 'from-blue-500 to-purple-600',
    crisis: 'from-red-500 to-pink-600',
    research: 'from-indigo-500 to-purple-600',
    communication: 'from-cyan-500 to-blue-600',
    creative: 'from-yellow-500 to-orange-600',
    analytical: 'from-emerald-500 to-teal-600'
  };

  const categoryIcons = {
    strategic: '🎯',
    emotional: '💙',
    crisis: '🚨',
    research: '🔬',
    communication: '💬',
    creative: '✨',
    analytical: '📊'
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group"
         onClick={onSelect}>
      {/* Category Badge */}
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[template.category]} text-white text-sm font-medium mb-4`}>
        <span>{categoryIcons[template.category]}</span>
        <span className="capitalize">{template.category}</span>
      </div>

      {/* Template Info */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
        {template.name}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {template.description}
      </p>

      {/* Variables */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">Variables:</h4>
        <div className="flex flex-wrap gap-2">
          {template.variables.slice(0, 3).map((variable) => (
            <span
              key={variable.name}
              className={`px-2 py-1 text-xs rounded ${
                variable.required 
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-500/20' 
                  : 'bg-gray-600/30 text-gray-300 border border-gray-500/20'
              }`}
            >
              {variable.name}
              {variable.required && '*'}
            </span>
          ))}
          {template.variables.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-600/30 text-gray-300 rounded border border-gray-500/20">
              +{template.variables.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Use Button */}
      <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 stellar-glow">
        Use Template
      </button>
    </div>
  );
}
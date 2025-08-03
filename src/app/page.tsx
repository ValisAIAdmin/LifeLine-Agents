'use client';

import { useState } from 'react';
import { ConstellationDashboard } from '@/components/ConstellationDashboard';
import { AgentCard } from '@/components/AgentCard';
import { CelestialNavigation } from '@/components/CelestialNavigation';
import { PromptLibraryInterface } from '@/components/PromptLibraryInterface';

// Define the 7 Celestial Agents
const celestialAgents = [
  {
    id: 'orion',
    name: 'Orion',
    title: 'Strategic Planning & Leadership',
    description: 'Master of strategic thinking and organizational leadership. Orion guides complex decision-making and long-term planning.',
    constellation: 'The Hunter',
    color: 'from-amber-400 to-orange-500',
    abilities: ['Strategic Analysis', 'Leadership Guidance', 'Decision Architecture', 'Vision Planning'],
    status: 'active' as const
  },
  {
    id: 'luna',
    name: 'Luna',
    title: 'Emotional Intelligence & Support',
    description: 'Empathetic counselor specializing in emotional guidance and interpersonal relationships.',
    constellation: 'The Moon',
    color: 'from-blue-300 to-purple-400',
    abilities: ['Emotional Analysis', 'Relationship Guidance', 'Empathetic Response', 'Mental Wellness'],
    status: 'active' as const
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    title: 'Crisis Response & Recovery',
    description: 'Expert in crisis management and recovery strategies. Phoenix helps navigate challenging situations.',
    constellation: 'The Firebird',
    color: 'from-red-400 to-pink-500',
    abilities: ['Crisis Management', 'Recovery Planning', 'Risk Assessment', 'Emergency Response'],
    status: 'active' as const
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    title: 'Knowledge & Research',
    description: 'Vast repository of knowledge and research capabilities. Cosmos provides deep insights and analysis.',
    constellation: 'The Universe',
    color: 'from-indigo-400 to-purple-600',
    abilities: ['Research Analysis', 'Knowledge Synthesis', 'Data Mining', 'Academic Insights'],
    status: 'active' as const
  },
  {
    id: 'stellar',
    name: 'Stellar',
    title: 'Communication & Networking',
    description: 'Master communicator and network builder. Stellar excels in relationships and information flow.',
    constellation: 'The Network',
    color: 'from-cyan-400 to-blue-500',
    abilities: ['Communication Strategy', 'Network Building', 'Information Flow', 'Collaboration'],
    status: 'active' as const
  },
  {
    id: 'nova',
    name: 'Nova',
    title: 'Innovation & Creativity',
    description: 'Creative powerhouse driving innovation and breakthrough thinking. Nova sparks new possibilities.',
    constellation: 'The Spark',
    color: 'from-yellow-400 to-orange-400',
    abilities: ['Creative Thinking', 'Innovation Strategy', 'Breakthrough Ideas', 'Design Thinking'],
    status: 'active' as const
  },
  {
    id: 'vega',
    name: 'Vega',
    title: 'Analytics & Insights',
    description: 'Data analytics expert providing deep insights and predictive analysis for informed decisions.',
    constellation: 'The Bright Star',
    color: 'from-emerald-400 to-teal-500',
    abilities: ['Data Analytics', 'Predictive Modeling', 'Statistical Analysis', 'Business Intelligence'],
    status: 'active' as const
  }
];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'agents' | 'prompts'>('dashboard');

  return (
    <div className="constellation-bg min-h-screen relative">
      {/* Celestial Navigation */}
      <CelestialNavigation 
        activeView={activeView} 
        onViewChange={setActiveView}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            LifeLine Agents
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your Celestial Intelligence Constellation - Seven specialized AI agents working in harmony to provide comprehensive support across all aspects of life and business.
          </p>
          <div className="stellar-glow inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold">
            ⚡ Production Ready - All Systems Online
          </div>
        </div>

        {/* Conditional Content Based on Active View */}
        {activeView === 'dashboard' && (
          <ConstellationDashboard agents={celestialAgents} />
        )}

        {activeView === 'agents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celestialAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onSelect={() => setSelectedAgent(agent.id)}
              />
            ))}
          </div>
        )}

        {activeView === 'prompts' && (
          <PromptLibraryInterface 
            onPromptSelect={(template) => {
              console.log('Selected template:', template);
              // Here you could implement template usage logic
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2024 LifeLine Agents - Celestial Intelligence Platform</p>
      </footer>
    </div>
  );
}

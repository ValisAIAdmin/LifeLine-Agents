'use client';

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  constellation: string;
  color: string;
  abilities: string[];
  status: 'active' | 'standby' | 'offline';
}

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
}

export function AgentCard({ agent, isSelected, onSelect }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform ${
        isSelected
          ? 'border-purple-500 scale-105 stellar-glow'
          : 'border-gray-700 hover:border-purple-400 hover:scale-102'
      } ${
        agent.status === 'active' 
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80' 
          : 'bg-slate-800/40'
      }`}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Agent Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${
            agent.status === 'active' ? 'bg-green-400 animate-pulse' :
            agent.status === 'standby' ? 'bg-yellow-400' : 'bg-red-400'
          }`}></div>
          <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
        </div>
        <div className="text-2xl stellar-glow">
          {agent.id === 'orion' && '🏹'}
          {agent.id === 'luna' && '🌙'}
          {agent.id === 'phoenix' && '🔥'}
          {agent.id === 'cosmos' && '🌌'}
          {agent.id === 'stellar' && '💫'}
          {agent.id === 'nova' && '✨'}
          {agent.id === 'vega' && '⭐'}
        </div>
      </div>

      {/* Agent Title */}
      <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
        {agent.title}
      </p>

      {/* Constellation */}
      <p className="text-sm text-gray-400 mb-3">
        Constellation: <span className="text-cyan-400">{agent.constellation}</span>
      </p>

      {/* Description */}
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        {agent.description}
      </p>

      {/* Abilities */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-200">Core Abilities:</h4>
        <div className="flex flex-wrap gap-2">
          {agent.abilities.map((ability, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-md text-xs text-purple-200 border border-purple-500/20"
            >
              {ability}
            </span>
          ))}
        </div>
      </div>

      {/* Interaction Indicator */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 animate-pulse"></div>
      )}
    </div>
  );
}
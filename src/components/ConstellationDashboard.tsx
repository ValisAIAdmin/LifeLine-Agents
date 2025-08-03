'use client';

import { useState, useEffect } from 'react';

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

interface ConstellationDashboardProps {
  agents: Agent[];
}

interface SystemMetrics {
  totalQueries: number;
  activeAgents: number;
  responseTime: number;
  successRate: number;
}

export function ConstellationDashboard({ agents }: ConstellationDashboardProps) {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalQueries: 1247,
    activeAgents: 7,
    responseTime: 0.3,
    successRate: 99.7
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time metrics updates
      setMetrics(prev => ({
        ...prev,
        totalQueries: prev.totalQueries + Math.floor(Math.random() * 3),
        responseTime: Math.max(0.1, prev.responseTime + (Math.random() - 0.5) * 0.1)
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const activeAgents = agents.filter(agent => agent.status === 'active');

  return (
    <div className="space-y-8">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Queries"
          value={metrics.totalQueries.toLocaleString()}
          icon="📊"
          color="from-blue-500 to-cyan-500"
        />
        <MetricCard
          title="Active Agents"
          value={`${metrics.activeAgents}/7`}
          icon="⭐"
          color="from-green-500 to-emerald-500"
        />
        <MetricCard
          title="Avg Response"
          value={`${metrics.responseTime.toFixed(1)}s`}
          icon="⚡"
          color="from-yellow-500 to-orange-500"
        />
        <MetricCard
          title="Success Rate"
          value={`${metrics.successRate}%`}
          icon="🎯"
          color="from-purple-500 to-pink-500"
        />
      </div>

      {/* Constellation Map */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-8 border border-purple-500/20">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Celestial Constellation Map
        </h2>
        
        <div className="relative min-h-[400px] constellation-bg rounded-lg overflow-hidden">
          {/* Agent Constellation Positions */}
          <div className="absolute inset-0 p-8">
            {agents.map((agent, index) => {
              const positions = [
                { top: '20%', left: '15%' },  // Orion
                { top: '15%', left: '70%' },  // Luna
                { top: '40%', left: '80%' },  // Phoenix
                { top: '70%', left: '75%' },  // Cosmos
                { top: '80%', left: '30%' },  // Stellar
                { top: '60%', left: '10%' },  // Nova
                { top: '35%', left: '45%' },  // Vega (center)
              ];

              return (
                <div
                  key={agent.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    agent.status === 'active' ? 'stellar-glow' : 'opacity-50'
                  }`}
                  style={positions[index]}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2 mx-auto text-2xl">
                      {agent.id === 'orion' && '🏹'}
                      {agent.id === 'luna' && '🌙'}
                      {agent.id === 'phoenix' && '🔥'}
                      {agent.id === 'cosmos' && '🌌'}
                      {agent.id === 'stellar' && '💫'}
                      {agent.id === 'nova' && '✨'}
                      {agent.id === 'vega' && '⭐'}
                    </div>
                    <div className="text-xs text-white font-semibold">{agent.name}</div>
                    <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                      agent.status === 'active' ? 'bg-green-400 animate-pulse' :
                      agent.status === 'standby' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                </div>
              );
            })}

            {/* Connection Lines between agents */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.3 }} />
                </linearGradient>
              </defs>
              {/* Sample connection lines */}
              <line x1="15%" y1="20%" x2="45%" y2="35%" stroke="url(#connectionGradient)" strokeWidth="2" />
              <line x1="70%" y1="15%" x2="45%" y2="35%" stroke="url(#connectionGradient)" strokeWidth="2" />
              <line x1="45%" y1="35%" x2="30%" y2="80%" stroke="url(#connectionGradient)" strokeWidth="2" />
              <line x1="45%" y1="35%" x2="75%" y2="70%" stroke="url(#connectionGradient)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold mb-4 text-purple-300">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">System Health:</span>
              <span className="text-green-400 font-semibold">Optimal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Network Latency:</span>
              <span className="text-cyan-400 font-semibold">{metrics.responseTime.toFixed(1)}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Last Update:</span>
              <span className="text-yellow-400 font-semibold">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold mb-4 text-purple-300">Active Agents</h3>
          <div className="space-y-2">
            {activeAgents.slice(0, 4).map((agent) => (
              <div key={agent.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">{agent.name}</span>
                </div>
                <span className="text-xs text-cyan-400">{agent.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`text-3xl p-3 rounded-lg bg-gradient-to-r ${color} stellar-glow`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
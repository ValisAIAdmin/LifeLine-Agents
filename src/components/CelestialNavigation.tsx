'use client';

interface CelestialNavigationProps {
  activeView: 'dashboard' | 'agents' | 'prompts';
  onViewChange: (view: 'dashboard' | 'agents' | 'prompts') => void;
}

export function CelestialNavigation({ activeView, onViewChange }: CelestialNavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Constellation Dashboard', icon: '🌌' },
    { id: 'agents', label: 'Celestial Agents', icon: '⭐' },
    { id: 'prompts', label: 'Prompt Library', icon: '📚' }
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-purple-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="stellar-glow text-2xl">🌟</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              LifeLine Agents
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white stellar-glow'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400 hidden sm:inline">All Systems Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
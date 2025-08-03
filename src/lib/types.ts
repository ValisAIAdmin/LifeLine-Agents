// Core Agent Configuration Types
export interface AgentConfiguration {
  id: string;
  name: string;
  title: string;
  description: string;
  constellation: string;
  color: string;
  abilities: string[];
  status: 'active' | 'standby' | 'offline';
  prompts: AgentPrompts;
  systemPrompt: string;
  personality: AgentPersonality;
  capabilities: AgentCapabilities;
}

export interface AgentPrompts {
  system: string;
  greeting: string;
  expertise: string[];
  fallback: string;
  templates: PromptTemplate[];
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: PromptVariable[];
  category: PromptCategory;
}

export interface PromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  description: string;
  required: boolean;
  defaultValue?: string | number | boolean | string[];
}

export type PromptCategory = 
  | 'strategic'
  | 'emotional'
  | 'crisis'
  | 'research'
  | 'communication'
  | 'creative'
  | 'analytical';

export interface AgentPersonality {
  tone: string;
  communication_style: string;
  expertise_level: 'beginner' | 'intermediate' | 'expert' | 'master';
  approach: string;
  traits: string[];
}

export interface AgentCapabilities {
  primary_functions: string[];
  specialized_knowledge: string[];
  interaction_patterns: string[];
  output_formats: string[];
}

// Prompt Library System Types
export interface PromptLibrary {
  categories: PromptCategory[];
  templates: Record<string, PromptTemplate[]>;
  agents: Record<string, AgentConfiguration>;
  global_variables: PromptVariable[];
}

export interface PromptEngine {
  renderTemplate(templateId: string, variables: Record<string, string | number | boolean | string[]>): string;
  getTemplatesByCategory(category: PromptCategory): PromptTemplate[];
  getTemplatesByAgent(agentId: string): PromptTemplate[];
  validateVariables(template: PromptTemplate, variables: Record<string, string | number | boolean | string[]>): boolean;
}